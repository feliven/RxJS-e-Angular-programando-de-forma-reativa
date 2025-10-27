import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { InterfaceConvertidaParaLivro } from '../../models/converter-para-interface-livro';
import { AutoriaPipe } from '../../pipes/autoria-pipe';

const body = document.querySelector('body');

@Component({
  selector: 'app-modal-livro',
  templateUrl: './modal-livro.html',
  styleUrls: ['./modal-livro.css'],
  imports: [CommonModule, NgIf, AutoriaPipe],
})
export class ModalLivro {
  constructor() {}

  @Input() livro: InterfaceConvertidaParaLivro;
  statusModal: boolean = true;
  @Output() mudouModal = new EventEmitter();

  fecharModal() {
    this.statusModal = false;
    this.mudouModal.emit(this.statusModal);
    body.style.overflow = 'scroll';
  }

  esconderScroll() {
    if (this.statusModal == true) {
      body.style.overflow = 'hidden';
    }
  }

  lerPrevia() {
    window.open(this.livro.previewLink, '_blank');
  }
}
