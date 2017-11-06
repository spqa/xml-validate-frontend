import {Injectable} from '@angular/core';
import {User} from "../shared/models/user";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {Config} from "../config/Config";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(user: User): Observable<string> {
    return this.http.post(Config.EP + "/authenticate", user);
  }

  checkLogin(): boolean {
    if (localStorage.getItem("token")) {
      return true;
    }
    return false;
  }

  getToken(): string {
    return localStorage.getItem("token");
  }

  logout() {
    localStorage.removeItem("token");
  }

}
