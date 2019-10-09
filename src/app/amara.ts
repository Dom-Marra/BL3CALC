import { Skill } from './skill';
import { NormalSkill } from './normalskill';
import { OtherSkill } from './otherskill';
import { ActionSkill } from './actionskill';
import { ActionMod } from './actionmod';
import { Character } from './character'

export class Amara implements Character {

  //Path for red tree header image
  public readonly redTreeHeader: string = "assets/images/amara/RedTreeHeader.png";

  //Path for blue tree header imag
  public readonly blueTreeHeader: string = "assets/images/amara/BlueTreeHeader.png";

  //Path for green tree header image
  public readonly greenTreeHeader: string = "assets/images/amara/GreenTreeHeader.png";

  //Skills for red skill tree

  //Action skills
  private readonly phaseGrasp = new ActionSkill('assets/images/amara/skills/PhaseGrasp.png', [-1, 1], 1, 0, "red");
  private readonly theEternalFists = new ActionSkill('assets/images/amara/skills/TheEternalFists.png', [2, -1], 1, 10, "red");
  private readonly tiesThatBind = new ActionSkill('assets/images/amara/skills/TiesThatBind.png', [3, 3], 1, 15, "red");
  private readonly fistOverMatter = new ActionSkill('assets/images/amara/skills/FistOverMatter.png', [4, -1], 1, 20, "red");

  //Action Mods
  private readonly soulFire = new OtherSkill('assets/images/amara/skills/SoulFire.png', [1, 3], 1, 5, "red");
  private readonly allure = new ActionMod('assets/images/amara/skills/Allure.png', [2, 3], 1, 10, "red");


  //skills list
  private readonly redSkills = [
    this.phaseGrasp,
    this.theEternalFists,
    this.tiesThatBind,
    this.fistOverMatter,
    this.soulFire,
    this.allure, //BELOW HERE IS NORMAL SKILLS
    new NormalSkill('assets/images/amara/skills/Anima.png', [0, 0], 5, 0, "red"),
    new NormalSkill('assets/images/amara/skills/SteadyHands.png', [0, 1], 3, 0, "red"),
    new NormalSkill('assets/images/amara/skills/Infusion.png', [0, 2], 5, 0, "red"),
    new NormalSkill('assets/images/amara/skills/Tempest.png', [1, 0], 5, 5, "red"),
    new NormalSkill('assets/images/amara/skills/IlluminatedFist.png', [1, 1], 1, 5, "red"),
    new NormalSkill('assets/images/amara/skills/Wildfire.png', [1, 2], 5, 5, "red"),
    new NormalSkill('assets/images/amara/skills/Dread.png', [2, 1], 1, 10, "red"),
    new NormalSkill('assets/images/amara/skills/Indiscriminate.png', [3, 0], 3, 15, "red"),
    new NormalSkill('assets/images/amara/skills/DeepWell.png', [3, 1], 1, 15, "red"),
    new NormalSkill('assets/images/amara/skills/Catharsis.png', [3, 2], 3, 15, "red"),
    new NormalSkill('assets/images/amara/skills/Sustainment.png', [4, 0], 5, 20, "red"),
    new NormalSkill('assets/images/amara/skills/Conflux.png', [4, 2], 5, 20, "red"),
    new NormalSkill('assets/images/amara/skills/ForcefulExpression.png', [5, 1], 1, 25, "red")
  ]
  
  //Skills for blue skill tree

  //Action skills
  private readonly phaseCast = new ActionSkill('assets/images/amara/skills/PhaseCast.png', [-1, 1], 1, 0, "blue");
  private readonly deliverance = new ActionSkill('assets/images/amara/skills/Deliverance.png', [2, -1], 1, 10, "blue");
  private readonly reverberation = new ActionSkill('assets/images/amara/skills/Reverberation.png', [3, -1], 1, 15, "blue");
  private readonly tandava = new ActionSkill('assets/images/amara/skills/Tandava.png', [4, 3], 1, 20, "blue");

  //Action Mods 
  private readonly soulSap = new ActionMod('assets/images/amara/skills/SoulSap.png', [1, 3], 1, 5, "blue");
  private readonly stillnessOfMind = new ActionMod('assets/images/amara/skills/StillnessOfMind.png', [2, 3], 1, 10, "blue");

