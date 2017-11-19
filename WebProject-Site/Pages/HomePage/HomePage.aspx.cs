using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;

public partial class Pages_HomePage_HomePage : System.Web.UI.Page
{

    protected void Page_Load(object sender, EventArgs e)
    {
    }

    protected void SignUp(object sender, EventArgs e)
    {
        string connectionString = @"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFileName=|DataDirectory|\Database.mdf;Integrated Security=True";
        SqlConnection sqlConnection = new SqlConnection(connectionString);
        string sqlCmd = "INSERT INTO [Users] VALUES(@username,@password,@email,@content_creator,@content_consumer,'True');";
        SqlCommand sqlCommand = new SqlCommand(sqlCmd, sqlConnection);
        sqlCommand.Parameters.AddWithValue("@username", usernameBox.Text);
        sqlCommand.Parameters.AddWithValue("@password", passwordBox.Text);
        sqlCommand.Parameters.AddWithValue("@email", emailBox.Text);
        sqlCommand.Parameters.AddWithValue("@content_creator", content_creator.Value);
        sqlCommand.Parameters.AddWithValue("@content_consumer", content_consumer.Value);
        sqlConnection.Open();
        sqlCommand.ExecuteNonQuery();
        sqlConnection.Close();
    }
}