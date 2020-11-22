import { Component, OnInit, Input, ElementRef, ViewChild, Injectable } from '@angular/core';
import { Skill } from '../skill';
import { NormalSkill } from '../normalskill';
import { Directive } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import ResizeObserver from 'resize-observer-polyfill';


export interface tooltipdata {
  skill: Skill,
  el: ElementRef
}

@Injectable({
  providedIn: 'root',
})
export class ToolTipService {

  public tooltipData: BehaviorSubject<tooltipdata> = new BehaviorSubject({skill: null, el: null});

  constructor() { }

  /**
   * Updates the tooltipdata
   * 
   * @param tooltipData 
   *        data to use
   */
  public updateToolTipData(tooltipData: tooltipdata) {
    this.tooltipData.next(tooltipData);
  }

}

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {

  @ViewChild('toolTip') tooltip: ElementRef;

  public skill: Skill;
  public el: ElementRef;

  constructor(private tooltipService: ToolTipService) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.tooltipService.tooltipData.subscribe(tooltipData => {
      this.skill = tooltipData.skill;
      this.el = tooltipData.el;
    });
    
    let heightObs = new ResizeObserver(() => {
      this.setPosition();
    });

    heightObs.observe(this.tooltip.nativeElement);

  }
  
  /**
   * Sets position of the tooltip on the screen
   */
  public setPosition() {
    var body = document.body;

    if (this.el == null) { 
      this.tooltip.nativeElement.classList.remove('visible');
      return;
    };

    this.tooltip.nativeElement.classList.add('visible');
    var hoveredElement = this.el.nativeElement as SVGElement;
    var hoveredElementY = (hoveredElement.getBoundingClientRect().top + hoveredElement.getBoundingClientRect().bottom) / 2;
    var hoveredElementX = (hoveredElement.getBoundingClientRect().left + hoveredElement.getBoundingClientRect().right) / 2;
    this.tooltip.nativeElement.removeAttribute("style");
    
    if (hoveredElementY > (window.innerHeight/2)) {
      this.tooltip.nativeElement.style.top = ( hoveredElement.getBoundingClientRect().top - this.tooltip.nativeElement.offsetHeight + document.documentElement.scrollTop) + "px";
    } else {
      this.tooltip.nativeElement.style.top = (hoveredElement.getBoundingClientRect().bottom + document.documentElement.scrollTop) + "px";
    }

    if (hoveredElementX > (body.offsetWidth/2)) {
      this.tooltip.nativeElement.style.right = (body.getBoundingClientRect().right - hoveredElement.getBoundingClientRect().right) + "px";
    } else if (hoveredElementX < (window.innerWidth/2)){
      this.tooltip.nativeElement.style.left =  hoveredElement.getBoundingClientRect().left + "px";
    }
  }

  /**
   * Checks if the skill is normal
   */
  isNormalSkill(skill: Skill) {
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
    this.tooltipService.updateToolTipData({skill: this.skill, el: this.el});
  }

  /**
   * Sets the tooltip skill and hovered element to null
   */
  private onMouseLeave(): void {
    this.tooltipService.updateToolTipData({skill: null, el: null});
  }
}
