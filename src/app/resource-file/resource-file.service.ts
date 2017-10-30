import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {ResourceFile} from "../shared/models/resource-file";
import {Config} from "../config/Config";

@Injectable()
export class ResourceFileService {

  constructor(private http: HttpClient) {
  }

  getResourceFile(): Observable<ResourceFile[]> {
    return this.http.get(Config.EP + "/resourcefile");
  }
}
