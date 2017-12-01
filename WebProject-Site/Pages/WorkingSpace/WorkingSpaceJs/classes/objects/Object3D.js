class Object3D {
    constructor() {
        this.position = null;
    }

    getTransformation() {
        let transform = translate(transform, this.position);
        return transform;
    }
}