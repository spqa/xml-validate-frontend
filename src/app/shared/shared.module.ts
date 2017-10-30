import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageLoadComponent} from './page-load/page-load.component';
import {ModalComponent} from './modal/modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PageLoadComponent, ModalComponent],
  exports: [PageLoadComponent, ModalComponent]
})
export class SharedModule {
}
