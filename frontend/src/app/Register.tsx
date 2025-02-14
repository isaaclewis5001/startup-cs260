import { NavLink } from "react-router-dom";

export function Register() {
  return (
      <div className="main-content focus-card">
        <div className="formcard">
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

          <button>Sign up</button>
      
          <div className="formItem">
            <span>Already have an account?</span><br />
            <NavLink to="/login">Log in</NavLink>
          </div>
        </div>
      </div>
    )
}
