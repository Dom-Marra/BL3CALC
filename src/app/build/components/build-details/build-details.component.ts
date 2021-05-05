import { Component, Input, OnInit } from '@angular/core';
import { Character } from 'src/app/core/classes/character';

@Component({
  selector: 'app-build-details',
  templateUrl: './build-details.component.html',
  styleUrls: ['./build-details.component.scss']
})
export class BuildDetailsComponent implements OnInit {

  @Input() set character(character: Character) {
    this._character = character;
  }

  public _character: Character;

  constructor() { }

  ngOnInit(): void {
  }

}
