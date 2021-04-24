export interface StatInfo {
    key: string;
    multipliers?: Array<string>;
    isBaseStackValue?: boolean;
    isBonusStackValue?: boolean;
}

export interface ConditionalInfo {
    key: string;
    activeMultiplier?: number;
    nonActiveMultiplier?: number;
}

export interface SkillEffect {
    name: string;
    textValues?: Array<string>;
    values?: Array<number>;
    hidden?: boolean;
    conditionals?: Array<ConditionalInfo>; 
    stats?: Array<StatInfo>;
}