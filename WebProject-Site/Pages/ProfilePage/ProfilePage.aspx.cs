using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;

public partial class Pages_ProfilePage_ProfilePage : System.Web.UI.Page
{
    /// <summary>
    /// tab color array
    /// </summary>
    private string[] colors;
    /// <summary>
    /// random number generator object
    /// </summary>
    private Random rnd;
    /// <summary>
    /// an instance of the maker_service
    /// </summary>
    private maker_service.WebService ws;

    /// <summary>
    /// generates asset tabs to enable a user to look at the models it created
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    protected void Page_Load(object sender, EventArgs e)
    {
        colors = new string[5];
        colors[0] = "rgb(216, 216, 216)";
        colors[1] = "rgb(252, 246, 189)";
        colors[2] = "rgb(208, 244, 222)";
        colors[3] = "rgb(222, 246, 202)";
        colors[4] = "rgb(248, 189, 196)";
        rnd = new Random();

        ws = new maker_service.WebService();

        int[] ids = ws.GetModelIdsByUserId((int)Session["user-id"]);

        for(int i = 0; i < ids.Length; i++)// get asset list from web service and loop through
        {
            Asset_Holder.Controls.Add(GenerateAssetFile(i, ids.Length, ids[i]));
        }

        ws.CloseConnection();
    }

    /// <summary>
    /// generates a "file" containing asset information and a tab
    /// </summary>
    /// <param name="index"></param>
    /// <param name="total"></param>
    /// <param name="model_id"></param>
    /// <returns></returns>
    private HtmlGenericControl GenerateAssetFile(int index, int total, int model_id)
    {
        HtmlGenericControl file_div = new HtmlGenericControl("div");
        file_div.ID = "file-div-" + index;
        if(index != 0)
        {
            file_div.Attributes["class"] = "asset-file-div asset-back-up-div";
        }
        else
        {
            file_div.Attributes["class"] = "asset-file-div";
        }
        file_div.Attributes["style"] = "z-index:" + (total - index);
        string color = colors[index % colors.Length];
        file_div.Controls.Add(GenerateTab(index, total, color, model_id));
        file_div.Controls.Add(GenerateFile(index, color, model_id));
        return file_div;
    }

    /// <summary>
    /// generates a tab that can be clicked in order to show model info
    /// </summary>
    /// <param name="index"></param>
    /// <param name="total"></param>
    /// <param name="color"></param>
    /// <param name="model_id"></param>
    /// <returns></returns>
    private HtmlGenericControl GenerateTab(int index, int total, string color, int model_id)
    {
        HtmlGenericControl tab = new HtmlGenericControl("div");
        tab.ID = "file-tab-" + index;
        tab.Attributes["class"] = "asset-file-tab";
        float width = 15;
        float leftPos = 0;
        if(total > 1)
            leftPos = 85 * index / (total - 1);
        if(leftPos > 15 * index)
        {
            leftPos = 15 * index;
        }
        tab.Attributes["style"] = "left:" + leftPos + "%; width:" + width + "%; background-color:" + color;
        tab.Attributes["onclick"] = "putInfront(" + index + ");";

        HtmlGenericControl tabTxt = new HtmlGenericControl("p");
        tabTxt.InnerHtml = ws.GetModelName(model_id);
        tabTxt.Attributes["class"] = "tab-txt Report1942Font";
        tab.Controls.Add(tabTxt);
        return tab;
    }

    /// <summary>
    /// generate a file containing model info
    /// </summary>
    /// <param name="index"></param>
    /// <param name="color"></param>
    /// <param name="model_id"></param>
    /// <returns></returns>
    private HtmlGenericControl GenerateFile(int index, string color, int model_id)
    {
        HtmlGenericControl file = new HtmlGenericControl("div");
        file.Attributes["class"] = "asset-file-color";
        file.Attributes["style"] = "background-color:" + color;
        file.Attributes["onclick"] = "putInfront(" + index + ");";

        HtmlGenericControl thumbnail = new HtmlGenericControl("img");
        thumbnail.Attributes["src"] = ws.GetModelThumbnail(model_id);
        thumbnail.Attributes["class"] = "thumbnail-profile";

        Button edit_btn = GenerateButton("VIEW", "view-btn", model_id);
        Button delete_btn = GenerateButton("DELETE", "delete-btn", model_id);

        HtmlGenericControl rating = new HtmlGenericControl("p");
        rating.Attributes["id"] = "asset-rate-" + index;
        rating.Attributes["class"] = "asset-rate Report1942Font";
        rating.InnerHtml = (Math.Floor(ws.GetRate(model_id) * 100) / 100).ToString() + "/5";

        Label[] labelX, labelY;
        HtmlGenericControl graph = GenerateAssetGraph(index, model_id, out labelX, out labelY);

        file.Controls.Add(thumbnail);
        file.Controls.Add(edit_btn);
        file.Controls.Add(delete_btn);
        file.Controls.Add(rating);
        file.Controls.Add(graph);
        foreach(Label lbl in labelX)
        {
            file.Controls.Add(lbl);
        }
        foreach (Label lbl in labelY)
        {
            file.Controls.Add(lbl);
        }
        return file;
    }

