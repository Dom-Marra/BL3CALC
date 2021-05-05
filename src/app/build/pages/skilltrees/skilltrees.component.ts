import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/core/classes/character';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-skilltrees',
  templateUrl: './skilltrees.component.html',
  styleUrls: ['./skilltrees.component.scss']
})
export class SkilltreesComponent implements OnInit {

  public character: Character;

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
    this.characterService.currentCharacter.subscribe(character => {
      if (character) this.character = character;
    })
  }

}
