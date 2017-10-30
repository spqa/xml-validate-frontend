import {Component, Input, OnInit} from '@angular/core';
import {CodeFile} from "../../shared/models/code-file";
import {ResourceFile} from "../../shared/models/resource-file";
import {Message} from "../../shared/models/message";
import {MessageService} from "../message.service";
import {ResultMessage} from "../../shared/models/result-message";

@Component({
  selector: 'app-message-add',
  templateUrl: './message-add.component.html',
  styleUrls: ['./message-add.component.scss']
})
export class MessageAddComponent implements OnInit {

  @Input() codeFileList: CodeFile[];
  @Input() resourceFileList: ResourceFile[];
  infoMessage = "";
  isError: boolean;
  message = new Message();

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.messageService.addMessage(this.message).subscribe((result: ResultMessage) => {
      if (result.error === true) {
        if (typeof result.message === "string") {
          this.infoMessage = result.message;
        } else {
          for (const member in result.message) {
            this.isError = true;
            console.log(member);
            this.infoMessage = result.message[member][0];
          }
        }
      }
    });
  }
}
