import { ActionMod } from "../../classes/actionmod";
import { ActionSkill } from "../../classes/actionskill";
import { NormalSkill } from "../../classes/normalskill";
import { OtherSkill } from "../../classes/otherskill";
import { Skill } from "../../classes/skill";

export const ORANGE_SKILLS: Array<Skill> = [
    new ActionSkill("PHASEGRASP",
        "Amara summons a giant fist that bursts from the ground and locks " +
        "the targeted enemy in place for a few seconds.<br /><br />" +
        "Some enemies are immune to being Grasped and instantly take damage instead.",
        'assets/images/amara/skills/PhaseGrasp.png', 1, -1, 1, 0, "red",
        [{
            name: "Skill Duration",
            textValues: ["7 seconds"]
        },
        {
            name: "Cooldown",
            textValues: ["16 seconds"]
        },
        {
            name: "Grasp Immune Damage",
            textValues: ['28']
        }]),
    new ActionSkill("THE ETERNAL FIST",
        "Amara summons a giant fist that bursts from the ground and locks " +
        "the targeted enemy in place for a few seconds.<br /><br />" +
        "Whenever the Grasped enemy is killed, a new fist seeks out and Grasps a new target",
        'assets/images/amara/skills/TheEternalFists.png', -1, 2, 1, 10, "red",
        [{
            name: "Bonus Targets",
            textValues: ["Up to +4"]
        },
        {
            name: "Cooldown",
            textValues: ["20 seconds"]
        },
        {
            name: "Grasp Immune Damage",
            textValues: ['28']
        }]),
    new ActionSkill("TIES THAT BIND",
        "Amara summons a giant fist that bursts from the ground " +
        "and locks the targeted enemy in place for a few seconds. <br /><br />" +
        "Enemies near the Grasped target are linked, and any damage dealt to a " +
        "linked target is shared between all other linked targets."
        , 'assets/images/amara/skills/TiesThatBind.png', 3, 3, 1, 15, "red",
        [{
            name: "Link Damage",
            textValues: ["35% of damage dealt"]
        },
        {
            name: "Cooldown",
            textValues: ["18 seconds"]
        },
        {
            name: "Grasp Immune Damage",
            textValues: ['34']
        }]),
    new ActionSkill("FIST OVER MATTER",
        "Amara summons a giant fist that bursts from the ground and " +
        "locks the targeted enemy in place for a few seconds.<br /><br />" +
        "After Grasping the targeted enemy, large fists appear and constantly " +
        "smash the area, dealing damage to nearby enemies."
        , 'assets/images/amara/skills/FistOverMatter.png', -1, 4, 1, 20, "red",
        [{
            name: "Cooldown",
            textValues: ["28 seconds"]
        },
        {
            name: "Damage",
            textValues: ['35']
        },
        {
            name: "Grasp Immune Damage",
            textValues: ['39']
        }]),
    new OtherSkill("SOULFIRE", "Converts Amara's Action Skill to Incendiary Damage.",
        'assets/images/amara/skills/SoulFire.png', 3, 1, 1, 5, "red",
        [{ name: "Converts to Incendiary Damage" }]),
    new ActionMod("ALLURE", "Amara's Action Skill creates a singularity that pulls in enemies.",
        'assets/images/amara/skills/Allure.png', 3, 2, 1, 10, "red",
        [{
            name: "Action Skill Damage",
            stats: [{ key: 'actionSkillDmg' }],
            textValues: ["-20%"],
            values: [-20]
        },
        {
            name: "Duration",
            textValues: ["2.5 seconds"]
        }]),
    new NormalSkill("ANIMA",
        "Amara's Status Effects deal increased damage over time and have " +
        "increased duration. Her Action Skill Status Effect deals further increased damage.",
        'assets/images/amara/skills/Anima.png', 0, 0, 5, 0, "red",
        [{
            name: "Action Skill Status Effect Damage",
            textValues: ["+8%", "+16%", "+24%", "+32%", "+40%"]
        },
        {
            name: "Status Effect Damage",
            stats: [{ key: 'statusEffectDmg' }],
            textValues: ["+4%", "+8%", "+12%", "+16%", "+20%"],
            values: [4, 8, 12, 16, 20]
        },
        {
            name: "Status Effect Duration:",
            stats: [{ key: 'statusEffectDuration' }],
            textValues: ["+20%", "+40%", "+60%", "+80%", "+100%"],
            values: [20, 40, 60, 80, 100]
        }]),
    new NormalSkill("STEADY HAND(S)",
        "Amara gains increased Weapon Handling and Accuracy.",
        'assets/images/amara/skills/SteadyHands.png', 1, 0, 3, 0, "red",
        [{
            name: "Handling",
            stats: [{ key: 'handling' }],
            textValues: ["+14%", "+24%", "+32%"],
            values: [14, 24, 32]
        },
        {
            name: "Accuracy",
            stats: [{ key: 'accuracy' }],
            textValues: ["+13%", "+23%", "+31%"],
            values: [13, 23, 31]
        }]),
    new NormalSkill("INFUSION",
        "Convert a portion of damage dealt by Amara's weapons into her Action Skill Element.",
        'assets/images/amara/skills/Infusion.png', 2, 0, 5, 0, "red",
        [{
            name: "Converted Damage",
            textValues: ["8%", "16%", "24%", "32%", "40%"]
        }]),
    new NormalSkill("TEMPEST",
        "Amara deals increased Elemental Damage. Shock damage is further increased.",
        'assets/images/amara/skills/Tempest.png', 0, 1, 5, 5, "red",
        [{
            name: "Shock Damage",
            stats: [{ key: 'shockDmg' }],
            textValues: ["+8.0%", "+16.0%", "+24.0%", "+32.0%", "+40.0%"],
            values: [8, 16, 24, 32, 40]
        },
        {
            name: "Elemental Damage",
            stats: [{ key: 'elementalDmg' }],
            textValues: ["+6.0%", "+12.0%", "+18.0%", "+24.0%", "+30.0%"],
            values: [6, 12, 18, 24, 30]
        }]),
    new NormalSkill("ILLUMINATED FIST",
        "Amara gains increased Melee Damage and her Melee Damage is converted to her Action Skill Element.",
        'assets/images/amara/skills/IlluminatedFist.png', 1, 1, 1, 5, "red",
        [{
            name: "Melee Damage",
            stats: [{ key: 'meleeDmg' }],
            textValues: ["+75.0%"],
            values: [75]
        }]),
    new NormalSkill("WILDFIRE",
        "Whenever Amara applies a Status Effect to an enemy, it has a chance to spread to a nearby enemy.",
        'assets/images/amara/skills/Wildfire.png', 2, 1, 5, 5, "red",
        [{
            name: "Spread Chance",
            textValues: ["8%", "16%", "24%", "32%", "40%"],
            values: [8, 16, 24, 32, 40]
        }]),
    new NormalSkill("DREAD",
        "Amara's Gun Damage is increased for a few seconds after an enemy is Grasped.<br /><br />" +
        "Whenever any player kills a Grasped enemy, their current weapon is instantly reloaded.",
        'assets/images/amara/skills/Dread.png', 1, 2, 1, 10, "red",
        [{
            name: "Gun Damage",
            stats: [{ key: 'gunDmg' }],
            conditionals: ['graspedAnEnemy'],
            textValues: ["+15%"],
            values: [15]
        },
        {
            name: "Duration",
            textValues: ["8 seconds"]
        }]),
    new NormalSkill("INDISCRIMINATE",
        "Amara's bullets that damage enemies have a chance to ricochet " +
        "and deal decreased damage to other nearby enemies. Ricochet Chance and Damage " +
        "are increased if the target is currently affected by Phasegrasp or Stillness of Mind.",
        'assets/images/amara/skills/Indiscriminate.png', 0, 3, 3, 15, "red",
        [{
            name: "Ricochet Chance",
            textValues: ["10%", "20%", "30%"]
        },
        {
            name: "Ricochet Damage",
            textValues: ["-50%"]
        },
        {
            name: "Action Skill Ricochet Chance",
            textValues: ["20%", "40%", "60%"]
        },
        {
            name: "Action Skill Ricochet Damage",
            textValues: ["-25%"]
        }]),
    new NormalSkill("DEEP WELL",
        "Amara gains increased Magazine Size with elemental weapons.",
        'assets/images/amara/skills/DeepWell.png', 1, 3, 1, 15, "red",
        [{
            name: "Magazine Size",
            textValues: ["+20%"]
        }]),
    new NormalSkill("CATHARSIS",
        "Whenever Amara triggers an elemental effect on an enemy, when that enemy " +
        "dies that enemy explodes, dealing her attuned element damage along with any " +
        "other element that is currently inflicted upon that enemy. This skill has a short cooldown.",
        'assets/images/amara/skills/Catharsis.png', 2, 3, 3, 15, "red",
        [{
            name: "Damage",
            textValues: ['4', '8', '13']
        },
        {
            name: "Cooldown",
            textValues: ["8 seconds"]
        }]),
    new NormalSkill("SUSTAINMENT",
        "Amara gains Life Steal whenever she deals Elemental Damage with her weapon.",
        'assets/images/amara/skills/Sustainment.png', 0, 4, 5, 20, "red",
        [{
            name: "Life Steal",
            stats: [{ key: 'lifeSteal' }],
            conditionals: ['dealtEleDmgWithElementalWeapon'],
            textValues: ["4% of damage dealt", "8% of damage dealt", "12% of damage dealt", "16% of damage dealt", "20% of damage dealt"],
            values: [4, 8, 12, 16, 20]
        }]),
    new NormalSkill("CONFLUX",
        "Whenever Amara applies a Status Effect to an enemy, " +
        "she gains a chance to randomly Electrocute, Ignite, or Melt that enemy.",
        'assets/images/amara/skills/Conflux.png', 2, 4, 5, 20, "red",
        [{
            name: "Extra Effect Chance",
            textValues: ["7%", "14%", "21%", "28%", "35%"]
        }]),
    new NormalSkill("FORCEFUL EXPRESSION",
        "Amara's guns deal Bonus Elemental Damage, based on her Action Skill Element.",
        'assets/images/amara/skills/ForcefulExpression.png', 1, 5, 1, 25, "red",
        [{
            name: "Bonus Elemental Damage",
            stats: [{ key: 'bonusElementalDmg' }],
            textValues: ["18.0% of Damage Dealt"],
            values: [18]
        }])
];

