import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionCVComponent } from './accordion-cv.component';

describe('AccordionCVComponent', () => {
  let component: AccordionCVComponent;
  let fixture: ComponentFixture<AccordionCVComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccordionCVComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionCVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
