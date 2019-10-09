import { Skill } from './skill';
import { NormalSkill } from './normalskill';
import { OtherSkill } from './otherskill';
import { ActionSkill } from './actionskill';
import { ActionMod } from './actionmod';

export abstract class Character {

    public readonly MIN_POINTS = 0;                       //Min points that can be allocated
    public readonly MAX_NORMAL_SKILL_POINTS = 48;         //Max points that can be allocated for normal skills


    private maxActionSkillPoints = 1;                      //Max points that can be allocated for action skills
    private maxActionModPoints = 1;                        //Max points that can be allocated for action mods
    private maxOtherSkillPoints = 1;                       //Max points that can be allocated for other skills
  

    private allocatedNormalSkillPoints = 0;              //number of points allocated in normal skills
    private allocatedActionSkillPoints = 0;              //number of points allocated in action skills
    private allocatedActionModPoints = 0;                //number of points allocated in action mods
    private allocatedOtherSkillPoints = 0;               //number of points allocated in other skills

    private actionSkills: Array<ActionSkill> = [];       //Action skills that have been allocated
    private actionMods: Array<Array<Skill>> = [];        //Action mods that have been allocated, and their respective action skill mapped to it (if any)
    private otherSkills: Array<OtherSkill> = [];         //Other skills that have been allocated

    constructor(maxActionSkillPoints: number, maxActionModPoints: number, maxOtherSkillPoints: number) {
        this.maxActionModPoints = maxActionModPoints;
        this.maxActionSkillPoints = maxActionSkillPoints;
        this.maxOtherSkillPoints = maxOtherSkillPoints;
    }

   /**
   * Checks if the character can have a point added or removed from it
   * 
   * @param modification
   *              number of points to add or remove from this character
   *              this should be 1 or -1, other numbers will not work
   * 
   * @returns 
   *        Boolean whether the allocated points can be modified or not
   */
    validateModification = (modification: number, skill: Skill) => {

        //Invalid number return false
        if (modification < -1 || modification > 1 || modification == 0) return false;

        //At max points and modification is addition return false
        if (((this.allocatedNormalSkillPoints == this.MAX_NORMAL_SKILL_POINTS && skill instanceof NormalSkill)
        || (this.allocatedActionSkillPoints == this.getMaxActionSkillPoints() && skill instanceof ActionSkill)
        || (this.allocatedActionModPoints == this.getMaxActionModPoints() && skill instanceof ActionMod)
        || (this.allocatedOtherSkillPoints == this.getMaxOtherSkillPoints() && skill instanceof OtherSkill))
        && modification > 0) return false;

        //At min points and modification is subtraction return false
        if (((this.allocatedNormalSkillPoints == this.MIN_POINTS && skill instanceof NormalSkill) 
        || (this.allocatedActionSkillPoints == this.MIN_POINTS && skill instanceof ActionSkill) 
        || (this.allocatedActionModPoints == this.MIN_POINTS && skill instanceof ActionMod)
        || (this.allocatedOtherSkillPoints == this.MIN_POINTS && skill instanceof OtherSkill))
        && modification < 0) return false;

        //modification successful
        return true;
    }
    
    /**
     * Retrieves number of allocated points of normal skills 
     * 
     * @returns
     *          number
     */
    getAllocatedNormalSkillPoints(): number {
        return this.allocatedNormalSkillPoints;
    }

    /**
     * Retrieves number of allocated points of action skills 
     * 
     * @returns
     *          number
     */
    getAllocatedActionSkillPoints(): number {
        return this.allocatedActionSkillPoints;
    }

    /**
     * Retrieves number of allocated points of action mods
     * 
     * @returns
     *          number
     */
    getAllocatedActionModPoints(): number {
        return this.allocatedActionModPoints;
    }

    /**
     * Retrieves number of allocated points of other skills 
     * 
     * @returns
     *          number
     */
    getAllocatedOtherSkillPoints(): number {
        return this.allocatedOtherSkillPoints;
    }

    /**
     * Sets the number of allocated points of normal skills 
     * 
     */
    setAllocatedNormalSkillPoints(newAmount: number) {
        this.allocatedNormalSkillPoints = newAmount;
    }

    /**
     * Sets the number of allocated points of action skills 
     * 
     */
    setAllocatedActionSkillPoints(newAmount: number) {
       this.allocatedActionSkillPoints = newAmount;
    }

    /**
     * Sets the number of allocated points of action mods
     * 
     */
    setAllocatedActionModPoints(newAmount: number) {
        this.allocatedActionModPoints = newAmount;
    }

    /**
     * Sets the number of allocated points of other skills 
     * 
     */
    setAllocatedOtherSkillPoints(newAmount: number)  {
        this.allocatedOtherSkillPoints = newAmount;
    }

    /**
     * Retruns the allocated action skills
     * 
     * @returns
     *          Array<ActionSkill>
     */
    getActionSkills() {
        return this.actionSkills;
    }

    /**
     * Returns the allocated action mods mapped to their respective action skill (if any)
     * 
     * @returns
     *         Array<Array<Skill>>
     */
    getActionMods(): Array<Array<Skill>> {
        return this.actionMods;
    }

    /**
     * Retruns the allocated other skills
     * 
     * @returns
     *          Array<OtherSkill>
     */
    getOtherSkills(): Array<OtherSkill> {
        return this.otherSkills;
    }

    /**
     * Returns the max amount of other skill points that can be allocated
     * 
     * @returns 
     *          number
     */
    getMaxOtherSkillPoints(): number {
        return this.maxOtherSkillPoints;
    }

    /**
     * Returns the max amount of action skill points that can be allocated
     * 
     * @returns 
     *          number
     */
    getMaxActionSkillPoints(): number {
        return this.maxActionSkillPoints;
    }

    /**
     * Returns the max amount of action mod points that can be allocated
     * 
     * @returns 
     *          number
     */
    getMaxActionModPoints(): number {
        return this.maxActionModPoints;
    }

    /**
     * Adds point into a specific skill type allocation
     * 
     * @param skill
    */
    abstract addPoint(skill: Skill): void;
        
    /**
     * removes point from a specific skill type allocation
     * 
     * @param skill
     */
    abstract removePoint(skill: Skill): void;
    
    /**
     * Retrieves skills that belong to the blue tree
     * 
     * @returns
     *          Array
     */
    abstract getBlueSkills(): Skill[];
    
    /**
     * Retrieves skills that belong to the red tree
     * 
     * @returns
     *          Array
     */
    abstract getRedSkills(): Skill[];
    
    /**
     * Retrieves skills that belong to the green tree
     * 
     * @returns
     *          Array
     */
    abstract getGreenSkills(): Skill[];
}
