using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using System.Data.SqlClient;
using Resources;

public partial class Pages_AssetPage_AssetPage : System.Web.UI.Page
{
    maker_service.WebService ws;
    int model_id;


    protected void Page_Load(object sender, EventArgs e)
    {
        string url = Request.Url.AbsoluteUri;// /Pages/AssetPage.aspx?item_id=200134
        try
        {
            model_id = int.Parse(url.Substring(url.IndexOf('?') + 1));

            ws = new maker_service.WebService();

            CreatorsName.Text = GetUserName(model_id);
            CreatorsName.ToolTip = CreatorsName.Text;
            AssetName.Text = ws.GetModelName(model_id);
            AssetName.ToolTip = AssetName.Text;
            AssetDescription.Text = ws.GetModelDescription(model_id);
            Rating.Text = ws.GetRate(model_id).ToString();
            int userRate = ws.GetModelUserRate(model_id, (int)Session["user-id"]);

            selectedImg0.CssClass = "shownImg";
            selectedImg1.CssClass = "shownImg";
            selectedImg2.CssClass = "shownImg";
            selectedImg3.CssClass = "shownImg";
            selectedImg4.CssClass = "shownImg";

            if(userRate < 5)
            {
                selectedImg4.CssClass = "hiddenImg";
            }
            if(userRate < 4)
            {
                selectedImg3.CssClass = "hiddenImg";
            }
            if(userRate < 3)
            {
                selectedImg2.CssClass = "hiddenImg";
            }
            if(userRate < 2)
            {
                selectedImg1.CssClass = "hiddenImg";
            }
            if(userRate < 1)
            {
                selectedImg0.CssClass = "hiddenImg";
            }

            ws.CloseConnection();
        }
        catch//if anything failed print Error 404
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
    }

    private string GetUserName(int model_id)
    {
        int userId = ws.GetCreatorUserId(model_id);

        SqlConnection sqlConnection = new SqlConnection(resources.ResourceManager.GetString("Connection_String"));

        if (sqlConnection.State != System.Data.ConnectionState.Open)
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

    protected void Download_Btn_Click(object sender, EventArgs e)
    {

    }

    protected void UpdateRating(object sender, EventArgs e)
    {
        string senderId = ((ImageButton)sender).ID;
        int rate = int.Parse(senderId.Substring(senderId.IndexOf('n') + 1)) + 1;
        ws.InsertRating((int)Session["user-id"], model_id, rate);

        Rating.Text = ws.GetRate(model_id).ToString();
        int userRate = ws.GetModelUserRate(model_id, (int)Session["user-id"]);

        selectedImg0.CssClass = "shownImg";
        selectedImg1.CssClass = "shownImg";
        selectedImg2.CssClass = "shownImg";
        selectedImg3.CssClass = "shownImg";
        selectedImg4.CssClass = "shownImg";

        if (userRate < 5)
        {
            selectedImg4.CssClass = "hiddenImg";
        }
        if (userRate < 4)
        {
            selectedImg3.CssClass = "hiddenImg";
        }
        if (userRate < 3)
        {
            selectedImg2.CssClass = "hiddenImg";
        }
        if (userRate < 2)
        {
            selectedImg1.CssClass = "hiddenImg";
        }
        if (userRate < 1)
        {
            selectedImg0.CssClass = "hiddenImg";
        }

        ws.CloseConnection();
    }
}