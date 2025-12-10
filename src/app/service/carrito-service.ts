import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from './producto';

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private items: ItemCarrito[] = [];
  private carritoSubject = new BehaviorSubject<ItemCarrito[]>([]);
  carrito$ = this.carritoSubject.asObservable();

  constructor() {
    const guardado = localStorage.getItem('carrito');
    if (guardado) {
      this.items = JSON.parse(guardado);
      this.carritoSubject.next(this.items);
    }
  }

  private actualizarEstado() {
    this.carritoSubject.next(this.items);
    localStorage.setItem('carrito', JSON.stringify(this.items));
  }

  agregarProducto(producto: Producto, cantidad: number = 1) {
    const existente = this.items.find(i => i.producto.id === producto.id);

    if (existente) {
      existente.cantidad += cantidad;
    } else {
      this.items.push({ producto, cantidad });
    }

    this.actualizarEstado();
  }

  quitarProducto(id: number) {
    this.items = this.items.filter(i => i.producto.id !== id);
    this.actualizarEstado();
  }

  cambiarCantidad(id: number, cantidad: number) {
    const item = this.items.find(i => i.producto.id === id);
    if (item) {
      item.cantidad = cantidad;
      if (cantidad <= 0) {
        this.quitarProducto(id);
      } else {
        this.actualizarEstado();
      }
    }
  }

  limpiarCarrito() {
    this.items = [];
    this.actualizarEstado();
  }

  obtenerTotal(): number {
    return this.items.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);
  }
}
