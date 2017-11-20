import {Component, OnInit} from '@angular/core';
import {ResourceFileService} from "../resource-file.service";
import {Observable} from "rxjs/Observable";
import {ResourceFile} from "../../shared/models/resource-file";
import {MessageService} from "../../message/message.service";
import {DiffXmlService} from "../../diff-xml/diff-xml.service";
import * as _ from 'lodash';
import {Message} from "../../shared/models/message";
import 'rxjs/add/operator/combineLatest';

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
    this.isError = false;
    this.errorMessage = '';
    const fileArray = Array.from(fileList);
    if (fileArray.length === 2) {
      // test same resource file
      if (fileArray[0].name.split(/[._]/)[0] !== fileArray[1].name.split(/[._]/)[0]
        || fileArray[0].name.split(/[._]/)[0] !== resourceFile.name.split(".")[0]) {
        this.isError = true;
        this.errorMessage = "Wrong resource file name!";
        return;
      }
      let en$: Observable<Message[]>;
      let ja$: Observable<Message[]>;
      for (const file of fileArray) {
        if (file.name.split(/[._]/)[1] === "en") {
          en$ = this.diffService.readFileAsMessages(file, "en");
        }
        ja$ = this.diffService.readFileAsMessages(file, "ja");
      }

      en$.combineLatest(ja$, (en, ja) => ({en, ja})).subscribe(async (value) => {
        const en = value.en;
        const ja = value.ja;

        const diffMess = _.differenceBy(en, ja, 'message_key');
        if (diffMess.length > 0) {
          this.isError = true;
          this.errorMessage = "2 resource files do not have the same messages, please check again!";
        } else {
          const messages = en.reduce((currentMessages: Message[], message) => {
            message.en = message.final;
            message.final = undefined;
            message.ja = _.find(ja, {message_key: message.message_key}).ja;
            message.resource_file_id = resourceFile.id;
            currentMessages.push(message);
            return currentMessages;
          }, []);
          const result = await this.messageService.importMessages(messages).toPromise();
          this.errorMessage = result.message;
          // console.log()
        }
      });
    }

    this.isError = true;
    this.errorMessage = "Please select 2 files only!";
  }
}
