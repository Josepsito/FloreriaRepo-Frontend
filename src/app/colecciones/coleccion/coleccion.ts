import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { ProductoService, Producto } from '../../service/producto';
import { CategoriaService, Categoria } from '../../service/categoria';

@Component({
  selector: 'app-coleccion',
  standalone: true,
  imports: [CommonModule, FormsModule, Header, Footer],
  templateUrl: './coleccion.html',
  styleUrls: ['./coleccion.css']
})
export class ColeccionComponent implements OnInit {
  nombreColeccion: string = '';
  descripcionCategoria: string = '';
  bannerURL: string = 'https://i.postimg.cc/j2BTQksj/banner-Flor-Rosa.png';
  productos: Producto[] = [];
  categorias: Categoria[] = [];
  productoSeleccionado: Producto | null = null;
  cantidadSeleccionada: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private categoriaService: CategoriaService
  ) {
    this.route.paramMap.subscribe(params => {
      this.nombreColeccion = params.get('nombre') || 'Colección';
      this.cargarCategorias();
      this.cargarProductos(this.nombreColeccion);
    });
  }

  ngOnInit(): void {}

  cargarCategorias() {
    this.categoriaService.obtenerCategorias().subscribe({
      next: (data: Categoria[]) => {
        this.categorias = data;
        this.setBanner(this.nombreColeccion);
      },
      error: (err: any) => console.error('Error cargando categorías', err)
    });
  }

  cargarProductos(coleccion: string) {
    this.productoService.obtenerProductosPorColeccion(coleccion).subscribe({
      next: (data: Producto[]) => {
        this.productos = data;
      },
      error: (err: any) => console.error('Error al cargar productos', err)
    });
  }

  setBanner(coleccion: string) {
    const categoria = this.categorias.find(
      c => c.nombre.toLowerCase() === coleccion.toLowerCase()
    );

    if (!categoria) {
      this.bannerURL = 'https://i.postimg.cc/j2BTQksj/banner-Flor-Rosa.png';
      this.nombreColeccion = coleccion;
      this.descripcionCategoria = 'Descripción no disponible';
      return;
    }

    this.bannerURL = categoria.imagenURL || 'https://i.postimg.cc/j2BTQksj/banner-Flor-Rosa.png';
    this.nombreColeccion = categoria.nombre;
    this.descripcionCategoria = categoria.descripcion;
  }


  abrirModal(producto: Producto) {
    this.productoSeleccionado = producto;
    this.cantidadSeleccionada = 1;
  }

  cerrarModal() {
    this.productoSeleccionado = null;
  }

  agregarCarrito(producto: Producto) {
    console.log('Agregar al carrito', producto, this.cantidadSeleccionada);
    // Aplicar lógica
  }
  abrirWhatsApp(producto: Producto, cantidad: number = 1) {
    const numero = "51962739321";

    const mensaje = `
    Hola, quisiera más información o comprar:
    *${producto.nombre}*
    Precio: S/ ${producto.precio}
    Cantidad: ${cantidad}
    ¿Está disponible?
      `.trim();

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");
  }


}