    /// <summary>
    /// generates a button
    /// </summary>
    /// <param name="name"></param>
    /// <param name="posClass"></param>
    /// <param name="model_id"></param>
    /// <returns></returns>
    private Button GenerateButton(string name, string posClass, int model_id)
    {
        Button button = new Button();
        button.CssClass = "profile-action-button Report1942Font " + posClass;

        button.Text = name;

        button.ToolTip = model_id.ToString();

        if (name.Equals("DELETE"))
            button.Click += new EventHandler(Delete_Model_Click);
        if(name.Equals("VIEW"))
            button.Click += new EventHandler(View_Model_Click);
        return button;
    }

    /// <summary>
    /// called if delete button is clicked (deletes model)
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    private void Delete_Model_Click(object sender, EventArgs e)
    {
        int model_id = int.Parse(((Button)sender).ToolTip);

        string[] name = { "@model_id" };
        string[] value = { model_id.ToString() };
        string[] type = { "int" };

        ws.GenericVoidQueryWithParameters("DELETE FROM [Downloads] WHERE Model_Id = @model_id;", name, value, type);
        ws.GenericVoidQueryWithParameters("DELETE FROM [Ratings] WHERE Model_Id = @model_id;", name, value, type);
        ws.GenericVoidQueryWithParameters("DELETE FROM [Models] WHERE Model_Id = @model_id;", name, value, type);

        Response.Redirect(Request.Url.AbsoluteUri);
    }

    /// <summary>
    /// called if view button is clicked, redirects to model page
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    private void View_Model_Click(object sender, EventArgs e)
    {
        int model_id = int.Parse(((Button)sender).ToolTip);

        Response.Redirect("http://localhost:57143/Pages/AssetPage/AssetPage.aspx?" + model_id);
    }

