<%@ Page Title="" Language="C#" MasterPageFile="~/Pages/MasterPage/MasterPage.master" AutoEventWireup="true" CodeFile="WorkingSpace.aspx.cs" Inherits="Pages_WorkingSpace_WorkingSpace" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" Runat="Server">
    <div id="temp-field" style="display:block; width:10vw;">
        <input id="x-val" type="text" placeholder="x-value" value=""/>
        <input id="y-val" type="text" placeholder="y-value" value=""/>
        <input id="z-val" type="text" placeholder="z-value" value=""/>
        <button id="add-vertex">add-vertex</button>
    </div>
    <div id="left-btn-coll" class="left-btn-coll">
        <button id="triangle-mode" class="btn-left">
            <img id="triangle-icon" src="/Resources/Icons/triangle_icon.png" class="btn-left-icon"/>
            <p class="btn-left-description TrenchFont">
                Triangle Mode: every 3 vertices create a triangle
            </p>
        </button>
        <button id="triangle-strip-mode" class="btn-left">
            <img id="triangle-strip-icon" src="/Resources/Icons/triangle_strip_icon.png" class="btn-left-icon"/>
            <p class="btn-left-description TrenchFont">
                Triangle Strip Mode: every vertex creates a new triangle with the previous 2 vertices
            </p>
        </button>
        <button id="line-mode" class="btn-left">
            <img id="line-icon" src="/Resources/Icons/line_icon.png" class="btn-left-icon"/>
            <p class="btn-left-description TrenchFont">
                Line Mode: every 2 vertices create a line
            </p>
        </button>
        <button id="line-strip-mode" class="btn-left">
            <img id="line-strip-icon" src="/Resources/Icons/line_strip_icon.png" class="btn-left-icon"/>
            <p class="btn-left-description TrenchFont">
                Line Strip Mode: every vertex creates a new line with the previous vertex
            </p>
        </button>
        <button class="btn-left"></button>
    </div>
    <div id="right-btn-coll" class="right-btn-coll">
        <button id="wireframe-mode" class="btn-right">
            <img id="wireframe-icon" src="/Resources/Icons/wireframe_icon.png" class="btn-right-icon"/>
            <p class="btn-right-description TrenchFont">
                Wireframe mode:
                displays model as a wireframe.
            </p>
        </button>
        <button id="solid-mode" class="btn-right">
            <img id="solid-icon" src="/Resources/Icons/solid_icon.png" class="btn-right-icon"/>
            <p class="btn-right-description TrenchFont">
                Solid mode:
                displays model as a solid object with it's set color.
            </p>
        </button>
        <button id="lighting-mode" class="btn-right">
            <img id="lighting-icon" src="/Resources/Icons/phong_lighting_icon.png" class="btn-right-icon"/>
            <p class="btn-right-description TrenchFont">
                Lighting mode:
                displays model as a solid object with dynamic phong lighting.
            </p>
        </button>
    </div>
    <div id="canvas-view" class="canvas-div">
        <canvas id="canvas" class="canvas">
            WebGL is not supported in your browser
        </canvas>
        <p id="fpsLabel" class="fpsLabel AileronsFont"></p>
        <p id="pause-label" class="AileronsFont pauseLabel">Paused</p>
    </div>
    <div id="dial-wrapper" class="dial-wrapper" style="position:absolute; left:100px; top:100px">
        <div id="main-dial" class="main-dial">
            <svg id="main-dial-circle">
                <circle cx="0" cy="0" r="0" stroke-width="0" style="fill: rgb(16, 11, 11)" />
            </svg>
        </div>
        <div id="dial-group" class="dial-group">
            <button id="colorpicker-btn" class="btn1">
                <div id="final-color" class="final-color" style="background-color:rgb(255,0,0)"></div>
                <div id="color-picker" class="color-picker">
                    <div id="bars" class="bars">
                        <div id="color" class="bar" style="background:linear-gradient(rgb(255, 0, 0), rgb(255, 255, 0), rgb(0,255,0), rgb(0, 255, 255), rgb(0,0,255), rgb(255, 0, 255), rgb(255, 0, 0));" onmousemove="moveColorSelector();">
                            <div id="colorSelector" class="selector" style="position:absolute; left:0%; top:-1%" onmousedown="enableColorSelectorPositionChange();" onmouseup="disableColorSelectorPositionChange();">
                            </div>
                        </div>
                        <div id="saturation" class="bar" style="background:linear-gradient(rgb(255, 0, 0), rgb(255,255,255));" onmousemove="moveSaturSelector();">
                            <div id="saturSelector" class="selector" style="position:absolute; left:0%; top:-1%" onmousedown="enableSaturSelectorPositionChange();" onmouseup="disableSaturSelectorPositionChange();">
                            </div>
                        </div>
                        <div id="brightness" class="bar" style="background:linear-gradient(rgb(255, 0, 0), rgb(0,255,0), rgb(0,0,255));" onmousemove="moveBrightSelector();">
                            <div id="brightSelector" class="selector" style="position:absolute; left:0%; top:-1%" onmousedown="enableBrightSelectorPositionChange();" onmouseup="disableBrightSelectorPositionChange();">
                            </div>
                        </div>
                    </div>
                </div>
            </button>
            <button id="btn2" class="btn2"></button>
            <button id="btn3" class="btn3"></button>
            <button id="btn4" class="btn4"></button>
            <button id="btn5" class="btn5"></button>
            <button id="btn6" class="btn6"></button>
        </div>
    </div>
</asp:Content>

