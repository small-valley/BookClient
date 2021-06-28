import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { ZXingScannerModule } from "@zxing/ngx-scanner";
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { AngularComponent } from './angular/angular.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { AuthorComponent } from './author/author.component';
import { RightBarComponent } from './right-bar/right-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    AngularComponent,
    MenuBarComponent,
    AuthorComponent,
    RightBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    ZXingScannerModule,
    MatAutocompleteModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
