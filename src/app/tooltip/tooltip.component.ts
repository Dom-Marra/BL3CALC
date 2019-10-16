import { Component, OnInit, Input } from '@angular/core';
import { Skill } from '../skill';
import { NormalSkill } from '../normalskill';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {
  private skill: Skill;
  private event: Event;

  @Input()
  set emmitValues(emmitValues: Array<any>) {
    if (emmitValues != null) {
      this.skill = emmitValues[0];
      this.event = emmitValues[1];

      this.setPosition();
    } 
    
  }

  constructor() { }

  ngOnInit() {
  }

  setPosition() {
    var tooltip = document.getElementById('tooltip');
    var body = document.body;
    var hoveredElement = event.srcElement as HTMLElement;
    var hoveredElementY = (hoveredElement.getBoundingClientRect().top + hoveredElement.getBoundingClientRect().bottom) / 2;
    var hoveredElementX = (hoveredElement.getBoundingClientRect().left + hoveredElement.getBoundingClientRect().right) / 2;
    tooltip.removeAttribute("style");
    
    
    if (hoveredElementY > (window.innerHeight/2)) {
      tooltip.style.bottom = (body.getBoundingClientRect().height
                               - (hoveredElement.getBoundingClientRect().top 
                               + document.documentElement.scrollTop) ) + "px";
    } else {
      tooltip.style.top = (hoveredElement.getBoundingClientRect().bottom + window.scrollY) + "px";
    }

    

    if (window.innerWidth > 768) {
      if (hoveredElementX > (window.innerWidth/2)) {
        tooltip.style.right = (body.getBoundingClientRect().right - hoveredElement.getBoundingClientRect().right) + "px";
      } else if (hoveredElementX < (window.innerWidth/2)){
        tooltip.style.left =  hoveredElement.getBoundingClientRect().left + "px";
      }
    } 
  }

  isNormalSkill(skill: Skill) {
    return skill instanceof NormalSkill;
  }

 
}
