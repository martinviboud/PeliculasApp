import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PeliculaComponent } from './pages/pelicula/pelicula.component';
import { BuscadorComponent } from './pages/buscador/buscador.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'pelicula/:id', component: PeliculaComponent },
  { path: 'buscador/:texto', component: BuscadorComponent },
  { path: '**', pathMatch:'full', redirectTo: 'home' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutesModule { }
// import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [
//   { path: 'routePath', component: Component },
//   { path: '**', pathMatch:'full', redirectTo: 'routePath' }
// ];

// export const appRouting = RouterModule.forRoot(routes);