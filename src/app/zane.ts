import { Skill } from './skill';
import { NormalSkill } from './normalskill';
import { OtherSkill } from './otherskill';
import { ActionSkill } from './actionskill';
import { ActionMod } from './actionmod';
import { Character } from './character';

export class Zane extends Character {

    //Path for red tree header image
    public readonly RED_TREE_HEADER: string = "assets/images/zane/redTreeHeader.webp";
    public readonly RED_TREE_NAME: string = "Double Agent";

    //Path for blue tree header image
    public readonly BLUE_TREE_HEADER: string = "assets/images/zane/blueTreeHeader.webp";
    public readonly BLUE_TREE_NAME: string = "Hitman";

    //Path for green tree header image
    public readonly GREEN_TREE_HEADER: string = "assets/images/zane/greenTreeHeader.webp";
    public readonly GREEN_TREE_NAME: string = "Undercover";

    private extraConditionals = { 
        takingHealthDmg: {
            active: false,
            header: "Taking Health Damage?"
        },
        activeActionSkills: {
            active: false,
            header: "Do you have active action skills?",
            requiresNumberField: true,
            currentValue: 0,
            maxValue: 2,
        },
        consumedGrenades: {
            active: false,
            header: "Digi Clone Conusmed Grenades?",
            requiresNumberField: true,
            currentValue: 0,
            maxValue: 3,
        },
        swappedPlaceWithClone: {
            active: false,
            header: "Did you swap with your clone?"
        },
        badDosedEnemies: {
            active: false,
            header: "Drone Bad Dosed Enemies?",
            requiresNumberField: true,
            currentValue: 0,
            maxValue: 999,
        },
        killSkillBonus: {
            active: true,
            stateChangeable: false,
            effectiveness: 1
        },
        swappedFirstShotFired: {
            active: false,
            header: "First Shot fired after weapon swap?"
        },
        touchedBarrier: {
            active: false,
            header: "Did you touch the barrier recently?"
        },
        digiTouchedBarrier: {
            active: false,
            header: "Did Digi Clone touch barrier recently?"
        },
        nearBarrier: {
            active: false,
            header: "Near your barrier?"
        },
        digiNearBarrier: {
            active: false,
            header: "Digi Clone near your barrier?"
        },
        barrierTookDmg: {
            active: false,
            header: "Did the barrier take damage recently?"
        },
        frozenEnemy: {
            active: false,
            header: "Enemy is frozen?"
        },
        shieldsFull: {
            active: false,
            header: "Shields Full?"
        },
        frozeEnemy: {
            active: false,
            header: "Froze an enemy recently?"
        },
        nervesOfSteelStacks: {
            active: false,
            header: "Using Nerves Of Steel stacks?",
            requiresNumberField: true,
            currentValue: 0,
            maxValue: 0,
        }
    };

    private extraTypes = {
        actionSkillDuration: {
            type: "utility",
            header: "Action Skill Duration",
            value: 0,
            valueType: "percent",
            setFunc: (duration: number) => {
                this.getExtraTypes().actionSkillDuration.value += duration;
            }

        },
        dmgShared: {
	        type: "defense",
            header: "Damage Shared",
            value: 0,
            valueType: "percent",
            setFunc: (dmgShared: number) => {
                this.getExtraTypes().dmgShared.value += dmgShared;
            }
        },
        ignoreBulletChance: {
            type: "defense",
            header: "Ignore Bullet Chance",
            value: 0,
            valueType: "percent",
            setFunc: (ignoreChance: number) => {
                this.getExtraTypes().ignoreBulletChance.value += ignoreChance;
            }
        },
        digiCloneMagSize: {
            header: "Digi Clone Mag Size",
            value: 0,
            valueType: "percent",
            setFunc: (magSize: number) => {
                this.getExtraTypes().digiCloneMagSize.value += magSize;
            }
        },
        digiCloneGunDmg: {
            header: "Digi Clone Gun Damage",
            value: 0,
            valueType: "percent",
            setFunc: (gunDmg: number) => {
                this.getExtraTypes().digiCloneGunDmg.value += gunDmg;
            }
        },
        digiCloneMaxHealth: {
            header: "Digi Clone Max Health",
            value: 0,
            valueType: "percent",
            setFunc: (maxHealth: number) => {
                this.getExtraTypes().digiCloneMaxHealth.value += maxHealth;
            }
        },
        digiCloneReloadSpeed: {
            header: "Digi Clone Reload Speed",
            value: 0,
            valueType: "percent",
            setFunc: (reloadSpeed: number) => {
                this.getExtraTypes().digiCloneReloadSpeed.value += reloadSpeed;
            }
        },
        digiCloneDuration: {
            header: "Digi Clone Duration",
            value: 0,
            valueType: "percent",
            setFunc: (duration: number) => {
                this.getExtraTypes().digiCloneDuration.value += duration;
            }
        },
        digiCloneHealthRegen_max: {
            header: "Digi Clone Health Regen (max)",
            value: 0,
            valueType: "percent",
            setFunc: (regen: number) => {
                this.getExtraTypes().digiCloneHealthRegen_max.value += regen;
            }
        },
        digiCloneShieldRechargeDelay: {
            header: "Digi Clone Shield Recharge Delay",
            value: 0,
            valueType: "percent",
            setFunc: (delay: number) => {
                this.getExtraTypes().digiCloneShieldRechargeDelay.value += delay;
            }
        },
        droneDmg: {
            header: "Drone Damage",
            value: 0,
            valueType: "percent",
            setFunc: (dmg: number) => {
                this.getExtraTypes().droneDmg.value += dmg;
            }
        },
        killSkillBonus: {
            header: "Kill Skill Bonus",
            value: 0,
            valueType: "percent",
            setFunc: (bonusValue: number) => {
                this.getExtraTypes().killSkillBonus.value += bonusValue;
                this.getExtraCond().killSkillBonus.effectiveness += (bonusValue/100);
            }
        },
        statusEffectDuration: {
            header: "Status Effect Duration",
            value: 0,
            valueType: "percent",
            setFunc: (duration: number) => {
                this.getExtraTypes().statusEffectDuration.value += duration;
            }
        },
        maxNervesOfSteelStacks: {
            header: "Max Endurance Stacks",
            value: 0,
            valueType: "flat",
            setFunc: (stackSize: number) => {
                this.getExtraTypes().maxNervesOfSteelStacks.value += stackSize;
                this.getExtraCond().nervesOfSteelStacks.maxValue += stackSize; 
            }
        },
		
    };

    
    //Skills for red skill tree

