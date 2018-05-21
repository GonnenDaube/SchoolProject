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
using System.Data;

public partial class Pages_AdminPage_DataTablePage : System.Web.UI.Page
{

    private SqlConnection sqlConnection;
    private string dataTableName;
    private maker_service.WebService ws;

    protected void Page_Load(object sender, EventArgs e)
    {
        //create responsive table for each table by looking at the url
        dataTableName = GetDataTableName(Request.Url.AbsoluteUri);
        if(dataTableName.Equals("users"))
        {
            table.CssClass = "table users-table Report1942Font";
            sqlConnection = new SqlConnection(resources.ResourceManager.GetString("Connection_String"));
            sqlConnection.Open();
            string sqlCmd = "SELECT * FROM [Users]";
            SqlCommand sqlCommand = new SqlCommand(sqlCmd, sqlConnection);
            SqlDataReader reader = sqlCommand.ExecuteReader();

            string[] titles = { "ID", "Username", "Password", "Email", "Content Creator", "Content Consumer", "Validated", "RandomKey", "User Color", "Admin" };
            GenerateHeaderRow(titles);

            TableFooterRow footer_row = new TableFooterRow();

            int i = 0;
            int counter = 0;

            if (reader.Read())
            {
                footer_row = GenerateFooterRow(reader, ref counter);
            }

            do
            {
                table.Controls.Add(GenerateTableRow(reader, i, ref counter));
                i++;
            } while (reader.Read());
            reader.Close();
            sqlConnection.Close();

            title.InnerHtml = "USERS";

            table.Controls.Add(footer_row);
        }
        if (dataTableName.Equals("models"))
        {
            table.CssClass = "table models-table Report1942Font";

            ws = new maker_service.WebService();

            string[] titles = { "Model ID", "User ID", "Date", "Data Path", "Name", "Description", "Thumbnail" };

            GenerateHeaderRow(titles);

            ws.OpenConnection();

            DataSet dataset = ws.GenericReaderQuery("SELECT * FROM [Models]");

            TableFooterRow footer_row = new TableFooterRow();

            int i = 0;
            int counter = 0;

            DataTableReader reader = dataset.Tables[0].CreateDataReader();

            if (reader.Read())
            {
                footer_row = GenerateFooterRow(reader, ref counter);
            }

            do
            {
                table.Controls.Add(GenerateTableRow(reader, i, ref counter));
                i++;
            } while (reader.Read());
            reader.Close();
            ws.CloseConnection();

            title.InnerHtml = "MODELS";

            table.Controls.Add(footer_row);
        }


        if (dataTableName.Equals("downloads"))
        {
            table.CssClass = "table models-table Report1942Font";

            ws = new maker_service.WebService();

            string[] titles = { "Download ID", "User ID", "Model ID", "Download Date" };

            GenerateHeaderRow(titles);

            ws.OpenConnection();

            DataSet dataset = ws.GenericReaderQuery("SELECT * FROM [Downloads]");

            TableFooterRow footer_row = new TableFooterRow();

            int i = 0;
            int counter = 0;

            DataTableReader reader = dataset.Tables[0].CreateDataReader();

            if (reader.Read())
            {
                footer_row = GenerateFooterRow(reader, ref counter);
            }

            do
            {
                table.Controls.Add(GenerateTableRow(reader, i, ref counter));
                i++;
            } while (reader.Read());
            reader.Close();
            ws.CloseConnection();

            title.InnerHtml = "Downloads";

            table.Controls.Add(footer_row);
        }

        if (dataTableName.Equals("ratings"))
        {
            table.CssClass = "table models-table Report1942Font";

            ws = new maker_service.WebService();

            string[] titles = { "Rate ID", "User ID", "Model ID", "Value" };

            GenerateHeaderRow(titles);

            ws.OpenConnection();

            DataSet dataset = ws.GenericReaderQuery("SELECT * FROM [Ratings]");

            TableFooterRow footer_row = new TableFooterRow();

            int i = 0;
            int counter = 0;

            DataTableReader reader = dataset.Tables[0].CreateDataReader();

            if (reader.Read())
            {
                footer_row = GenerateFooterRow(reader, ref counter);
            }

            do
            {
                table.Controls.Add(GenerateTableRow(reader, i, ref counter));
                i++;
            } while (reader.Read());
            reader.Close();
            ws.CloseConnection();

            title.InnerHtml = "Ratings";

            table.Controls.Add(footer_row);
        }
    }

