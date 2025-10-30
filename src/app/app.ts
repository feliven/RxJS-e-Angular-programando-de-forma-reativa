import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cabecalho } from './components/cabecalho/cabecalho';
import { Rodape } from './components/rodape/rodape';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [RouterOutlet, Cabecalho, Rodape],
})
export class App {
  title = 'buscante';
}
