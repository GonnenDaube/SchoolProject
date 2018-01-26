<%@ Page Title="" Language="C#" MasterPageFile="~/Pages/MasterPage/MasterPage.master" AutoEventWireup="true" CodeFile="WorkingSpace.aspx.cs" Inherits="Pages_WorkingSpace_WorkingSpace" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" Runat="Server">
    <div id="canvas-view" class="canvas-div">
        <canvas id="canvas" class="canvas">
            WebGL is not supported in your browser
        </canvas>
        <p id="fpsLabel" class="fpsLabel AileronsFont"></p>
        <div runat="server" class="form-size">
            <div id="pause-label" class="AileronsFont pauseLabel">
                <button id="upload" class="upload-btn AileronsFont" runat="server">UPLOAD</button>
            </div>
        </div>
    </div>
    <div id="vertex-selector-div" style="position:absolute; left:0px; top:0px; width:100px; height:100px; visibility:hidden" class="vertex-selector"></div>
    <div id="dial-wrapper" class="dial-wrapper" style="position:absolute; left:100px; top:100px">
        <div id="main-dial" class="main-dial">
            <div id="icons" class="icon-wrapper">
                <img src="/Resources/Icons/bucket_icon.png" class="icon0"/>
                <img src="/Resources/Icons/vertex-selector-icon.png" class="icon1"/>
                <img src="/Resources/Icons/add-vertex_icon.png" class="icon2"/>
                <img src="/Resources/Icons/extrude-vertex-icon.png" class="icon3"/>
                <img src="/Resources/Icons/wireframe_icon.png" class="icon4"/>
                <img src="/Resources/Icons/solid_icon.png" class="icon5"/>
                <img src="/Resources/Icons/phong_lighting_icon.png" class="icon6"/>
                <img src="/Resources/Icons/normal_icon.png" class="icon7"/>
                <img src="/Resources/Icons/shape-preset_icon.png" class="icon8"/>
            </div>
            <svg id="dial-circles" class="dial-svg">
                <g id="circles">
                    <circle id="shape-preset" r="0" stroke-width="3" class="circle8 dial-button deselected-group-btn"/>
                    <circle id="normal-mode" r="0" stroke-width="3" class="circle7 dial-mode deselected-group-btn"/>
                    <circle id="lighting-mode" r="0" stroke-width="3" class="circle6 dial-mode deselected-group-btn"/>
                    <circle id="solid-mode" r="0" stroke-width="3" class="circle5 dial-mode selected-group-btn"/>
                    <circle id="wireframe-mode" r="0" stroke-width="3" class="circle4 dial-mode deselected-group-btn"/>
                    <circle id="vertex-extruder" r="0" stroke-width="3" class="circle3 dial-action deselected-group-btn"/>
                    <circle id="vertex-adder" r="0" stroke-width="3" class="circle2 dial-action deselected-group-btn"/>
                    <circle id="vertex-selector" r="0" stroke-width="3" class="circle1 dial-action selected-group-btn"/>
                    <circle id="final-color" r="0" stroke-width="3" style="fill: rgb(120, 51, 39)" class="circle0 deselected-group-btn"/>
                </g>
                <circle id="main-circle" cx="0" cy="0" r="0" stroke-width="0" style="fill: rgb(16, 11, 11);"/>
            </svg>
            <div id="color-picker" class="color-picker" style="visibility:hidden">
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
            <p id="model_position_data" runat="server" style="visibility:hidden">
            </p>
            <p id="model_color_data" runat="server" style="visibility:hidden">
            </p>
            <p id="model_normal_data" runat="server" style="visibility:hidden">
            </p>
        </div>
    </div>
    <img id="image" src="/Resources/Images/polygon-mountain.jpg" height="500" width="500"/>
</asp:Content>

