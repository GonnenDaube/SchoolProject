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
            HtmlGenericControl errorCover = new HtmlGenericControl("div");
            errorCover.Attributes["style"] = "position:absolute; left:0%; top:0%; width:100%; height:100%; background-color:rgba(0,0,0,0.75);";
            HtmlGenericControl errorDiv = new HtmlGenericControl("div");
            errorDiv.Attributes["class"] = "errorPos panelColor";
            HtmlGenericControl errorMessage = new HtmlGenericControl("p");
            errorMessage.InnerHtml = "Error 404: it seems like this asset does not exist anymore!";
            errorDiv.Controls.Add(errorMessage);
            ErrorMessage.Controls.Add(errorCover);
            ErrorMessage.Controls.Add(errorDiv);
            ErrorMessage.CssClass = "ErrorMessage";
        }
        else
        {
            string extension = url.Substring(url.IndexOf('?') + 1);
            string item_id = extension.Substring(extension.IndexOf('=') + 1);

            //Get Asset content from web service using item_id
            if (item_id.Equals("Template"))
            {
                Rating.Text = "4.5";
                CreatorsName.Text = "Template Creator's Name";
                AssetName.Text = "Template Asset Name";
                AssetDescription.Text = "Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description";

                CreatorsName.ToolTip = "Template Creator's Name";
                AssetName.ToolTip = "Template Asset Name";
            }
        }
    }

    protected void Download_Btn_Click(object sender, EventArgs e)
    {

    }
}