import { CategoriasComponent } from './pages/categorias/categorias.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetalhesComponent } from './pages/detalhes/detalhes.component';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'detalhes/:id', component: DetalhesComponent },
    { path: 'favoritos', component: FavoritosComponent },
    { path: 'categorias', component: CategoriasComponent },
  ];