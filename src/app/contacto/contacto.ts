import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Header } from '../shared/header/header';
import { Footer } from '../shared/footer/footer';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, RouterModule, Header, Footer],
  templateUrl: './contacto.html',
  styleUrls: ['./contacto.css']
})
export class Contacto {

  enviarWhatsApp(event: Event): void {
    event.preventDefault();

    const nombre = (document.getElementById('nombre') as HTMLInputElement)?.value;
    const email = (document.getElementById('email') as HTMLInputElement)?.value;
    const asunto = (document.getElementById('asunto') as HTMLInputElement)?.value;
    const mensaje = (document.getElementById('mensaje') as HTMLTextAreaElement)?.value;

    const telefonoDestino = "51962739321";

    const texto = `Hola, soy ${nombre}.
Correo: ${email}
Asunto: ${asunto}
Mensaje: ${mensaje}`;

    const url = `https://wa.me/${telefonoDestino}?text=${encodeURIComponent(texto)}`;

    window.open(url, '_blank');
  }

}
