//import Object3D from './Object3D.js';
//import Model from './Model.js';

class Sphere extends Object3D {
    constructor(gl, radius, position) {
        super(Model.createSphereModel());
        this.radius = radius;
        this.position = position;
        this.scale = [radius, radius, radius];
        this.gl = gl;
        this.VAO = null;
        this.modelVBO = null;
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

        this.gl.bindVertexArray(this.VAO);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.modelVBO);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.model.vertices, this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(0, 3, this.gl.FLOAT, this.gl.FALSE, 3 * Float32Array.BYTES_PER_ELEMENT, null);
        this.gl.enableVertexAttribArray(0);

        this.gl.bindBuffer(0);
        this.gl.bindVertexArray(0);
    }
}

export Sphere;