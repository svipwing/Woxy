// ========== get.js.js ==========
// 说明：本文件为自定义积木的 JavaScript 代码生成器。
// 已兼容原有生成器并修复样式串接的小问题；新增样式/事件/脚本类生成器。

/* global Blockly */

Blockly.JavaScript.ORDER_ATOMIC = 99;

// ========== 标题类 ==========
Blockly.JavaScript["h1"] = function (block) {
  var text_text = block.getFieldValue("text");
  var text_id = block.getFieldValue("id");
  var code = '<h1 id="' + text_id + '">' + text_text + "</h1>\n";
  return code;
};
Blockly.JavaScript["h2"] = function (block) {
  var text_text = block.getFieldValue("text");
  var text_id = block.getFieldValue("id");
  var code = '<h2 id="' + text_id + '">' + text_text + "</h2>\n";
  return code;
};
Blockly.JavaScript["h3"] = function (block) {
  var text_text = block.getFieldValue("text");
  var text_id = block.getFieldValue("id");
  var code = '<h3 id="' + text_id + '">' + text_text + "</h3>\n";
  return code;
};

// ========== 页面结构 ==========
Blockly.JavaScript["go"] = function (block) {
  var text_title = block.getFieldValue("title");
  var dropdown_unicode = block.getFieldValue("unicode");
  var code =
    '<html>\n<head>\n' +
    '<script src="https://static.codemao.cn/pickduck/Sk6ZKOYoR.js?hash=FvdCzpDmExIP2wPGUy13G5i3NEfy"></script>' +
    '<meta http-equiv="Content-Type" content="text/html; charset=' + dropdown_unicode + '">\n' +
    "<title>" + text_title + "</title>\n</head>\n<body>\n";
  return code;
};
Blockly.JavaScript["end"] = function () {
  return "</body>\n</html>\n";
};

// ========== 文本与内容 ==========
Blockly.JavaScript["p"] = function (block) {
  var text_text = block.getFieldValue("text");
  var text_id = block.getFieldValue("id");
  var code = '<p id="' + text_id + '">' + text_text + "</p>\n";
  return code;
};

Blockly.JavaScript["div"] = function (block) {
  var statements_html = Blockly.JavaScript.statementToCode(block, "html");
  var text_color = block.getFieldValue("color");
  var text_id = block.getFieldValue("id");
  var style = 'style="background-color: ' + text_color + ';"';
  var code = '<div id="' + text_id + '" ' + style + '>' + statements_html + "</div>\n";
  return code;
};
Blockly.JavaScript["div_xy"] = function (block) {
  var statements_html = Blockly.JavaScript.statementToCode(block, "html");
  var text_color = block.getFieldValue("color");
  var text_id = block.getFieldValue("id");
  var text_x = block.getFieldValue("x");
  var text_y = block.getFieldValue("y");
  var style = 'style="position: fixed; background-color: ' + text_color + '; top:' + text_y + '%; left:' + text_x + '%;"';
  var code = '<div id="' + text_id + '" ' + style + '>' + statements_html + "</div>\n";
  return code;
};

Blockly.JavaScript["i"] = function (block) {
  var text_text = block.getFieldValue("text");
  var text_id = block.getFieldValue("id");
  var code = '<i id="' + text_id + '">' + text_text + "</i>\n";
  return code;
};
Blockly.JavaScript["i_xy"] = function (block) {
  var text_text = block.getFieldValue("text");
  var text_id = block.getFieldValue("id");
  var text_x = block.getFieldValue("x");
  var text_y = block.getFieldValue("y");
  var style = 'style="position: fixed; top:' + text_y + '%; left:' + text_x + '%;"';
  var code = '<i id="' + text_id + '" ' + style + ">" + text_text + "</i>\n";
  return code;
};

Blockly.JavaScript["u"] = function (block) {
  var text_text = block.getFieldValue("text");
  var text_id = block.getFieldValue("id");
  var code = '<u id="' + text_id + '">' + text_text + "</u>\n";
  return code;
};
Blockly.JavaScript["u_xy"] = function (block) {
  var text_text = block.getFieldValue("text");
  var text_id = block.getFieldValue("id");
  var text_x = block.getFieldValue("x");
  var text_y = block.getFieldValue("y");
  var style = 'style="position: fixed; top:' + text_y + '%; left:' + text_x + '%;"';
  var code = '<u id="' + text_id + '" ' + style + ">" + text_text + "</u>\n";
  return code;
};

