import { ListaLivros } from './views/lista-livros/lista-livros';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'lista-livros',
    pathMatch: 'full',
  },
  {
    path: 'lista-livros',
    component: ListaLivros,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
