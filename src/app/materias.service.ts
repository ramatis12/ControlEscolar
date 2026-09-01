import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DecimalPipe } from '@angular/common';

export interface Materia {
  idMateria: number;
  nombre: string;
  costoMateria: number;
  seleccionada?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MateriasService {
  private apiUrl = 'http://localhost:5078/api/materias';

  constructor(private http: HttpClient) { }

  getMaterias(): Observable<Materia[]> {
    return this.http.get<Materia[]>(this.apiUrl);
  }

  getMateria(id: number): Observable<Materia> {
    return this.http.get<Materia>(`${this.apiUrl}/${id}`);
  }

  postMateria(Materia: Materia): Observable<Materia> {
    return this.http.post<Materia>(this.apiUrl, Materia);
  }

  putMateria(id: number, Materia: Materia): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, Materia);
  }

  deleteMateria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
