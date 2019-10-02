export class Skill {
    private readonly MIN_POINTS: number = 0;
    private allocatedPoints: number = 0;

    constructor(
        private path: string,
        private position: Array<number>,
        private maxPoints: number,
        private preReq: number
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
     * modification: number
     *              number of points to add or remove from this skill
     *              this should be 1 or -1, other numbers will not work
     * 
     * returns Boolean
     *         whether the skills points can be modified or not
     */
    validateModification(modification: number, allocatedSkillTreePoints): Boolean {

        if (modification < -1 || modification > 1 || modification == 0) return false;
        if (allocatedSkillTreePoints < this.preReq) return false;
        if (this.allocatedPoints == this.maxPoints && modification > 0) return false;
        if (this.allocatedPoints == this.MIN_POINTS && modification < 0) return false;

        return true;
    }


}
