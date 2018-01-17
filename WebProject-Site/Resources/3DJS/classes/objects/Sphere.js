import Object3D from './Object3D.js';
import Model from './Model.js';

class Sphere extends Object3D {
    constructor(gl, radius, position, rotation, shader) {
        super(Model.createSphereModel(10), new Model(null, null, null, null, null, null, null));
        this.radius = radius;
        this.position = position;
        this.scale = [radius, radius, radius];
        this.rotation = rotation;
        this.gl = gl;
        this.VAO = null;
        this.modelVBO = null;
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

        this.gl.bindVertexArray(this.VAO);

        let positionAttrib = this.gl.getAttribLocation(shader.shaderProgram, "SphereVertices");

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.modelVBO);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.model.vertices), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(positionAttrib, 3, this.gl.FLOAT, this.gl.FALSE, 3 * Float32Array.BYTES_PER_ELEMENT, 0);
        this.gl.enableVertexAttribArray(positionAttrib);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        this.gl.bindVertexArray(null);
    }
}

export default Sphere;