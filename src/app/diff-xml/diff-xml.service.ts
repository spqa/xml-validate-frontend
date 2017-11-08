import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {Message} from "../shared/models/message";

@Injectable()
export class DiffXmlService {

  constructor() {
  }

  readFileAsString(file: File): Observable<string> {
    const reader = new FileReader();
    const fileStream = Observable.create((observer: Observer<string>) => {
      reader.onload = () => {
        observer.next(reader.result);
        observer.complete();
      };
    });
    reader.readAsText(file, "utf-8");
    return fileStream;
  }

  readFileAsMessages(file: File): Observable<Message[]> {
    return this.readFileAsString(file).map((str) => {
      const messages: Message[] = [];
      const domParser = new DOMParser();
      const xmlDOC = domParser.parseFromString(str, "text/xml");
      console.log(xmlDOC);
      const entries = xmlDOC.getElementsByTagName("entry");
      console.log(entries);
      for (let j = 0; j < entries.length; j++) {
        const message = new Message();
        message.message_key = entries.item(j).getAttribute("key");
        message.ja = entries[j].innerHTML;
        messages.push(message);
        console.log(message);
      }
      console.log(messages);
      return messages;
    });
  }
}
