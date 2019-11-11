import { Skill } from './skill';
import { NormalSkill } from './normalskill';
import { OtherSkill } from './otherskill';
import { ActionSkill } from './actionskill';
import { ActionMod } from './actionmod';
import { Character } from './character';

export class Fl4k extends Character {
    
    //Path for red tree header image
    public readonly RED_TREE_HEADER: string = "assets/images/fl4k/RedTreeHeader.webp";
    public readonly RED_TREE_NAME: string = "Hunter";

    //Path for blue tree header image
    public readonly BLUE_TREE_HEADER: string = "assets/images/fl4k/BlueTreeHeader.webp";
    public readonly BLUE_TREE_NAME: string = "Master";

    //Path for green tree header image
    public readonly GREEN_TREE_HEADER: string = "assets/images/fl4k/GreenTreeHeader.webp";
    public readonly GREEN_TREE_NAME: string = "Stalker";

    private extraConditionals = { 
        fadeAway: {
            active: false,
            header: "Are you using Fade Away?"
        },
        fadeAwayCritEffectiveness: {
            active: true,
            stateChangeable: false,
            effectiveness: 1
        },
        hunterSkill: {
            active: true,
            stateChangeable: false,
            effectiveness: 1
        },
        petBonuses: {
            active: true,
            stateChangeable: false,
            effectiveness: 1
        },
        petDealtDmg: {
            active: false,
            header: "Pet dealt damage?"
        },
        petLowLife: {
            active: false,
            header: "Pet is on low life?"
        },
        fullLife: {
            active: false,
            header: "Are you on full life?"
        },
        lowLife: {
            active: false,
            header: "Are you on low life?"
        },
        frenzyStacks: {
            active: false,
            header: "Using Frenzy Stacks?",
            requiresNumberField: true,
            currentValue: 0,
            maxValue: 0,
        },
        gammaBurstActive: {
            active: false,
            header: "Is Gamma Burst Active?"
        },
        standingNearGammaBurstRift: {
            active: false,
            header: "Standing near Gamma Burst Rift?"
        },
        fadeAwayEnded: {
            active: false,
            header: "Has Fade Away just ended?"
        },
        unblinkingEyeStacks: {
            active: false,
            header: "Using Unblinking Eye stacks?",
            requiresNumberField: true,
            currentValue: 0,
            maxValue: 0,
        },
        furiousStacks: {
            active: false,
            header: "Using Furious stacks?",
            requiresNumberField: true,
            currentValue: 0,
            maxValue: 0,
        },
        enduranceStacks: {
            active: false,
            header: "Using Furious stacks?",
            requiresNumberField: true,
            currentValue: 0,
            maxValue: 0,
        },
        interplanetaryStacks: {
            active: false,
            header: "Using Interplanetary stacks?",
            requiresNumberField: true,
            currentValue: 0,
            maxValue: 0,
        },
        interplanetaryHumanBonus: {
            active: false,
            header: "Got Interplanetary Human Bonus?",
            requiresNumberField: true,
            currentValue: 0,
            maxValue: 0,
        },
        interplanetaryRobotBonus: {
            active: false,
            header: "Got Interplanetary Robot Bonus?",
            requiresNumberField: true,
            currentValue: 0,
            maxValue: 0,
        },
        interplanetaryBeastBonus: {
            active: false,
            header: "Got Interplanetary Beast Bonus?",
            requiresNumberField: true,
            currentValue: 0,
            maxValue: 0,
        }
    };

    private extraTypes = {
        petDmg: {
            header: "Pet Damage",
            value: 0,
            valueType: "percent",
            setFunc: (petDmg: number) => {
                this.getExtraTypes().petDmg.value  += petDmg;
            }
        },
        petCriticalHitDmg: {
            header: "Pet Critical Hit Damage",
            value: 0,
            valueType: "percent",
            setFunc: (petCriticalHitDmg: number) => {
                this.getExtraTypes().petCriticalHitDmg.value  += petCriticalHitDmg;
            }
        },
        petMovementSpeed: {
            header: "Pet Movement Speed",
            value: 0,
            valueType: "percent",
            setFunc: (petMovementSpeed: number) => {
                this.getExtraTypes().petMovementSpeed.value  += petMovementSpeed;
            }
        },
        petBonuses: {
            header: "Pet Bonuses",
            value: 0,
            valueType: "percent",
            setFunc: (bonusValue: number) => {
                this.getExtraTypes().petBonuses.value += bonusValue;
                this.getExtraCond().petBonuses.effectiveness += (bonusValue/100);
            }
        },
        petDmgReduction: {
            header: "Pet Damage Reduction",
            value: 0,
            valueType: "percent",
            setFunc: (petDmgReduction: number) => {
                this.getExtraTypes().petDmgReduction.value  += petDmgReduction;
            }
        },
        petHealthRegen_missingHealth: {
            header: "Pet Health Regen (missing)",
            value: 0,
            valueType: "percent",
            setFunc: (petHealthRegen: number) => {
                this.getExtraTypes().petHealthRegen_missingHealth.value += petHealthRegen;
            }
        },
        petMaxHealth: {
            header: "Pet Max Health",
            value: 0,
            valueType: "percent",
            setFunc: (petMaxHealth: number) => {
                this.getExtraTypes().petMaxHealth.value  += petMaxHealth;
            }
        },
        dmgShared: {
			type: "defense",
            header: "Damage Shared",
            value: 0,
            valueType: "percent",
            setFunc: (dmgShared: number) => {
                this.getExtraTypes().dmgShared.value  += dmgShared;
            }
        },
        fadeAwayCritEffectiveness: {
            setFunc: (critMulti: number) => {
                if (critMulti == 50) {
                    this.getExtraCond().fadeAwayCritEffectiveness.effectiveness = 0.25;
                } else if (critMulti == -50) {
                    this.getExtraCond().fadeAwayCritEffectiveness.effectiveness = 1;
                }
            }
        },
        hunterSkillEffects: {
            header: "Hunter Skill Effects",
            value: 0,
            valueType: "percent",
            setFunc: (effectValue: number) => {
                this.getExtraTypes().hunterSkillEffects.value += effectValue;
                this.getExtraCond().hunterSkill.effectiveness += (effectValue/100);
            }
        },
        maxFrenzyStacks: {
            header: "Max Frenzy Stacks",
            value: 0,
            valueType: "flat",
            setFunc: (stackSize: number) => {
              this.getExtraTypes().maxFrenzyStacks.value += stackSize;
              this.getExtraCond().frenzyStacks.maxValue += stackSize; 
            }
        },
        maxUnblinkingEyeStacks: {
            header: "Max Unblinking Stacks",
            value: 0,
            valueType: "flat",
            setFunc: (stackSize: number) => {
                this.getExtraTypes().maxUnblinkingEyeStacks.value += stackSize;
                this.getExtraCond().unblinkingEyeStacks.maxValue += stackSize; 
            }
        },
        maxFuriousStacks: {
            header: "Max Furious Stacks",
            value: 0,
            valueType: "flat",
            setFunc: (stackSize: number) => {
              this.getExtraTypes().maxFuriousStacks.value += stackSize;
              this.getExtraCond().furiousStacks.maxValue += stackSize; 
            }
        },
        maxEnduranceStacks: {
            header: "Max Endurance Stacks",
            value: 0,
            valueType: "flat",
            setFunc: (stackSize: number) => {
                this.getExtraTypes().maxEnduranceStacks.value += stackSize;
                this.getExtraCond().enduranceStacks.maxValue += stackSize; 
            }
        },
        maxInterplanetaryStacks: {
            header: "Max Interplanetary Stacks",
            value: 0,
            valueType: "flat",
            setFunc: (stackSize: number) => {
              this.getExtraTypes().maxInterplanetaryStacks.value += stackSize;
              this.getExtraCond().interplanetaryStacks.maxValue += stackSize; 
              this.getExtraCond().interplanetaryHumanBonus.maxValue += stackSize; 
              this.getExtraCond().interplanetaryBeastBonus.maxValue += stackSize; 
              this.getExtraCond().interplanetaryRobotBonus.maxValue += stackSize; 
            }
        },
    };

    
    //Skills for red skill tree

