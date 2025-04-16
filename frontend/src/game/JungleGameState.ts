import { KeyboardController, TouchController } from "../game-interface/controllers";
import GameState from "../game-interface/GameState";
import { frameLoop, KBController } from "./JungleGame";
import BackgroundRenderer from "./BackgroundRenderer";
import { SpritesetRenderer } from "./SpritesheetRenderer";
import { Monkeys } from "../../../shared/game/GameEntities";

export default class JungleGameState implements GameState {
    gl: WebGL2RenderingContext;
    private shouldStop: boolean;

    private bg: BackgroundRenderer;
    private sprites: SpritesetRenderer;
    private monkeys: Monkeys;
    
    constructor(primaryContext: WebGL2RenderingContext) {
        this.gl = primaryContext;
        this.shouldStop = false;
        this.bg = new BackgroundRenderer(this);
        this.sprites = new SpritesetRenderer(this);
        this.monkeys = new Monkeys();
        
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
        this.sprites.render(this);
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

    loadVtxShader(source: string): WebGLShader {
        return this.loadShader(this.gl.VERTEX_SHADER, source);
    }
    
    loadFragShader(source: string): WebGLShader {
        return this.loadShader(this.gl.FRAGMENT_SHADER, source);
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

    loadTexture(path: string): Promise<WebGLTexture> {
        const image = new Image();
        const gl = this.gl;
        return new Promise((res, rej) => {
            const tex = gl.createTexture();
            if (tex === null) {
                rej("could not create texture");
                return;
            }
            image.onload = () => {
                gl.bindTexture(gl.TEXTURE_2D, tex);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_SHORT_5_5_5_1, image);
                res(tex);
            };
            image.src = path;
        });
    }

    createInstancedBuffer(): WebGLBuffer {
        this.gl.createBuffer()
        throw new Error("Method not implemented.");
    }
}
