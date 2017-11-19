using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Web.UI.HtmlControls;
using System.Net.Mail;
using Resources;

public partial class Pages_HomePage_HomePage : System.Web.UI.Page
{

    protected void Page_Load(object sender, EventArgs e)
    {
    }

    protected void SignUp(object sender, EventArgs e)
    {
        //Submit form
        SqlConnection sqlConnection = new SqlConnection(resources.ResourceManager.GetString("Connection_String"));
        string sqlCmd = "INSERT INTO [Users] VALUES(@username,@password,@email,@content_creator,@content_consumer,'False');";
        SqlCommand sqlCommand = new SqlCommand(sqlCmd, sqlConnection);
        sqlCommand.Parameters.AddWithValue("@username", usernameBox.Text);
        sqlCommand.Parameters.AddWithValue("@password", passwordBox.Text);
        sqlCommand.Parameters.AddWithValue("@email", emailBox.Text);
        sqlCommand.Parameters.AddWithValue("@content_creator", content_creator.Text);
        sqlCommand.Parameters.AddWithValue("@content_consumer", content_consumer.Text);
        sqlConnection.Open();
        sqlCommand.ExecuteNonQuery();
        sqlConnection.Close();

        //send verification email
        SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 465);
        smtpClient.Credentials = new System.Net.NetworkCredential(resources.ResourceManager.GetString("Site_Email_Address"), resources.ResourceManager.GetString("Site_Email_Password"));
        smtpClient.UseDefaultCredentials = true;
        smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
        smtpClient.EnableSsl = true;
        MailMessage mail = new MailMessage();
        mail.From = new MailAddress(resources.ResourceManager.GetString("Site_Email_Address"), "Model Makertron 2100 - v2.0");
        mail.To.Add(new MailAddress(emailBox.Text));
        mail.Body = "Congratulations on your registration to Model Makertron 2100 - v2.0!";
        mail.Body = mail.Body + "\nTo verify it was you who tried to register to Model Makertron 2100 - v2.0 click the link below.";
        mail.Body = mail.Body + "\nIf it wasn't you who registered ignore this mail.";

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
}