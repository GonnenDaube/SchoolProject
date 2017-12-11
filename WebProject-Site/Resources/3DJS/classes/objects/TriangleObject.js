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
        this.shader = shader;
    }

    draw() {
        this.gl.bindVertexArray(this.VAO);
        switch(this.model.mode){
            case this.gl.TRIANGLES:
                if(this.model.numVertices > 2)
                    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.model.numVertices - this.model.numVertices % 3);
                break;
            case this.gl.TRIANGLE_STRIP:
                if(this.model.numVertices > 2)
                    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, this.model.numVertices);
                break;
            case this.gl.LINES:
                if(this.model.numVertices > 1)
                    this.gl.drawArrays(this.gl.LINES, 0, this.model.numVertices - this.model.numVertices % 2);
                break;
            case this.gl.LINE_STRIP:
                if(this.model.numVertices > 1)
                    this.gl.drawArrays(this.gl.LINE_STRIP, 0, this.model.numVertices);
                break;
        }
        this.gl.bindVertexArray(null);
    }

    updateBuffers() { //should be called after every change done to mesh (other then transformations)
        this.VAO = this.gl.createVertexArray();
        this.positionVBO = this.gl.createBuffer();
        this.normalVBO = this.gl.createBuffer();
        this.colorVBO = this.gl.createBuffer();

        this.gl.bindVertexArray(this.VAO);

        let positionAttrib = this.gl.getAttribLocation(this.shader.shaderProgram, "positions");
        let normalAttrib = this.gl.getAttribLocation(this.shader.shaderProgram, "normals");
        let colorAttrib = this.gl.getAttribLocation(this.shader.shaderProgram, "colors");

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionVBO);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.model.vertices), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(positionAttrib, 3, this.gl.FLOAT, this.gl.FALSE, 3 * Float32Array.BYTES_PER_ELEMENT, 0);
        this.gl.enableVertexAttribArray(positionAttrib);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.normalVBO);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.model.normals), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(normalAttrib, 3, this.gl.FLOAT, this.gl.FALSE, 3 * Float32Array.BYTES_PER_ELEMENT, 0);
        this.gl.enableVertexAttribArray(normalAttrib);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorVBO);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.model.color), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(colorAttrib, 3, this.gl.FLOAT, this.gl.FALSE, 3 * Float32Array.BYTES_PER_ELEMENT, 0);
        this.gl.enableVertexAttribArray(colorAttrib);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        this.gl.bindVertexArray(null);
    }

    addVertex(position, color, normal, mode){
        if(this.model.vertices == null){
            this.model.vertices = position;
            this.model.color = color;
            this.model.normals = normal;
        }
        else{
            this.model.vertices.push(position[0]);
            this.model.vertices.push(position[1]);
            this.model.vertices.push(position[2]);
            this.model.color.push(color[0]);
            this.model.color.push(color[1]);
            this.model.color.push(color[2]);
            this.model.normals.push(normal[0]);
            this.model.normals.push(normal[1]);
            this.model.normals.push(normal[2]);
        }
        this.model.mode = mode;

        this.model.numVertices++;

        this.updateBuffers();
    }
}

export default TriangleObject;