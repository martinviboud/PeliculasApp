import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CarteleraResponse, Movies } from '../interfaces/cartelera-response';
import { tap, map } from 'rxjs/operators';
import { MovieDetail } from '../interfaces/movie-detail';
import { CastDetail } from '../interfaces/Cast-detail';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  private UrlBase = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando = false;
  get params(){
    return{
      api_key : '320bb859a6983f5e5b2f8b6c89d9a089',
      language : 'es-ES',
      page: this.carteleraPage.toString()
    };
  }
  constructor(private http: HttpClient) { }
  getCartelera(): Observable<Movies[]>{
    if (this.cargando){
      return of([]);
    }
    this.cargando = true;
    return this.http.get<CarteleraResponse>(`${this.UrlBase}/movie/now_playing?`, {
      params: this.params
    }).pipe(
      map(resp => {
        return resp.results;
      }),
      tap( () => {
      this.carteleraPage += 1;
      this.cargando = false;
    }
    ));
  }
  resetCarteleraPage(){
    this.carteleraPage = 1;
  }
  buscarPeliculas(texto: string){
    const params = {...this.params, page: '1', query: texto};
    return this.http.get<CarteleraResponse>(`${this.UrlBase}/search/movie`, {
      params
    }).pipe(
      map( resp => resp.results)
    );
  }
  getPeliculaDetalle(id: string){
    return this.http.get<MovieDetail>(`${this.UrlBase}/movie/${id}`,{
      params: this.params
    });
  }
  getPeliculaCast(id: string){
    return this.http.get<CastDetail>(`${this.UrlBase}/movie/${id}/credits`, {
      params: this.params
    }).pipe(map(resp => {
     return resp.cast;
    }));
  }
}
