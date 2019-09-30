import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-amara',
  templateUrl: './amara.component.html',
  styleUrls: ['./amara.component.scss']
})
export class AmaraComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }
  
  /**
   * Moves right carousel item to the current position, the
   * left item to the next position, and current item to the previous position
   */
  next() {
    var current = document.getElementsByClassName('active')[0];
    var next = document.getElementsByClassName('right')[0];
    var prev = document.getElementsByClassName('left')[0];

    current.className = ' carouselItem left';

    next.className = ' carouselItem active';

    prev.className = ' carouselItem right';
  }

   /**
   * Moves left carousel item to the current position, the
   * right item to the previous position, and current item to the next position
   */
  previous() {
    var current = document.getElementsByClassName('active')[0];
    var next = document.getElementsByClassName('left')[0];
    var prev = document.getElementsByClassName('right')[0];

    current.className = ' carouselItem right';

    next.className = ' carouselItem active';

    prev.className = ' carouselItem left';

  }

}
