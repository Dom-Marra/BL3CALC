import { CharacterStat } from "./characterstat.model";
import { Conditional } from "./conditional.model";

export interface BaseCharacterModel {
    maxPoints: number,
    conditionals: {[key: string]: Conditional},
    stats: {[key: string]: CharacterStat}
}