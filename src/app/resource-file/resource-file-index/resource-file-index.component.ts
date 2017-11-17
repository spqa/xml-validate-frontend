import {Component, OnInit} from '@angular/core';
import {ResourceFileService} from "../resource-file.service";
import {Observable} from "rxjs/Observable";
import {ResourceFile} from "../../shared/models/resource-file";
import {MessageService} from "../../message/message.service";
import {DiffXmlService} from "../../diff-xml/diff-xml.service";
import * as _ from 'lodash';

@Component({
  selector: 'app-resource-file-index',
  templateUrl: './resource-file-index.component.html',
  styleUrls: ['./resource-file-index.component.scss']
})
export class ResourceFileIndexComponent implements OnInit {

  resourceFileStream: Observable<ResourceFile[]>;
  editResourceFile: ResourceFile;
  isError = false;
  errorMessage = '';

  constructor(private resourceFileService: ResourceFileService,
              private messageService: MessageService,
              private diffService: DiffXmlService) {
  }

  ngOnInit() {
    this.resourceFileStream = this.resourceFileService.getResourceFile();
  }

  showEditForm(resourceFile: ResourceFile) {
    window.scrollTo(0, 0);
    this.editResourceFile = resourceFile;
  }

  handleChange() {
    this.resourceFileService.updateResourceFile(this.editResourceFile).subscribe((result) => {
      console.log(result);
      if (result.error === false) {
        this.editResourceFile = null;
      } else {
        this.isError = true;
        this.errorMessage = result.message.name[0];
      }
    });
  }

  importMessage(resourceFile: ResourceFile, fileList: FileList) {
    const fileArray = Array.from(fileList);
    if (fileArray.length > 1) {
      const en$ = this.diffService.readFileAsMessages(_.find(fileArray, {}))
    }
  }
}
