import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {MessageList} from "../shared/models/message-list";
import 'rxjs/add/operator/retry';
import {Message} from "../shared/models/message";
import {ResultMessage} from "../shared/models/result-message";

@Injectable()
export class MessageService {
  static EP = "http://xml-validate-backend.dev/api";

  constructor(private http: HttpClient) {
  }

  public getMessages(): Observable<MessageList> {
    const url = MessageService.EP + "/message";
    return this.http.get(url).retry(3);
  }

  public updateMessage(message: Message): Observable<ResultMessage> {
    const url = MessageService.EP + "/message/" + message.id;
    return this.http.patch(url, message);
  }

}
