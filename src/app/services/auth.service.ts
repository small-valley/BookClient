import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpReqOptions } from "../models/http";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  signInViaHostedUi(): void {
    const reqHttpOptions: HttpReqOptions<undefined> = {
      url: environment.apiurl + "/auth/signin",
    };
    this.httpService.get<string>(reqHttpOptions).subscribe({
      next: (signinUrl) => {
        window.location.href = signinUrl;
      },
      error: (err) => {
        console.error("Error during sign-in:", err);
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
