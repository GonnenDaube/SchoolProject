import SphereShader from '../shaders/SphereShader.js';
import TriangleShader from '../shaders/TriangleShader.js';
import PreviewShader from '../shaders/PreviewShader.js';
import FrameShader from '../shaders/FrameShader.js';
import HorBlurShader from '../shaders/HorBlurShader.js';
import VertBlurShader from '../shaders/VertBlurShader.js';
import Frame from '../objects/Frame.js';
import Sphere from '../objects/Sphere.js';
import TriangleObject from '../objects/TriangleObject.js';

class Renderer {
    constructor(gl, canvas_const, scene) {
        this.sphereShader = new SphereShader(gl);
        this.triangleShader = new TriangleShader(gl);
        this.previewShader = new PreviewShader(gl);
        this.frameShader = new FrameShader(gl);
        this.horBlurShader = new HorBlurShader(gl);
        this.vertBlurShader = new VertBlurShader(gl);
        this.frame = new Frame(gl, this.frameShader);
        this.fbo = null;
        this.sceneTexture = null;
        this.rbo = null;
        this.genFrameBuffer(gl, canvas_const);
        this.genBlurFrameBuffer(gl, canvas_const);
        this.scene = scene;
    }
    renderSceneToFramebuffer(display, gl, mode) {

        gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);

        display.updateCanvas(gl);
        this.enableDepthTest(gl);

        //this section renders spheres using the specific sphere shader
        this.sphereShader.useProgram(gl);
        gl.uniformMatrix4fv(this.sphereShader.uniforms.vp_matrix, false, new Float32Array(this.scene.camera.getVpMatrix(display.height, display.width)));
        gl.uniform3fv(this.sphereShader.uniforms.viewPos, new Float32Array(this.scene.camera.position));
        for (let i of this.scene.objects) {
            if (i instanceof Sphere) {
                gl.uniformMatrix4fv(this.sphereShader.uniforms.m_matrix, false, new Float32Array(i.getTransformation()));
                i.draw();
            }
        }
        this.sphereShader.unUseProgram(gl);

        //this section renders triangle objects using the specific triangle object shader
        this.triangleShader.useProgram(gl);

        gl.uniformMatrix4fv(this.triangleShader.uniforms.vp_matrix, false, new Float32Array(this.scene.camera.getVpMatrix(display.height, display.width)));
        gl.uniform3fv(this.triangleShader.uniforms.viewPos, new Float32Array(this.scene.camera.position));
        for (let i of this.scene.objects) {
            if (i instanceof TriangleObject) {
                gl.uniformMatrix4fv(this.triangleShader.uniforms.m_matrix, false, new Float32Array(i.getTransformation()));
                i.draw(mode);
            }
        }
        if(this.scene.main != null){
            gl.uniformMatrix4fv(this.triangleShader.uniforms.m_matrix, false, new Float32Array(this.scene.main.getTransformation()));
            this.scene.main.draw(mode);
        }

        this.previewShader.useProgram(gl);

        gl.uniformMatrix4fv(this.previewShader.uniforms.vp_matrix, false, new Float32Array(this.scene.camera.getVpMatrix(display.height, display.width)));
        gl.uniform3fv(this.previewShader.uniforms.viewPos, new Float32Array(this.scene.camera.position));

        if(this.scene.previewObject != null){
            gl.uniformMatrix4fv(this.previewShader.uniforms.m_matrix, false, new Float32Array(this.scene.previewObject.getTransformation()));
            this.scene.previewObject.draw();
        }
    }
    renderFramebuffertoViewPort(display, gl) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        this.frameShader.useProgram(gl);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.sceneTexture);
        gl.uniform1i(this.frameShader.uniforms.screenTexture, 0);
        this.disableDepthTest(gl);
        this.frame.draw();
        this.frameShader.unUseProgram(gl);
    }

    addBlurEffect(display, gl){
        this.verticalBlur(display, gl);

        this.horizontalBlur(display, gl);
    }

    horizontalBlur(display, gl){
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);

        this.horBlurShader.useProgram(gl);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.blurTexture);
        gl.uniform1i(this.horBlurShader.uniforms.screenTexture, 0);
        gl.uniform1f(this.horBlurShader.uniforms.textureWidth, display.width);
        this.disableDepthTest(gl);
        this.frame.draw();
        this.horBlurShader.unUseProgram(gl);
    }

    verticalBlur(display, gl){
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.blurFBO);

        this.vertBlurShader.useProgram(gl);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.sceneTexture);
        gl.uniform1i(this.vertBlurShader.uniforms.screenTexture, 0);
        gl.uniform1f(this.vertBlurShader.uniforms.textureHeight, display.height);
        this.disableDepthTest(gl);
        this.frame.draw();
        this.vertBlurShader.unUseProgram(gl);
    }

    genFrameBuffer(gl, canvas_const) {
        //framebuffer creation
        this.fbo = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);

        //texture creation
        this.sceneTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.sceneTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, canvas_const.WINDOW_WIDTH * window.innerWidth, canvas_const.WINDOW_HEIGHT * window.innerWidth, 0, gl.RGB, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        
        //unbind texture
        gl.bindTexture(gl.TEXTURE_2D, null);

        //attaching the texture to the framebuffer
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.sceneTexture, 0);

        //Renderbuffer creation
        this.rbo = gl.createRenderbuffer();

        gl.bindRenderbuffer(gl.RENDERBUFFER, this.rbo);

        //RenderBuffer storage
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH24_STENCIL8, canvas_const.WINDOW_WIDTH * window.innerWidth, canvas_const.WINDOW_HEIGHT * window.innerWidth);

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

    genBlurFrameBuffer(gl, canvas_const){
        //framebuffer creation
        this.blurFBO = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.blurFBO);

        //texture creation
        this.blurTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.blurTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, canvas_const.WINDOW_WIDTH * window.innerWidth, canvas_const.WINDOW_HEIGHT * window.innerWidth, 0, gl.RGB, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        
        //unbind texture
        gl.bindTexture(gl.TEXTURE_2D, null);

        //attaching the texture to the framebuffer
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.blurTexture, 0);

        //Renderbuffer creation
        this.blurRBO = gl.createRenderbuffer();

        gl.bindRenderbuffer(gl.RENDERBUFFER, this.blurRBO);

        //RenderBuffer storage
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH24_STENCIL8, canvas_const.WINDOW_WIDTH * window.innerWidth, canvas_const.WINDOW_HEIGHT * window.innerWidth);

        //unbind renderbuffer
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);

        //attaching the rbo to the framebuffer
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, this.blurRBO);

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