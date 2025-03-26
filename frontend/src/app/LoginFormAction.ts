
import { NavigateFunction } from "react-router-dom";
import { FormAction } from "./FormWrapper";
import AuthEffects from "../behavior/AuthEffects";
import LoginPageParams from "../behavior/LoginPageParams";


export class LoginFormAction implements FormAction<null> {
  private authEffects: AuthEffects;
  private path: string;

  constructor(params: LoginPageParams) {
    this.authEffects = params.authEffects;
    this.path = params.destPath;
  }
  
  async act(_context: null, response: Response, navigator: NavigateFunction): Promise<string | null> {
    let json;
    try {
      json = await response.json()
      if (typeof json.username || json.token) {
        this.authEffects.setAuth({username: json.username, token: json.token});
        navigator(this.path);
        return null;
      }
    } catch {
      // fallthrough
    }
    return "bad response";
  }
}