export const shockra = new OtherSkill("SHOCKRA", "Converts your Action Skill to Shock Damage.",
    'assets/images/amara/skills/Shockra.png', null, null, 1, 0, "blue",
    [{ name: "Converts to Shock Damage" }]);

export const BLUE_SKILLS: Array<Skill> = [
    new ActionSkill("PHASECAST",
        "Amara sends forward an Astral Projection of herself, dealing " +
        "damage to everything in its path.",
        'assets/images/amara/skills/PhaseCast.png', 1, -1, 1, 0, "blue",
        [{
            name: "Cooldown",
            textValues: ["28 seconds"]
        },
        {
            name: "Damage",
            textValues: ['92']
        }]),
    new ActionSkill("DELIVERANCE",
        "Amara sends forward an Astral Projection of herself, dealing damage to everything in its path.<br /><br />" +
        "Whenever Amara's Astral Projection damages an enemy or object, it releases homing Elemental Projectiles " +
        "that trigger her Action Skill Elemental Effect on enemies.",
        'assets/images/amara/skills/Deliverance.png', -1, 2, 1, 10, "blue",
        [{
            name: "Cooldown",
            textValues: ["28 seconds"]
        },
        {
            name: "Damage",
            textValues: ['86']
        },
        {
            name: "Elemental Projectiles",
            textValues: ["3 per enemy hit"]
        }]),
    new ActionSkill("REVERBERATION",
        "Amara sends forward an Astral Projection of herself, " +
        "dealing damage to everything in its path..<br /><br />" +
        "Astral Projection deals increased damage for every enemy it hits.",
        'assets/images/amara/skills/Reverberation.png', -1, 3, 1, 15, "blue",
        [{
            name: "Cooldown",
            textValues: ["30 seconds"]
        },
        {
            name: "Damage Bonus",
            textValues: ["+50% per enemy hit"]
        },
        {
            name: "Damage",
            textValues: ['86']
        }]),
    new ActionSkill("TANDAVA",
        "Amara sends forward an Astral Projection of herself. " +
        "When it hits a target, it explodes, damaging all nearby enemies.",
        'assets/images/amara/skills/Tandava.png', 3, 4, 1, 20, "blue",
        [{
            name: "Cooldown",
            textValues: ["35 seconds"]
        },
        {
            name: "Damage",
            textValues: ['91']
        }]),
    new ActionMod("SOUL SAP",
        "A portion of all damage dealt by Amara's Action Skill is returned to her or a nearby ally as health.",
        'assets/images/amara/skills/SoulSap.png', 3, 1, 1, 5, "blue",
        [{
            name: "Life Steal",
            textValues: ["30% of Skill damage dealt"]
        }]),
    new ActionMod("STILLNESS OF MIND",
        "Enemies damaged by Amara's Action Skill become phaselocked until " +
        "they are damaged or the duration ends. However, Action Skill Cooldown is increased.<br /><br />" +
        "If Amara targets an enemy with Phasegrasp, enemies near the Grasped target are phaselocked.",
        'assets/images/amara/skills/StillnessOfMind.png', 3, 2, 1, 10, "blue",
        [{
            name: "Max Duration",
            textValues: ["6 seconds"]
        },
        {
            name: "Cooldown",
            stats: [{key: 'actionSkillCooldown'}],
            textValues: ["+15%"],
            values: [15]
        },
        {
            name: "Damage",
            textValues: ["-25%"]
        }]),
    new NormalSkill("DO HARM",
        "Killing an enemy grants Amara a stack of Rush. Activating her Action Skill consumes all Rush stacks. " +
        "For every stack of Rush consumed, Amara's Action Skill Damage is temporarily increased.",
        'assets/images/amara/skills/DoHarm.png', 0, 0, 5, 0, "blue",
        [{
            name: "Max Rush Stacks",
            stats: [{ key: 'maxRushStacks', isBaseStackValue: true }],
            textValues: ["10"],
            values: [10]
        },
        {
            name: "Action Skill Damage",
            stats: [{ key: 'actionSkillDmg', multipliers: ['rushStackEffectiveness'] }],
            conditionals: ['rushStacksConsumed'],
            textValues: ["+0.9% per stack consumed", "+1.8% per stack consumed", "+2.7% per stack consumed", "+3.6% per stack consumed", "+4.5% per stack consumed"],
            values: [0.9, 1.8, 2.7, 3.6, 4.5]
        },
        {
            name: "Duration",
            textValues: ["20 seconds"]
        }]),
    new NormalSkill("FAST HAND(S)",
        "Amara's Reload Speed, Weapon Swap Speed, and Mode Switch Speed are improved.",
        'assets/images/amara/skills/FastHands.png', 1, 0, 3, 0, "blue",
        [{
            name: "Reload Speed",
            stats: [{ key: 'reloadSpeed' }],
            textValues: ["+7%", "+14%", "+19%"],
            values: [7, 14, 19]
        },
        {
            name: "Weapon Swap Speed",
            stats: [{ key: 'weaponSwapSpeed' }],
            textValues: ["+16%", "+28%", "+36%"],
            values: [16, 28, 36]
        },
        {
            name: "Mode Switch Speed:",
            stats: [{ key: 'modeSwitchSpeed' }],
            textValues: ["+16%", "+28%", "+36%"],
            values: [16, 25, 36]
        }]),
    new NormalSkill("VIOLENT TAPESTRY",
        "Applying a Status Effect grants Amara a stack of Rush. Activating " +
        "her action skill consumes all Rush stacks.<br /><br />" +
        "For every stack of Rush consumed, Amara's Status Effect Chance is temporarily increased.",
        'assets/images/amara/skills/ViolentTapestry.png', 2, 0, 5, 0, "blue",
        [{
            name: "Max Rush Stacks",
            stats: [{ key: 'maxRushStacks', isBaseStackValue: true }],
            textValues: ["10"],
            values: [10]
        },
        {
            name: "Effect Chance",
            stats: [{ key: 'statusEffectChance', multipliers: ['rushStackEffectiveness'] }],
            conditionals: ['rushStacksConsumed'],
            textValues: ["+0.6% per stack consumed", "+1.2% per stack consumed", "+1.8% per stack consumed", "+2.4% per stack consumed", "+3.0% per stack consumed"],
            values: [0.6, 1.2, 1.8, 2.4, 3.0]
        },
        {
            name: "Duration",
            textValues: ["20 seconds"]
        }]),
    new NormalSkill("ALACRITY",
        "Amara gains increased Reload Speed for every stack of Rush. " +
        "After consuming Rush stacks, this bonus is increased for a few seconds.",
        'assets/images/amara/skills/Alacrity.png', 0, 1, 5, 5, "blue",
        [{
            name: "Reload Speed",
            stats: [{ key: 'reloadSpeed', multipliers: ['rushStackEffectiveness'] }],
            conditionals: ['rushStacks'],
            textValues: ["+0.4% per stack", "+0.8% per stack", "+1.2% per stack", "+1.6% per stack", "+2.0% per stack"],
            values: [0.4, 0.8, 1.2, 1.6, 2.0]
        },
        {
            name: "Reload Speed",
            stats: [{ key: 'reloadSpeed', multipliers: ['rushStackEffectiveness'] }],
            conditionals: ['rushStacksConsumed'],
            textValues: ["+0.6% after action skill use", "+1.2% after action skill use", "+1.8% after action skill use", "+2.3% after action skill use", "+2.9% after action skill use"],
            values: [0.6, 1.2, 1.8, 2.3, 2.9]
        },
        {
            name: "Duration",
            textValues: ["8 seconds"]
        }]),
    new NormalSkill("TRANSCEND",
        "Amara gains increased Accuracy and Critical Hit Damage for " +
        "a few seconds after activating her Action Skill.",
        'assets/images/amara/skills/Transcend.png', 1, 1, 3, 5, "blue",
        [{
            name: "Accuracy",
            stats: [{ key: 'accuracy' }],
            conditionals: ['usedActionSkill'],
            textValues: ["+17%", "+29%", "+38%"],
            values: [17, 29, 38]
        },
        {
            name: "Critical Hit Damage",
            stats: [{ key: 'criticalHitDmg' }],
            conditionals: ['usedActionSkill'],
            textValues: ["+9%", "+18%", "+27%"],
            values: [9, 18, 27]
        },
        {
            name: "Duration",
            textValues: ["12 seconds"]
        }]),
    new NormalSkill("RESTLESS",
        "Amara gains increased Action Skill Cooldown Rate.",
        'assets/images/amara/skills/Restless.png', 2, 1, 5, 5, "blue",
        [{
            name: "Cooldown Rate",
            stats: [{ key: 'actionSkillCooldown' }],
            textValues: ["+5%", "+10%", "+15%", "+20%", "+25%"],
            values: [5, 10, 15, 20, 25]
        }]),
    new NormalSkill("ASCENDANT",
        "All Action Skill Augments gain increased effects.",
        'assets/images/amara/skills/Ascendant.png', 1, 2, 1, 10, "blue",
        [{
            name: "Soul Sap Lifesteal",
            textValues: ["+20%"]
        },
        {
            name: "Allure Radius",
            textValues: ["+100%"]
        },
        {
            name: "Glamour Duration:",
            textValues: ["+50%"]
        },
        {
            name: "Stillness of Mind",
            textValues: ["Breaks 0.75 seconds after being damaged"]
        },
        {
            name: "Revelation Damage",
            textValues: ["+25%"]
        }]),
    new NormalSkill("FROM REST",
        "Amara gains improved Fire Rate and Charge Time.",
        'assets/images/amara/skills/FromRest.png', 0, 3, 3, 15, "blue",
        [{
            name: "Fire Rate",
            stats: [{ key: 'fireRate' }],
            textValues: ["+4%", "+8%", "+12%"],
            values: [4, 8, 12]
        },
        {
            name: "Charge Time",
            stats: [{ key: 'chargeTime' }],
            textValues: ["+21%", "+34%", "+44%"],
            values: [21, 34, 44]
        }]),
    new NormalSkill("LAID BARE",
        "Enemies take increased damage from all sources for a few seconds " +
        "after being damaged by Amara's Action Skill.",
        'assets/images/amara/skills/LaidBare.png', 1, 3, 3, 15, "blue",
        [{
            name: "Damage Increase",
            stats: [{ key: 'dmgIncrease' }],
            conditionals: ['enemyDamagedByAS'],
            textValues: ["+8.3%", "+16.7%", "+25.0%"],
            values: [8.3, 16.7, 25]
        },
        {
            name: "Duration",
            textValues: ["8 seconds"]
        }]),
    new NormalSkill("WRATH",
        "Amara gains increased Gun Damage. This effect is increased " +
        "after she activates her action skill for a few seconds.",
        'assets/images/amara/skills/Wrath.png', 2, 3, 3, 15, "blue",
        [{
            name: "Gun Damage",
            stats: [{ key: 'gunDmg' }],
            textValues: ["+6.7%", "+13.3%", "+20.0%"],
            values: [6.7, 13.3, 20]
        },
        {
            name: "Gun Damage",
            stats: [{ key: 'gunDmg' }],
            conditionals: ['usedActionSkill'],
            textValues: ["+6.7% after action skill use", "+13.3% after action skill use", "+20.0% after action skill use"],
            values: [6.7, 13.3, 20]
        },
        {
            name: "Duration",
            textValues: ["8 seconds"]
        }]),
    new NormalSkill("REMNANT",
        "When Amara kills an enemy with a Gun or Action Skill, " +
        "she creates a homing projectile that seeks out a new enemy dealing her Action Skill Elemental Damage.<br /><br />" +
        "Any Overkill Damage is added to the projectile's damage.",
        'assets/images/amara/skills/Remnant.png', 0, 4, 3, 20, "blue",
        [{
            name: "Remnant Damage",
            textValues: ['9', '18', '26'],
            values: [9, 18, 26]
        }]),
    new NormalSkill("AWAKENING",
        "Amara's Rush stacks gain increased effectiveness",
        'assets/images/amara/skills/Awakening.png', 2, 4, 3, 20, "blue",
        [{
            name: "Rush Stack Effectiveness",
            stats: [{ key: 'rushStackEffectiveness' }],
            textValues: ["+10%", "+20%", "+30%"],
            values: [10, 20, 30]
        }]),
    new NormalSkill("AVATAR",
        "Amara's Action Skill can be activated while it's cooling down. " +
        "This skill may only be used once per completed cooldown.<br /><br />" +
        "Additionally, increases Amara's Max Rush Stacks.<br /><br />" +
        "Additionally, if Amara's Action Skill kills an enemy, it refunds half of her Rush stacks.",
        'assets/images/amara/skills/Avatar.png', 1, 5, 1, 25, "blue",
        [{
            name: "Bonus Rush Stacks",
            stats: [{ key: 'maxRushStacks' }],
            textValues: ['10'],
            values: [10]
        }])
];

