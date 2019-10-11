import { Skill } from './skill';
import { NormalSkill } from './normalskill';
import { OtherSkill } from './otherskill';
import { ActionSkill } from './actionskill';
import { ActionMod } from './actionmod';
import { Character } from './character'

export class Amara extends Character {

  //Path for red tree header image
  public readonly RED_TREE_HEADER: string = "assets/images/amara/RedTreeHeader.webp";
  public readonly RED_TREE_NAME: string = "Fist of the Elements";

  //Path for blue tree header image
  public readonly BLUE_TREE_HEADER: string = "assets/images/amara/BlueTreeHeader.webp";
  public readonly BLUE_TREE_NAME: string = "Mystic Assualt";

  //Path for green tree header image
  public readonly GREEN_TREE_HEADER: string = "assets/images/amara/GreenTreeHeader.webp";
  public readonly GREEN_TREE_NAME: string = "Brawl";

  //Skills for red skill tree

  //Action skills
  private readonly PHASE_GRASP = new ActionSkill('assets/images/amara/skills/PhaseGrasp.webp', [-1, 1], 1, 0, "red");
  private readonly THE_ETERNAL_FISTS = new ActionSkill('assets/images/amara/skills/TheEternalFists.webp', [2, -1], 1, 10, "red");
  private readonly TIES_THAT_BIND = new ActionSkill('assets/images/amara/skills/TiesThatBind.webp', [3, 3], 1, 15, "red");
  private readonly FIST_OVER_MATTER = new ActionSkill('assets/images/amara/skills/FistOverMatter.webp', [4, -1], 1, 20, "red");

  //Action Mods
  private readonly SOUL_FIRE = new OtherSkill('assets/images/amara/skills/SoulFire.webp', [1, 3], 1, 5, "red");
  private readonly ALLURE = new ActionMod('assets/images/amara/skills/Allure.webp', [2, 3], 1, 10, "red");


  //skills list
  private readonly RED_SKILLS = [
    this.PHASE_GRASP,
    this.THE_ETERNAL_FISTS,
    this.TIES_THAT_BIND,
    this.FIST_OVER_MATTER,
    this.SOUL_FIRE,
    this.ALLURE, //BELOW HERE IS NORMAL SKILLS
    new NormalSkill('assets/images/amara/skills/Anima.webp', [0, 0], 5, 0, "red"),
    new NormalSkill('assets/images/amara/skills/SteadyHands.webp', [0, 1], 3, 0, "red"),
    new NormalSkill('assets/images/amara/skills/Infusion.webp', [0, 2], 5, 0, "red"),
    new NormalSkill('assets/images/amara/skills/Tempest.webp', [1, 0], 5, 5, "red"),
    new NormalSkill('assets/images/amara/skills/IlluminatedFist.webp', [1, 1], 1, 5, "red"),
    new NormalSkill('assets/images/amara/skills/Wildfire.webp', [1, 2], 5, 5, "red"),
    new NormalSkill('assets/images/amara/skills/Dread.webp', [2, 1], 1, 10, "red"),
    new NormalSkill('assets/images/amara/skills/Indiscriminate.webp', [3, 0], 3, 15, "red"),
    new NormalSkill('assets/images/amara/skills/DeepWell.webp', [3, 1], 1, 15, "red"),
    new NormalSkill('assets/images/amara/skills/Catharsis.webp', [3, 2], 3, 15, "red"),
    new NormalSkill('assets/images/amara/skills/Sustainment.webp', [4, 0], 5, 20, "red"),
    new NormalSkill('assets/images/amara/skills/Conflux.webp', [4, 2], 5, 20, "red"),
    new NormalSkill('assets/images/amara/skills/ForcefulExpression.webp', [5, 1], 1, 25, "red")
  ]
  
  //Skills for blue skill tree

  //Action skills
  private readonly PHASE_CAST = new ActionSkill('assets/images/amara/skills/PhaseCast.webp', [-1, 1], 1, 0, "blue");
  private readonly DELIVERANCE = new ActionSkill('assets/images/amara/skills/Deliverance.webp', [2, -1], 1, 10, "blue");
  private readonly REVERBERATION = new ActionSkill('assets/images/amara/skills/Reverberation.webp', [3, -1], 1, 15, "blue");
  private readonly TANDAVA = new ActionSkill('assets/images/amara/skills/Tandava.webp', [4, 3], 1, 20, "blue");

