import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlumnosService } from '../alumnos.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html'
})
export class RegistrarComponent implements OnInit {
  nombre: string = '';
  apellidoPaterno: string = '';
  apellidoMaterno: string = '';

  constructor(private alumnosService: AlumnosService, private router: Router) { }

  ngOnInit(): void {
  }

  soloLetras(event: KeyboardEvent) {
    const char = event.key;
    const regex = /^[A-Za-zÁÉÍÓÚÑáéíóúñ]$/;
    if (!regex.test(char)) {
      event.preventDefault();
    }
  }

  limpiarAlumno() {
    this.nombre = '';
    this.apellidoPaterno = '';
    this.apellidoMaterno = '';
  }

  guardarAlumno() {
    const alumno = {
      idAlumno: 0,
      nombre: this.nombre.toUpperCase(),
      apellidoPaterno: this.apellidoPaterno.toUpperCase(),
      apellidoMaterno: this.apellidoMaterno.toUpperCase()
    };
  
    this.alumnosService.postAlumno(alumno).subscribe({
      next: (nuevoAlumno) => {
        alert('Alumno registrado correctamente');
        this.router.navigate(['../login']);
      },
      error: () => alert('Error al registrar alumno')
    });
  }

}
