import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {MessageList} from "../shared/models/message-list";
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/map';
import {Message} from "../shared/models/message";
import {ResultMessage} from "../shared/models/result-message";
import {Subject} from "rxjs/Subject";
import {MessageQueryState} from "../shared/models/message-query-state";
import {URLSearchParams} from "@angular/http";

@Injectable()
export class MessageService {
  static EP = "http://xml-validate-backend.dev/api";
  static QUERY_STATE = "message-query-state";
  constructor(private http: HttpClient) {
  }

  public getMessages(page?: number): Observable<MessageList> {
    const json = localStorage.getItem(MessageService.QUERY_STATE);
    const state: MessageQueryState = JSON.parse(json);

    const params = new URLSearchParams();
    if (state) {
      if (state.applied) {
        params.set("applied", state.applied);
      }
      if (state.code_file_id) {
        params.set("codefile", state.code_file_id);
      }
      if (state.resource_file_id) {
        params.set("resourcefile", state.resource_file_id);
      }
      if (state.per_page) {
        params.set("applied", state.applied);
      }
    }
    if (page) {
      params.set("page", page.toString());
    }

    const url = MessageService.EP + "/message?" + params.toString();
    return this.http.get(url).retry(3);
  }

  public updateMessage(message: Message): Observable<ResultMessage> {
    const url = MessageService.EP + "/message/" + message.id;
    return this.http.patch(url, message);
  }

  setQueryState(state: MessageQueryState) {
    localStorage.setItem(MessageService.QUERY_STATE, JSON.stringify(state));
  }
}
