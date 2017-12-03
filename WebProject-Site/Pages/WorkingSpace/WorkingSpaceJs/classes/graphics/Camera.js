import * from '../libs/glMatrix/gl-matrix.js';

class Camera {
    constructor(position, lookingAt, lookingUp, fov) {
        this.position = position;
        this.lookingAt = lookingAt;
        this.lookingUp = lookingUp;
        this.fov = fov;
        this.forward = this.backward = this.left = this.right = this.up = this.down = false;
        this.velocity = 20.0;
        this.speed = 0.0;
    }
    getLookAt() {
        let lookAtMat = mat4.create();
        lookAtMat = mat4.lookAt(lookAtMat, this.position, this.position + this.lookingAt, this.lookingUp);
        return lookAtMat;
    }
    getPerspective() {
        let perspectiveMat = mat4.create();
        perspectiveMat = mat4.perspective(perspectiveMat, this.fov, 16.0 / 9.0, 0.1, 5000.0);
        return perspectiveMat;
    }
    getVpMatrix() {
        let vpMat = this.getPerspective() * this.getLookAt();
        return vpMat;
    }
    moveForward() {
        let mat = mat4.create();
        mat = mat4.translate(mat, this.lookingAt * this.speed);
        let pos = this.position;
        pos[3] = 1.0;
        pos = pos * mat;
        this.position[0] = pos[0];
        this.position[1] = pos[1];
        this.position[2] = pos[2];
    }
    moveBackward() {
        let mat;
        mat = mat4.translate(mat, this.lookingAt * -this.speed);
        let pos = this.position;
        pos[3] = 1.0;
        pos = pos * mat;
        this.position[0] = pos[0];
        this.position[1] = pos[1];
        this.position[2] = pos[2];
    }
    moveRight() {
        let mat = mat4.create();
        let orthLookAt = vec3.create();
        orthLookAt[0] = this.lookingAt[2];
        orthLookAt[1] = 0.0;
        orthLookAt[2] = this.lookingAt[0] * -1.0;
        orthLookAt = orthLookAt / length(orthLookAt);
        mat = mat4.translate(mat, orthLookAt);
        let pos = this.position;
        pos[3] = this.speed * -1.0;
        pos = pos * mat;
        this.position[0] = pos[0];
        this.position[1] = pos[1];
        this.position[2] = pos[2];
    }
    moveLeft() {
        let mat = mat4.create();
        let orthLookAt = vec3.create();
        orthLookAt[0] = this.lookingAt[2];
        orthLookAt[1] = 0.0;
        orthLookAt[2] = this.lookingAt[0] * -1.0;
        orthLookAt = orthLookAt / length(orthLookAt);
        mat = mat * orthLookAt;
        let pos = this.position;
        pos[3] = this.speed;
        pos = pos * mat;
        this.position[0] = pos[0];
        this.position[1] = pos[1];
        this.position[2] = pos[2];
    }
    moveUp() {
        this.position[1] = this.position[1] + this.speed;
    }
    moveDown() {
        this.position[1] = this.position[1] - this.speed;
    }
    updateMovement(fps) {
        this.speed = this.velocity / fps;
        if (this.forward)
            this.moveForward();
        if (this.backward)
            this.moveBackward();
        if (this.left)
            this.moveLeft();
        if (this.right)
            this.moveRight();
        if (this.up)
            this.moveUp();
        if (this.down)
            this.moveDown();
    }
}

export default Camera;