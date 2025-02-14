import { NavLink } from "react-router-dom";

export function Login() {
  return (
    <div className="main-content focus-card">
      <div className="formcard">
        <div className="formitem">
          <label htmlFor="inputUsername">Username</label>
          <input type="text" placeholder="username" id="inputUsername"></input>
        </div>
        <div className="formitem">
          <label htmlFor="inputPassword">Password</label>
          <input type="password" placeholder="password" id="inputPassword"></input>
        </div>

        <button>Login</button>
  
        <div className="formitem">
          <span>Don't have an account yet?</span><br />
          <NavLink to="/register">Sign up</NavLink>
        </div>
      </div>
    </div>
  )
}
