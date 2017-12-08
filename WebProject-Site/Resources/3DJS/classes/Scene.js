class Scene {
    constructor(fpsCounter) {
        this.fpsCounter = fpsCounter;
        this.objects = new Array();
        this.camera = null;
    }
    
    updateScene() {
        this.camera.updateMovement(this.fpsCounter.fps);
    }

    addObject(object3d) {
        this.objects.push(object3d);
    }
}

export default Scene;