  //skills list
  private readonly blueSkills = [
    this.phaseCast,
    this.deliverance,
    this.reverberation,
    this.tandava,
    this.soulSap,
    this.stillnessOfMind, //BELOW HERE IS NORMAL SKILLS
    new NormalSkill('assets/images/amara/skills/DoHarm.png', [0, 0], 5, 0, "blue"),
    new NormalSkill('assets/images/amara/skills/FastHands.png', [0, 1], 3, 0, "blue"),
    new NormalSkill('assets/images/amara/skills/ViolentTapestry.png', [0, 2], 5, 0, "blue"),
    new NormalSkill('assets/images/amara/skills/Alacrity.png', [1, 0], 5, 5, "blue"),
    new NormalSkill('assets/images/amara/skills/Transcend.png', [1, 1], 3, 5, "blue"),
    new NormalSkill('assets/images/amara/skills/Restless.png', [1, 2], 5, 5, "blue"),
    new NormalSkill('assets/images/amara/skills/Ascendant.png', [2, 1], 1, 10, "blue"),
    new NormalSkill('assets/images/amara/skills/FromRest.png', [3, 0], 3, 15, "blue"),
    new NormalSkill('assets/images/amara/skills/LaidBare.png', [3, 1], 3, 15, "blue"),
    new NormalSkill('assets/images/amara/skills/Wrath.png', [3, 2], 3, 15, "blue"),
    new NormalSkill('assets/images/amara/skills/Remnant.png', [4, 0], 3, 20, "blue"),
    new NormalSkill('assets/images/amara/skills/Awakening.png', [4, 2], 3, 20, "blue"),
    new NormalSkill('assets/images/amara/skills/Avatar.png', [5, 1], 1, 25, "blue")
  ]

  //Skills for green skill tree

  //Action skills
  private readonly phaseSlam = new ActionSkill('assets/images/amara/skills/PhaseSlam.png', [-1, 1], 1, 0, "green");
  private readonly fracture = new ActionSkill('assets/images/amara/skills/Fracture.png', [2, -1], 1, 10, "green");
  private readonly downFall = new ActionSkill('assets/images/amara/skills/Downfall.png', [3, -1], 1, 15, "green");

  //Action mods
  private readonly blightTiger = new OtherSkill('assets/images/amara/skills/BlightTiger.png', [1, 3], 1, 5, "green");
  private readonly revelation = new ActionMod('assets/images/amara/skills/Revelation.png', [2, 3], 1, 10, "green");
  private readonly glamour = new ActionMod('assets/images/amara/skills/Glamour.png', [4, 3], 1, 20, "green");
  
  //skills list
  private readonly greenSkills = [
    this.phaseSlam,
    this.fracture,
    this.downFall,
    this.blightTiger,
    this.revelation,
    this.glamour, //BELOW HERE IS NORMAL SKILLS
    new NormalSkill('assets/images/amara/skills/RootToRise.png', [0, 0], 5, 0, "green"),
    new NormalSkill('assets/images/amara/skills/PersonalSpace.png', [0, 1], 3, 0, "green"),
    new NormalSkill('assets/images/amara/skills/Clarity.png', [0, 2], 5, 0, "green"),
    new NormalSkill('assets/images/amara/skills/ArmsDeal.png', [1, 0], 5, 5, "green"),
    new NormalSkill('assets/images/amara/skills/Samsara.png', [1, 1], 3, 5, "green"),
    new NormalSkill('assets/images/amara/skills/HelpingHands.png', [1, 2], 5, 5, "green"),
    new NormalSkill('assets/images/amara/skills/Mindfulness.png', [2, 0], 3, 10, "green"),
    new NormalSkill('assets/images/amara/skills/FindYourCenter.png', [2, 1], 1, 10, "green"),
    new NormalSkill('assets/images/amara/skills/Vigor.png', [2, 2], 3, 10, "green"),
    new NormalSkill('assets/images/amara/skills/OneWithNature.png', [3, 1], 5, 15, "green"),
    new NormalSkill('assets/images/amara/skills/DoUntoOthers.png', [4, 0], 1, 20, "green"),
    new NormalSkill('assets/images/amara/skills/JabCross.png', [4, 1], 5, 20, "green"),
    new NormalSkill('assets/images/amara/skills/GuardianAngel.png', [4, 2], 1, 20, "green"),
    new NormalSkill('assets/images/amara/skills/Blitz.png', [5, 1], 1, 25, "green")
  ]

  public readonly MAX_NORMAL_SKILL_POINTS = 48;         //Max points that can be allocated for normal skills
  public readonly MAX_ACTION_SKILL_POINTS = 1;          //Max points that can be allocated for action skills
  public readonly MAX_ACTION_MOD_POINTS = 1;            //Max points that can be allocated for action mods
  public readonly MAX_OTHER_SKILL_POINTS = 1;           //Max points that can be allocated for other skills
  public readonly MIN_POINTS = 0;                       //Min points that can be allocated

  private allocatedNormalSkillPoints = 0;              //number of points allocated in normal skills
  private allocatedActionSkillPoints = 0;              //number of points allocated in action skills
  private allocatedActionModPoints = 0;                //number of points allocated in action mods
  private allocatedOtherSkillPoints = 0;               //number of points allocated in other skills

