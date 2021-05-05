import { Skill } from './skill';
import { OtherSkill } from './otherskill';
import { ActionSkill } from './actionskill';
import { ActionMod } from './actionmod';
import { Character } from './character';
import { CharacterModel } from '../models/character.model';
import { BaseCharacterModel } from '../models/basecharacter.model';
import { Save } from '../models/save.model';

export class Amara extends Character {

  public readonly SHOCKRA: OtherSkill;

  constructor(baseCharacterData: BaseCharacterModel, characterData: CharacterModel, save?: Save) {
    super(baseCharacterData, 1, 1, 1, characterData, save);

    this.name = "Amara";

    this.SHOCKRA = new OtherSkill(characterData.defaultSkills.find(x => x.name == "SHOCKRA"));
    if (this.equippedSkills[0].otherSkill == null) this.addPoint(this.SHOCKRA);
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
