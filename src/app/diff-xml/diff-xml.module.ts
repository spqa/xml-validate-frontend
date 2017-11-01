import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DiffXmlIndexComponent} from './diff-xml-index/diff-xml-index.component';
import {RouterModule, Routes} from "@angular/router";

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
  declarations: [DiffXmlIndexComponent],
  exports: [RouterModule]
})
export class DiffXmlModule {
}