    //Action Skills
    private digiClone = new ActionSkill("assets/images/zane/skills/DigiClone.webp", [-1, 1], 1, 0, "red",
                {name:"DIGI-CLONE",
                description:"Spawn a Digi-Clone of Zane. This Clone stays in place, but distracts and " + 
                "fires at enemies.<br /><br />Pressing F or G while the Clone is active causes Zane and the Clone to swap places.",
                effects:[
                    {name:"Duration",
                    value:"15 seconds"},
                    {name:"Cooldown",
                    value:"28 seconds"}]});

    //Action Mods
    private binarySystem = new ActionMod("assets/images/zane/skills/BinarySystem.webp", [1, -1], 1, 5, "red",
                {name:"BINARY SYSTEM",
                description:"Whenever Zane swaps places with his Clone, a Cryo Nova is triggered around Zane and his Clone.",
                effects:[
                    {name:"Nova Damage",
                    value:46}]}, this.digiClone);
    private schadenfreude = new ActionMod("assets/images/zane/skills/Schadenfreude.webp", [2, -1], 1, 10, "red",
                {name:"SCHADENFREUDE",
                description:"Whenever the Clone takes damage, Zane's shield is restored by a portion of that damage.",
                effects:[
                    {name:"Shields Restored",
                    value:"+100.0% of Digi-Clone damage"}]}, this.digiClone);
    private whichOneReal = new ActionMod("assets/images/zane/skills/WhichOneReal.webp", [2, 3], 1, 10, "red",
                {name:"WHICH ONE'S REAL?",
                description:"Enemies are more likely to target the Clone for a few seconds after it’s summoned and after swapping places.",
                effects:[
                    {name:"Duration",
                    value:"4 seconds"}]}, this.digiClone);
    private doppelBanger = new ActionMod("assets/images/zane/skills/DoppelBanger.webp", [3, -1], 1, 15, "red",
                {name:"DOPPELBANGER",
                description:"Hold down F or G to end the action skill early.<br/><br />" +
                "When Zane’s Action Skill is ended, the Clone explodes, dealing Splash Damage to all nearby enemies.<br /><br />" +
                "The more Action Skill time remaining, the greater the damage.",
                effects:[
                    {name:"Damage",
                    value:"Up to 280"}]}, this.digiClone);
    private digitalDistribution = new ActionMod("assets/images/zane/skills/DigitalDistribution.webp", [3, 3], 1, 15, "red",
                {name:"DIGITAL DISTRIBUTION",
                description:"If Zane takes health damage while the Clone is active, a portion of that damage is shared to his Clone instead.",
                effects:[
                    {name:"Shared Health Damage",
                    type: [{extraType: this.getExtraTypes().dmgShared}],
                    conditional: this.getExtraCond().takingHealthDmg,
                    value:"+75.0%"}]}, this.digiClone);
    
