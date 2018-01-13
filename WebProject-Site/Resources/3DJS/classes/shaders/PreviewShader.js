import GLSLProgram from './GLSLProgram.js';

class PreviewShader extends GLSLProgram {
    constructor(gl) {
        let shader_const = {
            PREVIEW_VERTEX_SHADER: 'preview-vertex-shader',
            PREVIEW_FRAGMENT_SHADER: 'preview-fragment-shader',
        }
        super(gl, [shader_const.PREVIEW_VERTEX_SHADER, shader_const.PREVIEW_FRAGMENT_SHADER]);

        this.setupUniformsStruct(gl);
    }

    setupUniformsStruct(gl) {
        super.uniforms = {
            vp_matrix: gl.getUniformLocation(this.shaderProgram, "vp_matrix"),
            viewPos: gl.getUniformLocation(this.shaderProgram, "viewPos"),
            m_matrix: gl.getUniformLocation(this.shaderProgram, "m_matrix"),
        }
    }
}

export default PreviewShader;