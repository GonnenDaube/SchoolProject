﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;

public partial class Pages_MasterPage_MasterPage : System.Web.UI.MasterPage
{
    /// <summary>
    /// if a guest is in a forbidden page redirect to home page
    /// if a user add profile page (and admin page) button to the page
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    protected void Page_Load(object sender, EventArgs e)
    {
        if(Session["user-id"] == null && (!(Request.Url.AbsolutePath.Contains("HomePage.aspx") || Request.Url.AbsolutePath.Contains("Library.aspx")) || (Request.Url.AbsolutePath.Contains("AdminPage") && Session["admin"] != null && !(bool)Session["admin"])))
        {
            Response.Redirect("http://localhost:57143/Pages/HomePage/HomePage.aspx#loginDiv");
        }
        if (Session["user-id"] != null && Session["user-id"].ToString().Length > 0 && Session["username"] != null && Session["admin"] != null)
        {
            profile_div.Attributes["style"] = "visibility: visible";
            profile_letter.InnerHtml = Session["username"].ToString().ToUpper().Substring(0, 1);
            profile_color.Attributes["style"] = "background-color:" + Session["user-color"];
            if((bool)Session["admin"])
            {
                admin_div.Attributes["style"] = "visibility: visible";
            }
        }
    }
}
