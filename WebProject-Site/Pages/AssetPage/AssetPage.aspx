﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Pages/MasterPage/MasterPage.master" AutoEventWireup="true" CodeFile="AssetPage.aspx.cs" Inherits="Pages_AssetPage_AssetPage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" Runat="Server">
    <form runat="server">
        <asp:Panel ID="ErrorMessage" runat="server"></asp:Panel>
        <div id="canvas-view" class="panelPos">
            <canvas id="canvas" class="canvas">
                WebGL is not supported in your browser
            </canvas>
            <p id="fpsLabel" class="fpsLabel AileronsFont"></p>
            <p id="pause-label" class="AileronsFont pauseLabel">Paused</p>
        </div>
        <div id="asset-info" class="asset-info">

        </div>
        <div id="asset-rating" class="asset-rating">
            <div id="overall-rate" class="overall-rate AileronsFont">
                <asp:Label ID="Rating" runat="server" Text=""></asp:Label>
            </div>
            <svg id="breakLineSVG" class="breakLine-pos">
                <line id="rate-break-line" x1="0" x2="0" y1="0" y2="0" style="stroke:rgb(120, 51, 39); stroke-width:0.25vw"></line>
            </svg>
            <div id="star-list" class="star-list">
                <button id="star0" class="star">
                    <img src="/Resources/Icons/star.png" class="shown"/>
                    <img id="checked0" src="/Resources/Icons/star-checked.png" class="hidden"/>
                    <img id="selected0" src="/Resources/Icons/star-border.png" class="hidden"/>
                </button>
                <button id="star1" class="star">
                    <img src="/Resources/Icons/star.png" class="shown"/>
                    <img id="checked1" src="/Resources/Icons/star-checked.png" class="hidden"/>
                    <img id="selected1" src="/Resources/Icons/star-border.png" class="hidden"/>
                </button>
                <button id="star2" class="star">
                    <img src="/Resources/Icons/star.png" class="shown"/>
                    <img id="checked2" src="/Resources/Icons/star-checked.png" class="hidden"/>
                    <img id="selected2" src="/Resources/Icons/star-border.png" class="hidden"/>
                </button>
                <button id="star3" class="star">
                    <img src="/Resources/Icons/star.png"  class="shown"/>
                    <img id="checked3" src="/Resources/Icons/star-checked.png" class="hidden"/>
                    <img id="selected3" src="/Resources/Icons/star-border.png" class="hidden"/>
                </button>
                <button id="star4" class="star">
                    <img src="/Resources/Icons/star.png" class="shown"/>
                    <img id="checked4" src="/Resources/Icons/star-checked.png" class="hidden"/>
                    <img id="selected4" src="/Resources/Icons/star-border.png" class="hidden"/>
                </button>
            </div>
        </div>
    </form>
</asp:Content>

