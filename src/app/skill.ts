import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

export class Skill {
    private readonly MIN_POINTS: number = 0;            //min number of points that can be allocated in the skill
    private readonly NORMAL_SKILL_CASE: number = 0;     //Case if skill is normal
    private readonly ACTION_SKILL_CASE: number = 1;     //Case if action skill
    private readonly ACTION_MOD_CASE: number = 2;       //Case if action skill modifier
    private readonly OTHER_CASE: number = 3;            //Case if other (pet, elemental type ...)

    //Paths for box images for each type of skill
    private readonly NORMAL_SKILL_BOX: string = "assets/images/skilltree/skillBox.png"; 
    private readonly ACTION_SKILL_BOX: string = "assets/images/skilltree/actionSkillBox.png"; 
    private readonly ACTION_SKILL_MOD_BOX: string = "assets/images/skilltree/actionSkillModBox.png"; 
    private readonly OTHER_SKILL_BOX: string = "assets/images/skilltree/otherSkillBox.png"; 
    
    private allocatedPoints: number = 0;            //number of points allocated into the skill
    private path: string;                           //Image path
    private position: Array<number>;                //position on the tree [y, x]
    private maxPoints: number;                      //max number of points that can be allocated in the skill
    private preReq: number;                         //number of points required on the tree to allocate into this
    private requiredActiveSkill: Skill = null;      //Required active skill to allocate active skill mod
    private otherSkillType: number = 0;             //Defines if the skill is normal, action, action mod, or other
    private skillBoxPath: string = "";              //The path for the box image behind the skill

    
    constructor(path: string, position: Array<number>, maxPoints: number, preReq: number, otherSkillType?: number, activeSkill?: Skill){
        this.path = path;                   
        this.position = position;            
        this.maxPoints = maxPoints;               
        this.preReq = preReq;


        //Assign variables based on skill type
        switch (otherSkillType) {
            case this.ACTION_SKILL_CASE: {
                this.otherSkillType = otherSkillType;
                this.skillBoxPath = this.ACTION_SKILL_BOX;
                break;
            }
            case this.ACTION_MOD_CASE: {
                this.otherSkillType = otherSkillType;
                this.requiredActiveSkill = activeSkill;
                this.skillBoxPath = this.ACTION_SKILL_MOD_BOX;
                break;
            }
            case this.OTHER_CASE: {
                this.otherSkillType = otherSkillType;
                this.requiredActiveSkill = activeSkill;
                this.skillBoxPath = this.OTHER_SKILL_BOX;
                break;
            }
            default: {
                this.otherSkillType = this.NORMAL_SKILL_CASE;
                this.skillBoxPath = this.NORMAL_SKILL_BOX;
                break;
            }
        }
    }

    /**
     * Adds a point into this skill
     */
    addPoint() {

        this.allocatedPoints++;
    }

    /**
     * Removes a point from this skill
     */
    removePoint() {
        this.allocatedPoints--;
    }

    /**
     * Checks if the skill can have a poitn added or removed from it
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
        
           //Action skill mod or 
        if (this.getOtherSkillType() == this.ACTION_MOD_CASE || this.getOtherSkillType() == this.OTHER_CASE) {

            //Check if this skill has a required action skill to be allocated
            if (this.getRequiredActiveSkill() != null) {

                //It does and it has no allocation, then return false
                if (this.getRequiredActiveSkill().getAllocated() < 0) return false;
            } 
        }
        

        //At max points and the modification is addition return false
        if (this.allocatedPoints == this.maxPoints && modification > 0) return false;

        //At min points and the modification is subtraction return false
        if (this.allocatedPoints == this.MIN_POINTS && modification < 0) return false;

        //Modification successful
        return true;
    }

    /**
     * @returns
     *          pre-req amount
     */
    getPreReq() {
        return this.preReq;
    }

    /**
     * @returns
     *          points allocated into the skill
     */
    getAllocated() {
        return this.allocatedPoints;
    }

    /**
     * @returns
     *          position of skill on tree
     */
    getPosition(): Array<number> {
        return this.position;
    }

    /**
     * @returns
     *          path of image for skill
     */
    getPath(): string {
        return this.path;
    }

    /**
     * @returns
     *          max allocated points
     */
    getMaxPoints(): number {
        return this.maxPoints;
    }

    getSkillBoxPath(): string {
        return this.skillBoxPath;
    }

    /**
     * @returns
     *          if the skill is active skill or active mod
     */
    getOtherSkillType(): number {
        return this.otherSkillType;
    }

    /**
     * @returns
     *          required active skill to allocate mod
     */
    getRequiredActiveSkill(): Skill {
        return this.requiredActiveSkill;
    }


}
