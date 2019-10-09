import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Amara } from '../amara';
import { Character } from '../character';

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.scss']
})
export class BuildComponent implements OnInit {

  private character: Character;

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {

    this.router.queryParams.subscribe(params => {
      switch(params.character) {
        case 'amara': {
          this.character = new Amara(1, 1, 1);
        }
      }
    })
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
    current.className = ' carouselItem left';

    //next becomes current
    next.className = ' carouselItem active';

    //prev becomes next
    prev.className = ' carouselItem right';
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
    current.className = ' carouselItem right';

    //prev becomes current
    prev.className = ' carouselItem active';

    //next becomes prev
    next.className = ' carouselItem left';

  }
}
