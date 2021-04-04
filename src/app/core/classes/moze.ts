import { Skill } from './skill';
import { NormalSkill } from './normalskill';
import { OtherSkill } from './otherskill';
import { ActionSkill } from './actionskill';
import { ActionMod } from './actionmod';
import { Character } from './character';

export class Moze extends Character {

    //Path for red tree header image
    public readonly RED_TREE_HEADER: string = "assets/images/moze/RedTreeHeader.png";
    public readonly RED_TREE_NAME: string = "Shield Of Retribution";

    //Path for blue tree header image
    public readonly BLUE_TREE_HEADER: string = "assets/images/moze/BlueTreeHeader.png";
    public readonly BLUE_TREE_NAME: string = "Bottomless Mags";

    //Path for green tree header image
    public readonly GREEN_TREE_HEADER: string = "assets/images/moze/GreenTreeHeader.png";
    public readonly GREEN_TREE_NAME: string = "Demolition Woman";

    private extraConditionals = { 
		v35DirectHit: {
			active: false,
			header: "Is the V-35 shot a direct hit?"
		},
		drowningInBrassStacks: {
			active: false,
            header: "Using Drowning In Brass Stacks?",
            requiresNumberField: true,
            currentValue: 0,
            maxValue: 0,
		},
		phalanxDoctrineStacks: {
			active: false,
            header: "Using Phalanx Doctrine Stacks?",
            requiresNumberField: true,
            currentValue: 0,
            maxValue: 0,
		},
		matchedSetStacks: {
			active: false,
            header: "Using Matched Set Stacks?",
            requiresNumberField: true,
            currentValue: 0,
            maxValue: 0,
		}
    };

    private extraTypes = {
		bearFistFuelDrain: {
			type: "offense",
			header: "Bear Fist Fuel Drain",
			value: 0,
			valueType: "percent",
			setFunc: (fuelDrain: number) => {
				this.getExtraTypes().bearFistFuelDrain.value += fuelDrain;
			}
		},
		bearFistBonusEleDmg: {
			type: "offense",
			header: "Bear Fist Bonus Elemental Damage",
			value: 0,
			valueType: "percent",
			setFunc: (bonusEleDmg: number) => {
				this.getExtraTypes().bearFistBonusEleDmg.value += bonusEleDmg;
			}
		},
		bearFistBonusShockDmg: {
			type: "offense",
			header: "Bear Fist Bonus Shock Damage",
			value: 0,
			valueType: "percent",
			setFunc: (bonusShockDmg: number) => {
				this.getExtraTypes().bearFistBonusShockDmg.value += bonusShockDmg;
			}
		},
		railGunFuelDrain: {
			type: "utility",
			header: "Rail Gun Fuel Drain",
			value: 0,
			valueType: "percent",
			setFunc: (fuelDrain: number) => {
				this.getExtraTypes().railGunFuelDrain.value += fuelDrain;
			}
		},
		railGunDmg: {
			type: "offense",
			header: "Rail Gun Damage",
			value: 0,
			valueType: "percent",
			setFunc: (damage: number) => {
				this.getExtraTypes().railGunDmg.value += damage;
			}
		},
		v35Dmg: {
			type: "offense",
			header: "V-35 Damage",
			value: 0,
			valueType: "percent",
			setFunc: (damage: number) => {
				this.getExtraTypes().v35Dmg.value += damage;
			}
		},
		v35ReloadSpeed: {
			type: "offense",
			header: "V-35 Reload Speed",
			value: 0,
			valueType: "percent",
			setFunc: (reloadSpeed: number) => {
				this.getExtraTypes().v35ReloadSpeed.value += reloadSpeed;
			}
		},
		vanquisherDamage: {
			type: "offense",
			header: "Vanquisher Damage",
			value: 0,
			valueType: "percent",
			setFunc: (damage: number) => {
				this.getExtraTypes().vanquisherDamage.value += damage;
			}
		},
		vanquisherReloadSpeed: {
			type: "offense",
			header: "Vanquisher Reload Speed",
			value: 0,
			valueType: "percent",
			setFunc: (reloadSpeed: number) => {
				this.getExtraTypes().vanquisherReloadSpeed.value += reloadSpeed;
			}
		},
		minigunDmg: {
			type: "offense",
			header: "Minigun Damage",
			value: 0,
			valueType: "percent",
			setFunc: (damage: number) => {
				this.getExtraTypes().minigunDmg.value += damage;
			}
		},
		minigunHeatCap: {
			type: "utility",
			header: "Minigun Heat Capacity",
			value: 0,
			valueType: "percent",
			setFunc: (heatCapacity: number) => {
				this.getExtraTypes().minigunHeatCap.value += heatCapacity;
			}
		},
		minigunFuelDrain: {
			type: "utility",
			header: "Minigun Fuel Drain",
			value: 0,
			valueType: "percent",
			setFunc: (fuelDrain: number) => {
				this.getExtraTypes().minigunFuelDrain.value += fuelDrain;
			}
		},
		minigunFireRate: {
			type: "offense",
			header: "Minigun Fire Rate",
			value: 0,
			valueType: "percent",
			setFunc: (fireRate: number) => {
				this.getExtraTypes().minigunFireRate.value += fireRate;
			}
		},
		salamanderFuelDrain: {
			type: "utility",
			header: "Salamander Fuel Drain",
			value: 0,
			valueType: "percent",
			setFunc: (fuelDrain: number) => {
				this.getExtraTypes().salamanderFuelDrain.value += fuelDrain;
			}
		},
		salamanderMeltDmg: {
			type: "offense",
			header: "Salamander Melt Damage",
			value: 0,
			valueType: "percent",
			setFunc: (meltDamage: number) => {
				this.getExtraTypes().salamanderMeltDmg.value += meltDamage;
			}
		},
		ironBearFuelDrain: {
			type: "utility",
			header: "Iron Bear Fuel Drain",
			value: 0,
			valueType: "percent",
			setFunc: (fuelDrain: number) => {
				this.getExtraTypes().ironBearFuelDrain.value += fuelDrain;
			}
		},
		ironBearArmor: {
			type: "defense",
			header: "Iron Bear Armor",
			value: 0,
			valueType: "percent",
			setFunc: (armor: number) => {
				this.getExtraTypes().ironBearArmor.value += armor;
			}
		},
		ironBearMaxFuel: {
			type: "utility",
			header: "Iron Bear Max Fuel",
			value: 0,
			valueType: "percent",
			setFunc: (maxFuel: number) => {
				this.getExtraTypes().ironBearMaxFuel.value += maxFuel;
			}
		},
		ironBearMovementSpeed: {
			type: "utility",
			header: "Iron Bear Movement Speed",
			value: 0,
			valueType: "percent",
			setFunc: (movementSpeed: number) => {
				this.getExtraTypes().ironBearMovementSpeed.value += movementSpeed;
			}
		}, 
		ironBearDmg: {
			header: "Iron Bear Damage",
			value: 0,
			valueType: "percent",
			setFunc: (dmg: number) => {
				this.getExtraTypes().ironBearDmg.value += dmg;
			}
		},
		maxDrowningBrassStacks: {
            header: "Max Drowning In Brass Stacks",
            value: 0,
            valueType: "flat",
            setFunc: (stackSize: number) => {
              this.getExtraTypes().maxDrowningBrassStacks.value += stackSize;
              this.getExtraCond().drowningInBrassStacks.maxValue += stackSize; 
            }
		},
		maxPhalanxDoctrineStacks: {
			header: "Max Phalanx Doctrine Stacks",
            value: 0,
            valueType: "flat",
            setFunc: (stackSize: number) => {
              this.getExtraTypes().maxPhalanxDoctrineStacks.value += stackSize;
              this.getExtraCond().phalanxDoctrineStacks.maxValue += stackSize; 
            }
		},
		maxMatchedSetStacks: {
			header: "Max Matched Set Stacks",
            value: 0,
            valueType: "flat",
            setFunc: (stackSize: number) => {
              this.getExtraTypes().maxMatchedSetStacks.value += stackSize;
              this.getExtraCond().matchedSetStacks.maxValue += stackSize; 
            }
		}
    };

    
    //Skills for red skill tree

