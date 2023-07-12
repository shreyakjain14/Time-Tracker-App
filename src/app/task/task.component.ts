import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnDestroy {
  @Input() task: any;
  @Output() taskAction = new EventEmitter<string>();
  @Output() onDeleteTask = new EventEmitter<undefined>();
  isTimerStarted: boolean = false;
  timerValue: number = 0;
  timerId: any;

  ngOnInit() {
    console.log('Task ', this.task);
    const length = this.task.histories.length;
    if (length > 0 && !this.task.histories[length - 1].endTime) {
      this.timerValue =
        (Date.now() - this.task.histories[length - 1].startTime) / 1000;
      this.timerId = setInterval(() => ++this.timerValue, 1000);
      this.isTimerStarted = true;
    }
  }

  deleteTask() {
    this.onDeleteTask.emit();
  }

  toggleTimer() {
    this.isTimerStarted = !this.isTimerStarted;
    this.timerValue = 0;
    if (this.isTimerStarted) {
      this.timerId = setInterval(() => ++this.timerValue, 1000);
    } else {
      clearInterval(this.timerId);
    }

    this.taskAction.emit(this.isTimerStarted ? 'start' : 'stop');
  }

  calculateTimerValue() {
    if (!this.isTimerStarted) return '00:00:00';

    const totalTimeSpendInMs = this.timerValue;
    let hh: string | number = Math.floor(totalTimeSpendInMs / 3600);
    const temp1 = totalTimeSpendInMs - hh * 3600;
    let mm: string | number = Math.floor(temp1 / 60);
    const temp2 = temp1 - mm * 60;
    let ss: string | number = Math.floor(temp2);

    if (hh < 10) hh = '0' + hh;
    if (mm < 10) mm = '0' + mm;
    if (ss < 10) ss = '0' + ss;

    return hh + ':' + mm + ':' + ss;
  }

  ngOnDestroy(): void {
    clearInterval(this.timerId);
  }
}
