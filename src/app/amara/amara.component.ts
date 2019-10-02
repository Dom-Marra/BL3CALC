import { Component, OnInit } from '@angular/core';
import { Skill } from '../skill';

@Component({
  selector: 'app-amara',
  templateUrl: './amara.component.html',
  styleUrls: ['./amara.component.scss']
})
export class AmaraComponent implements OnInit {

  //Skills for red skill tree
  private readonly redSkills = [
    new Skill('assets/images/amara/skills/Anima.png', [0, 0], 5, 0),
    new Skill('assets/images/amara/skills/SteadyHands.png', [0, 1], 3, 0),
    new Skill('assets/images/amara/skills/Infusion.png', [0, 2], 5, 0),
    new Skill('assets/images/amara/skills/Tempest.png', [1, 0], 5, 5),
    new Skill('assets/images/amara/skills/IlluminatedFist.png', [1, 1], 1, 5),
    new Skill('assets/images/amara/skills/Wildfire.png', [1, 2], 5, 5),
    new Skill('assets/images/amara/skills/Dread.png', [2, 1], 1, 10),
    new Skill('assets/images/amara/skills/Indiscriminate.png', [3, 0], 3, 15),
    new Skill('assets/images/amara/skills/DeepWell.png', [3, 1], 1, 15),
    new Skill('assets/images/amara/skills/Catharsis.png', [3, 2], 3, 15),
    new Skill('assets/images/amara/skills/Sustainment.png', [4, 0], 5, 20),
    new Skill('assets/images/amara/skills/Conflux.png', [4, 2], 5, 20),
    new Skill('assets/images/amara/skills/ForcefulExpression.png', [5, 1], 1, 25)
  ]
  
  //Skills for blue skill tree
  private readonly blueSkills = [
    new Skill('assets/images/amara/skills/DoHarm.png', [0, 0], 5, 0),
    new Skill('assets/images/amara/skills/FastHands.png', [0, 1], 3, 0),
    new Skill('assets/images/amara/skills/ViolentTapestry.png', [0, 2], 5, 0),
    new Skill('assets/images/amara/skills/Alacrity.png', [1, 0], 5, 5),
    new Skill('assets/images/amara/skills/Transcend.png', [1, 1], 3, 5),
    new Skill('assets/images/amara/skills/Restless.png', [1, 2], 5, 5),
    new Skill('assets/images/amara/skills/Ascendant.png', [2, 1], 1, 10),
    new Skill('assets/images/amara/skills/FromRest.png', [3, 0], 3, 15),
    new Skill('assets/images/amara/skills/LaidBare.png', [3, 1], 3, 15),
    new Skill('assets/images/amara/skills/Wrath.png', [3, 2], 3, 15),
    new Skill('assets/images/amara/skills/Remnant.png', [4, 0], 3, 20),
    new Skill('assets/images/amara/skills/Awakening.png', [4, 2], 3, 20),
    new Skill('assets/images/amara/skills/Avatar.png', [5, 1], 1, 25)
  ]

  //Skills for green skill tree
  private readonly greenSkills = [
    new Skill('assets/images/amara/skills/RootToRise.png', [0, 0], 5, 0),
    new Skill('assets/images/amara/skills/PersonalSpace.png', [0, 1], 5, 0),
    new Skill('assets/images/amara/skills/Clarity.png', [0, 2], 5, 0),
    new Skill('assets/images/amara/skills/ArmsDeal.png', [1, 0], 5, 5),
    new Skill('assets/images/amara/skills/Samsara.png', [1, 1], 5, 5),
    new Skill('assets/images/amara/skills/HelpingHands.png', [1, 2], 5, 5),
    new Skill('assets/images/amara/skills/Mindfulness.png', [2, 0], 5, 10),
    new Skill('assets/images/amara/skills/FindYourCenter.png', [2, 1], 5, 10),
    new Skill('assets/images/amara/skills/Vigor.png', [2, 2], 5, 10),
    new Skill('assets/images/amara/skills/OneWithNature.png', [3, 1], 5, 15),
    new Skill('assets/images/amara/skills/DoUntoOthers.png', [4, 0], 5, 20),
    new Skill('assets/images/amara/skills/JabCross.png', [4, 1], 5, 20),
    new Skill('assets/images/amara/skills/GuardianAngel.png', [4, 2], 5, 20),
    new Skill('assets/images/amara/skills/Blitz.png', [5, 1], 1, 25)
  ]

  private readonly MAX_POINTS = 48;
  private readonly MIN_POINTS = 0;

  private allocatedPoints:number = 0;



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

   /**
     * Checks if the character can have a point added or removed from it
     * 
     * modification: number
     *              number of points to add or remove from this character
     *              this should be 1 or -1, other numbers will not work
     * 
     * returns Boolean
     *         whether the allocated points can be modified or not
     */
  validatePointModification = (modification: number) => {

    if (modification < -1 || modification > 1 || modification == 0) return false;
    if (this.allocatedPoints == this.MAX_POINTS && modification > 0) return false;
    if (this.allocatedPoints == this.MIN_POINTS && modification < 0) return false;

    this.allocatedPoints += modification;

    return true;
  }

}
