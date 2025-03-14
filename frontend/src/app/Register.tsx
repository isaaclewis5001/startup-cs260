import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import LoginPageParams from "../behavior/LoginPageParams";
import { Form, FormWrapper, getFieldById, getFieldByIdNoTrim } from "./FormWrapper";
import { LoginFormAction } from "./LoginFormAction";
import { CreateUserRequest } from "../../../shared/api/model";


class RegisterFormImpl implements Form<null> {
  create({children}: { children: ReactNode; }): ReactNode {
    return (<>
      <div className="formitem">
        <label htmlFor="inputUsername">Username</label>
        <input type="text" placeholder="username" id="inputUsername"></input>
      </div>
        <div className="formitem">
          <label htmlFor="inputEmail">Email</label>
          <input type="email" placeholder="email" id="inputEmail"></input>
        </div>
      <div className="formitem">
        <label htmlFor="inputPassword">Password</label>
        <input type="password" placeholder="password" id="inputPassword"></input>
      </div>

      {children}
    
      <div className="formitem">
        <span>Already have an account?</span><br />
        <NavLink to="/login">Login</NavLink>
      </div>
    </>)
  }

  getPayloadOrError(): { payload: string; context: null} | { errMsg: string; } {
    const username = getFieldById("inputUsername");
    if (!username) {
      return {errMsg: "Username required"}
    }

    const email = getFieldById("inputEmail");
    if (!email) {
      return {errMsg: "Email required"}
    }

    const password = getFieldByIdNoTrim("inputPassword");
    if (!password) {
      return {errMsg: "Password required"}
    }

    const request: CreateUserRequest = {
      username, password, email,
    };

    return {payload: JSON.stringify(request), context: null};
  }
  url = "/api/user";
  submitButtonText = "Sign up";
}

export function Register({loginParams}: {loginParams: LoginPageParams}) {
  
  return (
    <div className="main-content focus-card">
      <FormWrapper form={new RegisterFormImpl()} action={new LoginFormAction(loginParams)}/>
    </div>
  );
}
