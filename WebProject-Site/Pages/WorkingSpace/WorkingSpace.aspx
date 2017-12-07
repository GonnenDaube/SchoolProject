<%@ Page Title="" Language="C#" MasterPageFile="~/Pages/MasterPage/MasterPage.master" AutoEventWireup="true" CodeFile="WorkingSpace.aspx.cs" Inherits="Pages_WorkingSpace_WorkingSpace" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" Runat="Server">
    <p id="fpsLabel" class="fpsLabel AileronsFont"></p>
    <div id="canvas-view">
        <canvas id="canvas" class="canvas">
        WebGL is not supported in your browser
    </canvas>
    <p id="pause-label" class="AileronsFont pauseLabel">Paused</p>
    </div>
</asp:Content>

