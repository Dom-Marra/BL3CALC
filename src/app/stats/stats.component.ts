import { Component, OnInit, Input, Output, EventEmitter, DoCheck, KeyValueDiffers, IterableDiffers } from '@angular/core';
import { Skill } from '../skill';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit, DoCheck {

  private readonly MATH = Math;
  private readonly CHARACTER_OFFSET:number = 2;         //Number to add to character allocation to show correct level

  private _maxActionSkills: Array<number> = [];         //Max action skills the character can have put into an array
  private _maxActionMods: Array<number> = [];           //Max action mods a character can have put into an array
  private _maxOtherSkills: Array<number> = [];          //Max other skills a character can have put into an array (not used as of right now)

  private allocatedSkillDiffer: Array<any> = [];        //Array that holds KeyValueDiffer of skills
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
        skillDiffer.push(this.differs.find(skill.item).create()); 
      });

      //If skill was removed, remove that skill from the skilldiffer array
      skillsChange.forEachRemovedItem(skill => {
        skillDiffer.splice(skill.previousIndex, 1);
        this.updateStats(skill.item, 1);
      });
    }

    //For each skill in the skill array
    skillArray.forEach((skill, index) => {
       //Skill to be tested if it changed
      var skillchange = skillDiffer[index];    

      //Test if skill was changed
      var changes = skillchange.diff(skill);    

      //If there were changes
      if (changes) {

        //If the skill was just added call update sats with just the skill
        changes.forEachAddedItem(addedItem => {
          if (addedItem.key == 'allocatedPoints') {
            this.updateStats(skill);
          }
        })

        //If the skill had its allocation change:
        //call update stats with the skill, and the previous allocation number
        changes.forEachChangedItem(changedItem => {
          if (changedItem.key == 'allocatedPoints') {
            this.updateStats(skill, changedItem.previousValue);
          }
        })
      }
    })
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

  /**
   * Updates stats based on inputed skill
   * 
   * @param skill 
   *             skill to extract stats from
   * @param oldValue 
   *             old skill allocation amount
   */
  updateStats(skill: Skill, oldValue?: number) {

      //Traverse the skills effects
      skill.getSkillEffects().effects.forEach(effect => {

        //Only add the value if it has a type related to it
        if (effect.type != null) {
          var value: any = 0.00;
          var valueToSub: any = 0;

          //If the skill has been modified get the previous effect value
          if (oldValue != null) {
            effect.value != null ? valueToSub = effect.value : valueToSub = effect.values[oldValue - 1];
            
            //If the value isn't a number parse it to a float
            if (isNaN(valueToSub)) {
              valueToSub = parseFloat(valueToSub.replace(/^\D+[^-][a-zA-z]|\D+$/g, ""));
              
           }
          }

          //If the skill has points allocated get the effect value
          if (skill.getAllocatedPoints() > 0) {
            effect.value != null ? value = effect.value : value = effect.values[skill.getAllocatedPoints() - 1];
            
            //If the value isn't a number parse it to a float
            if (isNaN(value)) {
              value = parseFloat(value.replace(/^\D+[^-][a-zA-z]|\D+$/g, ""));
            }
          }
          
          //Check the type of the effect and add it to the appropriate stat
          if (effect.type.accuracy) {
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
        
      });
  }

}
