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

  public handleAdditionOfNonNormalSkill(skill: Skill): void {
    //Action skill
    if (skill instanceof ActionSkill) {

      //Check to see if an action skill is allocated already
      //If there is remove a point from its allocation and remove it from equipped skills
      if (this.equippedSkills[0].actionSkill != skill && this.equippedSkills[0].actionSkill != null)  {
        this.removePoint(this.equippedSkills[0].actionSkill);
      } 

      //Add action skill to equipped skills
      this.equippedSkills[0].actionSkill = skill;
    } 

    //Action mod
    if (skill instanceof ActionMod) {
      
      //Check to see if an action mod is allocated already
      //If there is remove a point from its allocation and remove it from equipped skills
      if (this.equippedSkills[0].actionMods[0] != skill && this.equippedSkills[0].actionMods[0] != null)  {
        this.removePoint(this.equippedSkills[0].actionMods[0]);
      } 

      //Add action mod to equipped skills action mod array
      this.equippedSkills[0].actionMods[0] = skill;
    }

    //Other skill
    if (skill instanceof OtherSkill) {

      //Check to see if an other skill is allocated already
      //If there is remove a point from its allocation and remove it from equipped skills
      if (this.equippedSkills[0].otherSkill != skill && this.equippedSkills[0].otherSkill != null)  {
        this.removePoint(this.equippedSkills[0].otherSkill);
      } 
      
      //Add other skill to equipped skills
      this.equippedSkills[0].otherSkill = skill;
    }
  }

  public handleRemovalOfNonNormalSkill(skill: Skill, pos?: number): void {
    //remove action skill from equipped skills
    if (skill instanceof ActionSkill)  {
      this.equippedSkills[0].actionSkill = null;
    } 

    //Remove action mod from equipped skills action mod array
    if (skill instanceof ActionMod) {
      this.equippedSkills[0].actionMods[0] = null;
    }

    //Remove other skill from equipped skills
    if (skill instanceof OtherSkill && skill != this.SHOCKRA) {
      this.equippedSkills[0].otherSkill = null;
      this.addPoint(this.SHOCKRA);
    } 
  }
}
