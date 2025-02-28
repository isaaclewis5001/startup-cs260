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
  gl: WebGL2RenderingContext;
  private shouldStop: boolean;

  private bg: Background;

  constructor(primaryContext: WebGL2RenderingContext) {
    this.gl = primaryContext;
    this.shouldStop = false;
    this.bg = new Background(this);

    frameLoop(this);
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

  renderFrame(_deltaTime: number): boolean {
    this.bg.render(this);
    return !this.shouldStop;
  }

  loadShader(kind: GLenum, source: string): WebGLShader {
    const shader = this.gl.createShader(kind);
    if (!shader) {
      throw new Error("failed to create shader");
    }
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      const err = this.gl.getShaderInfoLog(shader);
      throw new Error(`shader error:\n${err}`);
    }
    return shader;
  }

  createShaderProg(shaders: WebGLShader[]): WebGLProgram {
    const prog = this.gl.createProgram();
    if (!prog) {
      throw new Error("failed to create shader program");
    }
    for (const shader of shaders) {
      this.gl.attachShader(prog, shader);
    }
    this.gl.linkProgram(prog);
    if (!this.gl.getProgramParameter(prog, this.gl.LINK_STATUS)) {
      const err = this.gl.getProgramInfoLog(prog);
      throw new Error(`shader link error:\n${err}`);
    }
    return prog;
  }
}

class KBController implements KeyboardController {
  keyStates = {};
  
  keyDown(event: KeyboardEvent): boolean {
    console.log(event.code);
    return false;
  }
  keyUp(_event: KeyboardEvent): boolean {
    return false;
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


class Background {
  private shaderTestBG: WebGLProgram;
  private vxBuffer: WebGLBuffer;
  private vxBufferAttrLoc: GLint;

  constructor(game: JungleGameState) {
    const shaderVertTestBG = game.loadShader(game.gl.VERTEX_SHADER,
      `# version 300 es
      
      in vec2 position;
      out vec2 frag_position;
      
      void main() {
        frag_position = position;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `);
    const shaderFragTestBG = game.loadShader(game.gl.FRAGMENT_SHADER,
      `# version 300 es
      precision highp float;

      out vec4 fragColor;

      in vec2 frag_position;
      void main() {
        fragColor = vec4(0.0, 0.58 + frag_position.x * 0.1, 0.86 - mod(frag_position.y, 0.1f), 1.0);
      }
    `);

    this.shaderTestBG = game.createShaderProg([shaderVertTestBG, shaderFragTestBG]);
    this.vxBufferAttrLoc = game.gl.getAttribLocation(this.shaderTestBG, "position");
    const vxBuffer = game.gl.createBuffer()
    if (!vxBuffer) {
      throw new Error("could not create buffer");
    }
    this.vxBuffer = vxBuffer;

    const vbuf = new Float32Array([
      -1.0, -1.0, 
      -1.0, 1.0,
      1.0, -1.0,
      1.0, -1.0,
      -1.0, 1.0,
      1.0, 1.0
    ]);
    
    game.gl.bindBuffer(game.gl.ARRAY_BUFFER, this.vxBuffer);
    game.gl.bufferData(game.gl.ARRAY_BUFFER, vbuf, game.gl.STATIC_DRAW);

    game.gl.enableVertexAttribArray(this.vxBufferAttrLoc);
    game.gl.vertexAttribPointer(this.vxBufferAttrLoc, 2, game.gl.FLOAT, false, 0, 0);
  }

  render(game: JungleGameState) {
    game.gl.useProgram(this.shaderTestBG);
    game.gl.drawArrays(game.gl.TRIANGLES, 0, 6);
  }
}



