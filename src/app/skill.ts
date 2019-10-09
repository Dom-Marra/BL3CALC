export abstract class Skill {
    public readonly MIN_POINTS: number = 0;            //min number of points that can be allocated in the skill
    
    private allocatedPoints: number = 0;            //number of points allocated into the skill
    private path: string;                           //Image path
    private position: Array<number>;                //position on the tree [y, x]
    private maxPoints: number;                      //max number of points that can be allocated in the skill
    private preReq: number;                         //number of points required on the tree to allocate into this
    private color: string;                          //The color group this skill belongs to 


    constructor(path: string, position: Array<number>, maxPoints: number, preReq: number, color: string) {
        this.path = path;                   
        this.position = position;            
        this.maxPoints = maxPoints;               
        this.preReq = preReq;
        this.color = color;
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
     * Returns the pre-req amount of points to allocate into this skill
     * 
     * @returns
     *          number
     */
    getPreReq(): number {
        return this.preReq;
    }

    /**
     * Returns the allocated points into this skill
     * 
     * @returns
     *          number
     */
    getAllocatedPoints(): number {
        return this.allocatedPoints;
    }

    /**
     * Returns the position of this skill on tree [y][x]
     * 
     * @returns
     *          array
     */
    getPosition(): Array<number> {
        return this.position;
    }

    /**
     * Returns the path for the image
     * 
     * @returns
     *          string
     */
    getPath(): string {
        return this.path;
    }

    /**
     * The number of maximum number of points that can be allocated into this skill
     * @returns
     *          number
     */
    getMaxPoints(): number {
        return this.maxPoints;
    }

    /**
     * Returns the color group this skill belongs to
     * 
     * @returns
     *          string
     */
    getColor(): string {
        return this.color;
    }

    /**
     * Returns path of the image to go behind the skill
     * 
     * @returns
     *          string
     */
    abstract getSkillBoxPath(): string;

    
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
     *         Boolean: whether the skills points can be modified or not
     */
    abstract validateModification(modification: number, allocatedSkillTreePoints: number): Boolean;

}
