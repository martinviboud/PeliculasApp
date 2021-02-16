import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../servicios/peliculas.service';
import { MovieDetail } from '../../interfaces/movie-detail';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {
  miPelicula: MovieDetail;
  constructor(private activatedRoute: ActivatedRoute,
              private servicioPelicula: PeliculasService,
              private location: Location) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.servicioPelicula.getPeliculaDetalle(id).subscribe(pelicula => {
      this.miPelicula = pelicula;

    });
    this.servicioPelicula.getPeliculaCast(id).subscribe(cast => {
      console.log(cast)
    })
  }
  regresar(){
    this.location.back();
  }
}
