import { useEffect, useState } from "react";
import AuthState from "../../../model/AuthState";

export default class AuthEffects {
  state;
  __update;
  constructor() {
    [this.state, this.__update] = useState<null | AuthState>(null);
    useEffect(() => {
      const user = localStorage.getItem("auth-user");
      const token = localStorage.getItem("auth-token");
      if (user && token) {
        this.__update(new AuthState(user, token));
      }

    }, [this.__update])
  }

  setAuth(state: AuthState) {
    localStorage.setItem("auth-user", state.username)
    localStorage.setItem("auth-token", state.username)
    this.__update(state)
  }

  removeAuth() {
    localStorage.removeItem("auth-user")
    localStorage.removeItem("auth-token")
    this.__update(null);
  }
}

