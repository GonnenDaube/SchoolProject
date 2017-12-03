class GLSLProgram {
    constructor(gl, shaders) {
        this.shaderProgram = gl.createProgram();

        for (var i = 0; i < shaders.length; i++) {
            gl.attachShader(this.shaderProgram, this.getShader(gl,shaders[i]));
        }

        gl.linkProgram(this.shaderProgram);

        var linked = gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS);

        if (!linked) {
            var lastError = gl.getProgramInfoLog(this.shaderProgram);
            console.warn('ERROR in program linking:' + lastError);

            gl.deleteProgram(this.shaderProgram);
            return null;
        }

        this.uniforms = null;
    }
    useProgram() {
        gl.useProgram(this.shaderProgram);
    }
    unUseProgram() {
        gl.useProgram(0);
    }
    getShader(gl, id) {
        var shaderScript = document.getElementById(id);

        if (!shaderScript) {
            console.warn('ERROR in script element');
            return null;
        }

        var str = "";
        var k = shaderScript.firstChild;

        while (k) {
            if (k.nodeType == 3) {
                str += k.textContent;
            }
            k = k.nextSibling;
        }

        var shader;

        if (shaderScript.type == "x-shader/x-vertex") {
            shader = gl.createShader(gl.VERTEX_SHADER);
        }
        else if (shaderScript.type == "x-shader/x-fragment") {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        }
        else {
            return null;
        }

        gl.shaderSource(shader, str);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.warn(gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
    }
}

export default GLSLProgram;