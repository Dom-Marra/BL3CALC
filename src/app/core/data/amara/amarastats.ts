import { CharacterStat } from "../../models/characterstat.model";

export const AMARA_STATS: {[key: string]: CharacterStat} = {
    rushStackEffectiveness: {
        text: "Rush Stack Effectiveness",
        value: 0,
        valueType: "percent",
        group: 'utility'
    },
    maxRushStacks: {
        text: "Max Rush Stacks",
        value: 0,
        valueType: "flat",
        group: 'utility'
    },
    maxSamsaraStacks: {
        text: "Max Samsara Stacks",
        value: 0,
        valueType: "flat",
        group: 'utility'
    },
    maxMindfulnessStacks: {
        text: "Max Mindfulness Stacks",
        value: 0,
        valueType: "flat",
        group: 'utility'
    }
}