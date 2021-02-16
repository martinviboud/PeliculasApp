import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'poster'
})
export class PosterPipe implements PipeTransform {

  transform(poster: string, tamaño: number): string {
    // https://image.tmdb.org/t/p/w300{{ pelicula.poster_path }}
    if (poster){
      return `https://image.tmdb.org/t/p/w${tamaño}${poster}`;
    }else{
      return './assets/no-image.jpg';
    }
  }

}
