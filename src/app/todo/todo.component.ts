import { Component, OnInit } from '@angular/core';
import { Task } from './taskInterface';
import { threadId } from 'worker_threads';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})

export class TodoComponent implements OnInit {

  // tasks:Task[] = [
  //   {id: 1, title: "Get your eid suit", completed: false},
  //   {id: 2, title: "Complete angular in max 3 weeks", completed: false},
  //   {id: 3, title: "Find a new place to live", completed: true},
  //   {id: 4, title: "Get your mobile screen a new protector", completed: false},
  //   {id: 5, title: "Attend trainee catchup call", completed: true},
  // ];

  // Stores the task that has been entered through the input
  taskEntry: Task = {
    id: -1,
    title: '',
    completed: false
  };

  constructor(private taskService: TaskService) { }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  tasks: Task[] = this.taskService.getTasks();

  completeTask(task: Task) {
    this.taskService.completeTask(task);
  }

  addTask() {
    this.taskService.addTask(this.taskEntry) === true ? this.clearTaskEntry() : alert("There was an error while adding task, please try again");
  }

  setTaskEntry(task: Task) {
    this.taskEntry.id = task.id;
    this.taskEntry.title = task.title;
    this.taskEntry.completed = task.completed;
  }

  clearTaskEntry() {
    // clear task entry
    this.taskEntry.id = -1;
    this.taskEntry.title = '';
    this.taskEntry.completed = false;
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
  }

}