Blockly.JavaScript["s"] = function (block) {
  var text_text = block.getFieldValue("text");
  var text_id = block.getFieldValue("id");
  var code = '<s id="' + text_id + '">' + text_text + "</s>\n";
  return code;
};
Blockly.JavaScript["s_xy"] = function (block) {
  var text_text = block.getFieldValue("text");
  var text_id = block.getFieldValue("id");
  var text_x = block.getFieldValue("x");
  var text_y = block.getFieldValue("y");
  var style = 'style="position: fixed; top:' + text_y + '%; left:' + text_x + '%;"';
  var code = '<s id="' + text_id + '" ' + style + ">" + text_text + "</s>\n";
  return code;
};

Blockly.JavaScript["table"] = function (block) {
  var statements_table = Blockly.JavaScript.statementToCode(block, "table");
  var text_id = block.getFieldValue("id");
  var code = '<s-table id="' + text_id + '">' + statements_table + "</s-table>\n";
  return code;
};
Blockly.JavaScript["table_xy"] = function (block) {
  var statements_table = Blockly.JavaScript.statementToCode(block, "table");
  var text_id = block.getFieldValue("id");
  var text_x = block.getFieldValue("x");
  var text_y = block.getFieldValue("y");
  var style = 'style="position: fixed; top:' + text_y + '%; left:' + text_x + '%;"';
  var code = '<s-table id="' + text_id + '" ' + style + ">" + statements_table + "</s-table>\n";
  return code;
};

Blockly.JavaScript["tr_head"] = function (block) {
  var statements_tr = Blockly.JavaScript.statementToCode(block, "tr");
  var text_id = block.getFieldValue("id");
  var code = "<s-thead><s-tr id=\"" + text_id + "\">" + statements_tr + "</s-tr></s-thead>\n";
  return code;
};
Blockly.JavaScript["tr"] = function (block) {
  var statements_tr = Blockly.JavaScript.statementToCode(block, "tr");
  var text_id = block.getFieldValue("id");
  var code = "<s-tbody><s-tr id=\"" + text_id + "\">" + statements_tr + "</s-tr></s-tbody>\n";
  return code;
};
Blockly.JavaScript["th"] = function (block) {
  var text_text = block.getFieldValue("text");
  var text_id = block.getFieldValue("id");
  var code = '<s-th id="' + text_id + '">' + text_text + "</s-th>\n";
  return code;
};
Blockly.JavaScript["td"] = function (block) {
  var text_text = block.getFieldValue("text");
  var text_id = block.getFieldValue("id");
  var code = '<s-td id="' + text_id + '">' + text_text + "</s-td>\n";
  return code;
};

Blockly.JavaScript["ul"] = function (block) {
  var statements_li = Blockly.JavaScript.statementToCode(block, "li");
  var text_id = block.getFieldValue("id");
  var code = '<ul id="' + text_id + '">' + statements_li + "</ul>\n";
  return code;
};
Blockly.JavaScript["ul_xy"] = function (block) {
  var statements_li = Blockly.JavaScript.statementToCode(block, "li");
  var text_id = block.getFieldValue("id");
  var text_x = block.getFieldValue("x");
  var text_y = block.getFieldValue("y");
  var style = 'style="position: fixed; top:' + text_y + '%; left:' + text_x + '%;"';
  var code = '<ul id="' + text_id + '" ' + style + ">" + statements_li + "</ul>\n";
  return code;
};
Blockly.JavaScript["ol"] = function (block) {
  var statements_li = Blockly.JavaScript.statementToCode(block, "li");
  var text_id = block.getFieldValue("id");
  var code = '<ol id="' + text_id + '">' + statements_li + "</ol>\n";
  return code;
};
Blockly.JavaScript["ol_xy"] = function (block) {
  var statements_li = Blockly.JavaScript.statementToCode(block, "li");
  var text_id = block.getFieldValue("id");
  var text_x = block.getFieldValue("x");
  var text_y = block.getFieldValue("y");
  var style = 'style="position: fixed; top:' + text_y + '%; left:' + text_x + '%;"';
  var code = '<ol id="' + text_id + '" ' + style + ">" + statements_li + "</ol>\n";
  return code;
};
Blockly.JavaScript["li"] = function (block) {
  var text_text = block.getFieldValue("text");
  var text_id = block.getFieldValue("id");
  var code = '<li id="' + text_id + '">' + text_text + "</li>\n";
  return code;
};

