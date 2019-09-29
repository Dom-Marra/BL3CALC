import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-skilltree',
  templateUrl: './skilltree.component.html',
  styleUrls: ['./skilltree.component.scss']
})
export class SkilltreeComponent implements OnInit {

  @Input()
  treeName: string;

  @Input()
  color: string;

  @Input()
  index: number;

  count = 0;

  constructor() { }

  ngOnInit() {
    this.setColor();
  }

  /**
   * 
   * 
   */
  setColor() {
    var tree = document.getElementsByClassName('tree');
    tree[this.index].classList.add(this.color);
  }

  /**
   * 
   * 
   * 
   */
  incrementGradient() {
    
    var grad = document.getElementById(this.color + 'Fill');
    var gradChildren = grad.children;
    var complete = gradChildren[0];
    var completeAfter = gradChildren[1];

    var offset = parseFloat(complete.getAttribute('offset')) + .132;
    var offsetAfter = offset + 2;

    complete.setAttribute('offset', offset + '%');
    completeAfter.setAttribute('offset', offsetAfter + '%');

    
    this.count++;

    if (this.count < 25) {
      requestAnimationFrame(this.incrementGradient.bind(this));
    } else {
      this.count = 0;
    }
  }

}
