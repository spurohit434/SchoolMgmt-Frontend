import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarFacultyComponent } from './sidebar-faculty.component';

describe('SidebarFacultyComponent', () => {
  let component: SidebarFacultyComponent;
  let fixture: ComponentFixture<SidebarFacultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarFacultyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
