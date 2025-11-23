import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductoService, Producto } from '../service/producto';
import { CategoriaService, Categoria } from '../service/categoria';
import { UsuarioService } from '../service/usuario';

@Component({
  selector: 'app-admin-agregar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-agregar.html',
  styleUrls: ['./admin-agregar.css']
})
export class AdminAgregar implements OnInit {
  categorias: Categoria[] = [];
  producto: Producto & { categoria?: Categoria } = {
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    coleccion: '',
    imagenURL: '',
    categoria: undefined
  };

  nuevaCategoria: { nombre: string; descripcion: string; imagenURL: string; imagenSecundariaURL: string } = {
    nombre: '',
    descripcion: '',
    imagenURL: '',
    imagenSecundariaURL: ''
  };

  defaultImg: string = 'https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.categoriaService.obtenerCategorias().subscribe({
      next: (cats: Categoria[]) => this.categorias = cats,
      error: (err: any) => console.error('Error cargando categorías:', err)
    });
  }

  agregarCategoria(): void {
    const { nombre, descripcion, imagenURL, imagenSecundariaURL } = this.nuevaCategoria;

    if (!nombre.trim() || !descripcion.trim() || !imagenURL.trim() || !imagenSecundariaURL.trim()) {
      Swal.fire({ icon: 'warning', title: 'Todos los campos son obligatorios', confirmButtonColor: '#16a34a' });
      return;
    }

    if (this.categorias.some(c => c.nombre.toLowerCase() === nombre.toLowerCase())) {
      Swal.fire({ icon: 'warning', title: 'La categoría ya existe', confirmButtonColor: '#16a34a' });
      return;
    }

    const nuevaCat: Categoria = { id: 0, nombre, descripcion, imagenURL, imagenSecundariaURL };

    this.categoriaService.crearCategoria(nuevaCat).subscribe({
      next: (res: Categoria) => {
        this.categorias.push(res);
        this.producto.categoria = res;
        this.nuevaCategoria = { nombre: '', descripcion: '', imagenURL: '', imagenSecundariaURL: '' };

        Swal.fire({
          icon: 'success',
          title: 'Categoría agregada',
          text: `La categoría "${res.nombre}" se guardó correctamente`,
          confirmButtonColor: '#16a34a'
        });
      },
      error: (err) => {
        console.error('Error guardando categoría:', err);
        Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo guardar la categoría', confirmButtonColor: '#16a34a' });
      }
    });
  }

  // Guardar producto
  onSubmit(): void {
    if (!this.producto.nombre || !this.producto.descripcion || !this.producto.precio ||
        !this.producto.stock || !this.producto.imagenURL || !this.producto.categoria) {
      Swal.fire({ icon: 'warning', title: 'Completa todos los campos y selecciona una categoría', confirmButtonColor: '#16a34a' });
      return;
    }

    const productoDTO = {
      nombre: this.producto.nombre,
      descripcion: this.producto.descripcion,
      precio: this.producto.precio,
      stock: this.producto.stock,
      imagenURL: this.producto.imagenURL,
      categoriaID: this.producto.categoria?.id
    };

    this.productoService.crearProducto(productoDTO).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Producto agregado con éxito',
          text: `${res.nombre} ha sido registrado`,
          confirmButtonColor: '#16a34a'
        });

        // Resetear producto
        this.producto = { nombre: '', descripcion: '', precio: 0, stock: 0, coleccion: '', imagenURL: '', categoria: undefined };
      },
      error: (err) => {
        console.error('Error al agregar producto:', err);
        Swal.fire({ icon: 'error', title: 'Error al agregar el producto', text: 'Intenta nuevamente más tarde', confirmButtonColor: '#16a34a' });
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
