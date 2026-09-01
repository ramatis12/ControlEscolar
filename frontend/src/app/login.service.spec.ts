import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://localhost:5001/api/login'; // Ajusta el puerto según tu API

  constructor(private http: HttpClient) { }

  validarLogin(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
