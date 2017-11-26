using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;

public partial class Pages_MasterPage_MasterPage : System.Web.UI.MasterPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Session["user-id"] != null && Session["user-id"].ToString().Length > 0)
        {
            profile_link.Attributes["style"] = "visibility: visible";
            if (Session["user-name"] != null)//TODO: remove
                profile_txt.InnerHtml = Session["user-name"].ToString();
        }
    }
}
