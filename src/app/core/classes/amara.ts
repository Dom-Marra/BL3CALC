import { Skill } from './skill';
import { OtherSkill } from './otherskill';
import { ActionSkill } from './actionskill';
import { ActionMod } from './actionmod';
import { Character } from './character';
import { SkillTree } from './skilltree';
import { BLUE_SKILLS, GREEN_SKILLS, ORANGE_SKILLS, shockra } from '../data/amara/amaraskills';
import { AMARA_CONDITIONALS } from '../data/amara/amaraconditionals';

export class Amara extends Character {

  public greenTree: SkillTree = new SkillTree('green', 'assets/images/amara/GreenTreeHeader.png', 'Brawl', GREEN_SKILLS, this);
  public blueTree: SkillTree = new SkillTree('blue', 'assets/images/amara/BlueTreeHeader.png', 'Mystic Assualt', BLUE_SKILLS, this);
  public orangeTree: SkillTree = new SkillTree('orange', 'assets/images/amara/RedTreeHeader.png', 'Fist of The Elements', ORANGE_SKILLS, this);

  constructor(maxActionSkillPoints: number, maxActionModPoints: number, maxOtherSkillPoints: number) {
    super(maxActionSkillPoints, maxActionModPoints, maxOtherSkillPoints);
    this.name = "Amara";

    this.addPoint(shockra);
    shockra.addPoint();
    this.addConditionals(AMARA_CONDITIONALS);
  }

  /**
   * Adds point into a specific skill type allocation
   * 
   * @param skill 
   *              Skill to be allocated
   */
  public addPoint(skill: Skill): number {

    let modification: number = skill.addPoint();
    this.allocatedPoints += modification;

    //Action skill
    if (skill instanceof ActionSkill) {

      //Check to see if an action skill is allocated already
      //If there is remove a point from its allocation and remove it from equipped skills
      if (this.getEquippedSkills()[0].actionSkill != skill && this.getEquippedSkills()[0].actionSkill != null)  {
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
        this.removePoint(this.getEquippedSkills()[0].otherSkill);
      } 
      
      //Add other skill to equipped skills
      this.getEquippedSkills()[0].otherSkill = skill;
    };

    return modification;
  }

  /**
   * removes point from a specific skill type allocation
   * 
   * @param skill
   *              skill to be removed
   */
  public removePoint(skill: Skill): number {

    let modification: number = skill.removePoint();
    this.allocatedPoints += modification;

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
    if (skill instanceof OtherSkill && skill != shockra) {
      this.getEquippedSkills()[0].otherSkill = null;
      this.addPoint(shockra);
      shockra.addPoint();
    } 

    return modification;
  }
}
