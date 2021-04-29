import { Skill } from './skill';
import { OtherSkill } from './otherskill';
import { ActionSkill } from './actionskill';
import { ActionMod } from './actionmod';
import { Character } from './character';
import { BaseCharacterModel } from '../models/basecharacter.model';
import { CharacterModel } from '../models/character.model';
import { SkillTree } from './skilltree';

export class Zane extends Character {

    constructor(baseCharacterData: BaseCharacterModel, characterData: CharacterModel) {
        super(baseCharacterData, 2, 4, 0);

        this.name = "Zane";

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
        let otherPos = pos == 0 ? 1 : 0; //Other action skill position

        //Check if this mod is already allocated in the other position, and remove it if it is
        if (this.equippedSkills[otherPos].actionSkill == skill) {
            this.removePoint(this.equippedSkills[otherPos].actionSkill);
        }

	    //Check to see if an action mod is allocated already
	    //If there is remove a point from its allocation and remove it from equipped skills
	    if (this.equippedSkills[pos].actionSkill != skill && this.equippedSkills[pos].actionSkill != null)  {
			this.removePoint(this.equippedSkills[pos].actionSkill);
		

			//remove the action mods that were here if there were any
			if (this.equippedSkills[pos].actionMods[0] != null) {
				this.removePoint(this.equippedSkills[pos].actionMods[0]);
            }
            if (this.equippedSkills[pos].actionMods[1] != null) {
				this.removePoint(this.equippedSkills[pos].actionMods[1]);
            }
        } 

	    //Add action skill to equipped skills
	    this.equippedSkills[pos].actionSkill = skill;
	} 

	//Action Mod
	if (skill instanceof ActionMod) {
        let actionSkillPos = this.equippedSkills[0].actionSkill == skill.getRequiredActionSkill() ? 0 : 1;
        let otherPos = pos == 0 ? 1 : 0; //Other action mods position
        
        //Check if this mod is already allocated in the other position, and remove it if it is
        if (this.equippedSkills[actionSkillPos].actionMods[otherPos] == skill) {
            this.removePoint(this.equippedSkills[actionSkillPos].actionMods[otherPos]);
        }
        
        //If a skill exists in this position, remove it from the equipped skills and remove a point from its allocation
        if (this.equippedSkills[actionSkillPos].actionMods[pos] != skill && this.equippedSkills[actionSkillPos].actionMods[pos] != null)  {
            this.removePoint(this.equippedSkills[actionSkillPos].actionMods[pos]);
        } 

        //Add mod to equipped skill in the specified position
        this.equippedSkills[actionSkillPos].actionMods[pos] = skill;
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

        //remove first instance of action skill from equipped skills
        if (skill instanceof ActionSkill)  {
            var index: number = this.equippedSkills[0].actionSkill == skill ? 0 : 1;
            this.equippedSkills[index].actionSkill = null;
            
            //remove the action mods that were here if there were any
            if (this.equippedSkills[index].actionMods[0] != null) {
                this.removePoint(this.equippedSkills[index].actionMods[0]);
            }
            if (this.equippedSkills[index].actionMods[1] != null) {
                this.removePoint(this.equippedSkills[index].actionMods[1]);
            }
        } 

        //Remove action mod from equipped skills action mod array
        if (skill instanceof ActionMod) {
            let actionSkillPos: number;
            var actionModPos: number;
            
            if (this.equippedSkills[0].actionMods[0] == skill) {
                actionSkillPos = 0;
                actionModPos = 0;
            } else if (this.equippedSkills[1].actionMods[0] == skill) {
                actionSkillPos = 1;
                actionModPos = 0;
            } else if (this.equippedSkills[0].actionMods[1] == skill) {
                actionSkillPos = 0;
                actionModPos = 1;
            } else {
                actionSkillPos = 1;
                actionModPos = 1;
            }

            this.equippedSkills[actionSkillPos].actionMods[actionModPos] = null;
        }
        
        return true;
    }
}
