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

  // Stores the task that has been entered through the input
  taskEntry: Task = {
    id: '',
    title: '',
    completed: false
  };

  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((data: Task[]) => {
      this.tasks = data;
    });    
  }

  completeTask(task: Task) {
    this.taskService.completeTask(task);
    this.refreshTasks();
  }

  addTask() {
    this.taskService.addTask(this.taskEntry)
    .subscribe((data) => {
      console.log(data);

      this.refreshTasks();
    });
  }

  setTaskEntry(task: Task) {
    this.taskEntry.id = task.id;
    this.taskEntry.title = task.title;
    this.taskEntry.completed = task.completed;
    console.log("taks entry: ", task);
  }

  clearTaskEntry() {
    // clear task entry
    this.taskEntry.id = '';
    this.taskEntry.title = '';
    this.taskEntry.completed = false;
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe(data => {
      console.log(data);
    });
    this.refreshTasks();
  }
  
  refreshTasks() {
    this.tasks = [];
    this.taskService.getTasks().subscribe((data: Task[]) => {
      this.tasks = data;
    }); 
  }
}

