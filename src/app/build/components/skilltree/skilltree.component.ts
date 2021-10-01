import { Component, OnInit, Input } from '@angular/core';
import { SkillTree } from 'src/app/core/classes/skilltree';
import { ActionMod } from '../../../core/classes/actionmod';
import { ActionSkill } from '../../../core/classes/actionskill';
import { NormalSkill } from '../../../core/classes/normalskill';
import { Skill } from '../../../core/classes/skill';

@Component({
  selector: 'app-skilltree',
  templateUrl: './skilltree.component.html',
  styleUrls: ['./skilltree.component.scss']
})
export class SkilltreeComponent implements OnInit {

  @Input() skilltree: SkillTree;

  private contextMenuTimeout = null;        //Reference to the timeout for the press and hold
  public tooltipVisible: boolean = false;   //Whether the tooltip is visible or not
  public usedTouch: boolean = false;        //Whether the user used touch or not

  constructor() { }

  ngOnInit() {
  }

  /**
   * Handles touch start events on skill buttons
   * 
   * @param e 
   *        TouchEvent: The event
   * @param skill 
   *        Skill: the skill clicked
   */
  public handleTouchStart(e: TouchEvent, skill: Skill) {
    this.usedTouch = true;
    const clientY = (e.target as HTMLElement).getBoundingClientRect().y;

    this.contextMenuTimeout = setTimeout(() => {
      const clientYAfter = (e.target as HTMLElement).getBoundingClientRect().y;

      this.contextMenuTimeout = null;
      if (clientY !== clientYAfter) return;

      this.removePoint(skill);
    }, 600);
  }

  /**
   * Handles touch end events on skill buttons
   * 
   * @param e 
   *        TouchEvent: The event
   * @param skill 
   *        Skill: the skill clicked
   */
  public handleTouchEnd(e: Event, skill: Skill) {
    if (!this.tooltipVisible) {
      this.tooltipVisible = true;
      clearTimeout(this.contextMenuTimeout);
      console.log(this.tooltipVisible)
      return;
    }

    if (this.contextMenuTimeout) {
      clearTimeout(this.contextMenuTimeout);

      if (!(this.skilltree.character.maxActionSkillPoints === 2 && this.isActionSkill(skill) || 
        this.skilltree.character.maxActionModPoints > 1 && this.isActionMod(skill))) {
        this.addPoint(skill);
      }
    }
  }

  /**
   * Handles click events on skill buttons
   * 
   * @param skill 
   *        Skill: the skill clicked
   */
  public handleClick(e: MouseEvent, skill: Skill): void {
    if (this.usedTouch) return;

    if (!(this.skilltree.character.maxActionSkillPoints === 2 && this.isActionSkill(skill) || 
      this.skilltree.character.maxActionModPoints > 1 && this.isActionMod(skill))) {
      this.addPoint(skill);
    }
  }

  /**
   * Handles context menu events on skill buttons
   * 
   * @param skill 
   *        Skill: the skill clicked
   */
  public handleContextMenu(e: MouseEvent, skill: Skill): void {
    e.preventDefault();
    
    if (e.button !== 2) return;

    this.removePoint(skill);
  }

  /**
   * Adds a skill point
   * 
   * @param skill 
   *        skill point to add to
   * @param pos 
   *        position of the skill
   */
  public addPoint(skill: Skill, pos?: number) {
    this.skilltree.addPoint(skill, pos);
  }

  /**
   * Removes a skill point
   * 
   * @param skill 
   *        the skill to remove from
   */
  public removePoint(skill: Skill) {
    this.skilltree.removePoint(skill);
  }

  /**
   * Resets the tree
   */
  public reset() {
    this.skilltree.reset();
  }

  /**
   * Checks if a skills is of type action mod
   * 
   * @param skill 
   *          skill to check
   * @returns
   *         boolean: whether the type matches
   */
  public isActionMod(skill: Skill): Boolean {
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
  public isActionSkill(skill: Skill): Boolean {
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
  public isNormalSkill(skill: Skill): Boolean {
    return skill instanceof NormalSkill;
  }
}
