import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResourceFileService} from "./resource-file.service";
import {ResourceFileAddComponent} from './resource-file-add/resource-file-add.component';
import {FormsModule} from "@angular/forms";
import {ResourceFileIndexComponent} from './resource-file-index/resource-file-index.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: 'resource-file',
    component: ResourceFileIndexComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ResourceFileAddComponent, ResourceFileIndexComponent],
  providers: [ResourceFileService],
  exports: [
    ResourceFileAddComponent,
    RouterModule
  ]
})
export class ResourceFileModule {
}
