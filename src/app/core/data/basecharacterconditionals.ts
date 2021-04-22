import { Conditional } from "../models/conditional.model";

export const BASE_CHARACTER_CONDITIONALS: {[key: string]: Conditional} = {
    usedActionSkill: { 
        isActive: false,
        text: "Used an action skill"
    },
    activateKillSkills: { 
        isActive: false,
        text: "Activate kill skills"
    },
    moving: { 
        isActive: false,
        text: "Moving"
    },
    criticalKill: {
        isActive: false,
        text: "Killed an enemy with a Crit"
    },
    splashDmgHit: {
        isActive: false,
        text: "Shots deal splash damage"
    },
    shieldFullyDepleted: {
        isActive: false,
        text: "Shields are fully depleted"
    }
}