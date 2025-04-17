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

export type CreateGameRequest = {
  question: string
  answer1: string
  answer2: string
  location: string
}

export type JoinGameRequest = {
  code: string  
}

export type ActiveGameResponse = {
  question: string,
  answer1: string,
  answer2: string,
  code: string,
  serverUrl: string,
}

export type GameOutcome = {
  question: string,
  answer1: string,
  answer2: string,
  location: string,
  winner1: boolean,
}
