using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using System.Data.SqlClient;
using Resources;
using System.Xml;
using System.IO;

public partial class Pages_AssetPage_AssetPage : System.Web.UI.Page
{
    private maker_service.WebService ws;
    private int model_id;


    protected void Page_Load(object sender, EventArgs e)
    {
        //gets model information from data base by model id in the url
        //clear TempModels file
        DirectoryInfo temp = new DirectoryInfo(Server.MapPath("/Resources/TempModels/"));
        foreach(FileInfo f in temp.GetFiles())
        {
            f.Delete();
        }

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
            Rating.Text = (Math.Floor(ws.GetRate(model_id) * 100) / 100).ToString();
            int userRate = ws.GetModelUserRate(model_id, (int)Session["user-id"]);
            string[] info = ws.GetModelInfo(model_id);

            camPos.Text = info[0];
            camLookAt.Text = info[1];

            positions.Text = info[2];
            colors.Text = info[3];
            normals.Text = info[4];


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
        //gets user name from model id
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
        //log download at web service and generate a model file
        //log downloads
        ws.InsertDownload((int)Session["user-id"], model_id);

        //construct download file
        string path = Server.MapPath("/Resources/TempModels/" + (AssetName.Text).Replace(' ', '_').Replace('.', '_').Replace('-','_').Replace(',','_') + ".obj");

        //generate string lines array
        List<string> linesList = new List<string>();
        linesList.Add("#model-makertron 2100 - v2.0 model");
        linesList.Add("#created by - " + CreatorsName.Text);
        linesList.Add("o " + (AssetName.Text).Replace(' ', '_').Replace('.', '_').Replace('-', '_').Replace(',', '_'));

        string posText = positions.Text;
        string colText = colors.Text;
        string norText = normals.Text;

        int numVert = 0;
        char[] cArr = posText.ToCharArray();
        for(int i = 0; i < cArr.Length; i++)
        {
            if (cArr[i].Equals(','))
                numVert++;
        }
        numVert /= 3;

        float val1, val2, val3;
        val1 = val2 = val3 = 0;

        //insert v's into file
        for(int i = 0; i < numVert; i++)
        {
            val1 = float.Parse(posText.Substring(0, posText.IndexOf(',')));
            posText = posText.Substring(posText.IndexOf(',') + 1);

            val2 = float.Parse(posText.Substring(0, posText.IndexOf(',')));
            posText = posText.Substring(posText.IndexOf(',') + 1);

            val3 = float.Parse(posText.Substring(0, posText.IndexOf(',')));
            posText = posText.Substring(posText.IndexOf(',') + 1);

            linesList.Add("v " + val1 + " " + val2 + " " + val3);
        }

        //insert vn's into file
        for (int i = 0; i < numVert; i++)
        {
            val1 = float.Parse(norText.Substring(0, norText.IndexOf(',')));
            norText = norText.Substring(norText.IndexOf(',') + 1);

            val2 = float.Parse(norText.Substring(0, norText.IndexOf(',')));
            norText = norText.Substring(norText.IndexOf(',') + 1);

            val3 = float.Parse(norText.Substring(0, norText.IndexOf(',')));
            norText = norText.Substring(norText.IndexOf(',') + 1);

            linesList.Add("vn " + val1 + " " + val2 + " " + val3);
        }

        //insert vc's into file
        for (int i = 0; i < numVert; i++)
        {
            val1 = float.Parse(colText.Substring(0, colText.IndexOf(',')));
            colText = colText.Substring(colText.IndexOf(',') + 1);

            val2 = float.Parse(colText.Substring(0, colText.IndexOf(',')));
            colText = colText.Substring(colText.IndexOf(',') + 1);

            val3 = float.Parse(colText.Substring(0, colText.IndexOf(',')));
            colText = colText.Substring(colText.IndexOf(',') + 1);

            linesList.Add("vc " + val1 + " " + val2 + " " + val3);
        }

        for(int i = 0; i < numVert; i += 3)
        {
            linesList.Add("f " + i + "/" + i + "/" + i + " " + (i + 1) + "/" + (i + 1) + "/" + (i + 1) + " " + (i + 2) + "/" + (i + 2) + "/" + (i + 2));
        }


        ws.CloseConnection();

        //convert to string array
        string[] arr = new string[linesList.Count];
        for(int i = 0; i<arr.Length; i++)
        {
            arr[i] = linesList[i];
        }

        if(!File.Exists(path))
            File.WriteAllLines(path, arr);

        FileInfo file = new FileInfo(path);
        
        if (file.Exists)
        {
            try
            {
                Response.Clear();
                Response.ClearHeaders();
                Response.ClearContent();
                Response.AddHeader("Content-Disposition", "attachment; filename=" + file.Name);
                Response.AddHeader("Content-Length", file.Length.ToString());
                Response.ContentType = "text/plain";
                Response.Flush();
                Response.TransmitFile(file.FullName);
                Response.End();
            }
            catch
            {

            }
        }
    }

    protected void UpdateRating(object sender, EventArgs e)
    {
        //updates model rating on rating changes
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