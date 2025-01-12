import AuthState from "../AuthState";
import "./Header.css"
import monkey_logo from "/monkey_still_life.png"


function AccountManagement({authState}: {authState: AuthState | null}) {
  if (authState === null) {
    return (
      <a href="./login" className="header-login">Login</a>
    );
  }
  else {
    return (
      <>
        <p>
          Logged in as<br/>
          <span className="header-username">{authState.username}</span>
        </p>
        <a href="./logout" className="header-login">Logout</a>
      </>
    )
  }
}

export default function Header({authState}: {authState: AuthState | null}) {
  return (
    <header>
      <div className="left-content">
          <img src={monkey_logo} className="page-logo crisp-image"/>
          <h1>The Law of the Jungle</h1>
      </div>
      <div className="right-content">
        <AccountManagement authState={authState} />
      </div>
    </header>
  )
}