    //Action Skills
    private rakkAttack = new ActionSkill("assets/images/fl4k/skills/RakkAttack.webp", [-1, 1], 1, 0, "red",
                    {name:"RAKK ATTACK!", 
                    description:"FL4K sends forward 2 Rakk to dive-bomb enemies.<br /><br />" +
                    "This skill has multiple charges.",
                    effects:[
                        {name:"Cooldown",
                        value:"18 seconds"},
                        {name:"Damage",
                        value:35}]});

    //Action Mods
    private rakkOpenAColdOne = new ActionMod("assets/images/fl4k/skills/RakkOpenAColdOne.webp", [1, -1], 1, 5, "red",
                    {name:"RAKK OPEN A COLD ONE", 
                    description:"Converts FL4K’s Rakk to Cryo damage.",
                    effects:[
                        {name:"Deals Cryo Elemental Damage"}]}, this.rakkAttack);
    private falconersFeast = new ActionMod("assets/images/fl4k/skills/FalconersFeast.webp", [2, -1], 1, 10, "red",
                    {name:"FALCONER’S FEAST", 
                    description:"When FL4K’s Rakk damage an enemy, a portion of FL4K’s health is restored.",
                    effects:[
                        {name:"Health Returned",
                        value:"7% of Max Health"}]}, this.rakkAttack);
    private flockNLoad  = new ActionMod("assets/images/fl4k/skills/FlockNLoad.webp", [3, -1], 1, 15, "red",
                    {name:"FLOCK 'N LOAD", 
                    description:"FL4K’s Rakk have increased Cooldown Rate, and gain an Additional Charge.",
                    effects:[
                        {name:"Additional Rakk",
                        value:"+2"}]}, this.rakkAttack);
    private rakkcelerate = new ActionMod("assets/images/fl4k/skills/Rackcelerate.webp", [4, -1], 1, 20, "red",
                    {name:"RAKKCELERATE", 
                    description:"FL4K’s Rakk have increased Cooldown Rate, and gain an Additional Charge.",
                    effects:[
                        {name:"Cooldown Rate", 
                        value:"+20%"},
                        {name:"Skill Charges",
                        value:"+1"}]}, this.rakkAttack);

    //Pet Skills
    private spiderantCenturion = new OtherSkill("assets/images/fl4k/skills/SpiderantCenturion.webp", [-1, 0], 1, 0, "red",
                    {name:"SPIDERANT CENTURION", 
                    description:"FL4K is joined by a loyal Spiderant companion, which will " + 
                    "cause FL4K to constantly regenerate health.<br /><br />" +
                    "Hold F to issue an Attack Command, which will cause the Spiderant to charge into enemies.",
                    effects:[
                        {name:"Health Regeneration",
                        type: [{healthRegen_maxHealth: true}],
                        conditional: this.getExtraCond().petBonuses,
                        getActiveValueMulti: () => {
                            return this.getExtraCond().petBonuses.effectiveness;
                        },
                        value:"+1.0% of Max Health/sec"}]});
    private spiderantScorcher = new OtherSkill("assets/images/fl4k/skills/SpiderantScorcher.webp", [2, 3], 1, 10, "red",
                    {name:"SPIDERANT SCORCHER", 
                    description:"FL4K's Spiderant evolves into a Scorcher, occasionally dealing Incendiary Damage to " + 
                    "all enemies nearby. While accompanied by the Scorcher, FL4K constantly regenerates health " + 
                    "and gains Elemental Resistance.<br /><br />" +
                    "When FL4K issues an Attack Command, the Scorcher will charge enemies.",
                    effects:[
                        {name:"Health Regeneration",
                        type: [{healthRegen_maxHealth: true}],
                        conditional: this.getExtraCond().petBonuses,
                        getActiveValueMulti: () => {
                            return this.getExtraCond().petBonuses.effectiveness;
                        },
                        value:"+1.0% of Max Health/sec"},
                        {name:"Elemental Damage",
                        type: [{elementalDmg: true}],
                        conditional: this.getExtraCond().petBonuses,
                        getActiveValueMulti: () => {
                            return this.getExtraCond().petBonuses.effectiveness;
                        },
                        value:"+10%"}]});
    private spiderantCountess  = new OtherSkill("assets/images/fl4k/skills/SpiderantCountess.webp", [3, 3], 1, 15, "red",
                    {name:"SPIDERANT SCORCHER", 
                    description:"FL4K’s Spiderant evolves into a Countess, which will " + 
                    "cause FL4K to constantly regenerate health and gain Damage Reduction.<br /><br />" +
                    "When FL4K issues an Attack Command, the Countess will burrow underground " + 
                    "and then emerge dealing Corrosive Damage in an area.",
                    effects:[
                        {name:"Health Regeneration",
                        type: [{healthRegen_maxHealth: true}],
                        conditional: this.getExtraCond().petBonuses,
                        getActiveValueMulti: () => {
                            return this.getExtraCond().petBonuses.effectiveness;
                        },
                        value:"+1.0% of Max Health/sec"},
                        {name:"Damage Reduction",
                        type: [{dmgReduction: true}],
                        conditional: this.getExtraCond().petBonuses,
                        getActiveValueMulti: () => {
                            return this.getExtraCond().petBonuses.effectiveness;
                        },
                        value:"+5%"}]});

