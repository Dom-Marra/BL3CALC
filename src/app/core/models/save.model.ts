import { Conditional } from "./conditional.model";


export interface SavedEquippedSkill {
    color: string,
    index: number
}

export interface SavedEquippedSkillSet {
    actionSkill?: SavedEquippedSkill,
    actionMods?: Array<SavedEquippedSkill>,
    otherSkill?: SavedEquippedSkill
}

export interface Save {
    type: string;
    orangeTree?: Array<number>;
    blueTree?: Array<number>;
    greenTree?: Array<number>;
    conditionals?: {[key: string]: Conditional},
    equippedSkills?: Array<SavedEquippedSkillSet>
}