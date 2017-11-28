class Scene {
    constructor(fpsCounter) {
        this.fpsCounter = fpsCounter;
    }
    updateScene() {
        this.camera.updateMovement(this.fpsCounter.fps);
    }
}