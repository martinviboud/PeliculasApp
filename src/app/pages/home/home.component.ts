import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PeliculasService } from '../../servicios/peliculas.service';
import { Movies } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  peliculas: Movies[] = [];
  peliculasSlider: Movies[] = [];
  @HostListener('window:scroll', ['$event'])
  onScroll(){
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1200;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);
    if (pos > max){
      if (this.servicioPeliculas.cargando){return;}
      this.servicioPeliculas.getCartelera().subscribe(resp => {
        this.peliculas.push(...resp);
        console.log(resp);
      });
    }
  }
  constructor(private servicioPeliculas: PeliculasService) { }
  
  ngOnInit(): void {
    this.servicioPeliculas.getCartelera().subscribe(resp => {
      // console.log(resp);
      this.peliculas = resp;
      this.peliculasSlider = resp;
    });
  }
  
  ngOnDestroy(): void {
    this.servicioPeliculas.resetCarteleraPage();
  }
}