    private redSkills = [
        this.rakkAttack,
        this.rakkOpenAColdOne,
        this.falconersFeast,
        this.flockNLoad,
        this.rakkcelerate,
        this.spiderantCenturion,
        this.spiderantScorcher,
        this.spiderantCountess,
        new NormalSkill("assets/images/fl4k/skills/InterplanetaryStalker.webp", [0, 0], 5, 0, "red",
                    {name:"INTERPLANETARY STALKER", 
                    description:"Hunter Kill Skill. Whenever FL4K kills an enemy, they gain a stack " + 
                    "of Interplanetary Stalker. For each stack of Interplanetary Stalker, " +
                    "they gain a bonus to all damage dealt.<br /><br />" +
                    "Additionally, they gain a unique stacking bonus depending on the type " + 
                    "of enemy killed. Each unique bonus can stack up to 3 times. Each stack decays after a short time.",
                    effects:[
                        {name:"Damage",
                        type: [{dmgIncrease: true}],
                        conditionals: [this.getExtraCond().hunterSkill ,this.getExtraCond().interplanetaryStacks],
                        getActiveValueMultis: [
                            null,
                            () => {
                                return this.getExtraCond().interplanetaryStacks.currentValue * this.getExtraCond().hunterSkill.effectiveness;
                            }
                        ],
                        values:["+2% /stack", "+4% /stack", "+6% /stack", "+8% /stack", "+10% /stack"]},
                        {name:"Human Bonus",
                        type: [{actionSkillDmg: true}],
                        conditionals: [this.getExtraCond().hunterSkill ,this.getExtraCond().interplanetaryHumanBonus],
                        getActiveValueMultis: [
                            null,
                            () => {
                                return this.getExtraCond().interplanetaryHumanBonus.currentValue * this.getExtraCond().hunterSkill.effectiveness;
                            }
                        ],
                        values:["+3% Action Skill Damage /stack", "+6% Action Skill Damage /stack", "+9% Action Skill Damage /stack", "+12% Action Skill Damage /stack", "+15% Action Skill Damage /stack"]},
                        {name:"Robot Bonus",
                        type: [{corrosiveDmg: true}],
                        conditionals: [this.getExtraCond().hunterSkill ,this.getExtraCond().interplanetaryRobotBonus],
                        getActiveValueMultis: [
                            null,
                            () => {
                                return this.getExtraCond().interplanetaryRobotBonus.currentValue * this.getExtraCond().hunterSkill.effectiveness;
                            }
                        ],
                        values:["+1.5% Corrosive Damage /stack", "+3.0% Corrosive Damage /stack", "+4.5% Corrosive Damage /stack", "+6.0% Corrosive Damage /stack", "+7.5% Corrosive Damage /stack"]},
                        {name:"Beast Bonus",
                        type: [{movementSpeed: true}],
                        conditionals: [this.getExtraCond().hunterSkill ,this.getExtraCond().interplanetaryBeastBonus],
                        getActiveValueMultis: [
                            null,
                            () => {
                                return this.getExtraCond().interplanetaryBeastBonus.currentValue * this.getExtraCond().hunterSkill.effectiveness;
                            }
                        ],
                        values:["+2% Movement Speed /stack", "+3% Movement Speed /stack", "+5% Movement Speed /stack", "+6% Movement Speed /stack", "+7% Movement Speed /stack"]},
                        {type: [{extraType: this.getExtraTypes().maxInterplanetaryStacks}],
                        value: 3,
                        hidden: true,
                        }]}),
        new NormalSkill("assets/images/fl4k/skills/LeaveNoTrace.webp", [0, 1], 3, 0, "red",
                    {name:"LEAVE NO TRACE", 
                    description:"When FL4K scores a Critical Hit, there is a chance for 1 ammo to be added to their magazine.",
                    effects:[
                        {name:"Chance to add ammo",
                        values:["+12%", "+24%", "+36%"]}]}),
        new NormalSkill("assets/images/fl4k/skills/SecondIntention.webp", [0, 2], 5, 0, "red",
                    {name:"SECOND INTENTION", 
                    description:"Hunter Kill Skill. Whenever FL4K kills an enemy, they gain increased Reload Speed.<br /><br />" +
                    "This bonus is increased if FL4K scores a Critical Kill.",
                    effects:[
                        {name:"Reload Speed",
                        type: [{reloadSpeed: true}],
                        conditionals: [this.getExtraCond().hunterSkill, this.getConditionals().activateKillSkills, this.getConditionals().criticalKill],
                        getActiveValueMultis:[ 
                            null,
                            () => {
                                if (!this.getConditionals().criticalKill.active) {
                                    return this.getExtraCond().hunterSkill.effectiveness;
                                } 
                                return 0;
                            },
                            () => {
                                return 0;
                            }
                        ],
                        getNotActiveValueMultis: [
                            null,
                            () => {
                                return 0;
                            },
                            () => {
                                if (this.getConditionals().activateKillSkills.active) {
                                    return this.getExtraCond().hunterSkill.effectiveness;
                                } 
                                return 0;
                            }
                        ],
                        values:["+3%", "+6%", "+8%", "+11%", "+13%"]},
                        {name:"Critical Kill Reload Speed",
                        type: [{reloadSpeed: true}],
                        conditionals: [this.getConditionals().criticalKill, this.getExtraCond().hunterSkill],
                        getActiveValueMultis:[
                            null,
                            () => {
                                if (this.getConditionals().criticalKill.active) {
                                    return this.getExtraCond().hunterSkill.effectiveness;
                                } else {
                                    return 0;
                                }
                            }
                        ],
                        values:["+6%", "+11%", "+15%", "+19%", "+23%"]},
                        {name:"Critical Kill Reload Duration",
                        value:"5 seconds"}]}),
        new NormalSkill("assets/images/fl4k/skills/HuntersEye.webp", [1, 0], 5, 5, "red",
                    {name:"HUNTER'S EYE", 
                    description:"FL4K gains bonuses when fighting different types of enemies.",
                    effects:[
                        {name:"Critical Hit Damage",
                        type: [{criticalHitDmg: true}],
                        conditional: this.getConditionals().fightingAHuman,
                        values:["+3% vs. Humans", "+6% vs. Humans", "+9% vs. Humans", "+12% vs. Humans", "+15% vs. Humans"]},
                        {name:"Armor Damage",
                        type: [{armorDmg: true}],
                        conditional: this.getConditionals().fightingARobot,
                        values:["+6% vs. Robots", "+12% vs. Robots", "+18% vs. Robots", "+24% vs. Robots", "+30% vs. Robots"]},
                        {name:"Damage Reduction",
                        type: [{dmgReduction: true}],
                        conditional: this.getConditionals().fightingABeast,
                        values:["+5.3% vs. Beasts", "+10.1% vs. Beasts", "+14.4% vs. Beasts", "+18.3% vs. Beasts", "+21.9% vs. Beasts"]}]}),
        new NormalSkill("assets/images/fl4k/skills/HeadCount.webp", [1, 1], 3, 5, "red",
                    {name:"HEAD COUNT", 
                    description:"Whenever FL4K scores a Critical Hit, there is a chance their Action Skill Cooldown is reduced.",
                    effects:[
                        {name:"Cooldown Time Reduction Chance",
                        values:["+10%", "+20%", "+30%"]},
                        {name:"Cooldown Time",
                        value:"-2s"}]}),
        new NormalSkill("assets/images/fl4k/skills/AmbushPredator.webp", [1, 2], 5, 5, "red",
                    {name:"AMBUSH PREDATOR", 
                    description:"While there are no enemies nearby, FL4K's Weapon Handling and Critical Hit Damage are increased.",
                    effects:[
                        {name:"Critical Hit Damage",
                        type: [{criticalHitDmg: true}],
                        conditional: this.getConditionals().noEnemiesNearby,
                        values:["+4%", "+8%", "+12%", "+16%", "+20%"]},
                        {name:"Handling",
                        type: [{handling: true}],
                        conditional: this.getConditionals().noEnemiesNearby,
                        values:["+17%", "+29%", "+38%", "+44%", "+50%"]}]}),
        new NormalSkill("assets/images/fl4k/skills/TwoF4ng.webp", [2, 1], 1, 10, "red",
                    {name:"TWO F4NG", 
                    description:"FL4K has a chance to fire an extra projectile per shot.",
                    effects:[
                        {name:"Extra Projectile Chance",
                        values:["+5%", "+10%", "+15%", "+20%", "+25%"]}]}),
        new NormalSkill("assets/images/fl4k/skills/BigGame.webp", [3, 0], 3, 15, "red",
                    {name:"BIG GAME", 
                    description:"FL4K's Hunter Skills become much more effective and have a longer duration.",
                    effects:[
                        {name:"Hunter Skill Effects", 
                        type: [{extraType: this.getExtraTypes().hunterSkillEffects}],
                        values:["+10%", "+20%", "+30%"]},
                        {name:"Hunter Skill Duration",
                        values:["+33%", "+67%", "+100%"]}]}),
        new NormalSkill("assets/images/fl4k/skills/TheMostDangerousGame.webp", [3, 2], 3, 15, "red",
                    {name:"THE MOST DANGEROUS GAME", 
                    description:"Hunter Kill Skill. Whenever FL4K kills a Badass or stronger " + 
                    "enemy, they gain increased Critical Hit Damage, Gun Damage, and Handling for a long time.<br /><br />" +
                    "Additionally, they receive a cash reward from the Intergalactic Bureau of Bounty Hunting.",
                    effects:[
                        {name:"Gun Damage",
                        type: [{gunDmg: true}],
                        conditionals: [this.getExtraCond().hunterSkill, this.getConditionals().activateKillSkills],
                        getActiveValueMultis: [
                            null,
                            () => {
                                return this.getExtraCond().hunterSkill.effectiveness;
                            }
                        ],
                        values:["+8%", "+17%", "+25%"]},
                        {name:"Critical Hit Damage",
                        type: [{criticalHitDmg: true}],
                        conditionals: [this.getExtraCond().hunterSkill, this.getConditionals().activateKillSkills],
                        getActiveValueMultis: [
                            null,
                            () => {
                                return this.getExtraCond().hunterSkill.effectiveness;
                            }
                        ],
                        values:["+3.3%", "+6.7%", "+10.0%"]},
                        {name:"Handling",
                        type: [{handling: true}],
                        conditionals: [this.getExtraCond().hunterSkill, this.getConditionals().activateKillSkills],
                        getActiveValueMultis: [
                            null,
                            () => {
                                return this.getExtraCond().hunterSkill.effectiveness;
                            }
                        ],
                        values:["+14.3%", "+25.0%", "+33.33%"]},
                        {name:"Duration",
                        value:"120 seconds"}]}),
        new NormalSkill("assets/images/fl4k/skills/GalacticShadow.webp", [4, 1], 1, 15, "red",
                    {name:"GALACTIC SHADOW", 
                    description:"FL4K deals increased Critical Hit Damage, and enemies are less likely to attack them.",
                    effects:[
                        {name:"Critical Hit Damage",
                        type: [{criticalHitDmg: true}],
                        value:"+15%"}]}),
        new NormalSkill("assets/images/fl4k/skills/GrimHarvest.webp", [4, 2], 5, 20, "red",
                    {name:"GRIM HARVEST", 
                    description:"FL4K gains increased Gun Damage and Action Skill Damage.",
                    effects:[
                        {name:"Gun Damage",
                        type: [{gunDmg: true}],
                        values:["+3%", "+6%", "+9%", "+12%", "+15%"]},
                        {name:"Action Skill Damage",
                        type: [{actionSkillDmg: true}],
                        values:["+5%", "+10%", "+15%", "+20%", "+25%"]}]}),
        new NormalSkill("assets/images/fl4k/skills/Megavore.webp", [5, 1], 1, 25, "red",
                    {name:"MEGAVORE", 
                    description:"FL4K gains a chance to score a Critical Hit with weapons against any part of enemies.",
                    effects:[
                        {name:"Critical Hit Chance",
                        value:"+20%"}]})

    ];

