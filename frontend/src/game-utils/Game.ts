import GameResources from "./GameResources";
import GameState from "./GameState";

export default interface Game {
  start(resources: GameResources): GameState | null
}

