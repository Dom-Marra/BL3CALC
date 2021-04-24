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

    private conditionals: Map<string, Conditional> = BASE_CHARACTER_CONDITIONALS;     //Condtionals that effect stat effects
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

    public conditionalsInUse: Map<string, number> = new Map();  //conditionals in use, key their key in conditionals, and value how many occurances of it there are

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
     * Adds point into a specific skill type allocation
     * 
     * @param skill
     *        Skill to be allocated
     * @param pos
     *        position of skill in equipped skills (only applies to action mods and action skills)
     */
      public addPoint(skill: Skill, pos?: number): number {
        let modification: number = skill.addPoint();
        this.allocatedPoints += modification;

        if (skill.getAllocatedPoints() == 1) this.addConditionalsFromSkill(skill);

        this.updateStatsBasedOnSkillAllocation(skill, 1);

        if (!(skill instanceof NormalSkill)) this.handleAdditionOfNonNormalSkill(skill, pos);
        

        return modification;
    }

    /**
     * Adds the occurances of conditionals from a skill to the in use conditionals map
     * 
     * @param skill
     *          skill to add conditionals from 
     */
    private addConditionalsFromSkill(skill: Skill): void {
        skill.getSkillEffects().forEach(effect => {
            effect.conditionals?.forEach(conditional => {
                if (this.conditionalsInUse.has(conditional)) {
                    let occurances = this.conditionalsInUse.get(conditional);
                    this.conditionalsInUse.set(conditional, ++occurances);
                } else {
                    this.conditionalsInUse.set(conditional, 1);
                }
            });
        });
    }

    /**
     * Removes point from a specific skill type allocation
     * 
     * @param skill
     *        Skill to be removed
     * @param pos
     *        position of skill in equipped skills (only applies to action mods and action skills)
     */
     public removePoint(skill: Skill, pos?: number): number {
        let modification: number = skill.removePoint();
        this.allocatedPoints += modification;

        if (skill.getAllocatedPoints() == 0) this.removeConditionalsFromSkill(skill);

        this.updateStatsBasedOnSkillAllocation(skill, -1);

        if (!(skill instanceof NormalSkill)) this.handleRemovalOfNonNormalSkill(skill, pos);

        return modification;
     }

    /**
     * Removes the occurances of conditionals from a skill to the in use conditionals map
     * 
     * @param skill
     *          skill to remove conditionals from 
     */
    private removeConditionalsFromSkill(skill: Skill): void {
        skill.getSkillEffects().forEach(effect => {
            effect.conditionals?.forEach(conditional => {
                let occurances = this.conditionalsInUse.get(conditional);

                if (occurances == 1) {
                    this.conditionalsInUse.delete(conditional);
                } else {
                    this.conditionalsInUse.set(conditional, --occurances);
                }
            });
        });
    }

    private updateStatsBasedOnSkillAllocation(skill: Skill, modification: 1 | -1) {
        skill.getSkillEffects().forEach(effect => {
            if (!effect.values || !effect.stats) return;

            let multi: number = 0;                          //Multipliers for the stat
            let currentValue: number = 0;
            let previousValue: number = 0;

            let conditionalValues = this.conditionalsAreActive(effect.conditionals);

            if (conditionalValues == false) return;
            else if (conditionalValues == true) multi = 1;
            else multi += conditionalValues;

            let currentValueIndex: number = effect.values.length < skill.getAllocatedPoints() ? effect.values.length - 1: skill.getAllocatedPoints() - 1; 
            let previousValueIndex: number = effect.values.length < skill.getAllocatedPoints() - modification ? effect.values.length - 1 : (skill.getAllocatedPoints() - modification) -1;

            if (currentValueIndex == previousValueIndex) return;
            
            previousValue = previousValueIndex < 0 ? 0 : effect.values[previousValueIndex] * multi;
            currentValue = currentValueIndex < 0 ? 0 : effect.values[currentValueIndex] * multi;

            let total = currentValue - previousValue;

            effect.stats.forEach(statInfo => {
                let stat = this.stats.get(statInfo.key);
                let prevStat = JSON.parse(JSON.stringify(stat));

                if (statInfo.isBaseStackValue) {
                    let otherSkill = this.getAllSkills().find(other => skill != other && other.getSkillEffects().find(effect => effect.stats?.find(stat => stat.isBaseStackValue) && other.getAllocatedPoints() > 0));
                    if (otherSkill) return;
                }

                statInfo.multipliers?.forEach(multiKey => {
                    let multiplier = this.stats.get(multiKey);
                    if (multiplier.value) total *= (1 + (multiplier.value / 100));   
                });

                total = this.cleanValue(total);

                stat.value != null ? stat.value = this.cleanValue(stat.value + total) : stat.value = total;
                if (stat.isMultiplier) this.updateStatsBasedOnUpdatedMulti(prevStat, stat, statInfo.key)
            });
        }); 
    }

    private getAllSkills(): Array<Skill> {
        return new Array().concat(this.greenTree.skills, this.orangeTree.skills, this.blueTree.skills);
    }

    public conditionalsAreActive(conditionals: Array<string>): number | boolean{
        let res: number | boolean;

        conditionals?.some(conditionalKey => {
            let conditional = this.conditionals.get(conditionalKey);

            if (!conditional || !conditional.isActive) {
                res = false;
                return;
            }
             
            if (conditional.usesStacks) res == null ? res = conditional.value : (<number> res) += conditional.value;
        });

        return res == null ? true : res;
    }

    public updateStatsBasedOnUpdatedMulti(previousMulti: CharacterStat, currentMulti: CharacterStat, multiKey: string) {
        let skillsAffected = this.getAllSkills().filter(skill => skill.getSkillEffects().some(effect => effect.stats?.some(stat => stat.multipliers?.includes(multiKey))) && skill.getAllocatedPoints() > 0);
    
        skillsAffected.forEach(skill => {
            skill.getSkillEffects().forEach(effect => {
                effect.stats?.forEach(statInfo => {
                    if (!statInfo.multipliers?.find(multi => multi == multiKey)) return;

                    let previousValue: number = 0;
                    let currentValue: number = 0;
                    let previousMultiValue: number;
                    let currentMultiValue: number;
                    let baseMulti: number;

                    let conditionalValues = this.conditionalsAreActive(effect.conditionals);

                    if (conditionalValues == false) return;
                    else if (conditionalValues == true) baseMulti = 1;
                    else baseMulti = conditionalValues;

                    currentMultiValue = baseMulti * (currentMulti.value ? 1 + (currentMulti.value / 100): 1);
                    previousMultiValue = baseMulti * (previousMulti.value ? 1 + (previousMulti.value / 100) : 1);
                
                    let valueIndex: number = effect.values.length < skill.getAllocatedPoints() ? effect.values.length - 1: skill.getAllocatedPoints() - 1; 
                    
                    previousValue = valueIndex < 0 ? 0 : effect.values[valueIndex] * previousMultiValue;
                    currentValue = valueIndex < 0 ? 0 : effect.values[valueIndex] * currentMultiValue;

                    let total = this.cleanValue(currentValue - previousValue);

                    let stat = this.stats.get(statInfo.key);
                    stat.value != null ? stat.value = this.cleanValue(stat.value + total) : stat.value = total;
                });
            });
        });
    }

    private cleanValue(value: number): number {
        let fixedNumber = value.toFixed(2);
        return parseFloat(fixedNumber);
    }

    public updateStatsBasedOnUpdatedConditional(previousConditional: Conditional, currentConditional: Conditional, conKey: string) {

        let skillsAffected = this.getAllSkills().filter(skill => skill.getSkillEffects().some(effect => effect.conditionals?.includes(conKey)) && skill.getAllocatedPoints() > 0);

        skillsAffected.forEach(skill => {
            skill.getSkillEffects().forEach(effect => {
                if (!effect.conditionals?.find(conditional => conditional == conKey)) return;
                
                let currentMulti: number = currentConditional.usesStacks ? (currentConditional.value && currentConditional.isActive ? currentConditional.value : 0) : null;
                let previousMulti: number = previousConditional.usesStacks ? (previousConditional.value && previousConditional.isActive ? previousConditional.value : 0) : null;

                let previousValue: number = 0;
                let currentValue: number = 0;

                let unModifiedConditionals = effect.conditionals.filter(conditional => conditional != conKey);

                let conditionalValues = this.conditionalsAreActive(unModifiedConditionals);
                if (conditionalValues == false) return;

                if (typeof conditionalValues === 'number') {
                    if (currentMulti) currentMulti += conditionalValues;
                    if (previousMulti) previousMulti += conditionalValues; 
                }

                if (currentMulti === null && currentConditional.isActive) currentMulti = 1;
                else if (!currentConditional.isActive) currentMulti = 0;

                if (previousMulti === null && previousConditional.isActive) previousMulti = 1;
                else if (!previousConditional.isActive) previousMulti = 0;

                let valueIndex: number = effect.values.length < skill.getAllocatedPoints() ? effect.values.length - 1: skill.getAllocatedPoints() - 1; 
                
                previousValue = valueIndex < 0 ? 0 : effect.values[valueIndex] * previousMulti;
                currentValue = valueIndex < 0 ? 0 : effect.values[valueIndex] * currentMulti;

                let total = currentValue - previousValue;

                effect.stats.forEach(statInfo => {
                    let stat = this.stats.get(statInfo.key);
                    let prevStat = JSON.parse(JSON.stringify(stat));

                    statInfo.multipliers?.forEach(multiKey => {
                        let multiplier = this.stats.get(multiKey);
                        if (multiplier.value) total *= (1 + (multiplier.value / 100));   
                    });
                    
                    total = this.cleanValue(total);

                    stat.value != null ? stat.value = this.cleanValue(stat.value + total) : stat.value = total;
                    if (stat.isMultiplier) this.updateStatsBasedOnUpdatedMulti(prevStat, stat, statInfo.key)
                });
            });
        });
    }


    public addConditionalMap(conditionals: Map<string, Conditional>) {
        conditionals.forEach((val, key) => {
            this.conditionals.set(key, val);
        })
    }

    public addStatsMap(stats: Map<string, CharacterStat>) {
        stats.forEach((val, key) => {
            this.stats.set(key, val);
        })
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
     *          Map<string, Conditional>
     */
    public getConditionals(): Map<string, Conditional> {
        return this.conditionals;
    }

    /**
     * Returns the base stat of the character
     * 
     * @returns 
     *          Map<string, CharacterStat>
     */
    public getStats(): Map<string, CharacterStat> {
        return this.stats;
    }

   

    public abstract handleAdditionOfNonNormalSkill(skill: Skill, pos?: number): void;

    public abstract handleRemovalOfNonNormalSkill(skill: Skill, pos?: number): void;
}
