import Object3D from './Object3D.js';
import Model from './Model.js';

class Frame extends Object3D {
    constructor(gl) {
        super(Model.createQuadModel());
        this.gl = gl;
        this.VAO = null;
        this.modelVBO = null;
        this.texCoordVBO = null;
        this.setupOpengl();
    }

    draw() {
        this.gl.bindVertexArray(this.VAO);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.model.numVertices);
        this.gl.bindVertexArray(0);
    }

    setupOpengl() {
        this.VAO = this.gl.createVertexArray();
        this.modelVBO = this.gl.createBuffer();
        this.texCoordVBO = this.gl.createBuffer();

        this.gl.bindVertexArray(this.VAO);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.modelVBO);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.model.vertices, this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(0, 2, this.gl.FLOAT, this.gl.FALSE, 2 * Float32Array.BYTES_PER_ELEMENT, null);
        this.gl.enableVertexAttribArray(0);

        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.model.texCoords, this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(1, 2, this.gl.FLOAT, this.gl.FALSE, 2 * Float32Array.BYTES_PER_ELEMENT, null);
        this.gl.enableVertexAttribArray(1);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        this.gl.bindVertexArray(null);
    }
}

export default Frame;