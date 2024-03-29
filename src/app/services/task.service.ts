import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Task } from '../todo/taskInterface';

@Injectable(
  { providedIn: 'root' }
)
export class TaskService {
  constructor(private http: HttpClient) { }

  // Contains all the tasks existing
  tasks: Task[] = [
    { id: 1, title: "Get your eid suit", completed: false },
    { id: 2, title: "Complete angular in max 3 weeks", completed: false },
    { id: 3, title: "Find a new place to live", completed: true },
    { id: 4, title: "Get your mobile screen a new protector", completed: false },
    { id: 5, title: "Attend trainee catchup call", completed: true },
  ]

  getTasks(): Task[] {
    return this.tasks;
  }

  completeTask(task: Task) {
    for (let t of this.tasks) {
      if (t.id === task.id) {
        t.completed = true;
        console.log("Task: " + t.title + " is now completed.\n", t);
        return;
      }
    }
  }

  addTask(taskEntry: Task): boolean {
    console.log(taskEntry);

    // will check if task is being added or edited
    try {
      const isTaskEdit = taskEntry.id !== -1;

      if (isTaskEdit) {
        const existingTaskIndex = this.tasks.findIndex(task => task.id === taskEntry.id);

        this.tasks[existingTaskIndex].title = taskEntry.title;
        this.tasks[existingTaskIndex].completed = taskEntry.completed;
      }
      else {
        const newTaskId = Math.floor(Math.random() * 1000);

        this.tasks.push({
          id: newTaskId,
          title: taskEntry.title,
          completed: false
        })
      }

      return true;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }


}