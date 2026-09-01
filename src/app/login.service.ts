import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from './Models/login-response'; // Ajusta la ruta según tu proyecto

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:5078/api/login/validar'; 

  constructor(private http: HttpClient) {}

  validarLogin(nombre: string, apellidoPaterno: string): Observable<LoginResponse> {
    const url = `${this.apiUrl}?nombre=${nombre}&apellidoPaterno=${apellidoPaterno}`;
    return this.http.get<LoginResponse>(url);
  }
}