    //Action Skills
    private railGun = new ActionSkill("assets/images/moze/skills/RailGun.png", [-1, 1], 2, 0, "red", 
				{name:"RAILGUN",
				description:"The Railgun fires electrified high-velocity projectiles that deal Shock Damage.",
				effects:[]});
    private bearFist = new ActionSkill("assets/images/moze/skills/BearFist.png", [1, 3], 2, 5, "red", 
				{name:"BEAR FIST",
				description:"The Bear Fist is a pneumatic-driven fist that deals massive damage to a single target at close range.",
				effects:[]});

    //Action Mods
    private hellOnRails = new ActionMod("assets/images/moze/skills/HellOnRails.png", [1, -1], 2, 5, "red", 
				{name:"HELL ON RAILS",
				description:"Railgun now fires superheated rounds that deal Incendiary Damage, but have increased Fuel Drain per shot.",
				effects:[
					{name:"Converts to Incendiary Damage"}, 
					{name:"Fuel Drain",
					type: [{extraType: this.getExtraTypes().railGunFuelDrain}],
					value:"+30%"}]}, this.railGun);
    private capacitiveArmature = new ActionMod("assets/images/moze/skills/CapacitiveArmature.png", [2, -1], 2, 10, "red", 
				{name:"CAPACITIVE ARMATURE",
				description:"When Railgun hits an enemy, it chains to nearby enemies, dealing reduced Shock Damage to more targets.",
				effects:[
					{name:"Splinter Damage",
					value:"-75%"}]}, this.railGun);
    private wildSwing = new ActionMod("assets/images/moze/skills/WildSwing.png", [2, 3], 2, 10, "red", 
				{name:"WILD SWING",
				description:"Whenever Bear Fist hits an enemy, it deals random bonus Elemental Damage to that enemy and all enemies nearby.",
				effects:[
					{name:"Elemental Damage",
					type: [{extraType: this.getExtraTypes().bearFistBonusEleDmg}],
					value:"+35% of damage dealt"}]}, this.bearFist);
    private corrosiveSabotRound = new ActionMod("assets/images/moze/skills/CorrosiveSabotRound.png", [3, -1], 2, 15, "red", 
				{name:"CORROSIVE SABOT ROUND",
				description:"Railgun now fires a specialty round that deals reduced damage and explodes after a short delay.<br /><br />" +
				"Railgun shots have reduced Fuel Drain and the Magazine Size is increased.",
				effects:[
					{name:"Railgun Damage",
					type: [{extraType: this.getExtraTypes().railGunDmg}],
					value:"-50%"},
					{name:"Fuel Drain",
					type: [{extraType: this.getExtraTypes().railGunFuelDrain}],
					value:"-50%"},
					{name:"Magazine Size",
					value:"+2"},
					{name:"Converts to Corrosive Damage"}]}, this.railGun);
    private closeTheDistance = new ActionMod("assets/images/moze/skills/CloseTheDistance.png", [3, 3], 2, 15, "red", 
				{name:"CLOSE THE DISTANCE",
				description:"Instead of punching, Bear Fist now launches its fist forward and grabs enemies  " + 
				"at greatly increased range, dealing Shock Damage and pulling them back to Iron Bear.",
				effects:[]}, this.bearFist);
    private shockHammer = new ActionMod("assets/images/moze/skills/ShockHammer.png", [4, 3], 2, 20, "red", 
				{name:"SHOCKHAMMER",
				description:"Bear Fist is now capable of sustained rapid fire punching.<br /><br />" +
				"Additionally, Bear Fist has reduced Fuel Drain and deals Bonus Shock Damage with each hit.",
				effects:[
					{name:"Shock Damage",
					type: [{extraType: this.getExtraTypes().bearFistBonusShockDmg}],
					value:"+19% of damage dealt"},
					{name:"Fuel Drain",
					type: [{extraType: this.getExtraTypes().bearFistFuelDrain}],
					value:"-40%"}]}, this.bearFist);

    
    private redSkills = [
	this.railGun,
	this.bearFist,
	this.hellOnRails,
	this.capacitiveArmature,
	this.wildSwing,
	this.corrosiveSabotRound,
	this.closeTheDistance,
	this.shockHammer,
	new NormalSkill("assets/images/moze/skills/SelflessVengeance.png", [0, 0], 5, 0, "red", 
				{name:"SELFLESS VENGEANCE",
				description:"Whenever Moze reloads, she loses a small portion of her health " + 
				"and grants additional Incendiary Damage to her and her allies' rounds for a few seconds.",
				effects:[
					{name:"Current Health Removed",
					values:["+1.0%", "+2.0%", "+3.0%", "+4.0%", "+5.0%"]},
					{name:"Bonus Incendiary Damage",
					conditional: this.getConditionals().reloaded,
					type: [{bonusIncendiaryDmg: true}],
					values:["+3.0% of gun damage dealt", 
					"+6.0% of gun damage dealt",
					"+9.0% of gun damage dealt", 
					"+12.0% of gun damage dealt", 
					"+15.0% of gun damage dealt"]},
					{name:"Selfless Vengeance Duration",
					value:"5 sec"}]}),
	new NormalSkill("assets/images/moze/skills/SecurityBear.png", [0, 1], 1, 0, "red", 
				{name:"SECURITY BEAR",
				description:"Iron Bear gains a bubble shield that reduces damage taken.<br /><br />" +
				"The shield deactivates if it sustains too much damage, reactivating after a short cooldown.",
				effects:[
					{name:"20% Iron Bear Max Health added as Shields"},
					{name:"Bubble Recharge Delay",
					value:"5 sec"}]}),
	new NormalSkill("assets/images/moze/skills/ArmoredInfantry.png", [0, 2], 5, 0, "red", 
				{name:"ARMORED INFANTRY",
				description:"While Moze's shields are active, she gains Damage Reduction and increased Gun Damage.",
				effects:[
					{name:"Damage Reduction",
					conditional: this.getConditionals().shieldsActive,
					type: [{dmgReduction: true}],
					values:["+3.0%", "+6.0%", "+8.0%", "+11.0%", "+13.0%"]},
					{name:"Gun Damage",
					conditional: this.getConditionals().shieldsActive,
					type: [{gunDmg: true}],
					values:["+3.0%",  "+6.0%", "+9.0%", "+12.0%", "+15.0%"]}]}),
	new NormalSkill("assets/images/moze/skills/DrowningInBrass.png", [1, 0], 5, 5, "red", 
				{name:"DROWNING IN BRASS",
				description:"Kill Skill. Killing an enemy grants Moze a stack of Drowning in Brass.<br /><br />" +
				"For each stack of Drowning in Brass, Moze's Fire Rate is reduced, but Gun Damage " + 
				"is increased for both her and her allies.",
				effects:[ 
					{name:"Moze Fire Rate", 
					type: [{fireRate: true}],
					conditional: this.getExtraCond().drowningInBrassStacks,
					getActiveValueMulti: () => {
						return this.getExtraCond().drowningInBrassStacks.currentValue;
					},
					values:["-0.5% per stack", "-1.0% per stack", "-1.5% per stack", "-2.0% per stack", "-2.5% per stack"]},
					{name:"Gun Damage",
					type: [{gunDmg: true}],
					conditional: this.getExtraCond().drowningInBrassStacks,
					getActiveValueMulti: () => {
						return this.getExtraCond().drowningInBrassStacks.currentValue;
					},
					values:["+4.0% per stack",  "+8.0% per stack", "+12.0% per stack", "+16.0% per stack", "+20.0% per stack"]},
					{name:"Max Drowning In Brass Stacks",
					type: [{extraType: this.getExtraTypes().maxDrowningBrassStacks}],
					value:"3"},
					{name:"Drowning In Brass Duration",
					value:"15 seconds"}]}),
	new NormalSkill("assets/images/moze/skills/ThinRedLine.png", [1, 1], 3, 5, "red", 
				{name:"THIN RED LINE",
				description:"A portion of Moze's health is Reserved and cannot be restored, but her Maximum Shield is increased by the same amount.",
				effects:[
					{names: ["+20% Max Health Reserved and Added to Max Shields",
							"+40% Max Health Reserved and Added to Max Shields",
							"+60% Max Health Reserved and Added to Max Shields"]}]}),
	new NormalSkill("assets/images/moze/skills/VladofIngenuity.png", [1, 2], 5, 5, "red", 
				{name:"VLADOF INGENUITY",
				description:"Moze's Maximum Shield is increased, and she gains resistance to Shock Damage.",
				effects:[
					{name:"Shock Damage Resistance",
					type: [{shockDmgResist: true}],
					values:["+15.0%", "+26.0%", "+35.0%", "+42.0%", "+47.0%"]},
					{name:"Max Shield",
					type: [{maxShield: true}],
					values:["+6.0%",  "+12.0%", "+18.0%", "+24.0%", "+30.0%"]}]}),
	new NormalSkill("assets/images/moze/skills/FullCanOfWhoop-Ass.png", [2, 0], 1, 10, "red", 
				{name:"FULL CAN OF WHOOP-ASS",
				description:"Entering Iron Bear causes Moze's and her allies' shields to immediately " + 
				"begin recharging at an increased Shield Recharge Rate.",
				effects:[
					{name:"Shield Recharge Rate",
					conditional: this.getConditionals().usedActionSkill,
					type: [{shieldRechargeRate: true}],
					value:"+25.0%"}]}),
	new NormalSkill("assets/images/moze/skills/ExperimentalMunitions.png", [2, 1], 1, 10, "red", 
				{name:"EXPERIMENTAL MUNITIONS ",
				description:"Whenever Moze scores a Critical Hit, she deals bonus Incendiary Damage.",
				effects:[
					{name:"Bonus Incendiary Damage",
					conditional: this.getConditionals().critHit,
					type: [{bonusIncendiaryDmg: true}],
					value:"+10% of Damage Dealt"}]}),
	new NormalSkill("assets/images/moze/skills/BehindTheIronCurtain.png", [3, 0], 3, 15, "red", 
				{name:"BEHIND THE IRON CURTAIN",
				description:"Moze's Shield Recharge Delay is reduced, and her Shield Recharge Rate is increased.",
				effects:[
					{name:"Shield Recharge Rate",
					type: [{shieldRechargeRate: true}],
					values:["+7%", "+14%", "+21%"]},
					{name:"Shield Recharge Delay",
					type: [{shieldRegenDelay: true}],
					values:["-7.0%", "-14.0%", "-19.0%"]}]}),
	new NormalSkill("assets/images/moze/skills/DesperateMeasures.png", [3, 2], 3, 15, "red", 
				{name:"DESPERATE MEASURES",
				description:"Moze's Gun Damage and Iron Bear's Hard Point Damage is increased depending on how low her health is. The lower her health, the greater the increase.",
				effects:[
					{name:"Gun Damage",
					type: [{gunDmg: true, extraType: this.getExtraTypes().ironBearDmg}],
					values:["up to +17%", "up to +33%", "up to +50%"]}]}),
	new NormalSkill("assets/images/moze/skills/PhalanxDoctrine.png", [4, 0], 5, 20, "red", 
				{name:"PHALANX DOCTRINE",
				description:"Kill Skill. After killing an enemy, Moze gains a stack of Phalanx Doctrine. For every stack of Phalanx " + 
				"Doctrine, Moze's Maximum Shield and Gun Damage are increased. Each stack lasts 30 seconds.",
				effects:[ 
					{name:"Max Shields", 
					type: [{maxShield: true}],
					conditional: this.getExtraCond().phalanxDoctrineStacks,
					getActiveValueMulti: () => {
						return this.getExtraCond().phalanxDoctrineStacks.currentValue;
					},
					values:["+3.0% per stack", "+6.0% per stack", "+9.0% per stack", "+12.0% per stack", "+15.0% per stack"]},
					{name:"Gun Damage",
					type: [{gunDmg: true}],
					conditional: this.getExtraCond().phalanxDoctrineStacks,
					getActiveValueMulti: () => {
						return this.getExtraCond().phalanxDoctrineStacks.currentValue;
					},
					values:["+2.0% per stack",  "+4.0% per stack", "+6.0% per stack", "+8.0% per stack", "+10.0% per stack"]},
					{name:"Phalanx Doctrine Duration",
					value:"30 seconds"},
					{name:"Max Phalanx Doctrine Stacks",
					type: [{extraType: this.getExtraTypes().maxPhalanxDoctrineStacks}],
					hidden: true,
					value:"999"}]}),
	new NormalSkill("assets/images/moze/skills/ForceFeedback.png", [4, 1], 1, 20, "red", 
				{name:"FORCE FEEDBACK",
				description:"Whenever Moze scores a Critical Kill, her shields immediately begin recharging.",
				effects:[]}),
	new NormalSkill("assets/images/moze/skills/TenaciousDefense.png", [5, 1], 1, 25, "red", 
				{name:"TENACIOUS DEFENSE",
				description:"Whenever Moze's shield is fully depleted, she instantly restores a portion " + 
				"of her shield, and her Gun Damage is increased for a short time.<br /><br />" +
				"This skill can only trigger after Moze's shields have fully recharged.",
				effects:[
					{name:"Restores",
					value:"+40% of Max Shield"},
					{name:"Tenacious Defense Duration",
					value:"30 seconds"},
					{name:"Gun Damage",
					conditional: this.getConditionals().shieldFullyDepleted,
					type: [{gunDmg: true}],
					value:"+30%"}]})
    ];

