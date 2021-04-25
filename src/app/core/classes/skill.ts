import { SkillEffect } from "../models/skilleffect.model";

export abstract class Skill {
    public readonly MIN_POINTS: number = 0;         //min number of points that can be allocated in the skill

    public allocatedPoints: number = 0;            //number of points allocated into the skill
    public name: string;                            //Name of the skill
    public description: string;                     //Skill description
    public image: string;                           //Image path
    public x: number;                               //x position of the skill
    public y: number;                               //y position of the skill
    public maxPoints: number;                      //max number of points that can be allocated in the skill
    public preReq: number;                         //number of points required on the tree to allocate into this
    public color: string;                          //The color group this skill belongs to 
    public skillEffects: Array<SkillEffect>;       //The effects of the skill


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
