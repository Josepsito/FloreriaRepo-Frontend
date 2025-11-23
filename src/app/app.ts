import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioService } from './service/usuario';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  usuario: any = null;

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    this.usuarioService.getMe().subscribe({
      next: (u) => {
        this.usuario = u;
        if (this.usuario?.rol === 'ADMIN') {
          this.router.navigate(['/admin-agregar']);
        }
      },
      error: () => {
        this.usuario = null;
      }
    });
  }

  cerrarSesion() {
    this.usuarioService.logout().subscribe(() => {
      this.usuario = null;
      this.router.navigate(['/']);
    });
  }
}
