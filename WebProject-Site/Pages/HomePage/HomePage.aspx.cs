using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Web.UI.HtmlControls;
using System.Net;
using System.Net.Mail;
using Resources;
using System.Security.Cryptography;

public partial class Pages_HomePage_HomePage : System.Web.UI.Page
{

    protected void Page_Load(object sender, EventArgs e)
    {
    }

    protected void SignUp(object sender, EventArgs e)
    {
        //Generate Id
        int key = KeyGenerator();

        //Submit form
        SqlConnection sqlConnection = new SqlConnection(resources.ResourceManager.GetString("Connection_String"));
        string sqlCmd = "INSERT INTO [Users] VALUES(@username,@password,@email,@content_creator,@content_consumer,'False',@key);";
        SqlCommand sqlCommand = new SqlCommand(sqlCmd, sqlConnection);
        sqlCommand.Parameters.AddWithValue("@username", usernameBox.Text);
        sqlCommand.Parameters.AddWithValue("@password", passwordBox.Text);
        sqlCommand.Parameters.AddWithValue("@email", emailBox.Text);
        sqlCommand.Parameters.AddWithValue("@content_creator", content_creator.Text);
        sqlCommand.Parameters.AddWithValue("@content_consumer", content_consumer.Text);
        sqlCommand.Parameters.AddWithValue("@key", key);//random key used for validation
        sqlConnection.Open();
        sqlCommand.ExecuteNonQuery();
        sqlConnection.Close();

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
        smtp.Port = 587;
        smtp.Send(mail);

        //print verification message
        HtmlGenericControl registrationMessageDiv = new HtmlGenericControl("div");
        registrationMessageDiv.Attributes["class"] = "TrenchFont WelcomeMessage";
        HtmlGenericControl registrationMessageP = new HtmlGenericControl("p");
        registrationMessageP.InnerHtml = "Verification Email has been sent to your email account!";
        registrationMessageDiv.Controls.Add(registrationMessageP);
        WelcomeMessage.Controls.Add(registrationMessageDiv);

        //reset values
        usernameBox.Text = "";
        emailBox.Text = "";
        passwordBox.Text = "";
        content_creator.Text = "False";
        content_consumer.Text = "False";
    }

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

    protected void Login(object sender, EventArgs e)
    {
        SqlConnection sqlConnection = new SqlConnection(resources.ResourceManager.GetString("Connection_String"));
        sqlConnection.Open();
        string sqlCmd = "SELECT id From [Users] WHERE password = @password AND email = @email;";
        SqlCommand sqlCommand = new SqlCommand(sqlCmd, sqlConnection);
        sqlCommand.Parameters.AddWithValue("@password", passwordLogInBox.Text);
        sqlCommand.Parameters.AddWithValue("@email", emailLogInBox.Text);
        SqlDataReader reader = sqlCommand.ExecuteReader();
        if (reader.HasRows)
        {
            if (reader.Read())
            {
                Session["UserId"] = reader.GetInt32(0);//from user id we can safely retrieve all of user's information when needed 
            }
            reader.Close();
            sqlConnection.Close();
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
}