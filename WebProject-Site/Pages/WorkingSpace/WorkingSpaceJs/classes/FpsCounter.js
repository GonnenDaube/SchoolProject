class FpsCounter {
    constructor() {
        this.curTime = this.privTime = 0;
        this.delta = this.fps = 0;
    }
    updateFps(timestamp) {
        this.privTime = this.curTime;
        this.curTime = timestamp;
        this.delta = this.curTime - this.privTime;
        this.fps = Math.round(1000 / this.delta);
    }
}

export default FpsCounter;