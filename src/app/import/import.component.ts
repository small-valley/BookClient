import { Component } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpReqOptions } from "../models/http";
import { HttpService } from "../services/http.service";
import { IBookItem } from "../stores/book.store";

@Component({
  selector: "app-import",
  templateUrl: "./import.component.html",
  styleUrl: "./import.component.css",
})
export class ImportComponent {
  protected bookItemArray: IBookItem[] = [];

  protected qrResultString: string = "";

  constructor(private httpService: HttpService) {}

  protected postBooksDate(data: IBookItem[]): void {
    const reqHttpOptions: HttpReqOptions<IBookItem[]> = {
      url: environment.apiUrl + "/book",
      body: data,
    };
    this.httpService.post<number, IBookItem[]>(reqHttpOptions).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => console.log(error)
    );
  }

  protected onClickCsvDataPost($event: any) {
    const file = $event.target.files[0];
    this.fileToText(file)
      .then((text) => {
        console.log(text);
        this.parseCsv(text);
      })
      .catch((err) => console.log(err));
  }

  protected fileToText(file: any): Promise<string> {
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

  protected parseCsv(data: string): void {
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

  protected onCodeResult(resultString: string) {
    this.qrResultString = resultString;
  }
}
