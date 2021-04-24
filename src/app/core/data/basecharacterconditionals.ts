import { Conditional } from "../models/conditional.model";

export const BASE_CHARACTER_CONDITIONALS: Map<string, Conditional> = new Map(
    [
        ['usedActionSkill', { 
            text: "Used an action skill"
        }],
        ['activateKillSkills', { 
            text: "Activate kill skills"
        }],
        ['moving', { 
            text: "Moving"
        }],
        ['criticalKill', {
            text: "Killed an enemy with a Crit"
        }],
        ['splashDmgHit', {
            text: "Shots deal splash damage"
        }],
        ['shieldFullyDepleted', {
            text: "Shields are fully depleted"
        }],
        ['enemyDamagedByAS', {
            text: "Enemy is damaged by action skill"
        }]
    ]
);