    //Skills for blue skill tree

    //Action Skills
    private gammaBurst = new ActionSkill("assets/images/fl4k/skills/GammaBurst.webp", [-1, 1], 1, 0, "blue",
                    {name:"GAMMA BURST", 
                    description:"FL4K creates a Rift at a target location, teleporting their pet through " + 
                    "the Rift and dealing Radiation Damage to nearby enemies.<br /><br />" +
                    "Additionally, FL4K’s pet becomes irradiated, growing in size and dealing " + 
                    "bonus Radiation Damage when it attacks.<br /><br />" +
                    "Using Gamma Burst while FL4K’s Pet is downed or dead will revive the pet at " + 
                    "the targeted location with 30% of its health, but will double Action Skill Cooldown Time.",
                    effects:[
                        {name:"Skill Duration",
                        value:"20 seconds"},
                        {name:"Cooldown",
                        value:"30 seconds"},
                        {name:"Damage",
                        value:56}]});

    //Action Mods
    private atomicAroma = new ActionMod("assets/images/fl4k/skills/AtomicAroma.webp", [1, -1], 1, 5, "blue",
                    {name:"ATOMIC AROMA", 
                    description:"While Gamma Burst is active, FL4K’s pet is surrounded by a Radiation Aura, constantly damaging all nearby enemies.",
                    effects:[
                        {name:"Radiation Damage",
                        value:"4 per second"}]}, this.gammaBurst);
    private empatheticRage = new ActionMod("assets/images/fl4k/skills/EmpatheticRage.webp", [2, -1], 1, 10, "blue",
                    {name:"EMPATHIC RAGE", 
                    description:"For the duration of Gamma Burst, Damage dealt by FL4K is increased.",
                    effects:[
                        {name:"Damage",
                        type: [{dmgIncrease: true}],
                        conditional: this.getExtraCond().gammaBurstActive,
                        value:"+20%"}]}, this.gammaBurst);
    private endurance  = new ActionMod("assets/images/fl4k/skills/Endurance.webp", [3, -1], 1, 15, "blue",
                    {name:"ENDURANCE", 
                    description:"When FL4K or FL4K’s Pet kills an enemy while Gamma Burst is active, " + 
                    "the duration of Gamma Burst is extended and pet damage is increased. These effects can stack up to 5 times.",
                    effects:[
                        {name:"Skill Duration",
                        value:"+3 seconds per kill"},
                        {name:"Pet Damage", 
                        type: [{extraType: this.getExtraTypes().petDmg}],
                        conditional: this.getExtraCond().enduranceEyeStacks,
                        getActiveValueMulti: () => {
                            return this.getExtraCond().enduranceEyeStacks.currentValue;
                        },
                        value:"+10% per kill"},
                        {type: [{extraType: this.getExtraTypes().maxEnduranceStacks}],
                        value: 5,
                        hidden: true}]}, this.gammaBurst);
    private burstAid = new ActionMod("assets/images/fl4k/skills/BurstAid.webp", [4, -1], 1, 20, "blue",
                    {name:"BURST AID", 
                    description:"After using Gamma Burst, the Rift remains for the duration of the " + 
                    "skill. While standing near the Rift, FL4K and their allies rapidly Regenerate Health.",
                    effects:[
                        {name:"Health Regeneration",
                        type: [{healthRegen_maxHealth: true}],
                        conditional: this.getExtraCond().standingNearGammaBurstRift,
                        value:"+20% of Max Health/sec"}]}, this.gammaBurst);

    //Pet Skills
    private guardSkag = new OtherSkill("assets/images/fl4k/skills/GuardSkag.webp", [-1, 0], 1, 0, "blue",
                    {name:"GUARD SKAG", 
                    description:"FL4K is joined by a loyal Skag companion, which will increase FL4K's Damage.<br /><br />" +
                    "Hold F to issue an Attack Command, which will cause the Skag to vomit acid onto enemies.",
                    effects:[
                        {name:"Damage",
                        type: [{dmgIncrease: true}],
                        conditional: this.getExtraCond().petBonuses,
                        getActiveValueMulti: () => {
                            return this.getExtraCond().petBonuses.effectiveness;
                        },
                        value:"+5%"}]});
    private greatHornedSkag = new OtherSkill("assets/images/fl4k/skills/GreatHornedSkag.webp", [2, 3], 1, 10, "blue",
                    {name:"GREAT HORNED SKAG", 
                    description:"FL4K’s Skag evolves into a larger, Great Horned Skag which will increase FL4K’s Damage and Gun Damage.<br /><br />" +
                    "When FL4K issues an Attack Command, the Great Horned Skag will charge at enemies and knock them into the air.",
                    effects:[
                        {name:"Damage",
                        type: [{dmgIncrease: true}],
                        conditional: this.getExtraCond().petBonuses,
                        getActiveValueMulti: () => {
                            return this.getExtraCond().petBonuses.effectiveness;
                        },
                        value:"+5%"},
                        {name:"Gun Damage",
                        type: [{gunDmg: true}],
                        conditional: this.getExtraCond().petBonuses,
                        getActiveValueMulti: () => {
                            return this.getExtraCond().petBonuses.effectiveness;
                        },
                        value:"+10%"}]});
    private eridianSkag  = new OtherSkill("assets/images/fl4k/skills/EridianSkag.webp", [3, 3], 1, 15, "blue",
                    {name:"GREAT HORNED SKAG", 
                    description:"FL4K’s Skag evolves into an Eridian Skag, which will increase FL4K’s Damage and Fire Rate.<br /><br />" +
                    "When FL4K issues an Attack Command, their Eridian Skag pulls nearby enemies in by generating a Singularity.",
                    effects:[
                        {name:"Damage",
                        type: [{dmgIncrease: true}],
                        conditional: this.getExtraCond().petBonuses,
                        getActiveValueMulti: () => {
                            return this.getExtraCond().petBonuses.effectiveness;
                        },
                        value:"+5%"},
                        {name:"Fire Rate",
                        type: [{fireRate: true}],
                        conditional: this.getExtraCond().petBonuses,
                        getActiveValueMulti: () => {
                            return this.getExtraCond().petBonuses.effectiveness;
                        },
                        value:"+5%"}]});

