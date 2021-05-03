import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookComponent } from './book/book.component';
import { AuthorComponent } from './author/author.component';
import { AngularComponent } from './angular/angular.component';

const routes: Routes = [
  { path: '', component: BookComponent },
  { path: 'author', component: AuthorComponent },
  { path: 'angular', component: AngularComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
