import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {Message} from "../../shared/models/message";
import {MessageService} from "../message.service";

@Component({
  selector: '[message-row]',
  templateUrl: './message-row.component.html',
  styleUrls: ['./message-row.component.scss']
})
export class MessageRowComponent implements OnInit {

  @Input() message: Message;
  @Input() no: number;

  constructor(private messageService: MessageService,
              private elementRef: ElementRef) {
  }

  ngOnInit() {
    // const tds = this.elementRef.nativeElement.getElementsByTagName("td");
    // console.log(tds.length);
    // for (let i = 0; i < tds.length; i++) {
    //   tds[i].addEventListener("change", this.handleKeyUp(), false);
    // }
  }

  updateRow(): void {
    this.messageService.updateMessage(this.message).subscribe(result => {
      console.log(result.message);
    });
    console.log("yo bro");
  }

  setMessageKey($event): void {
    this.message.message_key = $event.target.textContent;
    this.updateRow();
    console.log(this.message);
  }

}