    private redSkills = [
        this.digiClone,
        this.binarySystem,
        this.schadenfreude,
        this.whichOneReal,
        this.doppelBanger,
        this.digitalDistribution,
        new NormalSkill("assets/images/zane/skills/Synchronicity.webp", [0, 0], 5, 0, "red",
                {name:"SYNCHRONICITY",
                description:"Whenever one or more of Zane's action skills are active, he gains increased Gun Damage for each active action skill.",
                effects:[
                        {name:"Gun Damage",
                        type: [{gunDmg: true}],
                        conditional: this.getExtraCond().activeActionSkills,
                        getActiveValueMulti: () => {
                                return this.getExtraCond().activeActionSkills.currentValue;
                        },
                        values:["+4% per active action skill", "+8% per active action skill", "+12% per active action skill" , "+16% per active action skill", "+20% per active action skill"]}]}),
        new NormalSkill("assets/images/zane/skills/Praemunitus.webp", [0, 1], 3, 0, "red",
                {name:"PRAEMUNITUS",
                description:"Zane and his Digi-Clone gain increased Magazine Size.",
                effects:[
                        {name:"Magazine Size", 
                        type: [{magSize: true}, {extraType: this.getExtraTypes().digiCloneMagSize}],
                        values:["+8.3%", "+16.7%", "+25.0%"]}]}),
        new NormalSkill("assets/images/zane/skills/BorrowedTime.webp", [0, 2], 5, 0, "red",
                {name:"BORROWED TIME",
                description:"Zane gains increased Action Skill Duration for every active Action Skill.",
                effects:[
                        {name:"Action Skill Duration", 
                        type: [{extraType: this.getExtraTypes().actionSkillDuration}],
                        conditional: this.getExtraCond().activeActionSkills,
                        getActiveValueMulti: () => {
                            return this.getExtraCond().activeActionSkills.currentValue;
                        },
                        values:["+3% per active action skill", "+6% per active action skill", "+9% per active action skill" , "+12% per active action skill", "+15% per active action skill"]}
                ]}),
        new NormalSkill("assets/images/zane/skills/DonnyBrook.webp", [1, 0], 5, 5, "red",
                {name:"DONNYBROOK",
                description:"Kill Skill. Whenever Zane kills an enemy, he and his Digi-Clone receive increased Gun Damage and gain Health Regeneration for a few seconds.",
                effects:[
                        {name:"Gun Damage",
                        type: [{gunDmg: true}],
                        conditionals: [this.getExtraCond().killSkillBonus, this.getConditionals().activateKillSkills],
                        getActiveValueMultis: [
                            null,
                            () => {
                                return this.getExtraCond().killSkillBonus.effectiveness;
                            }
                        ],
                        values:["+3%", "+6%", "+9%" , "+12%", "+15%"]},
                        {name:"Health Regeneration", 
                        type: [{healthRegen_missingHealth: true}],
                        conditionals: [this.getExtraCond().killSkillBonus, this.getConditionals().activateKillSkills],
                        getActiveValueMultis: [
                            null,
                            () => {
                                return this.getExtraCond().killSkillBonus.effectiveness;
                            }
                        ],
                        values:["0.5% of Missing Health / sec", "1.0% of Missing Health / sec", "1.5% of Missing Health / sec" , "2.0% of Missing Health / sec", "2.5% of Missing Health / sec"]},
                        {name:"Duration", 
                        value:"8 seconds"}]}),
        new NormalSkill("assets/images/zane/skills/FractalFrags.webp", [1, 1], 1, 5, "red",
                {name:"FRACTAL FRAGS",
                description:"The Digi-Clone throws a copy of Zane's current grenade mod when it is first activated. If the Digi-Clone is killed, it drops a free grenade.<br /><br />" +
                "Kill Skill. Killing an enemy while the Digi-Clone is active gives the Clone a chance to throw a grenade.",
                effects:[
                        {name:"Grenade Chance", 
                        value:"30%"}
                ]}),
        new NormalSkill("assets/images/zane/skills/DuctTapeMod.webp", [1, 2], 5, 5, "red",
                {name:"DUCT TAPE MOD",
                description:"The first shot fired from Zane's gun has a chance to also fire a grenade. This skill has a short cooldown",
                effects:[
                        {name:"Grenade Chance", 
                        values:["up to 4%", "up to 8%", "up to 12%" , "up to 16%", "up to 20%"]},
                        {name:"Cooldown Time", 
                        value:"8 seconds"}]}),
        new NormalSkill("assets/images/zane/skills/QuickBreather.webp", [2, 1], 1, 10, "red",
                {name:"QUICK BREATHER",
                description:"Whenever Zane swaps places with his Clone, his shield immediately begins recharging.",
                effects:[]}),
        new NormalSkill("assets/images/zane/skills/PocketFullOfGrenades.webp", [3, 0], 3, 15, "red",
                {name:"POCKET FULL OF GRENADES",
                description:"Kill Skill. After killing an enemy, Zane gains Grenade Regeneration for a few seconds.",
                effects:[
                        {name:"Grenade Regeneration", 
                        values:["7% / sec", "13% / sec", "20% / sec"]},
                        {name:"Duration", 
                        value:"8 seconds"}]}),
        new NormalSkill("assets/images/zane/skills/OldU.webp", [3, 1], 1, 15, "red",
                {name:"OLD-U",
                description:"Press F or G during Fight for Your Life if Digi-Clone is active to destroy the clone and immediately gain a Second Wind with full health.",
                effects:[
                        {name:"Max Health Restored", 
                        value:"100% of Max Health"}]}),
        new NormalSkill("assets/images/zane/skills/SupersonicMan.webp", [3, 2], 3, 15, "red",
                {name:"SUPERSONIC MAN",
                description:"Whenever one or more of Zane's Action Skills are active, he gains increased Movement Speed for each active Action Skill.",
                effects:[
                        {name:"Movement Speed", 
                        type: [{movementSpeed: true}],
                        conditional: this.getExtraCond().activeActionSkills,
                        getActiveValueMulti: () => {
                            return this.getExtraCond().activeActionSkills.currentValue;
                        },
                        values:["+4% per active action skill", "+8% per active action skill", "+12% per active action skill"]}
                ]}),
        new NormalSkill("assets/images/zane/skills/LikeAGhost.webp", [4, 0], 3, 20, "red",
                {name:"LIKE A GHOST",
                description:"Zane and his Digi-Clone gain a chance to ignore bullets. This chance is increased for a few seconds after activating an Action Skill. This effect stacks.",
                effects:[
                        {name:"Ignore Bullet Chance", 
                        type: [{extraType: this.getExtraTypes().ignoreBulletChance}],
                        values:["2%", "4%", "6%"]},
                        {name:"Additional Ignore Bullet Chance",  
                        type: [{extraType: this.getExtraTypes().ignoreBulletChance}],
                        conditional: this.getExtraCond().activeActionSkills,
                        getActiveValueMulti: () => {
                            return this.getExtraCond().activeActionSkills.currentValue;
                        },
                        values:["+3%", "+6%", "+9%"]},
                        {name:"Duration",
                        value:"8 seconds"}]}),
        new NormalSkill("assets/images/zane/skills/BoomEnhance.webp", [4, 1], 1, 20, "red",
                {name:"BOOM. ENHANCE.",
                description:"Whenever Zane summons his Digi-Clone, it consumes up to 3 grenades. For every grenade consumed, the Digi-Clone gains increased Gun Damage, Max Health, Fire Rate, Reload Speed, and Digi-Clone Duration.",
                effects:[
                        {name:"Gun Damage", 
                        type: [{extraType: this.getExtraTypes().digiCloneGunDmg}],
                        conditional: this.getExtraCond().consumedGrenades,
                        getActiveValueMulti: () => {
                            return this.getExtraCond().consumedGrenades.currentValue;
                        },
                        value:"+20% per grenade"},
                        {name:"Max Health", 
                        type: [{extraType: this.getExtraTypes().digiCloneMaxHealth}],
                        conditional: this.getExtraCond().consumedGrenades,
                        getActiveValueMulti: () => {
                            return this.getExtraCond().consumedGrenades.currentValue;
                        },
                        value:"+81% per grenade"},
                        {name:"Fire Rate", 
                        type: [{extraType: this.getExtraTypes().digiCloneFireRate}],
                        conditional: this.getExtraCond().consumedGrenades,
                        getActiveValueMulti: () => {
                            return this.getExtraCond().consumedGrenades.currentValue;
                        },
                        value:"+5% per grenade"},
                        {name:"Reload Speed", 
                        type: [{extraType: this.getExtraTypes().digiCloneReloadSpeed}],
                        conditional: this.getExtraCond().consumedGrenades,
                        getActiveValueMulti: () => {
                            return this.getExtraCond().consumedGrenades.currentValue;
                        },
                        value:"+31% per grenade"},
                        {name:"Digi-clone Duration", 
                        type: [{extraType: this.getExtraTypes().digiCloneDuration}],
                        conditional: this.getExtraCond().consumedGrenades,
                        getActiveValueMulti: () => {
                            return this.getExtraCond().consumedGrenades.currentValue;
                        },
                        value:"+25.0% seconds per grenade"}]}),
        new NormalSkill("assets/images/zane/skills/TrickOfTheLight.webp", [4, 2], 3, 20, "red",
                {name:"TRICK OF THE LIGHT",
                description:"Zane deals Bonus Shock Damage to enemies that aren't targeting him.",
                effects:[
                        {name:"Bonus Damage", 
                        type: [{bonusShockDmg: true}],
                        conditional: this.getConditionals().enemyNotTargetingYou,
                        values:["6.0% of damage dealt", "12.0% of damage dealt", "18.0% of damage dealt"]}]}),
        new NormalSkill("assets/images/zane/skills/DoubleBarrel.webp", [5, 1], 1, 25, "red",
                {name:"DOUBLE BARREL",
                description:"The Clone is equipped with a copy of Zane's Current Weapon when activated.<br /><br />" +
                "Swapping places with the Clone causes Zane and his clone to gain increased Gun Damage.",
                effects:[
                        {name:"Item Duping", 
                        value:"+100%"},
                        {name:"Gun Damage", 
                        type: [{gunDmg: true}],
                        conditional: this.getExtraCond().swappedPlaceWithClone,
                        value:"+20%"}]})
    ];

