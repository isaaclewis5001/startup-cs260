
import AuthState from "../../../model/AuthState";
import { useNavigate } from "react-router-dom";
import LoginPageParams from "../behavior/LoginPageParams";
import { ReactNode } from "react";

export function LoginWrapper({loginParams, form}: {loginParams: LoginPageParams, form: LoginForm}) {
  const navigator = useNavigate();
  // if (loginParams.authEffects.state) {
  //   navigator(loginParams.destPath);
  // }

  function onClick() {
    const maybePayload = form.getPayloadOrError();
    if ('errMsg' in maybePayload) {
      // TODO: do something with this
      console.log(maybePayload.errMsg)
      return;
    }


    // TODO: actually fetch
    try {
      const username: string = JSON.parse(maybePayload.payload).username;
      loginParams.authEffects.setAuth(new AuthState(username, "this is a mock token"));
      navigator(loginParams.destPath);
    } catch {
      return;
    };

  }
  
  return (
    <div className="main-content focus-card">
      <div className="formcard">
        <form.create>
          <button onClick={onClick}>{form.submitButtonText}</button>
        </form.create>
      </div>
    </div>
  )
}

export interface LoginForm {
  create(props: {children: ReactNode}): ReactNode;
  getPayloadOrError(): {payload: string} | {errMsg: string};
  url: string;
  submitButtonText: string;
}