    private TableRow GenerateTableRow(SqlDataReader reader, int index, ref int counter)
    {
        //generates a table row containing information from the data base and editable
        TableRow row = new TableRow();
        row.CssClass = "table-row";
        TableCell cell;
        for(int i = 0;i< reader.FieldCount; i++)
        {
            cell = new TableCell();
            switch (reader.GetFieldType(i).ToString())
            {
                case "System.Int32":
                    cell.Controls.Add(GenerateTextBox(reader.GetInt32(i).ToString(), counter++, true));
                    cell.Controls.Add(GenerateTextBoxValidator((TextBox)cell.Controls[0]));
                    cell.ToolTip = reader.GetInt32(i).ToString();
                    break;
                case "System.String":
                    cell.Controls.Add(GenerateTextBox(reader.GetString(i), counter++, true));
                    cell.Controls.Add(GenerateTextBoxValidator((TextBox)cell.Controls[0]));
                    cell.ToolTip = reader.GetString(i).ToString();
                    break;
                case "System.DateTime":
                    cell.Controls.Add(GenerateTextBox(reader.GetDateTime(i).ToString(), counter++, true));
                    cell.Controls.Add(GenerateTextBoxValidator((TextBox)cell.Controls[0]));
                    cell.ToolTip = reader.GetDateTime(i).ToString();
                    break;
                case "System.Boolean":
                    cell.Controls.Add(GenerateCheckBox(reader.GetBoolean(i), true));
                    break;
            }
            cell.CssClass = "table-cell";
            cell.ID = "row" + index + "cell" + i;
            row.Controls.Add(cell);
        }
        TableCell actionCell = new TableCell();
        actionCell.CssClass = "table-cell";
        actionCell.Controls.Add(GenerateImgButton("/Resources/Icons/delete-icon.png", new ImageClickEventHandler(delete_btn_Click), "delete-btn" + index));
        actionCell.Controls.Add(GenerateImage("/Resources/Icons/changed-icon.png", "changed" + index));
        actionCell.ID = "row" + index + "cell-action";
        row.Controls.Add(actionCell);
        row.ID = "row" + index;
        return row;
    }

    private TableRow GenerateTableRow(DataTableReader reader, int index, ref int counter)
    {
        //overloaded function that used DataTableReader instead of SqlDataReader
        TableRow row = new TableRow();
        row.CssClass = "table-row";
        TableCell cell;
        for (int i = 0; i < reader.FieldCount; i++)
        {
            cell = new TableCell();
            switch (reader.GetFieldType(i).ToString())
            {
                case "System.Int32":
                    cell.Controls.Add(GenerateTextBox(reader.GetInt32(i).ToString(), counter++, true));
                    cell.Controls.Add(GenerateTextBoxValidator((TextBox)cell.Controls[0]));
                    cell.ToolTip = reader.GetInt32(i).ToString();
                    break;
                case "System.String":
                    cell.Controls.Add(GenerateTextBox(reader.GetString(i), counter++, true));
                    cell.Controls.Add(GenerateTextBoxValidator((TextBox)cell.Controls[0]));
                    cell.ToolTip = reader.GetString(i).ToString();
                    break;
                case "System.DateTime":
                    cell.Controls.Add(GenerateTextBox(reader.GetDateTime(i).ToString(), counter++, true));
                    cell.Controls.Add(GenerateTextBoxValidator((TextBox)cell.Controls[0]));
                    cell.ToolTip = reader.GetDateTime(i).ToString();
                    break;
                case "System.Boolean":
                    cell.Controls.Add(GenerateCheckBox(reader.GetBoolean(i), true));
                    break;
            }
            cell.CssClass = "table-cell";
            cell.ID = "row" + index + "cell" + i;
            row.Controls.Add(cell);
        }
        TableCell actionCell = new TableCell();
        actionCell.CssClass = "table-cell";
        actionCell.Controls.Add(GenerateImgButton("/Resources/Icons/delete-icon.png", new ImageClickEventHandler(delete_btn_Click), "delete-btn" + index));
        actionCell.Controls.Add(GenerateImage("/Resources/Icons/changed-icon.png", "changed" + index));
        actionCell.ID = "row" + index + "cell-action";
        row.Controls.Add(actionCell);
        row.ID = "row" + index;
        return row;
    }

