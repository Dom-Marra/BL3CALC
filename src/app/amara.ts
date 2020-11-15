import { Skill } from './skill';
import { NormalSkill } from './normalskill';
import { OtherSkill } from './otherskill';
import { ActionSkill } from './actionskill';
import { ActionMod } from './actionmod';
import { Character } from './character';

export class Amara extends Character {

  //Path for red tree header image
  public readonly RED_TREE_HEADER: string = "assets/images/amara/RedTreeHeader.png";
  public readonly RED_TREE_NAME: string = "Fist of the Elements";

  //Path for blue tree header image
  public readonly BLUE_TREE_HEADER: string = "assets/images/amara/BlueTreeHeader.png";
  public readonly BLUE_TREE_NAME: string = "Mystic Assualt";

  //Path for green tree header image
  public readonly GREEN_TREE_HEADER: string = "assets/images/amara/GreenTreeHeader.png";
  public readonly GREEN_TREE_NAME: string = "Brawl";

  //Extra conditionals that are specific to amara and require special calculations
  private extraConditionals = {
    rushStacksConsumed: {
      active: false,
      header: "Consumed rush stacks?",
      requiresNumberField: true,
      currentValue: 0,
      maxValue: 0,
      occurances: 0
    },
    rushStacks: {
      active: false,
      header: "Using rush stacks?",
      requiresNumberField: true,
      currentValue: 0,
      maxValue: 0
    },
    rushStackEffectiveness: {
      active: true,
      stateChangeable: false,
      effectiveness: 1
    },
    samsaraStacks: {
      active: false,
      header: "Using samsara stacks?",
      requiresNumberField: true,
      currentValue: 0,
      maxValue: 0,
    },
    mindfulnessStacks: {
      active: false,
      header: "Using mindfulness stacks?",
      requiresNumberField: true,
      currentValue: 0,
      maxValue: 0
    },
    graspedAnEnemy: {
      active: false,
      header: "Have you grasped an enemy?"
    },
  }

  //Extra stat types that are specific to amara and require specific calculations
  private extraTypes = {
    rushStackEffectiveness: {
      header: "Rush Stack Effectiveness",
      value: 0,
      valueType: "percent",
      setFunc: (effectValue: number) => {
        this.getExtraTypes().rushStackEffectiveness.value += effectValue;
        this.getExtraCond().rushStackEffectiveness.effectiveness += (effectValue/100);
      }
    },
    maxRushStacks: {
      header: "Max Rush Stacks",
      value: 0,
      valueType: "flat",
      setFunc: (stackSize: number) => {
        if (stackSize < 0) {
          this.getExtraCond().rushStacksConsumed.occurances--;
        }

        if (this.getExtraCond().rushStacksConsumed.occurances == 0) {
          this.getExtraTypes().maxRushStacks.value += stackSize;

          this.getExtraCond().rushStacksConsumed.maxValue += stackSize;
          this.getExtraCond().rushStacks.maxValue += stackSize;
        }

        if (stackSize > 0) {
          this.getExtraCond().rushStacksConsumed.occurances++;
        } 
      }
    },
    increaseMaxRushStacks: {
      setFunc: (stackSize: number) => {
        this.getExtraTypes().maxRushStacks.value += stackSize;

        this.getExtraCond().rushStacks.maxValue += stackSize;
        this.getExtraCond().rushStacksConsumed.maxValue += stackSize;

        if (this.getExtraCond().rushStacks.currentValue > (this.getExtraCond().rushStacks.maxValue * this.getExtraCond().rushStacks.effectiveness)) {
          this.getExtraCond().rushStacks.currentValue = this.getExtraCond().rushStacks.maxValue;
        }
        if (this.getExtraCond().rushStacksConsumed.currentValue > (this.getExtraCond().rushStacksConsumed.maxValue * this.getExtraCond().rushStackEffectiveness.effectiveness)) {
          this.getExtraCond().rushStacksConsumed.currentValue = this.getExtraCond().rushStacksConsumed.maxValue;
        }
      }
    },
    maxSamsaraStacks: {
      header: "Max Samsara Stacks",
      value: 0,
      valueType: "flat",
      setFunc: (stackSize: number) => {
        this.getExtraTypes().maxSamsaraStacks.value += stackSize;
        this.getExtraCond().samsaraStacks.maxValue += stackSize; 
      }
    },
    maxMindfulnessStacks: {
      header: "Max Mindfulness Stacks",
      value: 0,
      valueType: "flat",
      setFunc: (stackSize: number) => {
        this.getExtraTypes().maxMindfulnessStacks.value += stackSize;
        this.getExtraCond().mindfulnessStacks.maxValue += stackSize; 
      }
    }
  }

  //Skills for red skill tree