Blockly.JavaScript["code"] = function (block) {
  var text_code_txt = block.getFieldValue("code_txt");
  return text_code_txt + "\n";
};

// ========== 样式 ==========
Blockly.JavaScript["style"] = function (block) {
  var text_who = block.getFieldValue("who");
  var statements_css = Blockly.JavaScript.statementToCode(block, "css");
  var code = "<style>\n#" + text_who + " {\n" + statements_css + "}\n</style>\n";
  return code;
};
Blockly.JavaScript["style_hover"] = function (block) {
  var text_who = block.getFieldValue("who");
  var statements_css = Blockly.JavaScript.statementToCode(block, "css");
  var code = "<style>\n#" + text_who + ":hover {\n" + statements_css + "}\n</style>\n";
  return code;
};
Blockly.JavaScript["display"] = function (block) {
  var text_type = block.getFieldValue("type");
  return "display: " + text_type + ";\n";
};
Blockly.JavaScript["flex_justify_content"] = function (block) {
  var text_type = block.getFieldValue("type");
  return "justify-content: " + text_type + ";\n";
};
Blockly.JavaScript["flex_direction"] = function (block) {
  var text_zhuzou = block.getFieldValue("zhuzou");
  return "flex-direction: " + text_zhuzou + ";\n";
};
Blockly.JavaScript["flex_align_items"] = function (block) {
  var text_type = block.getFieldValue("type");
  return "align-items: " + text_type + ";\n";
};
Blockly.JavaScript["text_color"] = function (block) {
  var text_color = block.getFieldValue("color");
  return "color: " + text_color + ";\n";
};
Blockly.JavaScript["text_size"] = function (block) {
  var text_size = block.getFieldValue("size");
  return "font-size: " + text_size + "px;\n";
};
Blockly.JavaScript["font_family"] = function (block) {
  var fam = block.getFieldValue("family");
  return "font-family: " + fam + ";\n";
};
Blockly.JavaScript["overflow"] = function (block) {
  var text_type = block.getFieldValue("type");
  return "overflow: " + text_type + ";\n";
};
Blockly.JavaScript["radius"] = function (block) {
  var text_r = block.getFieldValue("r");
  return "border-radius: " + text_r + "px;\n";
};
Blockly.JavaScript["shadow"] = function (block) {
  var text_x = block.getFieldValue("x");
  var text_y = block.getFieldValue("y");
  var text_m = block.getFieldValue("m");
  var text_c = block.getFieldValue("c");
  return "box-shadow: " + text_x + "px " + text_y + "px " + text_m + "px " + text_c + ";\n";
};
Blockly.JavaScript["bg_color"] = function (block) {
  var text_color = block.getFieldValue("color");
  return "background-color: " + text_color + ";\n";
};
Blockly.JavaScript["css_width"] = function (block) {
  var text_width = block.getFieldValue("width");
  return "width: " + text_width + "px;\n";
};
Blockly.JavaScript["css_height"] = function (block) {
  var text_height = block.getFieldValue("height");
  return "height: " + text_height + "px;\n";
};
Blockly.JavaScript["z-index"] = function (block) {
  var text_c = block.getFieldValue("c");
  return "z-index: " + text_c + ";\n";
};
Blockly.JavaScript["margin"] = function (block) {
  var v = block.getFieldValue("value");
  return "margin: " + v + ";\n";
};
Blockly.JavaScript["padding"] = function (block) {
  var v = block.getFieldValue("value");
  return "padding: " + v + ";\n";
};
Blockly.JavaScript["border"] = function (block) {
  var v = block.getFieldValue("value");
  return "border: " + v + ";\n";
};
Blockly.JavaScript["position"] = function (block) {
  var v = block.getFieldValue("mode");
  return "position: " + v + ";\n";
};

