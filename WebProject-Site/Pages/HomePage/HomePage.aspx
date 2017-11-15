<%@ Page Title="" Language="C#" MasterPageFile="~/Pages/MasterPage/MasterPage.master" AutoEventWireup="true" CodeFile="HomePage.aspx.cs" Inherits="Pages_HomePage_HomePage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div id="contentDiv" style="position:absolute; visibility:hidden; z-index:1" class="scrollGroup" onscroll="updateUserLocation();">
        <!--Put all welcome elements here -->
        <div id="welcomeDiv" style="position:absolute; background-color: rgba(255, 255, 255, 0.9)"> 
            <p id="welcomePos" style="position:absolute; font-size:1px; visibility:hidden">hidden-text</p>
            <p id ="welcomeTxt" style="position:absolute; top:20%; width:100%; margin-left:auto; margin-right:auto; text-align:center; font-size:500%">Welcome</p>
            <svg height="10" width="0" style="position:absolute;left:5%;top:100%; z-index:3" class="breakLine">
                <line x1="0" y1="0" x2="0" y2="0" style="stroke:rgb(0,0,0);stroke-width:2; " class="line"/>
            </svg>
        </div>
        <!--Put all login elements here -->
        <div id="loginDiv" style="position:absolute; background-color: rgba(255, 255, 255, 0.9)">
            <p id ="loginTxt" style="position:absolute; top:20%; width:100%; margin-left:auto; margin-right:auto; text-align:center; font-size:500%">Log In</p>
            <svg height="10" width="0" style="position:absolute;left:5%;top:100%; z-index:3" class="breakLine">
                <line x1="0" y1="0" x2="0" y2="0" style="stroke:rgb(0,0,0);stroke-width:2; " class="line"/>
            </svg>
        </div>
        <!--Put all signup elements here -->
        <div id="signupDiv" style="position:absolute; background-color: rgba(255, 255, 255, 0.9)">
            <p id ="headline" style="position:absolute; top:2.5%; width:100%; margin-left:auto; margin-right:auto; text-align:center; font-size:500%">Register:</p>
            <form id="signUpForm" runat="server" style="position:absolute; top: 5%; width:25%; margin-left:auto; margin-right:auto; text-align:center; font-size:100%">
                <div></div>
            </form>
            <p id="completion-barTxt" style="position:absolute;top:78%; width:100%; margin-left:auto; margin-right:auto; text-align:center; font-size:200%; z-index:4">0%</p>
            <svg id="completion-bar" height="0" width="0" style="position:absolute; left:17.5%; top:80%; z-index:3">
                <rect height="0" width="0" style="stroke:rgba(0,0,0,0); stroke-width:3; fill:rgb(64, 255, 89); z-index:2"></rect>
                <rect height="0" width="0" style="stroke:rgb(0,0,0);stroke-width:3; fill:rgba(0,0,0,0); z-index:3"></rect>
            </svg>
            <button onclick="changeCompletionBar(33);"></button>
            <svg height="10" width="0" style="position:absolute;left:5%;top:100%; z-index:3" class="breakLine">
                <line x1="0" y1="0" x2="0" y2="0" style="stroke:rgb(0,0,0);stroke-width:2; " class="line"/>
            </svg>
        </div>
        <!--Put all about elements here -->
        <div id="aboutDiv" style="position:absolute; background-color: rgba(255, 255, 255, 0.9)">
            <p id ="aboutTxt" style="position:absolute; top:20%; width:100%; margin-left:auto; margin-right:auto; text-align:center; font-size:500%">About</p>
            <svg height="10" width="0" style="position:absolute;left:5%;top:100%; z-index:3" class="breakLine">
                <line x1="0" y1="0" x2="0" y2="0" style="stroke:rgb(0,0,0);stroke-width:2; " class="line"/>
            </svg>
        </div>
        <!--Put all terms of use elements here -->
        <div id="termDiv" style="position:absolute; background-color: rgba(255, 255, 255, 0.9)">
            <p id ="termsTxt" style="position:absolute; top:20%; width:100%; margin-left:auto; margin-right:auto; text-align:center; font-size:500%">Terms of Use</p>
        </div>

        <!-- Ignore -->
        <p id="Hidden_Element" style="position:absolute; font-size:1px; visibility:hidden">hidden-text</p>
    </div>
</asp:Content>

