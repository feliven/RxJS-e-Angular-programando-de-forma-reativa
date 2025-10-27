import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  private readonly enderecoAPI: string =
    'https://www.googleapis.com/books/v1/volumes';

  // https://www.googleapis.com/books/v1/volumes?q=search+terms

  constructor(private http: HttpClient) {}

  search(searchTerm: string): Observable<unknown> {
    const params: HttpParams = new HttpParams().append('q', searchTerm);
    return this.http.get(this.enderecoAPI, { params });
  }
}
