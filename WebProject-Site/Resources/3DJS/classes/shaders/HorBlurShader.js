import GLSLProgram from './GLSLProgram.js';

class HorBlurShader extends GLSLProgram {
    constructor(gl) {
        let shader_const = {
            FRAME_VERTEX_SHADER: 'horizontal-vertex-shader',
            FRAME_FRAGMENT_SHADER: 'blur-fragment-shader',
        }
        super(gl, [shader_const.FRAME_VERTEX_SHADER, shader_const.FRAME_FRAGMENT_SHADER]);

        this.setupUniformsStruct(gl);
    }

    setupUniformsStruct(gl) {
        super.uniforms = {
            screenTexture: gl.getUniformLocation(this.shaderProgram, "screenTexture"),
            textureWidth: gl.getUniformLocation(this.shaderProgram, "textureWidth"),
        }
    }
}

export default HorBlurShader;