import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Amara } from '../core/classes/amara';
import { Character } from '../core/classes/character';
import { Fl4k } from '../core/classes/fl4k';
import { Moze } from '../core/classes/moze';
import { Zane } from '../core/classes/zane';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { CharacterService } from './services/character.service';
import { FirebaseCharactersService } from '../core/services/firebase-characters.service';
import { BaseCharacterModel } from '../core/models/basecharacter.model';
import { CharacterModel } from '../core/models/character.model';

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.scss']
})
export class BuildComponent implements OnInit {

  @ViewChild('drawerContent') drawerContent: ElementRef;    //Mat drawer

  public activePage: 'trees' | 'stats' = 'trees';          //The active page

  public mobileQuery: Observable<BreakpointState>;         //Determines page breakpoints
  public pageNavOpened: boolean = false;                   //Page navigation state
  public character: Character = null;                      //Current Character

  private baseCharacterData: BaseCharacterModel;           //Base Character Data
  private amaraData: CharacterModel;                       //Amara Data
  private fl4kData: CharacterModel;                        //FL4K Data
  private mozeData: CharacterModel;                        //Moze Data
  private zaneData: CharacterModel;                        //Zane Data


  constructor(
    private breakObs: BreakpointObserver,
    private characterService: CharacterService,
    private firebase: FirebaseCharactersService
  ) {
    this.mobileQuery = this.breakObs.observe('(max-width: 730px)');

    this.firebase.getAllCharacters().subscribe(characters => {
      characters.forEach(doc => {
        if (doc.id == 'base') this.baseCharacterData = doc.data() as BaseCharacterModel;
        else if (doc.id == 'amara') this.amaraData = doc.data() as CharacterModel;
        else if (doc.id == 'fl4k') this.fl4kData = doc.data() as CharacterModel;
        else if (doc.id == 'moze') this.mozeData = doc.data() as CharacterModel;
        else if (doc.id == 'zane') this.zaneData = doc.data() as CharacterModel;
      });

      this.setCharacter('amara');
    });
  }

  ngOnInit() {
    this.mobileQuery.subscribe(res => {
      if (!res.matches) {
        this.pageNavOpened = false;
      }
    });

    this.characterService.currentCharacter.subscribe(character => {
      if (character) this.character = character;
    });
  }

  /**
   * Sets the character based on the selected type
   * 
   * @param characterType 
   *        string: type of the character
   */
  public setCharacter(characterType: string) {
    switch (characterType) {
      case 'amara': {
        this.characterService.currentCharacter.next(new Amara(JSON.parse(JSON.stringify(this.baseCharacterData)), JSON.parse(JSON.stringify(this.amaraData))));
        break;
        } case 'fl4k': {
          this.characterService.currentCharacter.next(new Fl4k(JSON.parse(JSON.stringify(this.baseCharacterData)), JSON.parse(JSON.stringify(this.fl4kData))));
          break;
        } case 'moze': {
          this.characterService.currentCharacter.next(new Moze(JSON.parse(JSON.stringify(this.baseCharacterData)), JSON.parse(JSON.stringify(this.mozeData))));
          break;
        } case 'zane': {
          this.characterService.currentCharacter.next(new Zane(JSON.parse(JSON.stringify(this.baseCharacterData)), JSON.parse(JSON.stringify(this.zaneData))));
          break;
      } default: {
        this.characterService.currentCharacter.next(new Amara(this.baseCharacterData, this.amaraData));
      }
    }
  }
}
