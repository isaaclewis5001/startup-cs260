import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import LoginPageParams from "../behavior/LoginPageParams";
import { LoginForm, LoginWrapper } from "./LoginWrapper";

class LoginFormImpl implements LoginForm {
  create({children}: { children: ReactNode; }): ReactNode {
    return (<>
      <div className="formitem">
        <label htmlFor="inputUsername">Username</label>
        <input type="text" placeholder="username" id="inputUsername"></input>
      </div>
      <div className="formitem">
        <label htmlFor="inputPassword">Password</label>
        <input type="password" placeholder="password" id="inputPassword"></input>
      </div>

      {children}
      
      <div className="formitem">
        <span>Don't have an account yet?</span><br />
        <NavLink to="/register">Sign up</NavLink>
      </div>
    </>);
  }

  getPayloadOrError(): { payload: string; } | { errMsg: string; } {
    const username = (document.getElementById("inputUsername") as HTMLInputElement | null)?.value?.trim();
    if (!username) {
      return {errMsg: "Username required"}
    }

    const password = (document.getElementById("inputPassword") as HTMLInputElement | null)?.value;
    if (!password) {
      return {errMsg: "Password required"}
    }

    return {payload: JSON.stringify({username, password})};
  }
  
  url = "";
  submitButtonText = "Login";
  
}

export function Login({loginParams}: {loginParams: LoginPageParams}) {
  return (
    <LoginWrapper loginParams={loginParams} form={new LoginFormImpl()} />
  )
}
