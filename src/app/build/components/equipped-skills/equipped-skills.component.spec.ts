import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquippedSkillsComponent } from './equipped-skills.component';

describe('EquippedSkillsComponent', () => {
  let component: EquippedSkillsComponent;
  let fixture: ComponentFixture<EquippedSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquippedSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquippedSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
