using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Data.SqlClient;
using Resources;
using System.Data;
using System.Xml;
using System.Net;
using System.IO;
using System.Text.RegularExpressions;

/// <summary>
/// Summary description for WebService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
public class WebService : System.Web.Services.WebService
{

    private SqlConnection sqlConnection;

    public WebService()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    /// <summary>
    /// Opens The connection to the data base
    /// </summary>
    /// <returns>function succeeded</returns>
    [WebMethod]
    public int OpenConnection()
    {
        //open connection to the data base
        try
        {
            if (sqlConnection == null)
                sqlConnection = new SqlConnection(resources.ResourceManager.GetString("Connection_String"));
            sqlConnection.Open();
            return 1;
        }
        catch
        {
            return 0;
        }
    }

    /// <summary>
    /// Closes The connection to the data base
    /// </summary>
    /// <returns>function succeeded</returns>
    [WebMethod]
    public int CloseConnection()
    {
        //close connection to the data base
        try
        {
            if (sqlConnection == null)
                sqlConnection = new SqlConnection(resources.ResourceManager.GetString("Connection_String"));
            sqlConnection.Close();
            return 1;
        }
        catch
        {
            return 0;
        }
    }

    /// <summary>
    /// A generic query function with no return value to interact with
    /// the data base
    /// </summary>
    /// <param name="query"></param>
    /// <returns>function succeeded</returns>
    [WebMethod]
    public int GenericVoidQuery(string query)
    {
        //runs a generic sql void query
        try
        {
            if (sqlConnection == null || sqlConnection.State != ConnectionState.Open)
                OpenConnection();
            SqlCommand cmd = new SqlCommand(query, sqlConnection);
            cmd.ExecuteNonQuery();
            return 1;
        }
        catch
        {
            return 0;
        }
    }

    /// <summary>
    /// runs a generic sql void query with parameters
    /// </summary>
    /// <param name="query"></param>
    /// <param name="parametersNames"></param>
    /// <param name="parametersValues"></param>
    /// <param name="parameterTypes"></param>
    /// <returns></returns>
    [WebMethod]
    public int GenericVoidQueryWithParameters(string query, string[] parametersNames, string[] parametersValues, string[] parameterTypes)
    {
        try
        {
            if (sqlConnection == null || sqlConnection.State != ConnectionState.Open)
                OpenConnection();
            SqlCommand cmd = new SqlCommand(query, sqlConnection);
            for(int i = 0; i<parametersNames.Length; i++)
            {
                switch (parameterTypes[i])
                {
                    case "string":
                        cmd.Parameters.AddWithValue(parametersNames[i], parametersValues[i]);
                        break;
                    case "datetime":
                        cmd.Parameters.AddWithValue(parametersNames[i], DateTime.Parse(parametersValues[i]));
                        break;
                    case "int":
                        cmd.Parameters.AddWithValue(parametersNames[i], int.Parse(parametersValues[i]));
                        break;
                }
            }
            cmd.ExecuteNonQuery();
            return 1;
        }
        catch
        {
            return 0;
        }
    }

    /// <summary>
    /// A generic query function with reader return value to interact with
    /// the data base
    /// </summary>
    /// <param name="query"></param>
    /// <returns>reader of query</returns>
    [WebMethod]
    public DataSet GenericReaderQuery(string query)
    {
        //runs a generic sql reader query
        try
        {
            if (sqlConnection == null || sqlConnection.State != ConnectionState.Open)
                OpenConnection();
            SqlCommand cmd = new SqlCommand(query, sqlConnection);
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            DataSet dataset = new DataSet();
            adapter.Fill(dataset);
            return dataset;
        }
        catch
        {
            return null;
        }
    }

    /// <summary>
    /// Inserts user id into partial users table in service db
    /// </summary>
    /// <param name="id"></param>
    /// <returns>function succeeded</returns>
    [WebMethod]
    public int InsertUser(int id)
    {
        //inserts a user into users table inside the webservice
        try
        {
            if (sqlConnection == null || sqlConnection.State != ConnectionState.Open)
                OpenConnection();
            string query = "INSERT INTO [Users] VALUES(@id);";
            SqlCommand cmd = new SqlCommand(query, sqlConnection);
            cmd.Parameters.AddWithValue("@id", id);
            cmd.ExecuteNonQuery();
            return 1;
        }
        catch
        {
            return 0;
        }
    }