// ========== 结构与装饰 ==========
Blockly.JavaScript["line"] = function () {
  return "<hr />\n";
};
Blockly.JavaScript["center_go"] = function () {
  return "<center>\n";
};
Blockly.JavaScript["center_end"] = function () {
  return "</center>\n";
};
Blockly.JavaScript["br"] = function () {
  return "<br>\n";
};

// ========== 链接、图片、按钮 ==========
Blockly.JavaScript["link"] = function (block) {
  var text_text = block.getFieldValue("text");
  var text_link = block.getFieldValue("link");
  var text_id = block.getFieldValue("id");
  var code = '<a href="' + text_link + '" id="' + text_id + '">' + text_text + "</a>\n";
  return code;
};
Blockly.JavaScript["link_xy"] = function (block) {
  var text_text = block.getFieldValue("text");
  var text_link = block.getFieldValue("link");
  var text_x = block.getFieldValue("x");
  var text_y = block.getFieldValue("y");
  var text_id = block.getFieldValue("id");
  var style = 'style="position: fixed; left: ' + text_x + '%; top: ' + text_y + '%;"';
  var code = '<a href="' + text_link + '" ' + style + ' id="' + text_id + '">' + text_text + "</a>\n";
  return code;
};
Blockly.JavaScript["image"] = function (block) {
  var text_img = block.getFieldValue("img");
  var text_height = block.getFieldValue("height");
  var text_width = block.getFieldValue("width");
  var text_id = block.getFieldValue("id");
  var code = '<img src="' + text_img + '" width="' + text_width + 'px" height="' + text_height + 'px" id="' + text_id + '" />\n';
  return code;
};
Blockly.JavaScript["image_xy"] = function (block) {
  var text_img = block.getFieldValue("img");
  var text_height = block.getFieldValue("height");
  var text_width = block.getFieldValue("width");
  var text_x = block.getFieldValue("x");
  var text_y = block.getFieldValue("y");
  var text_id = block.getFieldValue("id");
  var style = 'style="position: fixed; left: ' + text_x + '%; top: ' + text_y + '%;"';
  var code = '<img src="' + text_img + '" width="' + text_width + 'px" height="' + text_height + 'px" ' + style + ' id="' + text_id + '" />\n';
  return code;
};
Blockly.JavaScript["button"] = function (block) {
  var text_text = block.getFieldValue("text");
  var text_link = block.getFieldValue("link");
  var text_id = block.getFieldValue("id");
  var code = "";
  if (text_link === "") {
    code = '<a id="' + text_id + '">\n<button>' + text_text + "</button>\n</a>\n";
  } else {
    code = '<a href="' + text_link + '" id="' + text_id + '">\n<button>' + text_text + "</button>\n</a>\n";
  }
  return code;
};
Blockly.JavaScript["button_xy"] = function (block) {
  var text_text = block.getFieldValue("text");
  var text_link = block.getFieldValue("link");
  var text_x = block.getFieldValue("x");
  var text_y = block.getFieldValue("y");
  var text_id = block.getFieldValue("id");
  var style = 'style="position: fixed; left: ' + text_x + '%; top: ' + text_y + '%;"';
  var code = "";
  if (text_link === "") {
    code = '<a ' + style + ' id="' + text_id + '">\n<button>' + text_text + "</button>\n</a>\n";
  } else {
    code = '<a href="' + text_link + '" ' + style + ' id="' + text_id + '">\n<button>' + text_text + "</button>\n</a>\n";
  }
  return code;
};
Blockly.JavaScript["input"] = function (block) {
  var text_id = block.getFieldValue("id");
  var dropdown_type = block.getFieldValue("type");
  var code = '<input type="' + dropdown_type + '" id="' + text_id + '" />\n';
  return code;
};
Blockly.JavaScript["input_xy"] = function (block) {
  var text_id = block.getFieldValue("id");
  var dropdown_type = block.getFieldValue("type");
  var text_x = block.getFieldValue("x");
  var text_y = block.getFieldValue("y");
  var style = 'style="position: fixed; left: ' + text_x + '%; top: ' + text_y + '%;"';
  var code = '<input type="' + dropdown_type + '" id="' + text_id + '" ' + style + " />\n";
  return code;
};

