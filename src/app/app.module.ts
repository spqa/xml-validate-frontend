import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MessageModule} from "./message/message.module";
import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";
import {CodefileModule} from "./codefile/codefile.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ResourceFileModule} from "./resource-file/resource-file.module";
import {DiffXmlModule} from "./diff-xml/diff-xml.module";
import {AuthInterceptor} from "./shared/interceptor/auth.interceptor";
import {AuthService} from "./core/auth.service";

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
    DiffXmlModule,
    SharedModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
