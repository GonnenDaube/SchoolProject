import {mat4} from '/Resources/3DJS/libs/glMatrix/gl-matrix.js';

class Object3D {
    constructor(model) {
        this.position = [0, 0, 0];
        this.rotation = [0, 0, 0];// vector of 3 angles (each for each axis)
        this.scale = [1, 1, 1];
        this.model = model;
    }

    getTransformation() {
        let transform = mat4.create();
        transform = mat4.translate(transform, transform, this.position);
        transform = mat4.rotate(transform, transform, this.rotation[0], [1, 0, 0]);
        transform = mat4.rotate(transform, transform, this.rotation[1], [0, 1, 0]);
        transform = mat4.rotate(transform, transform, this.rotation[2], [0, 0, 1]);
        transform = mat4.scale(transform, transform, this.scale);
        return transform;
    }
}

export default Object3D;