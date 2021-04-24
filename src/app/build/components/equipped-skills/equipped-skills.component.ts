import { Component, Input, OnInit } from '@angular/core';
import { Character } from 'src/app/core/classes/character';
import { EquippedSkill } from 'src/app/core/models/equippedskill.model';

@Component({
  selector: 'app-equipped-skills',
  templateUrl: './equipped-skills.component.html',
  styleUrls: ['./equipped-skills.component.scss']
})
export class EquippedSkillsComponent implements OnInit {

  @Input() set equippedSkills(equippedSkills: Array<EquippedSkill>) {
    this._equippedSkills = equippedSkills;
    console.log(equippedSkills)
  }

  public _equippedSkills: Array<EquippedSkill>;
  
  constructor() { }

  ngOnInit(): void {
  }

}
