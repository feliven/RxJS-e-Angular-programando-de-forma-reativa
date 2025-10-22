import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ModalLivro } from '../../views/modal-livro/modal-livro';

@Component({
  selector: 'app-livro',
  templateUrl: './livro.html',
  styleUrls: ['./livro.css'],
  imports: [ModalLivro, CommonModule],
})
export class Livro {
  @Input() livro: Object;
  modalAberto: boolean;

  onModalChange(evento: boolean) {
    this.modalAberto = evento;
  }
}
