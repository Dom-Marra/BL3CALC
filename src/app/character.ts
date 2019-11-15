import { Skill } from './skill';
import { NormalSkill } from './normalskill';
import { OtherSkill } from './otherskill';
import { ActionSkill } from './actionskill';
import { ActionMod } from './actionmod';

export abstract class Character {

    public readonly MIN_POINTS = 0;                       //Min points that can be allocated
    public readonly MAX_NORMAL_SKILL_POINTS = 48;         //Max points that can be allocated for normal skills

    private conditionals = {                              //Situations that affects the character
        usedActionSkill: { 
            active: false,
            header: "Used Action Skill?"
        },
        dealtMeleeDmg: { //Used on Amara
            active: false,
            header: "Dealt melee damage?"
        },
        activateKillSkills: { 
            active: false,
            header: "Activate kill skills?"
        },
        enemyDamagedByAS: { //Used on Amara
            active: false,
            header: "Dealt elemental Damage?"
        },
        dealtEleDmgWithElementalWeapon: { //Used on Amara
            active: false,
            header: "Enemey is damaged by action skill?"
        },
        dealtElementalDmg: {    //Used on Amara
            active: false,
            header: "Dealt elemental damage with your weapon?"
        },
        reloaded: {     //Used on fl4k
            active: false,
            header: "Did you reload recently?"
        },
        moving: { 
            active: false,
            header: "Are you moving?"
        },
        standingStill: { //used on fl4k
            active: false,
            header: "Are you standing still?"
        },
        aboveHalfHealth: { //used on fl4k
            active: false,
            header: "Are you above half health?"
        },
        enemyNotTargetingYou: { //used on fl4k
            active: false,
            header: "Enemy not targeting you?"
        },
        noEnemiesNearby: { //used on fl4k
            active: false,
            header: "No enemies nearby?"
        },
        criticalKill: {
            active: false,
            header: "Killed an enemy with Crit?"
        },
        fightingAHuman: {  //used on fl4k
            active: false,
            header: "Fighting a human?"
        },
        fightingARobot: {  //used on fl4k
            active: false,
            header: "Fighting a robot?"
        },
        fightingABeast: {  //used on fl4k
            active: false,
            header: "Fighting a beast?"
        },
        shieldsActive: {  //used on moze
            active: false,
            header: "Are your shields active?"
        },
        critHit: {  //used on moze
            active: false,
            header: "Is your shot a crit?"
        },
        splashDmgHit: {
            active: false,
            header: "Do your shots deal splash damage?"
        },
        dealtSplashDmg: { //used on moze
            active: false,
            header: "Did you deal splash damage?"
        },
        shieldFullyDepleted: {
            active: false,
            header: "Did your shields fully deplete?"
        }
    }


    private maxActionSkillPoints = 0;                      //Max points that can be allocated for action skills
    private maxActionModPoints = 0;                        //Max points that can be allocated for action mods
    private maxOtherSkillPoints = 0;                       //Max points that can be allocated for other skills
  
    private allocatedNormalSkillPoints = 0;              //number of points allocated in normal skills

    private equippedSkills: Array<{                      //Action skills, action mods, and other skills allocated
        actionSkill?: ActionSkill;
        actionMods?: Array<ActionMod>;
        otherSkill?: OtherSkill;}> = [{actionMods: []},{actionMods: []}];
    private allocatedSkills: Array<Skill> = [];          //All skills allocated

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
    validateModification(modification: number, skill: Skill) {

        //Invalid number return false
        if (modification < -1 || modification > 1 || modification == 0) return false;

        //At max points and modification is addition return false
        if (this.allocatedNormalSkillPoints == this.MAX_NORMAL_SKILL_POINTS && skill instanceof NormalSkill
        && modification > 0) return false;

        //At min points and modification is subtraction return false
        if (this.allocatedNormalSkillPoints == this.MIN_POINTS && skill instanceof NormalSkill
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
     * Sets the number of allocated points of normal skills 
     * 
     */
    setAllocatedNormalSkillPoints(newAmount: number) {
        this.allocatedNormalSkillPoints = newAmount;
    }

    /**
     * Returns the equipped skills
     * 
     * @returns
     *          EquippedSkills
     */
    getEquippedSkills(): Array<any> {
        return this.equippedSkills;
    }

    /**
     * Sets the equipped skills
     * 
     * @params
     *          EquippedSkills
     */
    setEquippedSkills(equippedSkills: Array<any>) {
        this.equippedSkills = equippedSkills;
    }

    /**
     * Returns the allocated skills
     * 
     * @returns
     *          Array<Skill>
     */
    getAllocatedSkills(): Array<Skill> {
        return this.allocatedSkills;
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
     * Returns the a set of objects that correspond to situations that if true
     * effect the character
     * 
     * @returns
     *          any
     */
    getConditionals(): any {
        return this.conditionals;
    }

    /**
     * Adds point into a specific skill type allocation
     * 
     * @param skill
     *        Skill to be allocated
     * @param pos
     *        position of skill in equipped skills (only applies to action mods and action skills)
     */
    abstract addPoint(skill: Skill, pos?: number): void;
        
    /**
     * removes point from a specific skill type allocation
     * 
     * @param skill
     *        Skill to be removed
     * @param pos
     *        position of skill in equipped skills (only applies to action mods and action skills)
     */
    abstract removePoint(skill: Skill, pos?: number): void;
    
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

     /**
     * Returns the extra conditionals
     * 
     * @returns
     *           Object
     */
    abstract getExtraCond(): Object;

    /**
     * Returns the extra stat types for the character
     * 
     * @returns
     *           Object
     */
    abstract getExtraTypes(): Object;

    /**
     * Returns blue tree name
     * 
     * @returns
     *          string
     */
    abstract getBlueTreeName(): string;

    /**
     * Returns red tree name
     * 
     * @returns
     *          string
     */
    abstract getRedTreeName(): string;

    /**
     * Returns green tree name
     * 
     * @returns
     *          string
     */
    abstract getGreenTreeName(): string;

    /**
     * Returns blue tree header image path
     * 
     * @returns
     *          string
     */
    abstract getBlueTreeHeader(): string;

    /**
     * Returns red tree header image path
     * 
     * @returns
     *          string
     */
    abstract getRedTreeHeader(): string;

    /**
     * Returns green tree header image path
     * 
     * @returns
     *          string
     */
    abstract getGreenTreeHeader(): string;

    
}
