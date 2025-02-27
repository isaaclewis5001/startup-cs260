import AuthEffects from "./AuthEffects";

export default class LoginPageParams {
  authEffects: AuthEffects;
  destPath: string;

  constructor(authEffects: AuthEffects, destPath: string = "/") {
    this.authEffects = authEffects;
    this.destPath = destPath;
  }
}
