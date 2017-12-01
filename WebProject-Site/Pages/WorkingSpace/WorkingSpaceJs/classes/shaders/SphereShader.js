class SphereShader extends GLSLProgram {
    constructor(gl) {
        shader_const = {
            SPHERE_VERTEX_SHADER: 'sphere-vertex-shader',
            SPHERE_FRAGMENT_SHADER: 'sphere-fragment-shader',
        }
        super(gl, [shader_const.SPHERE_VERTEX_SHADER, shader_const.SPHERE_FRAGMENT_SHADER]);

        this.setupUniformsStruct(gl);
    }

    setupUniformsStruct(gl) {
        super.uniforms = {
            vp_matrix: gl.getUniformLocation(super.shaderProgram, "vp_matrix"),
            viewPos: gl.getUniformLocation(super.shaderProgram, "viewPos"),
        }
    }
}