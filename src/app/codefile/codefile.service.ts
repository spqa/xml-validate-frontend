import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {CodeFile} from "../shared/models/code-file";
import {Config} from "../config/Config";

@Injectable()
export class CodefileService {

  private EP = Config.EP;

  constructor(private http: HttpClient) {
  }

  getCodeFile(): Observable<CodeFile[]> {
    return this.http.get(this.EP + "/codefile");
  }
}
