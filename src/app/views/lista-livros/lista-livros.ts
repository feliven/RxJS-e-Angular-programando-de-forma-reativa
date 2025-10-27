import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Livro } from '../../components/livro/livro';
import { InterfaceLivro } from '../../models/interfaces';
import { LivroService } from '../../service/livro-service';
import { GoogleBookVolume } from '../../models/interfaces';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.html',
  styleUrls: ['./lista-livros.css'],
  imports: [CommonModule, FormsModule, Livro],
})
export class ListaLivros implements OnDestroy {
  listaLivros: InterfaceLivro[] = [];
  campoBusca: string = '';
  assinatura: Subscription;
  livro: InterfaceLivro;

  constructor(private livroService: LivroService) {}

  buscarLivros() {
    this.assinatura = this.livroService.search(this.campoBusca).subscribe({
      next: (resultadoDaAPI) =>
        this.converterResultadoParaInterfaceLivro(resultadoDaAPI),
      error: (erro) => console.log(erro),
      complete: () => console.log('Observable completo'),
    });
  }

  converterResultadoParaInterfaceLivro(
    googleBookVolumes: GoogleBookVolume[]
  ): InterfaceLivro[] {
    googleBookVolumes.forEach((volume) => {
      this.listaLivros.push(
        (this.livro = {
          title: volume.volumeInfo?.title,
          authors: volume.volumeInfo?.authors,
          publisher: volume.volumeInfo?.publisher,
          publishedDate: new Date(volume.volumeInfo?.publishedDate),
          description: volume.volumeInfo?.description,
          previewLink: volume.volumeInfo?.previewLink,
          thumbnail: volume.volumeInfo?.imageLinks.thumbnail,
        })
      );
    });

    return this.listaLivros;
  }

  ngOnDestroy() {
    this.assinatura.unsubscribe();
  }
}
