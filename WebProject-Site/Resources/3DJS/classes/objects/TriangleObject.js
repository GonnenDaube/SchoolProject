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

        this.wiredVAO = null;
        this.wiredPositionVBO = null;
        this.wiredNormalVBO = null;
        this.wiredColorVBO = null;

        this.shader = shader;
        this.wireframeModel = new Model(null, null, null, null, null, null, null);
    }

    draw(mode) {
        this.gl.bindVertexArray(this.VAO)
        if( mode == 'solid' || mode == 'lighting' ){
            if(this.model.numVertices > 2)
                this.gl.drawArrays(this.gl.TRIANGLES, 0, this.model.numVertices - this.model.numVertices % 3);
        }
        else if(mode == 'wireframe'){
            if(this.model.numVertices > 1)
                this.gl.drawArrays(this.gl.LINES, 0, this.model.numVertices - this.model.numVertices % 2);
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

    addVertex(position, color, normal){
        if(this.model.vertices == null){
            this.model.vertices = position;
            this.model.color = color;
            this.model.normals = normal;
            this.wireframeModel.vertices = position;
            this.wireframeModel.color = color;
            this.wireframeModel.normals = normal;
        }
        else{
            if(this.model.vertices.length == 3){//only 1 vertex
                this.wireframeModel.vertices.push(position[0]);
                this.wireframeModel.vertices.push(position[1]);
                this.wireframeModel.vertices.push(position[2]);
                this.wireframeModel.color.push(color[0]);
                this.wireframeModel.color.push(color[1]);
                this.wireframeModel.color.push(color[2]);
                this.wireframeModel.normals.push(normal[0]);
                this.wireframeModel.normals.push(normal[1]);
                this.wireframeModel.normals.push(normal[2]);
            }
            else{//need to double the last vertex in order to create a new line
                this.wireframeModel.vertices.push(this.wireframeModel.vertices[this.wireframeModel.vertices.length - 3]);
                this.wireframeModel.vertices.push(this.wireframeModel.vertices[this.wireframeModel.vertices.length - 2]);
                this.wireframeModel.vertices.push(this.wireframeModel.vertices[this.wireframeModel.vertices.length - 1]);
                this.wireframeModel.color.push(this.wireframeModel.color[this.wireframeModel.color.length - 3]);
                this.wireframeModel.color.push(this.wireframeModel.color[this.wireframeModel.color.length - 2]);
                this.wireframeModel.color.push(this.wireframeModel.color[this.wireframeModel.color.length - 1]);
                this.wireframeModel.normals.push(this.wireframeModel.normals[this.wireframeModel.normals.length - 3]);
                this.wireframeModel.normals.push(this.wireframeModel.normals[this.wireframeModel.normals.length - 2]);
                this.wireframeModel.normals.push(this.wireframeModel.normals[this.wireframeModel.normals.length - 1]);

                this.wireframeModel.vertices.push(position[0]);
                this.wireframeModel.vertices.push(position[1]);
                this.wireframeModel.vertices.push(position[2]);
                this.wireframeModel.color.push(color[0]);
                this.wireframeModel.color.push(color[1]);
                this.wireframeModel.color.push(color[2]);
                this.wireframeModel.normals.push(normal[0]);
                this.wireframeModel.normals.push(normal[1]);
                this.wireframeModel.normals.push(normal[2]);
            }
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

        this.model.numVertices++;

        this.updateBuffers();
    }
}

export default TriangleObject;