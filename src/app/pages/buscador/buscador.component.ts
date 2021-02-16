import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../servicios/peliculas.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  peliculas = [];
  valorBuscado;
  constructor(private activatedRoute: ActivatedRoute,
              private servicio: PeliculasService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.valorBuscado = params.texto;
      this.servicio.buscarPeliculas(params.texto).subscribe(peliculas => {
        console.log(peliculas);
        this.peliculas = peliculas;

      });
    });
  }

}
