import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FilmeBusca, FilmeDetalhado } from '../pages/model/filme.model';

@Injectable({
  providedIn: 'root'
})
export class OmdbService {
  private apiKey = environment.omdbApiKey;
  private baseUrl = 'https://www.omdbapi.com/';
  private chaveStorage = 'filmesFavoritos';

  constructor(private http: HttpClient) {}

  buscarFilmes(titulo: string): Observable<{ Search: FilmeBusca[] }> {
    const url = `${this.baseUrl}?apikey=${this.apiKey}&s=${encodeURIComponent(titulo)}`;
    return this.http.get<{ Search: FilmeBusca[] }>(url);
  }

  detalhesFilme(id: string): Observable<FilmeDetalhado> {
    const url = `${this.baseUrl}?apikey=${this.apiKey}&i=${id}`;
    return this.http.get<FilmeDetalhado>(url);
  }

  getFavoritos(): any[] {
    const favoritos = localStorage.getItem(this.chaveStorage);
    return favoritos ? JSON.parse(favoritos) : [];
  }

  adicionarFavorito(filme: any): void {
    const favoritos = this.getFavoritos();
    const existe = favoritos.some((f: any) => f.imdbID === filme.imdbID);
    if (!existe) {
      favoritos.push(filme);
      localStorage.setItem(this.chaveStorage, JSON.stringify(favoritos));
    }
  }

  removerFavorito(id: string): void {
    const favoritos = this.getFavoritos().filter(f => f.imdbID !== id);
    localStorage.setItem(this.chaveStorage, JSON.stringify(favoritos));
  }

  ehFavorito(id: string): boolean {
    return this.getFavoritos().some(f => f.imdbID === id);
  }
}
