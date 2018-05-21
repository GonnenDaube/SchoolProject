<%@ Page Title="Admin Editor" Language="C#" MasterPageFile="~/Pages/MasterPage/MasterPage.master" AutoEventWireup="true" CodeFile="DataTablePage.aspx.cs" Inherits="Pages_AdminPage_DataTablePage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" Runat="Server">
    <form runat="server">
        <p runat="server" id="title" class="title AileronsFont"></p>
        <a id="return" href="AdminDashboardPage.aspx" class="return-btn" >
            <img src="/Resources/Icons/return-btn.png" />
        </a>
        <asp:Button ID="save_btn" runat="server" CssClass="save-btn" OnClick="save_btn_Click"/>
        <asp:Table ID="table" runat="server">
            <asp:TableHeaderRow ID="header" CssClass="table-header-row" runat="server">
            </asp:TableHeaderRow>
        </asp:Table>
    </form>
</asp:Content>

