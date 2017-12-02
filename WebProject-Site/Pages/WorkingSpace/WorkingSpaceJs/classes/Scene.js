class Scene {
    constructor(fpsCounter) {
        this.fpsCounter = fpsCounter;
        this.objects = new Array();
    }
    
    updateScene() {
        this.camera.updateMovement(this.fpsCounter.fps);
    }

    addObject(object3d) {
        this.objects.push(object3d);
    }
}