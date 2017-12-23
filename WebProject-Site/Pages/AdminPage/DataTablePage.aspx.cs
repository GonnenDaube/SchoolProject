using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using System.Data.SqlClient;
using Resources;

public partial class Pages_AdminPage_DataTablePage : System.Web.UI.Page
{

    SqlConnection sqlConnection;
    string dataTableName;

    protected void Page_Load(object sender, EventArgs e)
    {
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

            if (reader.Read())
            {
                footer_row = GenerateFooterRow(reader);
            }

            int i = 0;

            do
            {
                table.Controls.Add(GenerateTableRow(reader, i));
                i++;
            } while (reader.Read());
            reader.Close();
            sqlConnection.Close();

            title.InnerHtml = "USERS";

            table.Controls.Add(footer_row);
        }
    }

    private TableRow GenerateTableRow(SqlDataReader reader, int index)
    {
        TableRow row = new TableRow();
        row.CssClass = "table-row";
        TableCell cell;
        for(int i = 0;i< reader.FieldCount; i++)
        {
            cell = new TableCell();
            switch (reader.GetFieldType(i).ToString())
            {
                case "System.Int32":
                    cell.Controls.Add(GenerateTextBox(reader.GetInt32(i).ToString()));
                    cell.ToolTip = reader.GetInt32(i).ToString();
                    break;
                case "System.String":
                    cell.Controls.Add(GenerateTextBox(reader.GetString(i)));
                    cell.ToolTip = reader.GetString(i).ToString();
                    break;
                case "System.Boolean":
                    cell.Controls.Add(GenerateCheckBox(reader.GetBoolean(i)));
                    break;
            }
            cell.CssClass = "table-cell";
            cell.ID = "row" + index + "cell" + i;
            row.Controls.Add(cell);
        }
        TableCell deleteCell = new TableCell();
        deleteCell.CssClass = "table-cell";
        deleteCell.Controls.Add(GenerateImgButton("/Resources/Icons/delete-icon.png", new ImageClickEventHandler(delete_btn_Click), "delete-btn" + index));
        row.Controls.Add(deleteCell);
        row.ID = "row" + index;
        return row;
    }

    private void GenerateHeaderRow(string[] titles)
    {
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
        return uri.Substring(uri.IndexOf("table=") + ("table=").Length);
    }

    private CheckBox GenerateCheckBox(bool initialState)
    {
        CheckBox cb = new CheckBox();
        cb.Checked = initialState;
        cb.Attributes["class"] = "checkbox";
        return cb;
    }

    private TextBox GenerateTextBox(string text)
    {
        TextBox tb = new TextBox();
        tb.Text = text;
        tb.CssClass = "textbox-admin Report1942Font";
        return tb;
    }

    private TableFooterRow GenerateFooterRow(SqlDataReader reader)
    {
        TableFooterRow row = new TableFooterRow();
        TableCell cell;
        for (int i = 0; i < reader.FieldCount; i++)
        {
            cell = new TableCell();
            switch (reader.GetFieldType(i).ToString())
            {
                case "System.Int32":
                    cell.Controls.Add(GenerateTextBox(""));
                    cell.ToolTip = "";
                    break;
                case "System.String":
                    cell.Controls.Add(GenerateTextBox(""));
                    cell.ToolTip = "";
                    break;
                case "System.Boolean":
                    cell.Controls.Add(GenerateCheckBox(false));
                    break;
            }
            cell.CssClass = "table-footer-cell";
            row.Controls.Add(cell);
        }
        return row;
    }

    private ImageButton GenerateImgButton(string path, ImageClickEventHandler clickEvent, string id)
    {
        ImageButton btn = new ImageButton();
        btn.CssClass = "delete-btn-admin";
        btn.ImageUrl = path;
        btn.ID = id;
        btn.Click += clickEvent;
        return btn;
    }

    protected void save_btn_Click(object sender, EventArgs e)
    {
    }

    protected void delete_btn_Click(object sender, EventArgs e)
    {
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
        }
    }
}