    private blueSkills = [ 
        this.gammaBurst,
        this.atomicAroma,
        this.empatheticRage,
        this.endurance,
        this.burstAid,
        this.guardSkag,
        this.greatHornedSkag,
        this.eridianSkag,
        new NormalSkill("assets/images/fl4k/skills/Ferocity.webp", [0, 0], 5, 0, "blue",
                    {name:"FEROCITY", 
                    description:"FL4K's Pet deals increased damage.",
                    effects:[
                        {name:"Pet Damage",
                        type: [{extraType: this.getExtraTypes().petDmg}],
                        values:["+10%", "+20%", "+30%", "+40%", "+50%"]}]}),
        new NormalSkill("assets/images/fl4k/skills/PersistenceHunter.webp", [0, 1], 3, 0, "blue",
                    {name:"PERSISTENCE HUNTER", 
                    description:"Increases FL4K's Gun Damage and Action Skill Duration.",
                    effects:[
                        {name:"Gun Damage",
                        type: [{gunDmg: true}],
                        values:["+4.0%", "+8.0%", "+12.0%"]},
                        {name:"Action Skill Duration",
                        values:["+15%", "+30%", "+45%"]}]}),
        new NormalSkill("assets/images/fl4k/skills/GoForTheEyes.webp", [0, 2], 5, 0, "blue",
                    {name:"GO FOR THE EYES!", 
                    description:"When FL4K's pet attacks an enemy, the first melee attack is an automatic Critical Hit that deals increased damage.",
                    effects:[
                        {name:"Pet Critical Hit Damage",
                        type: [{extraType: this.getExtraTypes().petCriticalHitDmg}],
                        values:["+15%", "+30%", "+45%", "+60%", "+75%"]}]}),
        new NormalSkill("assets/images/fl4k/skills/WhoRescuedWho.webp", [1, 0], 5, 5, "blue",
                    {name:"WHO RESCUED WHO?", 
                    description:"Whenever FL4K's Pet deals damage, FL4K regenerates health for a few " + 
                    "seconds. Whenever FL4K deals damage to an enemy, their Pet's health " + 
                    "is restored for a portion of the damage dealt.",
                    effects:[
                        {names:["Converts +1.0% of Damage Dealt into Pet Health",
                                "Converts +2.0% of Damage Dealt into Pet Health",
                                "Converts +3.0% of Damage Dealt into Pet Health",
                                "Converts +4.0% of Damage Dealt into Pet Health",
                                "Converts +5.0% of Damage Dealt into Pet Health"]},
                        {name:"Health Regeneration",
                        type: [{healthRegen_maxHealth: true}],
                        conditional: this.getExtraCond().petDealtDmg,
                        values:["+0.4% of Max Health/sec", "+0.8% of Max Health/sec", "+1.2% of Max Health/sec", "+1.6% of Max Health/sec", "+2.0% of Max Health/sec"]}]}),
        new NormalSkill("assets/images/fl4k/skills/HeBites.webp", [1, 1], 3, 5, "blue",
                    {name:"HE BITES!", 
                    description:"When FL4K's pet takes damage, the pet returns some of that damage to the attacker.",
                    effects:[
                        {name:"Damage Reflected",
                        values:["+5%", "+10%", "+15%"]}]}),
        new NormalSkill("assets/images/fl4k/skills/Frenzy.webp", [1, 2], 5, 5, "blue",
                    {name:"FRENZY", 
                    description:"Hunter Skill. When FL4K's pet deals damage, FL4K and " + 
                    "their pet gain a stack of Frenzy. Each stack of Frenzy increases Damage. The stacks decay after a few seconds.",
                    effects:[
                        {name:"Damage", 
                        type: [{gunDmg: true}],
                        conditionals: [this.getExtraCond().hunterSkill, this.getExtraCond().frenzyStacks],
                        getActiveValueMultis: [ 
                            null,
                            () => {
                                return this.getExtraCond().frenzyStacks.currentValue * this.getExtraCond().hunterSkill.effectiveness;
                           }
                        ],
                        values:["+0.8% per stack", "+1.6% per stack", "+2.4% per stack", "+3.2% per stack", "+4.0% per stack"]},
                        {name:"Max Frenzy Stacks",
                        type: [{extraType: this.getExtraTypes().maxFrenzyStacks}],
                        value:10}]}),
        new NormalSkill("assets/images/fl4k/skills/PhyscoHeadOnAStick.webp", [2, 1], 1, 10, "blue",
                    {name:"PSYCHO HEAD ON A STICK", 
                    description:"Hunter Kill Skill. Whenever FL4K kills an enemy, their Pet gains increased " + 
                    "Movement Speed and Damage for a few seconds.",
                    effects:[
                        {name:"Pet Movement Speed",
                        type: [{extraType: this.getExtraTypes().petMovementSpeed}],
                        conditionals: [this.getExtraCond().hunterSkill, this.getConditionals().activateKillSkills],
                        getActiveValueMultis: [
                            null,
                            () => {
                                return this.getExtraCond().hunterSkill.effectiveness;
                            }
                        ],
                        value:"+12%"},
                        {name:"Pet Damage",
                        type: [{extraType: this.getExtraTypes().petDmg}],
                        conditionals: [this.getExtraCond().hunterSkill, this.getConditionals().activateKillSkills],
                        getActiveValueMultis: [
                            null,
                            () => {
                                return this.getExtraCond().hunterSkill.effectiveness;
                            }
                        ],
                        value:"+10%"},
                        {name:"Psycho Head On A Stick Duration",
                        value:"8 seconds"}]}),
        new NormalSkill("assets/images/fl4k/skills/HiveMind.webp", [2, 2], 3, 10, "blue",
                    {name:"HIVE MIND", 
                    description:"When FL4K takes damage, a portion of all damage they take is shared to their pet instead.",
                    effects:[
                        {name:"Damage Shared",
                        type: [{extraType: this.getExtraTypes().dmgShared}],
                        values:["+5%", "+10%", "+15%"]}]}),
        new NormalSkill("assets/images/fl4k/skills/BarbaricYawp.webp", [3, 1], 5, 15, "blue",
                    {name:"BARBARIC YAWP", 
                    description:"Increases the power of Pet Bonuses granted to FL4K.",
                    effects:[
                        {name:"Pet Bonuses",
                        type: [{extraType: this.getExtraTypes().petBonuses}],
                        values:["+20%", "+40%", "+60%", "+80%", "+100%"]}]}),
        new NormalSkill("assets/images/fl4k/skills/MutatedDefenses.webp", [3, 2], 1, 15, "blue",
                    {name:"MUTATED DEFENSES", 
                    description:"When FL4K's pet is at low health, it gains Damage Reduction " + 
                    "and regenerates health. This skill has a long cooldown.",
                    effects:[
                        {name:"Damage Reduction",
                        type: [{extraType: this.getExtraTypes().petDmgReduction}],
                        conditional: this.getExtraCond().petLowLife,
                        value:"+30%"},
                        {name:"Health Regeneration",
                        value:"+40% of Max Pet Health"},
                        {name:"Mutated Defenses Cooldown",
                        value:15}]}),
        new NormalSkill("assets/images/fl4k/skills/PackTactics.webp", [4, 0], 3, 20, "blue",
                    {name:"PACK TACTICS", 
                    description:"All Damage dealt by FL4K and their Pet is increased.<br /><br />" +
                    "Additionally, the Maximum Health of both FL4K and their Pet is increased.",
                    effects:[
                        {name:"Pet and FL4K Damage",
                        type: [{dmgIncrease: true}, {extraType: this.getExtraTypes().petDmg}],
                        values:["+5%", "+10%", "+15%"]},
                        {name:"Pet and FL4K Maximum Health",
                        type: [{maxHealth: true}, {extraType: this.getExtraTypes().petMaxHealth}],
                        values:["+5%", "+10%", "+15%"]}]}),
        new NormalSkill("assets/images/fl4k/skills/SharedSpirit.webp", [4, 2], 1, 20, "blue",
                    {name:"SHARED SPIRIT", 
                    description:"While FL4K is at low health, a portion of all damage they take is shared to their pet instead.",
                    effects:[
                        {name:"Damage Shared",
                        type: [{extraType: this.getExtraTypes().dmgShared}],
                        conditional: this.getExtraCond().lowLife,
                        value:"+50%"}]}),
        new NormalSkill("assets/images/fl4k/skills/Dominance.webp", [5, 1], 1, 25, "blue",
                    {name:"DOMINANCE", 
                    description:"Melee Override Skill. FL4K establishes dominance over an " + 
                    "enemy, turning it into an ally for a short time. If the enemy is a " + 
                    "Beast, the duration is doubled.<br /><br />" +
                    "While under the effects of Dominance, the target constantly loses health " + 
                    "until it dies or the effect ends. Only one enemy can be dominated at a " + 
                    "time. An enemy can only be dominated once.",
                    effects:[
                        {name:"Dominance Duration",
                        value:"12 seconds"},
                        {name:"Target loses 2% of Max Health/sec"}]})
    ];

