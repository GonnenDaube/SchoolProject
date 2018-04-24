using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Pages_WorkingSpace_WorkingSpace : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    protected void Upload_Click(object sender, EventArgs e)
    {
        //uploads model
        string thumbnail = thumbnail_url.Text;
        string name = model_name.Text;
        string desc = description.Value;
        string user_id = Session["user-id"].ToString();
        float[] positions = ConvertStringToFloatArray(model_position_data.Text);
        float[] colors = ConvertStringToFloatArray(model_color_data.Text);
        float[] normals = ConvertStringToFloatArray(model_normal_data.Text);
        float[] cameraPos = ConvertStringToFloatArray(camera_pos.Text);
        float[] lookingAt = ConvertStringToFloatArray(looking_at.Text);

        maker_service.WebService service = new maker_service.WebService();
        service.InsertModel((int)Session["user-id"], name, desc, positions, colors, normals, cameraPos, lookingAt, thumbnail);

        service.CloseConnection();
    }

    private float[] ConvertStringToFloatArray(string str)
    {
        //converts string to float array
        int countComma = str.Count(s => s == ',');
        if(countComma <= 0)
        {
            return null;
        }
        float[] arr = new float[countComma + 1];

        for(int i = 0; i < countComma; i++)
        {
            string current = str.Substring(0, str.IndexOf(','));
            arr[i] = float.Parse(current);

            //cut str
            str = str.Remove(0, str.IndexOf(',') + 1);
        }
        arr[countComma] = float.Parse(str);
        return arr;
    }
}