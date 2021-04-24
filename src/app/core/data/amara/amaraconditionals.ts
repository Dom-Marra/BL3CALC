import { Conditional } from "../../models/conditional.model";

export const AMARA_CONDITIONALS: Map<string, Conditional> = new Map([
    ['rushStacksConsumed', {
        text: "Amount of consumed rush stacks",
        usesStacks: true,
        stackKey: 'maxRushStacks'
    }],
    ['rushStacks', {
        text: "Amount of rush stacks",
        usesStacks: true,
        stackKey: 'maxRushStacks'
    }],
    ['samsaraStacks', {
        text: "Amount of samsara stacks",
        usesStacks: true,
        stackKey: 'samsaraStacks'
    }],
    ['mindfulnessStacks', {
        text: "Amount of mindfulness stacks",
        usesStacks: true,
        stackKey: 'maxMindfulnessStacks'
    }],
    ['graspedAnEnemy', {
        text: "Have you grasped an enemy?"
    }],
    ['dealtEleDmgWithElementalWeapon', {
        text: "Dealing weapon elemental damage"
    }]
])