    //Skills for green skill tree

    //Action Skills
    private fadeAway = new ActionSkill("assets/images/fl4k/skills/FadeAway.webp", [-1, 1], 1, 0, "green",
                    {name:"FADE AWAY", 
                    description:"FL4K cloaks, turning invisible. FL4K can fire 3 shots while cloaked, and each " +
                    "shot is automatically a Critical Hit.<br /><br />" +
                    "While cloaked, FL4K has increased Movement Speed and Health Regeneration.",
                    effects:[
                        {name:"Fade Away Critical Hit Damage",
                        type: [{criticalHitDmg: true}],
                        conditionals: [this.getExtraCond().fadeAwayCritEffectiveness, this.getExtraCond().fadeAway],
                        getActiveValueMultis: [
                            null,
                            () => {
                                return this.getExtraCond().fadeAwayCritEffectiveness.effectiveness;
                            }
                        ],
                        value:"+200%"},
                        {name:"Cloaked Movement Speed",
                        type: [{movementSpeed: true}],
                        conditional: this.getExtraCond().fadeAway,
                        value:"+25%"},
                        {name:"Health Regeneration",
                        type: [{healthRegen_maxHealth: true}],
                        conditional: this.getExtraCond().fadeAway,
                        value:"+3% of Max Health/sec"},
                        {name:"Cooldown",
                        value:"45 seconds"},
                        {name:"Skill Duration",
                        value:"15 seconds"}]});

    //Action Mods
    private guerrillasInTheMist = new ActionMod("assets/images/fl4k/skills/GuerrillasInTheMist.webp", [1, -1], 1, 5, "green",
                    {name:"GUERRILLAS IN THE MIST", 
                    description:"Fade Away no longer ends after FL4K attacks, at the cost of Critical Hit Damage and Fade Away duration being reduced.",
                    effects:[
                        {name:"Fade Away Critical Hit Damage",
                        type: [{extraType: this.getExtraTypes().fadeAwayCritEffectiveness}],
                        conditional: this.getExtraCond().fadeAway,
                        value:"+50%"},
                        {name:"Duration",
                        value:"8 seconds"}]}, this.fadeAway);
    private notMyCircus = new ActionMod("assets/images/fl4k/skills/NotMyCircus.webp", [2, -1], 1, 10, "green",
                    {name:"NOT MY CIRCUS", 
                    description:"After Fade Away ends, FL4K's pet will Taunt, drawing the attention of " + 
                    "all enemies in a huge radius.<br /><br />" +
                    "For a few seconds after Taunting, the pet gains powerful Damage Reduction.",
                    effects:[
                        {name:"Pet Taunt Duration",
                        value:"6 seconds"}, 
                        {name:"Pet Damage Reduction",
                        type: [{extraType: this.getExtraTypes().petDmgReduction}],
                        conditional: this.getExtraCond().fadeAwayEnded,
                        value:"+80%"}]}, this.fadeAway);
    private untilYouAreDead  = new ActionMod("assets/images/fl4k/skills/UntilYouAreDead.webp", [3, -1], 1, 15, "green",
                    {name:"UNTIL YOU ARE DEAD", 
                    description:"The Health Regeneration and Movement Speed of Fade Away persists for a short time " + 
                    "after the skill has ended.",
                    effects:[
                        {name:"Post Cloak Duration",
                        value:"10 seconds"}]}, this.fadeAway);
    private unblinkingEye = new ActionMod("assets/images/fl4k/skills/UnblinkingEye.webp", [4, -1], 1, 20, "green",
                    {name:"UNBLINKING EYE", 
                    description:"Successive hits on the same target increase FL4K's Critical Damage per hit. " + 
                    "Unblinking Eye resets every 3 hits.",
                    effects:[
                        {name:"Critical Hit Damage",
                        type: [{criticalHitDmg: true}],
                        conditional: this.getExtraCond().unblinkingEyeStacks,
                        getActiveValueMulti: () => {
                            return this.getExtraCond().unblinkingEyeStacks.currentValue;
                        },
                        value:"+75% per hit"},
                        {type: [{extraType: this.getExtraTypes().maxUnblinkingEyeStacks}],
                        value: 3,
                        hidden: true}]}, this.fadeAway);

    //Pet Skills
    private jabberSidekick = new OtherSkill("assets/images/fl4k/skills/JabberSidekick.webp", [-1, 0], 1, 0, "green",
                    {name:"JABBER SIDEKICK", 
                    description:"FL4K is joined by a loyal Jabber companion, armed with a Pistol. While accompanied " + 
                    "by the Jabber, FL4K's Movement Speed is increased.<br /><br />" +
                    "Hold F to issue an Attack Command, which will cause the Jabber to throw a Radiation Barrel at enemies.",
                    effects:[
                        {name:"Movement Speed", 
                        type: [{movementSpeed: true}],
                        conditional: this.getExtraCond().petBonuses,
                        getActiveValueMulti: () => {
                            return this.getExtraCond().petBonuses.effectiveness;
                        },
                        value:"+5.0%"}]});
    private beefCakeJabber = new OtherSkill("assets/images/fl4k/skills/BeefCakeJabber.webp", [2, 3], 1, 10, "green",
                    {name:"BEEFCAKE JABBER", 
                    description:"FL4K’s Jabber evolves into a Beefcake, discarding its pistol and equipping a Shotgun. " + 
                    "While accompanied by the Beefcake, FL4K gains increased Movement Speed and Maximum Health.<br /><br />" +
                    "When FL4K issues an Attack Command, the Beefcake will summon a melee weapon to deliver a powerful attack that knocks enemies back.",
                    effects:[
                        {name:"Movement Speed", 
                        type: [{movementSpeed: true}],
                        conditional: this.getExtraCond().petBonuses,
                        getActiveValueMulti: () => {
                            return this.getExtraCond().petBonuses.effectiveness;
                        },
                        value:"+5.0%"},
                        {name:"Max Health", 
                        type: [{maxHealth: true}],
                        conditional: this.getExtraCond().petBonuses,
                        getActiveValueMulti: () => {
                            return this.getExtraCond().petBonuses.effectiveness;
                        },
                        value:"+10.0%"}]});
    private gunslingerJabber  = new OtherSkill("assets/images/fl4k/skills/GunslingerJabber.webp", [3, 3], 1, 15, "green",
                    {name:"GUNSLINGER JABBER", 
                    description:"FL4K’s Jabber evolves into a Beefcake, discarding its pistol and equipping a Shotgun. " + 
                    "While accompanied by the Beefcake, FL4K gains increased Movement Speed and Maximum Health.<br /><br />" +
                    "When FL4K issues an Attack Command, the Beefcake will summon a melee weapon to deliver a powerful attack that knocks enemies back.",
                    effects:[
                        {name:"Movement Speed", 
                        type: [{movementSpeed: true}],
                        conditional: this.getExtraCond().petBonuses,
                        getActiveValueMulti: () => {
                            return this.getExtraCond().petBonuses.effectiveness;
                        },
                        value:"+5.0%"},
                        {name:"Critical Hit Damage", 
                        type: [{criticalHitDmg: true}],
                        conditional: this.getExtraCond().petBonuses,
                        getActiveValueMulti: () => {
                            return this.getExtraCond().petBonuses.effectiveness;
                        },
                        value:"+5.0%"}]});

