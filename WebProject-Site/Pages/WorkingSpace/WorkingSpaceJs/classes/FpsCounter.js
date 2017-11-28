class FpsCounter {
    constructor() {
        this.curTime = this.privTime = new Date().getTime();
        this.delta = this.fps = 0;
    }
    updateFps() {
        this.privTime = this.curTime;
        this.curTime = new Date().getTime();
        this.delta = this.curTime - this.privTime;
        this.fps = 1 / this.delta;
    }
}