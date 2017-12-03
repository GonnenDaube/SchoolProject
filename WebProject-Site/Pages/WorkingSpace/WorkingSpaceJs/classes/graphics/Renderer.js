import SphereShader from '../shaders/SphereShader.js';
import FrameShader from '../shaders/FrameShader.js';
import Frame from '../objects/Frame.js';

class Renderer {
    constructor(gl, canvas_const, scene) {
        this.sphereShader = new SphereShader(gl);
        this.frameShader = new FrameShader(gl);
        this.frame = new Frame(gl);
        this.fbo = null;
        this.sceneTexture = null;
        this.rbo = null;
        this.genFrameBuffer(gl, canvas_const);
        this.scene = scene;
    }
    renderSceneToFramebuffer(display, gl) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);

        display.updateCanvas(gl);

        //this section renders spheres using the specific sphere shader
        this.sphereShader.useProgram(gl);
        console.log(this.scene.camera.getVpMatrix());
        gl.uniformMatrix4fv(this.sphereShader.uniforms.vp_matrix, false, this.scene.camera.getVpMatrix());
        gl.uniform3fv(this.sphereShader.uniforms.viewPos, false, this.scene.camera.position);
        this.enableDepthTest();
        for (var i in this.scene.objects) {
            if (i instanceof Sphere) {
                gl.uniformMatrix4fv(this.sphereShader.uniforms.m_matrix, i.getTransformation());
                i.draw();
            }
        }
        this.sphereShader.unUseProgram(gl);
    }
    renderFramebuffertoViewPort(display, gl) {
        gl.bindFrameBuffer(gl.FRAMEBUFFER, 0);

        display.updateCanvas(gl);

        this.frameShader.useProgram(gl);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.sceneTexture);
        gl.uniform1i(this.frameShader.uniforms.screenTexture, 0);
        this.disableDepthTest();
        this.frame.draw();
        this.frameShader.unUseProgram(gl);
    }
    genFrameBuffer(gl, canvas_const) {
        //framebuffer creation
        this.fbo = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);

        //texture creation
        this.sceneTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.sceneTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, canvas_const.WINDOW_WIDTH, canvas_const.WINDOW_HEIGHT, 0, gl.RGB, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        
        //unbind texture
        gl.bindTexture(gl.TEXTURE_2D, null);

        //attaching the texture to the framebuffer
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.sceneTexture, 0);

        //Renderbuffer creation
        gl.createRenderbuffer(1, this.rbo);
        gl.bindRenderbuffer(gl.RENDERBUFFER, this.rbo);

        //RenderBuffer storage
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH24_STENCIL8, gl.RENDERBUFFER, this.rbo);

        //unbind renderbuffer
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);

        //attaching the rbo to the framebuffer
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, this.rbo);

        //framebuffer completeness validation test
        if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) != gl.FRAMEBUFFER_COMPLETE)
            console.warn('ERROR Framebuffer is not complete!');
        //unbind framebuffer
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }
    enableDepthTest(gl) {
        gl.enable(gl.DEPTH_TEST);
    }
    disableDepthTest(gl) {
        gl.disable(gl.DEPTH_TEST);
    }
}

export default Renderer;