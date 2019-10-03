export class Skill {
    private readonly MIN_POINTS: number = 0;        //min number of points that can be allocated in the skill
    private allocatedPoints: number = 0;            //number of points allocated into the skill

    constructor(
        private path: string,                       //Image path
        private position: Array<number>,            //position on the tree [x, y]
        private maxPoints: number,                  //max number of points that can be allocated in the skill
        private preReq: number                      //number of points required on the tree to allocate into this
    ) {

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


}
