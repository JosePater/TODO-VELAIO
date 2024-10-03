// Interface para tareas
export interface ITask {
    taskname: string;
    deadline: string;
    completed: boolean; // Para definir si la tarea ha sido completada
    associatedPersons: IPerson[];
  }
  
// Interface para persona
  export interface IPerson {
    fullname: string;
    age: number;
    skills: string[];
  }
  