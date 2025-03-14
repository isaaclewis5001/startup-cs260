export type CreateUserRequest = {
  username: string,
  password: string,
  email: string,
}

export type LoginRequest = {
  username: string,
  password: string,
}

export type LogoutRequest = {
  token: string,
}

export type SessionResponse = {
  token: string,
  username: string,
}
