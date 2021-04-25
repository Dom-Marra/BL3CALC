import { SkillModel } from '../models/skill.model';
import { Skill} from './skill';

export class ActionSkill extends Skill {

    constructor(skillData: SkillModel) {
        super(
            skillData.name, 
            skillData.description, 
            skillData.image, 
            skillData.x, 
            skillData.y, 
            skillData.maxPoints, 
            skillData.preReq,
            skillData.color, 
            skillData.skillEffects
        )
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
        if (allocatedSkillTreePoints < this.preReq) return false;

        //At max points and the modification is addition remove a point from the skill
        if (this.allocatedPoints == this.maxPoints && modification > 0)  {
            this.removePoint();
        }

        //At min points and the modification is subtraction return false
        if (this.allocatedPoints == this.MIN_POINTS && modification < 0) return false;

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
        if (this.allocatedPoints == 0) return "assets/images/skilltree/actionSkillBox.png";

        switch (this.color.toLowerCase()) {
            case 'blue': {
                return "assets/images/skilltree/actionSkillBoxBlue.png";
            }
            case 'green': {
                return "assets/images/skilltree/actionSkillBoxGreen.png";
            }
            case 'red': {
                return "assets/images/skilltree/actionSkillBoxRed.png";
            }
            default: {
                return "assets/images/skilltree/actionSkillBox.png";
            }
        }
    }
}