    //Skills for blue skill tree

    //Action Skills
    private v35GrenadeLauncher = new ActionSkill("assets/images/moze/skills/V_35.png", [-1, 1], 2, 0, "blue", 
				{name:"V-35 GRENADE LAUNCHER",
				description:"The V-35 is a semi-automatic grenade launcher. Its grenades are not affected by Moze’s equipped grenade mod.",
				effects:[]});
    private vanquisherRocketPod = new ActionSkill("assets/images/moze/skills/VanquisherRocketPod.png", [1, 3], 2, 5, "blue", 
				{name:"VANQUISHER ROCKET POD",
				description:"The Vanquisher Rocket Pod is a rocket launcher capable of rapid-firing volleys of unguided explosive rockets.",
				effects:[]});
    

    //Action Mods
    private shapedCharge = new ActionMod("assets/images/moze/skills/ShapedCharge.png", [1, -1], 2, 5, "blue", 
				{name:"SHAPED CHARGE",
				description:"Direct hits with the V-35 deal increased damage.",
				effects:[
					{name:"Direct Hit Damage",
					type: [{extraType: this.getExtraTypes().v35Dmg}],
					conditional: this.getExtraCond().v35DirectHit,
					value:"+35%"}]}, this.v35GrenadeLauncher);
    private musicalChairs = new ActionMod("assets/images/moze/skills/MusicalChairs.png", [2, -1], 2, 10, "blue", 
				{name:"MUSICAL CHAIRS",
				description:"Occasionally, the V-35 fires a Singularity Grenade that pulls in nearby enemies before exploding.",
				effects:[
					{name:"Singularity",
					value:"Every 7th grenade"}]}, this.v35GrenadeLauncher);
    private activeTracking = new ActionMod("assets/images/moze/skills/ActiveTracking.png", [2, 3], 2, 10, "blue", 
				{name:"ACTIVE TRACKING",
				description:"The Vanquisher Rocket Pod now fires homing rockets and has increased Reload Speed. Hold down F " + 
				"and aim at enemies to designate up to 6 targets. Releasing Fire Button launches a volley of homing rockets at the designated targets.",
				effects:[
					{name:"Reload Speed",
					type: [{extraType: this.getExtraTypes().vanquisherReloadSpeed}],
					value:"+25%"}]}, this.vanquisherRocketPod);
    private lockAndSpeedLoad = new ActionMod("assets/images/moze/skills/LockAndSpeedLoad.png", [3, -1], 2, 15, "blue", 
				{name:"LOCK AND SPEEDLOAD",
				description:"The V-35’s Reload Speed is greatly increased and it now fires a 5-round burst.",
				effects:[
					{name:"Reload Speed",
					type: [{extraType: this.getExtraTypes().v35ReloadSpeed}],
					value:"+25%"}]}, this.v35GrenadeLauncher);
    private targetSoftening = new ActionMod("assets/images/moze/skills/TargetSoftening.png", [3, 3], 2, 15, "blue", 
				{name:"TARGET SOFTENING",
				description:"The Vanquisher Rocket Pod deals greatly reduced damage per rocket, but fires in a " + 
				"6-rocket spread. Additionally, enemies hit by Vanquisher Rocket Pod rockets take increased damage from all sources.",
				effects:[
					{name:"Enemy Damage Taken",
					value:"+15%"},
					{name:"Damage",
					type: [{extraType: this.getExtraTypes().vanquisherDamage}],
					value:"-74%"}]}, this.vanquisherRocketPod);
    private hammerdownProtocol = new ActionMod("assets/images/moze/skills/HammerdownProtocol.png", [4, 3], 2, 20, "blue", 
				{name:"HAMMERDOWN PROTOCOL",
				description:"Instead of a volley of conventional rockets, the Vanquisher Rocket Pod launches a single " + 
				"rocket with a nuclear warhead, dealing massive Radiation Damage.",
				effects:[
					{name:"Damage",
					type: [{extraType: this.getExtraTypes().vanquisherDamage}],
					value:"+380%"},
					{name:"Magazine Size",
					value:"1"}]}, this.vanquisherRocketPod);
    

