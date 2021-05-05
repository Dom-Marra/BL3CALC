import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkilltreesComponent } from './skilltrees.component';

describe('SkilltreesComponent', () => {
  let component: SkilltreesComponent;
  let fixture: ComponentFixture<SkilltreesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkilltreesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkilltreesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
