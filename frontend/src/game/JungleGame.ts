import { ActiveGameResponse } from "../../../shared/api/model";
import { KeyboardController } from "../game-interface/controllers";
import Game from "../game-interface/Game";
import GameResources from "../game-interface/GameResources";
import JungleGameState from "./JungleGameState";

export default class JungleGame implements Game {
  activeGame: ActiveGameResponse;
  constructor(activeGame: ActiveGameResponse) {
    this.activeGame = activeGame;
  }
  
  start(resources: GameResources): JungleGameState | null {
    const code = this.activeGame.code;
    setTimeout(()=>{
      window.alert("Game code: " + code);
    }, 500)
    let primaryCanvas = resources.primaryCanvas();
    if (primaryCanvas === null) {
      return null;
    }
    let primaryContext = primaryCanvas.getContext('webgl2');
    if (primaryContext == null) {
      return null;
    }
    return new JungleGameState(primaryContext, primaryCanvas);
  }
}

export class KBController implements KeyboardController {
  keyStates = {};
  
  keyDown(event: KeyboardEvent): boolean {
    console.log(event.code);
    return false;
  }
  keyUp(_event: KeyboardEvent): boolean {
    return false;
  }
}

export function frameLoop(state: JungleGameState) {
  let oldTimeStamp: number | null = null;
  function frame(timeStamp: number) {
    let deltaTime;
    if (oldTimeStamp === null) {
      deltaTime = 0;
    }
    else {
      deltaTime = timeStamp - oldTimeStamp;
    }
    oldTimeStamp = timeStamp;
    if (state.renderFrame(deltaTime)) {
      requestAnimationFrame(frame);
    }
  }
  requestAnimationFrame(frame);
}









