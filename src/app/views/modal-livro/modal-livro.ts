import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

const body = document.querySelector('body');

@Component({
  selector: 'app-modal-livro',
  templateUrl: './modal-livro.html',
  styleUrls: ['./modal-livro.css'],
  imports: [CommonModule],
})
export class ModalLivro {
  constructor() {}

  @Input() livro: Object;
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
    window.open('_blank');
  }
}
