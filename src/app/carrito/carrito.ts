import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService, ItemCarrito } from '../service/carrito-service';
import { RouterModule } from '@angular/router';
import { Header } from '../shared/header/header';
import { Footer } from '../shared/footer/footer';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterModule, Header, Footer],
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css'],
})
export class Carrito {

  items: ItemCarrito[] = [];
  total: number = 0;

  constructor(private carritoService: CarritoService) {}

  ngOnInit() {
    this.carritoService.carrito$.subscribe(data => {
      this.items = data;
      this.total = this.carritoService.obtenerTotal();
    });
  }

  aumentar(item: ItemCarrito) {
    this.carritoService.cambiarCantidad(
      item.producto.id!,
      item.cantidad + 1
    );
  }

  disminuir(item: ItemCarrito) {
    if (item.cantidad > 1) {
      this.carritoService.cambiarCantidad(
        item.producto.id!,
        item.cantidad - 1
      );
    }
  }

  eliminar(item: ItemCarrito) {
    this.carritoService.quitarProducto(item.producto.id!);
  }

  vaciar() {
    this.carritoService.limpiarCarrito();
  }

  comprarTodo() {
    if (this.items.length === 0) return;

    const numero = "51962739321";

    let mensaje = "Hola, quiero comprar estos productos:%0A%0A";

    this.items.forEach(item => {
      mensaje += `• ${item.producto.nombre} x${item.cantidad} - S/ ${item.producto.precio * item.cantidad}%0A`;
    });

    mensaje += `%0ATotal: S/ ${this.total}`;

    const url = `https://wa.me/${numero}?text=${mensaje}`;

    window.open(url, "_blank");
  }
}
