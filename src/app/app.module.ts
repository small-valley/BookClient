import { NgModule } from "@angular/core";

import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ZXingScannerModule } from "@zxing/ngx-scanner";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthComponent } from "./auth/auth.component";

import { AuthorComponent } from "./author/author.component";
import { BookComponent } from "./book/book.component";
import { ImportComponent } from "./import/import.component";
import { MainComponent } from "./layouts/main/main.component";
import { MenuBarComponent } from "./parts/menu-bar/menu-bar.component";
import { SearchBarComponent } from "./parts/search-bar/search-bar.component";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AuthComponent,
    AuthorComponent,
    MenuBarComponent,
    SearchBarComponent,
    BookComponent,
    ImportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ZXingScannerModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatToolbarModule,
    MatMenuModule,
    MatExpansionModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
  ],
  providers: [provideNativeDateAdapter()],
  bootstrap: [AppComponent],
})
export class AppModule {}