    private void GenerateHeaderRow(string[] titles)
    {
        //generates a header row containing column names
        TableHeaderCell cell;
        for(int i = 0; i < titles.Length; i++)
        {
            cell = new TableHeaderCell();
            cell.Text = titles[i];
            cell.CssClass = "table-header-cell ";
            header.Controls.Add(cell);
        }
    }

    private string GetDataTableName(string uri)
    {
        //manipulates url to get table name
        return uri.Substring(uri.IndexOf("table=") + ("table=").Length);
    }

    private CheckBox GenerateCheckBox(bool initialState, bool shouldPostBack)
    {
        //generate a generic checkbox with an initial state and a should post back boolean
        CheckBox cb = new CheckBox();
        cb.Checked = initialState;
        cb.Attributes["class"] = "checkbox";
        if (shouldPostBack)
        {
            cb.CheckedChanged += new EventHandler(checked_changed);
            cb.AutoPostBack = true;
        }
        return cb;
    }

    private TextBox GenerateTextBox(string text, int index, bool shouldTextChanged)
    {
        //generates a generic text box
        TextBox tb = new TextBox();
        tb.Text = text;
        tb.CssClass = "textbox-admin Report1942Font";
        if (shouldTextChanged)
        {
            tb.TextChanged += new EventHandler(text_changed);
            tb.AutoPostBack = true;
            tb.CausesValidation = true;
        }
        tb.ID = "textBox" + index;
        return tb;
    }

    private RequiredFieldValidator GenerateTextBoxValidator(TextBox controlToValidate)
    {
        //generates a text box validator with a text box to validate
        RequiredFieldValidator validator = new RequiredFieldValidator();
        validator.ControlToValidate = controlToValidate.ID;
        validator.Text = "*";
        validator.CssClass = "validator-admin";
        return validator;
    }

    private TableFooterRow GenerateFooterRow(SqlDataReader reader, ref int counter)
    {
        //generates a footer row containing an insert functionality
        TableFooterRow row = new TableFooterRow();
        TableCell cell;
        for (int i = 0; i < reader.FieldCount; i++)
        {
            cell = new TableCell();
            if(i > 0)
            {
                switch (reader.GetFieldType(i).ToString())
                {
                    case "System.Int32":
                        cell.Controls.Add(GenerateTextBox("", counter++, false));
                        cell.ToolTip = "";
                        break;
                    case "System.String":
                        cell.Controls.Add(GenerateTextBox("", counter++, false));
                        cell.ToolTip = "";
                        break;
                    case "System.Boolean":
                        cell.Controls.Add(GenerateCheckBox(false, false));
                        break;
                }
            }
            cell.CssClass = "table-footer-cell";
            row.Controls.Add(cell);
        }
        return row;
    }

    private TableFooterRow GenerateFooterRow(DataTableReader reader, ref int counter)
    {
        //overloaded function using DataTableReader instead of SqlDataReader
        TableFooterRow row = new TableFooterRow();
        TableCell cell;
        for (int i = 0; i < reader.FieldCount; i++)
        {
            cell = new TableCell();
            if (i > 0)
            {
                switch (reader.GetFieldType(i).ToString())
                {
                    case "System.Int32":
                        cell.Controls.Add(GenerateTextBox("", counter++, false));
                        cell.ToolTip = "";
                        break;
                    case "System.String":
                        cell.Controls.Add(GenerateTextBox("", counter++, false));
                        cell.ToolTip = "";
                        break;
                    case "System.DateTime":
                        cell.Controls.Add(GenerateTextBox("", counter++, false));
                        cell.ToolTip = "";
                        break;
                    case "System.Boolean":
                        cell.Controls.Add(GenerateCheckBox(false, false));
                        break;
                }
            }
            cell.CssClass = "table-footer-cell";
            row.Controls.Add(cell);
        }
        return row;
    }

