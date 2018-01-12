import {Component, OnInit} from '@angular/core';
import {ResourceFileService} from "../resource-file.service";
import {Observable} from "rxjs/Observable";
import {ResourceFile} from "../../shared/models/resource-file";
import {MessageService} from "../../message/message.service";
import {DiffXmlService} from "../../diff-xml/diff-xml.service";
import * as _ from 'lodash';
import {Message} from "../../shared/models/message";
import 'rxjs/add/operator/combineLatest';
import {DomSanitizer} from "@angular/platform-browser";
import {saveAs} from "file-saver";

@Component({
  selector: 'app-resource-file-index',
  templateUrl: './resource-file-index.component.html',
  styleUrls: ['./resource-file-index.component.scss']
})
export class ResourceFileIndexComponent implements OnInit {

  resourceFileStream: Observable<ResourceFile[]>;
  editResourceFile: ResourceFile;
  isError = false;
  errorMessage: any;
  exportResult = '';

  constructor(private resourceFileService: ResourceFileService,
              private messageService: MessageService,
              private diffService: DiffXmlService,
              private sanitizer: DomSanitizer) {
  }

  static isSameResourceFileName(files: File[], resourceFile: ResourceFile): boolean {
    return files[0].name.split(/[._]/)[0] !== files[1].name.split(/[._]/)[0]
      || files[0].name.split(/[._]/)[0] !== resourceFile.name.split(".")[0];
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
    this.errorMessage = 'Processing...';
    const fileArray = Array.from(fileList);
    // check array length
    if (fileArray.length !== 2) {
      this.isError = true;
      this.errorMessage = "Please select 2 files only!";
      return;
    }
    // test same resource file
    if (ResourceFileIndexComponent.isSameResourceFileName(fileArray, resourceFile)) {
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

      // get Duplicate
      const duplicateEn = this.getDuplicate(en);
      const duplicateJa = this.getDuplicate(ja);

      if (duplicateEn.length > 0 || duplicateJa.length > 0) {
        this.isError = true;
        this.errorMessage = "Duplicate messageKey detected";
        this.errorMessage += "<br>" + "English file:";
        for (const message of duplicateEn) {
          this.errorMessage += "<br>" + message.message_key;
        }
        this.errorMessage += "<br>" + "=========================";
        this.errorMessage += "<br>" + "Japanese file:";
        for (const message of duplicateJa) {
          this.errorMessage += "<br>" + message.message_key;
        }
        return;
      }

      // Test same messageKey
      const diffMess = _.differenceBy(en, ja, 'message_key');
      if (diffMess.length > 0) {
        this.isError = true;
        this.errorMessage = "2 resource files do not have the same messages, please check again!";
        for (const message of diffMess) {
          this.errorMessage += "<br>" + message.message_key;
        }
        this.errorMessage = this.sanitizer.bypassSecurityTrustHtml(this.errorMessage);

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
        this.isError = false;
        this.errorMessage = result.message;
        // console.log()
      }
    });
  }

  getDuplicate(messages: Message[]) {
    const currentArray = [];
    return messages.reduce((duplicate: Message[], message: Message) => {
      if (_.find(currentArray, {message_key: message.message_key})) {
        duplicate.push(message);
      } else {
        currentArray.push(message);
      }

      return duplicate;
    }, []);
  }

  async exportResourceFile(resourceFile: ResourceFile) {
    const domParser = new DOMParser();
    const xmlDoc = domParser.parseFromString("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n" +
      "<!DOCTYPE properties SYSTEM \"http://java.sun.com/dtd/properties.dtd\">\n" +
      "<properties>\n" +
      "<comment/></properties>", "text/xml");
    const propertiesTag = xmlDoc.getElementsByTagName("properties")[0];
    const messages = await this.resourceFileService.getMessages(resourceFile).toPromise();
    for (const message of messages) {
      const entry = xmlDoc.createElement("entry");
      entry.setAttribute("key", message.message_key);
      entry.textContent = message.final || message.en;
      propertiesTag.appendChild(entry);
    }
    this.exportResult = new XMLSerializer().serializeToString(xmlDoc).split("><").join(">\n<");
    const blob = new Blob([this.exportResult], {type: "text/xml;charset=utf-8"});
    saveAs(blob, resourceFile.name);
    console.log(xmlDoc);
  }
}
