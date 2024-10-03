import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  public allTask = this._localStorageService.getAllTasks();

  // Ver tareas de localStorage en la consola
  viewTask() {
    console.log(this.allTask);
  }
}
