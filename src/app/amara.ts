import { Skill } from './skill';
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
  private readonly phaseGrasp = new Skill('assets/images/amara/skills/PhaseGrasp.png', [-1, 1], 1, 0, 1);
  private readonly theEternalFists = new Skill('assets/images/amara/skills/TheEternalFists.png', [2, -1], 1, 10, 1);
  private readonly tiesThatBind = new Skill('assets/images/amara/skills/TiesThatBind.png', [3, 3], 1, 15, 1);
  private readonly fistOverMatter = new Skill('assets/images/amara/skills/FistOverMatter.png', [4, -1], 1, 20, 1);

  //Action Mods
  private readonly soulFire = new Skill('assets/images/amara/skills/SoulFire.png', [1, 3], 1, 5, 3);
  private readonly allure = new Skill('assets/images/amara/skills/Allure.png', [2, 3], 1, 10, 2);


  //skills list
  private readonly redSkills = [
    this.phaseGrasp,
    this.theEternalFists,
    this.tiesThatBind,
    this.fistOverMatter,
    this.soulFire,
    this.allure,
    new Skill('assets/images/amara/skills/Anima.png', [0, 0], 5, 0),
    new Skill('assets/images/amara/skills/SteadyHands.png', [0, 1], 3, 0),
    new Skill('assets/images/amara/skills/Infusion.png', [0, 2], 5, 0),
    new Skill('assets/images/amara/skills/Tempest.png', [1, 0], 5, 5),
    new Skill('assets/images/amara/skills/IlluminatedFist.png', [1, 1], 1, 5),
    new Skill('assets/images/amara/skills/Wildfire.png', [1, 2], 5, 5),
    new Skill('assets/images/amara/skills/Dread.png', [2, 1], 1, 10),
    new Skill('assets/images/amara/skills/Indiscriminate.png', [3, 0], 3, 15),
    new Skill('assets/images/amara/skills/DeepWell.png', [3, 1], 1, 15),
    new Skill('assets/images/amara/skills/Catharsis.png', [3, 2], 3, 15),
    new Skill('assets/images/amara/skills/Sustainment.png', [4, 0], 5, 20),
    new Skill('assets/images/amara/skills/Conflux.png', [4, 2], 5, 20),
    new Skill('assets/images/amara/skills/ForcefulExpression.png', [5, 1], 1, 25)
  ]
  
  //Skills for blue skill tree

  //Action skills
  private readonly phaseCast = new Skill('assets/images/amara/skills/PhaseCast.png', [-1, 1], 1, 0, 1);
  private readonly deliverance = new Skill('assets/images/amara/skills/Deliverance.png', [2, -1], 1, 10, 1);
  private readonly reverberation = new Skill('assets/images/amara/skills/Reverberation.png', [3, -1], 1, 15, 1);
  private readonly tandava = new Skill('assets/images/amara/skills/Tandava.png', [4, 3], 1, 20, 1);

  //Action Mods
  private readonly soulSap = new Skill('assets/images/amara/skills/SoulSap.png', [1, 3], 1, 5, 2);
  private readonly stillnessOfMind = new Skill('assets/images/amara/skills/StillnessOfMind.png', [2, 3], 1, 10, 2);

  //skills list
  private readonly blueSkills = [
    this.phaseCast,
    this.deliverance,
    this.reverberation,
    this.tandava,
    this.soulSap,
    this.stillnessOfMind,
    new Skill('assets/images/amara/skills/DoHarm.png', [0, 0], 5, 0),
    new Skill('assets/images/amara/skills/FastHands.png', [0, 1], 3, 0),
    new Skill('assets/images/amara/skills/ViolentTapestry.png', [0, 2], 5, 0),
    new Skill('assets/images/amara/skills/Alacrity.png', [1, 0], 5, 5),
    new Skill('assets/images/amara/skills/Transcend.png', [1, 1], 3, 5),
    new Skill('assets/images/amara/skills/Restless.png', [1, 2], 5, 5),
    new Skill('assets/images/amara/skills/Ascendant.png', [2, 1], 1, 10),
    new Skill('assets/images/amara/skills/FromRest.png', [3, 0], 3, 15),
    new Skill('assets/images/amara/skills/LaidBare.png', [3, 1], 3, 15),
    new Skill('assets/images/amara/skills/Wrath.png', [3, 2], 3, 15),
    new Skill('assets/images/amara/skills/Remnant.png', [4, 0], 3, 20),
    new Skill('assets/images/amara/skills/Awakening.png', [4, 2], 3, 20),
    new Skill('assets/images/amara/skills/Avatar.png', [5, 1], 1, 25)
  ]

  //Skills for green skill tree

  //Action skills
  private readonly phaseSlam = new Skill('assets/images/amara/skills/PhaseSlam.png', [-1, 1], 1, 0, 1);
  private readonly fracture = new Skill('assets/images/amara/skills/Fracture.png', [2, -1], 1, 10, 1);
  private readonly downFall = new Skill('assets/images/amara/skills/Downfall.png', [3, -1], 1, 15, 1);

  //Action mods
  private readonly blightTiger = new Skill('assets/images/amara/skills/BlightTiger.png', [1, 3], 1, 5, 3);
  private readonly revelation = new Skill('assets/images/amara/skills/Revelation.png', [2, 3], 1, 10, 2);
  private readonly glamour = new Skill('assets/images/amara/skills/Glamour.png', [4, 3], 1, 20, 2);
  
  //skills list
  private readonly greenSkills = [
    this.phaseSlam,
    this.fracture,
    this.downFall,
    this.blightTiger,
    this.revelation,
    this.glamour,
    new Skill('assets/images/amara/skills/RootToRise.png', [0, 0], 5, 0),
    new Skill('assets/images/amara/skills/PersonalSpace.png', [0, 1], 3, 0),
    new Skill('assets/images/amara/skills/Clarity.png', [0, 2], 5, 0),
    new Skill('assets/images/amara/skills/ArmsDeal.png', [1, 0], 5, 5),
    new Skill('assets/images/amara/skills/Samsara.png', [1, 1], 3, 5),
    new Skill('assets/images/amara/skills/HelpingHands.png', [1, 2], 5, 5),
    new Skill('assets/images/amara/skills/Mindfulness.png', [2, 0], 3, 10),
    new Skill('assets/images/amara/skills/FindYourCenter.png', [2, 1], 1, 10),
    new Skill('assets/images/amara/skills/Vigor.png', [2, 2], 3, 10),
    new Skill('assets/images/amara/skills/OneWithNature.png', [3, 1], 5, 15),
    new Skill('assets/images/amara/skills/DoUntoOthers.png', [4, 0], 1, 20),
    new Skill('assets/images/amara/skills/JabCross.png', [4, 1], 5, 20),
    new Skill('assets/images/amara/skills/GuardianAngel.png', [4, 2], 1, 20),
    new Skill('assets/images/amara/skills/Blitz.png', [5, 1], 1, 25)
  ]

  public readonly MAX_POINTS: Array<number> = [48, 1, 1, 1];          //Max points that can be allocated
  public readonly MIN_POINTS = 0;                                     //Min points that can be allocated

  private allocatedPoints: Array<number> = [0, 0, 0, 0];   //number of points allocated

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
  validateModification = (modification: number, skillType: number) => {

    //Invalid number return false
    if (modification < -1 || modification > 1 || modification == 0) return false;

    //At max points and modification is addition return false
    if (this.allocatedPoints[skillType] == this.MAX_POINTS[skillType] && modification > 0) return false;

    //At min points and modification is subtraction return false
    if (this.allocatedPoints[skillType] == this.MIN_POINTS[skillType] && modification < 0) return false;

    //modification successful
    return true;
  }

 
  /**
   * Adds point into a specific skill type allocation
   * 
   * @param skillType
   *              0 = normal skills
   *              1 = action skills
   *              2 = action skill mods
   *              3 = other skills (pets, elementals, etc...)
   */
  addPoint(skillType: number) {
    this.allocatedPoints[skillType]++;
  }

  /**
   * removes point from a specific skill type allocation
   * 
   * @param skillType
   *              0 = normal skills
   *              1 = action skills
   *              2 = action skill mods
   *              3 = other skills (pets, elementals, etc...)
   */
  removePoint(skillType: number) {
    this.allocatedPoints[skillType]--;
  }

  /**
   * Retrieves skills that belong to the blue tree
   * 
   * @returns
   *          Array of skills
   */
  getBlueSkills(): Skill[] {
      return this.blueSkills
  }
  
  /**
   * Retrieves skills that belong to the red tree
   * 
   * @returns
   *          Array of skills
   */
  getRedSkills(): Skill[] {
      return this.redSkills;
  }

  /**
   * Retrieves skills that belong to the green tree
   * 
   * @returns
   *          Array of skills
   */
  getGreenSkills(): Skill[] {
      return this.greenSkills;
  }

  /**
   * Retrieves number of allocated points of a skill type 
   * 
   * @param skillType
   *              0 = normal skills
   *              1 = action skills
   *              2 = action skill mods
   *              3 = other skills (pets, elementals, etc...)
   * 
   * @returns
   *          number of points of a skill type
   */
  getAllocatedPoints(skillType: number) {
      return this.allocatedPoints[skillType];
  }

}
