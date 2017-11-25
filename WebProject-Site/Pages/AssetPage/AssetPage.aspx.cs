using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;

public partial class Pages_AssetPage_AssetPage : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string url = Request.Url.AbsoluteUri;// /Pages/AssetPage.aspx?item_id=200134
        if (!url.Contains('?'))//url does not contain item id
        {
            HtmlGenericControl errorMessage = new HtmlGenericControl("p");
            errorMessage.InnerHtml = "Error 404: it seems like this asset does not exist anymore!";
            ErrorMessage.Controls.Add(errorMessage);
        }
        else
        {
            string extension = url.Substring(url.IndexOf('?') + 1);
            string item_id = extension.Substring(extension.IndexOf('=') + 1);

            //Get Asset content from web service using item_id
        }
    }
}