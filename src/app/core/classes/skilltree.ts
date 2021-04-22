import { Character } from "./character";
import { NormalSkill } from "./normalskill";
import { Skill } from "./skill";

export class SkillTree {

    private readonly POINTS_PER_PREREQ: number = 5;         //The amount of points needed to get to the next pre-req
    public allocatedPoints: number = 0;                     //Points Allocated in the tree

    constructor(public color: string,                       //Color of the treee
                public header: string,                      //Path to the tree header image
                public name: string,                        //Name of the skill tree
                public skills: Array<Skill>,                //Skills that belong to the skill tree
                private character: Character) {             //Owner of the tree
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
            return a.getPreReq() - b.getPreReq();
        });

        //Traverse through ordered skill list
        skillsOrdered.forEach(currentSkill => {

            //Analyze when when a skill has an allocation more than 0
            if (currentSkill.getAllocatedPoints() > 0) {

                //Re-assign required skills when the current skill has a higher amount
                //Add tmp points to extra
                //reset tmp points
                //Do check if skill is required based on current info
                if (currentSkill.getPreReq() > requiredSkill.getPreReq()) {
                    requiredSkill = currentSkill;
                    extraPoints += tmpPoints;
                    tmpPoints = 0;

                    //Check that the skill pre-req is not the same as the requiredSkill pre-req
                    if (skill.getPreReq() != requiredSkill.getPreReq()) {

                        //If the points allocated at this current state (-1 for skill removal adjustment)
                        //is less than what is needed for the required skill pre-req
                        //result to remove is false
                        if (extraPoints - 1 < requiredSkill.getPreReq()) {
                            requiredSkillCheck = false;
                        };
                    }
                }

                if (currentSkill.getPreReq() <= skill.getPreReq()) pointsForPreReq += currentSkill.getAllocatedPoints();

                //Skill is a pre-req if the difference between it and the current is 5
                if (currentSkill.getPreReq() - skill.getPreReq() == this.POINTS_PER_PREREQ) requiredForPreReq = true;

                //Add current skill points to tmp points when its a normal skill
                if (currentSkill instanceof NormalSkill) {
                    tmpPoints += currentSkill.getAllocatedPoints();
                }
            }
        });

        if (!requiredSkillCheck) return false;

        //The skill is a pre-req and removing a point accross all extra points is less than
        //the next pre-req amount then point removal failure
        if (requiredForPreReq && (pointsForPreReq - 1 < skill.getPreReq() + this.POINTS_PER_PREREQ)) return false;

        //point can be removed
        return true;
    }

    /**
     * Resets the skills points of the tree
     */
    public reset() {
        this.skills.sort(function (a, b) {
            return a.getPreReq() - b.getPreReq();
        });

        for (var i = this.skills.length - 1; i >= 0; i--) {
            if (this.skills[i].getAllocatedPoints() > 0) {
                for (var j = this.skills[i].getAllocatedPoints(); j > 0; j--) {
                    this.removePoint(this.skills[i]);
                }
            }
        }
    }
}