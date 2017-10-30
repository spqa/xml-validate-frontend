import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../../shared/models/message";
import {MessageService} from "../message.service";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import {Subject} from "rxjs/Subject";

@Component({
  selector: '[message-row]',
  templateUrl: './message-row.component.html',
  styleUrls: ['./message-row.component.scss']
})
export class MessageRowComponent implements OnInit {

  @Input() message: Message;
  @Input() no: number;
  MSKEY_INDEX = 1;
  JA_KEY = 2;
  EN_KEY = 3;
  FINAL_KEY = 4;
  VI_KEY = 7;
  msKeyStream: Subject<Event> = new Subject();
  jaStream: Subject<Event> = new Subject();
  enStream: Subject<Event> = new Subject();
  finalStream: Subject<Event> = new Subject();
  viStream: Subject<Event> = new Subject();

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
    this.msKeyStream.debounceTime(300).subscribe((event) => {
      this.handleChange(event);
    });
    this.jaStream.debounceTime(300).subscribe((event) => {
      this.handleChange(event);
    });
    this.enStream.debounceTime(300).subscribe((event) => {
      this.handleChange(event);
    });
    this.finalStream.debounceTime(300).subscribe((event) => {
      this.handleChange(event);
    });
    this.viStream.debounceTime(300).subscribe((event) => {
      this.handleChange(event);
    });
  }

  handleChange(event: Event): void {
    const td: any = event.target;
    const content = td.textContent;
    console.log(content);
    let isChange = false;
    const upMess = new Message();
    console.log(td.cellIndex);
    switch (td.cellIndex) {
      case this.MSKEY_INDEX:
        if (content !== this.message.message_key) {
          upMess.id = this.message.id;
          upMess.message_key = content;
          isChange = true;
        }
        break;
      case this.EN_KEY:
        if (content !== this.message.en) {
          upMess.id = this.message.id;
          upMess.en = content;
          isChange = true;
        }
        break;
      case this.JA_KEY:
        if (content !== this.message.ja) {
          upMess.id = this.message.id;
          upMess.ja = content;
          isChange = true;
        }
        break;
      case this.FINAL_KEY:
        if (content !== this.message.final) {
          upMess.id = this.message.id;
          upMess.final = content;
          isChange = true;
        }
        break;
      case this.VI_KEY:
        if (content !== this.message.vi) {
          upMess.id = this.message.id;
          upMess.vi = content;
          isChange = true;
        }
        break;
    }
    if (isChange) {
      td.style.backgroundColor = "#ef9a9a";
      this.messageService.updateMessage(upMess).subscribe(result => {
        console.log(upMess);
        if (result.error === false) {
          td.style.backgroundColor = null;
        }
      });
    }
  }

  updateApplied($event) {
    console.log("update applied flag!");
    $event.target.parentElement.style.backgroundColor = "#ef9a9a";
    const message = new Message();
    message.id = this.message.id;
    message.applied = !this.message.applied;
    this.messageService.updateMessage(message).subscribe((result) => {
      if (result.error === false) {
        $event.target.parentElement.style.backgroundColor = null;
      }
    });
  }

  deleteMessage() {
    this.messageService.deleteMessage(this.message.id).subscribe(result => {
      this.messageService.getMessages();
    });
  }
}
