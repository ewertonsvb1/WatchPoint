import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OmdbService } from '../../services/omdb.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  titulo = '';
  resultados: any[] = [];
  anotacoes: { [id: string]: string } = {};
  votos: { [id: string]: number } = {};

  constructor(private omdb: OmdbService, private route: ActivatedRoute, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const tituloParam = this.route.snapshot.queryParamMap.get('titulo');
      const votosSalvos = localStorage.getItem('votos');
      this.votos = votosSalvos ? JSON.parse(votosSalvos) : {};

      if (tituloParam) {
        this.titulo = tituloParam;
        this.buscar();
      }

      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('anotacao-')) {
          const id = key.replace('anotacao-', '');
          this.anotacoes[id] = localStorage.getItem(key) || '';
        }
      });
    }
  }

  buscar() {
    this.omdb.buscarFilmes(this.titulo).subscribe((res) => {
      const listaResumida = res.Search || [];
      const requisicoes = listaResumida.map((filme: any) =>
        this.omdb.detalhesFilme(filme.imdbID)
      );
  
      Promise.all(requisicoes.map(req => req.toPromise())).then((detalhados) => {
        this.resultados = detalhados;
      });
    });
  }

  salvarAnotacao(id: string) {
    const anotacao = this.anotacoes[id] || '';
    localStorage.setItem(`anotacao-${id}`, anotacao);
  
    Swal.fire({
      icon: 'success',
      title: 'Anotação salva!',
      text: 'Sua anotação foi salva com sucesso 😊',
      timer: 2000,
      showConfirmButton: false
    });
  }

  toggleFavorito(filme: any) {
    if (this.omdb.ehFavorito(filme.imdbID)) {
      this.omdb.removerFavorito(filme.imdbID);
    } else {
      this.omdb.adicionarFavorito(filme);
    }
  }

  isFavorito(imdbID: string): boolean {
    return this.omdb.ehFavorito(imdbID);
  }

  votar(id: string, estrelas: number) {
    this.votos[id] = estrelas;
    localStorage.setItem('votos', JSON.stringify(this.votos));
    Swal.fire({
      icon: 'success',
      title: 'Obrigado pelo seu voto!',
      text: `Você avaliou com ${estrelas} estrela(s).`,
      timer: 1500,
      showConfirmButton: false
    });
  }
}
