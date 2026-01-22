import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Material imports
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { DialogResultComponent, InscriptionData } from './dialog-result/dialog-result.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('GYMTONIC VIVES');
  
  datosPersonalesForm: FormGroup;
  datosInscripcionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    // Formulario de Datos Personales
    this.datosPersonalesForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      dni: ['', [Validators.required, Validators.pattern(/^[0-9]{8}[A-Z]$/)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      email: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['', Validators.required],
      direccion: ['', [Validators.required, Validators.minLength(5)]]
    });

    // Formulario de Datos de Inscripción
    this.datosInscripcionForm = this.fb.group({
      pilates: [false],
      fitness: [false],
      gimnasio: [false],
      otros: [false],
      horario: ['', Validators.required],
      observaciones: ['']
    });
  }

  onSubmit() {
    if (this.datosPersonalesForm.valid && this.datosInscripcionForm.valid) {
      // Recopilar actividades seleccionadas
      const actividades: string[] = [];
      if (this.datosInscripcionForm.value.pilates) actividades.push('Pilates');
      if (this.datosInscripcionForm.value.fitness) actividades.push('Fitness');
      if (this.datosInscripcionForm.value.gimnasio) actividades.push('Gimnasio');
      if (this.datosInscripcionForm.value.otros) actividades.push('Otros');

      // Formatear fecha
      const fecha = new Date(this.datosPersonalesForm.value.fechaNacimiento);
      const fechaFormateada = fecha.toLocaleDateString('es-ES');

      const data: InscriptionData = {
        nombre: this.datosPersonalesForm.value.nombre,
        dni: this.datosPersonalesForm.value.dni,
        telefono: this.datosPersonalesForm.value.telefono,
        email: this.datosPersonalesForm.value.email,
        fechaNacimiento: fechaFormateada,
        direccion: this.datosPersonalesForm.value.direccion,
        actividades: actividades,
        horario: this.datosInscripcionForm.value.horario,
        observaciones: this.datosInscripcionForm.value.observaciones
      };

      // Abrir diálogo con los datos
      this.dialog.open(DialogResultComponent, {
        width: '600px',
        data: data
      });
    }
  }
}

