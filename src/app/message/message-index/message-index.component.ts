import {Component, OnInit} from '@angular/core';
import {MessageList} from "../../shared/models/message-list";
import {MessageService} from "../message.service";

@Component({
  selector: 'app-message-index',
  templateUrl: './message-index.component.html',
  styleUrls: ['./message-index.component.scss']
})
export class MessageIndexComponent implements OnInit {

  messageList: MessageList;

  constructor(private messageService: MessageService) {
    this.messageService.getMessages().subscribe(messages => {
      this.messageList = messages;
    });
  }

  ngOnInit() {
  }

  nextPage() {
    if (this.messageList.current_page !== this.messageList.last_page) {
      this.messageService.getMessages(this.messageList.current_page + 1).subscribe((messages) => {
        this.messageList = messages;
      });
    }
  }

  prevPage() {
    if (this.messageList.current_page !== 1) {
      this.messageService.getMessages(this.messageList.current_page - 1).subscribe((messages) => {
        this.messageList = messages;
      });
    }
  }

}
