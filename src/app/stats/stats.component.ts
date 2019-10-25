import { Component, OnInit, Input, Output, EventEmitter, DoCheck, KeyValueDiffers, IterableDiffers } from '@angular/core';
import { Skill } from '../skill';
import { Character } from '../character';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit, DoCheck {

  private readonly MATH = Math;                         //Used to perform mathematical operations in the html
  private readonly CHARACTER_OFFSET:number = 2;         //Number to add to character allocation to show correct level

  private _maxActionSkills: Array<number> = [];         //Max action skills the character can have put into an array
  private _maxActionMods: Array<number> = [];           //Max action mods a character can have put into an array
  private _maxOtherSkills: Array<number> = [];          //Max other skills a character can have put into an array (not used as of right now)

  private conditionals: Array<any> = [];                //Conditionals that the character uses

  private allocatedSkillDiffer: Array<any> = [];        //Array that holds KeyValueDiffer of skills, and their effect conditionals
  private allocatedSkillsDiffer: any;                   //Holds IterbaleDiffer of allocates skill array

  private offensiveStats = {                            //Offensive stats
    accuracy: "0",
    actionSkillDmg: "0",
    bonusDmg: "0",
    bonusElementalDmg: "0",
    criticalHitDmg: "0",
    dmgIncrease: "0",
    elementalDmg: "0",
    fireRate: "0",
    gunDmg: "0",
    handling: "0",
    meleeDmg: "0",
    shockDmg: "0",
    splashDmg: "0",
    statusEffectDmg: "0",
    statusEffectDuration: "0"
  };

  private defensiveStats = {                             //Defensive stats
    dmgReduction: "0",
    elementalDmgReduction: "0",
    healthRegen: "0",
    lifeSteal: "0",
    maxHealth: "0",
    shieldRegenDelay: "0",
    splashDmgReduction: "0"
  }

  private utilityStats = {                                //Utility stats
    chargeTime: "0",
    handling: "0",
    modeSwitchSpeed: "0",
    movementSpeed: "0",
    reloadSpeed: "0",
    statusEffectChance: "0",
    weaponSwapSpeed: "0"
  }

  @Input()
  allocatedPoints: number;                        //Points allocated in tree

  @Input()
  equippedSkills: Array<any>;                     //Action skills, action mods and other skills that have been allocated

  @Input()
  allocatedSkills: Array<Skill>;                  //All skills that got allocated

  @Input()   
  /**
   * For every number n in the max action skills a character can have
   * it is put into an array 
   */                     
  set maxActionSkills(maxActionSkills: number) {
    for (var i = 0; i < maxActionSkills; i++) {
      this._maxActionSkills[i] = i;
    }
  }

  @Input()
  /**
   * For every number n in the max action mods a character can have
   * it is put into an array 
   */  
  set maxActionMods(maxActionMods: number) {
    for (var i = 0; i < (maxActionMods / this._maxActionSkills.length); i++) {
      this._maxActionMods[i] = i;
    }
  }

  @Input() 
  /**
   * For every number n in the max other skills a character can have
   * it is put into an array 
   */  
  set maxOtherSkills(maxOtherSkills: number) {
    for (var i = 0; i < maxOtherSkills; i++) {
      this._maxOtherSkills[i] = i;
    }
  }

  @Output() hovered = new EventEmitter<Array<any>>();     //Event emmiter for tooltip hover
  
  constructor(private differs: KeyValueDiffers, private iterableDiffers: IterableDiffers) { 
    this.allocatedSkillsDiffer = iterableDiffers.find([]).create();      
  }

  ngOnInit() {
  }

  ngDoCheck() {
    this.checkForDiffer(this.allocatedSkillsDiffer, this.allocatedSkillDiffer, this.allocatedSkills);
  }

  /**
   * Checks if the any allocated skills, or the allocated skill array itself has been changed
   * 
   * @param skillsDiffer 
   *                    Holds IterbaleDiffer of allocates skill array
   * @param skillDiffer 
   *                    Array that holds KeyValueDiffer of skills
   * @param skillArray 
   *                    Array of allocated skills
   *                  
   */
  checkForDiffer(skillsDiffer: any, skillDiffer: Array<any>, skillArray: Array<any>) {
   
    //Check if the skill array changed (had skills added or removed)
    const skillsChange = skillsDiffer.diff(skillArray);      

    //skill array changed
    if (skillsChange) {

      //If skill was added, add that skill to the skilldiffer array
      skillsChange.forEachAddedItem(skill => {
        skillDiffer.push([this.differs.find(skill.item).create()]); 

        //Get the index of last element in the skilldiffer array
        var index = skillDiffer.length - 1;

        //Traverse the current skill effects
        skill.item.getSkillEffects().effects.forEach(effect => {

          //If there is a conditional to the effect push into the skilldiffer array with the current skill
          if (effect.conditional != null) {
            skillDiffer[index].push(this.differs.find(effect.conditional).create());

            //Try to add the conditional to our conditional array
            this.addConditional(effect.conditional);
          }
        });
      });

      //If a skill was removed, remove that entry from the skilldiffer array and update stats
      //Index offset is only used when a bulk of skills is removed (Tree resets)
      var indexOffset = 0; 
      skillsChange.forEachRemovedItem(skill => {
        const removedSkill = skillDiffer.splice(skill.previousIndex - indexOffset, 1);

        //The value used to update the stats with
        var valueToSub;

        //Traverse through the records of the removed skills until allocated points is reached
        //If the previous allocated points is greater than 0 use it, otherwise use 1
        for (let [key, value] of removedSkill[0][0]._records) {
          if (key == "allocatedPoints") {
            valueToSub = value.previousValue > 0 ? value.previousValue : 1;
            this.updateStatBySkill(skill.item, valueToSub);
          }
        }

        indexOffset++;

        //Traverse the skill effects
        skill.item.getSkillEffects().effects.forEach(effect => {
          //Try to remove the conditional (if any) from the conditional array
          if (effect.conditional != null) {
            this.removeConditional(effect.conditional);

            //Remove feffects based on the conditionals current value
            //subtract one due to the update stats line done above
            if (effect.conditional.currentValue != null && effect.conditional.currentValue > 0) {
              this.updateStatByEffect(skill.item, effect, null, effect.conditional.currentValue - 1);
            }
          }
        });
      });
    }

    //For each skill in the skill array
    skillArray.forEach((skill, index) => {

      //Index of the conditional in the skilldiff array
      var conditionalIndex = 0;
      skill.getSkillEffects().effects.forEach(effect => {
        
        if (effect.conditional != null) {
          //Confitional to be tested if it changed
          var effectChange = skillDiffer[index][conditionalIndex + 1];
          //Get changes
          var changes = effectChange.diff(effect.conditional);

          //Check if there are any changes
          if (changes) {
            
            //If the conditional was changed:
            //call update stats with the skill, with previous values
            changes.forEachChangedItem(changedItem => {
              if (changedItem.key == "active") {
                this.updateStatByEffect(skill, effect, changedItem.previousValue);
              } else if (changedItem.key == "currentValue") {
                this.updateStatByEffect(skill, effect, null, changedItem.previousValue, effect.conditional.effectiveness);
              } else if (changedItem.key == "effectiveness") {
                this.updateStatByEffect(skill, effect, null, effect.conditional.currentValue, changedItem.previousValue);
              }
            })
          }

          conditionalIndex++;
      }
        

      });

      //Skill to be tested if it changed
      var skillchange = skillDiffer[index][0]; 
      //Get the changes
      var changes = skillchange.diff(skill);    
      
      //Check if there are any changes
      if (changes) {
        //If the skill was just added call update sats with just the skill
        changes.forEachAddedItem(addedItem => {
          if (addedItem.key == 'allocatedPoints') {
            this.updateStatBySkill(skill);
          }
        })

        //If the skill had its allocation change:
        //call update stats with the skill, and the previous allocation number
        changes.forEachChangedItem(changedItem => {
          if (changedItem.key == 'allocatedPoints') {
            this.updateStatBySkill(skill, changedItem.previousValue);
          }
        })
      }
    })
  }

  /**
   * Adds a skill effects conditional to the current conditionals that effect the 
   * character stats
   * 
   * @param condtional 
   *                  A skill effect conditional
   */
  addConditional(conditional: any) {
    var index = -1;

    //Loop through each conditional 
    //If the conditional is found set the index and exit
    this.conditionals.forEach((next, i) => {
      if (next[0] == conditional) {
        index = i;
        return;
      }
    });

    //If the conditional is not found set the index and 1 as the number of occurances
    if (index < 0) {
      this.conditionals.push([conditional, 1]);
    } else  {

      //If the conditional is found up the number of occurances
      this.conditionals[index][1]++;
    }
  }

  /**
   * Removes a skill effects conditional from the conditionals that effect the character
   * stats
   * 
   * @param conditional 
   *                    A skill effect conditional
   */
  removeConditional(conditional: any) {
    //Loop through each conditional 
    //If the conditional is found set the index and exit
    this.conditionals.forEach((next, index) => {
      if (next[0] == conditional) {
        if (--next[1] == 0) {
          this.conditionals.splice(index, 1);
          return;
        }
      }
    });
  }

  /**
   * Update conditionals current value based on the user input
   * 
   * @param conditional
   *                    the conditional to update
   * @param event 
   *              the triggered event
   */
  valueChange(conditional: any, event: Event) {
    var input = <HTMLInputElement> event.srcElement;  //input element from event
    var insertedValue = parseInt(input.value);        //input value

    //If the input value is more than the max acceptable on the 
    //conditiona/, then set the input value to its max and 
    if (insertedValue > conditional.maxValue) {
      input.value = conditional.maxValue;
      insertedValue = conditional.maxValue;

      //If its less than 0 or nothing, set it to 0
    } else if (insertedValue < 0 || input.value == "") {
      insertedValue = 0;
      input.value = "0";
      return;
    }

    conditional.setCurrentValue(insertedValue);
  }

  /**
   * Validates the input for conditional values
   * 
   * @param event 
   *             the triggered event
   */
  validateInput(event: any) {
      const validExp = /^\d*$/;             //reg exp to test input against
      var input = event.srcElement.value;   //input value

      //Replace all invalid input
      if (!validExp.test(input)) {  
        event.srcElement.value = input.replace(/\D*/g, "");
      }
  }

  /**
   * Updates stats based on a skill and all its effects
   * 
   * @param skill 
   *             skill to extract stats from
   * @param oldValue 
   *             old skill allocation amount
   */
  updateStatBySkill(skill: Skill, oldValue?: number) {
    //Traverse the skills effects
    skill.getSkillEffects().effects.forEach(effect => {

      //Only add the value if it has a type related to it
      if (effect.type != null) {
        var value = this.calculateValue(skill, effect);
        var valueToSub = 0;

        if (oldValue != null) {
          valueToSub = this.calculateValue(skill, effect, oldValue);
        }
        
        this.updateStat(value, valueToSub, effect);
      }
      
    });
  }

  /**
   * Updates based on an effect of a skill
   * 
   * @param skill 
   *             skill that the effect belongs to
   * @param effect 
   *             effect used to update the stat
   * @param oldConditional 
   *             old active value of the conditional
   * @param oldConditionalValue 
   *             old value of the conditional
   * @param oldEffectiveness
   *             old effectiveness value of the effect if it has any
   */
  updateStatByEffect(skill: Skill, effect: any, oldConditional?: boolean, oldConditionalValue?: number, oldEffectiveness?: number) {
    var value = this.calculateValue(skill, effect, null); 
    var valueToSub = 0;                                   

    //Provide old condtional or old conditional value if its provided
    if (oldConditional != null || oldConditionalValue != null) {
      valueToSub = this.calculateValue(skill, effect, null, oldConditional, oldConditionalValue);
    }

    if (oldEffectiveness) {
      value *= effect.conditional.effectiveness;
      valueToSub *= oldEffectiveness;
    }

    

    this.updateStat(value, valueToSub, effect);
  } 

  /**
   * Calculates the value of an effect. If there is no old values are provided 
   * then it uses the current ones.
   * 
   * @param skill 
   *            the skill that the effect belongs to
   * @param effect 
   *            the effect used for calculation
   * @param oldIndex 
   *            old index of the skill
   * @param oldConditional 
   *            old active value of the effect
   * @param oldConditionalValue 
   *            old value of the conditional
   */
  calculateValue(skill: Skill, effect: any, oldIndex?: number, oldConditional?: boolean, oldConditionalValue?: number) {
    var value: any = 0.00;        //the value to calculate
    var valueMulti: number = 1;   //multiplier for the value

    //If the effect has a conditional, it's active, no old conditional is provided or its true, and no old conditional value is provided:
    //The value multiplier is 1 unless the effect has a function to return a multiplier when active
    if (effect.conditional != null && effect.conditional.active && oldConditional == null && oldConditionalValue == null || oldConditional == true) {
      valueMulti = effect.getActiveValueMulti != null ? effect.getActiveValueMulti() : 1;

    //Else if the effect has a conditional, it's not active, no old conditional is provided or its false, and no old conditional value is provided:
    //The value multiplier is 1 unless the effect has a function to return a multiplier when not active
    } else if (effect.conditional != null && !effect.conditional.active  && oldConditional == null && oldConditionalValue == null || oldConditional == false) {
      valueMulti = effect.getNotActiveValueMulti != null ? effect.getNotActiveValueMulti() : 0;

    //Else if the old conditional value is provided:
    //The value multiplier is equal to it
    } else if (oldConditionalValue != null) {
      valueMulti = oldConditionalValue;
    }
    
    //If an old index has been provided get the effect value based on it
    if (oldIndex != null) {
      effect.value != null ? value = effect.value : value = effect.values[oldIndex - 1];
    
    //If the old index hasn't been provided then yuse the current skill effect value
    } else if (skill.getAllocatedPoints() > 0) {
      effect.value != null ? value = effect.value : value = effect.values[skill.getAllocatedPoints() - 1];
    }

    //If the value isn't a number parse it to a float
    if (isNaN(value)) {
      value = parseFloat(value.replace(/^\D+[^-][a-zA-z]|\D+$/g, ""));
    }
    
    return value * valueMulti;
  }

  /**
   * Updates a stat based on the effect type, the amount to add and subtract.
   * 
   * @param value
   *              the current value to add to the stat
   * @param valueToSub 
   *              the value to subtract from the stat
   * @param effect 
   *              the effect that is being used to update the stat
   */
  updateStat(value: number, valueToSub: number, effect: any) {
    if (effect.type.extraType != null) {
      effect.type.extraType(value - valueToSub);
    } else if (effect.type.accuracy) {
      this.offensiveStats.accuracy = (parseFloat(this.offensiveStats.accuracy) + value - valueToSub).toFixed(2);
    } else if (effect.type.actionSkillDmg) {
      this.offensiveStats.actionSkillDmg = (parseFloat(this.offensiveStats.actionSkillDmg) + value - valueToSub).toFixed(2);
    } else if (effect.type.bonusDmg) {
      this.offensiveStats.bonusDmg = (parseFloat(this.offensiveStats.bonusDmg) + value - valueToSub).toFixed(2);
    } else if (effect.type.bonusElementalDmg) {
      this.offensiveStats.bonusElementalDmg = (parseFloat(this.offensiveStats.bonusElementalDmg) + value - valueToSub).toFixed(2);
    } else if (effect.type.chargeTime) {
      this.utilityStats.chargeTime = (parseFloat(this.utilityStats.chargeTime) + value - valueToSub).toFixed(2);
    } else if (effect.type.criticalHitDmg) {
      this.offensiveStats.criticalHitDmg = (parseFloat(this.offensiveStats.criticalHitDmg) + value - valueToSub).toFixed(2);
    } else if (effect.type.dmgIncrease) {
      this.offensiveStats.dmgIncrease = (parseFloat(this.offensiveStats.dmgIncrease) + value - valueToSub).toFixed(2);
    } else if (effect.type.dmgReduction) {
      this.defensiveStats.dmgReduction = (parseFloat(this.defensiveStats.dmgReduction) + value - valueToSub).toFixed(2);
    } else if (effect.type.elementalDmg) {
      this.offensiveStats.elementalDmg = (parseFloat(this.offensiveStats.elementalDmg) + value - valueToSub).toFixed(2);
    } else if (effect.type.elementalDmgReduction) {
      this.defensiveStats.elementalDmgReduction = (parseFloat(this.defensiveStats.elementalDmgReduction) + value - valueToSub).toFixed(2);
    } else if (effect.type.fireRate) {
      this.offensiveStats.fireRate = (parseFloat(this.offensiveStats.fireRate) + value - valueToSub).toFixed(2);
    } else if (effect.type.gunDmg) {
      this.offensiveStats.gunDmg = (parseFloat(this.offensiveStats.gunDmg) + value - valueToSub).toFixed(2);
    } else if (effect.type.handling) {
      this.utilityStats.handling = (parseFloat(this.utilityStats.handling) + value - valueToSub).toFixed(2);
    } else if (effect.type.healthRegen) {
      this.defensiveStats.healthRegen = (parseFloat(this.defensiveStats.healthRegen) + value - valueToSub).toFixed(2);
    } else if (effect.type.lifeSteal) {
      this.defensiveStats.lifeSteal = (parseFloat(this.defensiveStats.lifeSteal) + value - valueToSub).toFixed(2);
    } else if (effect.type.maxHealth) {
      this.defensiveStats.maxHealth = (parseFloat(this.defensiveStats.maxHealth) + value - valueToSub).toFixed(2);
    } else if (effect.type.meleeDmg) {
      this.offensiveStats.meleeDmg = (parseFloat(this.offensiveStats.meleeDmg) + value - valueToSub).toFixed(2);
    } else if (effect.type.modeSwitchSpeed) {
      this.utilityStats.modeSwitchSpeed = (parseFloat(this.utilityStats.modeSwitchSpeed) + value - valueToSub).toFixed(2);
    } else if (effect.type.movementSpeed) {
      this.utilityStats.movementSpeed = (parseFloat(this.utilityStats.movementSpeed) + value - valueToSub).toFixed(2);
    } else if (effect.type.reloadSpeed) {
      this.utilityStats.reloadSpeed = (parseFloat(this.utilityStats.reloadSpeed) + value - valueToSub).toFixed(2);
    } else if (effect.type.shieldRegenDelay) {
      this.defensiveStats.shieldRegenDelay = (parseFloat(this.defensiveStats.shieldRegenDelay) + value - valueToSub).toFixed(2);
    } else if (effect.type.shockDmg) {
      this.offensiveStats.shockDmg = (parseFloat(this.offensiveStats.shockDmg) + value - valueToSub).toFixed(2);
    } else if (effect.type.splashDmg) {
      this.offensiveStats.splashDmg = (parseFloat(this.offensiveStats.splashDmg) + value - valueToSub).toFixed(2);
    } else if (effect.type.splashDmgReduction) {
      this.defensiveStats.splashDmgReduction = (parseFloat(this.defensiveStats.splashDmgReduction) + value - valueToSub).toFixed(2);
    } else if (effect.type.statusEffectChance) {
      this.utilityStats.statusEffectChance = (parseFloat(this.utilityStats.statusEffectChance) + value - valueToSub).toFixed(2);
    } else if (effect.type.statusEffectDmg) {
      this.offensiveStats.statusEffectDmg = (parseFloat(this.offensiveStats.statusEffectDmg) + value - valueToSub).toFixed(2);
    } else if (effect.type.statusEffectDuration) {
      this.offensiveStats.statusEffectDuration = (parseFloat(this.offensiveStats.statusEffectDuration) + value - valueToSub).toFixed(2);
    } else if (effect.type.weaponSwapSpeed) {
      this.utilityStats.weaponSwapSpeed = (parseFloat(this.utilityStats.weaponSwapSpeed) + value - valueToSub).toFixed(2);
    }
  }

  /**
   * Switched stats view to the configuration view
   */
  toggleConfig() {
    document.getElementById("configToggle").classList.toggle("non-active");
    document.getElementById("statsToggle").classList.toggle("non-active");
    document.getElementById("stats-container").style.display = "none";
    document.getElementById("configs").style.display = "block";
  }

  /**
   * Switches the stats view to the stats information
   */
  toggleStats() {
    document.getElementById("configToggle").classList.toggle("non-active");
    document.getElementById("statsToggle").classList.toggle("non-active");
    document.getElementById("stats-container").style.display = "block";
    document.getElementById("configs").style.display = "none";
  }

  /**
   * Emits notification to show tooltoip on skill hover
   * 
   * @param skill 
   *              skill to display
   * @param event 
   *              event that triggered this
   */
  showToolTip(skill: Skill, event: any) {
    this.hovered.emit([skill, event]);
  }
}
