import { Component, OnInit, Input } from '@angular/core';
import { OtherSkill } from '../otherskill';
import { ActionSkill } from '../actionskill';
import { ActionMod } from '../actionmod';
import { Skill } from '../skill';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  private readonly MATH = Math;
  private readonly CHARACTER_OFFSET:number = 2;         //Number to add to character allocation to show correct level
  private _maxActionSkills: Array<number> = [];         //Max action skills the character can have put into an array
  private _maxActionMods: Array<number> = [];           //Max action mods a character can have put into an array
  private _maxOtherSkills: Array<number> = [];          //Max other skills a character can have put into an array (not used as of right now)

  @Input()
  allocatedPoints: number;                              //Points allocated in tree

  @Input()
  actionSkills: Array<ActionSkill>;                     //Action skills that have been allocated
  
  @Input()
  actionMods: Array<Array<Skill>>;                      //Action mods that have been allocated

  @Input()
  otherSkills: Array<OtherSkill>;                       //Other skills that have been allocated


  @Input()   
  /**
   * For every number n in the max action skills a character can have
   * it is put into an array 
   */                     
  set maxActionSkills(maxActionSkills: number) {
    for (var i = 0; i < maxActionSkills; i++) {
      this._maxActionSkills[i] = i;
    }
  }

  @Input()
  /**
   * For every number n in the max action mods a character can have
   * it is put into an array 
   */  
  set maxActionMods(maxActionMods: number) {
    for (var i = 0; i < (maxActionMods / this._maxActionSkills.length); i++) {
      this._maxActionMods[i] = i;
    }
  }

  @Input() 
  /**
   * For every number n in the max other skills a character can have
   * it is put into an array 
   */  
  set maxOtherSkills(maxOtherSkills: number) {
    for (var i = 0; i < maxOtherSkills; i++) {
      this._maxOtherSkills[i] = i;
    }
  }

  constructor() { 
    
  }

  ngOnInit() {

  }

}
