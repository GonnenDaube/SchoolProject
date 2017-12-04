import {mat4, vec4, vec3} from '/Pages/WorkingSpace/WorkingSpaceJs/libs/glMatrix/gl-matrix.js';

class Camera {
    constructor(camera_const) {
        this.position = camera_const.INITIAL_CAMERA_POSITION;
        this.lookingAt = camera_const.INITIAL_CAMERA_LOOKAT;
        this.lookingUp = camera_const.INITIAL_CAMERA_LOOKUP;
        this.fov = camera_const.FOV;
        this.forward = this.backward = this.left = this.right = this.up = this.down = false;
        this.velocity = 20.0;
        this.speed = 0.0;
    }
    getLookAt() {
        let lookAtMat = mat4.create();
        lookAtMat = mat4.lookAt(lookAtMat, this.position, [this.position[0] + this.lookingAt[0], this.position[1] + this.lookingAt[1], this.position[2] + this.lookingAt[2]], this.lookingUp);
        return lookAtMat;
    }
    getPerspective() {
        let perspectiveMat = mat4.create();
        perspectiveMat = mat4.perspective(perspectiveMat, this.fov, 16.0 / 9.0, 0.1, 5000.0);
        return perspectiveMat;
    }
    getVpMatrix() {
        let mat = mat4.multiply(mat4.create() ,this.getPerspective() , this.getLookAt());
        return mat;
    }
    moveForward() {
        let mat = mat4.create();
        mat = mat4.translate(mat, mat, [this.lookingAt[0] * this.speed, this.lookingAt[1] * this.speed, this.lookingAt[2] * this.speed]);
        let pos = this.position;
        pos[3] = 1.0;
        pos = vec4.transformMat4(pos, pos, mat);
        this.position[0] = pos[0];
        this.position[1] = pos[1];
        this.position[2] = pos[2];
        this.position.splice(3,1);
        console.log(this.position);
    }
    moveBackward() {
        let mat = mat4.create();
        mat = mat4.translate(mat, mat, [this.lookingAt[0] * -this.speed, this.lookingAt[1] * -this.speed, this.lookingAt[2] * -this.speed]);
        let pos = this.position;
        pos[3] = 1.0;
        pos = vec4.transformMat4(pos, pos, mat);
        this.position[0] = pos[0];
        this.position[1] = pos[1];
        this.position[2] = pos[2];
        this.position.splice(3,1);
        console.log(this.position);
    }
    moveRight() {
        let mat = mat4.create();
        let orthLookAt = vec3.create();
        orthLookAt[0] = this.lookingAt[2];
        orthLookAt[1] = 0.0;
        orthLookAt[2] = this.lookingAt[0] * -1.0;
        orthLookAt = [orthLookAt[0] / vec3.length(orthLookAt), orthLookAt[1] / vec3.length(orthLookAt), orthLookAt[2] / vec3.length(orthLookAt)];
        mat = mat4.translate(mat, mat, orthLookAt);
        let pos = this.position;
        pos[3] = this.speed * -1.0;
        pos = vec4.transformMat4(pos, pos, mat);
        this.position[0] = pos[0];
        this.position[1] = pos[1];
        this.position[2] = pos[2];
        this.position.splice(3,1);
        console.log(this.position);
    }
    moveLeft() {
        let mat = mat4.create();
        let orthLookAt = vec3.create();
        orthLookAt[0] = this.lookingAt[2];
        orthLookAt[1] = 0.0;
        orthLookAt[2] = this.lookingAt[0] * -1.0;
        orthLookAt = [orthLookAt[0] / vec3.length(orthLookAt), orthLookAt[1] / vec3.length(orthLookAt), orthLookAt[2] / vec3.length(orthLookAt)];
        mat = mat4.translate(mat, mat, orthLookAt);
        let pos = this.position;
        pos[3] = this.speed;
        pos = vec4.transformMat4(pos, pos, mat);
        this.position[0] = pos[0];
        this.position[1] = pos[1];
        this.position[2] = pos[2];
        this.position.splice(3,1);
        console.log(this.position);
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