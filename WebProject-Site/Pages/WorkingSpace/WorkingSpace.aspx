<%@ Page Title="" Language="C#" MasterPageFile="~/Pages/MasterPage/MasterPage.master" AutoEventWireup="true" CodeFile="WorkingSpace.aspx.cs" Inherits="Pages_WorkingSpace_WorkingSpace" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" Runat="Server">
    <div id="tabs" class="tab-wrapper">
        <div id="canvas-tab" class="canvas-tab">
            <p>Model View</p>
        </div>
        <div id="desc-tab" class="desc-tab">
            <p>Details</p>
        </div>
    </div>
    <div id="canvas-view" class="canvas-div" style="z-index:2">
        <canvas id="canvas" class="canvas">
            WebGL is not supported in your browser
        </canvas>
        <p id="fpsLabel" class="fpsLabel AileronsFont"></p>
        <div class="form-size">
            <div id="pause-label" class="AileronsFont pauseLabel">
                <button id="upload" class="upload-btn AileronsFont" runat="server">Take Screenshot</button>
            </div>
        </div>
    </div>
    <div id="details-view" class="details-div" style="z-index:1">
        <form id="form" runat="server">
            <asp:TextBox ID="model_name" runat="server" CssClass="model-name AileronsFont"></asp:TextBox>
            <asp:RequiredFieldValidator ID="model_name_validator" runat="server" ErrorMessage="*" ControlToValidate="model_name" CssClass="name-validator"></asp:RequiredFieldValidator>
            <textarea id="description" runat="server" cols="50" rows="10" class="desc-textarea TrenchFont"></textarea>
            <asp:RequiredFieldValidator ID="description_validator" runat="server" ErrorMessage="*" ControlToValidate="description" CssClass="desc-validator"></asp:RequiredFieldValidator>
            <asp:TextBox ID="thumbnail_url" runat="server" style="visibility:hidden"></asp:TextBox>
            <asp:RequiredFieldValidator ID="thumbnail_validator" runat="server" ErrorMessage="Thumbnail Required" ToolTip="(In model view -> press Esc -> click 'Take Screenshot')" ControlToValidate="thumbnail_url" CssClass="thumbnail-validator TrenchFont"></asp:RequiredFieldValidator>
            <asp:Button ID="Submit" runat="server" Text="UPLOAD" CssClass="submit-btn AileronsFont" OnClick="Upload_Click"/>

            <asp:TextBox ID="model_position_data" runat="server" style="visibility:hidden"></asp:TextBox>
            <asp:TextBox ID="model_color_data" runat="server" style="visibility:hidden"></asp:TextBox>
            <asp:TextBox ID="model_normal_data" runat="server" style="visibility:hidden"></asp:TextBox>
            <asp:TextBox ID="camera_pos" runat="server" style="visibility:hidden"></asp:TextBox>
            <asp:TextBox ID="looking_at" runat="server" style="visibility:hidden"></asp:TextBox>
        </form>
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
        </div>
    </div>
</asp:Content>