    //Skills for blue skill tree

    //Action Skills
    private SNTNL = new ActionSkill("assets/images/zane/skills/SNTNL.webp", [-1, 1], 1, 0, "blue",
                {name:"SNTNL",
                description:"Send into battle an automated SNTNL drone that continually flies " + 
                "through the environment and attacks enemies with its Machine Guns.<br /><br />" +
                "Pressing F or G while SNTNL is active causes it to attack the enemy under Zane's crosshairs, if any.",
                effects:[
                    {name:"Duration",
                    value:"24 seconds"},
                    {name:"Cooldown",
                    value:"60 seconds"},
                    {name:"Machine Gun Damage",
                    value:4}]});

    //Action Mods
    private winterDrone = new ActionMod("assets/images/zane/skills/WinterDrone.webp", [1, -1], 1, 5, "blue",
                {name:"WINTER'S DRONE",
                description:"Converts SNTNL's primary weapons to Cryo Damage.",
                effects:[
                    {name:"Converts SNTNL Weapon Damage to Cryo"},
                    {name:"Drone Damage",
                    type: [{extraType: this.getExtraTypes().droneDmg}],
                    value:"-20%"}]}, this.SNTNL);
    private badDose = new ActionMod("assets/images/zane/skills/BadDose.webp", [2, -1], 1, 10, "blue",
                {name:"BAD DOSE",
                description:"SNTNL occasionally shoots out a beam of Radiation that weakens enemies" + 
                "and buffs Zane.<br /><br /> For every weakened enemy, Zane’s Movement Speed and " + 
                "Fire Rate are increased.<br/><br /> Weakened enemies have decreased Movement Speed and Attack Speed.",
                effects:[
                    {name:"Fire Rate",
                    type: [{fireRate: true}],
                    conditional: this.getExtraCond().badDosedEnemies,
                    getActiveValueMulti: () => {
                        return this.getExtraCond().badDosedEnemies.currentValue;
                    },
                    value:"+2.00% per enemy"},
                    {name:"Movement Speed",
                    type: [{movementSpeed: true}],
                    conditional: this.getExtraCond().badDosedEnemies,
                    getActiveValueMulti: () => {
                        return this.getExtraCond().badDosedEnemies.currentValue;
                    },
                    value:"+6.00% per enemy"},
                    {name:"Damage",
                    value:"4 / second"},
                    {name:"Duration",
                    value:"12 seconds"},
                    {name:"Cooldown",
                    value:"8 seconds"}]}, this.SNTNL);
    private staticField = new ActionMod("assets/images/zane/skills/StaticField.webp", [2, 3], 1, 10, "blue",
                {name:"STATIC FIELD",
                description:"SNTNL emits a static field that sends a Shock Beam to nearby enemies, draining their shields and replenishing Zane’s.",
                effects:[
                    {name:"Shield Damage",
                    value:"2 / second"},
                    {name:"Cooldown",
                    value:"2 seconds"}]}, this.SNTNL);
    private boomsDay = new ActionMod("assets/images/zane/skills/BoomsDay.webp", [3, -1], 1, 15, "blue",
                {name:"BOOMSDAY",
                description:"SNTNL adds a rocket pod to its primary weapons, allowing it to shoot rockets as well as machine guns.",
                effects:[
                    {name:"Rocket Damage",
                    value:21}]}, this.SNTNL);
    private almightyOrdnance = new ActionMod("assets/images/zane/skills/AlmightyOrdnance.webp", [3, 3], 1, 15, "blue",
                {name:"ALMIGHTY ORDNANCE",
                description:"Hold down F or G while SNTNL is deployed to paint a target area.<br /><br />" + 
                "SNTNL fires a missile barrage at that area, and if an enemy is killed, SNTNL's duration is reset.<br /><br />" +
                "This can only be used once per Action Skill use.",
                effects:[
                    {name:"Missile Damage",
                    value:32},
                    {name:"Missiles per Barrage",
                    value:4}]}, this.SNTNL);

