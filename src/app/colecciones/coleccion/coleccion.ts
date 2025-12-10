import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { ProductoService, Producto } from '../../service/producto';
import { CategoriaService, Categoria } from '../../service/categoria';
import { CarritoService } from '../../service/carrito-service';
import { UsuarioService } from '../../service/usuario';

@Component({
  selector: 'app-coleccion',
  standalone: true,
  imports: [CommonModule, FormsModule, Header, Footer],
  templateUrl: './coleccion.html',
  styleUrls: ['./coleccion.css']
})
export class ColeccionComponent implements OnInit {

  @ViewChild(Header) header!: Header;

  nombreColeccion = '';
  descripcionCategoria = '';
  bannerURL = 'https://i.postimg.cc/j2BTQksj/banner-Flor-Rosa.png';
  productos: Producto[] = [];
  categorias: Categoria[] = [];

  usuarioLogeado = false;
  productoSeleccionado: Producto | null = null;
  cantidadSeleccionada = 1;

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private carritoService: CarritoService,
    private usuarioService: UsuarioService
  ) {
    this.route.paramMap.subscribe(params => {
      this.nombreColeccion = params.get('nombre') || 'Colección';
      this.cargarCategorias();
      this.cargarProductos(this.nombreColeccion);
    });
  }

  ngOnInit() {
    this.usuarioLogeado = this.usuarioService.getUsuario() !== null;
  }

  // -----------------------------------
  // ABRIR LOGIN DESDE EL HEADER
  // -----------------------------------
  abrirLogin() {
    this.cerrarModal();           // 1) Cierra modal de producto
    this.header.abrirLogin();     // 2) Abre el modal de login/registro
  }

  // -----------------------------------
  // PRODUCTOS / CATEGORÍAS
  // -----------------------------------
  cargarCategorias() {
    this.categoriaService.obtenerCategorias().subscribe({
      next: (data: Categoria[]) => {
        this.categorias = data;
        this.setBanner(this.nombreColeccion);
      }
    });
  }

  cargarProductos(coleccion: string) {
    this.productoService.obtenerProductosPorColeccion(coleccion).subscribe({
      next: (data: Producto[]) => {
        this.productos = data;
      }
    });
  }

  setBanner(coleccion: string) {
    const categoria = this.categorias.find(
      c => c.nombre.toLowerCase() === coleccion.toLowerCase()
    );

    if (!categoria) {
      this.bannerURL = 'https://i.postimg.cc/j2BTQksj/banner-Flor-Rosa.png';
      this.descripcionCategoria = 'Descripción no disponible';
      return;
    }

    this.bannerURL = categoria.imagenURL;
    this.nombreColeccion = categoria.nombre;
    this.descripcionCategoria = categoria.descripcion;
  }

  // -----------------------------------
  // MODAL PRODUCTO
  // -----------------------------------
  abrirModal(producto: Producto) {
    this.productoSeleccionado = producto;
    this.cantidadSeleccionada = 1;
  }

  cerrarModal() {
    this.productoSeleccionado = null;
  }

  // -----------------------------------
  // AÑADIR AL CARRITO
  // -----------------------------------
  agregarAlCarrito() {
    if (!this.usuarioService.getUsuario()) {
      this.abrirLogin();  // ← aquí se cierra modal y abre login
      return;
    }

    if (!this.productoSeleccionado) return;

    this.carritoService.agregarProducto(
      this.productoSeleccionado,
      this.cantidadSeleccionada
    );

    this.cerrarModal();
  }

  agregarAlCarritoDesdeLista(producto: Producto) {
    if (!this.usuarioService.getUsuario()) {
      this.abrirLogin();
      return;
    }

    this.carritoService.agregarProducto(producto, 1);
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
