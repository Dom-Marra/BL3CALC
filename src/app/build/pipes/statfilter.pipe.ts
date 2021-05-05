import { Pipe, PipeTransform } from '@angular/core';
import { CharacterStat } from 'src/app/core/models/characterstat.model';

@Pipe({
  name: 'statfilter',
  pure: false
})
export class StatfilterPipe implements PipeTransform {

  transform(stats: {[key: string]: CharacterStat}, group: string): Map<string, CharacterStat> {
    let groupedStats: Map<string, CharacterStat> = new Map();

    for (let key in stats) {
      if (stats[key].group == group && stats[key].value && stats[key].value != 0) groupedStats.set(key, stats[key]);
    }

    return groupedStats.size > 0 ? groupedStats : null;
  }

}