  //Action skills
  private phaseGrasp = new ActionSkill('assets/images/amara/skills/PhaseGrasp.png', [-1, 1], 1, 0, "red",
                  {name:"PHASEGRASP", 
                  description:"Amara summons a giant fist that bursts from the ground and locks " + 
                  "the targeted enemy in place for a few seconds.<br /><br />" +
                  "Some enemies are immune to being Grasped and instantly take damage instead.",
                  effects:[
                    {name:"Skill Duration",
                    value:"7 seconds"},
                    {name:"Cooldown",
                    value:"16 seconds"},
                    {name:"Grasp Immune Damage",
                    value:28}]});
  private theEternalFists = new ActionSkill('assets/images/amara/skills/TheEternalFists.png', [2, -1], 1, 10, "red",
                  {name:"THE ETERNAL FIST", 
                  description:"Amara summons a giant fist that bursts from the ground and locks " + 
                  "the targeted enemy in place for a few seconds.<br /><br />" +
                  "Whenever the Grasped enemy is killed, a new fist seeks out and Grasps a new target",
                  effects:[
                    {name:"Bonus Targets",
                    value:"Up to +4"},
                    {name:"Cooldown",
                    value:"20 seconds"},
                    {name:"Grasp Immune Damage",
                    value:28}]});
  private tiesThatBind = new ActionSkill('assets/images/amara/skills/TiesThatBind.png', [3, 3], 1, 15, "red",
                  {name:"TIES THAT BIND", 
                  description:"Amara summons a giant fist that bursts from the ground " + 
                  "and locks the targeted enemy in place for a few seconds. <br /><br />" +
                  "Enemies near the Grasped target are linked, and any damage dealt to a " + 
                  "linked target is shared between all other linked targets.",
                  effects:[
                    {name:"Link Damage",
                    value:"35% of damage dealt"},
                    {name:"Cooldown",
                    value:"18 seconds"},
                    {name:"Grasp Immune Damage",
                    value:34}]});
  private fistOverMatter = new ActionSkill('assets/images/amara/skills/FistOverMatter.png', [4, -1], 1, 20, "red",
                  {name:"FIST OVER MATTER", 
                  description:"Amara summons a giant fist that bursts from the ground and " + 
                  "locks the targeted enemy in place for a few seconds.<br /><br />" +
                  "After Grasping the targeted enemy, large fists appear and constantly " + 
                  "smash the area, dealing damage to nearby enemies.",
                  effects:[
                    {name:"Cooldown",
                    value:"28 seconds"},
                    {name:"Damage",
                    value:35},
                    {name:"Grasp Immune Damage",
                    value:39}]});

  //Action Mods
  private soulFire = new OtherSkill('assets/images/amara/skills/SoulFire.png', [1, 3], 1, 5, "red",
                  {name:"SOULFIRE", 
                  description:"Converts Amara's Action Skill to Incendiary Damage.",
                  effects:[
                    {name:"Converts to Incendiary Damage"}]});
  private allure = new ActionMod('assets/images/amara/skills/Allure.png', [2, 3], 1, 10, "red",
                  {name:"ALLURE", 
                  description:"Amara's Action Skill creates a singularity that pulls in enemies.",
                  effects:[
                    {name:"Action Skill Damage",
                    type: [{actionSkillDmg: true}],
                    value:"-20%"},
                    {name:"Duration",
                    value:"2.5 seconds"}]});