    /// <summary>
    /// inserts a new model into the db
    /// </summary>
    /// <param name="user_id"></param>
    /// <param name="name"></param>
    /// <param name="description"></param>
    /// <param name="positions"></param>
    /// <param name="colors"></param>
    /// <param name="normals"></param>
    /// <param name="cameraPos"></param>
    /// <param name="lookingat"></param>
    /// <param name="thumbnail_url"></param>
    /// <returns></returns>
    [WebMethod]
    public int InsertModel(int user_id, string name, string description, float[] positions, float[] colors, float[] normals, float[] cameraPos, float[] lookingat, string thumbnail_url)
    {
        try
        {
            string location = (@"\DB_Files\Model_Thumbnails\Thumbnail" + DateTime.Now.ToString().Replace('/', '-').Replace(' ', '-').Replace(':', '-') + ".png");
            string path = Server.MapPath(location);
            using (WebClient client = new WebClient())
            {
                string base64Data = Regex.Match(thumbnail_url, @"data:image/(?<type>.+?),(?<data>.+)").Groups["data"].Value;
                byte[] binData = Convert.FromBase64String(base64Data);
                if (!File.Exists(path))
                {
                    File.WriteAllBytes(path, binData);
                }
            }
            string xml_location = CreateModelXMLFile(positions, colors, normals, cameraPos, lookingat);
            if (sqlConnection == null || sqlConnection.State != ConnectionState.Open)
                OpenConnection();
            string query = "INSERT INTO [Models] VALUES(@user_id, @Creation_Date, @XML_LINK, @name, @desc, @thumbnail);";
            SqlCommand cmd = new SqlCommand(query, sqlConnection);
            cmd.Parameters.AddWithValue("@user_id", user_id);
            cmd.Parameters.AddWithValue("@Creation_Date", DateTime.Now);
            cmd.Parameters.AddWithValue("@XML_LINK", xml_location);
            cmd.Parameters.AddWithValue("@name", name);
            cmd.Parameters.AddWithValue("@desc", description);
            cmd.Parameters.AddWithValue("@thumbnail", location);
            cmd.ExecuteNonQuery();
            return 1;
        }
        catch
        {
            return 0;
        }
    }

    /// <summary>
    /// creates a xml file containing model information
    /// </summary>
    /// <param name="positions"></param>
    /// <param name="colors"></param>
    /// <param name="normals"></param>
    /// <param name="cameraPos"></param>
    /// <param name="lookingat"></param>
    /// <returns></returns>
    private string CreateModelXMLFile(float[] positions, float[] colors, float[] normals, float[] cameraPos, float[] lookingat)
    {
        try
        {
            string location = @"/DB_Files/Model_Files/Model_XML" + DateTime.Now.ToString().Replace('/', '-').Replace(' ', '-').Replace(':', '-') + ".xml";

            string path = Server.MapPath(location);

            XmlDocument document = new XmlDocument();

            XmlNode docNode = document.CreateXmlDeclaration("1.0", "UTF-8", null);
            document.AppendChild(docNode);

            XmlNode rootNode = document.CreateElement("rootElement");

            #region camera
            XmlNode cameraValues = document.CreateElement("camera-values");

            XmlNode cameraPosition = document.CreateElement("camera-position");
            cameraPosition.InnerText = ConvertFloatArrayToString(cameraPos);

            XmlNode cameraLookingAt = document.CreateElement("camera-looking-at");
            cameraLookingAt.InnerText = ConvertFloatArrayToString(lookingat);

            cameraValues.AppendChild(cameraPosition);
            cameraValues.AppendChild(cameraLookingAt);

            rootNode.AppendChild(cameraValues);
            #endregion

            #region model
            XmlNode model = document.CreateElement("model-attributes");

            #region positions
            XmlNode positionsAtr = document.CreateElement("position-attribute");

            for (int i = 0; i < positions.Length; i += 3)
            {
                float[] arr = new float[3];
                arr[0] = positions[i + 0];
                arr[1] = positions[i + 1];
                arr[2] = positions[i + 2];

                string vertexVal = ConvertFloatArrayToString(arr);

                XmlNode posVertex = document.CreateElement("vertex" + i / 3);
                posVertex.InnerText = vertexVal;

                positionsAtr.AppendChild(posVertex);
            }

            #endregion

            #region colors
            XmlNode colorsAtr = document.CreateElement("color-attribute");

            for (int i = 0; i < colors.Length; i += 3)
            {
                float[] arr = new float[3];
                arr[0] = colors[i + 0];
                arr[1] = colors[i + 1];
                arr[2] = colors[i + 2];

                string vertexVal = ConvertFloatArrayToString(arr);

                XmlNode posVertex = document.CreateElement("vertex" + i / 3);
                posVertex.InnerText = vertexVal;

                colorsAtr.AppendChild(posVertex);
            }

            #endregion

            #region normals
            XmlNode normalsAtr = document.CreateElement("normal-attribute");

            for (int i = 0; i < normals.Length; i += 3)
            {
                float[] arr = new float[3];
                arr[0] = normals[i + 0];
                arr[1] = normals[i + 1];
                arr[2] = normals[i + 2];

                string vertexVal = ConvertFloatArrayToString(arr);

                XmlNode posVertex = document.CreateElement("vertex" + i / 3);
                posVertex.InnerText = vertexVal;

                normalsAtr.AppendChild(posVertex);
            }

            #endregion

            model.AppendChild(positionsAtr);
            model.AppendChild(colorsAtr);
            model.AppendChild(normalsAtr);

            rootNode.AppendChild(model);

            #endregion

            document.AppendChild(rootNode);

            document.Save(path);

            return location;
        }
        catch
        {
            return null;
        }

    }

