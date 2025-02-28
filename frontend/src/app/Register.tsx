import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import LoginPageParams from "../behavior/LoginPageParams";
import { Form, FormWrapper } from "./FormWrapper";
import { LoginFormAction } from "./LoginFormAction";


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
    const username = (document.getElementById("inputUsername") as HTMLInputElement | null)?.value?.trim();
    if (!username) {
      return {errMsg: "Username required"}
    }

    const email = (document.getElementById("inputEmail") as HTMLInputElement | null)?.value?.trim();
    if (!email) {
      return {errMsg: "Password required"}
    }

    const password = (document.getElementById("inputPassword") as HTMLInputElement | null)?.value;
    if (!password) {
      return {errMsg: "Password required"}
    }

    return {payload: JSON.stringify({username, password}), context: null};
  }
  url = "";
  submitButtonText = "Sign up";
}

export function Register({loginParams}: {loginParams: LoginPageParams}) {
  
  return (
    <div className="main-content focus-card">
      <FormWrapper form={new RegisterFormImpl()} action={new LoginFormAction(loginParams)}/>
    </div>
  );
}