  //skills list
  private redSkills = [
    this.phaseGrasp,
    this.theEternalFists,
    this.tiesThatBind,
    this.fistOverMatter,
    this.soulFire,
    this.allure, //BELOW HERE IS NORMAL SKILLS
    new NormalSkill('assets/images/amara/skills/Anima.png', [0, 0], 5, 0, "red",
                  {name:"ANIMA", 
                  description:"Amara's Status Effects deal increased damage over time and have " + 
                  "increased duration. Her Action Skill Status Effect deals further increased damage.",
                  effects:[
                    {name:"Action Skill Status Effect Damage",
                    values:["+8%", "+16%", "+24%", "+32%", "+40%"]},
                    {name:"Status Effect Damage",
                    type: [{statusEffectDmg: true}], 
                    values:["+4%", "+8%", "+12%", "+16%", "+20%"]},
                    {name:"Status Effect Duration:", 
                    type: [{statusEffectDuration: true}], 
                    values:["+20%", "+40%", "+60%", "+80%", "+100%"]}]}),
    new NormalSkill('assets/images/amara/skills/SteadyHands.png', [0, 1], 3, 0, "red",
                  {name:"STEADY HAND(S)", 
                  description:"Amara gains increased Weapon Handling and Accuracy.",
                  effects:[
                    {name:"Handling",
                    type: [{handling: true}], 
                    values:["+14%", "+24%", "+32%"]},
                    {name:"Accuracy", 
                    type: [{accuracy: true}],
                    values:["+13%", "+23%", "+31%"]}]}),
    new NormalSkill('assets/images/amara/skills/Infusion.png', [0, 2], 5, 0, "red",
                  {name:"INFUSION", 
                  description:"Convert a portion of damage dealt by Amara's weapons into her Action Skill Element.",
                  effects:[
                    {name:"Converted Damage",
                    values:["8%", "16%", "24%", "32%", "40%"]}]}),
    new NormalSkill('assets/images/amara/skills/Tempest.png', [1, 0], 5, 5, "red",
                  {name:"TEMPEST", 
                  description:"Amara deals increased Elemental Damage. Shock damage is further increased.",
                  effects:[
                    {name:"Shock Damage",
                    type: [{shockDmg: true}],
                    values:["+8.0%", "+16.0%", "+24.0%",  "+32.0%", "+40.0%"]},
                    {name:"Elemental Damage", 
                    type: [{elementalDmg: true}],
                    values:["+6.0%", "+12.0%", "+18.0%", "+24.0%", "+30.0%"]}]}),
    new NormalSkill('assets/images/amara/skills/IlluminatedFist.png', [1, 1], 1, 5, "red",
                  {name:"ILLUMINATED FIST", 
                  description:"Amara gains increased Melee Damage and her Melee Damage is converted to her Action Skill Element.",
                  effects:[
                    {name:"Melee Damage",
                    type: [{meleeDmg: true}],
                    value:"+75.0%"}]}),
    new NormalSkill('assets/images/amara/skills/Wildfire.png', [1, 2], 5, 5, "red",
                  {name:"WILDFIRE", 
                  description:"Whenever Amara applies a Status Effect to an enemy, it has a chance to spread to a nearby enemy.",
                  effects:[
                    {name:"Spread Chance",
                    values:["8%", "16%", "24%", "32%", "40%"]}]}),
    new NormalSkill('assets/images/amara/skills/Dread.png', [2, 1], 1, 10, "red",
                  {name:"DREAD", 
                  description:"Amara's Gun Damage is increased for a few seconds after an enemy is Grasped.<br /><br />" +
                  "Whenever any player kills a Grasped enemy, their current weapon is instantly reloaded.",
                  effects:[
                    {name:"Gun Damage",
                    type: [{gunDmg: true}],
                    conditional: this.getExtraCond().graspedAnEnemy,
                    value:"+15%"},
                    {name:"Duration",
                    value:"8 seconds"}]}),
    new NormalSkill('assets/images/amara/skills/Indiscriminate.png', [3, 0], 3, 15, "red",
                  {name:"INDISCRIMINATE", 
                  description:"Amara's bullets that damage enemies have a chance to ricochet " + 
                  "and deal decreased damage to other nearby enemies. Ricochet Chance and Damage " + 
                  "are increased if the target is currently affected by Phasegrasp or Stillness of Mind.",
                  effects:[
                    {name:"Ricochet Chance",
                    values:["10%","20%","30%"]},
                    {name:"Ricochet Damage",
                    value:"-50%"},
                    {name:"Action Skill Ricochet Chance", 
                    values:["20%","40%","60%"]},
                    {name:"Action Skill Ricochet Damage", 
                    value:"-25%"}]}),
    new NormalSkill('assets/images/amara/skills/DeepWell.png', [3, 1], 1, 15, "red",
                  {name:"DEEP WELL", 
                  description:"Amara gains increased Magazine Size with elemental weapons.",
                  effects:[
                    {name:"Magazine Size",
                    value:"+20%"}]}),
    new NormalSkill('assets/images/amara/skills/Catharsis.png', [3, 2], 3, 15, "red",
                  {name:"CATHARSIS", 
                  description:"Whenever Amara triggers an elemental effect on an enemy, when that enemy " + 
                  "dies that enemy explodes, dealing her attuned element damage along with any " + 
                  "other element that is currently inflicted upon that enemy. This skill has a short cooldown.",
                  effects:[
                    {name:"Damage",
                    values:[4, 8, 13]},
                    {name:"Cooldown",
                    value:"8 seconds"}]}),
    new NormalSkill('assets/images/amara/skills/Sustainment.png', [4, 0], 5, 20, "red",
                  {name:"SUSTAINMENT", 
                  description:"Amara gains Life Steal whenever she deals Elemental Damage with her weapon.",
                  effects:[
                    {name:"Life Steal",
                    type: [{lifeSteal: true}],
                    conditional: this.getConditionals().dealtEleDmgWithElementalWeapon,
                    values:["4% of damage dealt", "8% of damage dealt", "12% of damage dealt", "16% of damage dealt", "20% of damage dealt"]}]}),
    new NormalSkill('assets/images/amara/skills/Conflux.png', [4, 2], 5, 20, "red",
                  {name:"CONFLUX", 
                  description:"Whenever Amara applies a Status Effect to an enemy, " + 
                  "she gains a chance to randomly Electrocute, Ignite, or Melt that enemy.",
                  effects:[
                    {name:"Extra Effect Chance",
                    values:["7%", "14%", "21%", "28%", "35%"]}]}),
    new NormalSkill('assets/images/amara/skills/ForcefulExpression.png', [5, 1], 1, 25, "red",
                  {name:"FORCEFUL EXPRESSION", 
                  description:"Amara's guns deal Bonus Elemental Damage, based on her Action Skill Element.",
                  effects:[
                    {name:"Bonus Elemental Damage",
                    type: [{bonusElementalDmg: true}],
                    value:"18.0% of Damage Dealt"}]})
  ]
  
  //Skills for blue skill tree

  //Action skills
  private phaseCast = new ActionSkill('assets/images/amara/skills/PhaseCast.png', [-1, 1], 1, 0, "blue",
                  {name:"PHASECAST", 
                  description:"Amara sends forward an Astral Projection of herself, dealing " + 
                  "damage to everything in its path.",
                  effects:[
                    {name:"Cooldown",
                    value:"28 seconds"},
                    {name:"Damage",
                    value:92}]});
  private deliverance = new ActionSkill('assets/images/amara/skills/Deliverance.png', [2, -1], 1, 10, "blue",
                  {name:"DELIVERANCE", 
                  description:"Amara sends forward an Astral Projection of herself, dealing damage to everything in its path.<br /><br />" +
                  "Whenever Amara's Astral Projection damages an enemy or object, it releases homing Elemental Projectiles " + 
                  "that trigger her Action Skill Elemental Effect on enemies.",
                  effects:[
                    {name:"Cooldown",
                    value:"28 seconds"},
                    {name:"Damage",
                    value:86},
                    {name:"Elemental Projectiles",
                    value:"3 per enemy hit"}]});
  private reverberation = new ActionSkill('assets/images/amara/skills/Reverberation.png', [3, -1], 1, 15, "blue",
                  {name:"REVERBERATION", 
                  description:"Amara sends forward an Astral Projection of herself, " + 
                  "dealing damage to everything in its path..<br /><br />" +
                  "Astral Projection deals increased damage for every enemy it hits.",
                  effects:[
                    {name:"Cooldown",
                    value:"30 seconds"},
                    {name:"Damage Bonus",
                    value:"+50% per enemy hit"},
                    {name:"Damage",
                    value:86}]});
  private tandava = new ActionSkill('assets/images/amara/skills/Tandava.png', [4, 3], 1, 20, "blue",
                  {name:"TANDAVA", 
                  description:"Amara sends forward an Astral Projection of herself. " + 
                  "When it hits a target, it explodes, damaging all nearby enemies.",
                  effects:[
                    {name:"Cooldown",
                    value:"35 seconds"},
                    {name:"Damage",
                    value:91}]});

