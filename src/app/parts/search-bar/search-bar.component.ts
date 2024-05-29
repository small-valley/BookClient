import { Component, EventEmitter, Output } from "@angular/core";
import { IBookItemSearchKey } from "src/app/stores/book.store";

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrl: "./search-bar.component.css",
})
export class SearchBarComponent {
  protected panelOpenState = false;
  protected searchKey: IBookItemSearchKey = {
    from: "",
    to: "",
    title: "",
    author: "",
    publisher: "",
    class: "",
    publishYear: "",
    isRecommend: undefined,
  };
  protected searchKeys = Object.keys(this.searchKey);
  protected panelDescription = "";

  @Output() inputValues: EventEmitter<IBookItemSearchKey> =
    new EventEmitter<IBookItemSearchKey>();

  protected onSearchClick(): void {
    const values: IBookItemSearchKey = {
      from: this.formatDate(this.searchKey.from),
      to: this.formatDate(this.searchKey.to),
      title: this.searchKey.title,
      author: this.searchKey.author,
      publisher: this.searchKey.publisher,
      class: this.searchKey.class,
      publishYear: this.searchKey.publishYear,
      isRecommend: this.searchKey.isRecommend,
    };
    this.updatePanelDescription();
    this.inputValues.emit(values);
  }

  protected updatePanelDescription(): void {
    let description = "";

    Object.entries(this.searchKey).forEach(([key, value]) => {
      if (value) {
        if (key === "from" || key === "to") {
          value = this.formatDate(value as string);
        }
        description += `${key}: ${value} `;
      }
    });

    this.panelDescription = description.trim();
  }

  private formatDate(date?: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    if (!date) {
      return "";
    }
    return new Date(date).toLocaleDateString("en-CA", options);
  }
}
