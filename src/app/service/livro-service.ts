import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { ResultadoBusca, GoogleBookVolume } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  private readonly enderecoAPI: string =
    'https://www.googleapis.com/books/v1/volumes';

  // https://www.googleapis.com/books/v1/volumes?q=search+terms

  constructor(private http: HttpClient) {}

  search(searchTerm: string): Observable<ResultadoBusca> {
    const params: HttpParams = new HttpParams().append('q', searchTerm);
    return this.http.get<ResultadoBusca>(this.enderecoAPI, { params });
    //.pipe(
    // tap((retornoDaAPI) => console.log(retornoDaAPI)),
    // map((resultado) => resultado.items ?? [])
    // tap((resultado) => console.log(resultado)))
  }
}
