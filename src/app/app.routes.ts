import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Catalogo } from './catalogo/catalogo';
import { Blog } from './blog/blog';
import { Novias } from './novias/novias';
import { Contacto } from './contacto/contacto';
import { Eventos } from './eventos/eventos';
import { AdminAgregar } from './admin-agregar/admin-agregar';
import { ColeccionComponent } from './colecciones/coleccion/coleccion';
import { AuthGuardGuard } from './service/auth-guard-guard';
import { AdminProductos } from './admin-productos/admin-productos';
import { Carrito } from './carrito/carrito';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'catalogo', component: Catalogo },
  { path: 'blog', component: Blog },
  { path: 'novias', component: Novias },
  { path: 'contacto', component: Contacto },
  { path: 'eventos', component: Eventos },
  { path: 'admin-agregar', component: AdminAgregar, canActivate: [AuthGuardGuard] },
  { path: 'admin-productos', component: AdminProductos, canActivate: [AuthGuardGuard] },
  { path: 'carrito', component: Carrito },
  { path: 'coleccion/:nombre', component: ColeccionComponent },
  { path: '**', redirectTo: '' }
];
