import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlumnosService } from '../../alumnos.service';
import { MateriasService, Materia } from '../../materias.service';
import { AlumnoMateriasService, AlumnoMaterias } from '../../alumnosMaterias.service';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html'
})
export class InformacionComponent implements OnInit {
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
          this.AlumnoMateriasService.getAlumnosMaterias(this.idAlumno!).subscribe({
            next: (relaciones) => {
              this.Materias = data.filter(m =>
                relaciones.some(rel => rel.idMateria === m.idMateria)
              );
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
      .reduce((acc, m) => acc + Number(m.costoMateria), 0);

    console.log('Total calculado:', this.costoMateriaTotal);
  }

}