  //Action Mods 
  private soulSap = new ActionMod('assets/images/amara/skills/SoulSap.png', [1, 3], 1, 5, "blue",
                  {name:"SOUL SAP", 
                  description:"A portion of all damage dealt by Amara's Action Skill is returned to her or a nearby ally as health.",
                  effects:[
                    {name:"Life Steal",
                    value:"30% of Skill damage dealt"}]});
  private stillnessOfMind = new ActionMod('assets/images/amara/skills/StillnessOfMind.png', [2, 3], 1, 10, "blue",
                  {name:"STILLNESS OF MIND", 
                  description:"Enemies damaged by Amara's Action Skill become phaselocked until " + 
                  "they are damaged or the duration ends. However, Action Skill Cooldown is increased.<br /><br />" +
                  "If Amara targets an enemy with Phasegrasp, enemies near the Grasped target are phaselocked.",
                  effects:[
                    {name:"Max Duration",
                    value:"6 seconds"},
                    {name:"Cooldown",
                    value:"+15%"},
                    {name:"Damage",
                    value:"-25%"}]});
  private shockra = new OtherSkill('assets/images/amara/skills/Shockra.png', null, 1, 0, "blue",
                  {name:"SHOCKRA", 
                  description:"Converts your Action Skill to Shock Damage.",
                  effects:[
                    {name:"Converts to Shock Damage"}]});
                    

