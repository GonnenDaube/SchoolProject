class FrameShader extends GLSLProgram {
    constructor(gl) {
        shader_const = {
            FRAME_VERTEX_SHADER: 'frame-vertex-shader',
            FRAME_FRAGMENT_SHADER: 'frame-fragment-shader',
        }
        super(gl, [shader_const.FRAME_VERTEX_SHADER, shader_const.FRAME_FRAGMENT_SHADER]);

        this.setupUniformsStruct(gl);
    }

    setupUniformsStruct(gl) {
        super.uniforms = {
            screenTexture: gl.getUniformLocation(super.shaderProgram, "screenTexture"),
        }
    }
}