    /// <summary>
    /// returns an xml reader to read the xml file
    /// </summary>
    /// <param name="location"></param>
    /// <returns></returns>
    [WebMethod]
    public XmlReader GetXMLFile(string location)
    {
        return XmlReader.Create(Server.MapPath(location));
    }


    /// <summary>
    /// gets model ids that a specific user created
    /// </summary>
    /// <param name="user_id"></param>
    /// <returns></returns>
    [WebMethod]
    public int[] GetModelIdsByUserId(int user_id)
    {
        try
        {
            if (sqlConnection == null || sqlConnection.State != ConnectionState.Open)
                OpenConnection();
            string query = "SELECT Model_Id FROM [Models] Where User_Id = @user";
            SqlCommand cmd = new SqlCommand(query, sqlConnection);
            cmd.Parameters.AddWithValue("@user", user_id);
            SqlDataReader reader = cmd.ExecuteReader();
            List<int> idsList = new List<int>();
            while (reader.Read())
            {
                idsList.Add(reader.GetInt32(0));
            }

            int[] ids = new int[idsList.Count];

            for (int i = 0; i < ids.Length; i++)
            {
                ids[i] = idsList.ElementAt(i);
            }
            return ids;
        }
        catch
        {
            return null;
        }
    }

    /// <summary>
    /// get models ids list
    /// </summary>
    /// <returns></returns>
    [WebMethod]
    public int[] GetModelIds()
    {
        try
        {
            if (sqlConnection == null || sqlConnection.State != ConnectionState.Open)
                OpenConnection();
            string query = "SELECT Model_Id FROM [Models]";
            SqlCommand cmd = new SqlCommand(query, sqlConnection);
            SqlDataReader reader = cmd.ExecuteReader();
            List<int> idsList = new List<int>();
            while (reader.Read())
            {
                idsList.Add(reader.GetInt32(0));
            }

            int[] ids = new int[idsList.Count];

            for(int i = 0; i < ids.Length; i++)
            {
                ids[i] = idsList.ElementAt(i);
            }
            return ids;
        }
        catch
        {
            return null;
        }
    }

    /// <summary>
    /// converts float array to string format
    /// </summary>
    /// <param name="arr"></param>
    /// <returns>string of values</returns>
    private string ConvertFloatArrayToString(float[] arr)
    {
        //converts a float array into a string
        if(arr == null)
        {
            return "";
        }
        string str = arr[0].ToString();

        for(int i = 1; i < arr.Length; i++)
        {
            str += ", " + arr[i].ToString();
        }

        return str;
    }

    /// <summary>
    /// Insert download log into db
    /// </summary>
    /// <param name="user_id"></param>
    /// <param name="model_id"></param>
    /// <returns>success</returns>
    [WebMethod]
    public int InsertDownload(int user_id, int model_id)
    {
        //inserts a download log into the db
        try
        {
            if (sqlConnection == null || sqlConnection.State != ConnectionState.Open)
                OpenConnection();
            string query = "INSERT INTO [Downloads] VALUES(@user_id, @model_id, @date);";
            SqlCommand cmd = new SqlCommand(query, sqlConnection);
            cmd.Parameters.AddWithValue("@user_id", user_id);
            cmd.Parameters.AddWithValue("@model_id", model_id);
            cmd.Parameters.AddWithValue("@date", DateTime.Now);
            cmd.ExecuteNonQuery();
            return 1;
        }
        catch
        {
            return 0;
        }
    }


