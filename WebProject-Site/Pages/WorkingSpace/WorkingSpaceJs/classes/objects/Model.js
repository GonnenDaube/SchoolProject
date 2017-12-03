import * from '../libs/glMatrix/gl-matrix.js';

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
        var ballModel = new Model(null, null, null, null, null, null, null);
        var privRadius = [0.0, 1.0, 0.0];
        var temp = mat4.rotate(mat4.create(), 2 * Math.PI / (smoothness * 2), [1.0, 0.0, 0.0]) * [privRadius[0], privRadius[1], privRadius[2], 1.0];
        var curRadius = [temp[0], temp[1], temp[2]];
        var privRing = ballModel.createRing([0.0, curRadius[1], 0.0], [0.0, 1.0, 0.0], smoothness, Math.abs(curRadius[2]));
        var curRing = privRing;
        ballModel.addCap(privRadius, privRing, smoothness);

        for (var i = 1; i < smoothness; i++) {
            temp = mat4.rotate(mat4.create(), 2 * Math.PI / (smoothness * 2), [1.0, 0.0, 0.0]) * [curRadius[0], curRadius[1], curRadius[2], 1.0];
            curRadius = [temp[0], temp[1], temp[2]];
            curRing = ballModel.createRing([0.0, curRadius[1], 0.0], [0.0, 1.0, 0.0], smoothness, Math.abs(curRadius[2]));
            ballModel.addRings(privRing, curRing, smoothness);
            privRing = curRing;
        }

        ballModel.addCap([0.0, -1.0, 0.0], curRing, smoothness);
        ballModel.mode = gl.TRIANGLES;

        return ballModel;
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

    addPoint(point) {
        for (var i = 0; i < 3; i++) {
            this.vertices.push(point[i]);
        }
        this.numVertices++;
    }

    addTriangle(p1, p2, p3) {
        this.addPoint(p1);
        this.addPoint(p2);
        this.addPoint(p3);
    }

    addCap(top, ring, pointsNum) {
        for (var i = 0; i < pointsNum - 1; i++) {
            this.addTriangle(ring[i], top, ring[i + 1]);
        }
        this.addTriangle(ring[pointsNum - 1], top, ring[0]);
    }

    addRings(ringA, ringB, pointsNum) {
        for (var i = 0; i < pointsNum - 1; i++) {
            this.addTriangle(ringA[i], ringB[i], ringB[i + 1]);
            this.addTriangle(ringA[i], ringA[i + 1], ringB[i + 1]);
        }
        this.addTriangle(ringA[pointsNum - 1], ringB[pointsNum - 1], ringB[0]);
        this.addTriangle(ringA[pointsNum - 1], ringA[0], ringB[0]);
    }

    createRing(center, normal, smoothness, r) {
        let radius = [normal[0], -normal[2], normal[1]] * r;
        let ring = new Array(smoothness);
        for (var i = 0; i < smoothness; i++) {
            ring[i] = radius + center;
            temp = mat4.rotate(mat4.create(), (2 * Math.PI / smoothness), normal) * [radius[0], radius[1], radius[2], 1.0];
            radius = [temp[0], temp[1], temp[2]];
        }
        return ring;
    }

    getCurrentIndex() {
        return this.numVertices * 3;
    }
}

export default Model;