  //skills list
  private blueSkills = [
    this.phaseCast,
    this.deliverance,
    this.reverberation,
    this.tandava,
    this.soulSap,
    this.stillnessOfMind, //BELOW HERE IS NORMAL SKILLS
    new NormalSkill('assets/images/amara/skills/DoHarm.png', [0, 0], 5, 0, "blue",
                  {name:"DO HARM", 
                  description:"Killing an enemy grants Amara a stack of Rush. Activating her Action Skill consumes all Rush stacks." +
                  "For every stack of Rush consumed, Amara's Action Skill Damage is temporarily increased.",
                  effects:[
                    {name:"Max Rush Stacks",
                    type: [{extraType: this.getExtraTypes().maxRushStacks}],
                    value:10},
                    {name:"Action Skill Damage", 
                    type: [{actionSkillDmg: true}],
                    conditionals: [this.getExtraCond().rushStackEffectiveness, this.getExtraCond().rushStacksConsumed],
                    getActiveValueMultis: [
                      null,
                      () => {
                        if (this.getExtraCond().rushStacks.active && this.getExtraCond().rushStacksConsumed.active) {
                          this.getExtraCond().rushStacks.active = false;
                        }
                        
                        return this.getExtraCond().rushStacksConsumed.currentValue * this.getExtraCond().rushStackEffectiveness.effectiveness;
                      }
                    ],
                    values:["+0.9% per stack consumed", "+1.8% per stack consumed", "+2.7% per stack consumed", "+3.6% per stack consumed", "+4.5% per stack consumed"]},
                    {name:"Duration", 
                    value:"20 seconds"}]}),
    new NormalSkill('assets/images/amara/skills/FastHands.png', [0, 1], 3, 0, "blue",
                  {name:"FAST HAND(S)", 
                  description:"Amara's Reload Speed, Weapon Swap Speed, and Mode Switch Speed are improved.",
                  effects:[
                    {name:"Reload Speed",
                    type: [{reloadSpeed: true}],
                    values:["+7%", "+14%", "+19%",]},
                    {name:"Weapon Swap Speed", 
                    type: [{weaponSwapSpeed: true}],
                    values:["+16%", "+28%", "+36%",]},
                    {name:"Mode Switch Speed:", 
                    type: [{modeSwitchSpeed: true}],
                    values:["+16%", "+28%", "+36%",]}]}),
    new NormalSkill('assets/images/amara/skills/ViolentTapestry.png', [0, 2], 5, 0, "blue",
                  {name:"VIOLENT TAPESTRY", 
                  description:"Applying a Status Effect grants Amara a stack of Rush. Activating " + 
                  "her action skill consumes all Rush stacks.<br /><br />" +
                  "For every stack of Rush consumed, Amara's Status Effect Chance is temporarily increased.",
                  effects:[
                    {name:"Max Rush Stacks",
                    type: [{extraType: this.getExtraTypes().maxRushStacks}],
                    value:10},
                    {name:"Effect Chance", 
                    type: [{statusEffectChance: true}],
                    conditionals: [this.getExtraCond().rushStackEffectiveness, this.getExtraCond().rushStacksConsumed],
                    getActiveValueMultis: [
                      null,
                      () => {
                        if (this.getExtraCond().rushStacks.active && this.getExtraCond().rushStacksConsumed.active) {
                          this.getExtraCond().rushStacks.active = false;
                        }
                        return this.getExtraCond().rushStacksConsumed.currentValue * this.getExtraCond().rushStackEffectiveness.effectiveness;
                      }
                    ],
                    values:["+0.6% per stack consumed", "+1.2% per stack consumed", "+1.8% per stack consumed", "+2.4% per stack consumed", "+3.0% per stack consumed"]},
                    {name:"Duration", 
                    value:"20 seconds"}]}),
    new NormalSkill('assets/images/amara/skills/Alacrity.png', [1, 0], 5, 5, "blue",
                  {name:"ALACRITY", 
                  description:"Amara gains increased Reload Speed for every stack of Rush. " + 
                  "After consuming Rush stacks, this bonus is increased for a few seconds.",
                  effects:[
                    {name:"Reload Speed", 
                    type: [{reloadSpeed: true}],
                    conditionals: [this.getExtraCond().rushStackEffectiveness, this.getExtraCond().rushStacks],
                    getActiveValueMultis: [
                      null,
                      () => {
                        if (this.getExtraCond().rushStacks.active && this.getExtraCond().rushStacksConsumed.active) {
                          this.getExtraCond().rushStacksConsumed.active = false;
                        }
                        return this.getExtraCond().rushStacks.currentValue * this.getExtraCond().rushStackEffectiveness.effectiveness;
                      }
                    ],
                    values:["+0.4% per stack", "+0.8% per stack", "+1.2% per stack", "+1.6% per stack", "+2.0% per stack"]},
                    {name:"Reload Speed", 
                    type: [{reloadSpeed: true}],
                    conditionals: [this.getExtraCond().rushStackEffectiveness ,this.getExtraCond().rushStacksConsumed],
                    getActiveValueMultis: [
                      null,
                      () => {
                        if (this.getExtraCond().rushStacks.active && this.getExtraCond().rushStacksConsumed.active) {
                          this.getExtraCond().rushStacks.active = false;
                        }
                        return this.getExtraCond().rushStacksConsumed.currentValue * this.getExtraCond().rushStackEffectiveness.effectiveness;
                      }
                    ],
                    values:["+0.6% after action skill use", "+1.2% after action skill use", "+1.8% after action skill use", "+2.3% after action skill use", "+2.9% after action skill use"]},
                    {name:"Duration",
                    value:"8 seconds"}]}),
    new NormalSkill('assets/images/amara/skills/Transcend.png', [1, 1], 3, 5, "blue",
                  {name:"TRANSCEND", 
                  description:"Amara gains increased Accuracy and Critical Hit Damage for " + 
                  "a few seconds after activating her Action Skill.",
                  effects:[
                    {name:"Accuracy", 
                    type: [{accuracy: true}],
                    conditional: this.getConditionals().usedActionSkill,
                    values:["+17%", "+29%", "+38%"]},
                    {name:"Critical Hit Damage", 
                    type: [{criticalHitDmg: true}],
                    conditional: this.getConditionals().usedActionSkill,
                    values:["+9%", "+18%", "+27%"]},
                    {name:"Duration", 
                    value:"12 seconds"}]}),
    new NormalSkill('assets/images/amara/skills/Restless.png', [1, 2], 5, 5, "blue",
                  {name:"RESTLESS", 
                  description:"Amara gains increased Action Skill Cooldown Rate.",
                  effects:[
                    {name:"Cooldown Rate", 
                    type: [{actionSkillCooldown: true}],
                    values:["+5%", "+10%", "+15%", "+20%", "+25%"]}]}),
    new NormalSkill('assets/images/amara/skills/Ascendant.png', [2, 1], 1, 10, "blue",
                  {name:"ASCENDANT", 
                  description:"All Action Skill Augments gain increased effects.",
                  effects:[
                    {name:"Soul Sap Lifesteal",
                    value:"+20%"},
                    {name:"Allure Radius",
                    value:"+100%"},
                    {name:"Glamour Duration:",
                    value:"+50%"},
                    {name:"Stillness of Mind",
                    value:"Breaks 0.75 seconds after being damaged"},
                    {name:"Revelation Damage",
                    value:"+25%"}]}),
    new NormalSkill('assets/images/amara/skills/FromRest.png', [3, 0], 3, 15, "blue",
                  {name:"FROM REST", 
                  description:"Amara gains improved Fire Rate and Charge Time.",
                  effects:[
                    {name:"Fire Rate", 
                    type: [{fireRate: true}],
                    values:["+4%", "+8%", "+12%"]},
                    {name:"Charge Time", 
                    type: [{chargeTime: true}],
                    values:["+21%", "+34%", "+44%"]}]}),
    new NormalSkill('assets/images/amara/skills/LaidBare.png', [3, 1], 3, 15, "blue",
                  {name:"LAID BARE", 
                  description:"Enemies take increased damage from all sources for a few seconds " + 
                  "after being damaged by Amara's Action Skill.",
                  effects:[
                    {name:"Damage Increase", 
                    type: [{dmgIncrease: true}],
                    conditional: this.getConditionals().enemyDamagedByAS,
                    values:["+8.3%", "+16.7%", "+25.0%"]},
                    {name:"Duration", 
                    value:"8 seconds"}]}),
    new NormalSkill('assets/images/amara/skills/Wrath.png', [3, 2], 3, 15, "blue",
                  {name:"WRATH", 
                  description:"Amara gains increased Gun Damage. This effect is increased " +
                  "after she activates her action skill for a few seconds.",
                  effects:[
                    {name:"Gun Damage", 
                    type: [{gunDmg: true}],
                    values:["+6.7%", "+13.3%", "+20.0%"]},
                    {name:"Gun Damage", 
                    type: [{gunDmg: true}],
                    conditional: this.getConditionals().usedActionSkill,
                    values:["+6.7% after action skill use", "+13.3% after action skill use", "+20.0% after action skill use"]},
                    {name:"Duration",
                    value:"8 seconds"}]}),
    new NormalSkill('assets/images/amara/skills/Remnant.png', [4, 0], 3, 20, "blue",
                  {name:"REMNANT", 
                  description:"When Amara kills an enemy with a Gun or Action Skill, " + 
                  "she creates a homing projectile that seeks out a new enemy dealing her Action Skill Elemental Damage.<br /><br />" +
                  "Any Overkill Damage is added to the projectile's damage.",
                  effects:[
                    {name:"Remnant Damage", 
                    values:[9, 18, 26]}]}),
    new NormalSkill('assets/images/amara/skills/Awakening.png', [4, 2], 3, 20, "blue",
                  {name:"REMNANT", 
                  description:"Amara's Rush stacks gain increased effectiveness",
                  effects:[
                    {name:"Rush Stack Effectiveness", 
                    type: [{extraType: this.getExtraTypes().rushStackEffectiveness}],
                    values:["+10%", "+20%", "+30%"]}]}),
    new NormalSkill('assets/images/amara/skills/Avatar.png', [5, 1], 1, 25, "blue",
                  {name:"AVATAR", 
                  description:"Amara's Action Skill can be activated while it's cooling down. " +
                  "This skill may only be used once per completed cooldown.<br /><br />" +
                  "Additionally, increases Amara's Max Rush Stacks.<br /><br />" +
                  "Additionally, if Amara's Action Skill kills an enemy, it refunds half of her Rush stacks.",
                  effects:[
                    {name:"Bonus Rush Stacks", 
                    type: [{extraType: this.getExtraTypes().increaseMaxRushStacks}],
                    value:"+10"}]})
  ]

