import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Task } from '../todo/taskInterface';

@Injectable(
  { providedIn: 'root' }
)
export class TaskService {

  //region variables
  baseUrl:string = "http://localhost:3000/tasks";
  filter:string = '';

  updatedSuccessMsg:string = 'successfully updated';
  addedSuccessMsg:string = 'successfully added';
  emptyString:string = '';
  //endregion

  constructor(private http: HttpClient) { }

  // Contains all the tasks existing
  tasks: Task[] = []

  getTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(this.baseUrl);
  }

  completeTask(task: Task) {
    for (let t of this.tasks) {
      if (t.id === task.id) {
        t.completed = true;
        this.http.put(`${this.baseUrl}/${task.id}`, task);
      }
    }
  }

  addTask(taskEntry: Task) {
    console.log(taskEntry);
    // will check if task is being added or edited
    const isTaskEdit = taskEntry.id !== this.emptyString;
    if (isTaskEdit) {
      return this.http.put(`${this.baseUrl}/${taskEntry.id}`, taskEntry);
    } else {
      taskEntry.id = (Math.floor(Math.random() * 1000)).toString();
      return this.http.post(this.baseUrl, taskEntry);
    }
  }

  deleteTask(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }


}