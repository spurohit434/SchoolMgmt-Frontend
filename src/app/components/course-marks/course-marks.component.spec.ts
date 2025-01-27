import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMarksComponent } from './course-marks.component';

describe('CourseMarksComponent', () => {
  let component: CourseMarksComponent;
  let fixture: ComponentFixture<CourseMarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseMarksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
