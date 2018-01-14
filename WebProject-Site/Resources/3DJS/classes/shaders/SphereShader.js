import GLSLProgram from './GLSLProgram.js';

class SphereShader extends GLSLProgram {
    constructor(gl) {
        let shader_const = {
            SPHERE_VERTEX_SHADER: 'sphere-vertex-shader',
            SPHERE_FRAGMENT_SHADER: 'sphere-fragment-shader',
        }
        super(gl, [shader_const.SPHERE_VERTEX_SHADER, shader_const.SPHERE_FRAGMENT_SHADER]);

        this.setupUniformsStruct(gl);
    }

    setupUniformsStruct(gl) {
        super.uniforms = {
            vp_matrix: gl.getUniformLocation(this.shaderProgram, "vp_matrix"),
            viewPos: gl.getUniformLocation(this.shaderProgram, "viewPos"),
            m_matrix: gl.getUniformLocation(this.shaderProgram, "m_matrix"),
            rotation_matrix: gl.getUniformLocation(this.shaderProgram, "rotation_matrix"),
        }
    }
}

export default SphereShader;