  //Skills for green skill tree
  //Action skills
  private phaseSlam = new ActionSkill('assets/images/amara/skills/PhaseSlam.png', [-1, 1], 1, 0, "green",
                  {name:"PHASESLAM", 
                  description:"Amara leaps into the air and Slams the ground, " +
                  "dealing damage to all nearby enemies and knocking them up.",
                  effects:[
                    {name:"Cooldown",
                    value:"35 seconds"},
                    {name:"Damage",
                    value:98}]});
  private fracture = new ActionSkill('assets/images/amara/skills/Fracture.png', [2, -1], 1, 10, "green",
                  {name:"FRACTURE", 
                  description:"Amara summons a line of fists that erupt from the ground, " + 
                  "dealing damage to enemies in front of Amara.",
                  effects:[
                    {name:"Cooldown",
                    value:"28 seconds"},
                    {name:"Damage",
                    value:88}]});
  private downfall = new ActionSkill('assets/images/amara/skills/Downfall.png', [3, -1], 1, 15, "green",
                  {name:"DOWNFALL", 
                  description:"Amara leaps into the air and shoots an Elemental Beam " + 
                  "below her briefly, followed by a Slam.",
                  effects:[
                    {name:"Cooldown",
                    value:"47 seconds"},
                    {name:"Damage",
                    value:95},
                    {name:"Beam Damage",
                    value:"14/second"}]});

  //Action mods
  private blightTiger = new OtherSkill('assets/images/amara/skills/BlightTiger.png', [1, 3], 1, 5, "green",
                  {name:"BLIGHT TIGER", 
                  description:"Converts Amara's Action Skill to Corrosive Damage.",
                  effects:[{name:"Converts to Corrosive Damage"}]});
  private revelation = new ActionMod('assets/images/amara/skills/Revelation.png', [2, 3], 1, 10, "green",
                  {name:"REVELATION", 
                  description:"Amara's Action Skill now creates a Nova when it damages " + 
                  "enemies, dealing damage to all nearby enemies.",
                  effects:[
                    {name:"Action Skill Damage",
                    type: [{actionSkillDmg: true}],
                    value:"-15%"},
                    {name:"Nova Damage",
                    value:18}]});
  private glamour = new ActionMod('assets/images/amara/skills/Glamour.png', [4, 3], 1, 20, "green",
                  {name:"GLAMOUR", 
                  description:"Enemies damaged by Amara's action skill become confused and temporarily " + 
                  "attack their allies. However, Action Skill Cooldown is increased.<br /><br />" +
                  "If Amara targets an enemy with Phasegrasp, enemies near the Grasped target are confused as well.",
                  effects:[
                    {name:"Confuse Duration",
                    value:"8 seconds"},
                    {name:"Cooldown",
                    value:"+20%"},
                    {name:"Damage",
                    value:"-30%"}]});
  
