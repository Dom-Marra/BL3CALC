import { Skill } from './skill';
import { ActionSkill } from './actionskill';
import { ActionMod } from './actionmod';
import { Character } from './character';
import { BaseCharacterModel } from '../models/basecharacter.model';
import { CharacterModel } from '../models/character.model';
import { SkillTree } from './skilltree';

export class Moze extends Character {

    constructor(baseCharacterData: BaseCharacterModel, characterData: CharacterModel) {
        super(baseCharacterData, 2, 2, 0);

        this.name = "Moze";

        this.greenTree = new SkillTree(characterData.trees.find(tree => tree.color == "green"), this);
        this.orangeTree = new SkillTree(characterData.trees.find(tree => tree.color == "orange"), this);
        this.blueTree = new SkillTree(characterData.trees.find(tree => tree.color == "blue"), this);

        this.addConditionals(characterData.conditionals);
        this.addStats(characterData.stats);
    }

    /**
     * Handles the addition of a non normal type skill
     * 
     * @param skill 
     *        Skill allocated
     * @param pos
     *        position of skill in equipped skills (only applies to action mods)
     */
    public handleAdditionOfNonNormalSkill(skill: Skill, pos?: number): boolean {

        //Action Mod
        if (skill instanceof ActionSkill) {

            //Check to see if an action mod is allocated already
            //If there is remove a point from its allocation and remove it from equipped skills
            if (this.equippedSkills[pos].actionSkill != skill && this.equippedSkills[pos].actionSkill != null) {
                this.removePoint(this.equippedSkills[pos].actionSkill, pos);
            }

            //Add action skill to equipped skills
            this.equippedSkills[pos].actionSkill = skill;
        }

        //Action Mod
        if (skill instanceof ActionMod) {

            //If a skill exists in this position, remove it from the equipped skills and remove a point from its allocation
            if (this.equippedSkills[pos].actionMods[0] != skill && this.equippedSkills[pos].actionMods[0] != null) {
                this.removePoint(this.equippedSkills[pos].actionMods[0]);
            }

            //Add mod to equipped skill in the specified position
            this.equippedSkills[pos].actionMods[0] = skill;
        }

        return true;
    }

    /**
     * Handles the removal of a non normal type skill
     * 
     * @param skill
     *              skill removed
     * 
     */
    public handleRemovalOfNonNormalSkill(skill: Skill, pos?: number) {

        //remove first instance of action skill from equipped skills
        if (skill instanceof ActionSkill) {
            var index: number;
            if (pos == null) {
                index = this.equippedSkills[0].actionSkill == skill ? 0 : 1;
            } else {
                index = pos;
            }

            this.equippedSkills[index].actionSkill = null;

            //remove the action mod that was here if there was any
            if (this.equippedSkills[index].actionMods[0] != null) {
                this.removePoint(this.equippedSkills[index].actionMods[0], index);
            }
        }

        //Remove action mod from equipped skills action mod array
        if (skill instanceof ActionMod) {
            var index: number;
            if (pos == null) {
                index = this.equippedSkills[0].actionMods[0] == skill ? 0 : 1;
            } else {
                index = pos;
            }

            this.equippedSkills[index].actionMods[0] = null;
        }

        return true;
    }
}
