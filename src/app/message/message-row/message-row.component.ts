import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {Message} from "../../shared/models/message";
import {MessageService} from "../message.service";
import {Observable} from "rxjs/Observable";
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
  jaStream: Subject<Event> = new Subject();
  enStream: Subject<Event> = new Subject();
  msKeyStream: Subject<Event> = new Subject();
  finalStream: Subject<Event> = new Subject();
  viStream: Subject<Event> = new Subject();

  constructor(private messageService: MessageService,
              private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.processJaStream();
    this.processEnStream();
    this.procesMsKeyStream();
    this.processFinalStream();
    this.processViStream();
  }

  updateRow(message): void {
    this.messageService.updateMessage(message).subscribe(result => {
      console.log(result.message);
    });
  }

  processJaStream(): void {
   this.jaStream.debounceTime(300)
     .map(($event) => $event.target.textContent).distinctUntilChanged().subscribe((str) => {
     const update = Object.assign({}, this.message);
     update.message_key = str;
     this.updateRow(update);
   });
  }

  processEnStream(): void {
    this.enStream.debounceTime(300)
      .map(($event) => $event.target.textContent).distinctUntilChanged().subscribe((str) => {
      const update = Object.assign({}, this.message);
      update.en = str;
      this.updateRow(update);
    });
  }

  processFinalStream(): void {
    this.finalStream.debounceTime(300)
      .map(($event) => $event.target.textContent).distinctUntilChanged().subscribe((str) => {
      const update = Object.assign({}, this.message);
      update.final = str;
      this.updateRow(update);
    });
  }

  procesMsKeyStream(): void {
    this.msKeyStream.debounceTime(300)
      .map(($event) => $event.target.textContent).distinctUntilChanged().subscribe((str) => {
      const update = Object.assign({}, this.message);
      update.message_key = str;
      this.updateRow(update);
    });
  }

  processViStream(): void {
    this.viStream.debounceTime(300)
      .map(($event) => $event.target.textContent).distinctUntilChanged().subscribe((str) => {
      const update = Object.assign({}, this.message);
      update.vi = str;
      this.updateRow(update);
    });
  }
}
