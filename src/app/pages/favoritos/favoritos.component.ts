import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OmdbService } from '../../services/omdb.service';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css'
})
export class FavoritosComponent implements OnInit {
  favoritos: any[] = [];

  constructor(
    private omdb: OmdbService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.favoritos = this.omdb.getFavoritos(); // usa o método certo do service
  }

  remover(id: string) {
    this.omdb.removerFavorito(id);
    this.favoritos = this.omdb.getFavoritos();
    this.cdr.detectChanges();
  }
}
