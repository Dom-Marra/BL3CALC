import { Skill} from './skill';
import { SkillEffects } from './skill';

export class ActionSkill extends Skill {

    constructor(path: string, position: Array<number>, maxPoints: number, preReq: number, color: string, skillEffects?: SkillEffects) {
        super(path, position, maxPoints, preReq, color, skillEffects);
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
        return "assets/images/skilltree/actionSkillBox.webp";
    }
}
