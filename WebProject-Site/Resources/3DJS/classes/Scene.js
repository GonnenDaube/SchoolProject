class Scene {
    constructor(fpsCounter) {
        this.fpsCounter = fpsCounter;
        this.objects = new Array();
        this.camera = null;
        this.selectedObject = null;
        this.counter = 0;
    }
    
    updateScene() {
        this.camera.updateMovement(this.fpsCounter.fps);

        for(let i = 0; i < this.objects.length; i++){
            this.objects[i].rotation = [0, this.counter / this.fpsCounter.fps, 0];
        }
        this.counter++;
    }

    addObject(object3d) {
        this.objects.push(object3d);

        if(this.selectedObject == null){
            this.selectedObject = object3d;
        }
    }
}

export default Scene;