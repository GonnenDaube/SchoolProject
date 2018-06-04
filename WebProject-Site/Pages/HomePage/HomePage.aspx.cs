using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using System.Web.UI.HtmlControls;
using System.Net;
using System.Net.Mail;
using Resources;
using System.Security.Cryptography;

public partial class Pages_HomePage_HomePage : System.Web.UI.Page
{
    /// <summary>
    /// No function logic
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    protected void Page_Load(object sender, EventArgs e)
    {
    }

    /// <summary>
    /// sign up functionality
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    protected void SignUp(object sender, EventArgs e)
    {
        SqlConnection sqlConnection = new SqlConnection(resources.ResourceManager.GetString("Connection_String"));
        sqlConnection.Open();
        string sqlCmd = "SELECT * FROM [Users] WHERE username = @username;";
        SqlCommand sqlCommand = new SqlCommand(sqlCmd, sqlConnection);
        sqlCommand.Parameters.AddWithValue("@username", usernameBox.Text);
        SqlDataReader reader = sqlCommand.ExecuteReader();
        if (reader.HasRows)
        {// print error message
            HtmlGenericControl errorMessageDiv = new HtmlGenericControl("div");
            errorMessageDiv.Attributes["class"] = "TrenchFont WelcomeMessage";
            HtmlGenericControl errorMessageP = new HtmlGenericControl("p");
            errorMessageP.Attributes["style"] = "color:indianred;";
            errorMessageP.InnerHtml = "This username is already taken, please try again with a different one";
            errorMessageDiv.Controls.Add(errorMessageP);
            WelcomeMessage.Controls.Add(errorMessageDiv);
            reader.Close();
        }
        else
        {
            reader.Close();
            //Generate Id
            int key = KeyGenerator();
            string color = ColorGenerator();

            //Submit form

            sqlCmd = "INSERT INTO [Users] VALUES(@username,@password,@email,@content_creator,@content_consumer,'False',@key,@color,'False');";
            sqlCommand = new SqlCommand(sqlCmd, sqlConnection);
            sqlCommand.Parameters.AddWithValue("@username", usernameBox.Text);
            sqlCommand.Parameters.AddWithValue("@password", passwordBox.Text);
            sqlCommand.Parameters.AddWithValue("@email", emailBox.Text);
            sqlCommand.Parameters.AddWithValue("@content_creator", content_creator.Text);
            sqlCommand.Parameters.AddWithValue("@content_consumer", content_consumer.Text);
            sqlCommand.Parameters.AddWithValue("@key", key);//random key used for validation
            sqlCommand.Parameters.AddWithValue("@color", color);
            sqlCommand.ExecuteNonQuery();

            //Update WebService
            int id = 0;
            sqlCmd = "SELECT Id FROM [Users] WHERE username = @username;";
            sqlCommand = new SqlCommand(sqlCmd, sqlConnection);
            sqlCommand.Parameters.AddWithValue("@username", usernameBox.Text);
            reader = sqlCommand.ExecuteReader();
            if (reader.Read())
            {
                id = reader.GetInt32(0);
            }
            maker_service.WebService ws = new maker_service.WebService();
            ws.InsertUser(id);


            //send verification email
            MailMessage mail = new MailMessage();
            mail.From = new MailAddress(resources.ResourceManager.GetString("Site_Email_Address"), "Model Makertron 2100 - v2.0");
            mail.To.Add(new MailAddress(emailBox.Text));
            mail.Subject = "Verify your new Account!";
            mail.IsBodyHtml = false;
            string message = "Dear " + usernameBox.Text + ",";
            message += "\nCongratulations on your registration to Model Makertron 2100 - v2.0!";
            message += "\nTo verify it was you who tried to register to Model Makertron 2100 - v2.0 click the link below.";
            message += "\nIf it wasn't you who registered ignore this mail.";
            message += "\nhttp://localhost:57143/Pages/VerificationPage/VerificationPage.aspx?" + key;
            mail.Body = message;

            SmtpClient smtp = new SmtpClient();
            smtp.Host = "smtp.gmail.com";
            smtp.EnableSsl = true;
            NetworkCredential networkCred = new NetworkCredential(resources.ResourceManager.GetString("Site_Email_Address"), resources.ResourceManager.GetString("Site_Email_Password"));
            smtp.UseDefaultCredentials = true;
            smtp.Credentials = networkCred;
            try
            {
                smtp.Port = 587;
                smtp.Send(mail);
                //print verification message
                HtmlGenericControl registrationMessageDiv = new HtmlGenericControl("div");
                registrationMessageDiv.Attributes["class"] = "TrenchFont WelcomeMessage";
                HtmlGenericControl registrationMessageP = new HtmlGenericControl("p");
                registrationMessageP.InnerHtml = "Verification Email has been sent to your email account!";
                registrationMessageDiv.Controls.Add(registrationMessageP);
                WelcomeMessage.Controls.Add(registrationMessageDiv);
            }
            catch
            {
                try
                {// make sure email sending did not fail because of port issues
                    smtp.Port = 465;
                    smtp.Send(mail);
                    //print verification message
                    HtmlGenericControl registrationMessageDiv = new HtmlGenericControl("div");
                    registrationMessageDiv.Attributes["class"] = "TrenchFont WelcomeMessage";
                    HtmlGenericControl registrationMessageP = new HtmlGenericControl("p");
                    registrationMessageP.InnerHtml = "Verification Email has been sent to your email account!";
                    registrationMessageDiv.Controls.Add(registrationMessageP);
                    WelcomeMessage.Controls.Add(registrationMessageDiv);
                }
                catch
                {// something is wrong with email address
                    HtmlGenericControl error = new HtmlGenericControl("div");
                    error.Attributes["class"] = "TrenchFont WelcomeMessage error";
                    HtmlGenericControl errorP = new HtmlGenericControl("p");
                    errorP.InnerHtml = "Email address is not correct!";
                    error.Controls.Add(errorP);
                    WelcomeMessage.Controls.Add(error);
                }
            }
        }
        sqlConnection.Close();


        ////reset values
        usernameBox.Text = "";
        emailBox.Text = "";
        passwordBox.Text = "";
        content_creator.Text = "False";
        content_consumer.Text = "False";
    }

