<%@ Page Language="C#" AutoEventWireup="true" CodeFile="VerificationPage.aspx.cs" Inherits="Pages_VerificationPage_VerificationPage" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Verification</title>
    <link rel="icon" href="../../Resources/Icons/model_icon.png" />
</head>
<body>
    <link href="VerificationPageStyle.css" rel="stylesheet" />
    <form id="form1" runat="server">
    <div id="mainDiv" style="position:absolute; left:5%; top:5%; width:90vw; height:45vw; background-color: rgba(255, 248, 233,0.9)">
        <p id="pageTitle" style="position:absolute; left:0%; top:15%;width:100%; font-size:10vw; margin-left:auto; margin-right:auto; text-align:center; margin-top:0%; margin-bottom:0%">Verification</p>
        <p id="pageSubTitle" style="position:absolute; left:0%; top:40%;width:100%; font-size:2vw; margin-left:auto; margin-right:auto; text-align:center; margin-top:0%; margin-bottom:0%">Click the button below to verify and activate your account</p>
        <asp:Panel ID="Message" runat="server"></asp:Panel>
        <asp:Button ID="verificationButton" runat="server" Text="Verify" CssClass="Button" OnClick="verificationButton_Click"/>
    </div>
    </form>
</body>
</html>
