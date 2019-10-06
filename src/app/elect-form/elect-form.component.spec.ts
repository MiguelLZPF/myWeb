import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectFormComponent } from './elect-form.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ElectFormComponent', () => {
  let component: ElectFormComponent;
  let fixture: ComponentFixture<ElectFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ ElectFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
