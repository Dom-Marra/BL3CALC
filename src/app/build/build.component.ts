import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Amara } from '../core/classes/amara';
import { Character } from '../core/classes/character';
// import { Fl4k } from '../core/classes/fl4k';
// import { Moze } from '../core/classes/moze';
// import { Zane } from '../core/classes/zane';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { CharacterService } from './services/character.service';

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.scss']
})
export class BuildComponent implements OnInit {

  @ViewChild('drawerContent') drawerContent: ElementRef;

  public activePage: 'trees' | 'stats' = 'trees';

  public mobileQuery: Observable<BreakpointState>;
  public pageNavOpened: boolean = false;
  public character: Character = null;

  constructor(private breakObs: BreakpointObserver, private characterService: CharacterService) { 
    this.mobileQuery = this.breakObs.observe('(max-width: 730px)');
  }

  ngOnInit() {
    this.mobileQuery.subscribe(res => {
      if (!res.matches) {
        this.pageNavOpened = false;
      }
    });

    this.characterService.currentCharacter.subscribe(character => {
      if (character) this.character = character;
    })

    this.setCharacter('amara');
  }

  public setCharacter(characterType: string) {
    switch(characterType) {
      case 'amara': {
        this.characterService.currentCharacter.next(new Amara(1, 1, 1));
        break;
      // } case 'fl4k': {
      //   this.characterService.currentCharacter.next(new Fl4k(1, 2, 1));
      //   break;
      // } case 'moze': {
      //   this.characterService.currentCharacter.next(new Moze(2, 2, 0));
      //   break;
      // } case 'zane': {
      //   this.characterService.currentCharacter.next(new Zane(2, 4, 0));
      //   break;
      } default: {
        this.characterService.currentCharacter.next(new Amara(1, 1, 1));
      }
    }
  }
}
