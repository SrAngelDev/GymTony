import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

export interface InscriptionData {
  // Datos Personales
  nombre: string;
  dni: string;
  telefono: string;
  email: string;
  fechaNacimiento: string;
  direccion: string;
  
  // Datos de Inscripción
  actividades: string[];
  horario: string;
  observaciones?: string;
}

@Component({
  selector: 'app-dialog-result',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Inscripción Completada - GYMTONIC VIVES</h2>
    <mat-dialog-content>
      <div class="dialog-section">
        <h3>Datos Personales</h3>
        <p><strong>Nombre:</strong> {{ data.nombre }}</p>
        <p><strong>DNI:</strong> {{ data.dni }}</p>
        <p><strong>Teléfono:</strong> {{ data.telefono }}</p>
        <p><strong>Email:</strong> {{ data.email }}</p>
        <p><strong>Fecha de Nacimiento:</strong> {{ data.fechaNacimiento }}</p>
        <p><strong>Dirección:</strong> {{ data.direccion }}</p>
      </div>
      
      <div class="dialog-section">
        <h3>Datos de Inscripción</h3>
        <p><strong>Actividades:</strong></p>
        <ul>
          <li *ngFor="let actividad of data.actividades">{{ actividad }}</li>
        </ul>
        <p><strong>Horario:</strong> {{ data.horario }}</p>
        <p *ngIf="data.observaciones"><strong>Observaciones:</strong> {{ data.observaciones }}</p>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-raised-button color="primary" mat-dialog-close>Cerrar</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .dialog-section {
      margin-bottom: 20px;
    }
    
    .dialog-section h3 {
      color: #3f51b5;
      border-bottom: 2px solid #3f51b5;
      padding-bottom: 8px;
      margin-bottom: 12px;
    }
    
    p {
      margin: 8px 0;
      line-height: 1.6;
    }
    
    ul {
      margin: 8px 0;
      padding-left: 20px;
    }
    
    li {
      margin: 4px 0;
    }
  `]
})
export class DialogResultComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: InscriptionData) {}
}
