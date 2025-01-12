import { KeyboardController, TouchController } from "./controllers";

export default interface GameState {
  getKeyboardController(): KeyboardController | null
  getTouchController(): TouchController | null
  stop(): void;
}

