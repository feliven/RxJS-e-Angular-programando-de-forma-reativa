import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Livro } from 'src/app/componentes/livro/livro';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.html',
  styleUrls: ['./lista-livros.css'],
  imports: [Livro, CommonModule],
})
export class ListaLivros {
  listaLivros: [];

  constructor() {}
}
