import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Livro } from '../../components/livro/livro';
import { LivroService } from '../../service/livro-service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.html',
  styleUrls: ['./lista-livros.css'],
  imports: [Livro, CommonModule, FormsModule],
})
export class ListaLivros implements OnDestroy {
  listaLivros: any[] = [];
  campoBusca: string = '';
  assinatura: Subscription;

  constructor(private livroService: LivroService) {}

  buscarLivros() {
    this.assinatura = this.livroService.search(this.campoBusca).subscribe({
      next: (retornoDaAPI) => console.log(retornoDaAPI),
      error: (erro) => console.log(erro),
      complete: () => console.log('Observable completo'),
    });
  }

  ngOnDestroy() {
    this.assinatura.unsubscribe();
  }
}
