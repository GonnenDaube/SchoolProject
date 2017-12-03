import {mat4} from '/Pages/WorkingSpace/WorkingSpaceJs/libs/glMatrix/gl-matrix.js';

class Object3D {
    constructor(model) {
        this.position = [0, 0, 0];
        this.rotation = [0, 0, 0];
        this.scale = [0, 0, 0];
        this.model = model;
    }

    getTransformation() {
        let transform;
        transform = mat4.rotate(transform, this.rotation);
        transform = mat4.scale(transform, this.scale);
        transform = mat4.translate(transform, this.position);
        return transform;
    }
}

export default Object3D;