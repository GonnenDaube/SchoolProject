import Object3D from './Object3D.js';
import Model from './Model.js';

class Frame extends Object3D {
    constructor(gl, shader) {
        super(Model.createQuadModel());
        this.gl = gl;
        this.VAO = null;
        this.modelVBO = null;
        this.texCoordVBO = null;
        this.setupOpengl(shader);
    }

    draw() {
        this.gl.bindVertexArray(this.VAO);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.model.numVertices);
        this.gl.bindVertexArray(null);
    }

    setupOpengl(shader) {
        this.VAO = this.gl.createVertexArray();
        this.modelVBO = this.gl.createBuffer();
        this.texCoordVBO = this.gl.createBuffer();

        this.gl.bindVertexArray(this.VAO);

        let positionAttrib = this.gl.getAttribLocation(shader.shaderProgram, "position");
        let texCoordAttrib = this.gl.getAttribLocation(shader.shaderProgram, "texCoords");

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.modelVBO);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.model.vertices), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(positionAttrib, 2, this.gl.FLOAT, this.gl.FALSE, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
        this.gl.enableVertexAttribArray(positionAttrib);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texCoordVBO);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.model.texCoords), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(texCoordAttrib, 2, this.gl.FLOAT, this.gl.FALSE, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
        this.gl.enableVertexAttribArray(texCoordAttrib);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        this.gl.bindVertexArray(null);
    }
}

export default Frame;