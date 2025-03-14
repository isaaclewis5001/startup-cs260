import { KeyboardController, TouchController } from "../game-interface/controllers";
import GameState from "../game-interface/GameState";
import { frameLoop, KBController } from "./JungleGame";
import BackgroundRenderer from "./render/BackgroundRenderer";

export default class JungleGameState implements GameState {
    gl: WebGL2RenderingContext;
    private shouldStop: boolean;

    private bg: BackgroundRenderer;

    constructor(primaryContext: WebGL2RenderingContext) {
        this.gl = primaryContext;
        this.shouldStop = false;
        this.bg = new BackgroundRenderer(this);

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
