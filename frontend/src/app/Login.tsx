import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { Form, FormWrapper, getFieldById, getFieldByIdNoTrim } from "./FormWrapper";
import LoginPageParams from "../behavior/LoginPageParams";
import { LoginFormAction } from "./LoginFormAction";

class LoginFormImpl implements Form<null> {
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

  getPayloadOrError(): { payload: string; context: null } | { errMsg: string; } {
    const username = getFieldById("inputUsername");
    if (!username) {
      return {errMsg: "Username required"}
    }

    const password = getFieldByIdNoTrim("inputPassword");
    if (!password) {
      return {errMsg: "Password required"}
    }

    return {payload: JSON.stringify({username, password}), context: null};
  }
  
  url = "/api/auth";
  submitButtonText = "Login";
}

export function Login({loginParams}: {loginParams: LoginPageParams}) {
  return (
    <div className="main-content focus-card">
      <FormWrapper form={new LoginFormImpl()} action={new LoginFormAction(loginParams)}/>
    </div>
  )
}
