export type GameRecord = {
  question: string
  answer1: string
  answer2: string
  location: string
}

export type ActiveGameRecord = {
  server_url: string,
  code: string,
}

export type GameOutcomeRecord = {
  winner1: boolean
  time: number
}
