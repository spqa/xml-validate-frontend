import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MessageModule} from "./message/message.module";
import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";
import {CodefileModule} from "./codefile/codefile.module";
import {HttpClientModule} from "@angular/common/http";
import {ResourceFileModule} from "./resource-file/resource-file.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MessageModule,
    CodefileModule,
    ResourceFileModule,
    SharedModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
