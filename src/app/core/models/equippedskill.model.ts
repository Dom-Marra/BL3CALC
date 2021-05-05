import { ActionMod } from "../classes/actionmod";
import { ActionSkill } from "../classes/actionskill";
import { OtherSkill } from "../classes/otherskill";

export interface EquippedSkill {
    actionSkill: ActionSkill;
    actionMods: Array<ActionMod>;
    otherSkill?: OtherSkill
}