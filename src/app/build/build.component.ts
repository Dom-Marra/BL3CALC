import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Amara } from '../amara';
import { Character } from '../character';
import { Fl4k } from '../fl4k';
import { Moze } from '../moze';
import { Zane } from '../zane';
import { Skill } from '../skill';
import { PastebinService } from "../pastebin.service";

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.scss']
})
export class BuildComponent implements OnInit {

  public character: Character;
  private characterType: string;
  public emmitValues: Array<any>;
  public loadedCharacterData = null;

  constructor(private router: ActivatedRoute, private pastebin: PastebinService, private route: Router) { }

  ngOnInit() {

    this.router.queryParams.subscribe(params => {
      this.setCharacter(params.character);

      if (params.save != null) {
        this.loadCharacter(params.save);
      }
    });
  }

  setCharacter(characterType: string) {
    switch(characterType) {
      case 'amara': {
        this.character = new Amara(1, 1, 1);
        this.characterType = "amara";
        break;
      } case 'fl4k': {
        this.character = new Fl4k(1, 2, 1);
        this.characterType = "fl4k";
        break;
      } case 'moze': {
        this.character = new Moze(2, 2, 0);
        this.characterType = "moze";
        break;
      } case 'zane': {
        this.character = new Zane(2, 4, 0);
        this.characterType = "zane";
        break;
      } default: {
        this.character = new Amara(1, 1, 1);
        this.characterType = "amara";
      }
    }
  }

  /**
   * Updates values for tooltip
   * @param emmitValues 
   *                    Array, first value has to be the skill, then next is the event
   */
  onHovered(emmitValues: Array<any>) {
    this.emmitValues = emmitValues;
  }
  
  /**
   * Moves right carousel item to the current position, the
   * left item to the next position, and current item to the previous position
   */
  next() {
    var current = document.getElementsByClassName('active')[0];     //Current tree being presented
    var next = document.getElementsByClassName('right')[0];         //prev tree to be presented
    var prev = document.getElementsByClassName('left')[0];          //next tree presented

    //current becomes prev
    current.className = ' carousel-item left';
    current.setAttribute('style', 'z-index: 1');

    //next becomes current
    next.className = ' carousel-item active';
    next.setAttribute('style', 'z-index: 2');

    //prev becomes next
    prev.className = ' carousel-item right';
    prev.setAttribute('style', 'z-index: 0');
  }

   /**
   * Moves left carousel item to the current position, the
   * right item to the previous position, and current item to the next position
   */
  previous() {
    var current = document.getElementsByClassName('active')[0];     //Current tree being presented
    var prev = document.getElementsByClassName('left')[0];          //prev tree to be presented
    var next = document.getElementsByClassName('right')[0];         //next tree presented

    //current becomes next
    current.className = ' carousel-item right';
    current.setAttribute('style', 'z-index: 1');

    //prev becomes current
    prev.className = ' carousel-item active';
    prev.setAttribute('style', 'z-index: 2');

    //next becomes prev
    next.className = ' carousel-item left';
    next.setAttribute('style', 'z-index: 0');

  }

