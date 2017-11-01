import {Component, OnInit} from '@angular/core';

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
      console.log(files[i].name);
    }
  }

}