    private blueSkills = [ 
        this.SNTNL,
        this.winterDrone,
        this.badDose,
        this.staticField,
        this.boomsDay,
        this.almightyOrdnance,
        new NormalSkill("assets/images/zane/skills/ViolentSpeed.webp", [0, 0], 5, 0, "blue",
                {name:"VIOLENT SPEED",
                description:"Kill Skill. After killing an enemy, Zane gains increased Movement Speed for a few seconds.",
                effects:[
                    {name:"Movement Speed", 
                    type: [{movementSpeed: true}],
                    conditionals: [this.getExtraCond().killSkillBonus, this.getConditionals().activateKillSkills],
                    getActiveValueMultis: [
                        null,
                        () => {
                            return this.getExtraCond().killSkillBonus.effectiveness;
                        }
                    ],
                    values:["+4.0%", "+8.0%", "+12.0%" , "+16.0%", "+20.0%"]},
                    {name:"Duration", 
                    value:"8 seconds"}]}),
        new NormalSkill("assets/images/zane/skills/ColdBore.webp", [0, 1], 5, 0, "blue",
                {name:"COLD BORE",
                description:"Zane gains increased Weapon Swap Speed. The next shot fired after swapping weapons deals Bonus Cryo Damage.",
                effects:[
                    {name:"Weapon Swap Speed", 
                    type: [{weaponSwapSpeed: true}],
                    values:["+13%", "+23%", "+31%" , "+38%", "+43%"]},
                    {name:"Bonus Cryo Damage", 
                    type: [{bonusCryoDmg: true}],
                    conditional: this.getExtraCond().swappedFirstShotFired,
                    values:["+6%", "+12%", "+18%" , "+24%", "+30%"]}]}),
        new NormalSkill("assets/images/zane/skills/ViolentMomentum.webp", [0, 2], 5, 0, "blue",
                {name:"VIOLENT MOMENTUM",
                description:"Zane's Gun Damage is increased while moving. The quicker he moves, the greater the Gun Damage bonus.",
                effects:[
                    {name:"Gun Damage", 
                    type: [{gunDmg: true}],
                    conditional: this.getConditionals().moving,
                    values:["+4.0% at default walk speed", "+8.0% at default walk speed", "+12.0% at default walk speed" , "+16.0% at default walk speed", "+20.0% at default walk speed"]}]}),
        new NormalSkill("assets/images/zane/skills/CoolHand.webp", [1, 0], 5, 5, "blue",
                {name:"COOL HAND",
                description:"Zane gains increased Reload Speed.<br /><br />" +
                "Kill Skill. After killing an enemy, Zane's Reload Speed is increased for a few seconds.",
                effects:[
                    {name:"Reload Speed", 
                    type: [{reloadSpeed: true}],
                    conditional: this.getConditionals().activateKillSkills,
                    getActiveValueMulti: () => {
                        return 0;
                    },
                    getNotActiveValueMulti: () => {
                        return 1;
                    },
                    values:["+2.9%", "+5.7%", "+8.3%" , "+10.7%", "+13.0%"]},
                    {name:"Reload Speed", 
                    type: [{reloadSpeed: true}],
                    conditionals: [this.getExtraCond().killSkillBonus, this.getConditionals().activateKillSkills],
                    getActiveValueMultis: [
                        null,
                        () => {
                            return this.getExtraCond().killSkillBonus.effectiveness;
                        }
                    ],
                    values:["+4.0% after kill", "+7.0% after kill", "+11.0% after kill" , "+14.0% after kill", "+17.0% after kill"]},
                    {name:"Duration", 
                    value:"8 seconds"}]}),
        new NormalSkill("assets/images/zane/skills/DroneDelivery.webp", [1, 1], 1, 5, "blue",
                {name:"DRONE DELIVERY",
                description:"SNTNL will occasionally drop a free grenade based on Zane's current grenade mod while attacking enemies.",
                effects:[
                    {name:"Cooldown", 
                    value:"15 seconds"}]}),
        new NormalSkill("assets/images/zane/skills/Salvation.webp", [1, 2], 5, 5, "blue",
                {name:"SALVATION",
                description:"Kill Skill. After killing an enemy, Zane's weapons gain Life Steal for a few seconds.",
                effects:[
                    {name:"Life Steal", 
                    type: [{lifeSteal: true}],
                    conditionals: [this.getExtraCond().killSkillBonus, this.getConditionals().activateKillSkills],
                    getActiveValueMultis: [
                        null,
                        () => {
                            return this.getExtraCond().killSkillBonus.effectiveness;
                        }
                    ],
                    values:["2% of damage dealt", "4% of damage dealt", "6% of damage dealt" , "8% of damage dealt", "10% of damage dealt"]},
                    {name:"Duration", 
                    value:"8 seconds"}]}),
        new NormalSkill("assets/images/zane/skills/DeathFollowsClose.webp", [2, 1], 1, 10, "blue",
                {name:"DEATH FOLLOWS CLOSE",
                description:"All of Zane's Kill Skills gain increased effect and duration.",
                effects:[
                    {name:"Kill Skill Duration", 
                    value:"+7 seconds"},
                    {name:"Kill Skill Bonus", 
                    type: [{extraType: this.getExtraTypes().killSkillBonus}],
                    value:"+25.0%"}]}),
        new NormalSkill("assets/images/zane/skills/ViolentViolence.webp", [3, 0], 5, 15, "blue",
                {name:"VIOLENT VIOLENCE",
                description:"Kill Skill. After killing an enemy, Zane gains increased Fire Rate for a few seconds.",
                effects:[
                    {name:"Fire Rate", 
                    type: [{fireRate: true}],
                    conditionals: [this.getExtraCond().killSkillBonus, this.getConditionals().activateKillSkills],
                    getActiveValueMultis: [
                        null,
                        () => {
                            return this.getExtraCond().killSkillBonus.effectiveness;
                        }
                    ],
                    values:["+4%", "+8%", "+12%" , "+16%", "+20%"]},
                    {name:"Duration", 
                    value:"8 seconds"}]}),
        new NormalSkill("assets/images/zane/skills/PlayingDirty.webp", [3, 2], 5, 15, "blue",
                {name:"PLAYING DIRTY",
                description:"Kill Skill. After killing an enemy, Zane’s next five shots all have a chance to fire an additional projectile.",
                effects:[
                    {name:"Extra Shot Chance", 
                    values:["10.0%", "20.0%", "30.0%" , "40.0%", "50.0%"]}]}),
        new NormalSkill("assets/images/zane/skills/GoodMisfortune.webp", [4, 1], 3, 20, "blue",
                {name:"GOOD MISFORTUNE",
                description:"Kill Skill. Killing an enemy increases Zane's Action Skill Duration. This skill has diminishing returns.",
                effects:[
                    {name:"Duration Return", 
                    type: [{extraType: this.getExtraTypes().actionSkillDuration}],
                    conditionals: [this.getExtraCond().killSkillBonus, this.getConditionals().activateKillSkills],
                    getActiveValueMultis: [
                        null,
                        () => {
                            return this.getExtraCond().killSkillBonus.effectiveness;
                        }
                    ],
                    values:["up to 4.0% max duration", "up to 8.0% max duration", "up to 12.0% max duration"]}]}),
        new NormalSkill("assets/images/zane/skills/SeeingRed.webp", [5, 1], 1, 25, "blue",
                {name:"SEEIN' RED",
                description:"Activating an Action Skill automatically activates all of Zane's Kill Skills.",
                effects:[]})
    ];

    //Skills for green skill tree

