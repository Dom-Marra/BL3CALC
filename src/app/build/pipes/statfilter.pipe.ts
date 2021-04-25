import { Pipe, PipeTransform } from '@angular/core';
import { CharacterStat } from 'src/app/core/models/characterstat.model';

@Pipe({
  name: 'statfilter',
  pure: false
})
export class StatfilterPipe implements PipeTransform {

  transform(stats: Map<string, CharacterStat>, group: string): Map<string, CharacterStat> {
    let groupedStats: Map<string, CharacterStat> = new Map();

    stats.forEach((val, key) => {
      if (val.group == group && val.value && val.value != 0) groupedStats.set(key, val);  
    });

    return groupedStats.size > 0 ? groupedStats : null;
  }

}