  //Action Mods 
  private readonly SOUL_SAP = new ActionMod('assets/images/amara/skills/SoulSap.webp', [1, 3], 1, 5, "blue");
  private readonly STILLNESS_OF_MIND = new ActionMod('assets/images/amara/skills/StillnessOfMind.webp', [2, 3], 1, 10, "blue");

  //skills list
  private readonly BLUE_SKILLS = [
    this.PHASE_CAST,
    this.DELIVERANCE,
    this.REVERBERATION,
    this.TANDAVA,
    this.SOUL_SAP,
    this.STILLNESS_OF_MIND, //BELOW HERE IS NORMAL SKILLS
    new NormalSkill('assets/images/amara/skills/DoHarm.webp', [0, 0], 5, 0, "blue"),
    new NormalSkill('assets/images/amara/skills/FastHands.webp', [0, 1], 3, 0, "blue"),
    new NormalSkill('assets/images/amara/skills/ViolentTapestry.webp', [0, 2], 5, 0, "blue"),
    new NormalSkill('assets/images/amara/skills/Alacrity.webp', [1, 0], 5, 5, "blue"),
    new NormalSkill('assets/images/amara/skills/Transcend.webp', [1, 1], 3, 5, "blue"),
    new NormalSkill('assets/images/amara/skills/Restless.webp', [1, 2], 5, 5, "blue"),
    new NormalSkill('assets/images/amara/skills/Ascendant.webp', [2, 1], 1, 10, "blue"),
    new NormalSkill('assets/images/amara/skills/FromRest.webp', [3, 0], 3, 15, "blue"),
    new NormalSkill('assets/images/amara/skills/LaidBare.webp', [3, 1], 3, 15, "blue"),
    new NormalSkill('assets/images/amara/skills/Wrath.webp', [3, 2], 3, 15, "blue"),
    new NormalSkill('assets/images/amara/skills/Remnant.webp', [4, 0], 3, 20, "blue"),
    new NormalSkill('assets/images/amara/skills/Awakening.webp', [4, 2], 3, 20, "blue"),
    new NormalSkill('assets/images/amara/skills/Avatar.webp', [5, 1], 1, 25, "blue")
  ]

  //Skills for green skill tree

  //Action skills
  private readonly PHASE_SLAM = new ActionSkill('assets/images/amara/skills/PhaseSlam.webp', [-1, 1], 1, 0, "green");
  private readonly FRACTURE = new ActionSkill('assets/images/amara/skills/Fracture.webp', [2, -1], 1, 10, "green");
  private readonly DOWNFALL = new ActionSkill('assets/images/amara/skills/Downfall.webp', [3, -1], 1, 15, "green");

  //Action mods
  private readonly BLIGHT_TIGER = new OtherSkill('assets/images/amara/skills/BlightTiger.webp', [1, 3], 1, 5, "green");
  private readonly REVELATION = new ActionMod('assets/images/amara/skills/Revelation.webp', [2, 3], 1, 10, "green");
  private readonly GLAMOUR = new ActionMod('assets/images/amara/skills/Glamour.webp', [4, 3], 1, 20, "green");
  
  //skills list
  private readonly GREEN_SKILLS = [
    this.PHASE_SLAM,
    this.FRACTURE,
    this.DOWNFALL,
    this.BLIGHT_TIGER,
    this.REVELATION,
    this.GLAMOUR, //BELOW HERE IS NORMAL SKILLS
    new NormalSkill('assets/images/amara/skills/RootToRise.webp', [0, 0], 5, 0, "green"),
    new NormalSkill('assets/images/amara/skills/PersonalSpace.webp', [0, 1], 3, 0, "green"),
    new NormalSkill('assets/images/amara/skills/Clarity.webp', [0, 2], 5, 0, "green"),
    new NormalSkill('assets/images/amara/skills/ArmsDeal.webp', [1, 0], 5, 5, "green"),
    new NormalSkill('assets/images/amara/skills/Samsara.webp', [1, 1], 3, 5, "green"),
    new NormalSkill('assets/images/amara/skills/HelpingHands.webp', [1, 2], 5, 5, "green"),
    new NormalSkill('assets/images/amara/skills/Mindfulness.webp', [2, 0], 3, 10, "green"),
    new NormalSkill('assets/images/amara/skills/FindYourCenter.webp', [2, 1], 1, 10, "green"),
    new NormalSkill('assets/images/amara/skills/Vigor.webp', [2, 2], 3, 10, "green"),
    new NormalSkill('assets/images/amara/skills/OneWithNature.webp', [3, 1], 5, 15, "green"),
    new NormalSkill('assets/images/amara/skills/DoUntoOthers.webp', [4, 0], 1, 20, "green"),
    new NormalSkill('assets/images/amara/skills/JabCross.webp', [4, 1], 5, 20, "green"),
    new NormalSkill('assets/images/amara/skills/GuardianAngel.webp', [4, 2], 1, 20, "green"),
    new NormalSkill('assets/images/amara/skills/Blitz.webp', [5, 1], 1, 25, "green")
  ]

