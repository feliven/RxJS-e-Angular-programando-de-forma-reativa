import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaLivros } from './lista-livros';

describe('ListaLivros', () => {
  let component: ListaLivros;
  let fixture: ComponentFixture<ListaLivros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaLivros],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaLivros);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
