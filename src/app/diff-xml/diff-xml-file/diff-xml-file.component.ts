import {Component, Input, OnInit} from '@angular/core';
import {BundleGroup} from "../../shared/models/bundle-group";
import {DiffXmlService} from "../diff-xml.service";
import {ResourceFileService} from "../../resource-file/resource-file.service";
import {ResourceFile} from "../../shared/models/resource-file";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/zip';
import {Message} from "../../shared/models/message";
import {ResultStatus, TestResult} from "../../shared/models/test-result";

@Component({
  selector: 'app-diff-xml-file',
  templateUrl: './diff-xml-file.component.html',
  styleUrls: ['./diff-xml-file.component.scss']
})
export class DiffXmlFileComponent implements OnInit {

  progress = 0;
  max = 100;
  @Input() bundle: BundleGroup;
  testPair = false;
  testSame = false;
  testResult: TestResult[] = [];

  constructor(private diffService: DiffXmlService,
              private resourceService: ResourceFileService) {
  }

  test() {
    if (this.bundle.files.length < 2) {
      this.testPair = false;
      return;
    } else {
      this.testPair = true;
    }
    const enFile = this.bundle.files.filter((file) => file.name.split("_")[1].startsWith("en"))[0];
    const jaFile = this.bundle.files.filter((file) => file.name.split("_")[1].startsWith("ja"))[0];
    const localENRes$ = this.diffService.readFileAsMessages(enFile, "en");
    const localJaRes$ = this.diffService.readFileAsMessages(jaFile, "ja");
    const dbRes$ = this.resourceService.resourceFileStream
      .filter(res => !!res)
      .map((resFiles) => {
        const foundFiles = resFiles.filter((resFile) => `${this.bundle.name}.xml` === resFile.name);
        if (foundFiles) return foundFiles[0];
        return null;
      })
      .switchMap((resFile: ResourceFile) => this.resourceService.getMessages(resFile));

    Observable.zip(localENRes$, localJaRes$, dbRes$, (en, ja, db) => ({en, ja, db}))
      .subscribe(val => {
        const en = val.en;
        const ja = val.ja;
        const db = val.db;
        this.max = en.length;
        this.testResult = en.reduce((currentResult: TestResult[], message) => {
          let result: TestResult;
          db.forEach((dbMessage) => {
            if (message.message_key === dbMessage.message_key && message.final !== this.getDefaultEN(dbMessage)) {
              result = new TestResult();
              result.messageKey = message.message_key;
              result.db = dbMessage.en;
              result.local = message.en;
              result.status = ResultStatus.CONFLICT;
              currentResult.push(result);
            }
          });
          // exit foreach local message not exist in db
          if (!result) {
            result = new TestResult();
            result.status = ResultStatus.LOCAL;
            result.local = message.final;
          }
          return currentResult;
        }, []);
      });
  }

  getDefaultEN(message: Message): string {
    return message.final || message.en;
  }

  ngOnInit() {
    this.test();
    this.resourceService.loadResourceFiles();
  }

}
