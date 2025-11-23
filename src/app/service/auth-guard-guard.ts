import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  canActivate(): boolean {
    const usuario = this.usuarioService.getUsuario();

    if (usuario && usuario.rol === 'ADMIN') {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
