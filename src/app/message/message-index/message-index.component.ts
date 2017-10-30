import {Component, OnInit} from '@angular/core';
import {MessageList} from "../../shared/models/message-list";
import {MessageService} from "../message.service";
import {CodeFile} from "../../shared/models/code-file";
import {CodefileService} from "../../codefile/codefile.service";
import {ResourceFile} from "../../shared/models/resource-file";
import {ResourceFileService} from "../../resource-file/resource-file.service";
import {MessageQueryState} from "../../shared/models/message-query-state";
import {Subject} from "rxjs/Subject";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

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
  isAddingMessage = false;
  isAddingCodeFile = false;
  isAddingResourceFile = false;
  queryStream: Subject<string> = new Subject();

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
    this.queryStream.debounceTime(300).distinctUntilChanged()
      .switchMap(query => this.messageService.searchMessage(query)).subscribe(messages => {
      this.messageList = messages;
    });
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

  toggleAddMessage() {
    this.isAddingMessage = !this.isAddingMessage;
    this.isAddingCodeFile = this.isAddingResourceFile = false;
  }

  toggleAddResourceFile() {
    this.isAddingResourceFile = !this.isAddingResourceFile;
    this.isAddingCodeFile = this.isAddingMessage = false;
  }

  toggleAddCodeFile() {
    this.isAddingCodeFile = !this.isAddingCodeFile;
    this.isAddingResourceFile = this.isAddingMessage = false;
  }

}