    /// <summary>
    /// generates a graph containing downloads per date
    /// </summary>
    /// <param name="index"></param>
    /// <param name="model_id"></param>
    /// <param name="labelX"></param>
    /// <param name="labelY"></param>
    /// <returns></returns>
    private HtmlGenericControl GenerateAssetGraph(int index, int model_id, out Label[] labelX, out Label[] labelY)
    {
        HtmlGenericControl svg = new HtmlGenericControl("svg");
        svg.Attributes["class"] = "asset-graph";

        string[] mat = ws.GetDownloadCountArray(model_id);

        labelX = new Label[5];
        labelY = new Label[5];

        for(int i = 0; i < labelX.Length; i++)
        {
            labelX[i] = new Label();
            labelY[i] = new Label();
        }

        if (mat.Length > 0)
        {
            Dictionary<DateTime, int> dateCount = new Dictionary<DateTime, int>();

            for (int i = 0; i < mat.Length / 2; i++)
            {
                dateCount.Add(ConvertToDate(mat[i]), int.Parse(mat[mat.Length / 2 + i]));
            }

            Dictionary<TimeSpan, int> timeCount = new Dictionary<TimeSpan, int>();

            //offset from first date

            DateTime reference = dateCount.First().Key;

            for (int i = 0; i < dateCount.Count; i++)
            {
                timeCount.Add(dateCount.ElementAt(i).Key.Subtract(reference), dateCount.ElementAt(i).Value);
            }

            //multiply years by 365 and months by 30

            HtmlGenericControl xAxis = new HtmlGenericControl("polyline");
            xAxis.Attributes["fill"] = "none";
            xAxis.Attributes["stroke"] = "black";
            xAxis.Attributes["stroke-width"] = "2";
            xAxis.Attributes["points"] = "1,0 0,0 0,1";

            HtmlGenericControl[] marks = new HtmlGenericControl[10];

            for(int i = 0; i < marks.Length; i++)
            {
                marks[i] = new HtmlGenericControl("polyline");
                marks[i].Attributes["fill"] = "none";
                marks[i].Attributes["stroke"] = "lightgray";
                marks[i].Attributes["stroke-width"] = "2";
                marks[i].Attributes["points"] = "0,0 1,0";
            }

            DateTime first = dateCount.First().Key;
            int max_value = CalcMaxCount(timeCount);
            TimeSpan offset = CalcAxisOffset(dateCount);

            for(int i = 0; i < labelX.Length; i++)
            {
                labelX[i] = new Label();
                labelX[i].Text = ((i + 1) * max_value / labelX.Length).ToString();
                labelX[i].CssClass = "label-x" + i;
            }

            for (int i = 0; i < labelY.Length; i++)
            {
                DateTime date = first;
                for(int k = 0; k <= i; k++)
                {
                    date = date.Add(offset);
                }
                labelY[i] = new Label();
                labelY[i].Text = (date).ToShortDateString();
                labelY[i].CssClass = "label-y" + i;
            }


            HtmlGenericControl polyline = new HtmlGenericControl("polyline");
            polyline.Attributes["fill"] = "none";
            polyline.Attributes["stroke"] = "rgb(0, 255, 0)";
            polyline.Attributes["stroke-width"] = "3";

            polyline.Attributes["points"] = "";
            for (int i = 0; i < dateCount.Count; i++)
            {
                polyline.Attributes["points"] += timeCount.ElementAt(i).Key.TotalDays + "," + timeCount.ElementAt(i).Value + " ";
            }

            svg.Controls.Add(polyline);
            svg.Controls.Add(xAxis);

            for(int i = 0; i < marks.Length; i++)
            {
                svg.Controls.Add(marks[i]);
            }
        }
        else
        {
            HtmlGenericControl xAxis = new HtmlGenericControl("polyline");
            xAxis.Attributes["fill"] = "none";
            xAxis.Attributes["stroke"] = "black";

            xAxis.Attributes["points"] = "1,0 0,0 0,1";

            HtmlGenericControl[] marks = new HtmlGenericControl[10];

            for (int i = 0; i < marks.Length; i++)
            {
                marks[i] = new HtmlGenericControl("polyline");
                marks[i].Attributes["fill"] = "none";
                marks[i].Attributes["stroke"] = "lightgray";

                marks[i].Attributes["points"] = "0,0 1,0";
            }

            HtmlGenericControl polyline = new HtmlGenericControl("polyline");
            polyline.Attributes["fill"] = "none";
            polyline.Attributes["stroke"] = "rgb(0, 255, 0)";


            polyline.Attributes["points"] = "0,0 0,0 ";

            svg.Controls.Add(polyline);

            svg.Controls.Add(xAxis);

            for (int i = 0; i < marks.Length; i++)
            {
                svg.Controls.Add(marks[i]);
            }
        }

        return svg;
    }

    /// <summary>
    /// calcs the offset between dates
    /// </summary>
    /// <param name="timeCount"></param>
    /// <returns></returns>
    private TimeSpan CalcAxisOffset(Dictionary<DateTime, int> timeCount)
    {
        DateTime first = timeCount.First().Key;
        DateTime last = timeCount.Last().Key;

        TimeSpan offset = last.Subtract(first);
        TimeSpan smallOffset = TimeSpan.FromDays(offset.TotalDays / 5);
        return smallOffset;
    }

    /// <summary>
    /// finds the max downloads per day
    /// </summary>
    /// <param name="timeCount"></param>
    /// <returns></returns>
    private int CalcMaxCount(Dictionary<TimeSpan, int> timeCount)
    {
        int max = 0;
        for(int i = 0; i<timeCount.Count; i++)
        {
            if (max < timeCount.ElementAt(i).Value)
                max = timeCount.ElementAt(i).Value;
        }
        return max;
    }

    /// <summary>
    /// converts date string into DateTime object
    /// </summary>
    /// <param name="date"></param>
    /// <returns></returns>
    private DateTime ConvertToDate(string date)
    {
        DateTime result;
        if (DateTime.TryParse(date, out result))
            // in DD/MM/YYYY format
            return result;
        else
        {// in MM/DD/YYYY format
            int month, day, year;
            month = int.Parse(date.Substring(0, date.IndexOf("/")));
            date = date.Substring(date.IndexOf("/") + 1);

            day = int.Parse(date.Substring(0, date.IndexOf("/")));
            date = date.Substring(date.IndexOf("/") + 1);

            year = int.Parse(date.Substring(0, date.IndexOf(" ")));

            return new DateTime(year, month, day);
        }
            
    }
}