    /// <summary>
    /// Converting Xml file for model into string array
    /// </summary>
    /// <param name="model_id"></param>
    /// <returns></returns>
    [WebMethod]
    public string[] GetModelInfo(int model_id)
    {
        //returns models info in string form
        XmlReader info = GetModelXMLFile(model_id);
        XmlReader camera;
        XmlReader model;
        XmlReader array;

        string[] arr = new string[5];
        int count = 0;

        info.MoveToContent();

        if (info.Read())
        {
            info.MoveToContent();
            camera = info.ReadSubtree();
            camera.Read();
            while (camera.Read())
            {
                if(camera.MoveToContent() != XmlNodeType.EndElement)
                    arr[count++] = camera.ReadInnerXml();
            }
        }
        if (info.Read())
        {
            info.MoveToContent();
            model = info.ReadSubtree();
            model.Read();
            while (model.Read())
            {
                if (model.MoveToContent() != XmlNodeType.EndElement)
                {
                    array = model.ReadSubtree();
                    arr[count] = "";
                    array.Read();
                    while (array.Read())
                    {
                        if(array.MoveToContent() != XmlNodeType.EndElement)
                            arr[count] += array.ReadInnerXml() + ",";
                    }
                    count++;
                }
            }
        }

        return arr;
    }

    /// <summary>
    /// Insert Rating log into db, if rate for user and model already exist
    /// replace rating with new one
    /// </summary>
    /// <param name="user_id"></param>
    /// <param name="model_id"></param>
    /// <param name="rate"></param>
    /// <returns>success</returns>
    [WebMethod]
    public int InsertRating(int user_id, int model_id, int rate)
    {
        //insert a rating into db
        try
        {
            if (sqlConnection == null || sqlConnection.State != ConnectionState.Open)
                OpenConnection();

            //delete last rating of this model and user
            string query = "DELETE TOP (100) PERCENT FROM [Ratings] WHERE Model_Id = @model AND User_Id = @user;";
            SqlCommand cmd = new SqlCommand(query, sqlConnection);
            cmd.Parameters.AddWithValue("@user", user_id);
            cmd.Parameters.AddWithValue("@model", model_id);
            cmd.ExecuteNonQuery();

            //insert new rating
            query = "INSERT INTO [Ratings] VALUES(@user, @model, @rate);";
            cmd = new SqlCommand(query, sqlConnection);
            cmd.Parameters.AddWithValue("@user", user_id);
            cmd.Parameters.AddWithValue("@model", model_id);
            cmd.Parameters.AddWithValue("@rate", rate);
            cmd.ExecuteNonQuery();
            return 1;
        }
        catch
        {
            return 0;
        }
    }

    /// <summary>
    /// Get Model info from db using
    /// model id
    /// </summary>
    /// <param name="model_id"></param>
    /// <returns>string containing link</returns>
    public XmlReader GetModelXMLReader(int model_id)
    {
        //get an xml reader to read information from sql query
        try
        {
            if (sqlConnection == null || sqlConnection.State != ConnectionState.Open)
                OpenConnection();
            string query = "SELECT * FROM [Models] WHERE Model_Id = @model;";
            SqlCommand cmd = new SqlCommand(query, sqlConnection);
            cmd.Parameters.AddWithValue("@model", model_id);
            XmlReader reader = cmd.ExecuteXmlReader();
            return reader;
        }
        catch
        {

        }
        return null;
    }

    /// <summary>
    /// get creator id from model id
    /// </summary>
    /// <param name="model_id"></param>
    /// <returns></returns>
    [WebMethod]
    public int GetCreatorUserId(int model_id)
    {
        try
        {
            if (sqlConnection == null || sqlConnection.State != ConnectionState.Open)
                OpenConnection();
            string query = "SELECT User_Id FROM [Models] WHERE Model_Id = @model;";
            SqlCommand cmd = new SqlCommand(query, sqlConnection);
            cmd.Parameters.AddWithValue("@model", model_id);
            SqlDataReader reader = cmd.ExecuteReader();
            int id = -1;
            if (reader.Read())
            {
                id = reader.GetInt32(0);
            }
            return id;
        }
        catch
        {

        }
        return -1;
    }

