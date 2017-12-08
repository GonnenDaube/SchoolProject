import {mat4, vec3, vec4} from '/Resources/3DJS/libs/glMatrix/gl-matrix.js';

class Model {
    constructor(vertices, indices, normals, num_vertices, isIndexed, color, mode) {
        this.color = color;
        this.mode = mode;
        this.isIndexed = isIndexed;
        this.numVertices = num_vertices;
        this.vertices = vertices;
        this.indices = indices;
        this.normals = normals;
        this.texCoords = null;
    }

    static createSphereModel(smoothness, gl) {
        var model = new Model(null, null, null, null, null, null, null);
        
        model.vertices = [
          -1.0, 1.0, 1.0,
          1.0, 1.0, 1.0,
          -1.0, -1.0, 1.0,

          1.0,1.0,1.0,
          1.0,-1.0,1.0,
          -1.0,-1.0,1.0,


          -1.0, 1.0, -1.0,
          1.0, 1.0, -1.0,
          -1.0, -1.0, -1.0,

          1.0,1.0,-1.0,
          1.0,-1.0,-1.0,
          -1.0,-1.0,-1.0,


          1.0,1.0,1.0,
          1.0,1.0,-1.0,
          1.0,-1.0,1.0,

          1.0, 1.0, -1.0,
          1.0,-1.0,-1.0,
          1.0,-1.0,1.0,


          -1.0,1.0,1.0,
          -1.0,1.0,-1.0,
          -1.0,-1.0,1.0,

          -1.0, 1.0, -1.0,
          -1.0,-1.0,-1.0,
          -1.0,-1.0,1.0,


          -1.0,1.0,-1.0,
          1.0,1.0,-1.0,
          -1.0,1.0,1.0,

          1.0,1.0,-1.0,
          1.0,1.0,1.0,
          -1.0,1.0,1.0,


          -1.0,-1.0,-1.0,
          1.0,-1.0,-1.0,
          -1.0,-1.0,1.0,

          1.0,-1.0,-1.0,
          1.0,-1.0,1.0,
          -1.0,-1.0,1.0,
        ];

        model.numVertices = model.vertices.length / 3;

        return model;
    }

    static createQuadModel() {
        var model = new Model(null, null, null, null, null, null, null);
        model.vertices = [
            -1.0, 1.0,
            -1.0, -1.0,
            1.0, -1.0,

            -1.0, 1.0,
            1.0, -1.0,
            1.0, 1.0
        ];
        model.texCoords = [
            0.0, 1.0,
            0.0, 0.0,
            1.0, 0.0,

            0.0, 1.0,
            1.0, 0.0,
            1.0, 1.0
        ];
        model.numVertices = 6;
        return model;
    }

    getCurrentIndex() {
        return this.numVertices * 3;
    }
}

export default Model;