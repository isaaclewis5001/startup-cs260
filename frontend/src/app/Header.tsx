import { NavLink, useLocation } from "react-router-dom";
import "./Header.css"
import AuthEffects from "../behavior/AuthEffects";
import monkey_logo from "/monkey_still_life.png"

function AccountManagement({authEffects, loginButtonVisible}: {authEffects: AuthEffects, loginButtonVisible: boolean}) {
  if (authEffects.state === null) {
    return loginButtonVisible ? 
      (<NavLink className="header-login button" to="/login">Login</NavLink>) :
      null;
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
        {
          loginButtonVisible ? 
          (<button className="header-login" onClick={logout}>Logout</button>) :
          null
        }
      </>
    )
  }
}

export default function Header({authEffects, loginButtonVisible}: {authEffects: AuthEffects, loginButtonVisible: boolean}) {
  const location = useLocation();
  const rightSideVisible = location.pathname !== "register" && location.pathname !== "login" 
  return (
    <header>
      <div className="header-bounds">
        <div className="left-content">
            <img src={monkey_logo} className="page-logo crisp-image"/>
            <h1>The Law of the Jungle</h1>
        </div>
        { !rightSideVisible ? null : (
          <div className="right-content">
            <AccountManagement authEffects={authEffects} loginButtonVisible={loginButtonVisible}/>
          </div>
        )}
      </div>
    </header>
  )
}
