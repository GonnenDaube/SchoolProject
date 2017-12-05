import {mat4} from '/Pages/WorkingSpace/WorkingSpaceJs/libs/glMatrix/gl-matrix.js';

class Object3D {
    constructor(model) {
        this.position = [0, 0, 0];
        //this.rotation = [0, 0, 0];
        this.scale = [0, 0, 0];
        this.model = model;
    }

    getTransformation() {
        let transform = mat4.create();
        //transform = mat4.rotate(transform, transform, this.rotation);
        transform = mat4.scale(transform, transform, this.scale);
        transform = mat4.translate(transform, transform, this.position);
        return transform;
    }
}

export default Object3D;