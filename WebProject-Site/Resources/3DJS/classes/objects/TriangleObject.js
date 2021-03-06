﻿import Object3D from './Object3D.js';
import Model from './Model.js';
import {mat4, vec3, vec4} from '/Resources/3DJS/libs/glMatrix/gl-matrix.js';

class TriangleObject extends Object3D {
    constructor(gl, shader, solidShader) {
        super(new Model(null, null, null, null, null, null, null), new Model(null, null, null, null, null, null, null));
        this.gl = gl;
        this.VAO = null;
        this.positionVBO = null;
        this.normalVBO = null;
        this.colorVBO = null;

        this.solidVAO = null;
        this.solidPositionVBO = null;
        this.solidColorVBO = null;

        this.wiredVAO = null;
        this.wiredPositionVBO = null;
        this.wiredColorVBO = null;

        this.shader = shader;
        this.solidShader = solidShader;
    }

    draw(mode) {
        if(mode == 'solid-mode'){
            this.gl.bindVertexArray(this.solidVAO);
            if(this.model.numVertices > 2)
                this.gl.drawArrays(this.gl.TRIANGLES, 0, this.model.numVertices - this.model.numVertices % 3);
            this.gl.bindVertexArray(null);
        }
        else if(mode == 'lighting-mode'){
            this.gl.bindVertexArray(this.VAO);
            if(this.model.numVertices > 2)
                this.gl.drawArrays(this.gl.TRIANGLES, 0, this.model.numVertices - this.model.numVertices % 3);
            this.gl.bindVertexArray(null);
        }
        else if(mode == 'wireframe-mode'){
            this.gl.bindVertexArray(this.wiredVAO);
            if(this.wireframeModel.numVertices > 5)
                this.gl.drawArrays(this.gl.LINES, 0, this.wireframeModel.numVertices - this.wireframeModel.numVertices % 6);
            this.gl.bindVertexArray(null);
        }
    }

