<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ServiceAdminPage.aspx.cs" Inherits="AdminPage_ServiceAdminPage" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Admin Page</title>
    <link rel="icon" href="../../Resources/Icons/model_icon.png" />
    <link href="StyleSheet.css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <center>
        <asp:GridView ID="Downloads" runat="server" AutoGenerateColumns="False" DataKeyNames="Download_Id" DataSourceID="SqlDataSource1" CellPadding="4" ForeColor="#333333" GridLines="None" CssClass="gridview">
            <AlternatingRowStyle BackColor="White"></AlternatingRowStyle>
            <Columns>
                <asp:CommandField ShowDeleteButton="True" ShowSelectButton="True" ShowEditButton="true" />
                <asp:BoundField DataField="Download_Id" HeaderText="Download_Id" SortExpression="Download_Id" ApplyFormatInEditMode="False" ReadOnly="true"></asp:BoundField>
                <asp:BoundField DataField="User_Id" HeaderText="User_Id" SortExpression="User_Id" ApplyFormatInEditMode="True"></asp:BoundField>
                <asp:BoundField DataField="Model_Id" HeaderText="Model_Id" SortExpression="Model_Id" ApplyFormatInEditMode="True"></asp:BoundField>
                <asp:BoundField DataField="Download_Date" HeaderText="Download_Date" SortExpression="Download_Date" ApplyFormatInEditMode="True" ReadOnly="true"></asp:BoundField>
            </Columns>
            <EditRowStyle BackColor="#7C6F57"></EditRowStyle>

            <FooterStyle BackColor="#1C5E55" Font-Bold="True" ForeColor="White"></FooterStyle>

            <HeaderStyle BackColor="#1C5E55" Font-Bold="True" ForeColor="White"></HeaderStyle>

            <PagerStyle HorizontalAlign="Center" BackColor="#666666" ForeColor="White"></PagerStyle>

            <RowStyle BackColor="#E3EAEB"></RowStyle>

            <SelectedRowStyle BackColor="#C5BBAF" Font-Bold="True" ForeColor="#333333"></SelectedRowStyle>

            <SortedAscendingCellStyle BackColor="#F8FAFA"></SortedAscendingCellStyle>

            <SortedAscendingHeaderStyle BackColor="#246B61"></SortedAscendingHeaderStyle>

            <SortedDescendingCellStyle BackColor="#D4DFE1"></SortedDescendingCellStyle>

            <SortedDescendingHeaderStyle BackColor="#15524A"></SortedDescendingHeaderStyle>
        </asp:GridView>
            <br />
        <asp:SqlDataSource runat="server" ID="SqlDataSource1" ConnectionString='<%$ ConnectionStrings:ConnectionString %>' SelectCommand="SELECT * FROM [Downloads]" UpdateCommand="UPDATE [Downlods] SET User_Id =@User_Id, Model_Id=@Model_Id WHERE Download_Id = @Download_Id" DeleteCommand="DELETE FROM [Downloads] WHERE Download_Id = @Download_Id"></asp:SqlDataSource>
        <asp:GridView ID="Models" runat="server" AutoGenerateColumns="False" DataKeyNames="Model_Id" DataSourceID="SqlDataSource2" CellPadding="4" ForeColor="#333333" GridLines="None" CssClass="gridview">
            <AlternatingRowStyle BackColor="White"></AlternatingRowStyle>
            <Columns>
                <asp:CommandField ShowDeleteButton="True" ShowSelectButton="True" ShowEditButton="true" />
                <asp:BoundField DataField="Model_Id" HeaderText="Model_Id" ReadOnly="True" InsertVisible="False" SortExpression="Model_Id"></asp:BoundField>
                <asp:BoundField DataField="User_Id" HeaderText="User_Id" SortExpression="User_Id"></asp:BoundField>
                <asp:BoundField DataField="Creation_Date" HeaderText="Creation_Date" SortExpression="Creation_Date" ReadOnly="True"></asp:BoundField>
                <asp:BoundField DataField="XML_File_Link" HeaderText="XML_File_Link" SortExpression="XML_File_Link"></asp:BoundField>
                <asp:BoundField DataField="Name" HeaderText="Name" SortExpression="Name"></asp:BoundField>
                <asp:BoundField DataField="Description" HeaderText="Description" SortExpression="Description"></asp:BoundField>
                <asp:BoundField DataField="Thumbnail" HeaderText="Thumbnail" SortExpression="Thumbnail"></asp:BoundField>
            </Columns>
            <EditRowStyle BackColor="#7C6F57"></EditRowStyle>

            <FooterStyle BackColor="#1C5E55" Font-Bold="True" ForeColor="White"></FooterStyle>

            <HeaderStyle BackColor="#1C5E55" Font-Bold="True" ForeColor="White"></HeaderStyle>

            <PagerStyle HorizontalAlign="Center" BackColor="#666666" ForeColor="White"></PagerStyle>

            <RowStyle BackColor="#E3EAEB"></RowStyle>

            <SelectedRowStyle BackColor="#C5BBAF" Font-Bold="True" ForeColor="#333333"></SelectedRowStyle>

            <SortedAscendingCellStyle BackColor="#F8FAFA"></SortedAscendingCellStyle>

            <SortedAscendingHeaderStyle BackColor="#246B61"></SortedAscendingHeaderStyle>

            <SortedDescendingCellStyle BackColor="#D4DFE1"></SortedDescendingCellStyle>

            <SortedDescendingHeaderStyle BackColor="#15524A"></SortedDescendingHeaderStyle>
        </asp:GridView>
            <br />
        <asp:SqlDataSource runat="server" ID="SqlDataSource2" ConnectionString='<%$ ConnectionStrings:ConnectionString %>' SelectCommand="SELECT * FROM [Models]" UpdateCommand="UPDATE [Models] SET User_Id = @User_Id, XML_File_Link = @XML_File_Link, Name = @Name, Description = @Description, Thumbnail = @Thumbnail WHERE Model_Id = @Model_Id" DeleteCommand="DELETE FROM [Downloads] WHERE Model_Id = @Model_Id; DELETE FROM [Ratings] WHERE Model_Id = @Model_Id; DELETE FROM [Models] WHERE Model_Id = @Model_Id"></asp:SqlDataSource>
        <asp:GridView ID="Ratings" runat="server" AutoGenerateColumns="False" DataKeyNames="Rate_Id" DataSourceID="SqlDataSource3" CellPadding="4" ForeColor="#333333" GridLines="None" CssClass="gridview">
            <AlternatingRowStyle BackColor="White"></AlternatingRowStyle>
            <Columns>
                <asp:CommandField ShowDeleteButton="True" ShowSelectButton="True" ShowEditButton="true" />
                <asp:BoundField DataField="Rate_Id" HeaderText="Rate_Id" ReadOnly="True" InsertVisible="False" SortExpression="Rate_Id"></asp:BoundField>
                <asp:BoundField DataField="User_Id" HeaderText="User_Id" SortExpression="User_Id"></asp:BoundField>
                <asp:BoundField DataField="Model_Id" HeaderText="Model_Id" SortExpression="Model_Id"></asp:BoundField>
                <asp:BoundField DataField="Value" HeaderText="Value" SortExpression="Value"></asp:BoundField>
            </Columns>
            <EditRowStyle BackColor="#7C6F57"></EditRowStyle>

            <FooterStyle BackColor="#1C5E55" Font-Bold="True" ForeColor="White"></FooterStyle>

            <HeaderStyle BackColor="#1C5E55" Font-Bold="True" ForeColor="White"></HeaderStyle>

            <PagerStyle HorizontalAlign="Center" BackColor="#666666" ForeColor="White"></PagerStyle>

            <RowStyle BackColor="#E3EAEB"></RowStyle>

            <SelectedRowStyle BackColor="#C5BBAF" Font-Bold="True" ForeColor="#333333"></SelectedRowStyle>

            <SortedAscendingCellStyle BackColor="#F8FAFA"></SortedAscendingCellStyle>

            <SortedAscendingHeaderStyle BackColor="#246B61"></SortedAscendingHeaderStyle>

            <SortedDescendingCellStyle BackColor="#D4DFE1"></SortedDescendingCellStyle>

            <SortedDescendingHeaderStyle BackColor="#15524A"></SortedDescendingHeaderStyle>
        </asp:GridView>
            <br />
        <asp:SqlDataSource runat="server" ID="SqlDataSource3" ConnectionString='<%$ ConnectionStrings:ConnectionString %>' SelectCommand="SELECT * FROM [Ratings]" UpdateCommand="UPDATE [Ratings] SET User_Id = @User_Id, Model_Id = @Model_Id, Value = @Value WHERE Rate_Id = @Rate_Id" DeleteCommand="DELETE FROM [Ratings] WHERE Rate_Id = @Rate_Id"></asp:SqlDataSource>
        <asp:GridView ID="Users" runat="server" AutoGenerateColumns="False" DataKeyNames="Id" DataSourceID="SqlDataSource4" CellPadding="4" ForeColor="#333333" GridLines="None" CssClass="gridview">
            <AlternatingRowStyle BackColor="White"></AlternatingRowStyle>
            <Columns>
                <asp:CommandField ShowDeleteButton="True" ShowSelectButton="True"/>
                <asp:BoundField DataField="Id" HeaderText="Id" ReadOnly="True" SortExpression="Id"></asp:BoundField>
            </Columns>
            <EditRowStyle BackColor="#7C6F57"></EditRowStyle>

            <FooterStyle BackColor="#1C5E55" Font-Bold="True" ForeColor="White"></FooterStyle>

            <HeaderStyle BackColor="#1C5E55" Font-Bold="True" ForeColor="White"></HeaderStyle>

            <PagerStyle HorizontalAlign="Center" BackColor="#666666" ForeColor="White"></PagerStyle>

            <RowStyle BackColor="#E3EAEB"></RowStyle>

            <SelectedRowStyle BackColor="#C5BBAF" Font-Bold="True" ForeColor="#333333"></SelectedRowStyle>

            <SortedAscendingCellStyle BackColor="#F8FAFA"></SortedAscendingCellStyle>

            <SortedAscendingHeaderStyle BackColor="#246B61"></SortedAscendingHeaderStyle>

            <SortedDescendingCellStyle BackColor="#D4DFE1"></SortedDescendingCellStyle>

            <SortedDescendingHeaderStyle BackColor="#15524A"></SortedDescendingHeaderStyle>
        </asp:GridView>
        <asp:SqlDataSource runat="server" ID="SqlDataSource4" ConnectionString='<%$ ConnectionStrings:ConnectionString %>' SelectCommand="SELECT * FROM [Users]" DeleteCommand="DELETE FROM [Downloads] WHERE User_Id = @Id; DELETE FROM [Ratings] WHERE User_Id = @Id; DELETE FROM [Models] WHERE User_Id = @Id; DELETE FROM [Users] WHERE Id = @Id"></asp:SqlDataSource>
            </center>
    </div>

    </form>
</body>
</html>
