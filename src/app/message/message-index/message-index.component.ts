import {Component, OnInit} from '@angular/core';
import {MessageList} from "../../shared/models/message-list";
import {MessageService} from "../message.service";
import {CodeFile} from "../../shared/models/code-file";
import {CodefileService} from "../../codefile/codefile.service";
import {ResourceFile} from "../../shared/models/resource-file";
import {ResourceFileService} from "../../resource-file/resource-file.service";
import {MessageQueryState} from "../../shared/models/message-query-state";

@Component({
  selector: 'app-message-index',
  templateUrl: './message-index.component.html',
  styleUrls: ['./message-index.component.scss']
})
export class MessageIndexComponent implements OnInit {

  messageList: MessageList;
  codeFileList: CodeFile[];
  resourceFileList: ResourceFile[];
  queryState = new MessageQueryState();
  isLoading = false;

  constructor(private messageService: MessageService,
              private codeFileService: CodefileService,
              private resourceFileService: ResourceFileService) {
    this.messageService.messagesStream.subscribe(messages => {
      this.messageList = messages;
      this.isLoading = false;
    });
    this.codeFileService.getCodeFile().subscribe((codefiles: CodeFile[]) => {
      this.codeFileList = codefiles;
    });
    this.resourceFileService.getResourceFile().subscribe((resourceFiles) => {
      this.resourceFileList = resourceFiles;
    });
  }

  ngOnInit() {
  }

  nextPage() {
    if (this.messageList.current_page !== this.messageList.last_page) {
      this.messageService.nextPage();
    }
  }

  prevPage() {
    if (this.messageList.current_page !== 1) {
      this.messageService.prevPage();
    }

  }

  handleFilter() {
    this.isLoading = true;
    this.queryState.page = null;
    console.log(this.queryState);
    this.messageService.setQueryState(this.queryState);
    this.messageService.getMessages();
  }
}
