import {Component} from '@angular/core';
import {AuthService} from "./core/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  mobileNavBar = false;

  constructor(private authService: AuthService,
              private router: Router) {
  }
  toggleNavBar() {
    this.mobileNavBar = !this.mobileNavBar;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
