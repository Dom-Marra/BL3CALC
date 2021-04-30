import { Skill } from './skill';
import { OtherSkill } from './otherskill';
import { ActionSkill } from './actionskill';
import { ActionMod } from './actionmod';
import { Character } from './character';
import { CharacterModel } from '../models/character.model';
import { SkillTree } from './skilltree';
import { BaseCharacterModel } from '../models/basecharacter.model';

export class Amara extends Character {

  public readonly SHOCKRA: OtherSkill;

  constructor(baseCharacterData: BaseCharacterModel, characterData: CharacterModel) {
    super(baseCharacterData, 1, 1, 1);

    this.name = "Amara";

    this.greenTree = new SkillTree(characterData.trees.find(tree => tree.color == "green"), this);
    this.orangeTree = new SkillTree(characterData.trees.find(tree => tree.color == "orange"), this);
    this.blueTree = new SkillTree(characterData.trees.find(tree => tree.color == "blue"), this);

    this.SHOCKRA = new OtherSkill(characterData.defaultSkills.find(x => x.name == "SHOCKRA"));

    this.addConditionals(characterData.conditionals);
    this.addStats(characterData.stats);
    this.addPoint(this.SHOCKRA);
  }

  /**
   * Adds the specified skill to the equipped skills,
   * may remove other skills if it takes the position
   * 
   * @param skill 
   *        Skill: skill added
   */
  public handleAdditionOfNonNormalSkill(skill: Skill): void {
    if (skill instanceof ActionSkill) {

      if (this.equippedSkills[0].actionSkill != skill         //remove action skill in the position
        && this.equippedSkills[0].actionSkill != null) {
        this.removePoint(this.equippedSkills[0].actionSkill);
      }

      this.equippedSkills[0].actionSkill = skill;
    }

    if (skill instanceof ActionMod) {

      if (this.equippedSkills[0].actionMods[0] != skill       //remove action mod in the position
        && this.equippedSkills[0].actionMods[0] != null) {
        this.removePoint(this.equippedSkills[0].actionMods[0]);
      }

      this.equippedSkills[0].actionMods[0] = skill;
    }

    if (skill instanceof OtherSkill) {

      if (this.equippedSkills[0].otherSkill != skill          //remove other skill in the position
        && this.equippedSkills[0].otherSkill != null) {
        this.removePoint(this.equippedSkills[0].otherSkill);
      }

      this.equippedSkills[0].otherSkill = skill;
    }
  }

  /**
   * Removes the specified skill from the equipped skills
   * 
   * @param skill 
   *        Skill: the skill removed
   */
  public handleRemovalOfNonNormalSkill(skill: Skill): void {
    if (skill instanceof ActionSkill) {
      this.equippedSkills[0].actionSkill = null;
    }

    if (skill instanceof ActionMod) {
      this.equippedSkills[0].actionMods[0] = null;
    }

    if (skill instanceof OtherSkill && skill != this.SHOCKRA) {
      this.equippedSkills[0].otherSkill = null;
      this.addPoint(this.SHOCKRA);              //Default other skills
    }
  }
}
