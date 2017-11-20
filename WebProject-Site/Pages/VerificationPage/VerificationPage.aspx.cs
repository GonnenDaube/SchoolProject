using Resources;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;

public partial class Pages_VerificationPage_VerificationPage : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    protected void verificationButton_Click(object sender, EventArgs e)
    {
        string url = Request.Url.AbsoluteUri;
        bool isCorrectKey = false;
        if (url.Contains('?') && IsNumeric(url.Substring(url.IndexOf('?') + 1)))
        {
            int key = int.Parse(url.Substring(url.IndexOf('?') + 1));
            //connect to data base
            SqlConnection sqlConnection = new SqlConnection(resources.ResourceManager.GetString("Connection_String"));
            sqlConnection.Open();

            //validate key matches a non validated user in data base
            string sqlCmd = "SELECT COUNT(*) FROM [Users] WHERE RandomKey = @key AND validated = 'False';";
            SqlCommand sqlCommand = new SqlCommand(sqlCmd, sqlConnection);
            sqlCommand.Parameters.AddWithValue("@key", key);
            SqlDataReader reader = sqlCommand.ExecuteReader();
            if (reader.Read())
            {
                isCorrectKey = reader.GetInt32(0) > 0;//if 0, key does not match
            }
            reader.Close();

            if (isCorrectKey)
            {
                //if validated, update user to validated
                sqlCmd = "UPDATE [Users] SET validated = 'True' WHERE RandomKey = @key AND validated = 'False';";
                sqlCommand = new SqlCommand(sqlCmd, sqlConnection);
                sqlCommand.Parameters.AddWithValue("@key", key);
                sqlCommand.ExecuteNonQuery();
                HtmlGenericControl verificationMessage = new HtmlGenericControl("p");
                verificationMessage.Attributes["style"] = "position:absolute; left:0%; top:50%;width:100%; font-size:2vw; margin-left:auto; margin-right:auto; text-align:center; margin-top:0%; margin-bottom:0%; color:rgb(106, 155, 0);";
                verificationMessage.Attributes["class"] = "TrenchFont";
                verificationMessage.InnerHtml = "Your account has been verified!";
                Message.Controls.Add(verificationMessage);
            }
            sqlConnection.Close();
        }
        if(!isCorrectKey)
        {
            //error message on screen
            HtmlGenericControl errorMessage = new HtmlGenericControl("p");
            errorMessage.Attributes["style"] = "position:absolute; left:0%; top:50%;width:100%; font-size:2vw; margin-left:auto; margin-right:auto; text-align:center; margin-top:0%; margin-bottom:0%; color:indianred";
            errorMessage.Attributes["class"] = "TrenchFont";
            errorMessage.InnerHtml = "In order to verify and activate your account, use the link in the email we sent you";
            Message.Controls.Add(errorMessage);
        }
    }

    private bool IsNumeric(string str)
    {
        try
        {
            int.Parse(str);
            return true;
        }
        catch// wasn't numeric
        {
            return false;
        }
    }
}