export default class GameOutcome {
  question: string;
  answer: string;
  settledIn: string;
  id: number;

  constructor(id: number, question: string, answer: string, settledIn: string) {
    this.id = id;
    this.question = question;
    this.answer = answer;
    this.settledIn = settledIn;
  }
}