    private greenSkills = [
        this.fadeAway,
        this.guerrillasInTheMist,
        this.notMyCircus,
        this.untilYouAreDead,
        this.unblinkingEye,
        this.jabberSidekick,
        this.beefCakeJabber,
        this.gunslingerJabber,
        new NormalSkill("assets/images/fl4k/skills/Self-RepairingSystem.webp", [0, 0], 5, 0, "green",
                    {name:"SELF-REPAIRING SYSTEM", 
                    description:"FL4K's Maximum Health is increased, and they constantly regenerate health.",
                    effects:[
                        {name:"Max Health",
                        type: [{maxHealth: true}],
                        values:["+6%", "+12%", "+18%", "+24%", "+30%"]},
                        {name:"Health Regeneration",
                        type: [{healthRegen_maxHealth: true}],
                        values:["0.3% of Max Health/sec", "0.6% of Max Health/sec", "0.9% of Max Health/sec", "1.2% of Max Health/sec", "1.5% of Max Health/sec"]}]}),
        new NormalSkill("assets/images/fl4k/skills/Sic'Em.webp", [0, 1], 3, 0, "green",
                    {name:"SIC 'EM", 
                    description:"Attack Command has lowered Cooldown and increased Damage.",
                    effects:[
                        {name:"Attack Command Damage",
                        values:["+10%", "+20%", "+30%"]},
                        {name:"Attack Command Cooldown", 
                        values:["-10%", "-20%", "-30%"]}]}),
        new NormalSkill("assets/images/fl4k/skills/FuriousAttack.webp", [0, 2], 5, 0, "green",
                    {name:"FURIOUS ATTACK", 
                    description:"Hunter Skill. After shooting an enemy, FL4K gains a stack of Furious Attack.<br /><br />" +
                    "For each stack of Furious Attack, FL4K's Handling and Gun Damage are increased. Stacks decay after a few seconds.",
                    effects:[
                        {name:"Handling",
                        type: [{handling: true}],
                        conditionals: [this.getExtraCond().hunterSkill, this.getExtraCond().furiousStacks],
                        getActiveValueMultis: [
                            null,
                            () => {
                                return this.getExtraCond().furiousStacks.currentValue * this.getExtraCond().hunterSkill.effectiveness;
                            }
                        ],
                        values:["+1.0% per stack", "+2.0% per stack", "+2.9% per stack", "+3.8% per stack", "+4.8% per stack"]},
                        {name:"Gun Damage",
                        type: [{gunDmg: true}],
                        conditionals: [this.getExtraCond().hunterSkill, this.getExtraCond().furiousStacks],
                        getActiveValueMultis: [
                            null,
                            () => {
                                return this.getExtraCond().furiousStacks.currentValue * this.getExtraCond().hunterSkill.effectiveness;
                            }
                        ],
                        values:["+0.4% per stack", "+0.8% per stack", "+1.2% per stack", "+1.6% per stack", "+2.0% per stack"]},
                        {name:"Furious Attack Stacks",
                        type: [{extraType: this.getExtraTypes().maxFuriousStacks}],
                        value:"10"},
                        {name:"Furious Attack Duration",
                        value:"4 seconds"}]}),
        new NormalSkill("assets/images/fl4k/skills/EagerToImpress.webp", [1, 0], 5, 5, "green",
                    {name:"EAGER TO IMPRESS", 
                    description:"Kill Skill. Whenever FL4K kills an enemy, Action Skill Cooldown Time is reduced.<br /><br />" + 
                    "Whenever FL4K's pet kills an enemy, Action Skill Cooldown Time is reduced even more and Attack Command's cooldown is refreshed.",
                    effects:[
                        {name:"Pet Kill Cooldown Time",
                        values:["-0.5 seconds", "-1.0 seconds", "-1.5 seconds", "-2.0 seconds", "-2.5 seconds"]},
                        {name:"FL4K Kill Cooldown Time",
                        values:["-0.25 seconds", "-0.50 seconds", "-0.75 seconds", "-1.00 seconds", "-1.25 seconds"]}]}),
        new NormalSkill("assets/images/fl4k/skills/AllMyBFF's.webp", [1, 1], 3, 5, "green",
                    {name:"ALL MY BFF'S", 
                    description:"Allies share a portion of FL4K's total Health Regeneration. FL4K's pet shares twice the amount of Health Regeneration.",
                    effects:[
                    {names:["Allies Share 17% of FL4K's Health Regeneration", 
                            "Allies Share 33% of FL4K's Health Regeneration",
                            "Allies Share 50% of FL4K's Health Regeneration"]}]}),
        new NormalSkill("assets/images/fl4k/skills/Overclocked.webp", [1, 2], 5, 5, "green",
                    {name:"OVERCLOCKED", 
                    description:"FL4K gains increased Fire Rate. FL4K gains even more Fire Rate after reloading.",
                    effects:[
                        {name:"Fire Rate after Reloading",
                        type: [{fireRate: true}],
                        conditional: this.getConditionals().reloaded,
                        values:["+2%", "+4%", "+6%", "+8%", "+10%"]},
                        {name:"Fire Rate",
                        type: [{fireRate: true}],
                        values:["+2%", "+4%", "+6%", "8%", "+10%"]},
                        {name:"Overclocked Duration",
                        value:"4 seconds"}]}),
        new NormalSkill("assets/images/fl4k/skills/LickTheWounds.webp", [2, 1], 1, 10, "green",
                    {name:"LICK THE WOUNDS", 
                    description:"When FL4K is in Fight For Your Life, their pet will attempt to revive them.",
                    effects:[]}),
        new NormalSkill("assets/images/fl4k/skills/TurnTailAndRun.webp", [2, 2], 3, 10, "green",
                    {name:"TURN TAIL AND RUN", 
                    description:"While moving, FL4K constantly regenerates health and gains Damage Reduction.<br /><br />" +
                    "While still, FL4K gains Gun Damage and Fire Rate.",
                    effects:[
                        {name:"Damage Reduction While Moving",
                        type: [{dmgReduction: true}],
                        conditional: this.getConditionals().moving,
                        values:["+6.5%", "+12.3%", "+17.4%"]},
                        {name:"Health Regeneration While Moving",
                        type: [{healthRegen_maxHealth: true}],
                        conditional: this.getConditionals().moving,
                        values:["0.3% of Max Health/sec", "0.6% of Max Health/sec", "0.9% of Max Health/sec"]},
                        {name:"Gun Damage While Still",
                        type: [{gunDmg: true}],
                        conditional: this.getConditionals().standingStill,
                        values:["+8.3%", "+16.7%", "+25%"]},
                        {name:"Fire Rate While Still",
                        type: [{fireRate: true}],
                        conditional: this.getConditionals().standingStill,
                        values:["+4.0%", "+8.0%", "+12%"]}]}),
        new NormalSkill("assets/images/fl4k/skills/FastAndFurryous.webp", [3, 0], 3, 15, "green",
                    {name:"THE FAST AND THE FURRYOUS", 
                    description:"While above half health, FL4K's Gun Damage and Movement Speed are increased.",
                    effects:[
                        {name:"Gun Damage",
                        type: [{gunDmg: true}],
                        conditional: this.getConditionals().aboveHalfHealth,
                        values:["+8%", "+17%", "+25%"]},
                        {name:"Movement Speed",
                        type: [{movementSpeed: true}],
                        conditional: this.getConditionals().aboveHalfHealth,
                        values:["+3.3%", "+6.7%", "+10%"]}]}),
        new NormalSkill("assets/images/fl4k/skills/HiddenMachine.webp", [3, 2], 5, 15, "green",
                    {name:"HIDDEN MACHINE", 
                    description:"When an enemy has no target or is attacking a different target, FL4K deals increased damage against them.",
                    effects:[
                        {name:"Damage",
                        type: [{dmgIncrease: true}],
                        conditional: this.getConditionals().enemyNotTargetingYou,
                        values:["+6%", "+12%", "+18%", "+24%", "+30%"]},
                    ]}),
        new NormalSkill("assets/images/fl4k/skills/RageAndRecover.webp", [4, 1], 5, 20, "green",
                    {name:"RAGE AND RECOVER", 
                    description:"Kill Skill. After killing an enemy, FL4K and FL4K's pet regenerate health for a few seconds.",
                    effects:[
                        {name:"Health Regeneration",
                        type: [{healthRegen_missingHealth: true}, {extraType: this.getExtraTypes().petHealthRegen_missingHealth}],
                        conditional: this.getConditionals().activateKillSkills,
                        values:["+1.6% of Missing Health/sec", "+3.2% of Missing Health/sec", "+4.8% of Missing Health/sec", "+6.4% of Missing Health/sec", "+8.0% of Missing Health/sec"]},
                        {name:"Rage and Recover Duration",
                        value:"3 seconds"}]}),
        new NormalSkill("assets/images/fl4k/skills/ThePowerInside.webp", [5, 1], 1, 25, "green",
                    {name:"THE POWER INSIDE", 
                    description:"FL4K and FL4K's Pet gain increased Damage when FL4K activates an Action Skill.<br /><br />" +
                    "If FL4K is at full health, the increased Damage is doubled.",
                    effects:[
                        {name:"Damage",
                        type: [{dmgIncrease: true}, {extraType: this.getExtraTypes().petDmg}], 
                        conditionals: [this.getConditionals().usedActionSkill, this.getExtraCond().fullLife], 
                        getActiveValueMultis: [
                            () => {
                                if (this.getExtraCond().fullLife.active) {
                                    return 2;
                                }

                                return 1;
                            },
                            () => {
                                if (this.getConditionals().usedActionSkill.active) {
                                    return 2;
                                }

                                return 0;
                            }
                        ],
                        getNotActiveValueMultis: [
                            null,
                            () => {
                                if (this.getConditionals().usedActionSkill.active) {
                                    return 1;
                                }

                                return 0;
                            }
                        ],
                        value:"+25%"},
                        {name:"The Power Inside Duration",
                        value:"15 seconds"}]})
    ];