    //Action Skills
    private barrier = new ActionSkill("assets/images/zane/skills/Barrier.webp", [-1, 1], 1, 0, "green",
                {name:"BARRIER",
                description:"Drop a deployable Barrier that blocks incoming projectiles. Zane and his allies" + 
                " can shoot through the Barrier, dealing increased Gun Damage.<br /><br />" +
                "Pressing F or G while Barrier is active picks up and holds the Barrier, but the size and bonuses are decreased.",
                effects:[
                    {name:"Duration",
                    value:"14 seconds"},
                    {name:"Cooldown",
                    value:"24 seconds"},
                    {name:"Damage Amp",
                    value:"+25%"}]});
    
    //Action Mods
    private chargedRelay = new ActionMod("assets/images/zane/skills/ChargedRelay.webp", [1, -1], 1, 5, "green",
                {name:"CHARGED RELAY",
                description:"Whenever Zane or an ally touches the Barrier, they gain increased Movement Speed and Reload Speed for a few seconds.",
                effects:[
                    {name:"Reload Speed",
                    type: [{reloadSpeed: true}],
                    conditional: this.getExtraCond().touchedBarrier,
                    value:"+20%"},
                    {name:"Movement Speed",
                    type: [{movementSpeed: true}],
                    conditional: this.getExtraCond().touchedBarrier,
                    value:"+11%"},
                    {name:"Duration",
                    value:"8 seconds after moving away from Barrier"},
                    
                    {name:"Reload Speed",
                    type: [{extraType: this.getExtraTypes().digiCloneReloadSpeed}],
                    conditional: this.getExtraCond().digiTouchedBarrier,
                    hidden: true,
                    value:"+20%"}]}, this.barrier);
    private nanitesOrSomeShite = new ActionMod("assets/images/zane/skills/NanitesOrSomeShite.webp", [2, -1], 1, 10, "green",
                {name:"NANITES OR SOME SHITE",
                description:"Zane and his allies gain Health Regeneration, increased Reload Speed, and greatly" + 
                " improved Shield Recharge Delay while near his Barrier.<br /><br /> The lower his health, the more health is regenerated.",
                effects:[
                    {name:"Health Regeneration",
                    type: [{healthRegen_maxHealth: true}],
                    conditional: this.getExtraCond().nearBarrier,
                    value:"up to 4% of Max Health/sec while near Barrier"},
                    {name:"Shield Recharge Delay",
                    type: [{shieldRegenDelay: true}],
                    conditional: this.getExtraCond().nearBarrier, 
                    value:"-33%"},
                    {name:"Reload Speed",
                    type: [{reloadSpeed: true}],
                    conditional: this.getExtraCond().nearBarrier,
                    value:"+11%"},
                
                    
                    {name:"Health Regeneration",
                    type: [{extraType: this.getExtraTypes().digiCloneHealthRegen_max}],
                    conditional: this.getExtraCond().digiNearBarrier,
                    hidden: true,
                    value:"up to 4% of Max Health/sec while near Barrier"},
                    {name:"Shield Recharge Delay",
                    type: [{extraType: this.getExtraTypes().digiCloneShieldRechargeDelay}],
                    conditional: this.getExtraCond().digiNearBarrier,
                    hidden: true, 
                    value:"-33%"},
                    {name:"Reload Speed",
                    type: [{extraType: this.getExtraTypes().digiCloneReloadSpeed}],
                    conditional: this.getExtraCond().digiNearBarrier,
                    hidden: true,
                    value:"+11%"}]}, this.barrier);
    private allRounder = new ActionMod("assets/images/zane/skills/AllRounder.webp", [2, 3], 1, 10, "green",
                {name:"ALL-ROUNDER",
                description:"Zane's Barrier becomes a dome, covering all sides.",
                effects:[
                    {name:"Cooldown",
                    value:"+20%"}]}, this.barrier);
    private retaliation = new ActionMod("assets/images/zane/skills/Retaliation.webp", [3, -1], 1, 15, "green",
                {name:"RETALIATION",
                description:"Zane and allies near the Barrier gain increased Gun Damage for a few seconds after the Barrier takes damage.",
                effects:[
                    {name:"Gun Damage",
                    type: [{gunDmg: true}],
                    conditionals: [this.getExtraCond().nearBarrier, this.getExtraCond().barrierTookDmg],
                    getActiveValueMultis: [
                        () => {
                            if (this.getExtraCond().barrierTookDmg.active) {
                                return 1;
                            }

                            return 0;
                        },
                        () => {
                            if (this.getExtraCond().nearBarrier.active) {
                                return 1;
                            }

                            return 0;
                        }
                    ],
                    value:"+10%"},
                    {name:"Duration",
                    value:"3 seconds"},
                
                    {name:"Gun Damage",
                    type: [{extraType: this.getExtraTypes().digiCloneGunDmg}],
                    conditionals: [this.getExtraCond().digiNearBarrier, this.getExtraCond().barrierTookDmg],
                    getActiveValueMultis: [
                        () => {
                            if (this.getExtraCond().barrierTookDmg.active) {
                                return 1;
                            }

                            return 0;
                        },
                        () => {
                            if (this.getExtraCond().digiNearBarrier.active) {
                                return 1;
                            }

                            return 0;
                        }
                    ],
                    hidden: true,
                    value:"+10%"},]}, this.barrier);
    private deterranceField = new ActionMod("assets/images/zane/skills/DeterranceField.webp", [3, 3], 1, 15, "green",
                {name:"DETERRENCE FIELD",
                description:"Enemies that touch the Barrier take Shock Damage and are staggered.",
                effects:[
                    {name:"Shock Damage",
                    value:"27"}]}, this.barrier);
   

