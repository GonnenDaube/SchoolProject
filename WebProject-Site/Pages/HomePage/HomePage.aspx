<%@ Page Title="" Language="C#" MasterPageFile="~/Pages/MasterPage/MasterPage.master" AutoEventWireup="true" CodeFile="HomePage.aspx.cs" Inherits="Pages_HomePage_HomePage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div id="contentDiv" style="position:absolute; visibility:hidden; z-index:1">
        <!--Put all welcome elements here -->
        <div id="welcomeDiv" style="position:absolute; background-color: rgba(255, 255, 255, 0.9)"> 
            <p id ="welcomeTxt" style="position:absolute; top:20%; width:100%; margin-left:auto; margin-right:auto; text-align:center; font-size:500%">Welcome</p>
            <svg height="10" width="0" style="position:absolute;left:5%;top:100%; z-index:3">
                <line x1="0" y1="0" x2="0" y2="0" style="stroke:rgb(0,0,0);stroke-width:2; "/>
            </svg>
        </div>
        <!--Put all login elements here -->
        <div id="loginDiv" style="position:absolute; background-color: rgba(255, 255, 255, 0.9)">
            <p id ="loginTxt" style="position:absolute; top:20%; width:100%; margin-left:auto; margin-right:auto; text-align:center; font-size:500%">Log In</p>
            <svg height="10" width="0" style="position:absolute;left:5%;top:100%; z-index:3">
                <line x1="0" y1="0" x2="0" y2="0" style="stroke:rgb(0,0,0);stroke-width:2; "/>
            </svg>
        </div>
        <!--Put all signup elements here -->
        <div id="signupDiv" style="position:absolute; background-color: rgba(255, 255, 255, 0.9)">
            <form id="signUpForm" runat="server" style="position:absolute; top: 10%; width:25%; margin-left:auto; margin-right:auto; text-align:center; font-size:100%">
                <div id="username">
                    <p id="username-hint">Username:</p>
                    <asp:TextBox ID="usernameTxtbox" runat="server" placeholder="Username"></asp:TextBox>
                </div>
                <div id="email">
                    <p id="email-hint">Email:</p>
                    <asp:TextBox ID="emailTxtbox" runat="server" placeholder="Email"></asp:TextBox>
                </div>
                <div id="password">
                    <p id="password-hint">Password:</p>
                    <asp:TextBox ID="passwordTxtbox" runat="server" placeholder="Password"></asp:TextBox>
                </div>
                <div id="submit">
                    <asp:Button ID="submitbtn" runat="server" OnClick="submitbtn_Click" Text="Submit"/>
                </div>
            </form>
            <svg height="10" width="0" style="position:absolute;left:5%;top:100%; z-index:3">
                <line x1="0" y1="0" x2="0" y2="0" style="stroke:rgb(0,0,0);stroke-width:2; "/>
            </svg>
        </div>
        <!--Put all about elements here -->
        <div id="aboutDiv" style="position:absolute; background-color: rgba(255, 255, 255, 0.9)">
            <p id ="aboutTxt" style="position:absolute; top:20%; width:100%; margin-left:auto; margin-right:auto; text-align:center; font-size:500%">About</p>
            <svg height="10" width="0" style="position:absolute;left:5%;top:100%; z-index:3">
                <line x1="0" y1="0" x2="0" y2="0" style="stroke:rgb(0,0,0);stroke-width:2; "/>
            </svg>
        </div>
        <!--Put all terms of use elements here -->
        <div id="termDiv" style="position:absolute; background-color: rgba(255, 255, 255, 0.9)">
            <p id ="termsTxt" style="position:absolute; top:20%; width:100%; margin-left:auto; margin-right:auto; text-align:center; font-size:500%">Terms of Use</p>
        </div>
    </div>
    <p id="Hidden_Element" style="position:absolute; font-size:1px; visibility:hidden">hidden-text</p>
</asp:Content>

