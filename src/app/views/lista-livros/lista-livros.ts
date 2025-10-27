import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Livro } from '../../components/livro/livro';
import { LivroService } from 'src/app/service/livro-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.html',
  styleUrls: ['./lista-livros.css'],
  imports: [Livro, CommonModule, FormsModule],
})
export class ListaLivros {
  listaLivros: any[] = [];
  campoBusca: string = '';

  constructor(private livroService: LivroService) {}

  buscarLivros() {
    this.livroService.search(this.campoBusca);
  }
}
