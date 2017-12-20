﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;

public partial class Pages_ProfilePage_ProfilePage : System.Web.UI.Page
{
    private string[] colors;
    Random rnd;

    protected void Page_Load(object sender, EventArgs e)
    {
        //color: rgb(216, 216, 216);
        //color: rgb(252, 246, 189);
        //color: rgb(208, 244, 222);
        //color: rgb(222, 246, 202);
        //color: rgb(248, 189, 196);
        colors = new string[5];
        colors[0] = "rgb(216, 216, 216)";
        colors[1] = "rgb(252, 246, 189)";
        colors[2] = "rgb(208, 244, 222)";
        colors[3] = "rgb(222, 246, 202)";
        colors[4] = "rgb(248, 189, 196)";
        rnd = new Random();

        int size = 10;

        for(int i = 0; i < size; i++)// get asset list from web service and loop through
        {
            Asset_Holder.Controls.Add(GenerateAssetFile(i, size));
        }
    }

    private HtmlGenericControl GenerateAssetFile(int index, int total)
    {
        HtmlGenericControl file_div = new HtmlGenericControl("div");
        file_div.ID = "file-div-" + index;
        if(index != 0)
        {
            file_div.Attributes["class"] = "asset-file-div asset-back-up-div";
        }
        else
        {
            file_div.Attributes["class"] = "asset-file-div";
        }
        file_div.Attributes["style"] = "z-index:" + (total - index);
        string color = colors[index % colors.Length];
        file_div.Controls.Add(GenerateTab(index, total, color));
        file_div.Controls.Add(GenerateFile(index, color));
        return file_div;
    }

    private HtmlGenericControl GenerateTab(int index, int total, string color)
    {
        HtmlGenericControl tab = new HtmlGenericControl("div");
        tab.ID = "file-tab-" + index;
        tab.Attributes["class"] = "asset-file-tab";
        float width = 15;
        float leftPos = 85 * index / (total - 1);
        if(leftPos > 15 * index)
        {
            leftPos = 15 * index;
        }
        tab.Attributes["style"] = "left:" + leftPos + "%; width:" + width + "%; background-color:" + color;
        tab.Attributes["onclick"] = "putInfront(" + index + ");";

        HtmlGenericControl tabTxt = new HtmlGenericControl("p");
        tabTxt.InnerHtml = "Asset Name";
        tabTxt.Attributes["class"] = "tab-txt Report1942Font";
        tab.Controls.Add(tabTxt);
        return tab;
    }

    private HtmlGenericControl GenerateFile(int index, string color)
    {
        HtmlGenericControl file = new HtmlGenericControl("div");
        file.Attributes["class"] = "asset-file-color";
        file.Attributes["style"] = "background-color:" + color;
        file.Attributes["onclick"] = "putInfront(" + index + ");";

        HtmlGenericControl thumbnail = new HtmlGenericControl("img");
        thumbnail.Attributes["src"] = "/Resources/Images/polygon-mountain.jpg";
        thumbnail.Attributes["class"] = "thumbnail-profile";

        HtmlGenericControl edit_btn = GenerateButton("EDIT", "edit-btn");
        HtmlGenericControl delete_btn = GenerateButton("DELETE", "delete-btn");

        HtmlGenericControl rating = new HtmlGenericControl("p");
        rating.Attributes["id"] = "asset-rate-" + index;
        rating.Attributes["class"] = "asset-rate AileronsFont";
        rating.InnerHtml = (Math.Floor(rnd.NextDouble()*5*10) / 10).ToString() + "/5";

        HtmlGenericControl graph = GenerateAssetGraph(index);

        file.Controls.Add(thumbnail);
        file.Controls.Add(edit_btn);
        file.Controls.Add(delete_btn);
        file.Controls.Add(rating);
        file.Controls.Add(graph);
        return file;
    }

    private HtmlGenericControl GenerateButton(string name, string posClass)
    {
        HtmlGenericControl button = new HtmlGenericControl("button");
        button.Attributes["class"] = "profile-action-button " + posClass;

        HtmlGenericControl p = new HtmlGenericControl("p");
        HtmlGenericControl selected_img = new HtmlGenericControl("img");
        p.InnerHtml = name;
        p.Attributes["class"] = "AileronsFont";
        selected_img.Attributes["src"] = "/Resources/Icons/button-selected.png";

        button.Controls.Add(p);
        button.Controls.Add(selected_img);

        return button;
    }

    private HtmlGenericControl GenerateAssetGraph(int index)
    {
        HtmlGenericControl svg = new HtmlGenericControl("svg");
        svg.Attributes["class"] = "asset-graph";

        return svg;
    }
}