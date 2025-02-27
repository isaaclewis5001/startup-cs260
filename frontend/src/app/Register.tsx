import { useState } from "react";
import { NavigateFunction, NavLink, useNavigate } from "react-router-dom";
import LoginResponseProcessor from "../behavior/LoginResponseProcessor";

function registerFn(username: string, email: string, password: string, navigator: NavigateFunction,responseProcessor: LoginResponseProcessor) {
  if (username === "") {
    // username required
    return
  }

  if (email === "") {
    // password required
    return
  }

  if (password === "") {
    // password required
    return
  }


  responseProcessor.processResponse(navigator, username);
}


export function Register({responseProcessor}: {responseProcessor: LoginResponseProcessor}) {
  const [username, usernameUpdate] = useState("");
  const [email, emailUpdate] = useState("");
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
            <label htmlFor="inputEmail">Email</label>
            <input type="email" placeholder="email" id="inputEmail" value={email} onChange={evt => emailUpdate(evt.target.value)}></input>
          </div>
        <div className="formitem">
          <label htmlFor="inputPassword">Password</label>
          <input type="password" placeholder="password" id="inputPassword" value={password} onChange={evt => passwordUpdate(evt.target.value)}></input>
        </div>

        <button onClick={() => registerFn(username, email, password, navigator, responseProcessor)}>Login</button>
  
        <div className="formitem">
          <span>Don't have an account yet?</span><br />
          <NavLink to="/register">Sign up</NavLink>
        </div>
      </div>
    </div>
  );
}