    private greenSkills = [
        this.barrier,
        this.chargedRelay,
        this.nanitesOrSomeShite,
        this.allRounder,
        this.retaliation,
        this.deterranceField,
        new NormalSkill("assets/images/zane/skills/Adrenaline.webp", [0, 0], 5, 0, "green",
                {name:"ADRENALINE",
                description:"Zane gains increased Action Skill Cooldown Rate. This bonus is based on the amount of shields he has. The more percent full, the greater the bonus.",
                effects:[
                        {name:"Action Skill Cooldown Rate", 
                        type: [{actionSkillCooldown: true}],
                        values:["Up to +7%", "Up to +14%", "Up to +21%" , "Up to +28%", "Up to +35%"]}]}),
        new NormalSkill("assets/images/zane/skills/HeartyStock.webp", [0, 1], 3, 0, "green",
                {name:"EARTY STOCK",
                description:"Zane gains increased Maximum Shield Capacity.",
                effects:[
                        {name:"Max Shields", 
                        type: [{maxShield: true}],
                        values:["+10%", "+20%", "+30%"]}]}),
        new NormalSkill("assets/images/zane/skills/ReadyForAction.webp", [0, 2], 5, 0, "green",
                {name:"READY FOR ACTION",
                description:"Zane gains improved Shield Recharge Rate and Shield Recharge Delay.",
                effects:[
                        {name:"Shield Recharge Rate", 
                        type: [{shieldRechargeRate: true}],
                        values:["+6%", "+12%", "+18%" , "+24%", "+30%"]},
                        {name:"Shield Recharge Delay", 
                        type: [{shieldRegenDelay: true}],
                        values:["-7%", "-14%", "-19%" , "-24%", "-29%"]}]}),
        new NormalSkill("assets/images/zane/skills/BrainFreeze.webp", [1, 0], 5, 5, "green",
                {name:"BRAIN FREEZE",
                description:"Whenever Zane scores a Critical Hit on an enemy, there's a chance they will be Slowed. This effect stacks until the target is Frozen.",
                effects:[
                        {name:"Slow Chance", 
                        values:["+4.0%", "+8.0%", "+12.0%" , "+16.0%", "+20.0%"]}]}),
        new NormalSkill("assets/images/zane/skills/StiffUpperLip.webp", [1, 1], 3, 5, "green",
                {name:"STIFF UPPER LIP",
                description:"Whenever Zane is damaged, he gains Damage Resistance against that damage type.",
                effects:[
                        {name:"Damage Resistance", 
                        values:["+6.0%", "+12.0%", "+16.0%"]}]}),
        new NormalSkill("assets/images/zane/skills/RiseToTheOccasion.webp", [1, 2], 5, 5, "green",
                {name:"RISE TO THE OCCASION",
                description:"Zane gains Health Regeneration. The lower his shield is, the higher the bonus.",
                effects:[
                        {name:"Health Regeneration", 
                        type: [{healthRegen_maxHealth: true}],
                        values:["up to +1.0% of Max Health / sec", 
                                "up to +2.0% of Max Health / sec", 
                                "up to +3.0% of Max Health / sec", 
                                "up to +4.0% of Max Health / sec", 
                                "up to +5.0% of Max Health / sec"]}]}),
        new NormalSkill("assets/images/zane/skills/ConfidentCompetence.webp", [2, 1], 1, 10, "green",
                {name:"CONFIDENT COMPETENCE",
                description:"While Zane's shields are active, he gains increased Gun Damage and Accuracy. " + 
                "This bonus is based on the amount of shields he has. The more percent full, the greater the bonus.",
                effects:[
                        {name:"Gun Damage", 
                        type: [{gunDmg: true}],
                        conditional: this.getConditionals().shieldsActive,
                        value:"up to +20%"},
                        {name:"Accuracy", 
                        type: [{accuracy: true}],
                        conditional: this.getConditionals().shieldsActive,
                        value:"up to +33%"}]}),
        new NormalSkill("assets/images/zane/skills/ReallyExpensiveJacket.webp", [3, 0], 1, 15, "green",
                {name:"REALLY EXPENSIVE JACKET",
                description:"Elemental Status Effects applied to Zane have reduced duration.",
                effects:[
                        {name:"Status Effect Duration",
                        type: [{extraType: this.getExtraTypes().statusEffectDuration}],
                        value:"-50%"}]}),
        new NormalSkill("assets/images/zane/skills/BestServedCold.webp", [3, 1], 5, 15, "green",
                {name:"BEST SERVED COLD",
                description:"Kill Skill. Whenever Zane kills an enemy, they create a Cryo Nova, " + 
                "dealing damage to all nearby enemies. This skill has a short cooldown.",
                effects:[
                        {name:"Damage", 
                        values:[2, 4, 6, 8, 11]},
                        {name:"Cooldown", 
                        value:"3 seconds"}]}),
        new NormalSkill("assets/images/zane/skills/FutilityBelt.webp", [3, 2], 1, 15, "green",
                {name:"FUTILITY BELT",
                description:"Zane gains resistance to non-elemental damage." +
                "Kill Skill. After killing an enemy, all elemental damage Zane takes is converted to non-elemental damage",
                effects:[
                        {name:"Damage Reduction", 
                        type: [{dmgReduction: true}],
                        conditionals: [this.getExtraCond().killSkillBonus, this.getConditionals().activateKillSkills],
                        getActiveValueMultis: [
                            null,
                            () => {
                                return this.getExtraCond().killSkillBonus.effectiveness;
                            }
                        ],
                        value:"+15.0%"},
                        {name:"Duration", 
                        value:"8 seconds"}]}),
        new NormalSkill("assets/images/zane/skills/Refreshment.webp", [4, 0], 3, 20, "green",
                {name:"REFRESHMENT",
                description:"Whenever Zane damages a frozen enemy with his weapon, he gains some of that damage back as health.",
                effects:[
                        {name:"Life Steal", 
                        type: [{lifeSteal: true}],
                        conditional: this.getExtraCond().frozenEnemy,
                        values:["8% of damage dealt", "16% of damage dealt", "24% of damage dealt"]}]}),
        new NormalSkill("assets/images/zane/skills/CalmCoolCollected.webp", [4, 1], 1, 20, "green",
                {name:"CALM, COOL, COLLECTED",
                description:"Whenever Zane Freezes an enemy, his shield instantly begins recharging.<br /><br />" +
                "If Zane's shields are already full, he regenerates health for a few seconds.<br /><br />" +
                "If Zane's health is already full, his Action Skill Cooldowns and Durations are immediately reset.",
                effects:[
                        {name:"Health Regeneration", 
                        type: [{healthRegen_maxHealth: true}],
                        conditionals: [this.getExtraCond().frozeEnemy, this.getExtraCond().shieldsFull],
                        getActiveValueMultis: [
                            () => {
                                if (this.getExtraCond().shieldsFull.active) {
                                    return 1;
                                }

                                return 0;
                            },
                            () => {
                                if (this.getExtraCond().frozeEnemy.active) {
                                    return 1;
                                }

                                return 0;
                            }
                        ],
                        value:"up to 3% max health / sec"},
                        {name:"Regeneration Duration", 
                        value:"3 seconds"}]}),
        new NormalSkill("assets/images/zane/skills/NervesOfSteel.webp", [4, 2], 3, 20, "green",
                {name:"NERVES OF STEEL",
                description:"Zane gains increasing Accuracy and Handling. The longer his shield is full, the greater the bonus.",
                effects:[
                        {name:"Accuracy", 
                        type: [{accuracy: true}],
                        conditional: this.getExtraCond().nervesOfSteelStacks,
                        values:["+2.0% per second", "+4.0% per second", "+6.0% per second"]},
                        {name:"Handling", 
                        type: [{handling: true}],
                        conditional: this.getExtraCond().nervesOfSteelStacks,
                        values:["+2.4% per second", "+4.8% per second", "+7.0% per second"]},
                        {name:"Max Stacks", 
                        type: [{extraType: this.getExtraTypes().maxNervesOfSteelStacks}],
                        value:15}]}),
        new NormalSkill("assets/images/zane/skills/DistributedDenial.webp", [5, 1], 1, 25, "green",
                {name:"DISTRIBUTED DENIAL",
                description:"Zane's Barrier gains the effects of his currently equipped Shield Mod. " + 
                "Additionally, shield effects are applied to all allies near the Barrier. Bonuses to Zane are reduced.",
                effects:[]})
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
        let otherPos = pos == 0 ? 1 : 0; //Other action skill position

        //Check if this mod is already allocated in the other position, and remove it if it is
        if (this.getEquippedSkills()[otherPos].actionSkill == skill) {
            this.removePoint(this.getEquippedSkills()[otherPos].actionSkill);
        }

	    //Check to see if an action mod is allocated already
	    //If there is remove a point from its allocation and remove it from equipped skills
	    if (this.getEquippedSkills()[pos].actionSkill != skill && this.getEquippedSkills()[pos].actionSkill != null)  {
			this.getEquippedSkills()[pos].actionSkill.removePoint();
			this.removePoint(this.getEquippedSkills()[pos].actionSkill);
		

			//remove the action mods that were here if there were any
			if (this.getEquippedSkills()[pos].actionMods[0] != null) {
				this.getEquippedSkills()[pos].actionMods[0].removePoint();
				this.removePoint(this.getEquippedSkills()[pos].actionMods[0]);
            }
            if (this.getEquippedSkills()[pos].actionMods[1] != null) {
				this.getEquippedSkills()[pos].actionMods[1].removePoint();
				this.removePoint(this.getEquippedSkills()[pos].actionMods[1]);
            }
        } 

	    //Add action skill to equipped skills
	    this.getEquippedSkills()[pos].actionSkill = skill;
	} 

