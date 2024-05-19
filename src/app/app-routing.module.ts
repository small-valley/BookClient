import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { AuthComponent } from "./auth/auth.component";
import { AuthorComponent } from "./author/author.component";
import { BookComponent } from "./book/book.component";
import { AuthGuard } from "./guards/auth.guard";
import { ImportComponent } from "./import/import.component";
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
    canActivate: [AuthGuard],
    children: [
      { path: "", component: BookComponent },
      { path: "author", component: AuthorComponent },
      { path: "import", component: ImportComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
