import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OmdbService } from '../../services/omdb.service';
import { forkJoin } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent {
  generos: string[] = [];
  generoSelecionado: string = '';
  filmes: any[] = [];

  constructor(private omdb: OmdbService) {
    this.carregarFilmesComGeneros();
  }

  carregarFilmesComGeneros(): void {
    const titulosExemplo = ['Batman', 'Matrix', 'Titanic', 'Avengers', 'Inception'];

    forkJoin(
      titulosExemplo.map(titulo =>
        this.omdb.buscarFilmes(titulo)
      )
    ).subscribe((respostas: any[]) => {
      const filmesUnificados = respostas.flatMap(r => r.Search || []);
      const detalhes$ = filmesUnificados.map(f => this.omdb.detalhesFilme(f.imdbID));

      forkJoin(detalhes$).subscribe((filmesDetalhados: any[]) => {
        this.filmes = filmesDetalhados;

        // Extrair e unificar os gêneros
        const generosSet = new Set<string>();
        this.filmes.forEach(filme => {
          const generos = filme.Genre?.split(',') || [];
          generos.forEach((g: string) => generosSet.add(g.trim()));
        });

        this.generos = Array.from(generosSet).sort();
      });
    });
  }

  filtrarPorGenero(): any[] {
    if (!this.generoSelecionado) return [];
    return this.filmes.filter(filme =>
      filme.Genre?.toLowerCase().includes(this.generoSelecionado.toLowerCase())
    );
  }
  
}
