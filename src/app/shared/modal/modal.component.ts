import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() message: string;
  @Input() title = "alert";
  @Input() active: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  close() {
    this.active = false;
  }

}
