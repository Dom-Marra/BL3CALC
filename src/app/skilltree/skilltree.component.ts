import { Component, OnInit, Input, Output } from '@angular/core';
import { Skill } from '../skill';
import { Character } from '../character'

@Component({
  selector: 'app-skilltree',
  templateUrl: './skilltree.component.html',
  styleUrls: ['./skilltree.component.scss']
})
export class SkilltreeComponent implements OnInit {

  private readonly MAX_POINTS: number = 25;   //Maximum number of skill points for animation
  private readonly MIN_POINTS: number = 0;    //Min number of skill points for animaiton

  private allocatedPoints: number = 0;        //Allocated points on the tree
  private addCount = 0;                       //Counter for addition animation
  private removeCount = 0;                    //Counter for removal animation

  @Input()
  treeName: string;                           //Name of the tree

  @Input()
  color: string;                              //Color of the tree

  @Input()
  index: number;                              //Index of the tree

  @Input()
  skills: Array<Skill>;                       //Skills for the tree

  @Input()
  character: Character;                       //Character that the tree belongs to

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
   * @param skill
   *        skill to add
   * 
   * @returns
   *         Boolean if adding the point was successful or not
   */
  addPoint(skill: Skill): Boolean {

    const pointsToModify:number = 1; //Used give back a point character

    //Do not add point if skill cannot take point
    if (!skill.validateModification(pointsToModify, this.allocatedPoints)) return false; 

    //Do not add point if character has none remaining
    if(!this.character.validateModification(pointsToModify)) return false; 
    
    //Increase allocation of skill point and character
    skill.addPoint();
    this.character.addPoint();

    //Trigger animation for point addition
    if (this.allocatedPoints < this.MAX_POINTS) {
      this.incrementGradient(); 
    }

    //increment allocated points on the tree
    this.allocatedPoints++; 
    
    //point addition successful
    return true;
  }


  /**
   * Removes a point to the skill tree
   * 
   * @param skill
   *        skill to remove
   * 
   * @returns 
   *         Boolean if removing the point was successful or not
   */
  removePoint(skill: Skill): Boolean {

    //Do not remove point if there is a pre-req
    if (!this.validateRequiredPoints(skill)) return false;

    const pointsToModify:number = -1;  //Used remove from total allocated

    //Do not remove point if skill is at minimum points
    if (!skill.validateModification(pointsToModify, this.allocatedPoints)) return false; 

    //Do not remove point if character has max remaining
    if(!this.character.validateModification(pointsToModify)) return false; 
    
    //Decrease allocation on skill point and character
    skill.removePoint();
    this.character.removePoint();
    
    //Trigger animation for removal of point
    if (this.allocatedPoints > this.MIN_POINTS && this.allocatedPoints <= this.MAX_POINTS) {
      this.decrementGradient(); 
    }

    //decrement allocated points on the tree
    this.allocatedPoints--; 

    //point removal successful
    return true;
  }


  /**
   * 
   * Validates if a point can be de-allocated from the skill tree
   * 
   * @param skill 
   *        skill that needs to be validated to be de-allocated
   * 
   * @returns 
   *         Boolean if the point can be de-allocated or not
   */
  validateRequiredPoints(skill: Skill): Boolean {

    var requiredPoints = skill.getPreReq(); //base points needed on the tree
    var extraPoints = 0;                    //Any extra points that might be able to be de-allocated
    var requiredForPreReq = false;          //Skill may be required as a pre-req to another

    //Traverse through skills
    this.skills.forEach(nextSkill => {

      //Analyze when when a skill has an allocation more than 0
      if (nextSkill.getAllocated() > 0) {

        //Re-assign required amount of points when the nextSkill has a higher amount
        if (nextSkill.getPreReq() > requiredPoints) requiredPoints = nextSkill.getPreReq();

        //This skill and skills before have their allocation added to extra points
        if (nextSkill.getPreReq() <= skill.getPreReq()) extraPoints += nextSkill.getAllocated();

        //If the nextSkill has a difference of 5 of skill then, skill is a pre-req 
        if (nextSkill.getPreReq() - skill.getPreReq() == 5) requiredForPreReq = true;

      }

    });

    //Allocated points less than required and the skill pre-req is not the same
    //as the required points amount then a point cannot be removed
    if (this.allocatedPoints - 1 <= requiredPoints && skill.getPreReq() != requiredPoints) return false;
    
    //The skill is a pre-req and removing a point accross all extra points is less than
    //a pre-req amount per stage (5) then a point cannot be removed
    if (requiredForPreReq && extraPoints - 1 < skill.getPreReq() + 5) return false;
    
    //point can be removed
    return true;
  }


  /**
   * Gets the two gradients that show the progression of the
   * skill tree and increments them for a portion of one point
   */
  incrementGradient() {
    
    var grad = document.getElementById(this.color + 'Fill');      //Linear gradient component
    var gradChildren = grad.children;                             //children of gradient component
    var mainGrad = gradChildren[0];                               //Main gradient
    var gradEffect = gradChildren[1];                             //Bottom effect of gradient

    //Increase offset of main gradient by 0.22 each time this function is called
    var mainOffset = parseFloat(mainGrad.getAttribute('offset')) + .22;

    //effect offset is always 2% higher than the main
    var effectOffset = mainOffset + 2;

    //Adjust the gradients with their new offsets
    mainGrad.setAttribute('offset', mainOffset + '%');
    gradEffect.setAttribute('offset', effectOffset + '%');

    //Increase animation counter each time the function is called
    this.addCount++;

    //Stop animation once counter reaches animation finish
    //reset counter
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

   var grad = document.getElementById(this.color + 'Fill');      //Linear gradient component
    var gradChildren = grad.children;                             //children of gradient component
    var mainGrad = gradChildren[0];                               //Main gradient
    var gradEffect = gradChildren[1];                             //Bottom effect of gradient

    //Increase offset of main gradient by 0.22 each time this function is called
    var mainOffset = parseFloat(mainGrad.getAttribute('offset')) - .22;

    //effect offset is always 2% higher than the main
    var effectOffset = mainOffset + 2;

    //Adjust the gradients with their new offsets
    mainGrad.setAttribute('offset', mainOffset + '%');
    gradEffect.setAttribute('offset', effectOffset + '%');

    //Increase animation counter each time the function is called
    this.addCount++;

    //Stop animation once counter reaches animation finish
    //reset counter
    if (this.addCount < 15) {
      requestAnimationFrame(this.decrementGradient.bind(this));
    } else {
      this.addCount = 0;
    }
  }

}
