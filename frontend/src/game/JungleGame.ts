import { KeyboardController, TouchController } from "../game-interface/controllers";
import Game from "../game-interface/Game";
import GameResources from "../game-interface/GameResources";
import GameState from "../game-interface/GameState";

export default class JungleGame implements Game {
  start(resources: GameResources): JungleGameState | null {    
    let primaryContext = resources.primaryCanvas()?.getContext('webgl2');
    if (primaryContext == null) {
      return null;
    }
    return new JungleGameState(primaryContext);
  }
}


class JungleGameState implements GameState {
  private primaryContext: WebGL2RenderingContext;
  private shouldStop: boolean;
  private bgAnimationProgress: number;  

  constructor(primaryContext: WebGL2RenderingContext) {
    this.primaryContext = primaryContext;
    this.shouldStop = false;
    this.bgAnimationProgress = 0.0;
    frameLoop(this);
  }

  renderFrame(deltaTime: number): boolean {
    this.bgAnimationProgress += deltaTime;
    this.bgAnimationProgress %= 2000;
    let color;
    if (this.bgAnimationProgress >= 1000) {
      color = (2000 - this.bgAnimationProgress) * 0.001;
    }
    else {
      color = this.bgAnimationProgress * 0.001;
    }
    this.primaryContext.clearColor(color, color, 0.0, 1.0);
    this.primaryContext.clear(this.primaryContext.COLOR_BUFFER_BIT);
    return !this.shouldStop;
  }

  
  getKeyboardController(): KeyboardController | null {
    return new KBController();
  }

  getTouchController(): TouchController | null {
    return null;
  }
  
  stop(): void {
    this.shouldStop = true;
  }
}

function frameLoop(state: JungleGameState) {
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

class KBController implements KeyboardController {
  keyDown(event: KeyboardEvent): boolean {
    console.log(event.code);
    return false;
  }
  keyUp(_event: KeyboardEvent): boolean {
    return false;
  }
}


