import { useState } from "react";
import { NavLink, NavigateFunction, useNavigate } from "react-router-dom";
import LoginResponseProcessor from "../behavior/LoginResponseProcessor";

function loginFn(username: string, password: string, navigator: NavigateFunction, responseProcessor: LoginResponseProcessor) {
  if (username === "") {
    // username required
    return
  }

  if (password === "") {
    // password required
    return
  }

  responseProcessor.processResponse(navigator, username);
}

export function Login({responseProcessor}: {responseProcessor: LoginResponseProcessor}) {
  const [username, usernameUpdate] = useState("");
  const [password, passwordUpdate] = useState("");
  const navigator = useNavigate();
  
  return (
    <div className="main-content focus-card">
      <div className="formcard">
        <div className="formitem">
          <label htmlFor="inputUsername">Username</label>
          <input type="text" placeholder="username" id="inputUsername" value={username} onChange={evt => usernameUpdate(evt.target.value)}></input>
        </div>
        <div className="formitem">
          <label htmlFor="inputPassword">Password</label>
          <input type="password" placeholder="password" id="inputPassword" value={password} onChange={evt => passwordUpdate(evt.target.value)}></input>
        </div>

        <button onClick={() => loginFn(username, password, navigator, responseProcessor)}>Login</button>
  
        <div className="formitem">
          <span>Don't have an account yet?</span><br />
          <NavLink to="/register">Sign up</NavLink>
        </div>
      </div>
    </div>
  )
}