    private blueSkills = [ 
	this.v35GrenadeLauncher,
	this.vanquisherRocketPod,
	this.shapedCharge,
	this.musicalChairs,
	this.activeTracking,
	this.lockAndSpeedLoad,
	this.targetSoftening,
	this.hammerdownProtocol,
	new NormalSkill("assets/images/moze/skills/FireInTheSkagDen.png", [0, 0], 5, 0, "blue", 
				{name:"FIRE IN THE SKAG DEN",
				description:"Whenever Moze deals Splash Damage, she deals bonus Incendiary Damage.",
				effects:[
					{name:"Bonus Incendiary Damage",
					conditional: this.getConditionals().splashDmgHit,
					type: [{bonusIncendiaryDmg: true}],
					values:["+3%", "+6%", "+9%", "+12%", "+15%"]}]}),
	new NormalSkill("assets/images/moze/skills/Deadlines.png", [0, 1], 3, 0, "blue", 
				{name:"DEADLINES",
				description:"Firing Iron Bear Weapons drains less Fuel.<br /><br />" +
				"Killing an enemy while Iron Bear is active increases Fuel. This skill has diminishing returns.",
				effects:[
					{name:"Fuel Drain",
					type: [{extraType: this.getExtraTypes().ironBearFuelDrain}],
					values:["-12.0%", "-22.0%", "-30.0%"]},
					{name:"Fuel Returned",
					values:["Up to 2.0%", "Up to 4.0%", "Up to 6.0%"]}]}),
	new NormalSkill("assets/images/moze/skills/Grizzled.png", [0, 2], 5, 0, "blue", 
				{name:"GRIZZLED",
				description:"Kill Skill. Killing an enemy reduces Moze's remaining Action Skill Cooldown Time. This skill has diminishing returns.",
				effects:[
					{name:"Iron Bear Cooldown Time",
					values:["-1 seconds", "-2 seconds", "-3 seconds", "-4 seconds", "-5 seconds"]}]}),
	new NormalSkill("assets/images/moze/skills/MeansOfDestruction.png", [1, 0], 3, 5, "blue", 
				{name:"MEANS OF DESTRUCTION",
				description:"Whenever Moze deals Splash Damage, there is a chance to add ammo " + 
				"to her currently equipped weapon's magazine, with a smaller chance to return a grenade.",
				effects:[
					{name:"Ammo Chance",
					values:["+3.3%", "+6.7%", "+10.0%"]},
					{name:"Grenade Chance",
					values:["+2.0%", "+4.0%", "+6.0%"]}]}),
	new NormalSkill("assets/images/moze/skills/TorgueCrossPromotion.png", [1, 1], 5, 5, "blue", 
				{name:"TORGUE CROSS-PROMOTION",
				description:"All Splash Damage dealt by Moze has a chance to double in size.",
				effects:[
					{names: ["+3% chance to double Splash Damage Radius",
							"+6% chance to double Splash Damage Radius",
							"+9% chance to double Splash Damage Radius",
							"+12% chance to double Splash Damage Radius",
							"+15% chance to double Splash Damage Radius"]}]}),
	new NormalSkill("assets/images/moze/skills/StainlessStealBear.png", [1, 2], 5, 5, "blue", 
				{name:"STAINLESS STEEL BEAR",
				description:"Iron Bear gains additional armor and increased Maximum Fuel.",
				effects:[
					{name:"Iron Bear Armor",
					type: [{extraType: this.getExtraTypes().ironBearArmor}],
					values:["+6%", "+12%", "+18%", "+24%", "+30%"]},
					{name:"Maximum Fuel",
					type: [{extraType: this.getExtraTypes().ironBearMaxFuel}],
					values:["+4.0%", "+8.0%", "+12.0%", "+16.0%", "+20.0%"]}]}),
	new NormalSkill("assets/images/moze/skills/PullTheHolyPin.png", [2, 0], 3, 10, "blue", 
				{name:"PULL THE HOLY PIN",
				description:"Moze's grenades have a chance to score a Critical Hit, dealing " + 
				"greatly increased damage. Sources of Critical Hit Damage do not affect grenade Critical Hits.",
				effects:[
					{name:"Critical Hit Chance",
					values:["+10%", "+20%", "+30%"]}]}),
	new NormalSkill("assets/images/moze/skills/AutoBear.png", [2, 1], 1, 10, "blue", 
				{name:"AUTO BEAR",
				description:"After Moze exits Iron Bear, it will remain deployed in place for a short time.<br /><br />" +
				"While Auto Bear remains active, it will target and attack nearby enemies until its duration ends, " + 
				"then it will charge at an enemy and self-destruct.",
				effects:[
					{name:"Auto Bear Duration",
					value:"15 seconds"}]}),
	new NormalSkill("assets/images/moze/skills/Vampyr.png", [3, 0], 5, 15, "blue", 
				{name:"VAMPYR",
				description:"Whenever Moze damages an enemy with a thrown grenade or Iron Bear deals area damage, for every enemy " + 
				"hit, she restores a portion of their missing health. Iron Bear receives half this bonus",
				effects:[
					{names: ["Restores +4% of missing health per enemy hit",
							"Restores +8% of missing health per enemy hit",
							"Restores +12% of missing health per enemy hit",
							"Restores +16% of missing health per enemy hit",
							"Restores +20% of missing health per enemy hit"]}]}),
	new NormalSkill("assets/images/moze/skills/WCICATG.png", [3, 2], 3, 15, "blue", 
				{name:"WHY CAN'T I CARRY ALL THESE GRENADES?",
				description:"Increases Moze's grenade carrying capacity.",
				effects:[
					{name:"Grenade Capacity",
					values:["+1", "+2", "+3"]}]}),
	new NormalSkill("assets/images/moze/skills/ToTheLast.png", [4, 0], 1, 20, "blue", 
				{name:"TO THE LAST",
				description:"Moze gains the ability to throw grenades while in Fight For " + 
				"Your Life. If she threw a grenade before gaining Second Wind, a grenade is refunded.",
				effects:[]}),
	new NormalSkill("assets/images/moze/skills/ExplosivePunctuation.png", [4, 1], 5, 20, "blue", 
				{name:"EXPLOSIVE PUNCTUATION",
				description:"When Moze deals Splash Damage, her Action Skill Cooldown Rate is briefly increased.",
				effects:[
					{name:"Action Skill Cooldown Rate",
					type: [{actionSkillCooldown: true}],
					conditional: this.getConditionals().dealtSplashDmg,
					values:["+5.0%", "+10.0%", "+15.0%", "+20.0%", "+25.0%"]}]}),
	new NormalSkill("assets/images/moze/skills/ShortFuse.png", [5, 1], 1, 25, "blue", 
				{name:"SHORT FUSE",
				description:"Whenever Moze deals Gun Damage, there is a chance of a secondary explosion centered on the target.",
				effects:[
					{name:"Secondary Explosion Chance",
					value:"20%"},
					{name:"Secondary Explosion Damage",
					value:"75% of Gun Damage"}]})
    ];

