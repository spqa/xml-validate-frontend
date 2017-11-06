import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from './login/login.component';
import {FormsModule} from "@angular/forms";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PageNotFoundComponent, LoginComponent],
  exports: [RouterModule]
})
export class CoreModule {
}
