import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MateriasService } from '../../materias.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html'
})
export class FormularioComponent implements OnInit {
  idMateria: number | null = null;
  nombre: string = '';
  costoMateria: number = 0;

  constructor(
    private materiasService: MateriasService,
    private router: Router,
    private route: ActivatedRoute
  ) { }



  ngOnInit(): void {
    this.idMateria = Number(this.route.snapshot.paramMap.get('id'));
    if (this.idMateria) {
      this.materiasService.getMateria(this.idMateria).subscribe({
        next: (materia) => {
          this.nombre = materia.nombre;
          this.costoMateria = materia.costoMateria;
        },
        error: () => alert('Error al cargar alumno')
      });
    }
  }

  soloLetras(event: KeyboardEvent) {
    const char = event.key;
    const regex = /^[A-Za-zÁÉÍÓÚÑáéíóúñ]$/;
    if (!regex.test(char)) {
      event.preventDefault();
    }
  }
  soloNumeros(event: KeyboardEvent) {
    const char = event.key;
    const regex = /^[0-9]$/;
    if (!regex.test(char)) {
      event.preventDefault();
    }
  }
  limpiarMateria() {
    this.nombre = '';
    this.costoMateria = 0;
  }

  guardarMateria() {
    if (!this.nombre) {
      alert('Debes ingresar nombre');
      return;
    } else if (this.costoMateria === null) {
      alert('Debes ingresar costo de la materia');
      return;
    }
    console.log(this.nombre)
    const Materias = {
      idMateria: this.idMateria ?? 0,
      nombre: this.nombre.toUpperCase(),
      costoMateria: this.costoMateria
    };
    console.log(this.idMateria)

    console.log(this.costoMateria)


    if (this.idMateria) {
      this.materiasService.putMateria(this.idMateria, Materias).subscribe({
        next: () => {
          alert('Materia actualizada correctamente');
          this.router.navigate(['/menu/materias/lista']);
        },
        error: () => alert('Error al actualizar materia')
      });
    } else {
      this.materiasService.postMateria(Materias).subscribe({
        next: () => {
          alert('Materia registrada correctamente');
          this.router.navigate(['/menu/materias/lista']);
        },
        error: () => alert('Error al registrar materia')
      });
    }
  }
}
