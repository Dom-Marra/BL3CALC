export interface CharacterStat {
    text: string;                                  //text of the stats
    valueType: 'flat' | 'percent';                 //value representation
    group: 'offense' | 'defense' | 'utility';      //group that the stat belongs to
    value?: number;                                //Value of the stat
    isMultiplier?: boolean;
    isAdditive?: boolean;
}