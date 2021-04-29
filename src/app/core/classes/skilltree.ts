import { TreeModel } from "../models/tree.model";
import { ActionMod } from "./actionmod";
import { ActionSkill } from "./actionskill";
import { Character } from "./character";
import { NormalSkill } from "./normalskill";
import { OtherSkill } from "./otherskill";
import { Skill } from "./skill";

export class SkillTree {

    private readonly POINTS_PER_PREREQ: number = 5;         //The amount of points needed to get to the next pre-req
    public allocatedPoints: number = 0;                     //Points Allocated in the tree

    public skills: Array<Skill> = new Array<Skill>();       //Skills of the tree
    public name: string;                                    //Name of the tree
    public image: string;                                   //Tree image
    public color: string;                                   //Tree Color

    constructor(private treeData: TreeModel, private character: Character) {
        this.name = this.treeData.name;
        this.image = this.treeData.image;
        this.color = this.treeData.color;

        this.treeData.skills.forEach(skill => {             //Populate skills based on data
            if (skill.type == 'actionmod') {
                let requiredActionSkill: ActionSkill;
                if (skill.requiredActionSkill != null) requiredActionSkill = this.skills[skill.requiredActionSkill];  
                this.skills.push(new ActionMod(skill, requiredActionSkill));
            } else if (skill.type == 'actionskill') {
                this.skills.push(new ActionSkill(skill));
            } else if (skill.type == 'normalskill') {
                this.skills.push(new NormalSkill(skill));
            } else if (skill.type == 'otherskill') {
                this.skills.push(new OtherSkill(skill))
            }
        });
    }

    /**
   * Adds a point to the skill tree
   * 
   * @param skill
   *        skill to add
   * @param pos
   *        position of skill in equipped skills (only applies to action mods and action skills)
   * @returns
   *        Boolean: if adding the point was successful or not
   */
    public addPoint(skill: Skill, pos?: number): Boolean {

        const pointsToModify: number = 1; //Used give back a point character

        //Do not add point if skill cannot take point
        if (!skill.validateModification(pointsToModify, this.allocatedPoints)) return false;

        //Do not add point if character has none remaining
        if (!this.character.validateModification(pointsToModify, skill)) return false;

        //Add point
        this.allocatedPoints += this.character.addPoint(skill, pos);

        //point addition successful
        return true;
    }


    /**
     * Removes a point to the skill tree
     * 
     * @param skill
     *        skill to remove
     * 
     * @returns 
     *         Boolean: if removing the point was successful or not
     */
    public removePoint(skill: Skill): Boolean {

        //Do not remove point if there is a pre-req
        if (!this.validateRequiredPoints(skill)) return false;

        const pointsToModify: number = -1;  //Used remove from total allocated

        //Do not remove point if skill is at minimum points
        if (!skill.validateModification(pointsToModify, this.allocatedPoints)) return false;

        //Do not remove point if character has max remaining
        if (!this.character.validateModification(pointsToModify, skill)) return false;

        //Remove point
        this.allocatedPoints += this.character.removePoint(skill);

        //point removal successful
        return true;
    }


    /**
     * 
     * Validates if a point can be de-allocated from the skill tree
     * 
     * @param skill 
     *        skill that needs to be validated to be de-allocated
     * 
     * @returns 
     *         Boolean: if the point can be de-allocated or not
     */
    private validateRequiredPoints(skill: Skill): Boolean {

        //Non-normal skills can be removed regardless
        if (!(skill instanceof NormalSkill)) return true;

        var requiredSkill = skill;              //Highest pre-req skill
        var pointsForPreReq = 0;                //Points before a pre-req be de-allocated
        var extraPoints = 0;                    //Any extra points before the required skill
        var requiredForPreReq = false;          //Skill may be required as a pre-req to another
        var tmpPoints = 0;                      //Points that are saved up while traversing the tree
        var requiredSkillCheck = true;

        //order the skills based by their pre-req amount
        var skillsOrdered = this.skills.sort((a, b) => {
            return a.preReq - b.preReq;
        });

        //Traverse through ordered skill list
        skillsOrdered.forEach(currentSkill => {

            //Analyze when when a skill has an allocation more than 0
            if (currentSkill.allocatedPoints > 0) {

                //Re-assign required skills when the current skill has a higher amount
                //Add tmp points to extra
                //reset tmp points
                //Do check if skill is required based on current info
                if (currentSkill.preReq > requiredSkill.preReq) {
                    requiredSkill = currentSkill;
                    extraPoints += tmpPoints;
                    tmpPoints = 0;

                    //Check that the skill pre-req is not the same as the requiredSkill pre-req
                    if (skill.preReq != requiredSkill.preReq) {

                        //If the points allocated at this current state (-1 for skill removal adjustment)
                        //is less than what is needed for the required skill pre-req
                        //result to remove is false
                        if (extraPoints - 1 < requiredSkill.preReq) {
                            requiredSkillCheck = false;
                        };
                    }
                }

                if (currentSkill.preReq <= skill.preReq) pointsForPreReq += currentSkill.allocatedPoints;

                //Skill is a pre-req if the difference between it and the current is 5
                if (currentSkill.preReq - skill.preReq == this.POINTS_PER_PREREQ) requiredForPreReq = true;

                //Add current skill points to tmp points when its a normal skill
                if (currentSkill instanceof NormalSkill) {
                    tmpPoints += currentSkill.allocatedPoints;
                }
            }
        });

        if (!requiredSkillCheck) return false;

        //The skill is a pre-req and removing a point accross all extra points is less than
        //the next pre-req amount then point removal failure
        if (requiredForPreReq && (pointsForPreReq - 1 < skill.preReq + this.POINTS_PER_PREREQ)) return false;

        //point can be removed
        return true;
    }

    /**
     * Resets the skills points of the tree
     */
    public reset() {
        this.skills.sort(function (a, b) {
            return a.preReq - b.preReq;
        });

        for (var i = this.skills.length - 1; i >= 0; i--) {
            if (this.skills[i].allocatedPoints > 0) {
                for (var j = this.skills[i].allocatedPoints; j > 0; j--) {
                    this.removePoint(this.skills[i]);
                }
            }
        }
    }
}