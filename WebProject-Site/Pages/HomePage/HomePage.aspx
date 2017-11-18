<%@ Page Title="" Language="C#" MasterPageFile="~/Pages/MasterPage/MasterPage.master" AutoEventWireup="true" CodeFile="HomePage.aspx.cs" Inherits="Pages_HomePage_HomePage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" Runat="Server">
    <div id="contentDiv" style="position:absolute; visibility:hidden; z-index:1" class="scrollGroup" onscroll="updateUserLocation();">
        <!--Put all welcome elements here -->
        <div id="welcomeDiv" style="position:absolute; background-color: rgba(255, 248, 233,0.9)"> 
            <p id="welcomePos" style="position:absolute; font-size:1px; visibility:hidden">hidden-text</p>
            <div id="welcomeHeader" style="position:absolute;top:37.5%; width:100%; height:100%; margin-left:auto; margin-right:auto; text-align:center;">
                <p id ="welcomeTxt" style="font-size:1250%; margin-top:0%; margin-bottom:0%;">Welcome</p>
                <p id="subTxt" style="position:relative;top:0% ;font-size:250%; margin-top:0%; margin-bottom:0%;" class="subTxt">The Model Makertron 2100 - v2.0</p>
            </div>
            <svg height="10" width="0" style="position:absolute;left:5%;top:100%; z-index:3" class="breakLine">
                <line x1="0" y1="0" x2="0" y2="0" style="stroke:rgb(0,0,0);stroke-width:2; " class="line"/>
            </svg>
        </div>
        <!--Put all login elements here -->
        <div id="loginDiv" style="position:absolute; background-color: rgba(255, 248, 233,0.9)">
            <p id ="loginTxt" style="position:absolute; top:20%; width:100%; margin-left:auto; margin-right:auto; text-align:center; font-size:500%">Log In</p>
            <svg height="10" width="0" style="position:absolute;left:5%;top:100%; z-index:3" class="breakLine">
                <line x1="0" y1="0" x2="0" y2="0" style="stroke:rgb(0,0,0);stroke-width:2; " class="line"/>
            </svg>
        </div>
        <!--Put all signup elements here -->
        <div id="signupDiv" style="position:absolute; background-color:rgba(16, 11, 11, 0.99)">
            <button id="signupframe" style="position:absolute; top:20%; width:80%; height:50%; left: 10%; border:solid; border-color:rgb(120, 51, 39); border-width:0.1vw; background-color:rgba(255, 255, 255, 0.00); z-index:4; outline:none" onclick="startRegistration();" class="AileronsFont">
                <div id="stage0" class="stage0">
                    <p id="headline">SIGN UP</p>
                    <img src="/Resources/Icons/dropdown_icon.png"/>
                </div>
            </button>
            <form id="signUpForm" runat="server">
                <p id="stageNumber" style="visibility:hidden; position:absolute;">0</p>
                <svg class="hiddenSignUpLine" id="stage2Svg">
                        <line id="stage2Line" class="signUpLine" x1="0" x2="0" y1="0" y2="0" style="stroke:rgb(120, 51, 39); stroke-width:0.25vw"></line>
                </svg>
                <svg class="hiddenSignUpLine" id="stage3Svg">
                        <line id="stage3Line" class="signUpLine" x1="0" x2="0" y1="0" y2="0" style="stroke:rgb(120, 51, 39); stroke-width:0.25vw"></line>
                </svg>
                <div id="stage1" style="position:absolute; top:20%; width:40%; height:50%; left:31.5%; z-index:3;" class="AileronsFont hideTrans">
                    <div id="emailDiv" style="position:relative; width:100%; height:20%; top:30%; font-size:2vw; color:rgb(131, 108, 108);">
                        <p id="emailLbl" style="position:absolute; left:19.5%; top:0%; margin-top:0.5%">Email:</p>
                        <div style="border:none; background-color:rgba(0,0,0,0.00); color:white; width:10vw; height:3vw; font-size:1vw; position:absolute; left:40%; top:0%;" class="textboxStyle">
                            <asp:TextBox ID="emailBox" runat="server" CssClass="Textbox TrenchFont"></asp:TextBox>
                            <svg style="position:absolute; top:100%; left:0%; height:5%">
                                <line class="textboxLine" x1="0" y1="0" x2="0" y2="0" style="stroke:rgb(120, 51, 39); stroke-width:1vw"></line>
                            </svg>
                        </div>
                    </div>
                    <div id="passwordDiv" style="position:relative; width:100%; height:20%; top:30%; font-size:2vw; color:rgb(131, 108, 108);">
                        <p id="passwordLbl" style="position:absolute; left:19.5%; top:0%; margin-top:0.5%">Password:</p>
                        <div style="border:none; background-color:rgba(0,0,0,0.00); color:white; width:10vw; height:3vw; font-size:1vw; position:absolute; left:50%; top:0%;" class="textboxStyle">
                            <asp:TextBox ID="passwordBox" runat="server" CssClass="Textbox TrenchFont"></asp:TextBox>
                            <svg style="position:absolute; top:100%; left:0%; height:5%">
                                <line class="textboxLine" x1="0" y1="0" x2="0" y2="0" style="stroke:rgb(120, 51, 39); stroke-width:1vw"></line>
                            </svg>
                        </div>
                    </div>
                </div>
                <div id="stage2" style="position:absolute; top:20%; width:40%; height:50%; left:50%; z-index:2;" class="AileronsFont hideTrans">
                    <div id="emailDiv1" style="position:relative; width:100%; height:20%; top:30%; font-size:2vw; color:rgb(131, 108, 108);">
                        <p id="emailLbl1" style="position:absolute; left:30%; top:0%; margin-top:0.5%">Email:</p>
                        <div style="border:none; background-color:rgba(0,0,0,0.00); color:white; width:10vw; height:3vw; font-size:1vw; position:absolute; left:50%; top:0%;" class="textboxStyle">
                            <asp:TextBox ID="TextBox1" runat="server" CssClass="Textbox TrenchFont"></asp:TextBox>
                            <svg style="position:absolute; top:100%; left:0%; height:5%">
                                <line class="textboxLine" x1="0" y1="0" x2="0" y2="0" style="stroke:rgb(120, 51, 39); stroke-width:1vw"></line>
                            </svg>
                        </div>
                    </div>
                    <div id="passwordDiv1" style="position:relative; width:100%; height:20%; top:30%; font-size:2vw; color:rgb(131, 108, 108);">
                        <p id="passwordLbl1" style="position:absolute; left:19.5%; top:0%; margin-top:0.5%">Password:</p>
                        <div style="border:none; background-color:rgba(0,0,0,0.00); color:white; width:10vw; height:3vw; font-size:1vw; position:absolute; left:50%; top:0%;" class="textboxStyle">
                            <asp:TextBox ID="TextBox2" runat="server" CssClass="Textbox TrenchFont"></asp:TextBox>
                            <svg style="position:absolute; top:100%; left:0%; height:5%">
                                <line class="textboxLine" x1="0" y1="0" x2="0" y2="0" style="stroke:rgb(120, 51, 39); stroke-width:1vw"></line>
                            </svg>
                        </div>
                    </div>
                </div>
                <div id="stage3" style="position:absolute; top:20%; width:40%; height:50%; left:57.5%; z-index:1;" class="AileronsFont hideTrans">
                    <div id="emailDiv2" style="position:relative; width:100%; height:20%; top:30%; font-size:2vw; color:rgb(131, 108, 108);">
                        <p id="emailLbl2" style="position:absolute; left:30%; top:0%; margin-top:0.5%">Email:</p>
                        <div style="border:none; background-color:rgba(0,0,0,0.00); color:white; width:10vw; height:3vw; font-size:1vw; position:absolute; left:50%; top:0%;" class="textboxStyle">
                            <asp:TextBox ID="TextBox3" runat="server" CssClass="Textbox TrenchFont"></asp:TextBox>
                            <svg style="position:absolute; top:100%; left:0%; height:5%">
                                <line class="textboxLine" x1="0" y1="0" x2="0" y2="0" style="stroke:rgb(120, 51, 39); stroke-width:1vw"></line>
                            </svg>
                        </div>
                    </div>
                    <div id="passwordDiv2" style="position:relative; width:100%; height:20%; top:30%; font-size:2vw; color:rgb(131, 108, 108);">
                        <p id="passwordLbl2" style="position:absolute; left:19.5%; top:0%; margin-top:0.5%">Password:</p>
                        <div style="border:none; background-color:rgba(0,0,0,0.00); color:white; width:10vw; height:3vw; font-size:1vw; position:absolute; left:50%; top:0%;" class="textboxStyle">
                            <asp:TextBox ID="TextBox4" runat="server" CssClass="Textbox TrenchFont"></asp:TextBox>
                            <svg style="position:absolute; top:100%; left:0%; height:5%">
                                <line class="textboxLine" x1="0" y1="0" x2="0" y2="0" style="stroke:rgb(120, 51, 39); stroke-width:1vw"></line>
                            </svg>
                        </div>
                    </div>
                </div>
            </form>
            <button id="continue" style="position:absolute; top:75%; left:40%; width:20%; height:10%; outline:none; border:solid; border-color:rgb(120, 51, 39); color:rgb(120, 51, 39); border-width:0.1vw; background-color:rgba(0,0,0,0.00); font-size:2vw; cursor:pointer" class="AileronsFont hideTrans" onclick="nextStep();">Continue</button>
        </div>
        <!--Put all about elements here -->
        <div id="aboutDiv" style="position:absolute; background-color: rgba(255, 248, 233,0.9)">
            <p id ="aboutTxt" style="position:absolute; top:20%; width:100%; margin-left:auto; margin-right:auto; text-align:center; font-size:500%">About</p>
            <svg height="10" width="0" style="position:absolute;left:5%;top:100%; z-index:3" class="breakLine">
                <line x1="0" y1="0" x2="0" y2="0" style="stroke:rgb(0,0,0);stroke-width:2; " class="line"/>
            </svg>
        </div>
        <!--Put all terms of use elements here -->
        <div id="termDiv" style="position:absolute; background-color: rgba(255, 248, 233,0.9)">
            <p id ="termsTxt" style="position:absolute; top:20%; width:100%; margin-left:auto; margin-right:auto; text-align:center; font-size:500%">Terms of Use</p>
        </div>

        <!-- Ignore -->
        <p id="Hidden_Element" style="position:absolute; font-size:1px; visibility:hidden">hidden-text</p>

        <!-- COMMENT: Make sure when percentages used to only put Y percentages on childs of responsive parents-->
    </div>
</asp:Content>

