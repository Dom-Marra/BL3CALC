import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Amara } from '../core/classes/amara';
import { Character } from '../core/classes/character';
import { Fl4k } from '../core/classes/fl4k';
import { Moze } from '../core/classes/moze';
import { Zane } from '../core/classes/zane';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { CharacterService } from './services/character.service';
import { FirebaseService } from '../core/services/firebase.service';
import { BaseCharacterModel } from '../core/models/basecharacter.model';
import { CharacterModel } from '../core/models/character.model';
import { Save } from '../core/models/save.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SaveDialogComponent } from './components/save-dialog/save-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../shared/components/snackbar/snackbar.component';

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.scss']
})
export class BuildComponent implements OnInit {

  @ViewChild('drawerContent') drawerContent: ElementRef;    //Mat drawer

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
    private firebase: FirebaseService,
    private activeRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.mobileQuery = this.breakObs.observe('(max-width: 730px)');

    this.firebase.getAllCharacters().subscribe(characters => {

      characters.forEach(doc => {       //Set Character data
        if (doc.id == 'base') this.baseCharacterData = doc.data() as BaseCharacterModel;
        else if (doc.id == 'amara') this.amaraData = doc.data() as CharacterModel;
        else if (doc.id == 'fl4k') this.fl4kData = doc.data() as CharacterModel;
        else if (doc.id == 'moze') this.mozeData = doc.data() as CharacterModel;
        else if (doc.id == 'zane') this.zaneData = doc.data() as CharacterModel;
      });

      activeRoute.paramMap.subscribe(params => {   //Set Build if it exists
        const buildQuery = params.get('build');
        const character = params.get('character').toLowerCase();

        if (buildQuery) {
          this.character = null;
      
          this.firebase.loadBuild(params.get('build')).subscribe(doc => {
              if (doc.exists) this.setCharacter((doc.data() as Save).type, doc.data() as Save);
              else {
                this.setCharacter('amara');
                this.snackBar.openFromComponent(SnackbarComponent, {data: {message: 'Could not retrieve the build!', theme: 'accent'}, panelClass: 'edgebox-snackbar'});
              }
          });
        } else {
          this.setCharacter(character);
        }
      });
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
   * @param save
   *        Save: save data
   */
  public setCharacter(characterType: string, save?: Save) {

    const characterParam = this.activeRoute.snapshot.paramMap.get('character');
    const buildQuery = save && this.activeRoute.snapshot.paramMap.get('build') ? `/${this.activeRoute.snapshot.paramMap.get('build')}` : '';

    if (characterType.toLowerCase() !== characterParam) {
      this.router.navigate([`build/${characterType.toLowerCase() + buildQuery}`]);
    }

    switch (characterType.toLowerCase()) {
      case 'amara': {
        this.characterService.currentCharacter.next(new Amara(JSON.parse(JSON.stringify(this.baseCharacterData)), JSON.parse(JSON.stringify(this.amaraData)), save));
        break;
        } case 'fl4k': {
          this.characterService.currentCharacter.next(new Fl4k(JSON.parse(JSON.stringify(this.baseCharacterData)), JSON.parse(JSON.stringify(this.fl4kData)), save));
          break;
        } case 'moze': {
          this.characterService.currentCharacter.next(new Moze(JSON.parse(JSON.stringify(this.baseCharacterData)), JSON.parse(JSON.stringify(this.mozeData)), save));
          break;
        } case 'zane': {
          this.characterService.currentCharacter.next(new Zane(JSON.parse(JSON.stringify(this.baseCharacterData)), JSON.parse(JSON.stringify(this.zaneData)), save));
          break;
      } default: {
        this.router.navigate(['build/amara']);
        this.characterService.currentCharacter.next(new Amara(this.baseCharacterData, this.amaraData));
      }
    }
  }

  /**
   * Saves the current build configurations
   */
  public save() {
    let save: Save = this.character.getSave();

    if (save) this.dialog.open(SaveDialogComponent, {data: this.firebase.saveBuild(save)});
    else this.snackBar.openFromComponent(SnackbarComponent, {data: {message: 'No data to save!', theme: 'accent'}, panelClass: 'edgebox-snackbar'})
  }
}