    //Skills for green skill tree

    //Action Skills
    private miniGun = new ActionSkill("assets/images/moze/skills/MiniGun.png", [-1, 1], 2, 0, "green", 
				{name:"MINIGUN",
				description:"The Minigun is capable of sustained rapid fire. Firing for long periods " + 
				"causes the Minigun to overheat, rendering it inoperable for a few seconds.",
				effects:[]});
    private salamander = new ActionSkill("assets/images/moze/skills/Salamander.png", [1, 3], 2, 5, "green", 
				{name:"SALAMANDER",
				description:"The Salamander is a flamethrower that deals Incendiary Damage to enemies at close range.<br /><br />" +
				"Though the Salamander has infinite ammo, it drains Fuel with use.",
				effects:[]});
    

    //Action Mods
    private letOffSomeSteam = new ActionMod("assets/images/moze/skills/LetOffSomeSteam.png", [1, -1], 2, 5, "green", 
				{name:"LET OFF SOME STEAM",
				description:"Minigun deals more damage as heat increases, and can be fired for longer before overheating.",
				effects:[
					{name:"Damage",
					type: [{extraType: this.getExtraTypes().minigunDmg}],
					value:"Up to +80%"},
					{name:"Minigun Heat Capacity",
					type: [{extraType: this.getExtraTypes().minigunHeatCap}],
					value:"+35%"}]}, this.miniGun);
    private generalWinter = new ActionMod("assets/images/moze/skills/GeneralWinter.png", [2, -1], 2, 10, "green", 
				{name:"GENERAL WINTER",
				description:"",
				effects:[
					{name:"Converts to Cryo Damage"},
					{name:"Fuel Drain",
					type: [{extraType: this.getExtraTypes().minigunFuelDrain}],
					value:"-40%"},
					{name:"Minigun Damage",
					type: [{extraType: this.getExtraTypes().minigunDmg}],
					value:"-30%"},
					{name:"Cryo Efficiency",
					value:"+20%"}]}, this.miniGun);
    private fuelEconomy = new ActionMod("assets/images/moze/skills/FuelEconomy.png", [2, 3], 2, 10, "green", 
				{name:"FUEL ECONOMY",
				description:"Reduces Salamander’s Fuel Drain. Additionally, Iron Bear’s Movement " + 
				"Speed is increased after damaging an enemy with Salamander.",
				effects:[
					{name:"Movement Speed",
					type: [{extraType: this.getExtraTypes().ironBearMovementSpeed}],
					value:"+25%"},
					{name:"Fuel Drain",
					type: [{extraType: this.getExtraTypes().salamanderFuelDrain}],
					value:"-25%"}]}, this.salamander);
    private explodingBullets = new ActionMod("assets/images/moze/skills/ExplodingBullets.png", [3, -1], 2, 15, "green", 
				{name:"EXPLODING. BULLETS.",
				description:"Minigun fires Explosive Rounds that deal increased Splash Damage, but its Fire Rate is decreased.",
				effects:[
					{name:"Minigun Fire Rate",
					type: [{extraType: this.getExtraTypes().minigunFireRate}],
					value:"-75%"},
					{name:"Minigun Damage",
					type: [{extraType: this.getExtraTypes().minigunDmg}],
					value:"+126%"}]}, this.miniGun);
    private chemicalWarfare = new ActionMod("assets/images/moze/skills/ChemicalWarfare.png", [3, 3], 2, 15, "green", 
				{name:"CHEMICAL WARFARE",
				description:"Salamander now deals Corrosive Damage. Additionally, Salamander’s Melt Damage is increased.",
				effects:[
					{name:"Converts to Corrosive Damage"},
					{name:"Melt Damage",
					type: [{extraType: this.getExtraTypes().salamanderMeltDmg}],
					value:"+50%"}]}, this.salamander);
    private moltenRoar = new ActionMod("assets/images/moze/skills/MoltenRoar.png", [4, 3], 2, 20, "green", 
				{name:"MOLTEN ROAR",
				description:"The Salamander burst-fires 3 projectiles with increased Fuel Drain, the first of which leaves a large Incendiary area.",
				effects:[
					{name:"Fuel Drain",
					type: [{extraType: this.getExtraTypes().salamanderFuelDrain}],
					value:"+25%"}]}, this.salamander);
   

