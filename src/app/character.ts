import { Skill } from './skill';

export interface Character {

    /**
     * Checks if the character can have a point added or removed from it
     * 
     * @param modification
     *              number of points to add or remove from this character
     *              this should be 1 or -1, other numbers will not work
     * 
     * @returns 
     *        Boolean: whether the allocated points can be modified or not
     */
    validateModification(modification: number, skill: Skill): Boolean;
    
    /**
     * Adds point into a specific skill type allocation
     * 
     * @param skill
    */
    addPoint(skill: Skill): void;
    
    /**
    * removes point from a specific skill type allocation
    * 
    * @param skill
    */
    removePoint(skill: Skill): void;
    
    /**
    * Retrieves skills that belong to the blue tree
    * 
    * @returns
    *          Array
    */
    getBlueSkills(): Skill[];
    
    /**
    * Retrieves skills that belong to the red tree
    * 
    * @returns
    *          Array
    */
    getRedSkills(): Skill[];
    
    /**
    * Retrieves skills that belong to the green tree
    * 
    * @returns
    *          Array
    */
    getGreenSkills(): Skill[];
    
    /**
     * Retrieves number of allocated points in normal skills 
     * 
     * @returns
     *          number
     */
    getAllocatedPoints(): number;

}
