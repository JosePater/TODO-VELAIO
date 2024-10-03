import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ITask } from 'src/app/models/task.model';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  standalone: true,
  imports: [NgFor, FormsModule, NgIf],
})
export class TodoListComponent {
  private _localStorageService = inject(TodoService); // Servicio localStorage
  public allTask: ITask[] = this._localStorageService.getAllTasks(); // Se obtiene todas las tareas

  taskFilter: 'all' | 'completed' | 'pending' = 'all'; // Filtro para las tareas

  // Filtra las tareas según elección: Todas, completadas o pendientes
  get filteredTasks() {
    if (this.taskFilter === 'completed') {
      return this.allTask.filter((task) => task.completed);
    } else if (this.taskFilter === 'pending') {
      return this.allTask.filter((task) => !task.completed);
    }
    return this.allTask; // Todas las tareas
  }

  // Actualiza el estado de la tarea
  onTaskStatusChange(task: ITask) {
    task.completed = task.completed; // Cambia el estado de la tarea
    // Actualiza el estado de la tarea directamente en la localStorage
    localStorage.setItem('tasks', JSON.stringify(this.allTask));
  }
}
