import { NavigateFunction } from "react-router-dom";
import AuthEffects from "./AuthEffects";

export default class LoginPageParams {
  authEffects: AuthEffects;
  destPath: string;
  navigate: NavigateFunction;

  constructor(authEffects: AuthEffects, destPath: string = "/", navigate: NavigateFunction) {
    this.authEffects = authEffects;
    this.destPath = destPath;
    this.navigate = navigate;
  }
}
