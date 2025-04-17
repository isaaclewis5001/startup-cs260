import JungleGameState from "./JungleGameState";
import {Vec2Col} from "../../../shared/game/GameEntities"
import { GLArrayBuffer, GLArrayBufferAccess } from "./GLArrayBuffer";

export class SpritesetRenderer {
  shader;

  uCamPos: WebGLUniformLocation;
  uCamScale: WebGLUniformLocation;
  uUvScale: WebGLUniformLocation;
  uDepth: WebGLUniformLocation;
  uSampler: WebGLUniformLocation;

  aSpritePos: GLint;
  aSpriteScale: GLint;
  aUvPos: GLint;
  aPos: GLint;
  
  bMesh: GLArrayBuffer;
  bPosn: GLArrayBuffer;
  bScale: GLArrayBuffer;
  bUv: GLArrayBuffer;
  
  constructor(game: JungleGameState) {
    const shaderVtx = game.loadVtxShader(
      `# version 300 es

      uniform vec2 camPos;
      uniform vec2 camScale;
      uniform vec2 uvScale;
      uniform float depth;
      
      in vec2 spritePos;
      in vec2 spriteScale;
      in vec2 uvPos;
      in vec2 pos;

      out vec2 uv;
      
      void main() {
        uv = uvPos + uvScale * pos;
        gl_Position = vec4((spriteScale * pos + (spritePos - camPos)) * camScale, depth, 1.0);
      }
    `);

    const shaderFrag = game.loadFragShader(
      `# version 300 es
      precision mediump float;

      uniform sampler2D sampler;

      in vec2 uv;
      out vec4 fragColor;

      void main() {
        fragColor = texture(sampler, uv);
      }
    `);
    this.shader = game.createShaderProg([shaderVtx, shaderFrag]);
    game.gl.useProgram(this.shader);

    this.uCamPos = game.getUniform(this.shader, "camPos");
    this.uCamScale = game.getUniform(this.shader, "camScale");
    this.uUvScale = game.getUniform(this.shader, "uvScale");
    this.uDepth = game.getUniform(this.shader, "depth");
    this.uSampler = game.getUniform(this.shader, "sampler");

    this.aSpritePos = game.getAttribute(this.shader, "spritePos");
    this.aSpriteScale = game.getAttribute(this.shader, "spriteScale");
    this.aUvPos = game.getAttribute(this.shader, "uvPos");
    this.aPos = game.getAttribute(this.shader, "pos");
    
    this.bMesh = new GLArrayBuffer(game.gl);
    new GLArrayBufferAccess(this.bMesh, game.gl)
      .dataF32(new Float32Array([
        -1.0, -1.0, 
        -1.0, 1.0,
        1.0, -1.0,
        1.0, -1.0,
        -1.0, 1.0,
        1.0, 1.0
      ]), game.gl.STATIC_DRAW);

    this.bScale = new GLArrayBuffer(game.gl);
    this.bPosn = new GLArrayBuffer(game.gl);
    this.bUv = new GLArrayBuffer(game.gl);

  }

  render(game: JungleGameState, spritesets: Spriteset[], camPos: [number, number], camScale: [number, number]) {
    game.gl.useProgram(this.shader);
    game.gl.uniform2f(this.uCamPos, camPos[0], camPos[1]);
    game.gl.uniform2f(this.uCamScale, 1.0/camScale[0], 1.0/camScale[1]);
    game.gl.uniform1i(this.uSampler, 0);

    game.gl.enableVertexAttribArray(this.aPos);
    game.gl.enableVertexAttribArray(this.aSpritePos);
    game.gl.enableVertexAttribArray(this.aSpriteScale);
    game.gl.enableVertexAttribArray(this.aUvPos);

    new GLArrayBufferAccess(this.bMesh, game.gl).attach(this.aPos, 2, game.gl.FLOAT);
    game.gl.vertexAttribDivisor(this.aSpritePos, 1);
    game.gl.vertexAttribDivisor(this.aSpriteScale, 1);
    game.gl.vertexAttribDivisor(this.aUvPos, 1);

    for (const spriteset of spritesets) {
      const count = spriteset.posns.count();
      if (count === 0) {
        continue;
      }

      new GLArrayBufferAccess(this.bPosn, game.gl).dataF32(spriteset.posns.array(), game.gl.STREAM_DRAW).attach(this.aSpritePos, 2, game.gl.FLOAT);
      new GLArrayBufferAccess(this.bScale, game.gl).dataF32(spriteset.scales.array(), game.gl.STREAM_DRAW).attach(this.aSpriteScale, 2, game.gl.FLOAT);
      new GLArrayBufferAccess(this.bUv, game.gl).dataF32(spriteset.uvs.array(), game.gl.STREAM_DRAW).attach(this.aUvPos, 2, game.gl.FLOAT);

      game.gl.uniform2f(this.uUvScale, spriteset.uvScale[0], spriteset.uvScale[1]);
      game.gl.uniform1f(this.uDepth, spriteset.depth);
      game.gl.activeTexture(game.gl.TEXTURE0);
      game.gl.bindTexture(game.gl.TEXTURE_2D, spriteset.tex);    

      game.gl.drawArraysInstanced(game.gl.TRIANGLES, 0, 6, count);
    }

    game.gl.disableVertexAttribArray(this.aPos);
    game.gl.disableVertexAttribArray(this.aSpritePos);
    game.gl.disableVertexAttribArray(this.aSpriteScale);
    game.gl.disableVertexAttribArray(this.aUvPos);
  }
}


export class Spriteset {
  posns: Vec2Col;
  scales: Vec2Col;
  uvs: Vec2Col;
  tex: WebGLTexture;
  uvScale: [number, number];
  depth: number;

  constructor(tex: WebGLTexture, posns: Vec2Col, scales: Vec2Col, uvs: Vec2Col, uvScale: [number, number], depth: number) {
    this.tex = tex;
    this.posns = posns;
    this.scales = scales;
    this.uvs = uvs;
    this.uvScale = uvScale;
    this.depth = depth;
  }
}
