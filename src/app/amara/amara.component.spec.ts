import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmaraComponent } from './amara.component';

describe('AmaraComponent', () => {
  let component: AmaraComponent;
  let fixture: ComponentFixture<AmaraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmaraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