    constructor(maxActionSkillPoints: number, maxActionModPoints: number, maxOtherSkillPoints: number) {
        super(maxActionSkillPoints, maxActionModPoints, maxOtherSkillPoints);
      }

    /**
     * Adds point into a specific skill type allocation
     * 
     * @param skill 
     *        Skill to be allocated
     * @param pos
     *        position of skill in equipped skills (only applies to action mods)
     */
    addPoint(skill: Skill, pos?: number): boolean {

        //If the skill is already in the array then don't add it
        if (!this.getAllocatedSkills().includes(skill)) {
            this.getAllocatedSkills().push(skill);
        }

        //Increment allocation of normal skills if skill is normal
        if (skill instanceof NormalSkill) this.setAllocatedNormalSkillPoints(this.getAllocatedNormalSkillPoints() + 1);


        //Action Mod
        if (skill instanceof ActionSkill) {

            //Check to see if an action mod is allocated already
            //If there is remove a point from its allocation and remove it from equipped skills
            if (this.getEquippedSkills()[0].actionSkill != skill && this.getEquippedSkills()[0].actionSkill != null)  {
                this.getEquippedSkills()[0].actionSkill.removePoint();
                this.removePoint(this.getEquippedSkills()[0].actionSkill);
            } 

            //Add action skill to equipped skills
            this.getEquippedSkills()[0].actionSkill = skill;
        } 

        //Action Mod
        if (skill instanceof ActionMod) {

            let otherPos = pos == 0 ? 1 : 0; //Other action mods position

            //Check if this mod is already allocated in the other position, and remove it if it is
            if (this.getEquippedSkills()[0].actionMods[otherPos] == skill) {
                this.removePoint(this.getEquippedSkills()[0].actionMods[otherPos]);
            }
            
            //If a skill exists in this position, remove it from the equipped skills and remove a point from its allocation
            if (this.getEquippedSkills()[0].actionMods[pos] != skill && this.getEquippedSkills()[0].actionMods[pos] != null)  {
                this.getEquippedSkills()[0].actionMods[pos].removePoint();
                this.removePoint(this.getEquippedSkills()[0].actionMods[pos]);
            } 

            //Add mod to equipped skill in the specified position
            this.getEquippedSkills()[0].actionMods[pos] = skill;
        }

        //Other skill
        if (skill instanceof OtherSkill) {

            //Check to see if an other skill is allocated already
            //If there is remove a point from its allocation and remove it from equipped skills
            if (this.getEquippedSkills()[0].otherSkill != skill && this.getEquippedSkills()[0].otherSkill != null)  {
                this.getEquippedSkills()[0].otherSkill.removePoint();
                this.removePoint(this.getEquippedSkills()[0].otherSkill);
            } 

            //Add other skill to equipped skills
            this.getEquippedSkills()[0].otherSkill = skill;
        };

        return true;
    }

    /**
     * removes point from a specific skill type allocation
     * 
     * @param skill
     *              skill to be removed
     * 
     */
    removePoint(skill: Skill) {

        var index = this.getAllocatedSkills().indexOf(skill);

        //Only remove if the allocated points = 0
        if (this.getAllocatedSkills()[index].getAllocatedPoints() == 0) {
            this.getAllocatedSkills().splice(index, 1);
        }


        //Reduce normal skill allocation if the skill type is normal
        if (skill instanceof NormalSkill) this.setAllocatedNormalSkillPoints(this.getAllocatedNormalSkillPoints() - 1);

        //remove action skill from equipped skills
        if (skill instanceof ActionSkill)  {
            this.getEquippedSkills()[0].actionSkill = null;
        } 

        //Remove action mod from equipped skills action mod array
        if (skill instanceof ActionMod) {
            var index: number = this.getEquippedSkills()[0].actionMods.indexOf(skill);
            this.getEquippedSkills()[0].actionMods[index] = null;
        }

        //Remove other skill from equipped skills
        if (skill instanceof OtherSkill) {
            this.getEquippedSkills()[0].otherSkill = null;
        } 

        return true;
    }

    /**
     * Retrieves skills that belong to the blue tree
     * 
     * @returns
     *          Array
     */
    getBlueSkills(): Skill[] {
        return this.blueSkills;
    }
    
    /**
     * Retrieves skills that belong to the red tree
     * 
     * @returns
     *          Array
     */
    getRedSkills(): Skill[] {
        return this.redSkills;
    }

    /**
     * Retrieves skills that belong to the green tree
     * 
     * @returns
     *          Array
     */
    getGreenSkills(): Skill[] {
        return this.greenSkills;
    }

    /**
     * Returns the extra conditionals
     * 
     * @returns
     *           any (Object of the extra conditionals)
     */
    getExtraCond(): any {
        return this.extraConditionals;
    }

    /**
     * Returns the extra stat types for fl4k
     * 
     * @returns
     *           any (Object of the extra types)
     */
    getExtraTypes(): any {
        return this.extraTypes;
    }
}
