﻿class Scene {
    constructor(fpsCounter) {
        this.fpsCounter = fpsCounter;
        this.objects = new Array();
        this.camera = null;
        this.mainObject = null;
    }
    
    updateScene(onDisplay) {
        this.camera.updateMovement(this.fpsCounter.fps);

        if(onDisplay){
            for(let i = 0; i < this.objects.length; i++){
                this.objects[i].rotation[1] += 1 / this.fpsCounter.fps;
            }
            if(this.mainObject != null)
                this.mainObject.rotation[1] += 1 / this.fpsCounter.fps;
        }
    }

    addObject(object3d) {
        this.objects.push(object3d);
    }
}

export default Scene;