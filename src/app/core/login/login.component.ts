import {Component, OnInit} from '@angular/core';
import {User} from "../../shared/models/user";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.login(this.user).subscribe((str) => {
      if (str) {
        localStorage.setItem("token", str);
        this.router.navigate(["/"]);
      }
    });
  }

}
