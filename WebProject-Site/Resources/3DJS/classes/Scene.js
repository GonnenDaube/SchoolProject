import {mat4, vec4, vec3} from '/Resources/3DJS/libs/glMatrix/gl-matrix.js';

class Scene {
    constructor(fpsCounter) {
        this.fpsCounter = fpsCounter;
        this.objects = new Array();
        this.camera = null;
        this.main = null;
        this.previewObject = null;
    }
    
    updateScene(onDisplay) {
        this.camera.updateMovement(this.fpsCounter.fps);

        if(onDisplay){
            for(let i = 0; i < this.objects.length; i++){
                this.objects[i].rotation[1] += 1 / this.fpsCounter.fps;
            }
            if(this.main != null)
                this.mainObject.rotation[1] += 1 / this.fpsCounter.fps;
        }
    }

    clickPointInteractions(clickPoint, nonInteractedPoint, size){
        if(this.main != null){
            let mvpMatrix = mat4.multiply(mat4.create(), this.camera.getVpMatrix(size[1], size[0], 0.1), this.main.getTransformation());
            let position;
            let screenPos;
            let click = [(2.0 * clickPoint[0] / size[0] - 1.0), -(2.0 * clickPoint[1] / size[1] - 1.0)];
            for(let i = 0; i <= this.main.model.vertices.length - 2; i += 3){
                //get position from model
                position = [this.main.model.vertices[i], this.main.model.vertices[i + 1], this.main.model.vertices[i + 2], 1];
                
                //transform position
                screenPos = vec4.transformMat4(vec4.create(), position, mvpMatrix);

                screenPos = [screenPos[0] / screenPos[3], screenPos[1] / screenPos[3]];

                //check interaction (distance2d() only cares about the 2 dimensions

                let distance = this.distance2d(click, screenPos);

                if(distance <= 0.05){
                    return [position[0], position[1], position[2]];
                }
            }
        }
        return nonInteractedPoint;
    }

    distance2d(point1, point2){
        let dx = point1[0] - point2[0];
        let dy = point1[1] - point2[1];
        return Math.sqrt(dx * dx + dy * dy);
    }

    addObject(object3d) {
        this.objects.push(object3d);
    }

    addPreviewObject(object3d){
        this.previewObject = object3d;
    }

    deletePreviewObject(){
        this.previewObject = null;
    }

    updateData(){
        if(this.main != null){
            let posVal = document.getElementById("body_model_position_data");
            posVal.innerHTML = this.arrayToString(this.main.model.vertices);

            let colorVal = document.getElementById("body_model_color_data");
            colorVal.innerHTML = this.arrayToString(this.main.model.color);

            let normalVal = document.getElementById("body_model_normal_data");
            normalVal.innerHTML = this.arrayToString(this.main.model.normals);
        }
    }

    arrayToString(arr){
        console.log(arr);
        let val = "" + arr[0];
        for(let i = 1; i< arr.length; i++){
            val += "," + arr[i];
        }
        return val;
    }
}

export default Scene;