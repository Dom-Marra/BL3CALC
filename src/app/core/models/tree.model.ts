import { SkillModel } from "./skill.model";

export interface TreeModel {
    name: string,
    image: string,
    color: string,
    skills: Array<SkillModel>
}