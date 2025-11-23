import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Header } from '../shared/header/header';
import { Footer } from '../shared/footer/footer';

interface Articulo {
  id: number;
  titulo: string;
  descripcionCorta: string;
  imagenUrl: string;
  contenidoCompleto: string;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule, Header, Footer],
  templateUrl: './blog.html',
  styleUrls: ['./blog.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Blog {
  // Array de Artículos
  articulos = signal<Articulo[]>([
    {
      id: 1,
      titulo: '¿Cómo cuidar mis flores en caja?',
      descripcionCorta: 'Descubre los mejores consejos para mantener tus flores en caja frescas y hermosas por más tiempo.',
      imagenUrl: 'https://la-botanika.com/cdn/shop/articles/portada_love_heart_copy.jpg?v=1622133868',
      contenidoCompleto: 'El secreto para que tus flores en caja duren más radica en la hidratación y el ambiente. Debes cambiar el agua de la espuma floral o de los recipientes internos a diario, asegurándote de que los tallos tengan un corte diagonal fresco. Mantenlas alejadas de corrientes de aire, luz solar directa y frutas (que emiten etileno y aceleran la maduración). Con estos cuidados, el arreglo floral se mantendrá vibrante por mucho más tiempo, luciendo tan hermoso como el día en que lo recibiste.'
    },
    {
      id: 2,
      titulo: '¿Cómo cuidar una orquídea Phalaenopsis durante la floración?',
      descripcionCorta: 'Aprende los cuidados esenciales para mantener tu orquídea Phalaenopsis floreciendo y saludable.',
      imagenUrl: 'https://la-botanika.com/cdn/shop/articles/PORTADA_-_ORQUIDEAS.jpg?v=1621807238',
      contenidoCompleto: 'Las orquídeas Phalaenopsis son elegantes y requieren cuidados específicos. Durante la floración, la clave es un riego moderado por inmersión (sumergir la maceta en agua por 15 minutos una vez a la semana). Asegúrate de que el agua drene completamente. Necesitan luz indirecta brillante; una ventana orientada al este es ideal. Evita las fluctuaciones bruscas de temperatura. Cuando terminen de florecer, no cortes la vara floral inmediatamente; espera a que se seque por completo para darle a la planta la oportunidad de reabsorber los nutrientes.'
    },
    {
      id: 3,
      titulo: '¿Cómo alargar el tiempo de vida de mis flores?',
      descripcionCorta: 'Sigue estos sencillos pasos para prolongar la vida de tus flores y mantenerlas vibrantes por más tiempo.',
      imagenUrl: 'https://la-botanika.com/cdn/shop/articles/La_Botanika_216.jpg?v=1621481486',
      contenidoCompleto: 'Para extender la vida de tus flores de tallo cortado, sigue estos pasos: 1. Retira las hojas que queden sumergidas en el agua. 2. Cambia el agua del florero diariamente y lávalo bien. 3. Haz un corte diagonal de $1$ cm al tallo cada dos días para mejorar la absorción de agua. 4. Añade alimento floral (o una mezcla casera de una cucharadita de azúcar y unas gotas de lejía) al agua. 5. Mantén el florero en un lugar fresco, lejos de fuentes de calor o aire acondicionado.'
    },
    {
      id: 4,
      titulo: 'Flores de temporada: cómo elegir las mejores',
      descripcionCorta: 'Conoce qué flores están en temporada y cómo seleccionarlas para que duren más.',
      imagenUrl: 'https://grupocoloniecm.com/wp-content/uploads/2024/12/flores-temporada-primavera.png',
      contenidoCompleto: 'Elegir flores de temporada no solo es más sostenible, sino que garantiza su frescura y duración. En primavera, busca peonías, tulipanes y lilas. En verano, girasoles, dalias y hortensias. En otoño, crisantemos y rosas con tonos cálidos. En invierno, amarilis y jacintos. Al comprarlas, busca tallos firmes, hojas verdes y pétalos sin manchas o bordes secos. Esto asegura que obtienes la mejor calidad para tu arreglo.'
    },
    {
      id: 5,
      titulo: 'Arreglos florales para eventos especiales',
      descripcionCorta: 'Ideas y consejos para decorar bodas, cumpleaños y aniversarios con flores.',
      imagenUrl: 'https://blog.wfuneralpeople.com/wp-content/uploads/2022/07/bouquet-ga68a3c0e8_1920.jpg',
      contenidoCompleto: 'Los arreglos florales transforman cualquier evento. Para bodas, las rosas y lirios blancos simbolizan la pureza. Para cumpleaños, elige colores vibrantes como gerberas o tulipanes. En aniversarios, un ramo de rosas rojas siempre es un clásico. Considera el estilo del evento: arreglos altos y estructurados para salones formales, y centros de mesa bajos y orgánicos para ambientes rústicos. Siempre coordina los colores de las flores con la paleta de decoración del evento.'
    },
    {
      id: 6,
      titulo: 'Beneficios de tener flores en casa',
      descripcionCorta: 'Descubre cómo las flores pueden mejorar el ánimo, la decoración y la salud en el hogar.',
      imagenUrl: 'https://elementojade.pe/wp-content/uploads/2022/03/4-beneficios-de-las-flores-frescas-01-1.jpg.webp',
      contenidoCompleto: 'Tener flores en casa va más allá de la decoración. Está demostrado que mejoran el estado de ánimo, reducen el estrés y promueven sentimientos de calma y felicidad. Sus colores y aromas tienen un impacto positivo en nuestra salud mental. Además, ayudan a purificar el aire y a crear un ambiente más acogedor y relajante en cualquier espacio. Coloca flores frescas en tu área de trabajo o sala de estar para notar la diferencia en tu bienestar diario.'
    }
  ]);

  // Variables de estado para el modal (Usando signals)
  articuloSeleccionado = signal<Articulo | null>(null);
  mostrarDetalle = signal(false);

  // Método para abrir el detalle y bloquear el scroll
  abrirDetalle(idArticulo: number): void {
    const articulo = this.articulos().find(a => a.id === idArticulo) || null;
    this.articuloSeleccionado.set(articulo);
    this.mostrarDetalle.set(true);
    document.body.style.overflow = 'hidden'; // Bloquear scroll del body
  }

  // Método para cerrar el detalle y restaurar el scroll
  cerrarDetalle(): void {
    this.mostrarDetalle.set(false);
    this.articuloSeleccionado.set(null);
    document.body.style.overflow = ''; // Restaurar scroll
  }

  // Computed signals para la navegación (Más limpio que getters)
  indexActual = computed<number>(() => {
    const articulo = this.articuloSeleccionado();
    if (!articulo) return -1;
    return this.articulos().findIndex(a => a.id === articulo.id);
  });

  puedeNavegarAnterior = computed<boolean>(() => this.indexActual() > 0);
  puedeNavegarSiguiente = computed<boolean>(() => this.indexActual() < this.articulos().length - 1);

  // Lógica de navegación
  navegar(direccion: 'siguiente' | 'anterior'): void {
    const articulosArray = this.articulos();
    let index = this.indexActual();

    if (index === -1) return; // No hay artículo seleccionado

    if (direccion === 'siguiente' && index < articulosArray.length - 1) {
      index++;
    } else if (direccion === 'anterior' && index > 0) {
      index--;
    } else {
      // Si quieres navegación cíclica:
      // if (direccion === 'siguiente') index = (index + 1) % articulosArray.length;
      // else index = (index - 1 + articulosArray.length) % articulosArray.length;
      return; // Detener la navegación si no es cíclica y llega a los límites
    }

    this.articuloSeleccionado.set(articulosArray[index]);
  }
}
