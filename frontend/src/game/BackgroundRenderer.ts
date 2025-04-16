import JungleGameState from "./JungleGameState";

export default class BackgroundRenderer {
  private shader: WebGLProgram;
  private vxBuffer: WebGLBuffer;
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
    this.vxBufferAttrLoc = game.gl.getAttribLocation(this.shader, "position");
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
    game.gl.useProgram(this.shader);
    game.gl.drawArrays(game.gl.TRIANGLES, 0, 6);
  }
}
