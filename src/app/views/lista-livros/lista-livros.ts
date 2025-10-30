import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, filter, map, Subscription, switchMap, tap } from 'rxjs';

import { Livro } from '../../components/livro/livro';
import { InterfaceLivro } from '../../models/interfaces';
import { LivroService } from '../../service/livro-service';
import { GoogleBookVolume } from '../../models/interfaces';
import { InterfaceConvertidaParaLivro } from '../../models/converter-para-interface-livro';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.html',
  styleUrls: ['./lista-livros.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Livro],
})
export class ListaLivros {
  // listaLivros: InterfaceConvertidaParaLivro[] = [];
  @Input() campoBusca = new FormControl();
  assinatura: Subscription;
  // livro: InterfaceLivro;

  constructor(private livroService: LivroService) {}

  private readonly PAUSA = 500; // milissegundos

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(this.PAUSA),
    filter((valorDigitado) => valorDigitado.length >= 3),
    tap(() => console.log('Fluxo inicial')),
    switchMap((valorDigitado) => this.livroService.search(valorDigitado)),
    tap((retornoDaAPI) => console.log(retornoDaAPI)),
    map((resultadoDaAPI) =>
      this.converterResultadoParaInterfaceLivro(resultadoDaAPI)
    )
  );
  //

  // buscarLivros() {
  //   this.assinatura = this.livroService.search(this.campoBusca).subscribe({
  //     next: (resultadoDaAPI) => {
  //       console.log('Requisição ao servidor'),
  //         (this.listaLivros =
  //           this.converterResultadoParaInterfaceLivro(resultadoDaAPI));
  //     },
  //     error: (erro) => console.log(erro),
  //     // complete: () => console.log('Observable completo'),
  //   });
  // }

  converterResultadoParaInterfaceLivro(
    googleBookVolumes: GoogleBookVolume[]
  ): InterfaceConvertidaParaLivro[] {
    return googleBookVolumes.map((volume) => {
      return new InterfaceConvertidaParaLivro(volume);
    });
  }

  // ngOnDestroy() {
  //   this.assinatura.unsubscribe();
  // }
}
