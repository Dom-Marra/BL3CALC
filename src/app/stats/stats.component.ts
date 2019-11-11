import { Component, OnInit, Input, Output, EventEmitter, DoCheck, KeyValueDiffers, IterableDiffers } from '@angular/core';
import { Skill } from '../skill';

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
    accuracy: {
      header: "Accuracy",
      value: "0"
    },
    actionSkillDmg: {
      header: "Action Skill Damage",
      value: "0"
    },
    armorDmg: {
      header: "Armor Damage",
      value: "0"
    },
    bonusDmg: {
      header: "Bonus Damage",
      value: "0"
    },
    bonusElementalDmg: {
      header: "Bonus Elemental Damage",
      value: "0"
    },
    bonusIncendiaryDmg: {
      header: "Bonus Incendiary Damage",
      value: "0"
    },
    corrosiveDmg: {
      header: "Corrosive Damage",
      value: "0"
    },
    criticalHitDmg: {
      header: "Critical Hit Damage",
      value: "0"
    },
    dmgIncrease: {
      header: "Increased Damage",
      value: "0"
    },
    elementalDmg: {
      header: "Elemental Damage",
      value: "0"
    },
    fireRate: {
      header: "Fire Rate",
      value: "0"
    },
    gunDmg: {
      header: "Gun Damage",
      value: "0"
    },
    handling: {
      header: "Handling",
      value: "0"
    },
    increasedIncendiaryDmg: {
      header: "Increased Incendiary Damage",
      value: "0"
    },
    meleeDmg: {
      header: "Melee Damage",
      value: "0"
    },
    shockDmg: {
      header: "Shock Damage",
      value: "0"
    },
    splashDmg: {
      header: "Splash Damage",
      value: "0"
    },
    statusEffectDmg: {
      header: "Status Effect Damage",
      value: "0"
    },
    statusEffectDuration: {
      header: "Status Effect Duration",
      value: "0"
    }
  };

  private defensiveStats = {                             //Defensive stats
    dmgReduction: {
      header: "Damage Reduction",
      value: "0"
    },
    elementalDmgReduction: {
      header: "Elemental Damage Reduction",
      value: "0"
    },
    healthRegen_maxHealth: {
      header: "Health Regen (max)",
      value: "0"
    },
    healthRegen_missingHealth: {
      header: "Health Regen (missing)",
      value: "0"
    },
    lifeSteal: {
      header: "Life Steal",
      value: "0"
    },
    maxHealth: {
      header: "Max Health",
      value: "0"
    },
    maxShield: {
      header: "Max Shield",
      value: "0"
    },
    shieldRechargeRate: {
      header: "Shield Recharge Rate",
      value: "0"
    },
    shieldRegenDelay: {
      header: "Shield Regen Delay",
      value: "0"
    },
    shockDmgResist: {
      header: "Shock Damage Resistance",
      value: "0"
    },
    splashDmgReduction: {
      header: "Splash Damage Reduction",
      value: "0"
    }
  }

  private utilityStats = {                                //Utility stats
    actionSkillCooldown: {
      header: "Action Skill Cooldown",
      value: "0"
    },
    chargeTime: {
      header: "Charge Time",
      value: "0"
    },
    handling: {
      header: "Handling",
      value: "0"
    },
    heatPerShot: {
      header: "Heat Per Shot",
      value: "0"
    },
    magSize: {
      header: "Mag Size",
      value: "0"
    },
    modeSwitchSpeed: {
      header: "Mode Switch Speed",
      value: "0"
    },
    movementSpeed: {
      header: "Movement Speed",
      value: "0"
    },
    reloadSpeed: {
      header: "Reload Speed",
      value: "0"
    },
    statusEffectChance: {
      header: "Status Effect Chance",
      value: "0"
    },
    weaponSwapSpeed: {
      header: "Weapon Swap Speed",
      value: "0"
    }
  }

  private extraStats = { }                        //Extra stats on the character

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
    this._maxActionSkills = [];
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
    this._maxActionMods = [];
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
    this._maxOtherSkills = [];
    for (var i = 0; i < maxOtherSkills; i++) {
      this._maxOtherSkills[i] = i;
    }
  }

  @Input()
  /**
   * Set extra stats based on extra stat types in the character object
   */
  set characterStats(characterStats: Object) {
    this.extraStats = {};

    for (var stat in characterStats) {
      if (characterStats[stat].header != null) {
        switch(characterStats[stat].type) {
          case "offense": {
            this.offensiveStats[stat] = characterStats[stat];
            break;
          }
          case "defense": {
            this.defensiveStats[stat] = characterStats[stat];
            break;
          }
          case "utility": {
            this.utilityStats[stat] = characterStats[stat];
            break;
          }
          default: {
            this.extraStats[stat] = characterStats[stat];
            break;
          }
        }
      } 
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
      this.skillsChangeAdded(skillsChange, skillDiffer);
      this.skillsChangeRemoved(skillsChange, skillDiffer);
    }
    
    //Check differences in skills
    this.checkAllocatedSkill(skillArray, skillDiffer);
    
  }


  /**
   * Checks if a skill was added 
   * 
   * @param skillsChange 
   *            changes of skillsDiffer
   * @param skillDiffer 
   *            Array that holds KeyValueDiffer of skills
   */
  skillsChangeAdded(skillsChange, skillDiffer) {

    //If skill was added, add that skill to the skilldiffer array
    skillsChange.forEachAddedItem(skill => {
      skillDiffer.push([this.differs.find(skill.item).create()]);
      this.addEffects(skillDiffer, skill);
    });
  }

  /**
   * Adds effects from a skill into the skillDiffer array at the position
   * of the skill
   * 
   * @param skillDiffer 
   *            Array that holds KeyValueDiffer of skills
   * @param skill 
   *            Skill to get effects from
   */
  addEffects(skillDiffer, skill) {

    //Get the index of last element in the skilldiffer array
    var index = skillDiffer.length - 1;

    skill.item.getSkillEffects().effects.forEach(effect => {

      //If there is a conditional to the effect push into the skilldiffer array with the current skill
      if (effect.conditional != null) {
        skillDiffer[index].push(this.differs.find(effect.conditional).create());

        //Try to add the conditional to our conditional array
        this.addConditional(effect.conditional);

        //Check if there is an array of conditionals
      } else if (effect.conditionals != null) {
        effect.conditionals.forEach(conditional => {
          skillDiffer[index].push(this.differs.find(conditional).create());

          //Try to add the conditional to our conditional array
          this.addConditional(conditional);
        }); 
      }

    });
  }

  /**
   * Checks if skills were removed
   * 
   * @param skillsChange 
   *            changes of skillsDiffer
   * @param skillDiffer 
   *            Array that holds KeyValueDiffer of skills
   */
  skillsChangeRemoved(skillsChange, skillDiffer) {
    var removedSkills = [];

    //If a skill was removed, remove that entry from the skilldiffer array and add it to removed skills
    //Index offset is only used when a bulk of skills is removed (Tree resets)
    var indexOffset = 0; 
    skillsChange.forEachRemovedItem(skill => {
      var oldAllocation = this.removeSkill(skillDiffer, skill, indexOffset);
      removedSkills.push({skill: skill, oldAllocation: oldAllocation});
      indexOffset++;
    });

    if (removedSkills.length > 0) {

      //Sort the removed skills, skills that have effectiveness attatched should be removes first
      removedSkills.sort((elementA, elementB) => {
        let aResult;
        let bResult;

        elementA.skill.item.getSkillEffects().effects.forEach(effect => {
          if (effect.conditionals != null) {
           return effect.conditionals.forEach(cond => {
              if (cond.effectiveness != null) {
                aResult = -1;
              } 
            });
          } else if (effect.conditional != null && effect.conditional.effectiveness != null) {
            aResult = -1;
          } 
        });
        
        elementB.skill.item.getSkillEffects().effects.forEach(effect => {
          if (effect.conditionals != null) {
           return effect.conditionals.forEach(cond => {
              if (cond.effectiveness != null) {
                bResult =  1;
              } 
            });
          } else if (effect.conditional != null && effect.conditional.effectiveness != null) {
            bResult =  1;
          }
        });

        if (aResult == bResult) {
          return 0;
        } else if (aResult != null) {
          return aResult;
        }  else if (bResult != null) {
          return bResult;
        } 
      });

      removedSkills.forEach(entry => {
        this.updateStatBySkill(entry.skill.item, entry.oldAllocation);
        this.removeEffects(entry.skill);
      });
    }
  }

  /**
   * Removes skills from skillDiffer array
   * 
   * @param skillDiffer 
   *             Array that holds KeyValueDiffer of skills
   * @param skill 
   *            skill entry in skillDiffer array; used to determine skill index in skillDiffer array
   * @param indexOffset 
   *            Offsets the skill index on skillDiffer when multple skills are removed at once
   * @returns
   *        The old allocated points of the removed skills
   */
  removeSkill(skillDiffer, skill, indexOffset): number {
    const removedSkill = skillDiffer.splice(skill.previousIndex - indexOffset, 1);

    //Traverse through the records of the removed skills until allocated points is reached
    //If the current allocated points is greater than 1 use it, otherwise use 1
    for (let [key, value] of removedSkill[0][0]._records) {
      if (key == "allocatedPoints") {
        return value.currentValue > 1 ? value.currentValue : 1;
      }
    }
  }

  /**
   * Removes skill effects from stats when a skill is removed
   * 
   * @param skill 
   *          skill entry in skillDiffer array
   */
  removeEffects(skill) {

    //Traverse the skill effects
    skill.item.getSkillEffects().effects.forEach(effect => {
      //Try to remove the conditional (if any) from the stats conditional array
      if (effect.conditional != null) {
        this.removeConditional(effect.conditional);

        //Remove effects based on the conditionals current value
        //subtract one due to the update stats line done above
        if (effect.conditional.currentValue != null && effect.conditional.currentValue > 0) {
          this.updateStatByEffect(skill.item, effect, null, effect.conditional.currentValue - 1);
        }
      } else if (effect.conditionals != null) {
        effect.conditionals.forEach(conditional => {
          this.removeConditional(conditional);

          //Remove effects based on the conditionals current value
          //subtract one due to the update stats line done above
          if (conditional.currentValue != null && conditional.currentValue > 0) {
            this.updateStatByEffect(skill.item, effect, null, conditional.currentValue - 1);
          }
        });
      }
    });

  }

  /**
   * Checks if there are any changes to skill properties
   * 
   * @param skillArray 
   *             Array of allocated skills
   * @param skillDiffer 
   *             Array that holds KeyValueDiffer of skills
   */
  checkAllocatedSkill(skillArray, skillDiffer) {
     //For each skill in the skill array
     skillArray.forEach((skill, index) => {
      this.checkSkillEffects(skillDiffer, skill, index);

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
        });
      }
      
    });
  }

  /**
   * Checks for differences in skill effects
   * 
   * @param skillDiffer 
   *              Array that holds KeyValueDiffer of skills
   * @param skill 
   *              skill to check effects of
   * @param index 
   *              index of skill in skillDiffer array
   */
  checkSkillEffects(skillDiffer, skill, index) {
    //Index of the conditional in the skilldiff array
    var conditionalIndex = 0;
    skill.getSkillEffects().effects.forEach(effect => {
      
      if (effect.conditional != null) {
        this.checkEffectConditional(skillDiffer, index, conditionalIndex, effect, skill, effect.conditional);

        conditionalIndex++;
      } else if (effect.conditionals != null) {
        effect.conditionals.forEach(conditional => {
          this.checkEffectConditional(skillDiffer, index, conditionalIndex, effect, skill, conditional);
          conditionalIndex++;
        });
      }

    });

  }

  /**
   * Checks differences in effect conditionals 
   * 
   * @param skillDiffer 
   *             Array that holds KeyValueDiffer of skills
   * @param index 
   *             index of skill in skillDiffer array
   * @param conditionalIndex 
   *             index of conditional in skillDiffer array
   * @param effect 
   *            effect that the conditional belongs to
   * @param skill 
   *            skill that the effect belongs to
   * @param conditional 
   *            conditional that is being checked
   */
  checkEffectConditional(skillDiffer, index, conditionalIndex, effect, skill, conditional) {

    //Confitional to be tested if it changed
    var effectChange = skillDiffer[index][conditionalIndex + 1];

    //Get changes
    var changes = effectChange.diff(conditional);

    var oldConditionalIndex = effect.conditionals != null ? effect.conditionals.indexOf(conditional) : null;

    //Check if there are any changes
    if (changes) {
      
      //If the conditional was changed:
      //call update stats with the skill, with previous values
      changes.forEachChangedItem(changedItem => {
        if (changedItem.key == "active") {
          this.updateStatByEffect(skill, effect, changedItem.previousValue, null, null, null, oldConditionalIndex);
        } else if (changedItem.key == "currentValue") {
          this.updateStatByEffect(skill, effect, null, changedItem.previousValue);
        } else if (changedItem.key == "effectiveness") {
            this.updateStatByEffect(skill, effect, null, null, changedItem.previousValue, changedItem.currentValue);
        }
      });
    }
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
    //Make the removed conditional active = false if it's able to be changed
    //If the conditional is found set the index and exit
    this.conditionals.forEach((next, index) => {
      if (next[0] == conditional) {
        if (--next[1] == 0) {

          if (conditional.stateChangeable != false) {
            conditional.active = false;
          }

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
   *              the conditional to update
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

    conditional.currentValue = insertedValue;
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
   *             old effectiveness value of the effect
   * @param currentEffectiveness
   *            current effectiveness value of the effect
   */
  updateStatByEffect(skill: Skill, effect: any, oldConditional?: boolean, oldConditionalValue?: number, oldEffectiveness?: number, currentEffectiveness?:number, oldConditionalIndex?: number) {
    var value = this.calculateValue(skill, effect, null); 
    var valueToSub = 0;                                   
    
    //Provide old condtional or old conditional value if its provided
    if (oldConditional != null || oldConditionalValue != null || oldEffectiveness != null) {
      valueToSub = this.calculateValue(skill, effect, null, oldConditional, oldConditionalValue, oldEffectiveness, currentEffectiveness, oldConditionalIndex);
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
   * @param oldEffectiveness
   *             old effectiveness value of the effect
   * @param currentEffectiveness
   *            current effectiveness value of the effect
   * @param oldConditionalIndex
   *            index of conditional if the effect contains more than 1
   */
  calculateValue(skill: Skill, effect: any, oldIndex?: number, oldConditional?: boolean, oldConditionalValue?: number, oldEffectiveness?:number, currentEffectiveness?:number, oldConditionalIndex?: number) {
    var value: any = 0.00;        //the value to calculate
    var valueMulti: number = 1;   //multiplier for the value

    //Check if the effect has a conditional
    if (effect.conditional != null) {
      if (oldConditionalValue == null) { //Old conditional value wasn't updated
        if (effect.conditional.active && oldConditional == null || oldConditional == true) { //effect is active and the old state was either null, or active
          valueMulti = effect.getActiveValueMulti != null ? effect.getActiveValueMulti() : 1;
        } else if (!effect.conditional.active && oldConditional == null || oldConditional == false) { //effect is inactive and the old state was either null, or inactive
          valueMulti = effect.getNotActiveValueMulti != null ? effect.getNotActiveValueMulti() : 0;
        } 
      } else {
        valueMulti = oldConditionalValue;
      }

      //Check if the effect has mulitple conditioals
    } else if (effect.conditionals != null) {
     if (oldConditionalValue == null) { //No old conditional value was provided continue to get value multi
        if (oldConditionalIndex != null) {  //Old conditional index was proivded, just get the value multi
          if (oldConditional) { 
            if (effect.getActiveValueMultis != null && effect.getActiveValueMultis[oldConditionalIndex] != null) {
              valueMulti = effect.getActiveValueMultis[oldConditionalIndex]();
            } else {
              valueMulti = 1;
            }
          } else {
            if (effect.getNotActiveValueMultis != null && effect.getNotActiveValueMultis[oldConditionalIndex] != null) {
              valueMulti = effect.getNotActiveValueMultis[oldConditionalIndex]();
            } else {
              valueMulti = 0;
            }
          }
        } else { //Traverse conditionals if no old condtional index was provided and get value multi
          effect.conditionals.forEach((conditional, index) => { 
              if (conditional.active) { 
                if (effect.getActiveValueMultis != null && effect.getActiveValueMultis[index] != null) {
                  valueMulti = effect.getActiveValueMultis[index]();
                } else {
                  valueMulti = 1;
                }
              } else {
                if (effect.getNotActiveValueMultis != null && effect.getNotActiveValueMultis[index] != null) {
                  valueMulti = effect.getNotActiveValueMultis[index]();
                } else {
                  valueMulti = 0;
                }
              }
          });
        }
      } else {
        valueMulti = oldConditionalValue;
      }
    }

    //If old effectiveness was provided get the value multi based on it
    if (oldEffectiveness) valueMulti = (valueMulti / currentEffectiveness) * oldEffectiveness;

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
    effect.type.forEach(type => {
      if (type.extraType != null) {
        type.extraType.setFunc(value - valueToSub);
      } else if (type.accuracy) {
        this.offensiveStats.accuracy.value = (parseFloat(this.offensiveStats.accuracy.value) + value - valueToSub).toFixed(2);
      } else if (type.actionSkillCooldown) {
        this.utilityStats.actionSkillCooldown.value = (parseFloat(this.utilityStats.actionSkillCooldown.value) + value - valueToSub).toFixed(2);
      } else if (type.actionSkillDmg) {
        this.offensiveStats.actionSkillDmg.value = (parseFloat(this.offensiveStats.actionSkillDmg.value) + value - valueToSub).toFixed(2);
      } else if (type.armorDmg) {
        this.offensiveStats.armorDmg.value = (parseFloat(this.offensiveStats.armorDmg.value) + value - valueToSub).toFixed(2);
      } else if (type.bonusDmg) {
        this.offensiveStats.bonusDmg.value = (parseFloat(this.offensiveStats.bonusDmg.value) + value - valueToSub).toFixed(2);
      } else if (type.bonusElementalDmg) {
        this.offensiveStats.bonusElementalDmg.value = (parseFloat(this.offensiveStats.bonusElementalDmg.value) + value - valueToSub).toFixed(2);
      } else if (type.bonusIncendiaryDmg) {
        this.offensiveStats.bonusIncendiaryDmg.value = (parseFloat(this.offensiveStats.bonusIncendiaryDmg.value) + value - valueToSub).toFixed(2);
      } else if (type.chargeTime) {
        this.utilityStats.chargeTime.value = (parseFloat(this.utilityStats.chargeTime.value) + value - valueToSub).toFixed(2);
      }  else if (type.corrosiveDmg) {
        this.offensiveStats.corrosiveDmg.value = (parseFloat(this.offensiveStats.corrosiveDmg.value) + value - valueToSub).toFixed(2);
      } else if (type.criticalHitDmg) {
        this.offensiveStats.criticalHitDmg.value = (parseFloat(this.offensiveStats.criticalHitDmg.value) + value - valueToSub).toFixed(2);
      } else if (type.dmgIncrease) {
        this.offensiveStats.dmgIncrease.value = (parseFloat(this.offensiveStats.dmgIncrease.value) + value - valueToSub).toFixed(2);
      } else if (type.dmgReduction) {
        this.defensiveStats.dmgReduction.value = (parseFloat(this.defensiveStats.dmgReduction.value) + value - valueToSub).toFixed(2);
      } else if (type.elementalDmg) {
        this.offensiveStats.elementalDmg.value = (parseFloat(this.offensiveStats.elementalDmg.value) + value - valueToSub).toFixed(2);
      } else if (type.elementalDmgReduction) {
        this.defensiveStats.elementalDmgReduction.value = (parseFloat(this.defensiveStats.elementalDmgReduction.value) + value - valueToSub).toFixed(2);
      } else if (type.fireRate) {
        this.offensiveStats.fireRate.value = (parseFloat(this.offensiveStats.fireRate.value) + value - valueToSub).toFixed(2);
      } else if (type.gunDmg) {
        this.offensiveStats.gunDmg.value = (parseFloat(this.offensiveStats.gunDmg.value) + value - valueToSub).toFixed(2);
      } else if (type.handling) {
        this.utilityStats.handling.value = (parseFloat(this.utilityStats.handling.value) + value - valueToSub).toFixed(2);
      } else if (type.healthRegen_maxHealth) {
        this.defensiveStats.healthRegen_maxHealth.value = (parseFloat(this.defensiveStats.healthRegen_maxHealth.value) + value - valueToSub).toFixed(2);
      } else if (type.healthRegen_missingHealth) {
        this.defensiveStats.healthRegen_missingHealth.value = (parseFloat(this.defensiveStats.healthRegen_missingHealth.value) + value - valueToSub).toFixed(2);
      } else if (type.heatPerShot) {
        this.utilityStats.heatPerShot.value = (parseFloat(this.utilityStats.heatPerShot.value) + value - valueToSub).toFixed(2);
      } else if (type.increasedIncendiaryDmg) {
        this.offensiveStats.increasedIncendiaryDmg.value = (parseFloat(this.offensiveStats.increasedIncendiaryDmg.value) + value - valueToSub).toFixed(2);
      } else if (type.lifeSteal) {
        this.defensiveStats.lifeSteal.value = (parseFloat(this.defensiveStats.lifeSteal.value) + value - valueToSub).toFixed(2);
      } else if (type.magSize) {
        this.utilityStats.magSize.value = (parseFloat(this.utilityStats.magSize.value) + value - valueToSub).toFixed(2);
      } else if (type.maxHealth) {
        this.defensiveStats.maxHealth.value = (parseFloat(this.defensiveStats.maxHealth.value) + value - valueToSub).toFixed(2);
      } else if (type.maxShield) {
        this.defensiveStats.maxShield.value = (parseFloat(this.defensiveStats.maxShield.value) + value - valueToSub).toFixed(2);
      } else if (type.meleeDmg) {
        this.offensiveStats.meleeDmg.value = (parseFloat(this.offensiveStats.meleeDmg.value) + value - valueToSub).toFixed(2);
      } else if (type.modeSwitchSpeed) {
        this.utilityStats.modeSwitchSpeed.value = (parseFloat(this.utilityStats.modeSwitchSpeed.value) + value - valueToSub).toFixed(2);
      } else if (type.movementSpeed) {
        this.utilityStats.movementSpeed.value = (parseFloat(this.utilityStats.movementSpeed.value) + value - valueToSub).toFixed(2);
      } else if (type.reloadSpeed) {
        this.utilityStats.reloadSpeed.value = (parseFloat(this.utilityStats.reloadSpeed.value) + value - valueToSub).toFixed(2);
      } else if (type.shieldRechargeRate) {
        this.defensiveStats.shieldRechargeRate.value = (parseFloat(this.defensiveStats.shieldRechargeRate.value) + value - valueToSub).toFixed(2);
      } else if (type.shieldRegenDelay) {
        this.defensiveStats.shieldRegenDelay.value = (parseFloat(this.defensiveStats.shieldRegenDelay.value) + value - valueToSub).toFixed(2);
      } else if (type.shockDmg) {
        this.offensiveStats.shockDmg.value = (parseFloat(this.offensiveStats.shockDmg.value) + value - valueToSub).toFixed(2);
      } else if (type.shockDmgResist) {
        this.defensiveStats.shockDmgResist.value = (parseFloat(this.defensiveStats.shockDmgResist.value) + value - valueToSub).toFixed(2);
      } else if (type.splashDmg) {
        this.offensiveStats.splashDmg.value = (parseFloat(this.offensiveStats.splashDmg.value) + value - valueToSub).toFixed(2);
      } else if (type.splashDmgReduction) {
        this.defensiveStats.splashDmgReduction.value = (parseFloat(this.defensiveStats.splashDmgReduction.value) + value - valueToSub).toFixed(2);
      } else if (type.statusEffectChance) {
        this.utilityStats.statusEffectChance.value = (parseFloat(this.utilityStats.statusEffectChance.value) + value - valueToSub).toFixed(2);
      } else if (type.statusEffectDmg) {
        this.offensiveStats.statusEffectDmg.value = (parseFloat(this.offensiveStats.statusEffectDmg.value) + value - valueToSub).toFixed(2);
      } else if (type.statusEffectDuration) {
        this.offensiveStats.statusEffectDuration.value = (parseFloat(this.offensiveStats.statusEffectDuration.value) + value - valueToSub).toFixed(2);
      } else if (type.weaponSwapSpeed) {
        this.utilityStats.weaponSwapSpeed.value = (parseFloat(this.utilityStats.weaponSwapSpeed.value) + value - valueToSub).toFixed(2);
      }
    });
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
