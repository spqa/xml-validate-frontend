import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {MessageList} from "../shared/models/message-list";
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import {Message} from "../shared/models/message";
import {ResultMessage} from "../shared/models/result-message";
import {Subject} from "rxjs/Subject";
import {MessageQueryState} from "../shared/models/message-query-state";
import {URLSearchParams} from "@angular/http";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Config} from "../config/Config";

@Injectable()
export class MessageService {
  static EP = Config.EP;
  private messageState: MessageQueryState = new MessageQueryState();
  public messagesStream: Subject<MessageList> = new BehaviorSubject(null);
  public queryStateStream: Subject<MessageQueryState> = new BehaviorSubject(null);
  constructor(private http: HttpClient) {
    this.queryStateStream.subscribe((state: MessageQueryState) => {
      const params = new URLSearchParams();
      if (state) {
        if (state.applied) {
          params.set("applied", state.applied.toString());
        }
        if (state.tested) {
          params.set("tested", state.tested.toString());
        }
        if (state.code_file_id) {
          params.set("codefile", state.code_file_id.toString());
        }
        if (state.resource_file_id) {
          params.set("resourcefile", state.resource_file_id.toString());
        }
        if (state.per_page) {
          params.set("applied", state.applied.toString());
        }
        if (state.page) {
          params.set("page", state.page.toString());
        }
        if (state.final) {
          params.set("final", '1');
        }
      }

      const url = MessageService.EP + "/message?" + params.toString();
      this.http.get(url).retry(3).subscribe((messages: MessageList) => {
        this.messagesStream.next(messages);
      });
    });
    // update current page state each time messageStream emit
    this.messagesStream.filter((messages) => messages !== null).map(messages => messages.current_page).subscribe((current_page) => {
      this.messageState.page = current_page;
    });
  }

  public importMessages(messages: Message[]): Observable<ResultMessage> {
    return this.http.post<ResultMessage>(Config.EP + "/message/import", messages);
  }

  public getMessages(): void {
    this.queryStateStream.next(this.messageState);
  }

  public nextPage() {
    this.messageState.page = this.messageState.page + 1;
    this.getMessages();
  }

  public prevPage() {
    this.messageState.page = this.messageState.page - 1;
    this.getMessages();
  }

  public setQueryState(state: MessageQueryState) {
    this.messageState = state;
  }

  public updateMessage(message: Message): Observable<ResultMessage> {
    const url = MessageService.EP + "/message/" + message.id;
    return this.http.patch<ResultMessage>(url, message);
  }

  public addMessage(message: Message): Observable<ResultMessage> {
    const url = MessageService.EP + "/message";
    return this.http.post<ResultMessage>(url, message);
  }

  public searchMessage(query: string): Observable<MessageList> {
    const url = MessageService.EP + "/search/message?query=" + query;
    return this.http.get<MessageList>(url);
  }

  public deleteMessage(id: number): Observable<ResultMessage> {
    const url = MessageService.EP + "/message/" + id;
    return this.http.delete<ResultMessage>(url);
  }
}
