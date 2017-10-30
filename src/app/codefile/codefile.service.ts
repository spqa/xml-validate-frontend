import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {CodeFile} from "../shared/models/code-file";
import {Config} from "../config/Config";
import {ResultMessage} from "../shared/models/result-message";
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class CodefileService {

  private EP = Config.EP;
  codeFileStream: Subject<CodeFile[]> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
  }

  getCodeFile(): Observable<CodeFile[]> {
    this.loadCodefiles();
    return this.codeFileStream.asObservable();
  }

  loadCodefiles() {
    this.http.get(this.EP + "/codefile").subscribe((codefiles: CodeFile[]) => {
      this.codeFileStream.next(codefiles);
    });
  }

  addCodeFile(codeFile: CodeFile): Observable<ResultMessage> {
    return this.http.post(this.EP + "/codefile", codeFile);
  }

  updateCodeFile(editCodeFile: CodeFile): Observable<ResultMessage> {
    return this.http.patch(this.EP + "/codefile/" + editCodeFile.id, editCodeFile);
  }
}