    /// <summary>
    /// get the rate of a certain user on a cetain model
    /// </summary>
    /// <param name="model_id"></param>
    /// <param name="user_id"></param>
    /// <returns></returns>
    [WebMethod]
    public int GetModelUserRate(int model_id, int user_id)
    {
        try
        {
            if (sqlConnection == null || sqlConnection.State != ConnectionState.Open)
                OpenConnection();
            string query = "SELECT Value FROM [Ratings] WHERE Model_Id = @model AND User_Id = @user;";
            SqlCommand cmd = new SqlCommand(query, sqlConnection);
            cmd.Parameters.AddWithValue("@model", model_id);
            cmd.Parameters.AddWithValue("@user", user_id);
            SqlDataReader reader = cmd.ExecuteReader();
            int rate = 0;
            if (reader.Read())
            {
                rate = reader.GetInt32(0);
            }
            return rate;
        }
        catch
        {

        }
        return 0;
    }

    /// <summary>
    /// gets model creation date from model id
    /// </summary>
    /// <param name="model_id"></param>
    /// <returns></returns>
    [WebMethod]
    public DateTime GetModelCreationDate(int model_id)
    {
        try
        {
            if (sqlConnection == null || sqlConnection.State != ConnectionState.Open)
                OpenConnection();
            string query = "SELECT Creation_Date FROM [Models] WHERE Model_Id = @model;";
            SqlCommand cmd = new SqlCommand(query, sqlConnection);
            cmd.Parameters.AddWithValue("@model", model_id);
            SqlDataReader reader = cmd.ExecuteReader();
            DateTime datetime;
            if (reader.Read())
            {
                datetime = reader.GetDateTime(0);
            }
            return DateTime.Now;
        }
        catch
        {

        }
        return DateTime.Now;
    }

    /// <summary>
    /// returns the xml file location from model id
    /// </summary>
    /// <param name="model_id"></param>
    /// <returns></returns>
    [WebMethod]
    public XmlReader GetModelXMLFile(int model_id)
    {
        try
        {
            if (sqlConnection == null || sqlConnection.State != ConnectionState.Open)
                OpenConnection();
            string query = "SELECT XML_File_Link FROM [Models] WHERE Model_Id = @model;";
            SqlCommand cmd = new SqlCommand(query, sqlConnection);
            cmd.Parameters.AddWithValue("@model", model_id);
            SqlDataReader reader = cmd.ExecuteReader();
            string location = null;
            if (reader.Read())
            {
                location = reader.GetString(0);
            }
            
            return GetXMLFile(location);
        }
        catch
        {

        }
        return null;
    }

    /// <summary>
    /// returns model name from model id
    /// </summary>
    /// <param name="model_id"></param>
    /// <returns></returns>
    [WebMethod]
    public string GetModelName(int model_id)
    {
        try
        {
            if (sqlConnection == null || sqlConnection.State != ConnectionState.Open)
                OpenConnection();
            string query = "SELECT Name FROM [Models] WHERE Model_Id = @model;";
            SqlCommand cmd = new SqlCommand(query, sqlConnection);
            cmd.Parameters.AddWithValue("@model", model_id);
            SqlDataReader reader = cmd.ExecuteReader();
            string name = null;
            if (reader.Read())
            {
                name = reader.GetString(0);
            }
            return name;
        }
        catch
        {

        }
        return null;
    }

    /// <summary>
    /// returns model description from model id
    /// </summary>
    /// <param name="model_id"></param>
    /// <returns></returns>
    [WebMethod]
    public string GetModelDescription(int model_id)
    {
        try
        {
            if (sqlConnection == null || sqlConnection.State != ConnectionState.Open)
                OpenConnection();
            string query = "SELECT Description FROM [Models] WHERE Model_Id = @model;";
            SqlCommand cmd = new SqlCommand(query, sqlConnection);
            cmd.Parameters.AddWithValue("@model", model_id);
            SqlDataReader reader = cmd.ExecuteReader();
            string desc = null;
            if (reader.Read())
            {
                desc = reader.GetString(0);
            }
            return desc;
        }
        catch
        {

        }
        return null;
    }

