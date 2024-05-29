import { Component, OnInit } from "@angular/core";

import { MatTableDataSource } from "@angular/material/table";
import { environment } from "src/environments/environment";
import { HttpReqOptions } from "../models/http";
import { HttpService } from "../services/http.service";
import {
  BookItemSearchKey,
  IBookItem,
  IBookItemPostModel,
  IBookItemSearchKey,
} from "../stores/book.store";

@Component({
  selector: "app-book",
  templateUrl: "./book.component.html",
  styleUrls: ["./book.component.css"],
})
export class BookComponent implements OnInit {
  protected books: IBookItem[] = [];
  protected dataSource = new MatTableDataSource<IBookItem>(this.books);

  protected bookItemSearchKey = new BookItemSearchKey();

  protected columns = [
    {
      columnDef: "date",
      header: "Date",
      cell: (element: IBookItem) => `${element.date}`,
    },
    {
      columnDef: "title",
      header: "Title",
      cell: (element: IBookItem) => `${element.title}`,
    },
    {
      columnDef: "author",
      header: "Author",
      cell: (element: IBookItem) => `${element.author}`,
    },
    {
      columnDef: "publisher",
      header: "Publisher",
      cell: (element: IBookItem) => `${element.publisher}`,
    },
    {
      columnDef: "class",
      header: "Class",
      cell: (element: IBookItem) => `${element.class}`,
    },
    {
      columnDef: "pageCount",
      header: "Page",
      cell: (element: IBookItem) => `${element.pageCount}`,
    },
    {
      columnDef: "isRecommend",
      header: "Recommend",
      cell: (element: IBookItem) => `${element.isRecommend}`,
    },
    {
      columnDef: "edit",
      header: "",
      cell: () => "",
    },
    {
      columnDef: "delete",
      header: "",
      cell: () => "",
    },
  ];

  protected displayedColumns = this.columns.map((c) => c.columnDef);

  protected editingRowIndex: number | null = null;

  protected isAddButtonDisabled = false;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.getBooksData();
  }

  onClickGet(): void {
    this.getBooksData();
  }

  onClickPost(row: any): void {
    const postData: IBookItemPostModel = {
      ...row,
      date: this.formatDate(row.date),
      isRecommend: row.isRecommend == "true" ? true : false,
    };
    this.postBooksData([postData]);
  }

  onClickPut(row: IBookItem): void {
    const reqHttpOptions: HttpReqOptions<IBookItem> = {
      url: environment.apiUrl + "/book",
      body: row,
    };
    this.httpService.put<number, IBookItem>(reqHttpOptions).subscribe(
      (response) => {
        this.initState();
        this.getBooksData();
      },
      (error) => console.log(error)
    );
  }

  onClickDelete($event: any): void {
    const reqHttpOptions: HttpReqOptions<undefined> = {
      url: environment.apiUrl + "/book",
      httpOptions: {
        params: {
          id: $event.id,
        },
      },
    };
    this.httpService.delete<number>(reqHttpOptions).subscribe(
      (response) => {
        this.initState();
        this.getBooksData();
      },
      (error) => console.log(error)
    );
  }

  /**
   * Toggle the editing state for a row
   * @param rowIndex The index of the row to edit
   */
  onClickEdit(rowIndex: number): void {
    if (this.dataSource.data[0].id === "") {
      // If the first row is in add mode, remove it
      this.dataSource.data.shift();
      this.dataSource.data = [...this.dataSource.data];
      rowIndex--;
    }
    this.editingRowIndex = rowIndex;
  }

  /**
   * Toggle the editing state for a row
   */
  onClickAbortEdit(): void {
    if (this.dataSource.data[0].id === "") {
      // If the first row is in add mode, remove it
      this.dataSource.data.shift();
      this.dataSource.data = [...this.dataSource.data];
    }
    this.initState();
  }

  addRow(): void {
    const newRow: IBookItem = {
      id: "",
      date: "",
      title: "",
      authorId: "",
      author: "",
      publisherId: "",
      publisher: "",
      classId: "",
      class: "",
      pageCount: 0,
      publishYear: "",
      isRecommend: false,
    };
    this.dataSource.data = [newRow, ...this.dataSource.data];
    this.editingRowIndex = 0;
    this.isAddButtonDisabled = true;
  }

  initState(): void {
    this.editingRowIndex = null;
    this.isAddButtonDisabled = false;
  }

  handleInputValues($event: IBookItemSearchKey): void {
    this.bookItemSearchKey = $event;
    this.getBooksData();
  }

  getBooksData(): void {
    const reqHttpOptions: HttpReqOptions<undefined> = {
      url: environment.apiUrl + "/book",
      httpOptions: {
        params: this.bookItemSearchKey,
      },
    };
    this.httpService.get<IBookItem[]>(reqHttpOptions).subscribe(
      (response) => {
        this.dataSource = new MatTableDataSource<IBookItem>(response ?? []);
      },
      (error) => console.log(error)
    );
  }

  postBooksData(data: IBookItemPostModel[]): void {
    const reqHttpOptions: HttpReqOptions<IBookItemPostModel[]> = {
      url: environment.apiUrl + "/book",
      body: data,
    };
    this.httpService
      .post<number, IBookItemPostModel[]>(reqHttpOptions)
      .subscribe({
        next: (response) => {
          this.initState();
          this.getBooksData();
        },
        error: (error) => console.log(error),
      });
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
