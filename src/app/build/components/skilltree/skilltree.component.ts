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

  constructor() { }

  ngOnInit() {
  }

  /**
   * Adds a skill point
   * 
   * @param skill 
   *        skill point to add to
   * @param pos 
   *        position of the skill
   */
  public addPoint(skill: Skill, pos: number) {
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
