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

    static createSphereModel(smoothness) {
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

    static createLineModel(point1, point2, color){
        var model = new Model(null, null, null, null, null, null, null);
        model.vertices = [
            point1[0], point1[1], point1[2],
            point2[0], point2[1], point2[2]
        ];
        model.color = [
            color[0], color[1], color[2],
            color[0], color[1], color[2]
        ];
        model.numVertices = 2;
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