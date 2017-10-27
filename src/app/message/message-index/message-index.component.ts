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

}
