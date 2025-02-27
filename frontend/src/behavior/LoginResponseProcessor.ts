import AuthEffects from "./AuthEffects";
import AuthState from "../../../model/AuthState";
import { NavigateFunction } from "react-router-dom";

export default class LoginResponseProcessor {
  private authEffects: AuthEffects;
  private destPath: string;

  constructor(authEffects: AuthEffects, destPath: string = "/") {
    this.authEffects = authEffects;
    this.destPath = destPath;
  }

  processResponse(navigator: NavigateFunction, username: string) {
    // TODO: fix this mock
    this.authEffects.setAuth(new AuthState(username, "this is a mock token"));
    navigator(this.destPath)
  }
}
