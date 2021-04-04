import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { ActionMod } from '../core/classes/actionmod';
import { ActionSkill } from '../core/classes/actionskill';
import { Character } from '../core/classes/character';
import { NormalSkill } from '../core/classes/normalskill';
import { Skill } from '../core/classes/skill';

@Component({
  selector: 'app-skilltree',
  templateUrl: './skilltree.component.html',
  styleUrls: ['./skilltree.component.scss']
})
export class SkilltreeComponent implements OnInit {

  private readonly MAX_POINTS: number = 25;               //Maximum number of skill points for animation
  private readonly MIN_POINTS: number = 0;                //Min number of skill points for animaiton
  private readonly POINTS_PER_PREREQ: number = 5;         //The amount of points needed to get to the next pre-req
  private readonly MAX_ANIMATION_COUNT: number = 5;       //Max times an animation can run
  private readonly MAIN_GRAD_OFFSET_FACTOR = 0.0066;      //The amount the main gradient will increase/decrease
  private readonly SECONDARY_GRAD_OFFSET_FACTOR = 0.02;   //The amount that the secondar gradient offsets from main

  private allocatedPoints: number = 0;        //Allocated points on the tree
  private addCount = 0;                       //Counter for addition animation
  private removeCount = 0;                    //Counter for removal animation
  private mainOff = 0.155;                    //Main gradient offset
  private secondOff = 0.175;                  //secondary gradient offset
  private character: Character;

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
  /**
   * Any time a character is changed, reset skill tree fill values and the 
   * current character
   */
  set _character(character: Character) {                       //Character that the tree belongs to
    
    if (this.allocatedPoints > 0) {
      this.mainOff = 0.155;
      this.secondOff = 0.175;
      this.allocatedPoints = 0;
    }
    this.character = character;
  }

  @Input()
  /**
   * When new data is imported allocate it
   */
  set loadedData(data: any) {
    if (data != null) {
      if (this.color == "red") {
        this.allocateLoadedData(data, data.redSkills, this.character.getRedSkills());
      }
      if (this.color == "green") {
        this.allocateLoadedData(data, data.greenSkills, this.character.getGreenSkills());
      }
      if (this.color == "blue") {
        this.allocateLoadedData(data, data.blueSkills, this.character.getBlueSkills());
      }
    }
  }

