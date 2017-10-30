import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessageIndexComponent} from './message-index/message-index.component';
import {RouterModule, Routes} from "@angular/router";
import {MessageTableComponent} from './message-table/message-table.component';
import {MessageRowComponent} from './message-row/message-row.component';
import {MessageService} from "./message.service";
import {SharedModule} from "../shared/shared.module";
import {CodefileModule} from "../codefile/codefile.module";
import {FormsModule} from "@angular/forms";
import {MessageAddComponent} from './message-add/message-add.component';
import {ResourceFileModule} from "../resource-file/resource-file.module";

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
    SharedModule,
    CodefileModule,
    ResourceFileModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MessageIndexComponent, MessageTableComponent, MessageRowComponent, MessageAddComponent],
  exports: [
    MessageIndexComponent,
    RouterModule
  ],
  providers: [MessageService]
})
export class MessageModule {
}
