import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductoService, Producto } from '../service/producto';
import { UsuarioService } from '../service/usuario';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-productos',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-productos.html',
  styleUrls: ['./admin-productos.css']
})
export class AdminProductos implements OnInit {

  productos: Producto[] = [];
  loading: boolean = true;
  defaultImg: string = 'https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';

  editandoId: number | null = null;
  productoEditado: Partial<Producto> = {};

  constructor(
    private productoService: ProductoService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.loading = true;
    this.productoService.obtenerProductos().subscribe({
      next: (res: Producto[]) => {
        this.productos = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los productos.',
          confirmButtonColor: '#16a34a'
        });
      }
    });
  }

  eliminarProducto(id: number, nombre: string): void {
    Swal.fire({
      title: `¿Eliminar "${nombre}"?`,
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#16a34a',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.eliminarProducto(id).subscribe({
          next: () => {
            this.productos = this.productos.filter(p => p.id !== id);
            Swal.fire({
              icon: 'success',
              title: 'Producto eliminado',
              text: `"${nombre}" fue eliminado correctamente.`,
              confirmButtonColor: '#16a34a'
            });
          },
          error: (err) => {
            console.error('Error al eliminar producto:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el producto.',
              confirmButtonColor: '#16a34a'
            });
          }
        });
      }
    });
  }

  editarProductoEnLinea(id: number): void {
    this.editandoId = id;
    const producto = this.productos.find(p => p.id === id);
    if (producto) {
      this.productoEditado = { ...producto };
    }
  }

  cancelarEdicion(): void {
    this.editandoId = null;
    this.productoEditado = {};
  }

  guardarEdicion(id: number): void {
    if (!this.productoEditado) return;

    const dto = {
      nombre: this.productoEditado.nombre!,
      descripcion: this.productoEditado.descripcion!,
      precio: this.productoEditado.precio!,
      stock: this.productoEditado.stock!,
      imagenURL: this.productoEditado.imagenURL!,
      categoriaID: this.productoEditado.categoria?.id || 1
    };

    this.productoService.actualizarProducto(id, dto).subscribe({
      next: (res) => {
        const index = this.productos.findIndex(p => p.id === id);
        if (index !== -1) this.productos[index] = { ...res };
        this.editandoId = null;
        this.productoEditado = {};
        Swal.fire({
          icon: 'success',
          title: 'Producto actualizado',
          confirmButtonColor: '#16a34a'
        });
      },
      error: (err) => {
        console.error('Error al actualizar:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar el producto',
          confirmButtonColor: '#16a34a'
        });
      }
    });
  }

  cerrarSesion(): void {
    this.usuarioService.logout().subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error al cerrar sesión:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cerrar sesión',
          confirmButtonColor: '#16a34a'
        });
      }
    });
  }

}
