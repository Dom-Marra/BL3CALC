import { Skill } from './skill';
import { NormalSkill } from './normalskill';
import { BASE_CHARACTER_CONDITIONALS } from '../data/basecharacterconditionals';
import { EquippedSkill } from '../models/equippedskill.model';
import { BASE_CHARACTER_STATS } from '../data/basecharacterstats';
import { Conditional } from '../models/conditional.model';
import { CharacterStat } from '../models/characterstat.model';
import { SkillTree } from './skilltree';

export abstract class Character {

    public readonly MIN_POINTS = 0;                         //Min points that can be allocated
    public readonly MAX_NORMAL_SKILL_POINTS = 63;           //Max points that can be allocated for normal skills

    private conditionals = BASE_CHARACTER_CONDITIONALS;     //Condtionals that effect stat effects
    private stats = BASE_CHARACTER_STATS;                   //Base set of character stats

    private maxActionSkillPoints: number = 0;                       //Max points that can be allocated for action skills
    private maxActionModPoints: number = 0;                         //Max points that can be allocated for action mods
    private maxOtherSkillPoints: number = 0;                        //Max points that can be allocated for other skills

    public allocatedPoints: number = 0;

    private equippedSkills: Array<EquippedSkill>;           //Action skills, action mods, and other skills allocated
    public name: string = "Character Name";                 //Name of the Character

    public abstract greenTree: SkillTree;                   //Green Skill Tree
    public abstract blueTree: SkillTree;                    //Blue Skill Tree
    public abstract orangeTree: SkillTree;                  //Orange Skill Tree

    constructor(maxActionSkillPoints: number, maxActionModPoints: number, maxOtherSkillPoints: number) {
        this.maxActionModPoints = maxActionModPoints;
        this.maxActionSkillPoints = maxActionSkillPoints;
        this.maxOtherSkillPoints = maxOtherSkillPoints;

        this.initEquippedSkills();
    }

    /**
     * Inits the characters equipped skills with empty values
     */
    private initEquippedSkills(): void {
        this.equippedSkills = [];

        for (let i = 0; i < this.maxActionSkillPoints; i++) {
            let equippedSkill: EquippedSkill = {
                actionSkill: null,
                actionMods: [],
            };

            if (this.maxOtherSkillPoints && this.maxOtherSkillPoints > 0) equippedSkill.otherSkill = null;

            for (let j = 0; j < this.maxActionModPoints / this.maxActionSkillPoints; j++) {
                equippedSkill.actionMods.push(null);
            }

            this.equippedSkills.push(equippedSkill);
        }
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
    public validateModification(modification: number, skill: Skill): boolean {

        //Invalid number return false
        if (modification < -1 || modification > 1 || modification == 0) return false;

        //At max points and modification is addition return false
        if (this.allocatedPoints == this.MAX_NORMAL_SKILL_POINTS && skill instanceof NormalSkill
            && modification > 0) return false;

        //At min points and modification is subtraction return false
        if (this.allocatedPoints == this.MIN_POINTS && skill instanceof NormalSkill
            && modification < 0) return false;

        //modification successful
        return true;
    }

    /**
     * Returns the equipped skills
     * 
     * @returns
     *          EquippedSkills
     */
    public getEquippedSkills(): Array<EquippedSkill> {
        return this.equippedSkills;
    }

    /**
     * Sets the equipped skills
     * 
     * @params
     *          EquippedSkills
     */
    public setEquippedSkills(equippedSkills: Array<EquippedSkill>): void {
        this.equippedSkills = equippedSkills;
    }

    /**
     * Returns the max amount of other skill points that can be allocated
     * 
     * @returns 
     *          number
     */
    public getMaxOtherSkillPoints(): number {
        return this.maxOtherSkillPoints;
    }

    /**
     * Returns the max amount of action skill points that can be allocated
     * 
     * @returns 
     *          number
     */
    public getMaxActionSkillPoints(): number {
        return this.maxActionSkillPoints;
    }

    /**
     * Returns the max amount of action mod points that can be allocated
     * 
     * @returns 
     *          number
     */
    public getMaxActionModPoints(): number {
        return this.maxActionModPoints;
    }

    /**
     * Returns the conditionals of the base character 
     * 
     * @returns
     *          {[key: string]: Conditional}
     */
    public getConditionals(): { [key: string]: Conditional } {
        return this.conditionals;
    }

    public addConditionals(conditionals: {[key: string]: Conditional}) {
        Object.assign(this.conditionals, conditionals);
    }

    /**
     * Returns the base stat of the character
     * 
     * @returns 
     *          {[key: string]: CharacterStat}
     */
    public getStats(): { [key: string]: CharacterStat } {
        return this.stats;
    }

    /**
     * Adds point into a specific skill type allocation
     * 
     * @param skill
     *        Skill to be allocated
     * @param pos
     *        position of skill in equipped skills (only applies to action mods and action skills)
     */
    abstract addPoint(skill: Skill, pos?: number): number;

    /**
     * Removes point from a specific skill type allocation
     * 
     * @param skill
     *        Skill to be removed
     * @param pos
     *        position of skill in equipped skills (only applies to action mods and action skills)
     */
    abstract removePoint(skill: Skill, pos?: number): number;
}
