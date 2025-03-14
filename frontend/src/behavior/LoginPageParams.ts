import AuthEffects from "./AuthEffects.1";

export default class LoginPageParams {
  authEffects: AuthEffects;
  destPath: string;

  constructor(authEffects: AuthEffects, destPath: string = "/") {
    this.authEffects = authEffects;
    this.destPath = destPath;
  }
}