export const GREEN_SKILLS: Array<Skill> = [
    new ActionSkill("PHASESLAM",
        "Amara leaps into the air and Slams the ground, " +
        "dealing damage to all nearby enemies and knocking them up.",
        'assets/images/amara/skills/PhaseSlam.png', 1, -1, 1, 0, "green",
        [{
            name: "Cooldown",
            textValues: ["35 seconds"]
        },
        {
            name: "Damage",
            textValues: ['98']
        }]),
    new ActionSkill("FRACTURE",
        "Amara summons a line of fists that erupt from the ground, " +
        "dealing damage to enemies in front of Amara.",
        'assets/images/amara/skills/Fracture.png', -1, 2, 1, 10, "green",
        [{
            name: "Cooldown",
            textValues: ["28 seconds"]
        },
        {
            name: "Damage",
            textValues: ['88']
        }]),
    new ActionSkill("DOWNFALL",
        "Amara leaps into the air and shoots an Elemental Beam " +
        "below her briefly, followed by a Slam.",
        'assets/images/amara/skills/Downfall.png', -1, 3, 1, 15, "green",
        [{
            name: "Cooldown",
            textValues: ["47 seconds"]
        },
        {
            name: "Damage",
            textValues: ['95']
        },
        {
            name: "Beam Damage",
            textValues: ["14/second"]
        }]),
    new OtherSkill("BLIGHT TIGER",
        "Converts Amara's Action Skill to Corrosive Damage.",
        'assets/images/amara/skills/BlightTiger.png', 3, 1, 1, 5, "green",
        [{ name: "Converts to Corrosive Damage" }]),
    new ActionMod("REVELATION",
        "Amara's Action Skill now creates a Nova when it damages " +
        "enemies, dealing damage to all nearby enemies.",
        'assets/images/amara/skills/Revelation.png', 3, 2, 1, 10, "green",
        [{
            name: "Action Skill Damage",
            stats: [{ key: 'actionSkillDmg' }],
            textValues: ["-15%"]
        },
        {
            name: "Nova Damage",
            textValues: ['18']
        }]),
    new ActionMod("GLAMOUR",
        "Enemies damaged by Amara's action skill become confused and temporarily " +
        "attack their allies. However, Action Skill Cooldown is increased.<br /><br />" +
        "If Amara targets an enemy with Phasegrasp, enemies near the Grasped target are confused as well.",
        'assets/images/amara/skills/Glamour.png', 3, 4, 1, 20, "green",
        [{
            name: "Confuse Duration",
            textValues: ["8 seconds"]
        },
        {
            name: "Cooldown",
            textValues: ["+20%"]
        },
        {
            name: "Damage",
            textValues: ["-30%"]
        }]),
    new NormalSkill("ROOT TO RISE",
        "Amara gains increased Max Health.",
        'assets/images/amara/skills/RootToRise.png', 0, 0, 5, 0, "green",
        [{
            name: "Max Health",
            stats: [{ key: 'maxHealth' }],
            textValues: ["+8%", "+16%", "+24%", "+32%", "+40%"],
            values: [8, 16, 24, 32, 40]
        }]),
    new NormalSkill("PERSONAL SPACE",
        "Amara's weapon shots deal Bonus Damage based " +
        "on the distance to her target. The closer the target, the greater the bonus.",
        'assets/images/amara/skills/PersonalSpace.png', 1, 0, 3, 0, "green",
        [{
            name: "Bonus Damage",
            stats: [{ key: 'bonusDmg' }],
            textValues: ["up to 18.0% of damage dealt", "up to 36.0% of damage dealt", "up to 54.0% of damage dealt"],
            values: [18, 36, 54]
        }]),
    new NormalSkill("CLARITY",
        "Amara constantly regenerates health. The lower her health, " +
        "the more powerful the regeneration.<br /><br />" +
        "After using an Action Skill, this bonus is doubled for a few seconds.",
        'assets/images/amara/skills/Clarity.png', 2, 0, 5, 0, "green",
        [{
            name: "Health Regeneration",
            stats: [{ key: 'healthRegen_missingHealth' }],
            conditionals: ['usedActionSkill'],
            textValues: ["up to +1.00% Missing Health/sec", "up to +2.00% Missing Health/sec", "up to +3.00% Missing Health/sec", "up to +4.00% Missing Health/sec", "up to +5.00% Missing Health/sec"],
            values: [1, 2, 3, 4, 5]
        },
        {
            name: "Duration",
            textValues: ["5 seconds"]
        }]),
    new NormalSkill("ARMS DEAL",
        "Amara deals increased Splash Damage, and takes reduced Splash Damage.",
        'assets/images/amara/skills/ArmsDeal.png', 0, 1, 5, 5, "green",
        [{
            name: "Splash Damage",
            stats: [{ key: 'splashDmg' }],
            textValues: ["+4%", "+8%", "+12%", "+16%", "+20%"],
            values: [4, 8, 12, 16, 20]
        },
        {
            name: "Splash Damage Reduction",
            stats: [{ key: 'splashDmgReduction' }],
            textValues: ["+12%", "+21%", "+28%", "+35%", "+40%"],
            values: [12, 21, 28, 35, 40]
        }]),
    new NormalSkill("SAMSARA",
        "Whenever Amara deals damage to an enemy with her Action Skill, " +
        "she adds a stack of Samsara. For every stack of Samsara, Amara gains " +
        "increased Gun Damage and Health Regeneration for a few seconds. Stacks decay after a few seconds.",
        'assets/images/amara/skills/Samsara.png', 1, 1, 3, 5, "green",
        [{
            name: "Gun Damage",
            stats: [{ key: 'gunDmg' }],
            conditionals: ['samsaraStacks'],
            textValues: ["+1.7% per enemy damaged", "+3.3% per enemy damaged", "+5.0% per enemy damaged"],
            values: [1.7, 3.3, 5.0]
        },
        {
            name: "Health Regeneration",
            stats: [{ key: 'healthRegen_maxHealth' }],
            conditionals: ['samsaraStacks'],
            textValues: ["+1.7% of Max Health / sec. per stack", "+3.3% of Max Health / sec. per stack", "+5.0% of Max Health / sec. per stack"],
            values: [1.7, 3.3, 5.0]
        },
        {
            name: "Max Samsara Stacks",
            stats: [{ key: 'maxSamsaraStacks' }],
            textValues: ['5'],
            values: [5]
        },
        {
            name: "Duration",
            textValues: ["20 seconds"]
        }]),
    new NormalSkill("HELPING HAND(S)",
        "For a few seconds after using her Action Skill, " +
        "Amara's arms remain active and grant her Damage Reduction.",
        'assets/images/amara/skills/HelpingHands.png', 2, 1, 5, 5, "green",
        [{
            name: "Damage Reduction",
            stats: [{ key: 'dmgReduction' }],
            conditionals: ['usedActionSkill'],
            textValues: ["+12.0%", "+21.0%", "+28.0%", "+35.0%", "+40.0%"],
            values: [12, 21, 28, 35, 40]
        },
        {
            name: "Duration",
            textValues: ["20 Seconds"]
        }]),
    new NormalSkill("MINDFULNESS",
        "Whenever Amara takes damage, she gains a stack of " +
        "Mindfulness. For every stack of Mindfulness, Amara " +
        "gains improved Shield Regeneration Delay and Movement " +
        "Speed. Stacks decay after a few seconds.",
        'assets/images/amara/skills/Mindfulness.png', 0, 2, 3, 10, "green",
        [{
            name: "Shield Regeneration Delay",
            stats: [{ key: 'shieldRegenDelay' }],
            conditionals: ['mindfulnessStacks'],
            textValues: ["-9.0%", "-17.0%", "-23.0%"],
            values: [-9, -17, -23]
        },
        {
            name: "Movement Speed",
            stats: [{ key: 'movementSpeed' }],
            conditionals: ['mindfulnessStacks'],
            textValues: ["1.4%", "2.8%", "4.2%"],
            values: [1.4, 2.8, 4.2]
        },
        {
            name: "Max Mindfulness Stacks",
            stats: [{ key: 'maxMindfulnessStacks' }],
            textValues: ['25'],
            values: [25]
        },
        {
            name: "Duration",
            textValues: ["5 seconds"]
        }]),
    new NormalSkill("FIND YOUR CENTER",
        "Amara gains increased Melee Damage.<br /><br />" +
        "Additionally, for a few seconds after using her Action Skill, Amara gains increased Melee Range.",
        'assets/images/amara/skills/FindYourCenter.png', 1, 2, 1, 10, "green",
        [{
            name: "Melee Damage",
            stats: [{ key: 'meleeDmg' }],
            conditionals: ['usedActionSkill'],
            textValues: ["+100%"],
            values: [100]
        },
        {
            name: "Duration",
            textValues: ["20 seconds"]
        },
        {
            name: "Melee Range",
            textValues: ["+75%"]
        }]),
    new NormalSkill("VIGOR",
        "Kill Skill. Killing an enemy with Amara's Action Skill " +
        "grants all allies increased Movement Speed for a few seconds.",
        'assets/images/amara/skills/Vigor.png', 2, 2, 3, 10, "green",
        [{
            name: "Team Movement Speed",
            stats: [{ key: 'movementSpeed' }],
            conditionals: ['activateKillSkills'],
            textValues: ["+3.3%", "+6.7%", "+10.0%"],
            values: [3.3, 6.7, 10]
        },
        {
            name: "Duration",
            textValues: ["8 seconds"]
        }]),
    new NormalSkill("One With Nature",
        "Amara gains increased Max Health and Elemental " +
        "Damage Resistance to her Action Skill Element.",
        'assets/images/amara/skills/OneWithNature.png', 1, 3, 5, 15, "green",
        [{
            name: "Max Health",
            stats: [{ key: 'maxHealth' }],
            textValues: ["+5.0%", "+10.0%", "+15.0%", "+20.0%", "+25.0%"],
            values: [5, 10, 15, 20, 25]
        },
        {
            name: "Elemental Damage Reduction",
            stats: [{ key: 'elementalDmgReduction' }],
            textValues: ["+12.0%", "+21.0%", "+28.0%", "+35.0%", "+40.0%"],
            values: [12, 21, 28, 35, 40]
        }]),
    new NormalSkill("DO UNTO OTHERS",
        "Whenever an enemy damages Amara, she automatically " +
        "throws an energy orb back at them, dealing Action " +
        "Skill Elemental Damage. This skill has a short cooldown.",
        'assets/images/amara/skills/DoUntoOthers.png', 0, 4, 1, 20, "green",
        [{
            name: "Cooldown",
            textValues: ["8 seconds"]
        }]),
    new NormalSkill("JAB CROSS",
        "Whenever Amara deals melee damage to an enemy, she gains " +
        "increased Action Skill Damage and increased Gun Damage for a few seconds.",
        'assets/images/amara/skills/JabCross.png', 1, 4, 5, 20, "green",
        [{
            name: "Gun Damage",
            stats: [{ key: 'gunDmg' }],
            conditionals: ['dealtMeeleDmg'],
            textValues: ["+3%", "+6%", "+9%", "+12%", "+15%"],
            values: [3, 6, 9, 12, 15]
        },
        {
            name: "Action Skill Damage",
            stats: [{ key: 'actionSkillDmg' }],
            conditionals: ['dealtMeeleDmg'],
            textValues: ["+15%", "+30%", "+45%", "+60%", "+75%"],
            values: [15, 30, 45, 60, 75]
        },
        {
            name: "Duration",
            textValues: ["10 seconds"]
        }]),
    new NormalSkill("GUARDIAN ANGEL",
        "When Amara enters Fight For Your Life, she immediately gains a " +
        "Second Wind, restores her health, and creates an Action Skill Elemental " +
        "Nova that may knock back nearby enemies. This skill has a long cooldown.",
        'assets/images/amara/skills/GuardianAngel.png', 2, 4, 1, 20, "green",
        [{
            name: "Max Health Restored",
            textValues: ["50% of Max Health"]
        },
        {
            name: "Cooldown",
            textValues: ["120 seconds"]
        }]),
    new NormalSkill("BLITZ",
        "Melee Override. Press V while aiming at an enemy to make Amara dash " +
        "a short distance forward and perform a special melee strike, " +
        "dealing Elemental Melee Damage.<br /><br />" +
        "If a Blitz melee attack kills an enemy, Blitz's cooldown is immediately reset.",
        'assets/images/amara/skills/Blitz.png', 1, 5, 1, 25, "green",
        [{
            name: "Melee Damage",
            stats: [{ key: 'meleeDmg' }],
            textValues: ["+100%"],
            values: [100]
        },
        {
            name: "Cooldown",
            textValues: ["8 seconds"]
        }])
];