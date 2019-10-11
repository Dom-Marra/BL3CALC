import { Component, OnInit, Input, Output } from '@angular/core';
import { Skill } from '../skill';
import { NormalSkill } from '../normalskill';
import { Character } from '../character'

@Component({
  selector: 'app-skilltree',
  templateUrl: './skilltree.component.html',
  styleUrls: ['./skilltree.component.scss']
})
export class SkilltreeComponent implements OnInit {

  private readonly MAX_POINTS: number = 25;           //Maximum number of skill points for animation
  private readonly MIN_POINTS: number = 0;            //Min number of skill points for animaiton
  private readonly POINTS_PER_PREREQ: number = 5;     //The amount of points needed to get to the next pre-req
  private readonly MAX_ANIMATION_COUNT: number = 5;  //Max times an animation can run
  private readonly MAIN_GRAD_OFFSET_FACTOR = 0.0066;     //The amount the main gradient will increase/decrease
  private readonly SECONDARY_GRAD_OFFSET_FACTOR = 0.02;  //The amount that the secondar gradient offsets from main

  private allocatedPoints: number = 0;        //Allocated points on the tree
  private addCount = 0;                       //Counter for addition animation
  private removeCount = 0;                    //Counter for removal animation
  private mainOff = 0.155;                    //Main gradient offset
  private secondOff = 0.175;                  //secondary gradient offset

  @Input()
  treeName: string;                           //Name of the tree

  @Input()
  color: string;                              //Color of the tree

  @Input()
  index: number;                              //Index of the tree

  @Input()
  header: string;                             //Path for image for the tree header

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
   *         Boolean: if adding the point was successful or not
   */
  addPoint(skill: Skill): Boolean {

    const pointsToModify:number = 1; //Used give back a point character

    //Do not add point if skill cannot take point
    if (!skill.validateModification(pointsToModify, this.allocatedPoints)) return false; 

    //Do not add point if character has none remaining
    if(!this.character.validateModification(pointsToModify, skill)) return false; 
    
    //Increase allocation of skill and character
    skill.addPoint();
    this.character.addPoint(skill);

    //Trigger animation for point addition if skill type is normal
    if (skill instanceof NormalSkill) {
      if (this.allocatedPoints < this.MAX_POINTS) {
        this.incrementGradient(); 
      }
      
      //increment allocated points on the tree
      this.allocatedPoints++; 
    }

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
   *         Boolean: if removing the point was successful or not
   */
  removePoint(skill: Skill): Boolean {

    //Do not remove point if there is a pre-req
    if (!this.validateRequiredPoints(skill)) return false;

    const pointsToModify:number = -1;  //Used remove from total allocated

    //Do not remove point if skill is at minimum points
    if (!skill.validateModification(pointsToModify, this.allocatedPoints)) return false; 

    //Do not remove point if character has max remaining
    if(!this.character.validateModification(pointsToModify, skill)) return false; 
    
    //Decrease allocation on skill point and character
    skill.removePoint();
    this.character.removePoint(skill);

    
    
    //Trigger animation for removal of point if skill type is normal
    if (skill instanceof NormalSkill) {
      if (this.allocatedPoints > this.MIN_POINTS && this.allocatedPoints <= this.MAX_POINTS) {
        this.decrementGradient(); 
      }

      //decrement allocated points on the tree
      this.allocatedPoints--; 
    }

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
   *         Boolean: if the point can be de-allocated or not
   */
  validateRequiredPoints(skill: Skill): Boolean {

    if (!(skill instanceof NormalSkill)) return true;

    var requiredSkill = skill;              //Highest pre-req skill
    var pointsForPreReq = 0;                //Points before a pre-req be de-allocated
    var extraPoints = 0;                    //Any extra points before the required skill
    var requiredForPreReq = false;          //Skill may be required as a pre-req to another
    var tmpPoints = 0;                      //Points that are saved up while traversing the tree

    //Traverse through skills
    this.skills.forEach(currentSkill => {

      //Analyze when when a skill has an allocation more than 0
      if (currentSkill.getAllocatedPoints() > 0) {
        
        //Re-assign required skills when the current skill has a higher amount
        //Add tmp points to extra
        //reset tmp points
        if (currentSkill.getPreReq() > requiredSkill.getPreReq()) {
          requiredSkill = currentSkill;
          extraPoints += tmpPoints;
          tmpPoints = 0;
        }

        //Increment extra points if the current skill shares the same pre-req or is less
        if (currentSkill.getPreReq() <= skill.getPreReq()) pointsForPreReq += currentSkill.getAllocatedPoints();

        //Skill is a pre-req if the difference between it and the current is 5
        if (currentSkill.getPreReq() - skill.getPreReq() == this.POINTS_PER_PREREQ) requiredForPreReq = true;

        //Add current skill points to tmp points
        tmpPoints += currentSkill.getAllocatedPoints();
      }

    });

    //Check that the skill pre-req is not the same as the requiredSkill pre-req
    if (skill.getPreReq() !=  requiredSkill.getPreReq()) {

      //The total allocated points minus the requiredSkills points minus 1 point
      //is less than what is needed for the requiredSkill then point removal failure
      if (extraPoints - 1 <  requiredSkill.getPreReq()) return false;
    }

    //The skill is a pre-req and removing a point accross all extra points is less than
    //the next pre-req amount then point removal failure
    if (requiredForPreReq && (pointsForPreReq - 1 < skill.getPreReq() + this.POINTS_PER_PREREQ)) return false;
    
    //point can be removed
    return true;
  }


  /**
   * Increments the two gradients that show skill allocation progress
   */
  incrementGradient() {

    this.mainOff += this.MAIN_GRAD_OFFSET_FACTOR;
    this.secondOff = this.mainOff + this.SECONDARY_GRAD_OFFSET_FACTOR;

    //Increase animation counter each time the function is called
    this.addCount++;

    //Stop animation once counter reaches animation finish
    //reset counter
    if (this.addCount < this.MAX_ANIMATION_COUNT) {
      requestAnimationFrame(this.incrementGradient.bind(this));
    } else {
      this.addCount = 0;
    }

  }


 /**
   * Decrements the two gradients that show skill allocation progress
   */
  decrementGradient() {

    this.mainOff -= this.MAIN_GRAD_OFFSET_FACTOR;
    this.secondOff = this.mainOff + this.SECONDARY_GRAD_OFFSET_FACTOR;

    //Increase animation counter each time the function is called
    this.removeCount++;

    //Stop animation once counter reaches animation finish
    //reset counter
    if (this.removeCount < this.MAX_ANIMATION_COUNT) {
      requestAnimationFrame(this.decrementGradient.bind(this));
    } else {
      this.removeCount = 0;
    }
  }
  
}
