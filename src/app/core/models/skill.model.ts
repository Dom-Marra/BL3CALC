import { SkillEffect } from "./skilleffect.model";

export interface SkillModel {
    type: 'normalskill' | 'actionskill' | 'actionmod' | 'otherskill',
    color: string,
    x: number,
    y: number,
    preReq: number,
    description: string,
    image: string,
    maxPoints: number,
    name: string,
    skillEffects: Array<SkillEffect>,
    requiredActionSkill?: SkillModel
}