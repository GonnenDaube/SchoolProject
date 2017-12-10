import Object3D from './Object3D.js';
import Model from './Model.js';

class TriangleObject extends Object3D {
    constructor(gl, shader) {
        super(new Model(null, null, null, null, null, null, null));
        this.gl = gl;
        this.VAO = null;
        this.positionVBO = null;
        this.normalVBO = null;
        this.colorVBO = null;
        this.queuedPositions = Float32Array(9);
        this.queuedColors = Float32Array(9);
        this.queuedNormals = Float32Array(9);
        this.qIndex = 0;
    }

    draw() {
        this.gl.bindVertexArray(this.VAO);
        this.gl.drawArrays(this.model.mode, 0, this.model.numVertices);
        this.gl.bindVertexArray(null);
    }

    updateBuffers(shader) { //should be called after every change done to mesh (other then transformations)
        this.VAO = this.gl.createVertexArray();
        this.positionVBO = this.gl.createBuffer();
        this.normalVBO = this.gl.createBuffer();
        this.colorVBO = this.gl.createBuffer();

        this.gl.bindVertexArray(this.VAO);

        let positionAttrib = this.gl.getAttribLocation(shader.shaderProgram, "positions");
        let normalAttrib = this.gl.getAttribLocation(shader.shaderProgram, "normals");
        let colorAttrib = this.gl.getAttribLocation(shader.shaderProgram, "colors");

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionVBO);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.model.vertices), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(positionAttrib, 3, this.gl.FLOAT, this.gl.FALSE, 3 * Float32Array.BYTES_PER_ELEMENT, 0);
        this.gl.enableVertexAttribArray(positionAttrib);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.normalVBO);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.model.normals), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(normalAttrib, 3, this.gl.FLOAT, this.gl.FALSE, 3 * Float32Array.BYTES_PER_ELEMENT, 0);
        this.gl.enableVertexAttribArray(normalAttrib);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorVBO);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.model.colors), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(colorAttrib, 3, this.gl.FLOAT, this.gl.FALSE, 3 * Float32Array.BYTES_PER_ELEMENT, 0);
        this.gl.enableVertexAttribArray(colorAttrib);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        this.gl.bindVertexArray(null);
    }

    addVertexToQueue(position, color, normal, mode){
        this.queuedPositions[this.qIndex] = position[0];
        this.queuedColors[this.qIndex] = color[0];
        this.queuedNormals[this.qIndex++] = normal[0];

        this.queuedPositions[this.qIndex] = position[1];
        this.queuedColors[this.qIndex] = color[1];
        this.queuedNormals[this.qIndex++] = normal[1];

        this.queuedPositions[this.qIndex] = position[2];
        this.queuedColors[this.qIndex] = color[2];
        this.queuedNormals[this.qIndex++] = normal[2];

        this.model.mode = mode;
    }
}

export default TriangleObject;