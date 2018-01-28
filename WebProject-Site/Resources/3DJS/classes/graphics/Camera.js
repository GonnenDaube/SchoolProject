import {mat4, vec4, vec3} from '/Resources/3DJS/libs/glMatrix/gl-matrix.js';

class Camera {
    constructor(camera_const) {
        this.position = camera_const.INITIAL_CAMERA_POSITION;
        this.lookingAt = camera_const.INITIAL_CAMERA_LOOKAT;
        this.lookingUp = camera_const.INITIAL_CAMERA_LOOKUP;
        this.fov = camera_const.FOV;
        this.far = 1000.0;
        this.near = 0.1;
        this.forward = this.backward = this.left = this.right = this.up = this.down = false;
        this.velocity = 20.0;
        this.speed = 0.0;
    }
    getLookAt() {
        let lookAtMat = mat4.create();
        lookAtMat = mat4.lookAt(lookAtMat, this.position, [this.position[0] + this.lookingAt[0], this.position[1] + this.lookingAt[1], this.position[2] + this.lookingAt[2]], this.lookingUp);
        return lookAtMat;
    }
    getPerspective(windowHeight, windowWidth, near, far) {
        let perspectiveMat = mat4.create();
        perspectiveMat = mat4.perspective(perspectiveMat, this.fov, windowWidth / windowHeight, near, far);
        return perspectiveMat;
    }
    getVpMatrix(windowHeight, windowWidth, far_const){
        let mat = mat4.multiply(mat4.create() ,this.getPerspective(windowHeight, windowWidth, this.near, this.far * far_const) , this.getLookAt());
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


        //update html data

        document.getElementById("body_camera_pos").value = this.position;
        document.getElementById("body_looking_at").value = this.lookingAt;
    }

    convert2DpointTo3Dpoint(point, distance, viewportSize){
        let x =   (2.0 * point[0] / viewportSize[0] - 1.0);
        let y = - (2.0 * point[1] / viewportSize[1] - 1.0);

        let mat = this.getVpMatrix(viewportSize[1], viewportSize[0], 0.001 * distance);

        let matInverse = mat4.invert(mat4.create(), mat);

        let uvPoint = [x, y, 1, 1];

        let worldPoint = vec4.transformMat4(vec4.create(), uvPoint, matInverse);

        let point3d = [worldPoint[0] / worldPoint[3], worldPoint[1] / worldPoint[3], worldPoint[2] / worldPoint[3]];

        return point3d;
    }
}

export default Camera;