import { Component, OnInit, Input, ElementRef, ViewChild, Injectable } from '@angular/core';
import { Directive } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import ResizeObserver from 'resize-observer-polyfill';
import { NormalSkill } from 'src/app/core/classes/normalskill';
import { Skill } from 'src/app/core/classes/skill';


interface TooltipData {
  skill: Skill,
  el: ElementRef
}

interface TooltipXConfigs {
  floatAboveOrBelow?: boolean,
  right?: number,
  left?: number
}

interface TooltipYConfigs {
  floatLeftOrRight?: boolean,
  top: number
}

@Injectable({
  providedIn: 'root',
})
export class ToolTipService {

  public tooltipData: BehaviorSubject<TooltipData> = new BehaviorSubject({ skill: null, el: null });

  constructor() { }

  /**
   * Updates the tooltipdata
   * 
   * @param tooltipData 
   *        data to use
   */
  public updateToolTipData(tooltipData: TooltipData) {
    this.tooltipData.next(tooltipData);
  }

}

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {

  public skill: Skill;
  public el: ElementRef;
  @Input() parent: HTMLElement;

  constructor(private tooltipService: ToolTipService, private tooltip: ElementRef) { }

  ngOnInit() {
    if (!this.parent) this.parent = this.tooltip.nativeElement.parentElement;
  }

  ngAfterContentInit() {
    this.tooltipService.tooltipData.subscribe(tooltipData => {
      this.skill = tooltipData.skill;
      this.el = tooltipData.el;

      if (!this.el) (this.tooltip?.nativeElement as HTMLElement).style.display = "none";    //Effectively sets height to 0
      else {
        setTimeout(() => {                                  
          (this.tooltip?.nativeElement as HTMLElement).style.display = "block";   //Need 20ms for resize observer to register changes
        }, 20)
      }
    });
  }

  ngAfterViewInit() {
    let resiveObs = new ResizeObserver(() => {
      
      this.tooltip?.nativeElement?.removeAttribute("style");    //Remove previous styles on the tooltip
      (this.tooltip?.nativeElement as HTMLElement).style.top = "0px";   //Reset top
      
      if (this.el) this.setPosition();
      else (this.tooltip?.nativeElement as HTMLElement)?.classList.remove('visible');
    });

    resiveObs.observe(this.tooltip.nativeElement);
  }

  /**
   * Sets position of the tooltip in the parent
   */
  private setPosition() {
    let hoveredElement = this.el.nativeElement as HTMLElement;        //The skill element being hoveres
    let xConfigs = this.getXConfigs();                               //Get the x position configurations
    let yConfigs = xConfigs.floatAboveOrBelow ?                       //Get y position configs
      this.getYConfigsAboveOrBelow() : this.getYConfigs();

    if (yConfigs.floatLeftOrRight) {                                  //Move the tooltip x if told to
      if (xConfigs.right) xConfigs.right -= hoveredElement.clientWidth;
      else xConfigs.left -= hoveredElement.clientWidth;
    }

    this.tooltip.nativeElement.style.top = yConfigs.top + "px";       //Set top position

    if (xConfigs.right) {                                             //Set right position
      this.tooltip.nativeElement.style.right = xConfigs.right + "px";
    } else {                                                          //Set left position
      this.tooltip.nativeElement.style.left = xConfigs.left + "px";
    }

    this.tooltip?.nativeElement?.classList.add('visible');            //Make the tooltip visible
  }

  /**
   * Returns the top position of the tooltip, and whether the x axis should be adjusted
   * 
   * @returns 
   *        TooltipYConfigs
   */
  private getYConfigs(): TooltipYConfigs {
    let hoveredElement = this.el.nativeElement as HTMLElement;                //The hovered skill element     
    let hoveredElementYAvg = ((hoveredElement.getBoundingClientRect().top     //The middle y pos of the skill relative to the parent
      + hoveredElement.getBoundingClientRect().bottom) / 2) 
      - (window.innerHeight - this.parent.offsetHeight);
    let offsetHeight: number = ((this.tooltip.nativeElement as HTMLElement).clientHeight / 2);   //Difference of height between parent and window
    let floatLeftOrRight: boolean = false;                                                       //Whether the x should be adjusted left or right
    let top: number;                                                                             //The top pos
    let parentBottom: number = this.parent.offsetHeight + this.parent.scrollTop;                     //Bottom value of the parent view

    top = hoveredElementYAvg - offsetHeight + this.parent.scrollTop;      //Set base top value so the tooltip is centered with the skill

    console.log(this.parent.offsetHeight, offsetHeight, this.parent.scrollTop);

    if (this.parent.scrollTop > top) {                 //Top of the tooltip is cut off at the top
      
      let tooltipBottomUnder = top + offsetHeight    //Tooltip bottom value if positioned under the skill element
        + this.tooltip.nativeElement.clientHeight 
        + (hoveredElement.clientHeight / 2);
      
      let tooltipBottomNormal = top                  //Tooltip bottom not under skill
        + (this.parent.scrollTop - top + 10) 
        + this.tooltip.nativeElement.clientHeight;

      if (tooltipBottomUnder < parentBottom) {                        //Bottom doesn't overflow parent view bottom

        top += (offsetHeight + (hoveredElement.clientHeight / 2));         //Set new top so its under skill
        floatLeftOrRight = true;                                           //Tooltip now should be repositioned on x-axis

      } else if (tooltipBottomNormal < parentBottom) {                //Bottom doesn't overflow parent view bottom
        top += (this.parent.scrollTop - top + 10);                           //Set new top
      }

    } else if (this.tooltip.nativeElement.clientHeight + top >= parentBottom) {               //Bottom of tooltip is cutoff

      if (this.parent.scrollTop < top - (offsetHeight + (hoveredElement.clientHeight / 2))) {   //Top of tooltip isn't cutoff if positioned above the skill
        top -= (offsetHeight + (hoveredElement.clientHeight / 2));                            //Set top to be above the skill element
        floatLeftOrRight = true;                                                              //Tooltip now should be repositioned on x-axis

      } else if (top - ((this.tooltip.nativeElement.clientHeight + top + 15) - (parentBottom)) > this.parent.scrollTop) {   //Top of tooltip isn't cutoff if positioned 15px above parent bottom
        top -= (this.tooltip.nativeElement.clientHeight + top + 15) - (parentBottom);                                     //Set new top to be positioned at current parent view bottom + 15px
      }
    }

    return { floatLeftOrRight: floatLeftOrRight, top: top };
  }

  /**
   * Returns the top position based either ontop of the skill element, or below it
   * 
   * @returns 
   *        TooltipYConfigs
   */
  private getYConfigsAboveOrBelow(): TooltipYConfigs {
    let hoveredElement = this.el.nativeElement as HTMLElement;                  //The hovered skill element
    let top: number;                                                            //The top position

    let tooltipBottom = (hoveredElement.getBoundingClientRect().bottom          //Get the bottom position of the tooltip, if placed below the skill element
        - (window.innerHeight - this.parent.offsetHeight))
        + this.parent.scrollTop
        + this.tooltip.nativeElement.clientHeight;
    
    top = (hoveredElement.getBoundingClientRect().top                             //Set base top position   
        - (window.innerHeight - this.parent.offsetHeight))
        - this.tooltip.nativeElement.clientHeight
        + this.parent.scrollTop;
    
    if (top < this.parent.scrollTop && tooltipBottom < this.parent.scrollHeight) {    //Set position to below the skill if there is room on the screen 
      top = hoveredElement.getBoundingClientRect().bottom - (window.innerHeight - this.parent.offsetHeight) + this.parent.scrollTop;
    }

    return { top: top };
  }

  /**
   * Returns the left and right position values, only one will be set. Also states
   * whether the skill should be floated above/below the skill
   * 
   * @returns 
   *        TooltipXConfigs
   */
  private getXConfigs(): TooltipXConfigs {
    let hoveredElement = this.el.nativeElement as HTMLElement;                  //Skill hovered
    let parentWidthOffset = window.innerWidth - this.parent.offsetWidth;          //The difference in width between the parent and window
    let hoveredElementXAvg = ((hoveredElement.getBoundingClientRect().left      //The middle of the skill hovered, in relation to the parent
      + hoveredElement.getBoundingClientRect().right) / 2) 
      - parentWidthOffset;
    let floatAboveOrBelow: boolean = false;                                     //Whether to tooltip should float above or below the hovered element
    let left: number;                                                           //left pos
    let right: number;                                                          //right pos

    if (hoveredElementXAvg < (this.parent.clientWidth / 2)) {      //Calculate the left position, if the skill is less than half the parent width
      left = hoveredElement.getBoundingClientRect().left              //get base left postion          
        - parentWidthOffset 
        + hoveredElement.clientWidth;

      if (left + this.tooltip.nativeElement.clientWidth + 10 > this.parent.clientWidth) {       //The skill overflows to the left
        left -= left + (this.tooltip.nativeElement.clientWidth + 10) - this.parent.clientWidth;       //Adjust left so it doesn't
        floatAboveOrBelow = true;                                                                   //Tooltip is covering skill so it must be adjusted
      }
    } else {                                                    //Calculate the right pos, if the skill is greater than half the parent width
      right = this.parent.clientWidth                                  //Base right value                         
        - ((hoveredElement.getBoundingClientRect().right - parentWidthOffset) 
        - hoveredElement.clientWidth);

      if (right + this.tooltip.nativeElement.clientWidth + 10 > this.parent.clientWidth) {    //The skill overflows to the right
        right -= right + (this.tooltip.nativeElement.clientWidth + 10) - this.parent.clientWidth;   //Adjust so it doesn't
        floatAboveOrBelow = true;                                                                 //Tooltip is covering skill so it must be adjusted
      }
    }

    return { floatAboveOrBelow: floatAboveOrBelow, right: right, left: left };
  }

  /**
   * Checks if the skill is normal
   */
  public isNormalSkill(skill: Skill): boolean {
    return skill instanceof NormalSkill;
  }
}

@Directive({
  selector: '[displaySkill]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class DisplaySkillDirective {

  @Input('skill') skill: Skill = null;

  constructor(private el: ElementRef, private tooltipService: ToolTipService) { }

  /**
   * Sets the tooltip skill and hovered element 
   */
  private onMouseEnter(): void {
    this.tooltipService.updateToolTipData({ skill: this.skill, el: this.el });
  }

  /**
   * Sets the tooltip skill and hovered element to null
   */
  private onMouseLeave(): void {
    this.tooltipService.updateToolTipData({ skill: null, el: null });
  }
}
