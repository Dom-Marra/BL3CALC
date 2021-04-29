import { Skill } from './skill';
import { OtherSkill } from './otherskill';
import { ActionSkill } from './actionskill';
import { ActionMod } from './actionmod';
import { Character } from './character';
import { CharacterModel } from '../models/character.model';
import { SkillTree } from './skilltree';
import { BaseCharacterModel } from '../models/basecharacter.model';

export class Fl4k extends Character {

    constructor(baseCharacterData: BaseCharacterModel, characterData: CharacterModel) {
        super(baseCharacterData, 1, 2, 1);

        this.name = "FL4K";

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
            if (this.equippedSkills[0].actionSkill != skill && this.equippedSkills[0].actionSkill != null) {
                this.removePoint(this.equippedSkills[0].actionSkill);
            }

            //Add action skill to equipped skills
            this.equippedSkills[0].actionSkill = skill;
        }

        //Action Mod
        if (skill instanceof ActionMod) {

            let otherPos = pos == 0 ? 1 : 0; //Other action mods position

            //Check if this mod is already allocated in the other position, and remove it if it is
            if (this.equippedSkills[0].actionMods[otherPos] == skill) {
                this.removePoint(this.equippedSkills[0].actionMods[otherPos]);
            }

            //If a skill exists in this position, remove it from the equipped skills and remove a point from its allocation
            if (this.equippedSkills[0].actionMods[pos] != skill && this.equippedSkills[0].actionMods[pos] != null) {
                this.removePoint(this.equippedSkills[0].actionMods[pos]);
            }

            //Add mod to equipped skill in the specified position
            this.equippedSkills[0].actionMods[pos] = skill;
        }

        //Other skill
        if (skill instanceof OtherSkill) {

            //Check to see if an other skill is allocated already
            //If there is remove a point from its allocation and remove it from equipped skills
            if (this.equippedSkills[0].otherSkill != skill && this.equippedSkills[0].otherSkill != null) {
                this.removePoint(this.equippedSkills[0].otherSkill);
            }

            //Add other skill to equipped skills
            this.equippedSkills[0].otherSkill = skill;
        };

        return true;
    }

    /**
     * Handles the removal of a non normal type skill
     * 
     * @param skill
     *              skill removed
     * 
     */
    public handleRemovalOfNonNormalSkill(skill: Skill) {

        //remove action skill from equipped skills
        if (skill instanceof ActionSkill) {
            this.equippedSkills[0].actionSkill = null;
        }

        //Remove action mod from equipped skills action mod array
        if (skill instanceof ActionMod) {
            var index: number = this.equippedSkills[0].actionMods.indexOf(skill);
            this.equippedSkills[0].actionMods[index] = null;
        }

        //Remove other skill from equipped skills
        if (skill instanceof OtherSkill) {
            this.equippedSkills[0].otherSkill = null;
        }

        return true;
    }
}
