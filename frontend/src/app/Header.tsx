import { NavLink } from "react-router-dom";
import "./Header.css"
import AuthEffects from "./state/AuthEffects";
import monkey_logo from "/monkey_still_life.png"

function AccountManagement({authEffects}: {authEffects: AuthEffects}) {

  
  if (authEffects.state === null) {
    
    return (
      <NavLink className="header-login button" to="/login">Login</NavLink>
    );
  }
  else {
    function logout() {
      authEffects.removeAuth();
    }

    return (
      <>
        <p>
          Logged in as<br/>
          <span className="header-username">{authEffects.state.username}</span>
        </p>
        <button className="header-login" onClick={logout}>Logout</button>
      </>
    )
  }
}

export default function Header({authEffects}: {authEffects: AuthEffects}) {
  return (
    <header>
      <div className="header-bounds">
        <div className="left-content">
            <img src={monkey_logo} className="page-logo crisp-image"/>
            <h1>The Law of the Jungle</h1>
        </div>
        <div className="right-content">
          <AccountManagement authEffects={authEffects} />
        </div>
      </div>
    </header>
  )
}