  private actionSkills: Array<ActionSkill> = [];       //Action skills that have been allocated
  private actionMods: Array<Array<Skill>> = [];      //Action mods that have been allocated, and their respective action skill mapped to it (if any)
  private otherSkills: Array<OtherSkill> = [];         //Other skills that have been allocated

   /**
   * Checks if the character can have a point added or removed from it
   * 
   * @param modification
   *              number of points to add or remove from this character
   *              this should be 1 or -1, other numbers will not work
   * 
   * @returns 
   *        Boolean whether the allocated points can be modified or not
   */
  validateModification = (modification: number, skill: Skill) => {

    //Invalid number return false
    if (modification < -1 || modification > 1 || modification == 0) return false;

    //At max points and modification is addition return false
    if (((this.allocatedNormalSkillPoints == this.MAX_NORMAL_SKILL_POINTS && skill instanceof NormalSkill)
      || (this.allocatedActionSkillPoints == this.MAX_ACTION_SKILL_POINTS && skill instanceof ActionSkill)
      || (this.allocatedActionModPoints == this.MAX_ACTION_MOD_POINTS && skill instanceof ActionMod)
      || (this.allocatedOtherSkillPoints == this.MAX_OTHER_SKILL_POINTS && skill instanceof OtherSkill))
       && modification > 0) return false;

    //At min points and modification is subtraction return false
    if (((this.allocatedNormalSkillPoints == this.MIN_POINTS && skill instanceof NormalSkill) 
      || (this.allocatedActionSkillPoints == this.MIN_POINTS && skill instanceof ActionSkill) 
      || (this.allocatedActionModPoints == this.MIN_POINTS && skill instanceof ActionMod)
      || (this.allocatedOtherSkillPoints == this.MIN_POINTS && skill instanceof OtherSkill))
      && modification < 0) return false;

    //modification successful
    return true;
  }

 
  /**
   * Adds point into a specific skill type allocation
   * 
   * @param skill 
   *              Skill to be allocated
   */
  addPoint(skill: Skill): boolean {

    //Increment allocation of normal skills if skill is normal
    if (skill instanceof NormalSkill) this.allocatedNormalSkillPoints++;


    //Increment allocation of action skills if skill is action skill
    //Add action skill to action skill array
    if (skill instanceof ActionSkill) {
      this.allocatedActionSkillPoints++;
      this.actionSkills.push(skill);
    } 

    //Increment allocation of action mod if skill is action mod
    //Add action mod to action mod array
    if (skill instanceof ActionMod) {
      this.actionMods.push([skill.getRequiredActionSkill(), skill]);
      this.allocatedActionModPoints++;
    }

    //Increment allocation of other skill if skill is other skill
    //Add other skill to other skill array
    if (skill instanceof OtherSkill) {
      this.otherSkills.push(skill);
      this.allocatedOtherSkillPoints++
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
    if (skill instanceof NormalSkill) this.allocatedNormalSkillPoints--;

    //Reduce action skill allocation if the skill type is action 
    //remove action skill from action skill array
    if (skill instanceof ActionSkill)  {
      var index = this.actionSkills.indexOf(skill);
      this.allocatedActionSkillPoints--;
      this.actionSkills.splice(index, 1);
    } 

    //Reduce action mod allocation if the skill type is action mod
    //Remove action mod from action mod array
    if (skill instanceof ActionMod) {
      var index = this.actionMods.indexOf([skill.getRequiredActionSkill(), skill]);
      this.actionMods.splice(index, 1)
      this.allocatedActionModPoints--;
    }

    //Reduce other skill allocation if the skill type is other
    //Remove other skill from other skill array 
    if (skill instanceof OtherSkill) {
       var index = this.otherSkills.indexOf(skill);
       this.otherSkills.splice(index, 1);
       this.allocatedOtherSkillPoints--;
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
      return this.blueSkills
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
   * Retrieves number of allocated points of normal skills 
   * 
   * @returns
   *          number
   */
  getAllocatedPoints(): number {
      return this.allocatedNormalSkillPoints;
  }

  /**
   * Retruns the allocated action skills
   * 
   * @returns
   *          Array<ActionSkill>
   */
  getActionSkills(): Array<ActionSkill> {
    return this.actionSkills;
  }

  /**
   * Returns the allocated action mods mapped to their respective action skill (if any)
   * 
   * @returns
   *         Array<Array<Skill>>
   */
  getActionMods(): Array<Array<Skill>> {
    return this.actionMods;
  }

  /**
   * Retruns the allocated other skills
   * 
   * @returns
   *          Array<OtherSkill>
   */
  getOtherSkills(): Array<OtherSkill> {
    return this.otherSkills;
  }

}
