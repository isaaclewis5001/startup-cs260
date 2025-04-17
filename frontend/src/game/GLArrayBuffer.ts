

export class GLArrayBuffer {
  buffer: WebGLBuffer
  constructor(gl: WebGL2RenderingContext) {
    const newBuffer = gl.createBuffer();
    if (newBuffer === null) {
      throw new Error("Could not create buffer");
    }
    this.buffer = newBuffer;
  }
}

export class GLArrayBufferAccess {
  gl: WebGL2RenderingContext;
  buffer: WebGLBuffer;

  constructor(buffer: GLArrayBuffer, gl: WebGL2RenderingContext) {
    this.gl = gl;
    this.buffer = buffer.buffer;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
  }

  dataF32(x: Float32Array, scope: GLenum): GLArrayBufferAccess {
    this.gl.bufferData(this.gl.ARRAY_BUFFER, x, scope);
    const err = this.gl.getError();
    if (err !== this.gl.NO_ERROR) {
      throw new Error(`Could not set buffer data (${err})`);
    }
    return this;
  }

  attach(attrib: GLint, size: number, type: GLenum): GLArrayBufferAccess {
    this.gl.vertexAttribPointer(attrib, size, type, false, 0, 0) ;
    return this;
  }
}
