import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  // Almacena todas las tareas registradas
  private allTasks: any[] = [];

  constructor() {
    // Cargar las tareas existentes del localStorage
    this.allTasks = this.getTasks();
  }

  // Obtener todas las tareas
  getAllTasks(): any[] {
    return this.allTasks;
  }

  // Agregar nueva tarea al array y guardarlo en localStorage
  addTask(task: any): boolean {
    if (!this.isTaskDuplicate(task)) {
      this.allTasks.push(task); // Añadir la nueva tarea si no es duplicada
      localStorage.setItem('tasks', JSON.stringify(this.allTasks)); // Guardar el array actualizado en localStorage
      return true; // Tarea añadida con éxito
    }
    return false; // Tarea duplicada, no se añade
  }

  // Obtener las tareas desde el localStorage
  private getTasks(): any[] {
    const jsonData = localStorage.getItem('tasks');
    return jsonData ? JSON.parse(jsonData) : [];
  }

  // Verificar si una tarea ya existe
  private isTaskDuplicate(newTask: any): boolean {
    return this.allTasks.some((task) => task.taskname === newTask.taskname);
  }
}
