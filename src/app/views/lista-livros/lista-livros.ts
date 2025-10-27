import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Livro } from '../../components/livro/livro';
import { InterfaceLivro } from '../../models/interfaces';
import { LivroService } from '../../service/livro-service';
import { GoogleBookVolume } from '../../models/interfaces';
import { InterfaceConvertidaParaLivro } from '../../models/converter-para-interface-livro';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.html',
  styleUrls: ['./lista-livros.css'],
  imports: [CommonModule, FormsModule, Livro],
})
export class ListaLivros implements OnDestroy {
  listaLivros: InterfaceConvertidaParaLivro[] = [];
  campoBusca: string = '';
  assinatura: Subscription;
  livro: InterfaceLivro;

  constructor(private livroService: LivroService) {}

  buscarLivros() {
    this.assinatura = this.livroService.search(this.campoBusca).subscribe({
      next: (resultadoDaAPI) => {
        console.log('Requisição ao servidor'),
          (this.listaLivros =
            this.converterResultadoParaInterfaceLivro(resultadoDaAPI));
      },
      error: (erro) => console.log(erro),
      // complete: () => console.log('Observable completo'),
    });
  }

  converterResultadoParaInterfaceLivro(
    googleBookVolumes: GoogleBookVolume[]
  ): InterfaceConvertidaParaLivro[] {
    return googleBookVolumes.map((volume) => {
      return new InterfaceConvertidaParaLivro(volume);
    });
  }

  ngOnDestroy() {
    this.assinatura.unsubscribe();
  }
}
