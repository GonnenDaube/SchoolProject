import GLSLProgram from './GLSLProgram.js';

class TriangleShader extends GLSLProgram {
    constructor(gl) {
        let shader_const = {
            TRIANGLE_VERTEX_SHADER: 'triangle-vertex-shader',
            TRIANGLE_FRAGMENT_SHADER: 'triangle-fragment-shader',
        }
        super(gl, [shader_const.TRIANGLE_VERTEX_SHADER, shader_const.TRIANGLE_FRAGMENT_SHADER]);

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

export default TriangleShader;