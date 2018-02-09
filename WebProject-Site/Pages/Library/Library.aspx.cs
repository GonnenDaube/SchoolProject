using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using System.Data.SqlClient;
using Resources;

public partial class Pages_Library_Library : System.Web.UI.Page
{
    maker_service.WebService ws;

    protected void Page_Load(object sender, EventArgs e)
    {
        //Gets asstes id's
        ws = new maker_service.WebService();

        int[] ids = ws.GetModelIds();
        
        for(int i = 0; i < ids.Length; i++)
        {
            AssetPanel.Controls.Add(GenerateAssetControl(i, ids[i]));//would get asset id
        }

        ws.CloseConnection();
    }

    private HtmlGenericControl GenerateAssetControl(int index, int model_id)
    {// gets asset id and generates an Asset Control from it
        HtmlGenericControl asset = new HtmlGenericControl("div");
        asset.Attributes["class"] = "Asset";
        if (index % 4 == 0)//is new line
        {
            asset.Attributes["style"] = "margin-left:0vw";
        }


        asset.Controls.Add(GenerateThumbnailControl(model_id));
        asset.Controls.Add(GenerateDescriptionControl(model_id));
        return asset;
    }

    private Image GenerateThumbnailControl(int model_id)
    {// gets asset id and generates thumbnail control from it
        Image thumbnail = new Image();
        thumbnail.CssClass = "thumbnail";
        thumbnail.ImageUrl = ws.GetModelThumbnail(model_id);
        
        return thumbnail;
    }

    private HtmlGenericControl GenerateDescriptionControl(int model_id)
    {// gets asset id and generates description control from it
        HtmlGenericControl description = new HtmlGenericControl("div");
        description.Attributes["class"] = "description";

        HtmlGenericControl assetname = new HtmlGenericControl("p");
        assetname.Attributes["class"] = "AssetName";
        assetname.InnerHtml = ws.GetModelName(model_id);
        HtmlGenericControl createdBy = new HtmlGenericControl("p");
        createdBy.Attributes["class"] = "CreatedBy";
        createdBy.InnerHtml = "by " + GetUserName(model_id);

        description.Controls.Add(assetname);
        description.Controls.Add(createdBy);
        description.Controls.Add(GenerateExpandButton(model_id));

        return description;
    }

    private string GetUserName(int model_id)
    {
        int userId = ws.GetCreatorUserId(model_id);

        SqlConnection sqlConnection = new SqlConnection(resources.ResourceManager.GetString("Connection_String"));

        if(sqlConnection.State != System.Data.ConnectionState.Open)
        {
            sqlConnection.Open();
        }

        string query = "SELECT username FROM [Users] Where Id = @user_id;";
        SqlCommand sqlCmd = new SqlCommand(query, sqlConnection);
        sqlCmd.Parameters.AddWithValue("@user_id", userId);
        SqlDataReader reader = sqlCmd.ExecuteReader();

        string username = "";

        if (reader.Read())
        {
            username = reader.GetString(0);
        }

        return username;

    }

    private HtmlGenericControl GenerateExpandButton(int model_id)
    {// gets asset id and generates a link button that redirects for asset page
        HtmlGenericControl expand = new HtmlGenericControl("a");
        expand.Attributes["class"] = "ExpandBtn";
        expand.Attributes["href"] = "/Pages/AssetPage/AssetPage.aspx?" + model_id;//adds item id to the end of the url

        HtmlGenericControl icon = new HtmlGenericControl("img");
        icon.Attributes["class"] = "ExpandIcon";
        icon.Attributes["src"] = "/Resources/Icons/library_expand_icon.png";
        expand.Controls.Add(icon);

        return expand;
    }
}