  //skills list
  private greenSkills = [
    this.phaseSlam,
    this.fracture,
    this.downfall,
    this.blightTiger,
    this.revelation,
    this.glamour, //BELOW HERE IS NORMAL SKILLS
    new NormalSkill('assets/images/amara/skills/RootToRise.png', [0, 0], 5, 0, "green",
                  {name:"ROOT TO RISE", 
                  description:"Amara gains increased Max Health.",
                  effects:[
                    {name:"Max Health",
                    type: [{maxHealth: true}],
                      values:["+8%", "+16%", "+24%", "+32%", "+40%"]}]}),
    new NormalSkill('assets/images/amara/skills/PersonalSpace.png', [0, 1], 3, 0, "green",
                    {name:"PERSONAL SPACE", 
                    description:"Amara's weapon shots deal Bonus Damage based " + 
                    "on the distance to her target. The closer the target, the greater the bonus.",
                    effects:[
                      {name:"Bonus Damage",
                      type: [{bonusDmg: true}],
                      values:["up to 18.0% of damage dealt", "up to 36.0% of damage dealt", "up to 54.0% of damage dealt"]}]}),
    new NormalSkill('assets/images/amara/skills/Clarity.png', [0, 2], 5, 0, "green",
                  {name:"CLARITY", 
                  description:"Amara constantly regenerates health. The lower her health, " + 
                  "the more powerful the regeneration.<br /><br />"+
                  "After using an Action Skill, this bonus is doubled for a few seconds.",
                  effects:[
                    {name:"Health Regeneration",
                    type: [{healthRegen_missingHealth: true}],
                    conditional: this.getConditionals().usedActionSkill,
                    getNotActiveValueMulti: () => { return 0.5 },
                    values:["up to +1.00% Missing Health/sec","up to +2.00% Missing Health/sec","up to +3.00% Missing Health/sec", "up to +4.00% Missing Health/sec", "up to +5.00% Missing Health/sec"]},
                    {name:"Duration", 
                    value:"5 seconds"}]}),
    new NormalSkill('assets/images/amara/skills/ArmsDeal.png', [1, 0], 5, 5, "green",
                  {name:"ARMS DEAL", 
                  description:"Amara deals increased Splash Damage, and takes reduced Splash Damage.",
                  effects:[
                    {name:"Splash Damage",
                    type: [{splashDmg: true}],
                    values:["+4%", "+8%", "+12%", "+16%", "+20%"]},
                    {name:"Splash Damage Reduction",
                    type: [{splashDmgReduction: true}],
                    values:["+12%", "+21%", "+28%", "+35%", "+40%"]}]}),
    new NormalSkill('assets/images/amara/skills/Samsara.png', [1, 1], 3, 5, "green",
                  {name:"SAMSARA", 
                  description:"Whenever Amara deals damage to an enemy with her Action Skill, " + 
                  "she adds a stack of Samsara. For every stack of Samsara, Amara gains " + 
                  "increased Gun Damage and Health Regeneration for a few seconds. Stacks decay after a few seconds.",
                  effects:[
                    {name:"Gun Damage",
                    type: [{gunDmg: true}],
                    conditional: this.getExtraCond().samsaraStacks,
                    getActiveValueMulti: () => {
                      return this.getExtraCond().samsaraStacks.currentValue;
                    },
                    values:["+1.7% per enemy damaged", "+3.3% per enemy damaged", "+5.0% per enemy damaged"]},
                    {name:"Health Regeneration",
                    type: [{healthRegen_maxHealth: true}],
                    conditional: this.getExtraCond().samsaraStacks,
                    getActiveValueMulti: () => {
                      return this.getExtraCond().samsaraStacks.currentValue;
                    },
                    values:["+1.7% of Max Health / sec. per stack", "+3.3% of Max Health / sec. per stack", "+5.0% of Max Health / sec. per stack"]},
                    {name:"Max Samsara Stacks",
                    type: [{extraType: this.getExtraTypes().maxSamsaraStacks}],
                    value: 5},
                    {name:"Duration",
                    value: "20 seconds"}]}),
    new NormalSkill('assets/images/amara/skills/HelpingHands.png', [1, 2], 5, 5, "green",
                  {name:"HELPING HAND(S)", 
                  description:"For a few seconds after using her Action Skill, " + 
                  "Amara's arms remain active and grant her Damage Reduction.",
                  effects:[
                    {name:"Damage Reduction",
                    type: [{dmgReduction: true}],
                    conditional: this.getConditionals().usedActionSkill,
                    values:["+12.0%", "+21.0%", "+28.0%", "+35.0%", "+40.0%"]},
                    {name:"Duration",
                    value:"20 Seconds"}]}),
    new NormalSkill('assets/images/amara/skills/Mindfulness.png', [2, 0], 3, 10, "green",
                  {name:"MINDFULNESS", 
                  description:"Whenever Amara takes damage, she gains a stack of " + 
                  "Mindfulness. For every stack of Mindfulness, Amara " + 
                  "gains improved Shield Regeneration Delay and Movement " + 
                  "Speed. Stacks decay after a few seconds.",
                  effects:[
                    {name:"Shield Regeneration Delay",
                    type: [{shieldRegenDelay: true}],
                    conditional: this.getExtraCond().mindfulnessStacks,
                    getActiveValueMulti: () => {
                      return this.getExtraCond().mindfulnessStacks.currentValue;
                    },
                    values:["-9.0%", "-17.0%", "-23.0%"]},
                    {name:"Movement Speed",
                    type: [{movementSpeed: true}],
                    conditional: this.getExtraCond().mindfulnessStacks,
                    getActiveValueMulti: () => {
                      return this.getExtraCond().mindfulnessStacks.currentValue;
                    },
                    values:["1.4%", "2.8%", "4.2%"]},
                    {name: "Max Mindfulness Stacks",
                    type: [{extraType: this.getExtraTypes().maxMindfulnessStacks}],
                    value: 25},
                    {name: "Duration",
                    value: "5 seconds"}]}),
    new NormalSkill('assets/images/amara/skills/FindYourCenter.png', [2, 1], 1, 10, "green",
                  {name:"FIND YOUR CENTER", 
                  description:"Amara gains increased Melee Damage.<br /><br />" +
                  "Additionally, for a few seconds after using her Action Skill, Amara gains increased Melee Range.",
                  effects:[
                    {name:"Melee Damage",
                    type: [{meleeDmg: true}],
                    conditional: this.getConditionals().usedActionSkill,
                    value:"+100%"},
                    {name:"Duration",
                    value:"20 seconds"},
                    {name:"Melee Range",
                    value:"+75%"}]}),
    new NormalSkill('assets/images/amara/skills/Vigor.png', [2, 2], 3, 10, "green",
                  {name:"VIGOR", 
                  description:"Kill Skill. Killing an enemy with Amara's Action Skill " + 
                  "grants all allies increased Movement Speed for a few seconds.",
                    effects:[
                    {name:"Team Movement Speed",
                    type: [{movementSpeed: true}],
                    conditional: this.getConditionals().activateKillSkills,
                    values:["+3.3%", "+6.7%", "+10.0%"]},
                    {name:"Duration",
                    value: "8 seconds"}]}),
    new NormalSkill('assets/images/amara/skills/OneWithNature.png', [3, 1], 5, 15, "green",
                  {name:"One With Nature", 
                  description:"Amara gains increased Max Health and Elemental " + 
                  "Damage Resistance to her Action Skill Element.",
                  effects:[
                    {name:"Max Health",
                    type: [{maxHealth: true}],
                    values:["+5.0%", "+10.0%", "+15.0%", "+20.0%", "+25.0%"]},
                    {name:"Elemental Damage Reduction",
                    type: [{elementalDmgReduction: true}],
                    values: ["+12.0%", "+21.0%", "+28.0%", "+35.0%", "+40.0%"]}]}),
    new NormalSkill('assets/images/amara/skills/DoUntoOthers.png', [4, 0], 1, 20, "green",
                  {name:"DO UNTO OTHERS", 
                  description:"Whenever an enemy damages Amara, she automatically " + 
                  "throws an energy orb back at them, dealing Action " + 
                  "Skill Elemental Damage. This skill has a short cooldown.",
                  effects:[
                    {name:"Cooldown",
                    value:"8 seconds"}]}),
    new NormalSkill('assets/images/amara/skills/JabCross.png', [4, 1], 5, 20, "green",
                  {name:"JAB CROSS", 
                  description:"Whenever Amara deals melee damage to an enemy, she gains " +
                  "increased Action Skill Damage and increased Gun Damage for a few seconds.",
                  effects:[
                    {name:"Gun Damage",
                    type: [{gunDmg: true}],
                    conditional: this.getConditionals().dealtMeeleDmg,
                    values:["+3%", "+6%", "+9%", "+12%", "+15%"]},
                    {name:"Action Skill Damage",
                    type: [{actionSkillDmg: true}],
                    conditional: this.getConditionals().dealtMeeleDmg,
                    values:["+15%", "+30%", "+45%", "+60%", "+75%"]},
                    {name: "Duration",
                    value: "10 seconds"}]}),
    new NormalSkill('assets/images/amara/skills/GuardianAngel.png', [4, 2], 1, 20, "green",
                  {name:"GUARDIAN ANGEL", 
                  description:"When Amara enters Fight For Your Life, she immediately gains a " +
                  "Second Wind, restores her health, and creates an Action Skill Elemental " +
                  "Nova that may knock back nearby enemies. This skill has a long cooldown.",
                  effects:[
                    {name:"Max Health Restored",
                    value:"50% of Max Health"},
                    {name:"Cooldown",
                    value:"120 seconds"}]}),
    new NormalSkill('assets/images/amara/skills/Blitz.png', [5, 1], 1, 25, "green",
                  {name:"BLITZ", 
                  description:"Melee Override. Press V while aiming at an enemy to make Amara dash " + 
                  "a short distance forward and perform a special melee strike, " + 
                  "dealing Elemental Melee Damage.<br /><br />" +
                  "If a Blitz melee attack kills an enemy, Blitz's cooldown is immediately reset.",
                  effects:[
                    {name:"Melee Damage",
                    type: [{meleeDmg: true}],
                    value:"+100%"},
                    {name: "Cooldown",
                    value:"8 seconds"}]})
  ]

