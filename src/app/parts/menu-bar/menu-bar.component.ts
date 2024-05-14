import { Component } from "@angular/core";

@Component({
  selector: "app-menu-bar",
  templateUrl: "./menu-bar.component.html",
  styleUrls: ["./menu-bar.component.css"],
})
export class MenuBarComponent {
  constructor() {}

  protected menuItems = [
    { icon: "home", label: "Home", routerLink: "" },
    { icon: "personedit", label: "Author", routerLink: "author" },
    { icon: "uploadfile", label: "Import", routerLink: "import" },
    { icon: "tvsignin", label: "Login", routerLink: "auth" },
  ];
}
