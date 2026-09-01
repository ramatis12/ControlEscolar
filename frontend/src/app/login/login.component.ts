import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { LoginResponse } from '../Models/login-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  nombre: string = '';
  apellidoPaterno: string = '';

  constructor(private router: Router, private loginService: LoginService) { }

  soloLetras(event: KeyboardEvent) {
    const char = event.key;
    const regex = /^[A-Za-zÁÉÍÓÚÑáéíóúñ]$/;

    if (!regex.test(char)) {
      event.preventDefault();
    }
  }
  ingresar() {
    if (!this.nombre) {
      alert('Debes ingresar nombre');
      return;
    }
    else if (!this.apellidoPaterno) {
      alert('Debes ingresar Apellido');
      return;
    }
    const loginData = {
      nombre: this.nombre.toUpperCase(),
      apellidoPaterno: this.apellidoPaterno.toUpperCase()
    };
    this.loginService.validarLogin(this.nombre, this.apellidoPaterno).subscribe({
      next: (res: LoginResponse) => {
        if (res.success) {
          this.router.navigate(['/menu']);
        } else {
          alert(res.message || 'Usuario no existe Sara');
        }
      },
      error: () => {
        alert('Error al validar usuario');
      }
    });
  }
}
