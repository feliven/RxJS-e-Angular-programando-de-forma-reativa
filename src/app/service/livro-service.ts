import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError, timeout } from 'rxjs';

import { ResultadoBusca } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  // https://www.googleapis.com/books/v1/volumes?q=search+terms
  private readonly enderecoAPI: string =
    'https://www.googleapis.com/books/v1/volumes';
  private readonly timeout: number = 10000; // milissegundos
  private readonly maximoDeTentativas: number = 3;

  constructor(private readonly http: HttpClient) {}

  search(searchTerm: string): Observable<ResultadoBusca> {
    if (!searchTerm?.trim()) {
      return throwError(
        () => new Error('Search term is required and cannot be empty')
      );
    }
    const params: HttpParams = new HttpParams().append('q', searchTerm);
    return this.http
      .get<ResultadoBusca>(this.enderecoAPI, { params })
      .pipe(
        timeout(this.timeout),
        retry(this.maximoDeTentativas),
        catchError(this.handleError)
      );
  }

  private handleError = (
    respostaErro: HttpErrorResponse
  ): Observable<never> => {
    let mensagemErro = 'An unknown error occurred';

    if (respostaErro.error instanceof ErrorEvent) {
      // Client-side error
      mensagemErro = `Client Error: ${respostaErro.error.message}`;
    } else {
      // Server-side error
      switch (respostaErro.status) {
        case 400:
          mensagemErro = 'Bad request - please check your search parameters';
          break;
        case 403:
          mensagemErro = 'API quota exceeded or access forbidden';
          break;
        case 404:
          mensagemErro = 'Books API not found';
          break;
        case 500:
          mensagemErro = 'Internal server error - please try again later';
          break;
        default:
          mensagemErro = `Server Error: ${respostaErro.status} - ${respostaErro.message}`;
      }
    }

    console.error('LivroService Error:', mensagemErro, respostaErro);
    return throwError(() => new Error(mensagemErro));
  };
}
