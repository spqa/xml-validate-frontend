import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResourceFileService} from "./resource-file.service";
import {ResourceFileAddComponent} from './resource-file-add/resource-file-add.component';
import {FormsModule} from "@angular/forms";
import {ResourceFileIndexComponent} from './resource-file-index/resource-file-index.component';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../core/guard/auth.guard";
import {AuthService} from "../core/auth.service";
import {MessageService} from "../message/message.service";
import {DiffXmlService} from "../diff-xml/diff-xml.service";

const routes: Routes = [
  {
    path: 'resource-file',
    component: ResourceFileIndexComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ResourceFileAddComponent, ResourceFileIndexComponent],
  providers: [
    ResourceFileService,
    AuthGuard,
    AuthService,
    MessageService,
    DiffXmlService],
  exports: [
    ResourceFileAddComponent,
    RouterModule
  ]
})
export class ResourceFileModule {
}
