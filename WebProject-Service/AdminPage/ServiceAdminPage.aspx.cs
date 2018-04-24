using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class AdminPage_ServiceAdminPage : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        //check if user entered admin password inside the url
        string password = Request.Url.AbsoluteUri.Substring(Request.Url.AbsoluteUri.IndexOf("?admin-password=") + "?admin-password=".Length);
        if (!password.Equals("1234567890"))
            Response.Redirect("http://localhost:57243/AdminPage/ErrorAdminPage.aspx");
    }
}