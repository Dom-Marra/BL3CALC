import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/core/classes/character';
import { Conditional } from 'src/app/core/models/conditional.model';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit{

  public character: Character;    //Current Character
  
  constructor(private characterService: CharacterService) { 
  }

  ngOnInit() {
    this.characterService.currentCharacter.subscribe(character => {
      if (character) this.character = character;
    });
  }

  /**
   * Prompts the character to update its stats based on a conditional change
   * 
   * @param conditional
   *        Conditional: the conditional changed 
   * @param conKey 
   *        string: the key of the conditional
   * @param isActive 
   *        boolean: whether the conditional is active or not
   * @param value 
   *        number: value of the stacks on the conditional
   */
  public onConditionalChange(conditional: Conditional, conKey: string, isActive?: boolean, value?: number) {
    let oldConditional: Conditional = {
      isActive: conditional.isActive,
      text: conditional.text,
      value: conditional.value,
      usesStacks: conditional.usesStacks,
      stackKey: conditional.stackKey
    }

    if (isActive != null) conditional.isActive = isActive;
    if (value != null) conditional.value = value;
    
    this.character.updateStatsBasedOnUpdatedConditional(oldConditional, conditional, conKey);
  }
}
