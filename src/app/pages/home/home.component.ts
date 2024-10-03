import { NgClass, NgFor, NgIf } from '@angular/common';
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
  imports: [ReactiveFormsModule, NgClass, NgFor, NgIf],
})
export class HomeComponent {
  taskForm!: FormGroup; // !: it should never be null
  statusTouchedField: boolean = false; // Para forzar todos los touched en campos inválidos (futuro)

  // Inicialización del formulario
  constructor(private formBuilder: FormBuilder) {
    this.taskForm = formBuilder.group({
      taskname: ['', [Validators.required, Validators.minLength(6)]],
      deadline: ['', [Validators.required]],
      associatedPersons: this.formBuilder.array([
        this.formBuilder.group({
          fullname: ['', [Validators.required, Validators.minLength(5)]],
          age: ['', [Validators.required, Validators.min(19)]],
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

  // Valida si la skill se diligenció antes de agregar otra
  isValidSkill(indexPerson: number): boolean {
    // Obtiene el status de la habilidad (si se escribió)
    const isValidPreviousSkill =
      this.associatedPersons.controls[indexPerson].get('skills')?.valid;

    // Si se escribió la habilidad se puede agregar otra
    if (isValidPreviousSkill) {
      const arraySkills = this.getSkills(indexPerson);
      return arraySkills.controls.some((skill) => skill.valid);
    }
    return false;
  }

  // Agregar personas
  addPerson(): void {
    // Cantidad de personas
    const lengthPersons: number = this.associatedPersons.controls.length;
    const previousPerson: number = lengthPersons - 1; // Persona anterior

    const isValidPreviousPerson: boolean =
      this.associatedPersons.controls[previousPerson].valid;

    // Si el registro de la persona anterior es válido, se podrá agregar otra
    if (isValidPreviousPerson) {
      const newPerson = this.formBuilder.group({
        fullname: ['', [Validators.required, Validators.minLength(5)]],
        age: ['', [Validators.required, Validators.min(18)]],
        skills: this.formBuilder.array([
          this.formBuilder.control('', Validators.required),
        ]),
      });

      // Pendiente validar nombre único
      this.associatedPersons.push(newPerson);
    } else {
      alert(`Diligencie correctamente los datos de la persona anterior`);
    }
  }

  // Eliminar una persona
  removePerson(indexPerson: number): void {
    // Cantidad de personas asociadas
    const lengthPersons: number = this.taskForm.value.associatedPersons.length;

    if (lengthPersons === 1) {
      alert('Debe haber al menos una persona asociada');
    } else {
      this.associatedPersons.removeAt(indexPerson);
    }
  }

  // Agregar una habilidad en una persona
  addSkill(indexPerson: number): void {
    this.getSkills(indexPerson).push(
      this.formBuilder.control('', Validators.required)
    );
  }

  // Eliminar una habilidad
  removeSkill(indexPerson: number, indexSkill: number): void {
    // Cantidad de skills de la persona especificada por su index
    const lengthSkills: number =
      this.taskForm.value.associatedPersons[indexPerson].skills.length;

    // Si solo hay una habilidad, no se podrá eliminarla
    if (lengthSkills === 1) {
      alert('Debe haber al menos una habilidad');
    } else {
      this.getSkills(indexPerson).removeAt(indexSkill);
    }
  }

    // Validar campos si son válidos (taskname and date)
    validateField(field: string, typeError: string) {
      return this.taskForm.get(field)?.hasError(typeError);
    }

  // Validar campos si son válidos (Personas asociadas)
  validateFieldAssociatedPerson(field: string, typeError: string, indexPerson: number) {
    return this.associatedPersons.controls[indexPerson]
      .get(field)
      ?.hasError(typeError);
  }

    // Se activa el método touched cuando se toca el campo (taskname & date)
    touchField(field: string) {
      return this.taskForm.get(field)?.touched;
    }
  

  // Se activa el método touched cuando se toca el campo de personas asociadas
  touchFieldAssociatedPerson(field: string, indexPerson: number) {
    return this.associatedPersons.controls[indexPerson].get(field)?.touched;
  }

  // Habilidad tocada
  isValidTouchedSkill(indexPerson: number, indexSkill: number): boolean {
    const field = this.associatedPersons.controls[indexPerson].get('skills');
    const isInvalid = field?.get(indexSkill.toString())?.valid;
    // console.log(`Habilidad tocada es inválida?: ${field?.invalid} ${field?.get(indexSkill.toString())?.value}`);
    if (isInvalid) {
      return true;
    }
    return false;
  }

    // Verificación de datos inválidos en los campos
    hasErrors(field: string, typeError: string) {
      return (
        this.validateField(field, typeError) &&
        (this.taskForm.get(field)?.touched || this.statusTouchedField)
      );
    }

  // Verificación de datos inválidos en los campos de las personas asociadas
  hasErrorAssociatedPerson(field: string, typeError: string, indexPerson: number) {
    return (
      this.validateFieldAssociatedPerson(field, typeError, indexPerson) &&
      (this.associatedPersons.controls[indexPerson].get(field)?.touched ||
        this.statusTouchedField)
    );
  }
}