    /// <summary>
    /// generates a random key to be checked on validation
    /// </summary>
    /// <returns></returns>
    private int KeyGenerator()
    {
        using (RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider())
        {
            // Buffer storage.
            byte[] data = new byte[4];
            // Fill buffer.
            rng.GetBytes(data);
            // Convert to int 32.
            return BitConverter.ToInt32(data, 0);
        }
    }

    /// <summary>
    /// generates a random color for each user
    /// </summary>
    /// <returns></returns>
    private string ColorGenerator()
    {
        string[] colors = new string[5];
        colors[0] = "rgb(10, 16, 13)";
        colors[1] = "rgb(176, 186, 0)";
        colors[2] = "rgb(216, 203, 62)";
        colors[3] = "rgb(162, 44, 41)";
        colors[4] = "rgb(144, 41, 35)";
        Random rnd = new Random();
        int pos = rnd.Next(0, colors.Length);
        return colors[pos];
    }

    /// <summary>
    /// login functionality
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    protected void Login(object sender, EventArgs e)
    {
        SqlConnection sqlConnection = new SqlConnection(resources.ResourceManager.GetString("Connection_String"));
        sqlConnection.Open();
        string sqlCmd = "SELECT * FROM [Users] WHERE password = @password AND email = @email AND validated = 'True';";
        SqlCommand sqlCommand = new SqlCommand(sqlCmd, sqlConnection);
        sqlCommand.Parameters.AddWithValue("@password", passwordLogInBox.Text);
        sqlCommand.Parameters.AddWithValue("@email", emailLogInBox.Text);
        SqlDataReader reader = sqlCommand.ExecuteReader();
        if (reader.HasRows)
        {
            if (reader.Read())
            {
                Session["user-id"] = reader.GetInt32(0);
                Session["username"] = reader.GetString(1);
                Session["user-color"] = reader.GetString(8);
                Session["admin"] = reader.GetBoolean(9);
            }
            reader.Close();
            sqlConnection.Close();
            loginMessage.Controls.Clear();
            Response.Redirect("http://localhost:57143/Pages/HomePage/HomePage.aspx");
        }
        else
        {
            reader.Close();
            sqlConnection.Close();
            HtmlGenericControl message = new HtmlGenericControl("p");
            message.Attributes["style"] = "position:absolute; width:100%; margin-left:auto; margin-right:auto; text-align:center; top:0%";
            message.Attributes["class"] = "TrenchFont";
            message.InnerHtml = "Could not log in: Password or Email are incorrect";
            loginMessage.Controls.Add(message);
        }
    }

    /// <summary>
    /// checks if username is already taken and puts an error message
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    protected void usernameBox_TextChanged(object sender, EventArgs e)
    {
        SqlConnection sqlConnection = new SqlConnection(resources.ResourceManager.GetString("Connection_String"));
        sqlConnection.Open();
        string sqlCmd = "SELECT * FROM [Users] WHERE username = @username;";
        SqlCommand sqlCommand = new SqlCommand(sqlCmd,sqlConnection);
        sqlCommand.Parameters.AddWithValue("@username", usernameBox.Text);
        SqlDataReader reader = sqlCommand.ExecuteReader();
        if (!reader.HasRows)
        {// print error message
            HtmlGenericControl message = new HtmlGenericControl("p");
            message.Attributes["style"] = "position:absolute; width:100%; margin-left:auto; margin-right:auto; text-align:center; top:0%; color:indianred";
            message.Attributes["class"] = "TrenchFont";
            message.InnerHtml = "This username is already taken";
            WelcomeMessage.Controls.Add(message);
        }
    }
}