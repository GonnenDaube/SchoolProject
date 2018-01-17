import {mat4, vec4, glMatrix, vec3} from '/Resources/3DJS/libs/glMatrix/gl-matrix.js';

var key_const = {
    W: 87,
    A: 65,
    S: 83,
    D: 68,
    SPACE: 32,
    SHIFT: 16,
    C: 67,
    ESC: 27,
}

class PlayerInputDetector {
    constructor(scene, display) {
        this.scene = scene;
        this.display = display;
        this.cursorPosX = null;
        this.cursorPosY = null;
        this.first = true;
        this.isPaused = false;
        this.mouseRotation = false;
        this.selector = false;
        this.removePauseLabel();
        this.clickPos = null;
        this.previewPoint = false;
    }
    key_callback_down(event) {
        switch (event.keyCode) {
            case key_const.W:
                if(!this.isPaused)
                this.scene.camera.forward = true;
                break;
            case key_const.S:
                if(!this.isPaused)
                this.scene.camera.backward = true;
                break;
            case key_const.A:
                if(!this.isPaused)
                this.scene.camera.left = true;
                break;
            case key_const.D:
                if(!this.isPaused)
                this.scene.camera.right = true;
                break;
            case key_const.SPACE:
                if(!this.isPaused)
                this.scene.camera.up = true;
                break;
            case key_const.C:
                if(!this.isPaused)
                this.scene.camera.down = true;
                break;
            case key_const.SHIFT:
                if(!this.isPaused)
                this.scene.camera.velocity = 40.0;
                break;
            case key_const.ESC:
                this.isPaused = true;
                this.addPauseLabel();
                break;
            default:
                break;
        }
    }
    key_callback_up(event) {
        switch (event.keyCode) {
            case key_const.W:
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
            case key_const.C:
                this.scene.camera.down = false;
                break;
            case key_const.SHIFT:
                this.scene.camera.velocity = 20.0;
                break;
            default:
                break;
        }
    }

    setMousePosition(event){
        this.cursorPosX = event.clientX;
        this.cursorPosY = event.clientY;
    }

    updateSelector(selector){
        let width = this.cursorPosX - this.clickPos[0];
        let height = this.cursorPosY - this.clickPos[1];
        if(width >= 0){
            selector.style.width = width + "px"; 
        }
        else{
            selector.style.left = (this.clickPos[0] + width) + "px"; 
            selector.style.width = (-width) + "px"; 
        }
        if(height >= 0){
            selector.style.height = height + "px"; 
        }
        else{
            selector.style.top = (this.clickPos[1] + height) + "px"; 
            selector.style.height = (-height) + "px"; 
        }
    }

    mouse_callback(event) {
        let mat = mat4.create();
        let xpos = event.clientX;
        let ypos = event.clientY;
        let diffX = xpos - this.cursorPosX;
        let diffY = ypos - this.cursorPosY;
        let yaw = Math.acos(vec3.dot(this.scene.camera.lookingAt, [0.0, 1.0, 0.0]));
        if(!((yaw >= 0 && yaw <= glMatrix.toRadian(15.0) && diffY <= 0) || (yaw <= glMatrix.toRadian(180.0) && yaw >= glMatrix.toRadian(165.0) && diffY >= 0))){
            let angle = Math.atan2(this.scene.camera.lookingAt[0], this.scene.camera.lookingAt[2]);
            mat = mat4.rotate(mat, mat, angle, [0.0, 1.0, 0.0]);
            mat = mat4.rotate(mat, mat, glMatrix.toRadian(diffY / 10.0), [1.0, 0.0, 0.0]);
            mat = mat4.rotate(mat, mat, -angle, [0.0, 1.0, 0.0]);

            let v = this.scene.camera.lookingAt.slice();
            v[3] = 1.0;
            v = vec4.transformMat4(v, v, mat);
            this.scene.camera.lookingAt = [v[0], v[1], v[2]];
        }

        mat = mat4.rotate(mat, mat, glMatrix.toRadian(-diffX / 10.0), [0.0, 1.0, 0.0]);

        let v2 = this.scene.camera.lookingAt.slice();
        v2[3] = 1.0;
        v2 = vec4.transformMat4(v2, v2, mat);
        this.scene.camera.lookingAt = [v2[0], v2[1], v2[2]];

        this.cursorPosX = xpos;
        this.cursorPosY = ypos;
    }

    addPauseLabel(){
        document.getElementById("pause-label").style.visibility = 'visible';
    }

    removePauseLabel(){
        document.getElementById("pause-label").style.visibility = 'hidden';
    }

    enableRotation(){
        this.mouseRotation = true;
    }

    disableRotation(){
        this.mouseRotation = false;
    }

    enableSelector(){
        this.selector = true;
    }

    disableSelector(){
        this.selector = false;
    }
}

export default PlayerInputDetector;