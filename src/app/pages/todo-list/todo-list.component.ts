import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ITask } from 'src/app/models/task.model';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  standalone: true,
  imports: [NgFor],
})
export class TodoListComponent {
  private _localStorageService = inject(TodoService); // Servicio localStorage
  public allTask: ITask[] = this._localStorageService.getAllTasks(); // Se obtiene todas las tareas

  // Ver tareas de localStorage en la consola
  viewTask() {
    console.log(this.allTask);
  }
}
