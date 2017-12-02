class Object3D {
    constructor(model) {
        this.position = [0, 0, 0];
        this.rotation = [0, 0, 0];
        this.scale = [0, 0, 0];
        this.model = model;
    }

    getTransformation() {
        let transform;
        transform = rotate(transform, this.rotation);
        transform = scale(transform, this.scale);
        transform = translate(transform, this.position);
        return transform;
    }
}

export Object3D;