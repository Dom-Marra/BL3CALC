import { Conditional } from "../../models/conditional.model";

export const AMARA_CONDITIONALS: {[key: string]: Conditional} = {
    rushStacksConsumed: {
        isActive: false,
        text: "Consumed rush stacks?",
        numberInput: true,
        currentValue: 0,
        maxValue: 0,
    },
    rushStacks: {
        isActive: false,
        text: "Using rush stacks?",
        numberInput: true,
        currentValue: 0,
        maxValue: 0
    },
    samsaraStacks: {
        isActive: false,
        text: "Using samsara stacks?",
        numberInput: true,
        currentValue: 0,
        maxValue: 0,
    },
    mindfulnessStacks: {
        isActive: false,
        text: "Using mindfulness stacks?",
        numberInput: true,
        currentValue: 0,
        maxValue: 0
    },
    graspedAnEnemy: {
        isActive: false,
        text: "Have you grasped an enemy?"
    },
}