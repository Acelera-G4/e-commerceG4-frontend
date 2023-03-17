import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent {
  responsiveOptions;

  images = [
    { title: '', url: '../assets/frete.png' },
    { title: 'Cerveja gelada, para curtir com os amigos', url: '../assets/cerveja.png' },
    { title: 'Qualidade e preço garantidos', url: '../assets/champagne.png' },
    { title: 'Para amantes de bom paladar', url: '../assets/estante_bebidas.png' },
  ];

  constructor() {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
}
