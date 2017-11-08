import {Component, OnInit} from '@angular/core';
import {DiffXmlService} from "../diff-xml.service";

@Component({
  selector: 'app-diff-xml-index',
  templateUrl: './diff-xml-index.component.html',
  styleUrls: ['./diff-xml-index.component.scss']
})
export class DiffXmlIndexComponent implements OnInit {

  files: FileList;

  constructor(private diffService: DiffXmlService) {
  }

  ngOnInit() {
  }

  onUpload(files: FileList) {
    // for (let i = 0; i < files.length; i++) {
    //   this.diffService.readFile(files[0]).subscribe((result) => {
    //     let messages: Message[] = [];
    //     const domParser = new DOMParser();
    //     const xmlDOC = domParser.parseFromString(result, "text/xml");
    //     console.log(xmlDOC);
    //     const entries = xmlDOC.getElementsByTagName("entry");
    //     console.log(entries);
    //     for (let j = 0; j < entries.length; j++) {
    //       let message = new Message();
    //       message.message_key = entries.item(i).getAttribute("key");
    //       message.ja = entries[i].innerHTML;
    //       messages.push(message);
    //       console.log(message);
    //     }
    //     console.log(messages);
    //   });
    // }

    this.files = files;
  }

}