    private greenSkills = [
	this.miniGun,
	this.salamander,
	this.letOffSomeSteam,
	this.generalWinter,
	this.fuelEconomy,
	this.explodingBullets,
	this.chemicalWarfare,
	this.moltenRoar,
	new NormalSkill("assets/images/moze/skills/CloudOfLead.png", [0, 0], 5, 0, "green", 
				{name:"CLOUD OF LEAD",
				description:"Occasionally, Moze's and Iron Bear's shots will deal additional Incendiary Damage and won't consume ammo.",
				effects:[
					{names:["Every 8 shots does not consume ammo", 
							"Every 7 shots does not consume ammo",
							"Every 6 shots does not consume ammo",
							"Every 5 shots does not consume ammo",
							"Every 4 shots does not consume ammo"]},
					{name:"Bonus Incendiary Damage",
					type: [{bonusIncendiaryDmg: true}],
					values:["+2.25%", "+4.50%", "+6.75%", "+9.00%", "+11.25%"]}]}),
	new NormalSkill("assets/images/moze/skills/DakkaBear.png", [0, 1], 1, 0, "green", 
				{name:"DAKKA BEAR",
				description:"Adds a manned turret to the back of Iron Bear.",
				effects:[]}),
	new NormalSkill("assets/images/moze/skills/MatchedSet.png", [0, 2], 5, 0, "green", 
				{name:"MATCHED SET",
				description:"Moze's currently equipped weapon gains a stacking bonus to " + 
				"Magazine Size and Decreased Heat Per Shot for every piece of equipped " + 
				"gear that has a matching manufacturer.",
				effects:[
					{name:"Heat Per Shot",
					type: [{heatPerShot: true}],
					conditional: this.getExtraCond().matchedSetStacks,
					getActiveValueMulti: () => {
						return this.getExtraCond().matchedSetStacks.currentValue;
					},
					values:["-2.0%", "-4.0%", "-6.0%", "-9.0%", "-11.0%"]},
					{name:"Magazine Size",
					type: [{magSize: true}],
					conditional: this.getExtraCond().matchedSetStacks,
					getActiveValueMulti: () => {
						return this.getExtraCond().matchedSetStacks.currentValue;
					},
					values:["+2.0%", "+4.0%", "+6.0%", "+8.0%", "+10.0%"]},
					{type: [{extraType: this.getExtraTypes().maxMatchedSetStacks}],
					value: 7,
					hidden: true}]}),
	new NormalSkill("assets/images/moze/skills/StokeTheEmbers.png", [1, 0], 3, 5, "green", 
				{name:"STOKE THE EMBERS",
				description:"Increases Moze and Iron Bear's Incendiary Damage.",
				effects:[
					{name:"Incendiary Damage",
					type: [{increasedIncendiaryDmg: true}],
					values:["+10%", "+20%", "+30%"]}]}),
	new NormalSkill("assets/images/moze/skills/Redistribution.png", [1, 1], 1, 5, "green", 
				{name:"REDISTRIBUTION",
				description:"After Moze scores a Critical Hit, she regenerates ammo for a few seconds.",
				effects:[
					{name:"Ammo Regeneration",
					value:"+5% of Magazine"},
					{name:"Redistribution Duration",
					value:"3 seconds"}]}),
	new NormalSkill("assets/images/moze/skills/Scrappy.png", [1, 2], 5, 5, "green", 
				{name:"SCRAPPY",
				description:"While moving, Moze's Handling, Weapon Swap and Mode Switch Speed are increased.",
				effects:[
					{name:"Weapon Swap Speed",
					conditional: this.getConditionals().moving,
					type: [{weaponSwapSpeed: true}],
					values:["+16.0%", "+27.5%", "+36.3%", "+43.2%", "+48.7%"]},
					{name:"Mode Switch Speed",
					conditional: this.getConditionals().moving,
					type: [{modeSwitchSpeed: true}],
					values:["+16.0%", "+27.5%", "+36.3%", "+43.2%", "+48.7%"]},
					{name:"Handling",
					conditional: this.getConditionals().moving,
					type: [{handling: true}],
					values:["+10.7%", "+19.4%", "+26.5%", "+32.4%", "+37.5%"]}]}),
	new NormalSkill("assets/images/moze/skills/RushinOffensive.png", [2, 0], 1, 10, "green", 
				{name:"RUSHIN’ OFFENSIVE",
				description:"Moze can sprint and shoot at the same time.",
				effects:[]}),
	new NormalSkill("assets/images/moze/skills/ScorchingRPMs.png", [2, 1], 5, 10, "green", 
				{name:"SCORCHING RPM'S",
				description:"Moze gains increased Fire Rate and Critical Hit Damage. Iron Bear gains increased Hard Point Damage.",
				effects:[
					{name:"Fire Rate",
					type: [{fireRate: true}],
					values:["+3.0%", "+6.0%", "+9.0%", "+12.0%", "+15.0%"]},
					{name:"Critical Hit Damage",
					type: [{criticalHitDmg: true}],
					values:["+4.0%", "+8.0%", "+12.0%", "+16.0%", "+20.0%"]}]}),
	new NormalSkill("assets/images/moze/skills/TheIronBank.png", [3, 1], 5, 15, "green", 
				{name:"THE IRON BANK",
				description:"Increases Moze's Magazine Size.",
				effects:[
					{name:"Magazine Size",
					type: [{magSize: true}],
					values:["+7.0%", "+14.0%", "+21.0%", "+28.0%", "+35.0%"]}]}),
	new NormalSkill("assets/images/moze/skills/SpecialistBear.png", [3, 2], 1, 15, "green", 
				{name:"SPECIALIST BEAR",
				description:"Equipping two of the same Weapons on Iron Bear increases the damage they deal.",
				effects:[
					{name:"Iron Bear Damage",
					type: [{actionSkillDmg: true}],
					value:"+25%"}]}),
	new NormalSkill("assets/images/moze/skills/SomeForTheRoad.png", [4, 0], 1, 20, "green", 
				{name:"SOME FOR THE ROAD",
				description:"Moze gains infinite ammo for a few seconds after exiting Iron Bear.",
				effects:[
					{name:"Some for the Road Duration",
					value:"5 seconds"}]}),
	new NormalSkill("assets/images/moze/skills/ClickClick.png", [4, 1], 3, 20, "green", 
				{name:"“CLICK, CLICK...”",
				description:"Moze gains increased Gun Damage as her magazine empties. The less ammo " + 
				"there is remaining, the greater the increase.<br /><br />" +
				"If Moze has a COV gun equipped, she gains Gun Damage as her gun's heat increases.",
				effects:[
					{name:"Gun Damage",
					type: [{gunDmg: true}],
					values:["up to +12%", "up to +24%", "up to +36%"]}]}),
	new NormalSkill("assets/images/moze/skills/Forge.png", [5, 1], 1, 25, "green", 
				{name:"FORGE",
				description:"Moze constantly regenerates ammo for her currently equipped weapon.",
				effects:[
					{name:"Ammo Regeneration",
					value:"+5.0% of magazine/sec"}]})
	
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
		if (this.getAllocatedSkills().indexOf(skill) == -1) {
			this.getAllocatedSkills().push(skill);
		}

		//Increment allocation of normal skills if skill is normal
		if (skill instanceof NormalSkill) this.setAllocatedNormalSkillPoints(this.getAllocatedNormalSkillPoints() + 1);

		//Action Mod
		if (skill instanceof ActionSkill) {

			//Check to see if an action mod is allocated already
			//If there is remove a point from its allocation and remove it from equipped skills
			if (this.getEquippedSkills()[pos].actionSkill != skill && this.getEquippedSkills()[pos].actionSkill != null)  {
				this.getEquippedSkills()[pos].actionSkill.removePoint();
				this.removePoint(this.getEquippedSkills()[pos].actionSkill, pos);
			}

			//Add action skill to equipped skills
			this.getEquippedSkills()[pos].actionSkill = skill;
		} 

		//Action Mod
		if (skill instanceof ActionMod) {
			
			//If a skill exists in this position, remove it from the equipped skills and remove a point from its allocation
			if (this.getEquippedSkills()[pos].actionMods[0] != skill && this.getEquippedSkills()[pos].actionMods[0] != null)  {
				this.getEquippedSkills()[pos].actionMods[0].removePoint();
				this.removePoint(this.getEquippedSkills()[pos].actionMods[0]);
			} 

			//Add mod to equipped skill in the specified position
			this.getEquippedSkills()[pos].actionMods[0] = skill;
		}

		return true;
    }