  constructor(private router: Router) { 

    //On router event
    this.router.events.subscribe(e => {
      //When new route reset tree
      if (e instanceof NavigationStart) {
        this.reset();
      }
    });
    
  }

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
   * @param pos
   *        position of skill in equipped skills (only applies to action mods and action skills)
   * @returns
   *        Boolean: if adding the point was successful or not
   */
  addPoint(skill: Skill, pos?: number): Boolean {

    const pointsToModify:number = 1; //Used give back a point character

    //Do not add point if skill cannot take point
    if (!skill.validateModification(pointsToModify, this.allocatedPoints)) return false;

    //Do not add point if character has none remaining
    if(!this.character.validateModification(pointsToModify, skill)) return false; 
    
    //Increase allocation of skill and character
    skill.addPoint();
    this.character.addPoint(skill, pos);


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

    //Non-normal skills can be removed regardless
    if (!(skill instanceof NormalSkill)) return true;

    var requiredSkill = skill;              //Highest pre-req skill
    var pointsForPreReq = 0;                //Points before a pre-req be de-allocated
    var extraPoints = 0;                    //Any extra points before the required skill
    var requiredForPreReq = false;          //Skill may be required as a pre-req to another
    var tmpPoints = 0;                      //Points that are saved up while traversing the tree
    var requiredSkillCheck = true;

    //order the skills based by their pre-req amount
    var skillsOrdered = this.skills.sort((a, b) => {
      return a.getPreReq() - b.getPreReq();
    });

    //Traverse through ordered skill list
    skillsOrdered.forEach(currentSkill => {

      //Analyze when when a skill has an allocation more than 0
      if (currentSkill.getAllocatedPoints() > 0) {
        
        //Re-assign required skills when the current skill has a higher amount
        //Add tmp points to extra
        //reset tmp points
        //Do check if skill is required based on current info
        if (currentSkill.getPreReq() > requiredSkill.getPreReq()) {
          requiredSkill = currentSkill;
          extraPoints += tmpPoints;
          tmpPoints = 0;

          //Check that the skill pre-req is not the same as the requiredSkill pre-req
          if (skill.getPreReq() !=  requiredSkill.getPreReq()) {

            //If the points allocated at this current state (-1 for skill removal adjustment)
            //is less than what is needed for the required skill pre-req
            //result to remove is false
            if (extraPoints - 1 <  requiredSkill.getPreReq()) {
              requiredSkillCheck = false;
            };
          }
        }

        if (currentSkill.getPreReq() <= skill.getPreReq()) pointsForPreReq += currentSkill.getAllocatedPoints();

        //Skill is a pre-req if the difference between it and the current is 5
        if (currentSkill.getPreReq() - skill.getPreReq() == this.POINTS_PER_PREREQ) requiredForPreReq = true;

        //Add current skill points to tmp points when its a normal skill
        if (currentSkill instanceof NormalSkill) {
          tmpPoints += currentSkill.getAllocatedPoints();
        }
      }
    });

    if (!requiredSkillCheck) return false;

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

  /**
   * Resets the skills points of the tree
   */
  reset() {
    this.skills.sort(function(a, b) {
      return a.getPreReq() - b.getPreReq();
    });
    
    for (var i = this.skills.length - 1; i >= 0; i--) {
      if (this.skills[i].getAllocatedPoints() > 0) {
        for (var j = this.skills[i].getAllocatedPoints(); j > 0; j--) {
          this.removePoint(this.skills[i]);
        }
      }
    }

  }

  /**
   * Allocates loaded character data to the skill tree
   * 
   * @param data 
   *            JSON that contains the data
   * @param skillPoints 
   *            Array of skill point allocations that are sorted to match the skills to allocate to
   * @param skills 
   *            Skills to allocate the points to that are sorted to match the array of skill point allocations
   */
  allocateLoadedData(data, skillPoints, skills) {

    //Traverse the array of skill point allocations
    //num being the allocation amount
    skillPoints.forEach((num, index) => { 
      if (num > 0) { 

        //For every point of allocation add it
        for (var i = 0; i < num; i++) {
          
          //If the skill is an action skill add it to the equipped skills
          if (this.isActionSkill(skills[index])) {
            
            //Find the place in the data that the action skill belongs to
            //the element.actionSkill is the index of the skill in its array
            data.equipped.forEach((element, actionSkillIndex) => {


              // If the index of the actionSkill in the datas equipped skill matches the current index in the allocation point array
              // and there is nothing in this current spot for equipped skills, add it
              if ( element.actionSkill != null
                  && element.actionSkill.index == index 
                  && element.actionSkill.color == this.color
                  && this.character.getEquippedSkills()[actionSkillIndex].actionSkill == null 
                  && skills[index].getMaxPoints() != skills[index].getAllocatedPoints()) {
                this.addPoint(skills[index], actionSkillIndex);
                return;
              }
            });

            //If the skill is an action mod add it to the equipped skills
          } else if (this.isActionMod(skills[index])) {

            data.equipped.forEach((element, actionSkillIndex) => {
              element.actionMods.forEach((element, secondIndex) => {

                if (this.character.getEquippedSkills()[actionSkillIndex].actionSkill == skills[index].getRequiredActionSkill() || skills[index].getRequiredActionSkill() == null) {
                
                  //If element, the index of the action mod in the allocation point array, macthes the current index
                  //Add it to the equipped skills
                  if (element == index) {
                    //In the case that there is two action skills but only one mod per skill match use the action skill index 
                    if (this.character.getMaxActionModPoints() == 2 && this.character.getMaxActionSkillPoints() == 2) {
                      this.addPoint(skills[index], actionSkillIndex);
                    } else {
                      this.addPoint(skills[index], secondIndex);
                    }
                  }
                }
              });
            });
            
          } else {

            //Normal, or other skill just add it
            this.addPoint(skills[index]);
          }
        }
      }
    });
  }

  /**
   * Checks if a skills is of type action mod
   * 
   * @param skill 
   *          skill to check
   * @returns
   *         boolean: whether the type matches
   */
  isActionMod(skill: Skill): Boolean {
    return skill instanceof ActionMod;
  }

  /**
   * Checks if a skills is of type action skill
   * 
   * @param skill 
   *          skill to check
   * @returns
   *         boolean: whether the type matches
   */
  isActionSkill(skill: Skill): Boolean {
    return skill instanceof ActionSkill;
  }

  /**
   * Checks if a skills is of type normal
   * 
   * @param skill 
   *          skill to check
   * @returns
   *         boolean: whether the type matches
   */
  isNormalSkill(skill: Skill): Boolean {
    return skill instanceof NormalSkill;
  }
}
