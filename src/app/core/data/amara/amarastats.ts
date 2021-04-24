import { CharacterStat } from "../../models/characterstat.model";

export const AMARA_STATS: Map<string, CharacterStat> = new Map([
   [ 'rushStackEffectiveness', {
        text: "Rush Stack Effectiveness",
        valueType: "percent",
        group: 'utility',
        isMultiplier: true
    }],
    ['maxRushStacks', {
        text: "Max Rush Stacks",
        valueType: "flat",
        group: 'utility'
    }],
    ['maxSamsaraStacks', {
        text: "Max Samsara Stacks",
        valueType: "flat",
        group: 'utility'
    }],
    ['maxMindfulnessStacks', {
        text: "Max Mindfulness Stacks",
        valueType: "flat",
        group: 'utility'
    }]
])