  /**
   * Creates the build data and sends it to the pastebin service for a link generation
   */
  createBuildData() {
    var greenSkills = this.sortSkills(this.character.getGreenSkills());
    var blueSkills = this.sortSkills(this.character.getBlueSkills());
    var redSkills = this.sortSkills(this.character.getRedSkills());

    //Create skill allocation data
    var redSkillAllocations: Array<number> = this.getAllocations(redSkills);
    var blueSkillAllocations: Array<number> = this.getAllocations(blueSkills);
    var greenSkillAllocations: Array<number> = this.getAllocations(greenSkills);

    var equippedSkills = [{actionMods: []},{actionMods: []}];

    var configs = {};
    var extraConfigs = {};

    //Create conditional data
    for (var cond in this.character.getConditionals()) {
      if (this.character.getConditionals()[cond]['active'] == true) {
        configs[cond] = {};
        configs[cond].active = true;
      }
    }

    //Create extra conditional data
    for (var cond in this.character.getExtraCond()) {
      if (this.character.getExtraCond()[cond]['active'] == true) {
        extraConfigs[cond] = {};
        extraConfigs[cond].active = true;
        
        if (this.character.getExtraCond()[cond].effectiveness != null) {
          extraConfigs[cond].effectiveness = this.character.getExtraCond()[cond].effectiveness;
        }
        if (this.character.getExtraCond()[cond].currentValue != null) {
          extraConfigs[cond].currentValue = this.character.getExtraCond()[cond].currentValue;
        }
      }
    }

    //Create equipped skills data
    this.character.getEquippedSkills().forEach((set, index) => {
      if (set.actionSkill != null) {
        if (set.actionSkill.getColor() == "green") {
          equippedSkills[index]['actionSkill'] = this.character.getGreenSkills().indexOf(set.actionSkill);
        } else if (set.actionSkill.getColor() == "blue") {
          equippedSkills[index]['actionSkill'] = this.character.getBlueSkills().indexOf(set.actionSkill);
        } else {
          equippedSkills[index]['actionSkill'] = this.character.getRedSkills().indexOf(set.actionSkill);
        }
      }

      set.actionMods.forEach((mod, secondIndex) => {
        if (mod.getColor() == "green") {
          equippedSkills[index]['actionMods'][secondIndex] = this.character.getGreenSkills().indexOf(mod);
        } else if (mod.getColor() == "blue") {
          equippedSkills[index]['actionMods'][secondIndex] = this.character.getBlueSkills().indexOf(mod);
        } else {
          equippedSkills[index]['actionMods'][secondIndex] = this.character.getRedSkills().indexOf(mod);
        }
      });
    });
      

    var build = {
      character: this.characterType,
      redSkills: redSkillAllocations,
      blueSkills: blueSkillAllocations,
      greenSkills: greenSkillAllocations,
      equipped: equippedSkills,
      config: configs,
      extraConfig: extraConfigs
    }

    this.pastebin.createBuild(build, this.characterType);
  }

  getAllocations(skills: Array<Skill>): Array<number> {
    var allocations: Array<number> = [];

    skills.forEach((skill, index) => {
      allocations[index] = skill.getAllocatedPoints();
    });

    return allocations;
  }

  sortSkills(skills: Array<Skill>): Array<Skill> {
    //Sort the removed skills, skills that have effectiveness attatched should be removes first
    skills.sort((elementA, elementB) => {
      return elementA.getPreReq() - elementB.getPreReq();
    });
    
    return skills;

  }

  /**
   * Loads character data from pastebin
   * 
   * @param saveLink 
   *                pastebin entry
   */
  loadCharacter(saveLink: string) {
    //Get the data from the pastebing service
    var request = this.pastebin.getBuild(saveLink);

    //If the request is successful perform import
    request.then((data: any) => {
      if (this.characterType != data["character"]) {
        this.route.navigateByUrl(this.route.url.replace(this.characterType, data["character"]));
        return;
      }
      this.importCharacter(data);
    });
  }

  /**
   * Imports JSON build data
   * 
   * @param importedData
   *                    data imported from pastebin
   */
  importCharacter(importedData?: JSON) {

    var input: string;
    var data: JSON;
    
    if (importedData == null) {
      input = prompt("Please paste the build data:");

      if (input == "" || input == null) {
        return;
      }

      try {
        data = JSON.parse(input);
      } catch {
        alert("The import data is invalid!");
        return;
      }
      
    } else {
      data = importedData;
    }

    //If the character data type is null disregard the imported data
    if (data["character"] == null) {
      alert("The imported data is invalid!");
      return;
    }

    if (this.characterType != data["character"]) {
      this.route.navigateByUrl(this.route.url.replace(this.characterType, data["character"])).then(() => {
        this.importCharacter(data);
      });
      return;
    }

    this.setCharacter(data["character"]);
    this.loadedCharacterData = data;

    this.sortSkills(this.character.getGreenSkills());
    this.sortSkills(this.character.getBlueSkills());
    this.sortSkills(this.character.getRedSkills());

    //Add the conditionals 
    for (var config in this.loadedCharacterData.config) {
      if (this.loadedCharacterData.config[config].active) {
        this.character.getConditionals()[config].active = true;
      }
    }
    
    //Add the extra conditionals
    for (var config in this.loadedCharacterData.extraConfig) {
      if (this.loadedCharacterData.extraConfig[config].active) {
        this.character.getExtraCond()[config].active = true;
      }
      if (this.loadedCharacterData.extraConfig[config].effectiveness != null) {
        this.character.getExtraCond()[config].effectiveness = this.loadedCharacterData.extraConfig[config].effectiveness;
      }
      if (this.loadedCharacterData.extraConfig[config].currentValue != null) {
        this.character.getExtraCond()[config].currentValue = this.loadedCharacterData.extraConfig[config].currentValue;
      }
    }
    
  }

}
