<%@ Page Title="" Language="C#" MasterPageFile="~/Pages/MasterPage/MasterPage.master" AutoEventWireup="true" CodeFile="AssetPage.aspx.cs" Inherits="Pages_AssetPage_AssetPage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" Runat="Server">
    <form runat="server">
        <asp:Panel ID="ErrorMessage" runat="server"></asp:Panel>
        <div id="canvas-view" class="panelPos" style="z-index:2">
            <canvas id="canvas" class="canvas">
                WebGL is not supported in your browser
            </canvas>
            <p id="fpsLabel" class="fpsLabel AileronsFont"></p>
            <p id="pause-label" class="AileronsFont pauseLabel">Paused</p>
        </div>
        <div id="asset-info" class="asset-info">
            <asp:Label ID="AssetName" runat="server" Text="" CssClass="asset-name AileronsFont"></asp:Label>
            <p id="breakLine" class="info-break-line AileronsFont">|</p>
            <asp:Label ID="CreatorsName" runat="server" Text="" CssClass="creator-name AileronsFont"></asp:Label>
            <asp:Label ID="AssetDescription" runat="server" Text="" CssClass="asset-desc TrenchFont"></asp:Label>
            <asp:Button ID="Download_Btn" runat="server" Text="Download" OnClick="Download_Btn_Click" CssClass="AileronsFont download-button"/>
        </div>
        <p id="should-update" style="visibility:hidden"></p>
        <div id="asset-rating" class="asset-rating">
            <div id="overall-rate" class="overall-rate AileronsFont">
                <asp:Label ID="Rating" runat="server" Text=""></asp:Label>
            </div>
            <svg id="breakLineSVG" class="breakLine-pos">
                <line id="rate-break-line" x1="0" x2="0" y1="0" y2="0" style="stroke:rgb(120, 51, 39); stroke-width:0.25vw"></line>
            </svg>
            <div id="star-list" class="star-list">
                <div id="star0" class="star">
                    <asp:Image ID="selectedImg0" CssClass="hiddenImg" ImageUrl="/Resources/Icons/star-checked.png" runat="server" />
                    <asp:ImageButton ID="rate_btn0" runat="server" ImageUrl="/Resources/Icons/star.png" OnClick="UpdateRating"/>
                </div>
                <div id="star1" class="star">
                    <asp:Image ID="selectedImg1" CssClass="hiddenImg" ImageUrl="/Resources/Icons/star-checked.png" runat="server" />
                    <asp:ImageButton ID="rate_btn1" runat="server" ImageUrl="/Resources/Icons/star.png" OnClick="UpdateRating"/>
                </div>
                <div id="star2" class="star">
                    <asp:Image ID="selectedImg2" CssClass="hiddenImg" ImageUrl="/Resources/Icons/star-checked.png" runat="server" />
                    <asp:ImageButton ID="rate_btn2" runat="server" ImageUrl="/Resources/Icons/star.png" OnClick="UpdateRating"/>
                </div>
                <div id="star3" class="star">
                    <asp:Image ID="selectedImg3" CssClass="hiddenImg" ImageUrl="/Resources/Icons/star-checked.png" runat="server" />
                    <asp:ImageButton ID="rate_btn3" runat="server" ImageUrl="/Resources/Icons/star.png" OnClick="UpdateRating"/>
                </div>
                <div id="star4" class="star">
                    <asp:Image ID="selectedImg4" CssClass="hiddenImg" ImageUrl="/Resources/Icons/star-checked.png" runat="server" />
                    <asp:ImageButton ID="rate_btn4" runat="server" ImageUrl="/Resources/Icons/star.png" OnClick="UpdateRating"/>
                </div>
            </div>
            <p runat="server" id="user_rate" class="HiddenField"></p>
        </div>
        <asp:Label ID="positions" CssClass="hidden" runat="server" Text=""></asp:Label>
        <asp:Label ID="colors" CssClass="hidden" runat="server" Text=""></asp:Label>
        <asp:Label ID="normals" CssClass="hidden" runat="server" Text=""></asp:Label>

        <asp:Label ID="camPos" CssClass="hidden" runat="server" Text=""></asp:Label>
        <asp:Label ID="camLookAt" CssClass="hidden" runat="server" Text=""></asp:Label>
    </form>
</asp:Content>