	//Action Mod
	if (skill instanceof ActionMod) {
        let actionSkillPos = this.getEquippedSkills()[0].actionSkill == skill.getRequiredActionSkill() ? 0 : 1;
        let otherPos = pos == 0 ? 1 : 0; //Other action mods position
        
        //Check if this mod is already allocated in the other position, and remove it if it is
        if (this.getEquippedSkills()[actionSkillPos].actionMods[otherPos] == skill) {
            this.removePoint(this.getEquippedSkills()[actionSkillPos].actionMods[otherPos]);
        }
        
        //If a skill exists in this position, remove it from the equipped skills and remove a point from its allocation
        if (this.getEquippedSkills()[actionSkillPos].actionMods[pos] != skill && this.getEquippedSkills()[actionSkillPos].actionMods[pos] != null)  {
            this.getEquippedSkills()[actionSkillPos].actionMods[pos].removePoint();
            this.removePoint(this.getEquippedSkills()[actionSkillPos].actionMods[pos]);
        } 

        //Add mod to equipped skill in the specified position
        this.getEquippedSkills()[actionSkillPos].actionMods[pos] = skill;
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

        //remove first instance of action skill from equipped skills
        if (skill instanceof ActionSkill)  {
            var index: number = this.getEquippedSkills()[0].actionSkill == skill ? 0 : 1;
            this.getEquippedSkills()[index].actionSkill = null;
            
            //remove the action mods that were here if there were any
            if (this.getEquippedSkills()[index].actionMods[0] != null) {
                this.getEquippedSkills()[index].actionMods[0].removePoint();
                this.removePoint(this.getEquippedSkills()[index].actionMods[0]);
            }
            if (this.getEquippedSkills()[index].actionMods[1] != null) {
                this.getEquippedSkills()[index].actionMods[1].removePoint();
                this.removePoint(this.getEquippedSkills()[index].actionMods[1]);
            }
        } 

        //Remove action mod from equipped skills action mod array
        if (skill instanceof ActionMod) {
            let actionSkillPos: number;
            var actionModPos: number;
            
            if (this.getEquippedSkills()[0].actionMods[0] == skill) {
                actionSkillPos = 0;
                actionModPos = 0;
            } else if (this.getEquippedSkills()[1].actionMods[0] == skill) {
                actionSkillPos = 1;
                actionModPos = 0;
            } else if (this.getEquippedSkills()[0].actionMods[1] == skill) {
                actionSkillPos = 0;
                actionModPos = 1;
            } else {
                actionSkillPos = 1;
                actionModPos = 1;
            }

            this.getEquippedSkills()[actionSkillPos].actionMods[actionModPos] = null;
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
    
      /**
     * Returns blue tree name
     * 
     * @returns
     *          string
     */
    getBlueTreeName(): string {
        return this.BLUE_TREE_NAME;
      }
  
      /**
       * Returns red tree name
       * 
       * @returns
       *          string
       */
      getRedTreeName(): string {
        return this.RED_TREE_NAME;
      }
  
      /**
       * Returns green tree name
       * 
       * @returns
       *          string
       */
      getGreenTreeName(): string {
        return this.GREEN_TREE_NAME;
      }
  
      /**
       * Returns blue tree header image path
       * 
       * @returns
       *          string
       */
      getBlueTreeHeader(): string {
        return this.BLUE_TREE_HEADER;
      }
  
      /**
       * Returns red tree header image path
       * 
       * @returns
       *          string
       */
      getRedTreeHeader(): string {
        return this.RED_TREE_HEADER;
      }
  
      /**
       * Returns green tree header image path
       * 
       * @returns
       *          string
       */
      getGreenTreeHeader(): string {
        return this.GREEN_TREE_HEADER;
      }
}
