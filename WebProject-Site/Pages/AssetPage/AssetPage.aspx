<%@ Page Title="" Language="C#" MasterPageFile="~/Pages/MasterPage/MasterPage.master" AutoEventWireup="true" CodeFile="AssetPage.aspx.cs" Inherits="Pages_AssetPage_AssetPage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" Runat="Server">
    <form runat="server">
        <div class="panelPos panelColor">
            <asp:Panel ID="ErrorMessage" runat="server" CssClass="ErrorMessage"></asp:Panel>
        </div>
        <canvas id="canvas" class="panelPos">
            <p class="ErrorMessage">It seems like your browser does not support webGL</p>
        </canvas>
    </form>
</asp:Content>

