import { Skill } from './skill';
import { ActionSkill } from './actionskill';
import { ActionMod } from './actionmod';
import { Character } from './character';
import { BaseCharacterModel } from '../models/basecharacter.model';
import { CharacterModel } from '../models/character.model';
import { Save } from '../models/save.model';

export class Zane extends Character {

    constructor(baseCharacterData: BaseCharacterModel, characterData: CharacterModel, save?: Save) {
        super(baseCharacterData, 2, 4, 0, characterData, save);

        this.name = "Zane";
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
            this.handleAdditionOfActionSkill(skill, pos);
        }

        if (skill instanceof ActionMod) {
            this.handleAdditionOfActionMod(skill, pos);
        }
    }

    /**
     * Adds the action skill to the equipped skills,
     * will remove an action mod if its taking the place of addition
     * 
     * @param skill 
     *        ActionSkill: the action skill added
     * @param pos 
     *        number: index of equipped skills
     */
    private handleAdditionOfActionSkill(skill: ActionSkill, pos?: number) {
        let otherPos = pos == 0 ? 1 : 0;                            //Other action skill position

        if (this.equippedSkills[otherPos].actionSkill == skill) {   //Remove added skill in the other position and its mods
            this.equippedSkills[otherPos].actionSkill = null;
            
            this.equippedSkills[otherPos].actionMods.forEach(skill => { if (skill) this.removePoint(skill) });
        }

        if (this.equippedSkills[pos].actionSkill != skill           //remove action skill in the position and its mods
            && this.equippedSkills[pos].actionSkill != null) {
            this.removePoint(this.equippedSkills[pos].actionSkill);

            this.equippedSkills[pos].actionMods.forEach(skill => { if (skill) this.removePoint(skill) });
        }

        this.equippedSkills[pos].actionSkill = skill;
    }

    /**
     * Manipulates the equipped skills based on the action mod added, 
     * may remove another action mod if its in the place of the added action mod
     * 
     * @param skill 
     *        ActionMod: the action mod added
     * @param pos 
     *        number: its position in the equipped skill action mod array
     */
    private handleAdditionOfActionMod(skill: ActionMod, pos?: number) {
        let actionSkillPos: number = this.equippedSkills[0].actionSkill == skill.getRequiredActionSkill() ? 0 : 1;
        let otherPos: number = pos == 0 ? 1 : 0;

        if (this.equippedSkills[actionSkillPos].actionMods[otherPos] == skill) {    //remove added mod in the other position
            this.equippedSkills[actionSkillPos].actionMods[otherPos] = null;
        }

        if (this.equippedSkills[actionSkillPos].actionMods[pos] != skill            //remove action mod in the position
            && this.equippedSkills[actionSkillPos].actionMods[pos] != null) {
            this.removePoint(this.equippedSkills[actionSkillPos].actionMods[pos]);
        }

        this.equippedSkills[actionSkillPos].actionMods[pos] = skill;
    }

    /**
     * Handles the removal of a non normal type skill
     * 
     * @param skill
     *              skill removed
     * 
     */
    public handleRemovalOfNonNormalSkill(skill: Skill) {

        if (skill instanceof ActionSkill) {
            this.handleRemovalOfActionSkill(skill);
        }

        if (skill instanceof ActionMod) {
            this.handleRemovalOfActionMod(skill)
        }
    }

    /**
     * Removes the action mod from the equipped skill array,
     * and removes any allocated action mods
     * 
     * @param skill
     *        ActionSkill: the action skill removed
     */
    private handleRemovalOfActionSkill(skill: ActionSkill) {
        var pos: number = this.equippedSkills[0].actionSkill == skill ? 0 : 1;
        this.equippedSkills[pos].actionSkill = null;

        this.equippedSkills[pos].actionMods.forEach(skill => { if (skill) this.removePoint(skill) });
    }

    /**
     * Removes the action mod from the equipped skills array
     * 
     * @param skill
     *        ActionMod: the action mod removed
     */
    private handleRemovalOfActionMod(skill: ActionMod) {
        let actionSkillPos: number;
        var actionModPos: number;

        this.equippedSkills.forEach((equippedSkill, actionIndex) => {
            equippedSkill.actionMods.forEach((mod, modIndex) => {
                if (skill == mod) {
                    actionModPos = modIndex;
                    actionSkillPos = actionIndex;
                }
            });
        });

        this.equippedSkills[actionSkillPos].actionMods[actionModPos] = null;
    }
}