    /// <summary>
    /// returns model thumbnail in base64 form
    /// </summary>
    /// <param name="model_id"></param>
    /// <returns></returns>
    [WebMethod]
    public string GetModelThumbnail(int model_id)
    {
        try
        {
            if (sqlConnection == null || sqlConnection.State != ConnectionState.Open)
                OpenConnection();
            string query = "SELECT thumbnail FROM [Models] WHERE Model_Id = @model;";
            SqlCommand cmd = new SqlCommand(query, sqlConnection);
            cmd.Parameters.AddWithValue("@model", model_id);
            SqlDataReader reader = cmd.ExecuteReader();
            string thumb = null;
            if (reader.Read())
            {
                thumb = reader.GetString(0);
            }
            string dataUrl = ConvertToDataUrl(thumb);
            return dataUrl;
        }
        catch
        {

        }
        return null;
    }

    /// <summary>
    /// converts binary data from png file into base64 form and adds a prefix
    /// </summary>
    /// <param name="location"></param>
    /// <returns></returns>
    private string ConvertToDataUrl(string location)
    {
        byte[] binaryData = File.ReadAllBytes(Server.MapPath(location));
        string base64 = Convert.ToBase64String(binaryData);
        return "data:image/png;base64," + base64;
    }


    /// <summary>
    /// returns a list of all the models
    /// </summary>
    /// <returns></returns>
    [WebMethod]
    public XmlReader GetModelsList()
    {
        try
        {
            if (sqlConnection == null || sqlConnection.State != ConnectionState.Open)
                OpenConnection();
            string query = "SELECT * FROM [Models];";
            SqlCommand cmd = new SqlCommand(query, sqlConnection);
            return cmd.ExecuteXmlReader();
        }
        catch
        {
            return null;
        }
    }

    /// <summary>
    /// Get average rate of model by model-id
    /// </summary>
    /// <param name="model_id"></param>
    /// <returns></returns>
    [WebMethod]
    public float GetRate(int model_id)
    {
        //calculate the average rate of a model
        try
        {
            if (sqlConnection == null || sqlConnection.State != ConnectionState.Open)
                OpenConnection();
            string query = "SELECT SUM(Value) FROM [Ratings] WHERE Model_Id = @model;";
            SqlCommand cmd = new SqlCommand(query, sqlConnection);
            cmd.Parameters.AddWithValue("@model", model_id);
            SqlDataReader reader = cmd.ExecuteReader();
            int sum = 0;
            if (reader.Read())
            {
                sum =  reader.GetInt32(0);
            }
            reader.Close();
            query = "SELECT COUNT(Value) FROM [Ratings] WHERE Model_Id = @model;";
            cmd = new SqlCommand(query, sqlConnection);
            cmd.Parameters.AddWithValue("@model", model_id);
            reader = cmd.ExecuteReader();
            int count = 0;
            if (reader.Read())
            {
                count = reader.GetInt32(0);
            }
            reader.Close();
            if(count == 0)
            {
                return 0;
            }
            return (float)sum / count;
        }
        catch
        {

        }
        //element doesn't exist
        return 0;
    }


    /// <summary>
    /// Get download count array => dictionary that contains download numbers(value) for each date(key)
    /// </summary>
    /// <param name="model_id"></param>
    /// <returns></returns>
    [WebMethod]
    public string[] GetDownloadCountArray(int model_id)
    {
        //returns a string array containing the dates and amount of downloads at each date
        try
        {
            if (sqlConnection == null || sqlConnection.State != ConnectionState.Open)
                OpenConnection();
            string query = "SELECT COUNT(1), CONVERT(date, Download_Date) FROM [Downloads] WHERE Model_Id = @model GROUP BY CONVERT(date, Download_Date);";
            SqlCommand cmd = new SqlCommand(query, sqlConnection);
            cmd.Parameters.AddWithValue("@model", model_id);
            SqlDataReader reader = cmd.ExecuteReader();
            Dictionary<DateTime, int> dateCount = new Dictionary<DateTime, int>();
            while (reader.Read())
            {
                dateCount.Add(reader.GetDateTime(1), reader.GetInt32(0));
            }

            string[] mat = new string[dateCount.Count * 2];

            for (int i = 0; i < dateCount.Count; i++)
            {
                mat[i] = dateCount.ElementAt(i).Key.ToString();
                mat[dateCount.Count + i] = dateCount.ElementAt(i).Value.ToString();
            }

            return mat;
        }
        catch
        {
            return null;
        }
    }
    

}