// ========== 菜单组件 ==========
Blockly.JavaScript["menu"] = function (block) {
  var statements_op = Blockly.JavaScript.statementToCode(block, "op");
  var text_id = block.getFieldValue("id");
  var code = '<s-popup-menu id="' + text_id + '">' + statements_op + "</s-popup-menu>\n";
  return code;
};
Blockly.JavaScript["menu_xy"] = function (block) {
  var statements_op = Blockly.JavaScript.statementToCode(block, "op");
  var text_id = block.getFieldValue("id");
  var text_x = block.getFieldValue("x");
  var text_y = block.getFieldValue("y");
  var style = 'style="position: fixed; top:' + text_y + '%; left:' + text_x + '%;"';
  var code = '<s-popup-menu id="' + text_id + '" ' + style + ">" + statements_op + "</s-popup-menu>\n";
  return code;
};
Blockly.JavaScript["menu_button_main"] = function (block) {
  var text_text = block.getFieldValue("text");
  var text_id = block.getFieldValue("id");
  var code = '<s-button slot="trigger" id="' + text_id + '">' + text_text + " </s-button>\n";
  return code;
};
Blockly.JavaScript["menu_button_minor"] = function (block) {
  var text_text = block.getFieldValue("text");
  var text_id = block.getFieldValue("id");
  var code = '<s-popup-menu-item id="' + text_id + '" slot="trigger">' + text_text + ' <s-icon slot="end" type="arrow_drop_right"></s-icon></s-popup-menu-item>\n';
  return code;
};
Blockly.JavaScript["menu_item"] = function (block) {
  var text_text = block.getFieldValue("text");
  var text_id = block.getFieldValue("id");
  var code = '<s-popup-menu-item id="' + text_id + '">' + text_text + " </s-popup-menu-item>\n";
  return code;
};

