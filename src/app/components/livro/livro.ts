import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { ModalLivro } from '../../views/modal-livro/modal-livro';
import { InterfaceLivro } from '../../models/interfaces';
import { AutoriaPipe } from '../../pipes/autoria-pipe';

@Component({
  selector: 'app-livro',
  templateUrl: './livro.html',
  styleUrls: ['./livro.css'],
  imports: [ModalLivro, CommonModule, AutoriaPipe],
})
export class Livro {
  @Input() livro: InterfaceLivro;
  modalAberto: boolean;

  onModalChange(evento: boolean) {
    this.modalAberto = evento;
  }
}
