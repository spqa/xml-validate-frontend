import {Component, OnInit} from '@angular/core';
import {CodeFile} from "../../shared/models/code-file";
import {CodefileService} from "../codefile.service";

@Component({
  selector: 'app-code-file-add',
  templateUrl: './code-file-add.component.html',
  styleUrls: ['./code-file-add.component.scss']
})
export class CodeFileAddComponent implements OnInit {

  codeFile: CodeFile = new CodeFile();
  infoMessage = '';
  isError = false;

  constructor(private codeFileService: CodefileService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.isError = false;
    this.infoMessage = "";
    this.codeFileService.addCodeFile(this.codeFile).subscribe((result) => {
      if (result.error === true) {
        this.isError = true;
        if (typeof result.message === "string") {
          this.infoMessage = result.message;
        } else {
          for (const member in result.message) {
            console.log(member);
            this.infoMessage = result.message[member][0];
          }
        }
      } else {
        this.codeFileService.loadCodefiles();
        this.infoMessage = result.message;
      }
    });
  }

}
