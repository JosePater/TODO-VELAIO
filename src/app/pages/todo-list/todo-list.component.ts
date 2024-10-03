import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  private _localStorageService = inject(TodoService); // Servicio localStorage

  // Ver tareas de localStorage en la consola
  viewTask() {
    console.log(this._localStorageService.getAllTasks());
  }
}
