import { KeyboardController, TouchController } from "./controllers";

export default interface GameState {
  init(): Promise<void>;
  getKeyboardController(): KeyboardController | null;
  getTouchController(): TouchController | null;
  stop(): void;
}

