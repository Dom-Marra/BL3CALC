import { CharacterStat } from "./characterstat.model";
import { Conditional } from "./conditional.model";

export interface SkillEffect {
    name: string;
    textValues?: Array<string>;
    values?: Array<number>;
    hidden?: boolean;
    conditionals?: Array<Conditional>; 
    stats?: Array<CharacterStat>;
}