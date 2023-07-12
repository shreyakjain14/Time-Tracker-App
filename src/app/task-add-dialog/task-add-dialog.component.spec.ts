import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAddDialogComponent } from './task-add-dialog.component';

describe('TaskAddDialogComponent', () => {
  let component: TaskAddDialogComponent;
  let fixture: ComponentFixture<TaskAddDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskAddDialogComponent]
    });
    fixture = TestBed.createComponent(TaskAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
