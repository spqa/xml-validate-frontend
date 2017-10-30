import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {CodeFile} from "../../shared/models/code-file";
import {CodefileService} from "../codefile.service";

@Component({
  selector: 'app-code-file-index',
  templateUrl: './code-file-index.component.html',
  styleUrls: ['./code-file-index.component.scss']
})
export class CodeFileIndexComponent implements OnInit {

  codeFileStream: Observable<CodeFile[]>;
  editCodeFile: CodeFile;
  isError = false;
  errorMessage = '';

  constructor(private codeFileService: CodefileService) {
  }

  ngOnInit() {
    this.codeFileStream = this.codeFileService.getCodeFile();
  }

  showEditForm(file: CodeFile) {
    window.scrollTo(0, 0);
    this.editCodeFile = file;
  }

  handleChange() {
    this.codeFileService.updateCodeFile(this.editCodeFile).subscribe((result) => {
      console.log(result);
      if (result.error === false) {
        this.editCodeFile = null;
      } else {
        this.isError = true;
        this.errorMessage = result.message.name[0];
      }
    });
  }

}
