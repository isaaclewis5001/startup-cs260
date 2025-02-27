

export default class GameResources {
  private _primaryCanvas: HTMLCanvasElement | null;
  private _secondaryCanvas: HTMLCanvasElement | null;

  constructor(primaryCanvas: HTMLCanvasElement | null, secondaryCanvas: HTMLCanvasElement | null) {
    this._primaryCanvas = primaryCanvas;
    this._secondaryCanvas = secondaryCanvas;
  }

  primaryCanvas(): HTMLCanvasElement | null {
    return this._primaryCanvas;
  }

  secondaryCanvas(): HTMLCanvasElement | null {
    return this._secondaryCanvas;
  }  
}


