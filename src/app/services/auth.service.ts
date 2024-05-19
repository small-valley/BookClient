import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { environment } from "../../environments/environment";
import { HttpReqOptions } from "../models/http";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private readonly httpService: HttpService) {}

  checkInitialAuth() {
    const reqHttpOptions: HttpReqOptions<undefined> = {
      url: environment.apiurl + "/auth/verify",
    };
    this.httpService.get<boolean>(reqHttpOptions).subscribe({
      next: (response) => {
        this.isAuthenticatedSubject.next(true);
      },
      error: (err) => {
        this.isAuthenticatedSubject.next(false);
      },
    });
  }

  signInViaHostedUi(): void {
    const reqHttpOptions: HttpReqOptions<undefined> = {
      url: environment.apiurl + "/auth/signin",
    };
    this.httpService.get<string>(reqHttpOptions).subscribe({
      next: (signinUrl) => {
        window.location.href = signinUrl;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  signOutViaHostedUi() {
    // const region = environment.aws_cognito.region;
    // const cognitoDomain = environment.aws_cognito.domain;
    // const clientId = environment.aws_cognito.userPoolWebClientId;
    // const redirectUri = environment.aws_cognito.redirectSignOut;
    // const logoutUrl = `https://${cognitoDomain}.auth.${region}.amazoncognito.com/logout?client_id=${clientId}&logout_uri=${redirectUri}`;
    // window.location.href = logoutUrl;
  }
}
