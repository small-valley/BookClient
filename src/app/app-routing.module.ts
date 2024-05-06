import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { AuthComponent } from "./auth/auth.component";
import { AuthorComponent } from "./author/author.component";
import { BookComponent } from "./book/book.component";
import { MainComponent } from "./layouts/main/main.component";

const routes: Routes = [
  {
    path: "auth",
    component: AppComponent,
    children: [{ path: "", component: AuthComponent }],
  },
  {
    path: "",
    component: MainComponent,
    children: [
      { path: "", component: BookComponent },
      { path: "author", component: AuthorComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