  constructor(maxActionSkillPoints: number, maxActionModPoints: number, maxOtherSkillPoints: number) {
    super(maxActionSkillPoints, maxActionModPoints, maxOtherSkillPoints);
}
  
 
  /**
   * Adds point into a specific skill type allocation
   * 
   * @param skill 
   *              Skill to be allocated
   */
  addPoint(skill: Skill): boolean {

    //Increment allocation of normal skills if skill is normal
    if (skill instanceof NormalSkill) this.setAllocatedNormalSkillPoints(this.getAllocatedNormalSkillPoints() + 1);


    //Increment allocation of action skills if skill is action skill
    //Add action skill to action skill array
    if (skill instanceof ActionSkill) {
      this.setAllocatedActionSkillPoints(this.getAllocatedActionSkillPoints() + 1);
      this.getActionSkills().push(skill);
    } 

    //Increment allocation of action mod if skill is action mod
    //Add action mod to action mod array
    if (skill instanceof ActionMod) {
      this.setAllocatedActionModPoints(this.getAllocatedActionModPoints() + 1);
      this.getActionMods().push([skill.getRequiredActionSkill(), skill]);
    }

    //Increment allocation of other skill if skill is other skill
    //Add other skill to other skill array
    if (skill instanceof OtherSkill) {
      this.setAllocatedOtherSkillPoints(this.getAllocatedOtherSkillPoints() + 1);
      this.getOtherSkills().push(skill);
    };
    
    return true;
  }

  /**
   * removes point from a specific skill type allocation
   * 
   * @param skill
   *              skill to be removed
   */
  removePoint(skill: Skill) {

    //Reduce normal skill allocation if the skill type is normal
    if (skill instanceof NormalSkill) this.setAllocatedNormalSkillPoints(this.getAllocatedNormalSkillPoints() - 1);

    //Reduce action skill allocation if the skill type is action 
    //remove action skill from action skill array
    if (skill instanceof ActionSkill)  {
      this.setAllocatedActionSkillPoints(this.getAllocatedActionSkillPoints() - 1);
      var index = this.getActionSkills().indexOf(skill);
      this.getActionSkills().splice(index, 1);
    } 

    //Reduce action mod allocation if the skill type is action mod
    //Remove action mod from action mod array
    if (skill instanceof ActionMod) {
      this.setAllocatedActionModPoints(this.getAllocatedActionModPoints() - 1);
      var index = this.getActionMods().indexOf([skill.getRequiredActionSkill(), skill]);
      this.getActionMods().splice(index, 1)
    }

    //Reduce other skill allocation if the skill type is other
    //Remove other skill from other skill array 
    if (skill instanceof OtherSkill) {
      this.setAllocatedOtherSkillPoints(this.getAllocatedOtherSkillPoints() - 1);
       var index = this.getOtherSkills().indexOf(skill);
       this.getOtherSkills().splice(index, 1);
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
      return this.BLUE_SKILLS;
  }
  
  /**
   * Retrieves skills that belong to the red tree
   * 
   * @returns
   *          Array
   */
  getRedSkills(): Skill[] {
      return this.RED_SKILLS;
  }

  /**
   * Retrieves skills that belong to the green tree
   * 
   * @returns
   *          Array
   */
  getGreenSkills(): Skill[] {
      return this.GREEN_SKILLS;
  }

}
