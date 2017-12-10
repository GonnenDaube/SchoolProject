<%@ Page Title="" Language="C#" MasterPageFile="~/Pages/MasterPage/MasterPage.master" AutoEventWireup="true" CodeFile="WorkingSpace.aspx.cs" Inherits="Pages_WorkingSpace_WorkingSpace" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" Runat="Server">
    <div class="left-btn-coll">
        <button id="triangle-mode" class="btn-left checkable-left">
            <img id="triangle-icon" src="/Resources/Icons/triangle_icon.png" class="btn-left-icon"/>
        </button>
        <button id="triangle-strip-mode" class="btn-left checkable-left">
            <img id="triangle-strip-icon" src="/Resources/Icons/triangle_strip_icon.png" class="btn-left-icon"/>
        </button>
        <button id="line-mode" class="btn-left checkable-left">
            <img id="line-icon" src="/Resources/Icons/line_icon.png" class="btn-left-icon"/>
        </button>
        <button id="line-strip-mode" class="btn-left checkable-left">
            <img id="line-strip-icon" src="/Resources/Icons/line_strip_icon.png" class="btn-left-icon"/>
        </button>
        <button class="btn-left"></button>
    </div>
    <div class="right-btn-coll">
        <button id="wireframe-mode" class="btn-right checkable-right">
            <img id="wireframe-icon" src="/Resources/Icons/wireframe_icon.png" class="btn-right-icon"/>
        </button>
        <button id="solid-mode" class="btn-right checkable-right">
            <img id="solid-icon" src="/Resources/Icons/solid_icon.png" class="btn-right-icon"/>
        </button>
        <button id="lighting-mode" class="btn-right checkable-right">
            <img id="lighting-icon" src="/Resources/Icons/phong_lighting_icon.png" class="btn-right-icon"/>
        </button>
        <div id="color-picker" class="btn-right color-picker">
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
            <div id="final-color" class="final-color" style="background-color:rgb(255,0,0)"></div>
        </div>
    </div>
    <div id="canvas-view" class="canvas-div">
        <canvas id="canvas" class="canvas">
            WebGL is not supported in your browser
        </canvas>
        <p id="fpsLabel" class="fpsLabel AileronsFont"></p>
        <p id="pause-label" class="AileronsFont pauseLabel">Paused</p>
    </div>
</asp:Content>

