import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";

@Component({
  selector: 'app-diff-xml-index',
  templateUrl: './diff-xml-index.component.html',
  styleUrls: ['./diff-xml-index.component.scss']
})
export class DiffXmlIndexComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  onUpload(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.readFile(files[0]).subscribe((result) => {
        console.log(result);
      });
    }
  }

  readFile(file: File): Observable<any> {
    const reader = new FileReader();
    const fileStream = Observable.create((observer: Observer<any>) => {
      reader.onload = () => {
        observer.next(reader.result);
        observer.complete();
      };
    });
    reader.readAsText(file, "utf-8");
    return fileStream;
  }

}
