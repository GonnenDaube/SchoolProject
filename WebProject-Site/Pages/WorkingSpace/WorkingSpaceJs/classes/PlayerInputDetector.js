import {mat4, vec4} from '/Pages/WorkingSpace/WorkingSpaceJs/libs/glMatrix/gl-matrix.js';

var key_const = {
    W: 87,
    A: 65,
    S: 83,
    D: 68,
    SPACE: 32,
    SHIFT: 16,
    CTRL: 17,
}

class PlayerInputDetector {
    constructor(scene, display) {
        this.scene = scene;
        this.display = display;
        //this.addMouseMoveEvent(this.mouse_callback(event));
        document.getElementsByTagName("body")[0].setAttribute("onkeydown", "playerInputDetector.key_callback_down(event)");
        document.getElementsByTagName("body")[0].setAttribute("onkeyup", "playerInputDetector.key_callback_up(event)");
        this.cursorPosX = event.clientX;
        this.cursorPosY = event.clientY;
    }
    key_callback_down(event) {
        switch (event.keyCode) {
            case key_const.W:
                console.log("w is pressed");
                this.scene.camera.forward = true;
                break;
            case key_const.S:
                this.scene.camera.backward = true;
                break;
            case key_const.A:
                this.scene.camera.left = true;
                break;
            case key_const.D:
                this.scene.camera.right = true;
                break;
            case key_const.SPACE:
                this.scene.camera.up = true;
                break;
            case key_const.CTRL:
                this.scene.camera.down = true;
                break;
            case key_const.SHIFT:
                this.scene.camera.velocity = 40.0;
                break;
            default:
                break;
        }
    }
    key_callback_up(event) {
        switch (event.keyCode) {
            case key_const.W:
                console.log("w is released");
                this.scene.camera.forward = false;
                break;
            case key_const.S:
                this.scene.camera.backward = false;
                break;
            case key_const.A:
                this.scene.camera.left = false;
                break;
            case key_const.D:
                this.scene.camera.right = false;
                break;
            case key_const.SPACE:
                this.scene.camera.up = false;
                break;
            case key_const.CTRL:
                this.scene.camera.down = false;
                break;
            case key_const.SHIFT:
                this.scene.camera.velocity = 20.0;
                break;
            default:
                break;
        }
    }
    mouse_callback(event) {
        let mat;
        let xpos = event.clientX;
        let ypos = event.clientY;
        let diffX = xpos - this.cursorPosX;
        let diffY = ypos - this.cursorPosY;
        let yaw = Math.acos(vec4.dot(this.scene.camera.lookingAt, [0.0, 1.0, 0.0]));
        if(!((yaw >= 0 && yaw <= glMatrix.toRadian(15.0) && diffY <= 0) || (yaw <= glMatrix.toRadian(180.0) && yaw >= glMatrix.toRadian(165.0) && diffY >= 0))){
            mat = mat4.rotate(mat, atan2(this.scene.camera.lookingAt[0], this.scene.camera.lookingAt[2]), [0.0, 1.0, 0.0]);
            mat = mat4.rotate(mat, radians(-diffY / 10.0), [1.0, 0.0, 0.0]);
            mat = mat4.rotate(mat, -atan2(this.scene.camera.lookingAt[0], this.scene.camera.lookingAt[2]), [0.0, 1.0, 0.0]);
            let v = this.scene.camera.lookingAt;
            v[3] = 1.0;
            v = v * mat;
            this.scene.camera.lookingAt = [v[0], v[1], v[2]];
        }

        mat = mat4.rotate(mat, glMatrix.toRadian(diffX / 10.0), [0.0, 1.0, 0.0]);
        let v2 = this.scene.camera.lookingAt;
        v2[3] = 1.0;
        v2 = v2 * mat;
        this.scene.camera.lookingAt = [v2[0], v2[1], v2[2]];

        this.cursorPosX = xpos;
        this.cursorPosY = ypos;
    }

    addMouseMoveEvent(func) {
        var oldonmousemove = window.onmousemove;
        if (typeof window.onmousemove != 'function') {
            window.onmousemove = func;
        }
        else {
            window.onmousemove = function () {
                if (oldonmousemove) {
                    oldonmousemove();
                }
                func();
            }
        }
    }
}

export default PlayerInputDetector;