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
}

export type JoinGameRequest = {
  code: string  
}

export type ActiveGameResponse = {
  question: string,
  answer1: string,
  answer2: string,
  code: string,
  server_url: string,
}

export type GameOutcome = {
  question: string,
  answer1: string,
  answer2: string,
  winner1: boolean,
  location: string,
}
