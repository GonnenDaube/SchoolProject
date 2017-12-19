using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;

public partial class Pages_Library_Library : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        //Gets asstes id's
        
        for(int i = 0; i < 100; i++)
        {
            AssetPanel.Controls.Add(GenerateAssetControl(i));//would get asset id
        }
    }

    private HtmlGenericControl GenerateAssetControl(int index)
    {// gets asset id and generates an Asset Control from it
        HtmlGenericControl asset = new HtmlGenericControl("div");
        asset.Attributes["class"] = "Asset";
        if (index % 4 == 0)//is new line
        {
            asset.Attributes["style"] = "margin-left:0vw";
        }


        asset.Controls.Add(GenerateThumbnailControl());
        asset.Controls.Add(GenerateDescriptionControl());
        return asset;
    }

    private HtmlGenericControl GenerateThumbnailControl()
    {// gets asset id and generates thumbnail control from it
        HtmlGenericControl thumbnail = new HtmlGenericControl("img");
        thumbnail.Attributes["class"] = "thumbnail";
        thumbnail.Attributes["src"] = "/Resources/Images/polygon-mountain.jpg";//Gets url from web service

        return thumbnail;
    }

    private HtmlGenericControl GenerateDescriptionControl()
    {// gets asset id and generates description control from it
        HtmlGenericControl description = new HtmlGenericControl("div");
        description.Attributes["class"] = "description";

        HtmlGenericControl assetname = new HtmlGenericControl("p");
        assetname.Attributes["class"] = "AssetName";
        assetname.InnerHtml = "Asset Name";//Gets name from web service
        HtmlGenericControl createdBy = new HtmlGenericControl("p");
        createdBy.Attributes["class"] = "CreatedBy";
        createdBy.InnerHtml = "by Creator's Name";//Gets name from web service

        description.Controls.Add(assetname);
        description.Controls.Add(createdBy);
        description.Controls.Add(GenerateExpandButton());

        return description;
    }

    private HtmlGenericControl GenerateExpandButton()
    {// gets asset id and generates a link button that redirects for asset page
        HtmlGenericControl expand = new HtmlGenericControl("a");
        expand.Attributes["class"] = "ExpandBtn";
        expand.Attributes["href"] = "/Pages/AssetPage/AssetPage.aspx?Template";//adds item id to the end of the url

        HtmlGenericControl icon = new HtmlGenericControl("img");
        icon.Attributes["class"] = "ExpandIcon";
        icon.Attributes["src"] = "/Resources/Icons/dropdown_icon.png";
        expand.Controls.Add(icon);

        return expand;
    }
}