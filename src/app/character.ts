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
     *        Boolean whether the allocated points can be modified or not
     */
    validateModification(modification: number, skillType: number): Boolean;
    
    /**
     * Adds point into a specific skill type allocation
     * 
     * @param skillType
     *              0 = normal skills
     *              1 = action skills
     *              2 = action skill mods
     *              3 = other skills (pets, elementals, etc...)
    */
    addPoint(skillType: number): void;
    
    /**
    * removes point from a specific skill type allocation
    * 
    * @param skillType
    *              0 = normal skills
    *              1 = action skills
    *              2 = action skill mods
    *              3 = other skills (pets, elementals, etc...)
    */
    removePoint(skillType: number): void;
    
    /**
    * Retrieves skills that belong to the blue tree
    * 
    * @returns
    *          Array of skills
    */
    getBlueSkills(): Skill[];
    
    /**
    * Retrieves skills that belong to the red tree
    * 
    * @returns
    *          Array of skills
    */
    getRedSkills(): Skill[];
    
    /**
    * Retrieves skills that belong to the green tree
    * 
    * @returns
    *          Array of skills
    */
    getGreenSkills(): Skill[];
    
    /**
     * Retrieves number of allocated points of a skill type 
     * 
     * @param skillType
     *              0 = normal skills
     *              1 = action skills
     *              2 = action skill mods
     *              3 = other skills (pets, elementals, etc...)
     * 
     * @returns
     *          number of points of a skill type
     */
    getAllocatedPoints(skillType: number): number;

}