  constructor(maxActionSkillPoints: number, maxActionModPoints: number, maxOtherSkillPoints: number) {
    super(maxActionSkillPoints, maxActionModPoints, maxOtherSkillPoints);
    this.addPoint(this.shockra);
    
  }

  /**
   * Adds point into a specific skill type allocation
   * 
   * @param skill 
   *              Skill to be allocated
   */
  addPoint(skill: Skill) {

     //If the skill is already in the array then don't add it
     if (!this.getAllocatedSkills().includes(skill)) {
      this.getAllocatedSkills().push(skill);
     }

    //Increment allocation of normal skills if skill is normal
    if (skill instanceof NormalSkill) this.setAllocatedNormalSkillPoints(this.getAllocatedNormalSkillPoints() + 1);


    //Action skill
    if (skill instanceof ActionSkill) {

      //Check to see if an action skill is allocated already
      //If there is remove a point from its allocation and remove it from equipped skills
      if (this.getEquippedSkills()[0].actionSkill != skill && this.getEquippedSkills()[0].actionSkill != null)  {
        this.getEquippedSkills()[0].actionSkill.removePoint();
        this.removePoint(this.getEquippedSkills()[0].actionSkill);
      } 

      //Add action skill to equipped skills
      this.getEquippedSkills()[0].actionSkill = skill;
    } 

    //Action mod
    if (skill instanceof ActionMod) {
      
      //Check to see if an action mod is allocated already
      //If there is remove a point from its allocation and remove it from equipped skills
      if (this.getEquippedSkills()[0].actionMods[0] != skill && this.getEquippedSkills()[0].actionMods[0] != null)  {
        this.getEquippedSkills()[0].actionMods[0].removePoint();
        this.removePoint(this.getEquippedSkills()[0].actionMods[0]);
      } 

      //Add action mod to equipped skills action mod array
      this.getEquippedSkills()[0].actionMods[0] = skill;
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
  }

  /**
   * removes point from a specific skill type allocation
   * 
   * @param skill
   *              skill to be removed
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
      this.getEquippedSkills()[0].actionMods.splice(index, 1)
    }

    //Remove other skill from equipped skills
    if (skill instanceof OtherSkill) {
      this.getEquippedSkills()[0].otherSkill = this.shockra;
    } 
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
   *           any
   */
  getExtraCond(): any {
    return this.extraConditionals;
  }

  /**
   * Returns the extra stat types for amara
   * 
   * @returns
   *           any
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
