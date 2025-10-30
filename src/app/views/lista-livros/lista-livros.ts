import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  catchError,
  debounceTime,
  EMPTY,
  filter,
  map,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';

import { Livro } from '../../components/livro/livro';
import { ResultadoBusca } from '../../models/interfaces';
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
  mensagemErro = '';

  constructor(private livroService: LivroService) {}

  private readonly PAUSA = 500; // milissegundos

  resultadoBusca: ResultadoBusca;

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    // Waits after user stops typing before proceeding (prevents excessive API calls)
    debounceTime(this.PAUSA),

    // Logs "Fluxo inicial" to console for debugging purposes
    tap(() => console.log('Fluxo inicial')),

    // Only continues if the typed value has 3 or more characters
    filter((valorDigitado) => valorDigitado.length >= 3),

    // Cancels previous API call and makes new one with current search term
    switchMap((valorDigitado) => this.livroService.search(valorDigitado)),

    // Logs the API response to console for debugging
    tap((retornoDaAPI) => console.log(retornoDaAPI)),

    // Stores the API result in component property and passes it through the stream
    map((resultado) => (this.resultadoBusca = resultado)),

    // Extracts the 'items' array from result, or empty array if items is null/undefined
    map((resultado) => resultado.items ?? []),

    // Converts GoogleBookVolume array to InterfaceConvertidaParaLivro array and stores in component property
    map(
      (items) =>
        (this.listaLivros = this.converterResultadoParaInterfaceLivro(items))
    ),

    // Handles errors: logs error, sets error message, and returns empty observable to stop the stream
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
