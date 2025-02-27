import { useState } from "react";
import { NavigateFunction, NavLink, useNavigate } from "react-router-dom";
import AuthEffects from "./state/AuthEffects";
import AuthState from "../../../model/AuthState";

function loginFn(username: string, password: string, authEffects: AuthEffects, navigator: NavigateFunction) {
  if (username === "") {
    // username required
    return
  }

  if (password === "") {
    // password required
    return
  }

  // TODO: this is a mock
  authEffects.setAuth(new AuthState(username, "this is a mock token"));
  navigator("/")
}

export function Login({authEffects}: {authEffects: AuthEffects}) {
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

        <button onClick={() => loginFn(username, password, authEffects, navigator)}>Login</button>
  
        <div className="formitem">
          <span>Don't have an account yet?</span><br />
          <NavLink to="/register">Sign up</NavLink>
        </div>
      </div>
    </div>
  )
}
