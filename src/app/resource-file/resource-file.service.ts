import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {ResourceFile} from "../shared/models/resource-file";
import {Config} from "../config/Config";
import {ResultMessage} from "../shared/models/result-message";
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Message} from "../shared/models/message";
import 'rxjs/add/observable/throw';

@Injectable()
export class ResourceFileService {

  resourceFileStream: Subject<ResourceFile[]> = new BehaviorSubject(null);
  constructor(private http: HttpClient) {
  }

  getResourceFile(): Observable<ResourceFile[]> {
    this.loadResourceFiles();
    return this.resourceFileStream.asObservable();
  }

  loadResourceFiles() {
    this.http.get(Config.EP + "/resourcefile").subscribe((files: ResourceFile[]) => {
      this.resourceFileStream.next(files);
    });
  }

  addResourceFile(resourcefile: ResourceFile): Observable<ResultMessage> {
    return this.http.post<ResultMessage>(Config.EP + "/resourcefile", resourcefile);
  }

  updateResourceFile(file: ResourceFile): Observable<ResultMessage> {
    return this.http.patch<ResultMessage>(Config.EP + "/resourcefile/" + file.id, file);
  }

  getMessages(resourceFile: ResourceFile): Observable<Message[]> {
    if (resourceFile) {
      return this.http.get<Message[]>(Config.EP + "/resourcefile/" + resourceFile.id + "/messages");
    } else {
      return Observable.throw("Resource File not found!");
    }
  }
}
