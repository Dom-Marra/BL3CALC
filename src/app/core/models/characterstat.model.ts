export interface CharacterStat {
    text: string;                                  //text of the stats
    value: number;                                 //Value of the stat
    valueType: 'flat' | 'percent';                 //value representation
    group: 'offense' | 'defense' | 'utility';      //group that the stat belongs to
}