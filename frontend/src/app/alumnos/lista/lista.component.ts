import { Component, OnInit } from '@angular/core';
import { AlumnosService, Alumno } from '../../alumnos.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {
  alumnos: Alumno[] = [];

  constructor(private alumnosService: AlumnosService) { }

  ngOnInit(): void {
    this.alumnosService.getAlumnos().subscribe({
      next: (data) => this.alumnos = data,
      error: () => alert('Error al cargar alumnos')
    });
  }

  borrarAlumno(id: number) {
    this.alumnosService.deleteAlumno(id).subscribe({
      next: () => this.alumnos = this.alumnos.filter(a => a.idAlumno !== id),
      error: () => alert('Error al borrar alumno')
    });
  }

  editarAlumno(id: number) {
    alert(`Editar alumno con ID: ${id}`);
  }
}
