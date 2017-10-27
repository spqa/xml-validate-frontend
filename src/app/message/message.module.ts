import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessageIndexComponent} from './message-index/message-index.component';
import {RouterModule, Routes} from "@angular/router";
import {MessageTableComponent} from './message-table/message-table.component';
import {MessageRowComponent} from './message-row/message-row.component';
import {MessageService} from "./message.service";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared/shared.module";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MessageIndexComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MessageIndexComponent, MessageTableComponent, MessageRowComponent],
  exports: [
    MessageIndexComponent,
    RouterModule
  ],
  providers: [MessageService]
})
export class MessageModule {
}
