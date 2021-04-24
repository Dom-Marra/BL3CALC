export interface StatInfo {
    key: string,
    multipliers?: Array<string>,
    isBaseStackValue?: boolean,
    isBonusStackValue?: boolean
}

export interface SkillEffect {
    name: string;
    textValues?: Array<string>;
    values?: Array<number>;
    hidden?: boolean;
    conditionals?: Array<string>; 
    stats?: Array<StatInfo>;
}