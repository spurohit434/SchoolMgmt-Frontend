import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCourseMarksComponent } from './student-course-marks.component';

describe('StudentCourseMarksComponent', () => {
  let component: StudentCourseMarksComponent;
  let fixture: ComponentFixture<StudentCourseMarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentCourseMarksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentCourseMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