    /**
     * removes point from a specific skill type allocation
     * 
     * @param skill
     *              skill to be removed
     * 
     */
    removePoint(skill: Skill, pos?: number) {

		var index = this.getAllocatedSkills().indexOf(skill);

		//Only remove if the allocated points = 0
		if (this.getAllocatedSkills()[index].getAllocatedPoints() == 0) {
			this.getAllocatedSkills().splice(index, 1);
		}


		//Reduce normal skill allocation if the skill type is normal
		if (skill instanceof NormalSkill) this.setAllocatedNormalSkillPoints(this.getAllocatedNormalSkillPoints() - 1);

		//remove first instance of action skill from equipped skills
		if (skill instanceof ActionSkill)  {
			var index: number;
			if (pos == null) {
				index = this.getEquippedSkills()[0].actionSkill == skill ? 0 : 1;
			} else {
				index = pos;
			}

			this.getEquippedSkills()[index].actionSkill = null;
			
			//remove the action mod that was here if there was any
			if (this.getEquippedSkills()[index].actionMods[0] != null) {
				this.getEquippedSkills()[index].actionMods[0].removePoint();
				this.removePoint(this.getEquippedSkills()[index].actionMods[0], index);
			}
		} 

		//Remove action mod from equipped skills action mod array
		if (skill instanceof ActionMod) {
			var index: number;
			if (pos == null) {
				index = this.getEquippedSkills()[0].actionMods[0] == skill ? 0 : 1;
			} else {
				index = pos;
			}

			this.getEquippedSkills()[index].actionMods[0] = null;
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
