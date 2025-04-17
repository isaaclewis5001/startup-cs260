import { GLArrayBuffer, GLArrayBufferAccess } from "./GLArrayBuffer";
import JungleGameState from "./JungleGameState";

export default class BackgroundRenderer {
  private shader: WebGLProgram;
  private vxBuffer: GLArrayBuffer;
  private vxBufferAttrLoc: GLint;

  constructor(game: JungleGameState) {
    const shaderVtx = game.loadVtxShader(
      `# version 300 es
      
      in vec2 position;
      out vec2 frag_position;
      
      void main() {
        frag_position = position;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `);
    const shaderFrag = game.loadFragShader(
      `# version 300 es
      precision highp float;

      out vec4 fragColor;

      in vec2 frag_position;
      void main() {
        fragColor = vec4(0.4,0.7,0.2,1.0);
      }
    `);

    this.shader = game.createShaderProg([shaderVtx, shaderFrag]);
    game.gl.useProgram(this.shader);
    this.vxBufferAttrLoc = game.getAttribute(this.shader, "position");
    this.vxBuffer = new GLArrayBuffer(game.gl);

    new GLArrayBufferAccess(this.vxBuffer, game.gl).dataF32(new Float32Array([
      -1.0, -1.0, 
      -1.0, 1.0,
      1.0, -1.0,
      1.0, -1.0,
      -1.0, 1.0,
      1.0, 1.0
    ]), game.gl.STATIC_DRAW);
  }

  render(game: JungleGameState) {
    game.gl.useProgram(this.shader);
    game.gl.enableVertexAttribArray(this.vxBufferAttrLoc);
    game.gl.vertexAttribDivisor(this.vxBufferAttrLoc, 0);
    new GLArrayBufferAccess(this.vxBuffer, game.gl).attach(this.vxBufferAttrLoc, 2, game.gl.FLOAT);
    game.gl.drawArrays(game.gl.TRIANGLES, 0, 6);
    game.gl.disableVertexAttribArray(this.vxBufferAttrLoc);
  }
}