    updateBuffers() { //should be called after every change done to mesh (other then transformations)
        //lighting shader
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

        //solid shader
        this.solidVAO = this.gl.createVertexArray();
        this.solidPositionVBO = this.gl.createBuffer();
        this.solidColorVBO = this.gl.createBuffer();

        this.gl.bindVertexArray(this.solidVAO);

        let solidPositionAttrib = this.gl.getAttribLocation(this.solidShader.shaderProgram, "positions");
        let solidColorAttrib = this.gl.getAttribLocation(this.solidShader.shaderProgram, "colors");

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.solidPositionVBO);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.model.vertices), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(solidPositionAttrib, 3, this.gl.FLOAT, this.gl.FALSE, 3 * Float32Array.BYTES_PER_ELEMENT, 0);
        this.gl.enableVertexAttribArray(solidPositionAttrib);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.solidColorVBO);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.model.color), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(solidColorAttrib, 3, this.gl.FLOAT, this.gl.FALSE, 3 * Float32Array.BYTES_PER_ELEMENT, 0);
        this.gl.enableVertexAttribArray(solidColorAttrib);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        this.gl.bindVertexArray(null);

        //wireframe shader
        this.wiredVAO = this.gl.createVertexArray();
        this.wirePositionVBO = this.gl.createBuffer();
        this.wireColorVBO = this.gl.createBuffer();

        this.gl.bindVertexArray(this.wiredVAO);

        let wirePositionAttrib = this.gl.getAttribLocation(this.solidShader.shaderProgram, "positions");
        let wireColorAttrib = this.gl.getAttribLocation(this.solidShader.shaderProgram, "colors");

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.wirePositionVBO);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.wireframeModel.vertices), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(wirePositionAttrib, 3, this.gl.FLOAT, this.gl.FALSE, 3 * Float32Array.BYTES_PER_ELEMENT, 0);
        this.gl.enableVertexAttribArray(wirePositionAttrib);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.wireColorVBO);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.wireframeModel.color), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(wireColorAttrib, 3, this.gl.FLOAT, this.gl.FALSE, 3 * Float32Array.BYTES_PER_ELEMENT, 0);
        this.gl.enableVertexAttribArray(wireColorAttrib);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        this.gl.bindVertexArray(null);
    }

    addVertex(position, color, normal){
        if(this.model.vertices == null){
            this.model.vertices = [position[0], position[1], position[2]];
            this.model.color = [color[0], color[1], color[2]];
            this.model.normals = [normal[0], normal[1], normal[2]];
            this.wireframeModel.vertices = [position[0], position[1], position[2]];
            this.wireframeModel.color = [color[0], color[1], color[2]];

            this.model.numVertices = 1;
            this.wireframeModel.numVertices = 1;
        }
        else{
            if(this.model.vertices.length % 9 <= 3){//0 or 1 vertex
                this.wireframeModel.vertices.push(position[0]);
                this.wireframeModel.vertices.push(position[1]);
                this.wireframeModel.vertices.push(position[2]);
                this.wireframeModel.color.push(color[0]);
                this.wireframeModel.color.push(color[1]);
                this.wireframeModel.color.push(color[2]);

                this.wireframeModel.numVertices++;
            }
            else if(this.model.vertices.length % 9 == 6){//connect all 3 points into 3 lines
                //add 2nd vertex
                this.wireframeModel.vertices.push(this.model.vertices[this.model.vertices.length - 3]);
                this.wireframeModel.vertices.push(this.model.vertices[this.model.vertices.length - 2]);
                this.wireframeModel.vertices.push(this.model.vertices[this.model.vertices.length - 1]);
                this.wireframeModel.color.push(this.model.color[this.model.color.length - 3]);
                this.wireframeModel.color.push(this.model.color[this.model.color.length - 2]);
                this.wireframeModel.color.push(this.model.color[this.model.color.length - 1]);

                this.wireframeModel.numVertices++;

                //add 3rd vertex
                this.wireframeModel.vertices.push(position[0]);
                this.wireframeModel.vertices.push(position[1]);
                this.wireframeModel.vertices.push(position[2]);
                this.wireframeModel.color.push(color[0]);
                this.wireframeModel.color.push(color[1]);
                this.wireframeModel.color.push(color[2]);

                this.wireframeModel.numVertices++;

                //add 3rd vertex
                this.wireframeModel.vertices.push(position[0]);
                this.wireframeModel.vertices.push(position[1]);
                this.wireframeModel.vertices.push(position[2]);
                this.wireframeModel.color.push(color[0]);
                this.wireframeModel.color.push(color[1]);
                this.wireframeModel.color.push(color[2]);

                this.wireframeModel.numVertices++;

                //add 1st vertex
                this.wireframeModel.vertices.push(this.model.vertices[this.model.vertices.length - 6]);
                this.wireframeModel.vertices.push(this.model.vertices[this.model.vertices.length - 5]);
                this.wireframeModel.vertices.push(this.model.vertices[this.model.vertices.length - 4]);
                this.wireframeModel.color.push(this.model.color[this.model.color.length - 6]);
                this.wireframeModel.color.push(this.model.color[this.model.color.length - 5]);
                this.wireframeModel.color.push(this.model.color[this.model.color.length - 4]);

                this.wireframeModel.numVertices++;
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

            this.model.numVertices++;
        }

        this.updateBuffers();
    }

    updateNormal(){

        //get two vectors from triangle 
        let arr = this.model.vertices;
        let length = this.model.vertices.length;
        let vector1 = [arr[length - 3] - arr[length - 6], arr[length - 2] - arr[length - 5], arr[length - 1] - arr[length - 4]];
        let vector2 = [arr[length - 6] - arr[length - 5], arr[length - 4] - arr[length - 9], arr[length - 8] - arr[length - 7]];

        //calculate normal
        let normal = vec3.cross(vec3.create(), vector1, vector2);

        normal = vec3.normalize(normal, normal);

        this.model.normals[length - 9] = normal[0];
        this.model.normals[length - 8] = normal[1];
        this.model.normals[length - 7] = normal[2];

        this.model.normals[length - 6] = normal[0];
        this.model.normals[length - 5] = normal[1];
        this.model.normals[length - 4] = normal[2];

        this.model.normals[length - 3] = normal[0];
        this.model.normals[length - 2] = normal[1];
        this.model.normals[length - 1] = normal[2];
    }
}

export default TriangleObject;