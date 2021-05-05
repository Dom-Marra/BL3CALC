import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgeBoxComponent } from './edge-box.component';

describe('EdgeBoxComponent', () => {
  let component: EdgeBoxComponent;
  let fixture: ComponentFixture<EdgeBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdgeBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgeBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
