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
    <div id="canvas-view" class="canvas-div">
        <canvas id="canvas" class="canvas">
            WebGL is not supported in your browser
        </canvas>
        <p id="fpsLabel" class="fpsLabel AileronsFont"></p>
        <p id="pause-label" class="AileronsFont pauseLabel">Paused</p>
    </div>
    <div id="dial-wrapper" class="dial-wrapper" style="position:absolute; left:100px; top:100px">
        <div id="main-dial" class="main-dial">
            <div id="icons" class="icon-wrapper">
                <img src="/Resources/Icons/bucket_icon.png" class="icon0"/>
                <img src="/Resources/Icons/add-vertex_icon.png" class="icon1"/>
                <img src="/Resources/Icons/bucket_icon.png" class="icon2"/>
                <img src="/Resources/Icons/bucket_icon.png" class="icon3"/>
                <img src="/Resources/Icons/bucket_icon.png" class="icon4"/>
                <img src="/Resources/Icons/bucket_icon.png" class="icon5"/>
            </div>
            <svg id="dial-circles" class="dial-svg">
                <g id="circles">
                    <circle id="circle-5" r="0" stroke-width="3" class="circle5"/>
                    <circle id="circle-4" r="0" stroke-width="3" class="circle4"/>
                    <circle id="circle-3" r="0" stroke-width="3" class="circle3"/>
                    <circle id="circle-2" r="0" stroke-width="3" class="circle2"/>
                    <circle id="add-vertex-circle" r="0" stroke-width="3" class="circle1"/>
                    <circle id="final-color" r="0" stroke-width="3" style="fill: rgb(120, 51, 39)" class="circle0"/>
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
            <div id="selector">
                
            </div>
        </div>
    </div>
</asp:Content>

