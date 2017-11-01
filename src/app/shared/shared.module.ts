import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageLoadComponent} from './page-load/page-load.component';
import {ModalComponent} from './modal/modal.component';
import {LineBreakPipe} from './pipe/line-break.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PageLoadComponent, ModalComponent, LineBreakPipe],
  exports: [PageLoadComponent, ModalComponent, LineBreakPipe]
})
export class SharedModule {
}