    private ImageButton GenerateImgButton(string path, ImageClickEventHandler clickEvent, string id)
    {
        //generates an image button
        ImageButton btn = new ImageButton();
        btn.CssClass = "delete-btn-admin";
        btn.ImageUrl = path;
        btn.ID = id;
        btn.Click += clickEvent;
        return btn;
    }

    private Image GenerateImage(string path, string id)
    {
        //generates an image
        Image img = new Image();
        img.ID = id;
        img.CssClass = "admin-action-img not-changed";
        img.Attributes["src"] = path;
        return img;
    }

    protected void save_btn_Click(object sender, EventArgs e)
    {
        //saves changes into data base

        //passed validation
        if (dataTableName.Equals("users"))
        {
            SqlCommand sqlCommand;
            sqlConnection.Open();
            string sqlCmd = "UPDATE [Users] SET username = @newUsername, password = @newPassword, email = @newEmail, content_creator = @newContentCreator, content_consumer = @newContentConsumer, validated = @newValidated, RandomKey = @newRandomKey, user_color = @newUserColor, admin = @newAdmin Where Id = @oldId";
            for (int i = 1; i < table.Controls.Count - 1; i++)
            {// goes through all rows that are not Header or Footer
                TableRow tr = (TableRow)table.Controls[i];
                if (!((Image)tr.Controls[tr.Controls.Count - 1].Controls[1]).CssClass.Contains("not-changed"))
                {// row is changed
                    sqlCommand = new SqlCommand(sqlCmd, sqlConnection);
                    //cannot change id
                    sqlCommand.Parameters.AddWithValue("@newUsername", ((TextBox)tr.Controls[1].Controls[0]).Text);
                    sqlCommand.Parameters.AddWithValue("@newPassword", ((TextBox)tr.Controls[2].Controls[0]).Text);
                    sqlCommand.Parameters.AddWithValue("@newEmail", ((TextBox)tr.Controls[3].Controls[0]).Text);
                    if (((CheckBox)tr.Controls[4].Controls[0]).Checked)
                        sqlCommand.Parameters.AddWithValue("@newContentCreator", "True");
                    else
                        sqlCommand.Parameters.AddWithValue("@newContentCreator", "False");
                    if (((CheckBox)tr.Controls[5].Controls[0]).Checked)
                        sqlCommand.Parameters.AddWithValue("@newContentConsumer", "True");
                    else
                        sqlCommand.Parameters.AddWithValue("@newContentConsumer", "False");
                    if (((CheckBox)tr.Controls[6].Controls[0]).Checked)
                        sqlCommand.Parameters.AddWithValue("@newValidated", "True");
                    else
                        sqlCommand.Parameters.AddWithValue("@newValidated", "False");
                    sqlCommand.Parameters.AddWithValue("@newRandomKey", ((TextBox)tr.Controls[7].Controls[0]).Text);
                    sqlCommand.Parameters.AddWithValue("@newUserColor", ((TextBox)tr.Controls[8].Controls[0]).Text);
                    if (((CheckBox)tr.Controls[9].Controls[0]).Checked)
                        sqlCommand.Parameters.AddWithValue("@newAdmin", "True");
                    else
                        sqlCommand.Parameters.AddWithValue("@newAdmin", "False");
                    sqlCommand.Parameters.AddWithValue("@oldId", ((TableCell)tr.Controls[0]).ToolTip);

                    sqlCommand.ExecuteNonQuery();
                }
            }
            TableFooterRow footerRow = (TableFooterRow)table.Controls[table.Controls.Count - 1];
            if(((TextBox)footerRow.Controls[1].Controls[0]).Text.Length > 0 && InsertRowFull(footerRow, 1))
            {
                string insertCommand = "INSERT INTO [Users] VALUES(@newUsername, @newPassword, @newEmail, @newContentCreator, @newContentConsumer, @newValidated, @newRandomKey, @newUserColor, @newAdmin)";
                sqlCommand = new SqlCommand(insertCommand, sqlConnection);
                sqlCommand.Parameters.AddWithValue("@newUsername", ((TextBox)footerRow.Controls[1].Controls[0]).Text);
                sqlCommand.Parameters.AddWithValue("@newPassword", ((TextBox)footerRow.Controls[2].Controls[0]).Text);
                sqlCommand.Parameters.AddWithValue("@newEmail", ((TextBox)footerRow.Controls[3].Controls[0]).Text);
                if (((CheckBox)footerRow.Controls[4].Controls[0]).Checked)
                    sqlCommand.Parameters.AddWithValue("@newContentCreator", "True");
                else
                    sqlCommand.Parameters.AddWithValue("@newContentCreator", "False");
                if (((CheckBox)footerRow.Controls[5].Controls[0]).Checked)
                    sqlCommand.Parameters.AddWithValue("@newContentConsumer", "True");
                else
                    sqlCommand.Parameters.AddWithValue("@newContentConsumer", "False");
                if (((CheckBox)footerRow.Controls[6].Controls[0]).Checked)
                    sqlCommand.Parameters.AddWithValue("@newValidated", "True");
                else
                    sqlCommand.Parameters.AddWithValue("@newValidated", "False");
                sqlCommand.Parameters.AddWithValue("@newRandomKey", ((TextBox)footerRow.Controls[7].Controls[0]).Text);
                sqlCommand.Parameters.AddWithValue("@newUserColor", ((TextBox)footerRow.Controls[8].Controls[0]).Text);
                if (((CheckBox)footerRow.Controls[9].Controls[0]).Checked)
                    sqlCommand.Parameters.AddWithValue("@newAdmin", "True");
                else
                    sqlCommand.Parameters.AddWithValue("@newAdmin", "False");

                sqlCommand.ExecuteNonQuery();

                //Update WebService
                int id = 0;
                sqlCmd = "SELECT Id FROM [Users] WHERE username = @username;";
                sqlCommand = new SqlCommand(sqlCmd, sqlConnection);
                sqlCommand.Parameters.AddWithValue("@username", ((TextBox)footerRow.Controls[1].Controls[0]).Text);
                SqlDataReader reader = sqlCommand.ExecuteReader();
                if (reader.Read())
                {
                    id = reader.GetInt32(0);
                }
                maker_service.WebService ws = new maker_service.WebService();
                ws.InsertUser(id);
            }

            sqlConnection.Close();
            Response.Redirect(Request.Url.AbsoluteUri);
        }
        if (dataTableName.Equals("models"))
        {
            ws.OpenConnection();

            string sqlCmd = "UPDATE [Models] SET User_Id = @newUser_Id, Creation_Date = @newCreation_Date, XML_File_Link = @newXML, name = @newName, description = @newDescription, Thumbnail = @newThumbnail Where Model_Id = @oldId";
            for (int i = 1; i < table.Controls.Count - 1; i++)
            {// goes through all rows that are not Header or Footer
                TableRow tr = (TableRow)table.Controls[i];
                if (!((Image)tr.Controls[tr.Controls.Count - 1].Controls[1]).CssClass.Contains("not-changed"))
                {// row is changed
                    string[] parameterNames = { "@newUser_Id", "@newCreation_Date", "@newXML", "@newName", "@newDescription", "@newThumbnail", "@oldId" };
                    string[] parameterValues = new string[parameterNames.Length];
                    //cannot change id
                    parameterValues[0] = ((TextBox)tr.Controls[1].Controls[0]).Text;
                    parameterValues[1] = ((TextBox)tr.Controls[2].Controls[0]).Text;
                    parameterValues[2] = ((TextBox)tr.Controls[3].Controls[0]).Text;
                    parameterValues[3] = ((TextBox)tr.Controls[4].Controls[0]).Text;
                    parameterValues[4] = ((TextBox)tr.Controls[5].Controls[0]).Text;
                    parameterValues[5] = ((TextBox)tr.Controls[6].Controls[0]).Text;
                    parameterValues[6] = ((TableCell)tr.Controls[0]).ToolTip;

                    string[] parameterTypes = { "string", "datetime", "string", "string", "string", "string", "string" };

                    ws.GenericVoidQueryWithParameters(sqlCmd, parameterNames, parameterValues, parameterTypes);
                }
            }
            TableFooterRow footerRow = (TableFooterRow)table.Controls[table.Controls.Count - 1];
            if (((TextBox)footerRow.Controls[1].Controls[0]).Text.Length > 0 && InsertRowFull(footerRow, 1))
            {

                string[] parameterNames = { "@newUser_Id", "@newCreation_Date", "@newXML", "@newName", "@newDescription", "@newThumbnail", "@oldId" };
                string[] parameterValues = new string[parameterNames.Length];
                //cannot change id
                parameterValues[0] = ((TextBox)footerRow.Controls[1].Controls[0]).Text;
                parameterValues[1] = ((TextBox)footerRow.Controls[2].Controls[0]).Text;
                parameterValues[2] = ((TextBox)footerRow.Controls[3].Controls[0]).Text;
                parameterValues[3] = ((TextBox)footerRow.Controls[4].Controls[0]).Text;
                parameterValues[4] = ((TextBox)footerRow.Controls[5].Controls[0]).Text;
                parameterValues[5] = ((TextBox)footerRow.Controls[6].Controls[0]).Text;
                parameterValues[6] = ((TableCell)footerRow.Controls[0]).ToolTip;

                string[] parameterTypes = { "int", "datetime", "string", "string", "string", "string", "int" };

                string insertCommand = "INSERT INTO [Models] VALUES(@newUser_Id, @newCreation_Date, @newXML, @newName, @newDescription, @newThumbnail);";

                ws.GenericVoidQueryWithParameters(insertCommand, parameterNames, parameterValues, parameterTypes);
            }

            ws.CloseConnection();
            Response.Redirect(Request.Url.AbsoluteUri);
        }



        if (dataTableName.Equals("downloads"))
        {
            ws.OpenConnection();

            string sqlCmd = "UPDATE [Downloads] SET User_Id = @newUser_Id, Model_Id = @newModel_Id, Download_Date = @newDownload_Date WHERE Download_Id = @oldId";
            for (int i = 1; i < table.Controls.Count - 1; i++)
            {// goes through all rows that are not Header or Footer
                TableRow tr = (TableRow)table.Controls[i];
                if (!((Image)tr.Controls[tr.Controls.Count - 1].Controls[1]).CssClass.Contains("not-changed"))
                {// row is changed
                    string[] parameterNames = { "@newUser_Id", "@newModel_Id", "@newDownload_Date", "@oldId" };
                    string[] parameterValues = new string[parameterNames.Length];
                    //cannot change id
                    parameterValues[0] = ((TextBox)tr.Controls[1].Controls[0]).Text;
                    parameterValues[1] = ((TextBox)tr.Controls[2].Controls[0]).Text;
                    parameterValues[2] = ((TextBox)tr.Controls[3].Controls[0]).Text;
                    parameterValues[3] = ((TableCell)tr.Controls[0]).ToolTip;

                    string[] parameterTypes = { "int", "int", "datetime", "int" };

                    ws.GenericVoidQueryWithParameters(sqlCmd, parameterNames, parameterValues, parameterTypes);
                }
            }
            TableFooterRow footerRow = (TableFooterRow)table.Controls[table.Controls.Count - 1];
            if (((TextBox)footerRow.Controls[1].Controls[0]).Text.Length > 0 && InsertRowFull(footerRow, 1))
            {

                string[] parameterNames = { "@newUser_Id", "@newModel_Id", "@newDownload_Date"};
                string[] parameterValues = new string[parameterNames.Length];
                //cannot change id
                parameterValues[0] = ((TextBox)footerRow.Controls[1].Controls[0]).Text;
                parameterValues[1] = ((TextBox)footerRow.Controls[2].Controls[0]).Text;
                parameterValues[2] = ((TextBox)footerRow.Controls[3].Controls[0]).Text;

                string[] parameterTypes = { "int", "int", "datetime"};

                string insertCommand = "INSERT INTO [Downloads] VALUES(@newUser_Id, @newModel_Id, @newDownload_Date);";

                ws.GenericVoidQueryWithParameters(insertCommand, parameterNames, parameterValues, parameterTypes);
            }

            ws.CloseConnection();
            Response.Redirect(Request.Url.AbsoluteUri);
        }

        if (dataTableName.Equals("ratings"))
        {
            ws.OpenConnection();

            string sqlCmd = "UPDATE [Ratings] SET User_Id = @newUser_Id, Model_Id = @newModel_Id, Value = @newValue WHERE Rate_Id = @oldId";
            for (int i = 1; i < table.Controls.Count - 1; i++)
            {// goes through all rows that are not Header or Footer
                TableRow tr = (TableRow)table.Controls[i];
                if (!((Image)tr.Controls[tr.Controls.Count - 1].Controls[1]).CssClass.Contains("not-changed"))
                {// row is changed
                    string[] parameterNames = { "@newUser_Id", "@newModel_Id", "@newValue", "@oldId" };
                    string[] parameterValues = new string[parameterNames.Length];
                    //cannot change id
                    parameterValues[0] = ((TextBox)tr.Controls[1].Controls[0]).Text;
                    parameterValues[1] = ((TextBox)tr.Controls[2].Controls[0]).Text;
                    parameterValues[2] = ((TextBox)tr.Controls[3].Controls[0]).Text;
                    parameterValues[3] = ((TableCell)tr.Controls[0]).ToolTip;

                    string[] parameterTypes = { "int", "int", "int", "int" };

                    ws.GenericVoidQueryWithParameters(sqlCmd, parameterNames, parameterValues, parameterTypes);
                }
            }
            TableFooterRow footerRow = (TableFooterRow)table.Controls[table.Controls.Count - 1];
            if (((TextBox)footerRow.Controls[1].Controls[0]).Text.Length > 0 && InsertRowFull(footerRow, 1))
            {

                string[] parameterNames = { "@newUser_Id", "@newModel_Id", "@newValue" };
                string[] parameterValues = new string[parameterNames.Length];
                //cannot change id
                parameterValues[0] = ((TextBox)footerRow.Controls[1].Controls[0]).Text;
                parameterValues[1] = ((TextBox)footerRow.Controls[2].Controls[0]).Text;
                parameterValues[2] = ((TextBox)footerRow.Controls[3].Controls[0]).Text;

                string[] parameterTypes = { "int", "int", "int" };

                string insertCommand = "INSERT INTO [Ratings] VALUES(@newUser_Id, @newModel_Id, @newValue);";

                ws.GenericVoidQueryWithParameters(insertCommand, parameterNames, parameterValues, parameterTypes);
            }

            ws.CloseConnection();
            Response.Redirect(Request.Url.AbsoluteUri);
        }
    }

