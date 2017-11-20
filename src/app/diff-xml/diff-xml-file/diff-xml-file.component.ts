import {Component, Input, OnInit} from '@angular/core';
import {BundleGroup} from "../../shared/models/bundle-group";
import {DiffXmlService} from "../diff-xml.service";
import {ResourceFileService} from "../../resource-file/resource-file.service";
import {ResourceFile} from "../../shared/models/resource-file";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/zip';
import {Message} from "../../shared/models/message";
import {ResultStatus, TestResult} from "../../shared/models/test-result";
import * as _ from 'lodash';

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
  testFound = false;
  testSame = true;
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
        if (foundFiles.length > 0) {
          this.testFound = true;
          return foundFiles[0];
        }
      })
      .switchMap((resFile: ResourceFile) => this.resourceService.getMessages(resFile));

    Observable.zip(localENRes$, localJaRes$, dbRes$, (en, ja, db) => ({en, ja, db}))
      .subscribe(val => {
        const en = val.en;
        const ja = val.ja;
        const db = val.db;

        console.log("diffXMLFile#test: ", en);
        console.log("diffXMLFile#test: ", db);

        this.max = en.length;

        // test same message
        for (const message of en) {
          if (!_.find(ja, {message_key: message.message_key})) {
            this.testSame = false;
            break;
          }
        }

        this.testResult = en.reduce((currentResult: TestResult[], message) => {
          let result: TestResult;
          let same = false;
          db.forEach((dbMessage) => {
            if (message.message_key === dbMessage.message_key) {
              if (message.final === this.getDefaultEN(dbMessage)) {
                same = true;
                return;
              }
              console.log(message.final);
              result = new TestResult();
              result.message_key = message.message_key;
              result.db = this.getDefaultEN(dbMessage);
              result.local = message.final;
              result.status = ResultStatus.CONFLICT;
              currentResult.push(result);
            }
          });
          // exit foreach local message not exist in db
          if (!result && !same) {
            result = new TestResult();
            result.status = ResultStatus.LOCAL;
            result.local = message.final;
            result.message_key = message.final;
            currentResult.push(result);
          }

          this.progress++;
          return currentResult;
        }, this.testResult);

        this.testResult = db.reduce((currentResult: TestResult[], dbMessage) => {
          for (const localMessage of en) {
            if (dbMessage.message_key === localMessage.message_key) {
              return currentResult;
            }
          }
          const result = new TestResult();
          result.message_key = dbMessage.message_key;
          result.db = this.getDefaultEN(dbMessage);
          result.status = ResultStatus.DB;
          currentResult.push(result);
          return currentResult;
        }, this.testResult);

      }, this.handleError);
  }

  getDefaultEN(message: Message): string {
    return message.final || message.en;
  }

  handleError(error) {
    this.testFound = this.testPair = this.testSame = false;
    console.log(error);
  }

  ngOnInit() {
    this.test();
    this.resourceService.loadResourceFiles();
  }

}
