import JungleGameState from "./JungleGameState";
import {Vec2Col} from "../../../shared/game/GameEntities"

export class SpritesetRenderer {
  shader;

  uCamPos: WebGLUniformLocation;
  uCamScale: WebGLUniformLocation;
  uBasePos: WebGLUniformLocation;
  uBaseScale: WebGLUniformLocation;
  
  aMesh: 
  
  constructor(game: JungleGameState) {
    const shaderVtx = game.loadShader(game.gl.VERTEX_SHADER,
      `# version 300 es
      in int gl_InstanceID;
      
      uniform vec2 camPos;
      uniform vec2 camScale;
      uniform vec2 basePos;
      uniform vec2 baseScale;
      uniform float depth;
      
      in vec2 position;
      in vec2 uv;
      
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `);

    const shaderFrag = game.loadShader(game.gl.FRAGMENT_SHADER,
      `# version 300 es
      precision highp float;

      uniform sampler2D sampler;

      in vec2 uv;
      out vec4 fragColor;

      void main() {
        fragColor = texture2D(sampler, uv);
      }
    `);
    this.shader = game.createShaderProg([shaderVtx, shaderFrag]);
  }

  render(game: JungleGameState, spritesets: Spriteset[], camPos: [number, number], camScale: [number, number]) {
    game.gl.uniform2f(this.uCamPos, camPos[0], camPos[1]);
    game.gl.uniform2f(this.uCamScale, 1.0/camScale[0], 1.0/camScale[1]);
    for (const spriteset of spritesets) {
      game.gl.activeTexture(game.gl.TEXTURE0);
      game.gl.bindTexture(game.gl.TEXTURE_2D, spriteset.tex);
      game.gl.drawArraysInstanced(game.gl.TRIANGLES, 0, 6, );
    }
  }
}


export class Spriteset {
  posns: Vec2Col;
  scales: Vec2Col;
  uvOffsets: Vec2Col;
  tex: WebGLTexture;

  meshBuf: WebGLBuffer;
  posnBuf: WebGLBuffer;
  scalesBuf: WebGLBuffer;
  baseScale: [number, number];
  basePos: [number, number];

  constructor(game: JungleGameState, tex: WebGLTexture, posns: Vec2Col, scales: Vec2Col, uvOffsets: Vec2Col, baseScale: [number, number], basePos: [number, number]) {
    this.tex = tex;
    this.posns = posns;
    this.scales = scales;
    this.uvOffsets = uvOffsets;

    this.posnBuf = game.createInstancedBuffer();
  }
}
