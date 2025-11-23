import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // LOGIN
  login(credenciales: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/login`, credenciales, { withCredentials: true })
      .pipe(
        tap((res: any) => {
          localStorage.setItem('usuario', JSON.stringify({
            nombre: res.nombre,
            email: res.email,
            rol: res.rol
          }));
        })
      );
  }

  // REGISTRO
  registrar(usuario: { nombre: string; email: string; password: string; telefono: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/register`, usuario, { withCredentials: true });
  }

  // Obtener usuario actual
  getMe(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/auth/me`, { withCredentials: true })
      .pipe(
        tap((res: any) => {
          localStorage.setItem('usuario', JSON.stringify({
            nombre: res.nombre,
            email: res.email,
            rol: res.rol
          }));
        })
      );
  }

  // LOGOUT
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/logout`, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          localStorage.removeItem('usuario');
        })
      );
  }

  // Verificar si hay sesión activa
  getUsuario(): { nombre: string; email: string; rol: string } | null {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }
}
