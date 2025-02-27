export default class GameOutcome {
  question: string;
  answer: string;
  settledIn: string;

  constructor(question: string, answer: string, settledIn: string) {
    this.question = question;
    this.answer = answer;
    this.settledIn = settledIn;
  }
}
