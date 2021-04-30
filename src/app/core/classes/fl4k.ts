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
    public handleAdditionOfNonNormalSkill(skill: Skill, pos?: number) {

        if (skill instanceof ActionSkill) {

            if (this.equippedSkills[0].actionSkill != skill                 //remove actin skill in the position
                && this.equippedSkills[0].actionSkill != null) {
                this.removePoint(this.equippedSkills[0].actionSkill);
            }

            this.equippedSkills[0].actionSkill = skill;
        }

        if (skill instanceof ActionMod) {

            let otherPos = pos == 0 ? 1 : 0;                                //Other action mods position
            
            if (this.equippedSkills[0].actionMods[otherPos] == skill) {     //remove added skill its other position
                this.equippedSkills[0].actionMods[otherPos] = null;
            }

            if (this.equippedSkills[0].actionMods[pos] != skill             //remove action mod in the position
                && this.equippedSkills[0].actionMods[pos] != null) {
                this.removePoint(this.equippedSkills[0].actionMods[pos]);
            }

            this.equippedSkills[0].actionMods[pos] = skill;
        }

        if (skill instanceof OtherSkill) {

            if (this.equippedSkills[0].otherSkill != skill                  //remove other skill in the position
                && this.equippedSkills[0].otherSkill != null) {
                this.removePoint(this.equippedSkills[0].otherSkill);
            }

            this.equippedSkills[0].otherSkill = skill;
        };
    }

    /**
     * Handles the removal of a non normal type skill
     * 
     * @param skill
     *              skill removed
     * 
     */
    public handleRemovalOfNonNormalSkill(skill: Skill) {

        if (skill instanceof ActionSkill) {             //Remove action skill and its mods
            this.equippedSkills[0].actionSkill = null;
            
            this.equippedSkills[0].actionMods.forEach(skill => { if (skill) this.removePoint(skill) });
        }
        
        if (skill instanceof ActionMod) {               //Remove action mod from equipped skills action mod array
            var index: number = this.equippedSkills[0].actionMods.indexOf(skill);
            this.equippedSkills[0].actionMods[index] = null;
        }
        
        if (skill instanceof OtherSkill) {              //Remove other skill from equipped skills
            this.equippedSkills[0].otherSkill = null;
        }
    }
}
