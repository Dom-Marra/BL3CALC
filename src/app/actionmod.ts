import { Skill } from './skill';

export class ActionMod extends Skill {

    private requiredActionSkill: Skill = null;      //Required active skill to allocate active skill mod

    constructor(path: string, position: Array<number>, maxPoints: number, preReq: number, color: string, requiredActionSkill?: Skill) { 
        super(path, position, maxPoints, preReq, color);
        this.requiredActionSkill = requiredActionSkill;
    }  
    
    /**
     * Checks if the skill can have a point added or removed from it
     * 
     * @param modification
     *              number of points to add or remove from this skill
     *              this should be 1 or -1, other numbers will not work
     * 
     * @param allocatedSkillTreePoints
     *              number of points allocated in a skill tree
     * 
     * @returns 
     *         Boolean, whether the skills points can be modified or not
     */
    validateModification(modification: number, allocatedSkillTreePoints: number): Boolean {
        //Invalid number return false
        if (modification < -1 || modification > 1 || modification == 0) return false;

        //not enough pre-req points return false
        if (allocatedSkillTreePoints < this.getPreReq()) return false;
    
        //Check if this skill has a required action skill to be allocated
        if (this.getRequiredActionSkill() != null) {

            //It does and it has no allocation, then return false
            if (this.getRequiredActionSkill().getAllocatedPoints() < 0) return false;
        } 
        
        //At max points and the modification is addition return false
        if (this.getAllocatedPoints() == this.getMaxPoints() && modification > 0) return false;

        //At min points and the modification is subtraction return false
        if (this.getAllocatedPoints() == this.MIN_POINTS && modification < 0) return false;

        //Modification successful
        return true;
    }

    /**
     * Returns the path for the image
     * 
     * @returns
     *          string
     */
    getSkillBoxPath(): string {
        return "assets/images/skilltree/actionSkillModBox.png";
    }

    /**
     * Returns required active skill to allocate mod
     * 
     * @returns
     *          Skill
     */
    getRequiredActionSkill(): Skill {
        return this.requiredActionSkill;
    }
}