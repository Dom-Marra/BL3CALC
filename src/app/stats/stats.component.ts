import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OtherSkill } from '../otherskill';
import { ActionSkill } from '../actionskill';
import { Skill } from '../skill';
import { NormalSkill } from '../normalskill';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  private readonly MATH = Math;
  private readonly CHARACTER_OFFSET:number = 2;         //Number to add to character allocation to show correct level

  private _maxActionSkills: Array<number> = [];         //Max action skills the character can have put into an array
  private _maxActionMods: Array<number> = [];           //Max action mods a character can have put into an array
  private _maxOtherSkills: Array<number> = [];          //Max other skills a character can have put into an array (not used as of right now)
  
  private offensiveStats = {
    accuracy: 0,
    actionSkillDmg: 0,
    bonusDmg: 0,
    bonusElementalDmg: 0,
    criticalHitDmg: 0,
    dmgIncrease: 0,
    elementalDmg: 0,
    fireRate: 0,
    gunDmg: 0,
    handling: 0,
    meleeDmg: 0,
    shockDmg: 0,
    splashDmg: 0,
    statusEffectDmg: 0,
    statusEffectDuration: 0
  };

  private defensiveStats = {
    dmgReduction: 0,
    elementalDmgReduction: 0,
    healthRegen: 0,
    lifeSteal: 0,
    maxHealth: 0,
    shieldRegenDelay: 0,
    splashDmgReduction: 0
  }

  private utilityStats = {
    chargeTime: 0,
    handling: 0,
    modeSwitchSpeed: 0,
    movementSpeed: 0,
    reloadSpeed: 0,
    statusEffectChance: 0,
    weaponSwapSpeed: 0
  }

  @Input()
  allocatedPoints: number;                              //Points allocated in tree

  @Input()
  actionSkills: Array<ActionSkill>;                     //Action skills that have been allocated
  
  @Input()
  actionMods: Array<Array<Skill>>;                      //Action mods that have been allocated

  @Input()
  otherSkills: Array<OtherSkill>;                       //Other skills that have been allocated

  @Input()
  normalSkills: Array<NormalSkill>;

  @Input()
  set normalSkillPoints(normalskillPoints: number) {
    this.updateStats(this.normalSkills);
  }

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

  @Output() hovered = new EventEmitter<Array<any>>();

  constructor() { 
    
  }

  ngOnInit() {

  }

  showToolTip(skill: Skill, event: any) {
    this.hovered.emit([skill, event]);
  }

  updateStats(skills: Array<Skill>) {
    this.offensiveStats = {
      accuracy: 0,
      actionSkillDmg: 0,
      bonusDmg: 0,
      bonusElementalDmg: 0,
      criticalHitDmg: 0,
      dmgIncrease: 0,
      elementalDmg: 0,
      fireRate: 0,
      gunDmg: 0,
      handling: 0,
      meleeDmg: 0,
      shockDmg: 0,
      splashDmg: 0,
      statusEffectDmg: 0,
      statusEffectDuration: 0
    };

    this.defensiveStats = {
      dmgReduction: 0,
      elementalDmgReduction: 0,
      healthRegen: 0,
      lifeSteal: 0,
      maxHealth: 0,
      shieldRegenDelay: 0,
      splashDmgReduction: 0
    }

    this.utilityStats = {
      chargeTime: 0,
      handling: 0,
      modeSwitchSpeed: 0,
      movementSpeed: 0,
      reloadSpeed: 0,
      statusEffectChance: 0,
      weaponSwapSpeed: 0
    }

    skills.forEach(skill => {
      skill.getSkillEffects().effects.forEach(effect => {
        
        if (effect.type != null) {
          var value: any;
          effect.value != null ? value = effect.value : value = effect.values[skill.getAllocatedPoints() - 1];
          
          if (isNaN(value)) {
            
             value = parseFloat(value.replace(/^\D+|\D+$/g, ""));
          }
          
          if (effect.type.accuracy) {
            this.offensiveStats.accuracy += value;
          }
          if (effect.type.actionSkillDmg) {
            this.offensiveStats.actionSkillDmg += value;
          }
          if (effect.type.bonusDmg) {
            this.offensiveStats.bonusDmg += value;
          }
          if (effect.type.bonusElementalDmg) {
            this.offensiveStats.bonusElementalDmg += value;
          }
          if (effect.type.chargeTime) {
            this.utilityStats.chargeTime += value;
          }
          if (effect.type.criticalHitDmg) {
            this.offensiveStats.criticalHitDmg += value;
          }
          if (effect.type.dmgIncrease) {
            this.offensiveStats.dmgIncrease += value;
          }
          if (effect.type.dmgReduction) {
            this.defensiveStats.dmgReduction += value;
          }
          if (effect.type.elementalDmg) {
            this.offensiveStats.elementalDmg += value;
          }
          if (effect.type.elementalDmgReduction) {
            this.defensiveStats.elementalDmgReduction += value;
          }
          if (effect.type.fireRate) {
            this.offensiveStats.fireRate += value;
          }
          if (effect.type.gunDmg) {
            this.offensiveStats.gunDmg += value;
          }
          if (effect.type.handling) {
            this.utilityStats.handling += value;
          }
          if (effect.type.healthRegen) {
            this.defensiveStats.healthRegen += value;
          }
          if (effect.type.lifeSteal) {
            this.defensiveStats.lifeSteal += value;
          }
          if (effect.type.maxHealth) {
            this.defensiveStats.maxHealth += value;
          }
          if (effect.type.meleeDmg) {
            this.offensiveStats.meleeDmg += value;
          }
          if (effect.type.modeSwitchSpeed) {
            this.utilityStats.modeSwitchSpeed += value;
          }
          if (effect.type.movementSpeed) {
            this.utilityStats.movementSpeed += value;
          }
          if (effect.type.reloadSpeed) {
            this.utilityStats.reloadSpeed += value;
          }
          if (effect.type.shieldRegenDelay) {
            this.defensiveStats.shieldRegenDelay += value;
          }
          if (effect.type.shockDmg) {
            this.offensiveStats.shockDmg += value;
          }
          if (effect.type.splashDmg) {
            this.offensiveStats.splashDmg += value;
          }
          if (effect.type.splashDmgReduction) {
            this.defensiveStats.splashDmgReduction += value;
          }
          if (effect.type.statusEffectChance) {
            this.utilityStats.statusEffectChance += value;
          }
          if (effect.type.statusEffectDmg) {
            this.offensiveStats.statusEffectDmg += value;
          }
          if (effect.type.statusEffectDuration) {
            this.offensiveStats.statusEffectDuration += value;
          }
          if (effect.type.weaponSwapSpeed) {
            this.utilityStats.weaponSwapSpeed += value;
          }
        }
        
      });
    });
  }

}
