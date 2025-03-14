import { useEffect } from "react";
import AuthState from "../../../model/AuthState";

export default class AuthEffects {
  state;
  updateFn;
  constructor(state: AuthState | null, updateFn: (s: AuthState | null) => void) {
    this.state = state;
    this.updateFn = updateFn;
    useEffect(() => {
      const user = localStorage.getItem("auth-user");
      const token = localStorage.getItem("auth-token");
      if (user && token) {
        this.updateFn(new AuthState(user, token));
      }

    }, [this.updateFn])
  }

  setAuth(state: AuthState) {
    localStorage.setItem("auth-user", state.username)
    localStorage.setItem("auth-token", state.username)
    this.updateFn(state)
  }

  removeAuth() {
    localStorage.removeItem("auth-user")
    localStorage.removeItem("auth-token")
    this.updateFn(null);
  }
}

