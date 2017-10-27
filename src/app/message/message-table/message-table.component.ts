import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../../shared/models/message";

@Component({
  selector: 'app-message-table',
  templateUrl: './message-table.component.html',
  styleUrls: ['./message-table.component.scss']
})
export class MessageTableComponent implements OnInit {

  @Input() messages: Message[];

  constructor() {
  }

  ngOnInit() {
  }

}
