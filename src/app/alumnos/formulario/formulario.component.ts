import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlumnosService } from '../../alumnos.service';
import { MateriasService, Materia } from '../../materias.service';
import { AlumnoMateriasService, AlumnoMaterias } from '../../alumnosMaterias.service';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html'
})
export class FormularioComponent implements OnInit {
  idAlumno: number | null = null;
  idMateria: number | null = null;
  nombre: string = '';
  apellidoPaterno: string = '';
  apellidoMaterno: string = '';
  Materias: Materia[] = [];
  costoMateria: number | null = null;
  costoMateriaTotal: number | null = null;

  constructor(
    private alumnosService: AlumnosService,
    private router: Router,
    private route: ActivatedRoute,
    private MateriasService: MateriasService,
    private AlumnoMateriasService: AlumnoMateriasService
  ) { }

  ngOnInit(): void {
    this.idAlumno = Number(this.route.snapshot.paramMap.get('id'));

    if (this.idAlumno) {
      this.alumnosService.getAlumno(this.idAlumno).subscribe({
        next: (alumno) => {
          this.nombre = alumno.nombre;
          this.apellidoPaterno = alumno.apellidoPaterno;
          this.apellidoMaterno = alumno.apellidoMaterno;
        },
        error: () => alert('Error al cargar alumno')
      });

      this.MateriasService.getMaterias().subscribe({
        next: (data) => {
          this.Materias = data;

          this.AlumnoMateriasService.getAlumnosMaterias(this.idAlumno!).subscribe({
            next: (relaciones) => {
              relaciones.forEach(rel => {
                const materia = this.Materias.find(m => m.idMateria === rel.idMateria);
                if (materia) {
                  (materia as any).seleccionada = true;
                }
              });
              this.actualizarTotal();
            },
            error: () => alert('Error al cargar materias del alumno')
          });
        },
        error: () => alert('Error al cargar Materias')
      });
    } else {
      this.MateriasService.getMaterias().subscribe({
        next: (data) => this.Materias = data,
        error: () => alert('Error al cargar Materias')
      });
    }
  }

  actualizarTotal() {
    this.costoMateriaTotal = this.Materias
      .filter(m => (m as any).seleccionada)
      .reduce((acc, m) => acc + m.costoMateria, 0);
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
    if (!this.nombre) {
      alert('Debes ingresar nombre');
      return;
    } else if (!this.apellidoPaterno) {
      alert('Debes ingresar Apellido Paterno');
      return;
    }

    const alumno = {
      idAlumno: this.idAlumno ?? 0,
      nombre: this.nombre.toUpperCase(),
      apellidoPaterno: this.apellidoPaterno.toUpperCase(),
      apellidoMaterno: this.apellidoMaterno.toUpperCase()
    };

    if (this.idAlumno) {
      this.alumnosService.putAlumno(this.idAlumno, alumno).subscribe({
        next: () => {
          this.AlumnoMateriasService.deleteAlumnoMaterias(this.idAlumno!).subscribe({
            next: () => {
              this.Materias.filter(m => m.seleccionada).forEach(materia => {
                const relacion: AlumnoMaterias = {
                  idAlumno: this.idAlumno!,
                  idMateria: materia.idMateria
                };
                this.AlumnoMateriasService.postAlumnoMaterias(relacion).subscribe();
              });

              alert('Alumno actualizado correctamente');
              this.router.navigate(['/menu/alumnos/lista']);
            }
          });
        }
      });
    }
    else {
      this.alumnosService.postAlumno(alumno).subscribe({
        next: (nuevoAlumnoMaterias) => {
          this.Materias.filter(m => m.seleccionada).forEach(materia => {
            const relacion = {
              idAlumno: nuevoAlumnoMaterias.idAlumno,
              idMateria: materia.idMateria
            };
            this.AlumnoMateriasService.postAlumnoMaterias(relacion).subscribe({});
          });
          alert('Nuevo Alumno registrado')
          this.router.navigate(['/menu/alumnos/lista']);
        },
        error: () => alert('Error al registrar alumno')
      });
    }
  }
}
