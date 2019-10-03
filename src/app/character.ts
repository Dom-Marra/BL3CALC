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
    validateModification(modification: number): Boolean;
    
    /**
     * Adds point into amara
    */
    addPoint(): void;
    
    /**
    * removes point from amara
    */
    removePoint(): void;
    
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
     * Retrieves number of allocated points in amara
     * 
     * @returns
     *          number of points
     */
    getAllocatedPoints(): number;
}
