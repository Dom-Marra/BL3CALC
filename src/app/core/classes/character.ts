import { Skill } from './skill';
import { NormalSkill } from './normalskill';
import { EquippedSkill } from '../models/equippedskill.model';
import { Conditional } from '../models/conditional.model';
import { CharacterStat } from '../models/characterstat.model';
import { SkillTree } from './skilltree';
import { ConditionalInfo } from '../models/skilleffect.model';
import { BaseCharacterModel } from '../models/basecharacter.model';

export abstract class Character {

    public readonly MIN_POINTS: number = 0;                //Min points that can be allocated
    public readonly MAX_NORMAL_SKILL_POINTS: number;       //Max points that can be allocated for normal skills

    public conditionals: { [key: string]: Conditional };   //Condtionals that effect stat effects
    public stats: { [key: string]: CharacterStat };        //Base set of character stats

    public maxActionSkillPoints: number;                   //Max points that can be allocated for action skills
    public maxActionModPoints: number;                     //Max points that can be allocated for action mods
    public maxOtherSkillPoints: number;                    //Max points that can be allocated for other skills

    public allocatedPoints: number = 0;

    public equippedSkills: Array<EquippedSkill>;           //Action skills, action mods, and other skills allocated
    public name: string;                                   //Name of the Character

    public greenTree: SkillTree;                           //Green Skill Tree
    public blueTree: SkillTree;                            //Blue Skill Tree
    public orangeTree: SkillTree;                          //Orange Skill Tree

    public conditionalsInUse: Map<string, number> = new Map();  //conditionals in use, key their key in conditionals, and value how many occurances of it there are

