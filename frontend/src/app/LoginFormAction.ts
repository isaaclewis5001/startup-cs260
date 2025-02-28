
import AuthState from "../../../model/AuthState";
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
  
  async act(_context: null, _response: Response, navigator: NavigateFunction): Promise<string | null> {
    // let json;
    // try {
    //   json = await response.json()
    // } catch {
    //   return "bad response";
    // }

    // if (!json.username) {
    //   return "bad response"
    // }
    this.authEffects.setAuth(new AuthState("mock user", "mock token"));
    navigator(this.path);
    return null;
  }
}
