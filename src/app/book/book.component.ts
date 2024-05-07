import { Component, OnInit, ViewChild } from "@angular/core";

import { MatTableDataSource } from "@angular/material/table";
import { environment } from "src/environments/environment";
import { HttpReqOptions } from "../models/http";
import { RightBarComponent } from "../parts/right-bar/right-bar.component";
import { HttpService } from "../services/http.service";
import { BookItemSearchKey, IBookItem } from "../stores/book.store";

@Component({
  selector: "app-book",
  templateUrl: "./book.component.html",
  styleUrls: ["./book.component.css"],
})
export class BookComponent implements OnInit {
  @ViewChild(RightBarComponent)
  protected dataSource = new MatTableDataSource<IBookItem>([]);

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

  protected messageInfo: any = {
    id: null,
    message: null,
  };

  protected messageInfoList: any = [this.messageInfo];

  protected qrResultString: string = "";

  protected editingRowIndex: number | null = null;

  protected isAddButtonDisabled = false;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.getBooksData();
  }

  getChildComponent(child: RightBarComponent): BookItemSearchKey {
    return child.bookItemSearchKey;
  }

  onClickGet($event: any): void {
    this.getBooksData();
  }

  onClickPost(row: any): void {
    this.postBooksDate([row]);
    this.initState();
    this.getBooksData();
  }

  onClickPut(row: any): void {
    const reqHttpOptions: HttpReqOptions = {
      url: environment.apiurl + "/book",
      body: [row],
    };
    this.httpService.put<number>(reqHttpOptions).subscribe(
      (response) => {
        this.messageInfoList = response.errMessages;
      },
      (error) => console.log(error)
    );
    //window.alert(this.messageInfoList);
    this.initState();
    this.getBooksData();
  }

  onClickDelete($event: any): void {
    const reqHttpOptions: HttpReqOptions = {
      url: environment.apiurl + "/book",
      httpOptions: {
        params: {
          id: $event.id,
        },
      },
    };
    this.httpService.delete<number>(reqHttpOptions).subscribe(
      (response) => {
        this.messageInfoList = response.errMessages;
      },
      (error) => console.log(error)
    );
    //window.alert(this.messageInfoList);
    this.initState();
    this.getBooksData();
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

  getBooksData(): void {
    const reqHttpOptions: HttpReqOptions = {
      url: environment.apiurl + "/book",
      httpOptions: {
        params: this.bookItemSearchKey,
      },
    };
    this.httpService.get<IBookItem[]>(reqHttpOptions).subscribe(
      (response) => {
        this.dataSource = new MatTableDataSource<IBookItem>(response ?? []);
        this.messageInfoList = response;
        console.log(response);
      },
      (error) => console.log(error)
    );
  }

  postBooksDate(data: any): void {
    const reqHttpOptions: HttpReqOptions = {
      url: environment.apiurl + "/book",
      body: data,
    };
    this.httpService.post<number>(reqHttpOptions).subscribe(
      (response) => {
        this.messageInfoList = response.errMessages;
      },
      (error) => console.log(error)
    );
    //window.alert(this.param.body);
  }

  onClickCsvDataPost($event: any) {
    const file = $event.target.files[0];
    this.fileToText(file)
      .then((text) => {
        console.log(text);
        this.parseCsv(text);
      })
      .catch((err) => console.log(err));
    //this.uploadListener(file);
  }

  fileToText(file: any): Promise<string> {
    const reader = new FileReader();
    reader.readAsText(file);
    return new Promise((resolve, reject) => {
      reader.onload = () => {
        resolve(reader.result?.toString()!);
      };
      reader.onerror = () => {
        reject(reader.error);
      };
    });
  }

  public bookItemArray: IBookItem[] = [];

  parseCsv(data: string): void {
    this.bookItemArray = [];
    let csvToRowArray = data.split("\n");
    for (let index = 1; index < csvToRowArray.length; index++) {
      let row = csvToRowArray[index].split(",");
      if (row[0] == "") continue;
      this.bookItemArray.push({
        id: "", //id
        date: row[0], //date
        title: row[1], //title
        authorId: "", //authorId
        author: row[2], //author
        publisherId: "", //publisherId
        publisher: row[3], //publisher
        classId: "", //classId
        class: row[6], //class
        publishYear: row[4], //publishYear
        pageCount: parseInt(row[5], 10), //pageCount
        isRecommend: row[7] === "0", //isRecommend
      });
    }
    console.log(this.bookItemArray);
    this.postBooksDate(this.bookItemArray);
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
  }
}
