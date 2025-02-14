import AuthState from "../AuthState";
import "./Header.css"
import monkey_logo from "/monkey_still_life.png"


function AccountManagement({authState}: {authState: AuthState | null}) {
  if (authState === null) {
    return (
      <button className="header-login">Login</button>
    );
  }
  else {
    return (
      <>
        <p>
          Logged in as<br/>
          <span className="header-username">{authState.username}</span>
        </p>
        <button className="header-login">Logout</button>
      </>
    )
  }
}

export default function Header({authState}: {authState: AuthState | null}) {
  return (
    <header>
      <div className="header-bounds">
        <div className="left-content">
            <img src={monkey_logo} className="page-logo crisp-image"/>
            <h1>The Law of the Jungle</h1>
        </div>
        <div className="right-content">
          <AccountManagement authState={authState} />
        </div>
      </div>
    </header>
  )
}
