import { Component, OnDestroy, OnInit } from '@angular/core';
// import { Task } from './models/task';

interface History {
  startTime: number;
  endTime: number | undefined;
}

export interface Task {
  name: string;
  histories: History[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  taskAddPopoup: boolean = false;

  ngOnInit(): void {
    const previouslyPresentItems = localStorage.getItem('tasks');
    if (previouslyPresentItems) {
      this.tasks = JSON.parse(previouslyPresentItems);
    }
  }

  calculateTotalTimeSpend() {
    let totalTimeSpend: number = 0;

    this.tasks.forEach(({ histories }) => {
      histories.forEach(({ startTime, endTime }) => {
        totalTimeSpend += (endTime || Date.now()) - startTime;
      });
    });

    totalTimeSpend = Math.ceil(totalTimeSpend / 1000);
    totalTimeSpend /= 3600;

    return Math.floor(totalTimeSpend);
  }

  addTask(name: string) {
    this.taskAddPopoup = false;
    this.tasks.push({ name, histories: [] });

    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  openAddTaskPopup() {
    this.taskAddPopoup = true;
  }

  taskAction(action: string, taskIndex: number) {
    if (action === 'start') {
      this.tasks[taskIndex].histories.push({
        startTime: Date.now(),
        endTime: undefined,
      });
    } else {
      const length = this.tasks[taskIndex].histories.length;
      this.tasks[taskIndex].histories[length - 1].endTime = Date.now();
    }

    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  closeDialog() {
    this.taskAddPopoup = false;
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);

    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  ngOnDestroy(): void {
    console.log('inside onDestroy');
    if (this.tasks && this.tasks.length) {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }
}
