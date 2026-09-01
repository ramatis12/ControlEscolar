import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AlumnoMaterias {
  idAlumno: number;
  idMateria: number;
}

@Injectable({
  providedIn: 'root'
})
export class AlumnoMateriasService {
  private apiUrl = 'http://localhost:5078/api/alumnomaterias'; 

  constructor(private http: HttpClient) {}

  getAlumnoMaterias(): Observable<AlumnoMaterias[]> {
    return this.http.get<AlumnoMaterias[]>(this.apiUrl);
  }

  getAlumnosMaterias(id: number): Observable<AlumnoMaterias[]> {
    return this.http.get<AlumnoMaterias[]>(`${this.apiUrl}/${id}`);
  }
  
  postAlumnoMaterias(alumnomaterias: AlumnoMaterias): Observable<AlumnoMaterias> {
    return this.http.post<AlumnoMaterias>(this.apiUrl, alumnomaterias);
  }

  // deleteAlumnoMaterias(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/alumno/${id}`);
  // }

  deleteAlumnoMaterias(id: number): Observable<void> {
    const url = `${this.apiUrl}/alumno/${id}`;
    console.log('URL DELETE:', url); // 👈 aquí ves la URL exacta
    return this.http.delete<void>(url);
  }
}
