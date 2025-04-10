import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OmdbService } from '../../services/omdb.service';

@Component({
  selector: 'app-detalhes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.css'
})
export class DetalhesComponent implements OnInit {
  filme: any = null;
  filmesRelacionados: any[] = [];
  tituloAnterior: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private omdb: OmdbService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Observa mudanças nos parâmetros da rota
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.tituloAnterior = this.route.snapshot.queryParamMap.get('titulo');

      if (id) {
        this.carregarDetalhes(id);
      }
    });
  }

  carregarDetalhes(id: string) {
    this.omdb.detalhesFilme(id).subscribe((res) => {
      this.filme = res;
      this.buscarRelacionados();
      if (id) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  buscarRelacionados() {
    if (this.tituloAnterior) {
      this.omdb.buscarFilmes(this.tituloAnterior).subscribe((res) => {
        this.filmesRelacionados = (res.Search || [])
          .filter(f => f.imdbID !== this.filme.imdbID)
          .slice(0, 4);
      });
    }
  }
}
