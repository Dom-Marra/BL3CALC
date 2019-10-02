import { Component, OnInit, Input, Output } from '@angular/core';
import { Skill } from '../skill';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-skilltree',
  templateUrl: './skilltree.component.html',
  styleUrls: ['./skilltree.component.scss']
})
export class SkilltreeComponent implements OnInit {

  private readonly MAX_POINTS: number = 25;
  private readonly MIN_POINTS: number = 0;

  private allocatedPoints: number = 0;
  private addCount = 0;
  private removeCount = 0;

  @Input()
  treeName: string;

  @Input()
  color: string;

  @Input()
  index: number;

  @Input()
  skills: Array<Skill>;

  @Input()
  pointModification: (modification: number) => Boolean;

  

  constructor() { }

  ngOnInit() {
    this.setColor();
  }

  /**
   * Sets the class for the skill tree based on the color input
   */
  setColor() {
    var tree = document.getElementsByClassName('tree');
    tree[this.index].classList.add(this.color);
  }

  /**
   * Adds a point to the skill tree
   * 
   * return Boolean
   *        if adding the point was successful or not
   */
  addPoint(skill: Skill): Boolean {
    const pointsToModify:number = 1; //Used give back a point character

    if (!skill.validateModification(pointsToModify, this.allocatedPoints)) return false; //Do not add point if skill cannot take point
    skill.addPoint();

    if(!this.pointModification(pointsToModify)) return false; //Do not add point if character has none remaining

    if (this.allocatedPoints < this.MAX_POINTS) {
      this.allocatedPoints++; //increment allocated points on the tree
      this.incrementGradient(); //animation for point addition
    }
    
    //point addition successful
    return true;
  }

  /**
   * Removes a point to the skill tree
   * 
   * return Boolean
   *        if removing the point was successful or not
   */
  removePoint(skill: Skill): Boolean {
    const pointsToModify:number = -1;  //Used remove from total allocated

    if (!skill.validateModification(pointsToModify, this.allocatedPoints)) return false; //Do not remove point if skill is at minimum points
    skill.removePoint();
    
    if(!this.pointModification(pointsToModify)) return false; //Do not remove point if character has max remaining

    if (this.allocatedPoints > this.MIN_POINTS) {
      this.allocatedPoints--; //decrement allocated points on the tree
      this.decrementGradient(); //animation for point addition
    }

   //point removal successful
   return true;
  }

  /**
   * Gets the two gradients that show the progression of the
   * skill tree and increments them for a portion of one point
   */
  incrementGradient() {
    
    var grad = document.getElementById(this.color + 'Fill');
    var gradChildren = grad.children;
    var complete = gradChildren[0];
    var completeAfter = gradChildren[1];

    var offset = parseFloat(complete.getAttribute('offset')) + .22;
    var offsetAfter = offset + 2;

    complete.setAttribute('offset', offset + '%');
    completeAfter.setAttribute('offset', offsetAfter + '%');

    
    this.addCount++;

    if (this.addCount < 15) {
      requestAnimationFrame(this.incrementGradient.bind(this));
    } else {
      this.addCount = 0;
    }
  }

  /**
   * Gets the two gradients that show the progression of the
   * skill tree and decrements them for a portion of one point.
   */
  decrementGradient() {

    var grad = document.getElementById(this.color + 'Fill');
    var gradChildren = grad.children;
    var complete = gradChildren[0];
    var completeAfter = gradChildren[1];

    var offset = parseFloat(complete.getAttribute('offset')) - .22;
    var offsetAfter = offset + 2;

    complete.setAttribute('offset', offset + '%');
    completeAfter.setAttribute('offset', offsetAfter + '%');

    
    this.removeCount++;

    if (this.removeCount < 15) {
      requestAnimationFrame(this.decrementGradient.bind(this));
    } else {
      this.removeCount = 0;
    }
  }

}
