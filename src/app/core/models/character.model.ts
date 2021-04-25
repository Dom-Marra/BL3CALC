import { CharacterStat } from "./characterstat.model";
import { Conditional } from "./conditional.model";
import { SkillModel } from "./skill.model";
import { TreeModel } from "./tree.model";

export interface CharacterModel {
    name: string,
    defaultSkills: Array<SkillModel>,
    conditionals: {[key: string]: Conditional},
    stats: {[key: string]: CharacterStat},
    trees: Array<TreeModel>
}