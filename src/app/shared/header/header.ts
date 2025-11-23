import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../service/usuario';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {

  mostrarLogin = false;
  mostrarRegistro = false;

  // Campos de login
  email: string = '';
  password: string = '';
  errorLogin: string = '';
  // Campos de registro
  nombreReg: string = '';
  emailReg: string = '';
  passwordReg: string = '';
  telefonoReg: string = '';
  errorRegistro: string = '';

  // Usuario logueado
  usuario: { nombre: string; email: string; rol: string } | null = null;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();
  }

  abrirLogin() {
    this.mostrarLogin = true;
    this.mostrarRegistro = false;
  }

  abrirRegistro() {
    this.mostrarRegistro = true;
    this.mostrarLogin = false;
  }

  cerrarModales() {
    this.mostrarLogin = false;
    this.mostrarRegistro = false;
  }

  onLogin() {
    this.errorLogin = '';
    this.usuarioService.login({
      email: this.email,
      password: this.password
    }).subscribe(
      res => {
        this.usuario = this.usuarioService.getUsuario();

        if (this.usuario?.rol === 'ADMIN') {
          window.location.href = '/admin-agregar';
        }

        this.cerrarModales();
      },
      err => {
        this.errorLogin = 'Error en el correo o contraseña, inténtalo nuevamente';
        console.error(err);
      }
    );
  }

  // REGISTRO
  onRegister() {
    this.errorRegistro = '';

    if (!this.nombreReg?.trim() || !this.emailReg?.trim() || !this.passwordReg?.trim() || !this.telefonoReg?.trim()) {
      this.errorRegistro = 'Todos los campos son obligatorios';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.emailReg)) {
      this.errorRegistro = 'Correo electrónico inválido';
      return;
    }

    if (this.passwordReg.length < 6) {
      this.errorRegistro = 'La contraseña debe tener al menos 6 caracteres';
      return;
    }

    const telefonoRegex = /^[0-9]+$/;
    if (!telefonoRegex.test(this.telefonoReg)) {
      this.errorRegistro = 'El teléfono solo debe contener números';
      return;
    }

    this.usuarioService.registrar({
      nombre: this.nombreReg,
      email: this.emailReg,
      password: this.passwordReg,
      telefono: this.telefonoReg,
    }).subscribe(
      res => {
        this.usuario = this.usuarioService.getUsuario();
        this.cerrarModales();
      },
      err => {
        console.error(err);

        if (err.status === 409 || (err.error && err.error.message?.includes('correo'))) {
          this.errorRegistro = 'El correo electrónico ya está registrado';
        } else if (err.status === 400) {
          this.errorRegistro = 'Datos inválidos, verifica los campos';
        } else {
          this.errorRegistro = 'El correo electrónico ya está registrado';
        }
      }
    );
  }

  logout() {
    this.usuarioService.logout().subscribe(() => {
      this.usuario = null;
      window.location.href = '/';
    });
  }
}
