import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  catchError,
  debounceTime,
  EMPTY,
  filter,
  map,
  of,
  Subscription,
  switchMap,
  tap,
  throwError,
} from 'rxjs';

import { Livro } from '../../components/livro/livro';
import { InterfaceLivro, ResultadoBusca } from '../../models/interfaces';
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
  listaLivros: InterfaceConvertidaParaLivro[] = [];
  @Input() campoBusca = new FormControl();
  assinatura: Subscription;
  // livro: InterfaceLivro;
  mensagemErro = '';

  constructor(private livroService: LivroService) {}

  private readonly PAUSA = 500; // milissegundos

  resultadoBusca: ResultadoBusca;

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(this.PAUSA),
    tap(() => console.log('Fluxo inicial')),
    filter((valorDigitado) => valorDigitado.length >= 3),
    switchMap((valorDigitado) => this.livroService.search(valorDigitado)),
    tap((retornoDaAPI) => console.log(retornoDaAPI)),
    map((resultado) => (this.resultadoBusca = resultado)),
    map((resultado) => resultado.items ?? []),
    map(
      (items) =>
        (this.listaLivros = this.converterResultadoParaInterfaceLivro(items))
    ),
    catchError((error) => {
      console.log(error);
      this.mensagemErro = 'Ocorreu um ERRO. Recarregue a PÁGINA';
      return EMPTY;
    })
  );

  converterResultadoParaInterfaceLivro(
    googleBookVolumes: GoogleBookVolume[]
  ): InterfaceConvertidaParaLivro[] {
    return googleBookVolumes.map((volume) => {
      return new InterfaceConvertidaParaLivro(volume);
    });
  }
}
