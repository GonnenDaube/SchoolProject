import Object3D from './Object3D.js';
import Model from './Model.js';

class LineObject extends Object3D {
    constructor(gl, pos1, pos2, color, shader) {
        super(Model.createLineModel(pos1, pos2, color), Model.createLineModel(pos1, pos2, color));
        this.gl = gl;
        this.VAO = null;
        this.positionVBO = null;
        this.colorVBO = null;

        this.shader = shader;

        this.updateBuffers();
    }

    draw() {
        this.gl.bindVertexArray(this.VAO);
        this.gl.drawArrays(this.gl.LINES, 0, this.model.numVertices);
        this.gl.bindVertexArray(null);
    }

    updateBuffers() { //should be called after every change done to mesh (other then transformations)
        this.VAO = this.gl.createVertexArray();
        this.positionVBO = this.gl.createBuffer();
        this.colorVBO = this.gl.createBuffer();

        this.gl.bindVertexArray(this.VAO);

        let positionAttrib = this.gl.getAttribLocation(this.shader.shaderProgram, "positions");
        let colorAttrib = this.gl.getAttribLocation(this.shader.shaderProgram, "colors");

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionVBO);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.model.vertices), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(positionAttrib, 3, this.gl.FLOAT, this.gl.FALSE, 3 * Float32Array.BYTES_PER_ELEMENT, 0);
        this.gl.enableVertexAttribArray(positionAttrib);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorVBO);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.model.color), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(colorAttrib, 3, this.gl.FLOAT, this.gl.FALSE, 3 * Float32Array.BYTES_PER_ELEMENT, 0);
        this.gl.enableVertexAttribArray(colorAttrib);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        this.gl.bindVertexArray(null);
    }
}

export default LineObject;