    protected void delete_btn_Click(object sender, EventArgs e)
    {
        //delete a row from the table
        if (sender.GetType().Equals(typeof(ImageButton)))
        {
            if (dataTableName.Equals("users"))
            {
                ImageButton btn = (ImageButton)sender;
                string id = btn.ID;
                int rowNumber = int.Parse(id.Substring(id.IndexOf("btn") + 3));

                TableCell tc = (TableCell)table.FindControl("row" + rowNumber + "cell0");

                int user_id = int.Parse(tc.ToolTip);

                if (sqlConnection != null && sqlConnection.State == System.Data.ConnectionState.Closed)
                {
                    sqlConnection.Open();
                }

                string sqlCmd = "DELETE FROM [Users] WHERE id = @userID;";

                SqlCommand sqlCommand = new SqlCommand(sqlCmd, sqlConnection);
                sqlCommand.Parameters.AddWithValue("@userID", user_id);

                sqlCommand.ExecuteNonQuery();

                sqlConnection.Close();

                Response.Redirect(Request.Url.AbsoluteUri);
            }

            if (dataTableName.Equals("models"))
            {
                ws.OpenConnection();

                ImageButton btn = (ImageButton)sender;
                string id = btn.ID;
                int rowNumber = int.Parse(id.Substring(id.IndexOf("btn") + 3));

                TableCell tc = (TableCell)table.FindControl("row" + rowNumber + "cell0");

                int user_id = int.Parse(tc.ToolTip);

                string cleanup0 = "DELETE FROM [Downloads] WHERE Model_Id = @userID;";
                string cleanup1 = "DELETE FROM [Ratings] WHERE Model_Id = @userID;";

                string sqlCmd = "DELETE FROM [Models] WHERE Model_Id = @userID;";

                string[] pNames = { "@userID" };
                string[] pValues = { user_id.ToString() };
                string[] pTypes = { "int" };

                ws.GenericVoidQueryWithParameters(cleanup0, pNames, pValues, pTypes);
                ws.GenericVoidQueryWithParameters(cleanup1, pNames, pValues, pTypes);
                ws.GenericVoidQueryWithParameters(sqlCmd, pNames, pValues, pTypes);

                ws.CloseConnection();

                Response.Redirect(Request.Url.AbsoluteUri);
            }

            if (dataTableName.Equals("downloads"))
            {
                ws.OpenConnection();

                ImageButton btn = (ImageButton)sender;
                string id = btn.ID;
                int rowNumber = int.Parse(id.Substring(id.IndexOf("btn") + 3));

                TableCell tc = (TableCell)table.FindControl("row" + rowNumber + "cell0");

                int user_id = int.Parse(tc.ToolTip);

                string cleanup0 = "DELETE FROM [Downloads] WHERE Download_Id = @userID;";

                string[] pNames = { "@userID" };
                string[] pValues = { user_id.ToString() };
                string[] pTypes = { "int" };

                ws.GenericVoidQueryWithParameters(cleanup0, pNames, pValues, pTypes);

                ws.CloseConnection();

                Response.Redirect(Request.Url.AbsoluteUri);
            }
            if (dataTableName.Equals("ratings"))
            {
                ws.OpenConnection();

                ImageButton btn = (ImageButton)sender;
                string id = btn.ID;
                int rowNumber = int.Parse(id.Substring(id.IndexOf("btn") + 3));

                TableCell tc = (TableCell)table.FindControl("row" + rowNumber + "cell0");

                int user_id = int.Parse(tc.ToolTip);

                string cleanup0 = "DELETE FROM [Ratings] WHERE Rate_Id = @userID;";

                string[] pNames = { "@userID" };
                string[] pValues = { user_id.ToString() };
                string[] pTypes = { "int" };

                ws.GenericVoidQueryWithParameters(cleanup0, pNames, pValues, pTypes);

                ws.CloseConnection();

                Response.Redirect(Request.Url.AbsoluteUri);
            }
        }
    }

