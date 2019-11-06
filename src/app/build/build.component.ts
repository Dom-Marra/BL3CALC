import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Amara } from '../amara';
import { Character } from '../character';
import { Fl4k } from '../fl4k';

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.scss']
})
export class BuildComponent implements OnInit {

  private character: Character;
  private emmitValues: Array<any>;

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {

    this.router.queryParams.subscribe(params => {
      switch(params.character) {
        case 'amara': {
          this.character = new Amara(1, 1, 1);
          break;
        } case 'fl4k': {
          this.character = new Fl4k(1, 2, 1);
          break;
        }
      }
    });
  }

  /**
   * Updates values for tooltip
   * @param emmitValues 
   *                    Array, first value has to be the skill, then next is the event
   */
  onHovered(emmitValues: Array<any>) {
    this.emmitValues = emmitValues;
  }
  
  /**
   * Moves right carousel item to the current position, the
   * left item to the next position, and current item to the previous position
   */
  next() {
    var current = document.getElementsByClassName('active')[0];     //Current tree being presented
    var next = document.getElementsByClassName('right')[0];         //prev tree to be presented
    var prev = document.getElementsByClassName('left')[0];          //next tree presented

    //current becomes prev
    current.className = ' carousel-item left';
    current.setAttribute('style', 'z-index: 1');

    //next becomes current
    next.className = ' carousel-item active';
    next.setAttribute('style', 'z-index: 2');

    //prev becomes next
    prev.className = ' carousel-item right';
    prev.setAttribute('style', 'z-index: 0');
  }

   /**
   * Moves left carousel item to the current position, the
   * right item to the previous position, and current item to the next position
   */
  previous() {
    var current = document.getElementsByClassName('active')[0];     //Current tree being presented
    var prev = document.getElementsByClassName('left')[0];          //prev tree to be presented
    var next = document.getElementsByClassName('right')[0];         //next tree presented

    //current becomes next
    current.className = ' carousel-item right';
    current.setAttribute('style', 'z-index: 1');

    //prev becomes current
    prev.className = ' carousel-item active';
    prev.setAttribute('style', 'z-index: 2');

    //next becomes prev
    next.className = ' carousel-item left';
    next.setAttribute('style', 'z-index: 0');

  }
}
