import { SkillEffect } from "../models/skilleffect.model";

export abstract class Skill {
    public readonly MIN_POINTS: number = 0;         //min number of points that can be allocated in the skill

    private allocatedPoints: number = 0;            //number of points allocated into the skill
    public name: string;                            //Name of the skill
    public description: string;                     //Skill description
    public image: string;                           //Image path
    public x: number;                               //x position of the skill
    public y: number;                               //y position of the skill
    private maxPoints: number;                      //max number of points that can be allocated in the skill
    private preReq: number;                         //number of points required on the tree to allocate into this
    private color: string;                          //The color group this skill belongs to 
    private skillEffects: Array<SkillEffect>;       //The effects of the skill


    constructor(name: string,
        description: string,
        image: string,
        x: number,
        y: number,
        maxPoints: number,
        preReq: number,
        color: string,
        skillEffects: Array<SkillEffect>) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.x = x;
        this.y = y;
        this.maxPoints = maxPoints;
        this.preReq = preReq;
        this.color = color;
        this.skillEffects = skillEffects;
    }

    /**
     * Adds a point into this skill
     */
    addPoint(): number {
        this.allocatedPoints++;
        return 0;
    }
    /**
     * Removes a point from this skill
     */
    removePoint(): number {
        this.allocatedPoints--;
        return 0;
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
     * Returns the description of the skill, which includes its name and effects
     * 
     * @returns
     *          SkillEffects
     */
    getSkillEffects(): Array<SkillEffect> {
        return this.skillEffects;
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
