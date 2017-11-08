import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DiffXmlIndexComponent} from './diff-xml-index/diff-xml-index.component';
import {RouterModule, Routes} from "@angular/router";
import {DiffXmlFileComponent} from './diff-xml-file/diff-xml-file.component';
import {DiffXmlService} from "./diff-xml.service";

const routes: Routes = [
  {
    path: 'diff-xml',
    component: DiffXmlIndexComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DiffXmlIndexComponent, DiffXmlFileComponent],
  exports: [RouterModule],
  providers: [DiffXmlService]
})
export class DiffXmlModule {
}
