<%@ Page Title="" Language="C#" MasterPageFile="~/Pages/MasterPage/MasterPage.master" AutoEventWireup="true" CodeFile="HomePage.aspx.cs" Inherits="Pages_HomePage_HomePage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div id="contentDiv" style="position:absolute; visibility:hidden; z-index:1">
        <div id="welcomeDiv" style="position:absolute; background-color: rgba(255, 255, 255, 0.9)">
            
            <p id ="welcomeTxt" style="position:absolute; margin-left:auto; margin-right:auto; text-align:center">Welcome</p>
        </div>
        <div id="loginDiv" style="position:absolute; background-color: rgba(255, 255, 255, 0.9)">
            <p id ="loginTxt" style="position:absolute; margin-left:auto; margin-right:auto; text-align:center">Log In</p>
        </div>
        <div id="signupDiv" style="position:absolute; background-color: rgba(255, 255, 255, 0.9)">
            <p id ="signupTxt" style="position:absolute; margin-left:auto; margin-right:auto; text-align:center">Sign Up</p>
        </div>
        <div id="aboutDiv" style="position:absolute; background-color: rgba(255, 255, 255, 0.9)">
            <p id ="aboutTxt" style="position:absolute; margin-left:auto; margin-right:auto; text-align:center">About</p>
        </div>
        <div id="termDiv" style="position:absolute; background-color: rgba(255, 255, 255, 0.9)">
            <p id ="termsTxt" style="position:absolute; margin-left:auto; margin-right:auto; text-align:center">Terms of Use</p>
        </div>
    </div>
    <p id="Hidden_Element" style="position:absolute; font-size:1px; visibility:hidden">hidden-text</p>
</asp:Content>