    constructor(
        baseCharacterData: BaseCharacterModel,
        maxActionSkillPoints: number,
        maxActionModPoints: number,
        maxOtherSkillPoints: number
    ) {
        this.maxActionModPoints = maxActionModPoints;
        this.maxActionSkillPoints = maxActionSkillPoints;
        this.maxOtherSkillPoints = maxOtherSkillPoints;

        this.conditionals = baseCharacterData.conditionals;
        this.stats = baseCharacterData.stats;

        this.MAX_NORMAL_SKILL_POINTS = baseCharacterData.maxPoints;

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

        if (skill.allocatedPoints == 1) this.addConditionalsFromSkill(skill);

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
        skill.skillEffects.forEach(effect => {
            effect.conditionals?.forEach(conditional => {
                if (this.conditionalsInUse.has(conditional.key)) {
                    let occurances = this.conditionalsInUse.get(conditional.key);
                    this.conditionalsInUse.set(conditional.key, ++occurances);
                } else {
                    this.conditionalsInUse.set(conditional.key, 1);
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

        if (skill.allocatedPoints == 0) this.removeConditionalsFromSkill(skill);

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
        skill.skillEffects.forEach(effect => {
            effect.conditionals?.forEach(conditional => {
                let occurances = this.conditionalsInUse.get(conditional.key);

                if (occurances == 1) {
                    this.conditionalsInUse.delete(conditional.key);
                } else {
                    this.conditionalsInUse.set(conditional.key, --occurances);
                }
            });
        });
    }

    /**
     * Updates the characters stats based on new allocation on a skill
     * 
     * @param skill
     *        Skill: the skill that had its allocation changed 
     * @param modification 
     *        number: the change in allocation, can either be +1 or -1
     */
    private updateStatsBasedOnSkillAllocation(skill: Skill, modification: 1 | -1) {
        skill.skillEffects.forEach(effect => {
            if (!effect.values || !effect.stats) return;

            let multi: number = 0;
            let currentValue: number = 0;
            let previousValue: number = 0;

            let conditionalValues = this.conditionalsAreActive(effect.conditionals);

            if (conditionalValues == false) return;
            else if (conditionalValues == true) multi = 1;
            else  multi += conditionalValues;

            let currentValueIndex: number = effect.values.length < skill.allocatedPoints ? effect.values.length - 1 : skill.allocatedPoints - 1;
            let previousValueIndex: number = effect.values.length < skill.allocatedPoints - modification ? effect.values.length - 1 : (skill.allocatedPoints - modification) - 1;

            if (currentValueIndex == previousValueIndex) return;

            previousValue = previousValueIndex < 0 ? 0 : effect.values[previousValueIndex] * multi;
            currentValue = currentValueIndex < 0 ? 0 : effect.values[currentValueIndex] * multi;

            let total = currentValue - previousValue;

            effect.stats.forEach(statInfo => {
                let stat = this.stats[statInfo.key];
                let prevStat = JSON.parse(JSON.stringify(stat));
                let statTotal: number = total;

                if (statInfo.isBaseStackValue) {
                    let otherSkill = this.getAllSkills().find(other => skill != other && other.skillEffects.find(effect => effect.stats?.find(stat => stat.isBaseStackValue) && other.allocatedPoints > 0));
                    if (otherSkill) return;
                }

                statInfo.additives?.forEach(addKey => {
                    if (this.stats[addKey].value) statTotal += (this.stats[addKey].value * modification);
                });

                statInfo.multipliers?.forEach(multiKey => {
                    let multiplier = this.stats[multiKey];
                    if (multiplier.value) statTotal *= (1 + (multiplier.value / 100));
                });

                statTotal = this.cleanValue(statTotal);

                stat.value != null ? stat.value = this.cleanValue(stat.value + statTotal) : stat.value = statTotal;
                if (stat.isMultiplier) this.updateStatsBasedOnUpdatedMulti(prevStat, stat, statInfo.key)
                if (stat.isAdditive) this.updateStatsBasedOnUpdatedAdditive(prevStat, stat, statInfo.key)
            });
        });
    }

    /**
     * Updates characters stats based on an updated multiplier value (Aka stat that acts as a multiplier to other stats)
     * 
     * @param previousMulti 
     *          CharacterStat: The previous value
     * @param currentMulti 
     *          CharacterStat: The current value 
     * @param multiKey 
     *          string: the key of the stat
     */
    private updateStatsBasedOnUpdatedMulti(previousMulti: CharacterStat, currentMulti: CharacterStat, multiKey: string) {
        let skillsAffected = this.getAllSkills().filter(skill => skill.skillEffects.some(effect => effect.stats?.some(stat => stat.multipliers?.includes(multiKey))) && skill.allocatedPoints > 0);

        skillsAffected.forEach(skill => {
            skill.skillEffects.forEach(effect => {
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

                    currentMultiValue = baseMulti * (currentMulti.value ? 1 + (currentMulti.value / 100) : 1);
                    previousMultiValue = baseMulti * (previousMulti.value ? 1 + (previousMulti.value / 100) : 1);

                    let valueIndex: number = effect.values.length < skill.allocatedPoints ? effect.values.length - 1 : skill.allocatedPoints - 1;

                    previousValue = valueIndex < 0 ? 0 : effect.values[valueIndex] * previousMultiValue;
                    currentValue = valueIndex < 0 ? 0 : effect.values[valueIndex] * currentMultiValue;

                    let total = this.cleanValue(currentValue - previousValue);

                    let stat = this.stats[statInfo.key];
                    stat.value != null ? stat.value = this.cleanValue(stat.value + total) : stat.value = total;
                });
            });
        });
    }

    private updateStatsBasedOnUpdatedAdditive(previousAdditive: CharacterStat, currentAdditive: CharacterStat, addKey: string) {
        let skillsAffected = this.getAllSkills().filter(skill => skill.skillEffects.some(effect => effect.stats?.some(stat => stat.additives?.includes(addKey))) && skill.allocatedPoints > 0);
    
        skillsAffected.forEach(skill => {
            skill.skillEffects.forEach(effect => {
                effect.stats?.forEach(statInfo => {
                    if (!statInfo.additives?.find(add => add == addKey)) return;

                    let previousValue: number = 0;
                    let currentValue: number = 0;
                    let previousAddValue: number = previousAdditive.value ? previousAdditive.value : 0;
                    let currentAddValue: number = currentAdditive.value ? currentAdditive.value : 0;
                    let multiplier: number;

                    let conditionalValues = this.conditionalsAreActive(effect.conditionals);

                    if (conditionalValues == false) return;
                    else if (conditionalValues == true) multiplier = 1;
                    else multiplier = conditionalValues;

                    let valueIndex: number = effect.values.length < skill.allocatedPoints ? effect.values.length - 1 : skill.allocatedPoints - 1;

                    previousValue = valueIndex < 0 ? 0 : effect.values[valueIndex] + (previousAddValue * multiplier);
                    currentValue = valueIndex < 0 ? 0 : effect.values[valueIndex] + (currentAddValue * multiplier);

                    let total = this.cleanValue(currentValue - previousValue);

                    let stat = this.stats[statInfo.key];
                    stat.value != null ? stat.value = this.cleanValue(stat.value + total) : stat.value = total;
                });
            });
        });
    }

    /**
     * Updates characters stats based on an updated conditinoal
     * 
     * @param previousConditional
     *        Conditional: previous value of the conditional 
     * @param currentConditional 
     *         Conditional: current value of the conditional
     * @param conKey 
     *         string: key of the conditional
     */
    public updateStatsBasedOnUpdatedConditional(previousConditional: Conditional, currentConditional: Conditional, conKey: string) {

        let skillsAffected = this.getAllSkills().filter(skill => skill.skillEffects.some(effect => effect.conditionals?.filter(conditionalInfo => conditionalInfo.key == conKey).length > 0) && skill.allocatedPoints > 0);

        skillsAffected.forEach(skill => {
            skill.skillEffects.forEach(effect => {
                if (!effect.conditionals?.find(conditional => conditional.key == conKey)) return;

                let currentMulti: number = currentConditional.usesStacks ? (currentConditional.value && currentConditional.isActive ? currentConditional.value : 0) : null;
                let previousMulti: number = previousConditional.usesStacks ? (previousConditional.value && previousConditional.isActive ? previousConditional.value : 0) : null;

                let previousValue: number = 0;
                let currentValue: number = 0;

                let unModifiedConditionals = effect.conditionals.filter(conditional => conditional.key != conKey);
                let conditionalInfo = effect.conditionals.find(conditional => conditional.key == conKey);

                let conditionalValues = this.conditionalsAreActive(unModifiedConditionals);

                if (conditionalValues == false) return;
                else if (typeof conditionalValues === 'number') {
                    currentMulti ? currentMulti *= conditionalValues : currentMulti = conditionalValues;
                    previousMulti ? previousMulti *= conditionalValues : previousMulti = conditionalValues;
                }

                if (currentConditional.isActive && conditionalInfo.activeMultiplier != null) currentMulti ? currentMulti *= conditionalInfo.activeMultiplier : currentMulti = conditionalInfo.activeMultiplier;
                else if (!currentConditional.isActive && conditionalInfo.nonActiveMultiplier != null) currentMulti ? currentMulti *= conditionalInfo.nonActiveMultiplier : currentMulti = conditionalInfo.nonActiveMultiplier;
                else if (currentMulti === null && currentConditional.isActive) currentMulti = 1;
                else if (!currentConditional.isActive) currentMulti = 0;

                if (previousConditional.isActive && conditionalInfo.activeMultiplier != null) previousMulti ? previousMulti *= conditionalInfo.activeMultiplier : previousMulti = conditionalInfo.activeMultiplier;
                else if (!previousConditional.isActive && conditionalInfo.nonActiveMultiplier != null) previousMulti ? previousMulti *= conditionalInfo.nonActiveMultiplier : previousMulti = conditionalInfo.nonActiveMultiplier;
                else if (previousMulti === null && previousConditional.isActive) previousMulti = 1;
                else if (!previousConditional.isActive) previousMulti = 0;

                let valueIndex: number = effect.values.length < skill.allocatedPoints ? effect.values.length - 1 : skill.allocatedPoints - 1;

                previousValue = valueIndex < 0 ? 0 : effect.values[valueIndex] * previousMulti;
                currentValue = valueIndex < 0 ? 0 : effect.values[valueIndex] * currentMulti;

                let total = currentValue - previousValue;

                effect.stats.forEach(statInfo => {
                    let stat = this.stats[statInfo.key];
                    let prevStat = JSON.parse(JSON.stringify(stat));
                    let statTotal: number = total;

                    statInfo.additives?.forEach(addKey => {
                        if (this.stats[addKey].value) statTotal += this.stats[addKey].value;
                    });

                    statInfo.multipliers?.forEach(multiKey => {
                        let multiplier = this.stats[multiKey];
                        if (multiplier.value) statTotal *= (1 + (multiplier.value / 100));
                    });

                    statTotal = this.cleanValue(statTotal);
                    

                    stat.value != null ? stat.value = this.cleanValue(stat.value + statTotal) : stat.value = statTotal;
                    if (stat.isMultiplier) this.updateStatsBasedOnUpdatedMulti(prevStat, stat, statInfo.key)
                    if (stat.isAdditive) this.updateStatsBasedOnUpdatedAdditive(prevStat, stat, statInfo.key)
                });
            });
        });
    }

     /**
     * Checks to see if all conditionals are active, but also if they have 
     * any effects while not active or active.
     * 
     * @param conditionals
     *         Array<ConditionalInfo>: Conditionals to check
     * @returns 
     *          number: the multiplier value found from the outcome of the conditionals states
     *          boolean: whether the conditinals are active or not
     */
      public conditionalsAreActive(conditionals: Array<ConditionalInfo>): number | boolean {
        let res: number | boolean;

        conditionals?.some(conditionalInfo => {
            let conditional = this.conditionals[conditionalInfo.key];

            if ((!conditional || !conditional.isActive) && conditionalInfo.nonActiveMultiplier == null) {
                res = false;
                return;
            } else if (!conditional.isActive && conditionalInfo.nonActiveMultiplier) {
                res == null ? res = conditionalInfo.nonActiveMultiplier : (<number>res) *= conditionalInfo.nonActiveMultiplier;
            }

            if (conditional.usesStacks && conditional.isActive) res == null ? res = conditional.value : (<number>res) += conditional.value;
            if (conditionalInfo.activeMultiplier != null && conditional.isActive) res == null ? res = conditionalInfo.activeMultiplier : (<number>res) *= conditionalInfo.activeMultiplier;
        });

        return res == null ? true : res;
    }

    /**
     * Returns all skills of the character
     * 
     * @returns
     *          Array<Skill> 
     */
     private getAllSkills(): Array<Skill> {
        return new Array().concat(this.greenTree.skills, this.orangeTree.skills, this.blueTree.skills);
    }

    /**
     * Fixes values to 2 decimal points
     * 
     * @param value
     *          number: value to fix 
     * @returns 
     *          number: fixed value
     */
    private cleanValue(value: number): number {
        let fixedNumber = value.toFixed(2);
        return parseFloat(fixedNumber);
    }

    /**
     * Adds conditionals to the character
     * 
     * @param conditionals
     *          { [key: string]: Conditional }: Conditionals to add
     */
    public addConditionals(conditionals: { [key: string]: Conditional }) {
        for (let key in conditionals) {
            this.conditionals[key] = conditionals[key];
        }
    }

    /**
     * Adds stats to the character
     * 
     * @param stats
     *        { [key: string]: CharacterStat }: Stats to add
     */
    public addStats(stats: { [key: string]: CharacterStat }) {
        for (let key in stats) {
            this.stats[key] = stats[key];
        }
    }

    public abstract handleAdditionOfNonNormalSkill(skill: Skill, pos?: number): void;

    public abstract handleRemovalOfNonNormalSkill(skill: Skill, pos?: number): void;
}
