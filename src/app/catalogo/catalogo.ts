import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Header } from '../shared/header/header';
import { Footer } from '../shared/footer/footer';
import { CategoriaService, Categoria } from '../service/categoria';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, Header, Footer, RouterModule],
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.css']
})
export class Catalogo implements OnInit {
  categorias: Categoria[] = [];
  defaultImg: string = 'https://i.postimg.cc/nc8Sttwp/florcate2.png';
  nombreColeccion: string = '';
  descripcionCategoria: string = '';
  bannerURL: string = '';

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.categoriaService.obtenerCategorias().subscribe({
      next: (cats: Categoria[]) => {
        console.log('Categorías recibidas del backend:', cats);
        this.categorias = cats;

        if (cats.length > 0) {
          const primera = cats[0];

          this.nombreColeccion = primera.nombre;
          this.descripcionCategoria = primera.descripcion;
          this.bannerURL = primera.imagenURL || this.defaultImg;
        }
      },
      error: (err) => console.error('Error cargando categorías:', err)
    });
  }
}
