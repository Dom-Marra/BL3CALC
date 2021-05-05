import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character } from 'src/app/core/classes/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  public currentCharacter: BehaviorSubject<Character> = new BehaviorSubject<Character>(null);

  constructor() { }
}
