import { Component, OnInit } from '@angular/core';
import { MateriasService, Materia } from '../../materias.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {
  Materias: Materia[] = [];

  constructor(private MateriasService: MateriasService) { }

  ngOnInit(): void {
    this.MateriasService.getMaterias().subscribe({
      next: (data) => this.Materias = data,
      error: () => alert('Error al cargar Materias')
    });
  }

  editarMateria(id: number) {
    alert(`Editar Materia con ID: ${id}`);
  }
}