// ========== 脚本与逻辑 ==========
Blockly.JavaScript["js"] = function (block) {
  var statements_js = Blockly.JavaScript.statementToCode(block, "js");
  return "<script>\n" + statements_js + "</script>\n";
};
Blockly.JavaScript["alert"] = function (block) {
  var value_text = Blockly.JavaScript.valueToCode(block, "text", Blockly.JavaScript.ORDER_ATOMIC) || "''";
  return "alert(" + value_text + ");\n";
};
Blockly.JavaScript["console_log"] = function (block) {
  var value_text = Blockly.JavaScript.valueToCode(block, "text", Blockly.JavaScript.ORDER_ATOMIC) || "''";
  return "console.log(" + value_text + ");\n";
};
Blockly.JavaScript["changestyle"] = function (block) {
  var text_id = block.getFieldValue("id");
  var text_type = block.getFieldValue("type");
  var text_value = block.getFieldValue("value");
  var code = "";
  if (text_type === "innerHTML") {
    code = "document.getElementById('" + text_id + "').innerHTML='" + text_value + "';\n";
  } else {
    code = "document.getElementById('" + text_id + "').style." + text_type + "='" + text_value + "';\n";
  }
  return code;
};
Blockly.JavaScript["change_div_html"] = function (block) {
  var text_id = block.getFieldValue("id");
  var statements_html = Blockly.JavaScript.statementToCode(block, "html");
  var code = "document.getElementById('" + text_id + "').innerHTML=`" + statements_html + "`;\n";
  return code;
};
Blockly.JavaScript["click"] = function (block) {
  var text_id = block.getFieldValue("id");
  var statements_js = Blockly.JavaScript.statementToCode(block, "js");
  var dropdown_type = block.getFieldValue("type");
  var code = "document.getElementById('" + text_id + "').addEventListener('" + dropdown_type + "',()=>{\n" + statements_js + "});\n";
  return code;
};
Blockly.JavaScript["dom_get_value"] = function (block) {
  var text_id = block.getFieldValue("id");
  var code = 'document.getElementById("' + text_id + '").value';
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript["button_onclick"] = function (block) {
  var text_id = block.getFieldValue("id");
  var statements_onclick = Blockly.JavaScript.statementToCode(block, "onclick");
  var code = 'document.getElementById("' + text_id + '").onclick=function(){\n' + statements_onclick + "};\n";
  return code;
};
Blockly.JavaScript["to_num"] = function (block) {
  var value_name = Blockly.JavaScript.valueToCode(block, "NAME", Blockly.JavaScript.ORDER_ATOMIC) || "0";
  var code = "Number(" + value_name + ")";
  return [code, Blockly.JavaScript.ORDER_NONE];
};

// 新增：输入/键盘/焦点事件
Blockly.JavaScript["on_input"] = function (block) {
  var id = block.getFieldValue("id");
  var etype = block.getFieldValue("etype");
  var cb = Blockly.JavaScript.statementToCode(block, "cb");
  return "document.getElementById('" + id + "').addEventListener('" + etype + "',()=>{\n" + cb + "});\n";
};
Blockly.JavaScript["on_key"] = function (block) {
  var id = block.getFieldValue("id");
  var etype = block.getFieldValue("etype");
  var cb = Blockly.JavaScript.statementToCode(block, "cb");
  return "document.getElementById('" + id + "').addEventListener('" + etype + "',(e)=>{\n" + cb + "});\n";
};
Blockly.JavaScript["on_focus"] = function (block) {
  var id = block.getFieldValue("id");
  var etype = block.getFieldValue("etype");
  var cb = Blockly.JavaScript.statementToCode(block, "cb");
  return "document.getElementById('" + id + "').addEventListener('" + etype + "',()=>{\n" + cb + "});\n";
};

// 新增：定时器
Blockly.JavaScript["set_interval"] = function (block) {
  var ms = block.getFieldValue("ms");
  var cb = Blockly.JavaScript.statementToCode(block, "cb");
  var code = "setInterval(()=>{\n" + cb + "}, " + ms + ");\n";
  return code;
};
Blockly.JavaScript["set_timeout"] = function (block) {
  var ms = block.getFieldValue("ms");
  var cb = Blockly.JavaScript.statementToCode(block, "cb");
  var code = "setTimeout(()=>{\n" + cb + "}, " + ms + ");\n";
  return code;
};

// ========== 标题/段落/链接定位 ==========
Blockly.JavaScript["h1_xy"] = function (block) {
  var text_text = block.getFieldValue("text");
  var text_id = block.getFieldValue("id");
  var text_x = block.getFieldValue("x");
  var text_y = block.getFieldValue("y");
  var style = 'style="position: fixed; left: ' + text_x + '%; top: ' + text_y + '%;"';
  var code = '<h1 id="' + text_id + '" ' + style + ">" + text_text + "</h1>\n";
  return code;
};
Blockly.JavaScript["h2_xy"] = function (block) {
  var text_text = block.getFieldValue("text");
  var text_id = block.getFieldValue("id");
  var text_x = block.getFieldValue("x");
  var text_y = block.getFieldValue("y");
  var style = 'style="position: fixed; left: ' + text_x + '%; top: ' + text_y + '%;"';
  var code = '<h2 id="' + text_id + '" ' + style + ">" + text_text + "</h2>\n";
  return code;
};
Blockly.JavaScript["h3_xy"] = function (block) {
  var text_text = block.getFieldValue("text");
  var text_id = block.getFieldValue("id");
  var text_x = block.getFieldValue("x");
  var text_y = block.getFieldValue("y");
  var style = 'style="position: fixed; left: ' + text_x + '%; top: ' + text_y + '%;"';
  var code = '<h3 id="' + text_id + '" ' + style + ">" + text_text + "</h3>\n";
  return code;
};
Blockly.JavaScript["p_xy"] = function (block) {
  var text_text = block.getFieldValue("text");
  var text_id = block.getFieldValue("id");
  var text_x = block.getFieldValue("x");
  var text_y = block.getFieldValue("y");
  var style = 'style="position: fixed; left: ' + text_x + '%; top: ' + text_y + '%;"';
  var code = '<p id="' + text_id + '" ' + style + ">" + text_text + "</p>\n";
  return code;
};
Blockly.JavaScript["link_xy"] = function (block) {
  var text_text = block.getFieldValue("text");
  var text_link = block.getFieldValue("link");
  var text_x = block.getFieldValue("x");
  var text_y = block.getFieldValue("y");
  var text_id = block.getFieldValue("id");
  var style = 'style="position: fixed; left: ' + text_x + '%; top: ' + text_y + '%;"';
  var code = '<a href="' + text_link + '" ' + style + ' id="' + text_id + '">' + text_text + "</a>\n";
  return code;
};

// ========== 图片/按钮定位（已在上面实现） ==========

