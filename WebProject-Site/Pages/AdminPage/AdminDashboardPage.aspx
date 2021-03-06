﻿<%@ Page Title="Admin Dashboard" Language="C#" MasterPageFile="~/Pages/MasterPage/MasterPage.master" AutoEventWireup="true" CodeFile="AdminDashboardPage.aspx.cs" Inherits="Pages_AdminPage_AdminDashboardPage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" Runat="Server">
    <div id="cards" class="card-holder">
        <!-- colors:
            rgb(216, 216, 216)
            rgb(252, 246, 189)
            rgb(208, 244, 222)
            rgb(222, 246, 202)
            rgb(248, 189, 196)
        -->
        <a id="user" href="DataTablePage.aspx?table=users" class="card" style="background-color:rgb(216, 216, 216)">
            <img src="/Resources/Icons/users_icon.png" class="dash-icon"/>
            <p class="dash-txt">USERS</p>
        </a>
        <a id="card0" href="DataTablePage.aspx?table=models" class="card" style="background-color:rgb(252, 246, 189)">
            <img src="/Resources/Icons/model_icon.png" class="dash-icon"/>
            <p class="dash-txt">Models</p>
        </a>
        <a id="card1" href="DataTablePage.aspx?table=downloads" class="card" style="background-color:rgb(208, 244, 222)">
            <img src="/Resources/Icons/download_icon.png" class="dash-icon"/>
            <p class="dash-txt">Downloads</p>
        </a>
        <a id="card2" href="DataTablePage.aspx?table=ratings" class="card" style="background-color:rgb(222, 246, 202)">
            <img src="/Resources/Icons/rating_icon.png" class="dash-icon"/>
            <p class="dash-txt">Ratings</p>
        </a>
    </div>
</asp:Content>

