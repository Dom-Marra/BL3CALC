import { CharacterStat } from "../models/characterstat.model";

export const BASE_CHARACTER_STATS: Map<string, CharacterStat> =  new Map([
    ['accuracy', {
        text: 'Accuracy',
        valueType: 'percent',
        group: 'offense'
    }],
    ['actionSkillCooldown', {
        text: 'Action Skill Cooldown',
        valueType: 'percent',
        group: 'utility'
    }], 
    ['actionSkillDmg', {
        text: 'Action Skill Damage',
        valueType: 'percent',
        group: 'offense'
    }],
    ['armorDmg', {
        text: 'Armor Damage',
        valueType: 'percent',
        group: 'offense'
    }],
    ['bonusDmg', {
        text: 'Bonus Damage',
        valueType: 'percent',
        group: 'offense'
    }],
    ['bonusElementalDmg', {
        text: 'Bonus Elemental Damage',
        valueType: 'percent',
        group: 'offense'
    }],
    ['bonusIncendiaryDmg', {
        text: 'Bonus Incendiary Damage',
        valueType: 'percent',
        group: 'offense'
    }],
    ['bonusShockDmg', {
        text: 'Bonus Shock Damage',
        valueType: 'percent',
        group: 'offense'
    }],
    ['bonusCryoDmg', {
        text: 'Bonus Cryo Damage',
        valueType: 'percent',
        group: 'offense'
    }],
    ['chargeTime', {
        text: 'Charge Time',
        valueType: 'percent',
        group: 'utility'
    }],
    ['corrosiveDmg', {
        text: 'Corrosive Damage',
        valueType: 'percent',
        group: 'offense'
    }], 
    ['criticalHitDmg', {
        text: 'Critical Hit Damage',
        valueType: 'percent',
        group: 'offense'
    }],
    ['dmgIncrease', {
        text: 'Increased Damage',
        valueType: 'percent',
        group: 'offense'
    }],
    ['dmgReduction', {
        text: 'Reduced Damage Taken',
        valueType: 'percent',
        group: 'defense'
    }],
    ['elementalDmg', {
        text: 'Elemental Damage',
        valueType: 'percent',
        group: 'offense'
    }],
    ['elementalDmgReduction', {
        text: 'Reduced Elemental Damage Taken',
        valueType: 'percent',
        group: 'defense'
    }],
    ['fireRate', {
        text: 'Increased Fire Rate',
        valueType: 'percent',
        group: 'offense'
    }],
    ['gunDmg', {
        text: 'Increased Gun Damage',
        valueType: 'percent',
        group: 'offense'
    }],
    ['handling', {
        text: 'Increased Handling',
        valueType: 'percent',
        group: 'utility'
    }],
    ['healthRegen_maxHealth', {
        text: 'Increased Health Regen (Max HP)',
        valueType: 'percent',
        group: 'defense'
    }],
   ['healthRegen_missingHealth', {
        text: 'Increased Health Regen (Missing HP)',
        valueType: 'percent',
        group: 'offense'
    }],
   ['heatPerShot', {
        text: 'Heat Per Shot',
        valueType: 'percent',
        group: 'utility'
    }], 
    ['increasedIncendiaryDmg', {
        text: 'Increased Incendiary Damage',
        valueType: 'percent',
        group: 'offense'
    }],
    ['lifeSteal', {
        text: 'Life Steal',
        valueType: 'percent',
        group: 'defense'
    }],
    ['magSize', {
        text: 'Increased Magazine Size',
        valueType: 'percent',
        group: 'utility'
    }], 
    ['maxHealth', {
        text: 'Increased Max Health',
        valueType: 'percent',
        group: 'defense'
    }],
    ['maxShield', {
        text: 'Increased Max Shield',
        valueType: 'percent',
        group: 'defense'
    }], 
    ['meleeDmg', {
        text: 'Increased Melee Damage',
        valueType: 'percent',
        group: 'offense'
    }],
    ['modeSwitchSpeed', {
        text: 'Increase Mode Switch Speed',
        valueType: 'percent',
        group: 'utility'
    }],
    ['movementSpeed', {
        text: 'Increased Movement Speed',
        valueType: 'percent',
        group: 'utility'
    }],
    ['reloadSpeed', {
        text: 'Increased Reload Speed',
        valueType: 'percent',
        group: 'utility'
    }],
    ['shieldRegenDelay', {
        text: 'Shield Regeneration Delay',
        valueType: 'percent',
        group: 'defense'
    }],
    ['shieldRechargeRate', {
        text: 'Shield Recharge Rate',
        valueType: 'percent',
        group: 'defense'
    }],
    ['shockDmg', {
        text: 'Increased Shock Damage',
        valueType: 'percent',
        group: 'offense'
    }],
    ['shockDmgResist', {
        text: 'Shock Damage Resistance',
        valueType: 'percent',
        group: 'defense'
    }],
    ['splashDmg', {
        text: 'Increased Splash Damage',
        valueType: 'percent',
        group: 'offense'
    }],
    ['splashDmgReduction', {
        text: 'Splash Damage Reduction',
        valueType: 'percent',
        group: 'defense'
    }],
    ['statusEffectChance', {
        text: 'Increased Status Effect Chance',
        valueType: 'percent',
        group: 'offense'
    }],
    ['statusEffectDmg', {
        text: 'Increased Status Effect Damage',
        valueType: 'percent',
        group: 'offense'
    }],
    ['statusEffectDuration', {
        text: 'Increased Status Effect Duration',
        valueType: 'percent',
        group: 'offense'
    }],
    ['weaponSwapSpeed', {
        text: 'Increased Weapon Swap Speed',
        valueType: 'percent',
        group: 'utility'
    }],
])