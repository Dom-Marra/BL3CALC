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
    public handleAdditionOfNonNormalSkill(skill: Skill, pos?: number) {

        if (skill instanceof ActionSkill) {

            if (this.equippedSkills[pos].actionSkill != skill               //remove action skill in the position
                && this.equippedSkills[pos].actionSkill != null) {
                this.removePoint(this.equippedSkills[pos].actionSkill, pos);
            }

            this.equippedSkills[pos].actionSkill = skill;
        }

        if (skill instanceof ActionMod) {

            if (this.equippedSkills[pos].actionMods[0] != skill             //remove action mod in the position
                && this.equippedSkills[pos].actionMods[0] != null) {
                this.removePoint(this.equippedSkills[pos].actionMods[0]);
            }

            this.equippedSkills[pos].actionMods[0] = skill;
        }
    }

    /**
     * Handles the removal of a non normal type skill
     * 
     * @param skill
     *              skill removed
     * 
     */
    public handleRemovalOfNonNormalSkill(skill: Skill, pos?: number) {

        if (skill instanceof ActionSkill) {         //remove first instance of action skill from equipped skills
            let index: number;

            if (pos == null) {
                index = this.equippedSkills[0].actionSkill == skill ? 0 : 1;
            } else {
                index = pos;
            }

            this.equippedSkills[index].actionSkill = null;
            if (this.equippedSkills[index].actionMods[0] != null) this.removePoint(this.equippedSkills[index].actionMods[0], index);
        }

        if (skill instanceof ActionMod) {          //Remove action mod from equipped skills action mod array
            let index: number;

            if (pos == null) {
                index = this.equippedSkills[0].actionMods[0] == skill ? 0 : 1;
            } else {
                index = pos;
            }

            this.equippedSkills[index].actionMods[0] = null;
        }
    }
}
