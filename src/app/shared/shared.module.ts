import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageLoadComponent} from './page-load/page-load.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PageLoadComponent],
  exports: [PageLoadComponent]
})
export class SharedModule {
}
