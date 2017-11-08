import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-diff-xml-file',
  templateUrl: './diff-xml-file.component.html',
  styleUrls: ['./diff-xml-file.component.scss']
})
export class DiffXmlFileComponent implements OnInit {

  progress = 0;
  @Input() file: File;
  constructor() {
  }

  ngOnInit() {
  }

}
