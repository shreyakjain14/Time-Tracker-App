import { ElementRef } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-task-add-dialog',
  templateUrl: './task-add-dialog.component.html',
  styleUrls: ['./task-add-dialog.component.scss'],
})
export class TaskAddDialogComponent implements OnInit, OnDestroy {
  taskName: string = '';
  @Output() onTaskAdd = new EventEmitter<string>();
  @Output() closeDialog = new EventEmitter<undefined>();
  @ViewChild('dialog') dialog: ElementRef<HTMLDialogElement>;

  ngOnInit(): void {
    document.addEventListener('keyup', this.escapeCloseHandler);
  }

  submitTask() {
    const name = this.taskName.trim();
    if (name === '') return;
    this.onTaskAdd.emit(this.taskName);
  }

  escapeCloseHandler(event) {
    if (event.key === 'Escape') this.closeDialog.emit();
  }

  detectOutside(event) {
    if (!event.target.closest('.dialog')) {
      this.closeDialog.emit();
    }
  }

  ngOnDestroy(): void {}
}
