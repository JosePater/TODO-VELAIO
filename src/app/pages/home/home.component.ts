import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgFor],
})
export class HomeComponent {
  taskForm!: FormGroup; // !: it should never be null

  // Inicialización del formulario
  constructor(private formBuilder: FormBuilder) {
    this.taskForm = formBuilder.group({
      taskname: ['', [Validators.required, Validators.minLength(3)]],
      deadline: ['', [Validators.required]],
      associatedPersons: this.formBuilder.array([
        this.formBuilder.group({
          fullname: ['', [Validators.required, Validators.minLength(5)]],
          age: ['', [Validators.required, Validators.min(18)]],
          skills: this.formBuilder.array([
            this.formBuilder.control('', Validators.required),
          ]),
        }),
      ]),
    });
  }

  ngOnInit(): void {}

  // Envío del formulario
  onSubmit() {
    if (this.taskForm.valid) {
      console.log('Tarea registrada');
      console.log(this.taskForm.value);
    }
  }

  // Acceso al formulario de personas asociadas
  get associatedPersons(): FormArray {
    return this.taskForm.get('associatedPersons') as FormArray;
  }

  // Acceso al formulario de habilidades de una persona
  getSkills(indexPerson: number): FormArray {
    return this.associatedPersons.at(indexPerson).get('skills') as FormArray;
  }

  // Si hay habilidades
  isSkills(indexPerson: number): boolean {
    const arraySkills = this.getSkills(indexPerson);
    return arraySkills.controls.some((skill) => skill.valid);
  }

  // Agregar personas
  addPerson(): void {
    const newPerson = this.formBuilder.group({
      fullname: ['', [Validators.required, Validators.minLength(5)]],
      age: ['', [Validators.required, Validators.min(18)]],
      skills: this.formBuilder.array([
        this.formBuilder.control('', Validators.required),
      ]),
    });

    // Pendiente validar nombre único
    this.associatedPersons.push(newPerson);
  }

  // Eliminar una persona
  removePerson(indexPerson: number): void {
    this.associatedPersons.removeAt(indexPerson);
  }

  // Agregar una habilidad en una persona
  addSkill(indexPerson: number): void {
    this.getSkills(indexPerson).push(
      this.formBuilder.control('', Validators.required)
    );
  }

  // Eliminar una habilidad
  removeSkill(indexPerson: number, indexSkill: number): void {
    this.getSkills(indexPerson).removeAt(indexSkill);
  }

  // Validar campos si con válidos
  validarCampo(field: string, typeError: string) {
    return this.taskForm.get(field)?.hasError(typeError);
  }
}
