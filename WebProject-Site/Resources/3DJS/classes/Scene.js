class Scene {
    constructor(fpsCounter) {
        this.fpsCounter = fpsCounter;
        this.objects = new Array();
        this.camera = null;
        this.selectedObject = null;
    }
    
    updateScene() {
        this.camera.updateMovement(this.fpsCounter.fps);

        for(let i = 0; i < this.objects.length; i++){
            this.objects[i].rotation[1] += 1 / this.fpsCounter.fps;
        }
    }

    addObject(object3d) {
        this.objects.push(object3d);

        if(this.selectedObject == null){
            this.selectedObject = object3d;
        }
    }
}

export default Scene;