    protected void text_changed(object sender, EventArgs e)
    {
        //runs if text has changed at sender
        //puts a flag to update row on save button click
        TableCell senderCell = (TableCell)((TextBox)sender).Parent;
        string cellId = senderCell.ID;
        string rowId = cellId.Substring(cellId.IndexOf("row") + 3);
        rowId = rowId.Remove(rowId.IndexOf("cell"));
        int rowNumber = int.Parse(rowId);

        ((Image)table.FindControl("row" + rowId + "cell-action").Controls[1]).CssClass = "admin-action-img changed";
    }

    protected void checked_changed(object sender, EventArgs e)
    {
        //runs if checkbox has changed state at sender
        //puts a flag to update row on save button click
        TableCell senderCell = (TableCell)((CheckBox)sender).Parent;
        string cellId = senderCell.ID;
        string rowId = cellId.Substring(cellId.IndexOf("row") + 3);
        rowId = rowId.Remove(rowId.IndexOf("cell"));
        int rowNumber = int.Parse(rowId);

        ((Image)table.FindControl("row" + rowId + "cell-action").Controls[1]).CssClass = "admin-action-img changed";
    }

    private bool InsertRowFull(TableFooterRow row, int index)
    {
        //checks if insert row is full (recursively)
        if (index >= row.Controls.Count)
            return true;
        if(row.Controls[index].Controls[0] is TextBox)
        {
            index++;
            return ((TextBox)row.Controls[index - 1].Controls[0]).Text.Length > 0 && InsertRowFull(row, index);
        }
        else
        {
            index++;
            return InsertRowFull(row, index);
        }
    }
}