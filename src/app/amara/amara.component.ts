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
   * 
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
   * 
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
