import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CodefileService} from "./codefile.service";
import {CodeFileAddComponent} from './code-file-add/code-file-add.component';
import {FormsModule} from "@angular/forms";
import {CodeFileIndexComponent} from './code-file-index/code-file-index.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: 'codefile',
    component: CodeFileIndexComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CodeFileAddComponent, CodeFileIndexComponent],
  providers: [CodefileService],
  exports: [
    CodeFileAddComponent,
    RouterModule
  ]
})
export class CodefileModule {
}
