Blockly.JavaScript.ORDER_ATOMIC = 99;

Blockly.JavaScript["h1"] = function (block) {
    var text_text = block.getFieldValue("text");
    var text_color = block.getFieldValue("color");
    var text_id = block.getFieldValue("id");

    var code =
        '<h1 id="' +
        text_id +
        '">' +
        text_text +
        "</h1>\n";
    return code;
};
Blockly.JavaScript["h2"] = function (block) {
    var text_text = block.getFieldValue("text");
    var text_color = block.getFieldValue("color");
    var text_id = block.getFieldValue("id");

    var code =
        '<h2 id="' +
        text_id +
        '">' +
        text_text +
        "</h2>\n";
    return code;
};

Blockly.JavaScript["h3"] = function (block) {
    var text_text = block.getFieldValue("text");
    var text_color = block.getFieldValue("color");
    var text_id = block.getFieldValue("id");

    var code =
        '<h3 id="' +
        text_id +
        '">' +
        text_text +
        "</h3>\n";
    return code;
};

Blockly.JavaScript["go"] = function (block) {
    var text_title = block.getFieldValue("title");
    var dropdown_unicode = block.getFieldValue("unicode");
    var code =
        '<html>\n<head>\n<script src="https://static.codemao.cn/pickduck/Sk6ZKOYoR.js?hash=FvdCzpDmExIP2wPGUy13G5i3NEfy"></script><meta http-equiv="Content-Type" content="text/html; charset=' +
        dropdown_unicode +
        '">\n<title>' +
        text_title +
        "</title>\n</head>\n<body>\n";
    return code;
};

Blockly.JavaScript["end"] = function (block) {

    var code = "</body>\n</html>\n";
    return code;
};

Blockly.JavaScript["p"] = function (block) {
    var text_text = block.getFieldValue("text");
    var text_color = block.getFieldValue("color");
    var text_id = block.getFieldValue("id");

    var code =
        '<p id="' +
        text_id +
        '">' +
        text_text +
        "</p>\n";
    return code;
};
Blockly.JavaScript["div"] = function (block) {
    var statements_html = Blockly.JavaScript.statementToCode(block, "html");
    // var text_text = block.getFieldValue("text");
    var text_color = block.getFieldValue("color");
    var text_id = block.getFieldValue("id");

    var code = '<div id="' + text_id + '" style="background-color: ' + text_color + '">' + statements_html + '</div>'
    return code;
};
Blockly.JavaScript["div_xy"] = function (block) {
    var statements_html = Blockly.JavaScript.statementToCode(block, "html");
    // var text_text = block.getFieldValue("text");
    var text_color = block.getFieldValue("color");
    var text_id = block.getFieldValue("id");
    var text_x = block.getFieldValue("x");
    var text_y = block.getFieldValue("y");

    var code = '<div id="' + text_id + '" style="position: fixed; background-color: ' + text_color + 'top:' + text_y + '%;' + 'left:' + text_x + '%;">' + statements_html + '</div>'
    return code;
};
Blockly.JavaScript["i"] = function (block) {
    var text_text = block.getFieldValue("text");
    var text_id = block.getFieldValue("id");

    var code = '<i id="' + text_id + '">' + text_text + '</i>'
    return code;
};

Blockly.JavaScript["i_xy"] = function (block) {
    var text_text = block.getFieldValue("text");
    var text_id = block.getFieldValue("id");
    var text_x = block.getFieldValue("x");
    var text_y = block.getFieldValue("y");

    var code = '<i id="' + text_id + '" style="position: fixed; ' + 'top:' + text_y + '%;' + 'left:' + text_x + '%;">' + text_text + '</i>'
    return code;
};

Blockly.JavaScript["u"] = function (block) {
    var text_text = block.getFieldValue("text");
    var text_id = block.getFieldValue("id");

    var code = '<u id="' + text_id + '">' + text_text + '</u>'
    return code;
};

Blockly.JavaScript["u_xy"] = function (block) {
    var text_text = block.getFieldValue("text");
    var text_id = block.getFieldValue("id");
    var text_x = block.getFieldValue("x");
    var text_y = block.getFieldValue("y");

    var code = '<u id="' + text_id + '" style="position: fixed; ' + 'top:' + text_y + '%;' + 'left:' + text_x + '%;">' + text_text + '</u>'
    return code;
};

Blockly.JavaScript["s"] = function (block) {
    var text_text = block.getFieldValue("text");
    var text_id = block.getFieldValue("id");

    var code = '<s id="' + text_id + '">' + text_text + '</s>'
    return code;
};

Blockly.JavaScript["s_xy"] = function (block) {
    var text_text = block.getFieldValue("text");
    var text_id = block.getFieldValue("id");
    var text_x = block.getFieldValue("x");
    var text_y = block.getFieldValue("y");

    var code = '<s id="' + text_id + '" style="position: fixed; ' + 'top:' + text_y + '%;' + 'left:' + text_x + '%;">' + text_text + '</s>'
    return code;
};
Blockly.JavaScript["table"] = function (block) {
    var statements_table = Blockly.JavaScript.statementToCode(block, "table");
    var text_id = block.getFieldValue("id");

    var code = '<s-table id="' + text_id + '">' + statements_table + '</s-table>'
    return code;
};

Blockly.JavaScript["table_xy"] = function (block) {
    var statements_table = Blockly.JavaScript.statementToCode(block, "table");
    var text_id = block.getFieldValue("id");
    var text_x = block.getFieldValue("x");
    var text_y = block.getFieldValue("y");

    var code = '<s-table id="' + text_id + '"style="position: fixed; ' + 'top:' + text_y + '%;' + 'left:' + text_x + '%;">' + statements_table + '</s-table>'
    return code;
};

Blockly.JavaScript["tr_head"] = function (block) {
    var statements_tr = Blockly.JavaScript.statementToCode(block, "tr");
    var text_id = block.getFieldValue("id");

    var code = ' <s-thead><s-tr id="' + text_id + '">' + statements_tr + '</s-tr> </s-thead>\n'
    return code;
};
Blockly.JavaScript["tr"] = function (block) {
    var statements_tr = Blockly.JavaScript.statementToCode(block, "tr");
    var text_id = block.getFieldValue("id");

    var code = ' <s-tbody><s-tr id="' + text_id + '">' + statements_tr + '</s-tr></s-tbody>\n'
    return code;
};

Blockly.JavaScript["th"] = function (block) {
    var text_text = block.getFieldValue("text");
    var text_id = block.getFieldValue("id");

    var code = '<s-th id="' + text_id + '">' + text_text + '</s-th>\n'
    return code;
};

Blockly.JavaScript["td"] = function (block) {
    var text_text = block.getFieldValue("text");
    var text_id = block.getFieldValue("id");

    var code = '<s-td id="' + text_id + '">' + text_text + '</s-td>\n'
    return code;
};




Blockly.JavaScript["menu"] = function (block) {
    var statements_op = Blockly.JavaScript.statementToCode(block, "op");
    var text_id = block.getFieldValue("id");


    var code = '<s-popup-menu id="' + text_id + '">' + statements_op + '</s-popup-menu>\n'
    return code;
};


Blockly.JavaScript["menu_xy"] = function (block) {
    var statements_op = Blockly.JavaScript.statementToCode(block, "op");
    var text_id = block.getFieldValue("id");
    var text_x = block.getFieldValue("x");
    var text_y = block.getFieldValue("y");

    var code = '<s-popup-menu id="' + text_id + '"style="position: fixed; ' + 'top:' + text_y + '%;' + 'left:' + text_x + '%;">' + statements_op + '</s-popup-menu>\n'
    return code;
};

Blockly.JavaScript["menu_button_main"] = function (block) {
    var text_text = block.getFieldValue("text");
    var text_id = block.getFieldValue("id");

    var code = ' <s-button slot="trigger" id="' + text_id + '">' + text_text + ' </s-button>\n'
    return code;
};

Blockly.JavaScript["menu_button_minor"] = function (block) {
    var text_text = block.getFieldValue("text");
    var text_id = block.getFieldValue("id");

    var code = '<s-popup-menu-item id="' + text_id + '" slot="trigger">' + text_text + ' <s-icon slot="end" type="arrow_drop_right"></s-icon></s-popup-menu-item>\n '
    return code;
};

Blockly.JavaScript["menu_item"] = function (block) {
    var text_text = block.getFieldValue("text");
    var text_id = block.getFieldValue("id");

    var code = ' <s-popup-menu-item id="' + text_id + '">' + text_text + ' </s-popup-menu-item>\n'
    return code;
};

Blockly.JavaScript["ul"] = function (block) {
    var statements_li = Blockly.JavaScript.statementToCode(block, "li");
    var text_id = block.getFieldValue("id");

    var code = '<ul id="' + text_id + '">' + statements_li + '</ul>\n'
    return code;
};

Blockly.JavaScript["ul_xy"] = function (block) {
    var statements_li = Blockly.JavaScript.statementToCode(block, "li");
    var text_id = block.getFieldValue("id");
    var text_x = block.getFieldValue("x");
    var text_y = block.getFieldValue("y");

    var code = '<ul id="' + text_id + '"style="position: fixed; ' + 'top:' + text_y + '%;' + 'left:' + text_x + '%;">' + statements_li + '</ul>\n'
    return code;
};

Blockly.JavaScript["ol"] = function (block) {
    var statements_li = Blockly.JavaScript.statementToCode(block, "li");
    var text_id = block.getFieldValue("id");

    var code = '<ol id="' + text_id + '">' + statements_li + '</ol>\n'
    return code;
};

Blockly.JavaScript["ol_xy"] = function (block) {
    var statements_li = Blockly.JavaScript.statementToCode(block, "li");
    var text_id = block.getFieldValue("id");
    var text_x = block.getFieldValue("x");
    var text_y = block.getFieldValue("y");

    var code = '<ol id="' + text_id + '"style="position: fixed; ' + 'top:' + text_y + '%;' + 'left:' + text_x + '%;">' + statements_li + '</ol>\n'
    return code;
};


Blockly.JavaScript["li"] = function (block) {
    var text_text = block.getFieldValue("text");
    var text_id = block.getFieldValue("id");

    var code = ' <li id="' + text_id + '">' + text_text + ' </li>\n'
    return code;
};

Blockly.JavaScript["code"] = function (block) {
    var text_code_txt = block.getFieldValue("code_txt");

    var code = text_code_txt + "\n";
    return code;
};

Blockly.JavaScript["style"] = function (block) {
    var text_who = block.getFieldValue("who");
    var statements_css = Blockly.JavaScript.statementToCode(block, "css");

    var code = "<style>\n#" + text_who + "{\n" + statements_css + "}\n</style>\n";
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
    // var statements_css = Blockly.JavaScript.statementToCode(block, "css");
    var code = 'display: ' + text_type + ';\n';
    return code;
};

Blockly.JavaScript["flex_justify_content"] = function (block) {
    var text_type = block.getFieldValue("type");
    // var statements_css = Blockly.JavaScript.statementToCode(block, "css");
    var code = 'justify-content: ' + text_type + ';\n';
    return code;
};

Blockly.JavaScript["flex_direction"] = function (block) {
    var text_zhuzou = block.getFieldValue("zhuzou");
    // var statements_css = Blockly.JavaScript.statementToCode(block, "css");
    var code = 'flex-direction: ' + text_zhuzou + ';\n';
    return code;
};

Blockly.JavaScript["flex_align_items"] = function (block) {
    var text_type = block.getFieldValue("type");
    // var statements_css = Blockly.JavaScript.statementToCode(block, "css");
    var code = 'align-items: ' + text_type + ';\n';
    return code;
};

Blockly.JavaScript["text_color"] = function (block) {
    var text_color = block.getFieldValue("color");

    var code = "color:" + text_color + ";\n";
    return code;
};

Blockly.JavaScript['text_size'] = function (block) {
    var text_size = block.getFieldValue('size');

    var code = 'font-size:' + text_size + 'px;\n';
    return code;
};

Blockly.JavaScript['overflow'] = function (block) {
    var text_type = block.getFieldValue('type');
    var code = 'overflow:' + text_type + ' ;\n';
    return code;
};


Blockly.JavaScript['js'] = function (block) {
    var statements_js = Blockly.JavaScript.statementToCode(block, 'js');

    var code = '<script>\n' + statements_js + '</script>\n';
    return code;
};

Blockly.JavaScript['alert'] = function (block) {
    var value_text = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC);

    var code = 'alert(' + value_text + ');\n';
    return code;
};

Blockly.JavaScript['changestyle'] = function (block) {
    var text_id = block.getFieldValue('id');
    var text_type = block.getFieldValue('type');
    var text_value = block.getFieldValue('value');
    if (text_type == 'innerHTML') {
        var code = 'document.getElementById(\'' + text_id + '\').innerHTML=\'' + text_value + '\';\n';
    }
    else {
        var code = 'document.getElementById(\'' + text_id + '\').style.' + text_type + '=\'' + text_value + '\';\n';
    }
    return code;
};


Blockly.JavaScript['change_div_html'] = function (block) {
    var text_id = block.getFieldValue('id');
    var statements_html = Blockly.JavaScript.statementToCode(block, "html");
    var code = `document.getElementById('${text_id}').innerHTML=\`${statements_html}\`;\n`
    return code;
};

Blockly.JavaScript['click'] = function (block) {
    var text_id = block.getFieldValue('id');
    var statements_js = Blockly.JavaScript.statementToCode(block, "js");
    var dropdown_type = block.getFieldValue("type");
    var code = `document.getElementById('${text_id}').addEventListener('${dropdown_type}',()=>{\n${statements_js}})\n`
    return code;
};

Blockly.JavaScript['line'] = function (block) {

    var code = '<hr />\n';
    return code;
};

Blockly.JavaScript['center_go'] = function (block) {

    var code = '<center>\n';
    return code;
};

Blockly.JavaScript['center_end'] = function (block) {

    var code = '</center>\n';
    return code;
};

Blockly.JavaScript['link'] = function (block) {
    var text_text = block.getFieldValue('text');
    var text_link = block.getFieldValue('link');
    var text_id = block.getFieldValue("id");

    var code = '<a href="' + text_link + '" id="' + text_id + '">' + text_text + '</a>\n';
    return code;
};

Blockly.JavaScript['image'] = function (block) {
    var text_img = block.getFieldValue('img');
    var text_height = block.getFieldValue('height');
    var text_width = block.getFieldValue('width');
    var text_id = block.getFieldValue("id");

    var code = '<img src="' + text_img + '" width="' + text_width + 'px" height="' + text_height + `px" id="${text_id}" />\n`;
    return code;
};

Blockly.JavaScript['button'] = function (block) {
    var text_text = block.getFieldValue('text');
    var text_link = block.getFieldValue('link');
    var text_id = block.getFieldValue("id");

    var code = "";

    if (text_link == '') {
        code = '<a' + ` id="${text_id}">\n<button>` + text_text + '</button>\n</a>\n';
    } else {
        code = '<a href="' + text_link + `" id="${text_id}">\n<button>` + text_text + '</button>\n</a>\n';
    }

    return code;
};

Blockly.JavaScript['dom_get_value'] = function (block) {
    var text_id = block.getFieldValue('id');

    var code = 'document.getElementById("' + text_id + '").value';
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['input'] = function (block) {
    var text_id = block.getFieldValue('id');
    var dropdown_type = block.getFieldValue('type');

    var code = '<input type="' + dropdown_type + '" id="' + text_id + '" />\n';
    return code;
};

Blockly.JavaScript['button_onclick'] = function (block) {
    var text_id = block.getFieldValue('id');
    var statements_onclick = Blockly.JavaScript.statementToCode(block, 'onclick');

    var code = 'document.getElementById("' + text_id + '").onclick=function(){\n' + statements_onclick + '\n};\n';
    return code;
};

Blockly.JavaScript['radius'] = function (block) {
    var text_r = block.getFieldValue('r');

    var code = 'border-radius: ' + text_r + 'px;\n';
    return code;
};
Blockly.JavaScript['shadow'] = function (block) {
    var text_x = block.getFieldValue('x');
    var text_y = block.getFieldValue('y');
    var text_m = block.getFieldValue('m');
    var text_c = block.getFieldValue('c');

    var code = 'box-shadow: ' + text_x + 'px ' + text_y + 'px ' + text_m + 'px ' + text_c + '\n';
    return code;
};
Blockly.JavaScript['bg_color'] = function (block) {
    var text_color = block.getFieldValue('color');

    var code = 'background-color: ' + text_color + ';\n';
    return code;
};

Blockly.JavaScript['css_width'] = function (block) {
    var text_width = block.getFieldValue('width');

    var code = 'width: ' + text_width + 'px;\n';
    return code;
};

Blockly.JavaScript['css_height'] = function (block) {
    var text_height = block.getFieldValue('height');

    var code = 'height: ' + text_height + 'px;\n';
    return code;
};

Blockly.JavaScript['z-index'] = function (block) {
    var text_c = block.getFieldValue('c');

    var code = 'z-index: ' + text_c + ';\n';
    return code;
};

Blockly.JavaScript['br'] = function (block) {

    var code = '<br>\n';
    return code;
};

Blockly.JavaScript['h1_xy'] = function (block) {
    var text_text = block.getFieldValue('text');
    var text_id = block.getFieldValue('id');
    var text_x = block.getFieldValue('x');
    var text_y = block.getFieldValue('y');

    var code =
        '<h1 id="' +
        text_id +
        '" style="position: fixed; left: ' +
        text_x + '%; top: ' +
        text_y +
        '%;">' +
        text_text +
        "</h1>\n";
    return code;
};

Blockly.JavaScript['h2_xy'] = function (block) {
    var text_text = block.getFieldValue('text');
    var text_id = block.getFieldValue('id');
    var text_x = block.getFieldValue('x');
    var text_y = block.getFieldValue('y');

    var code =
        '<h2 id="' +
        text_id +
        '" style="position: fixed; left: ' +
        text_x + '%; top: ' +
        text_y +
        '%;">' +
        text_text +
        "</h2>";
    return code;
};


Blockly.JavaScript['h3_xy'] = function (block) {
    var text_text = block.getFieldValue('text');
    var text_id = block.getFieldValue('id');
    var text_x = block.getFieldValue('x');
    var text_y = block.getFieldValue('y');

    var code =
        '<h3 id="' +
        text_id +
        '" style="position: fixed; left: ' +
        text_x + '%; top: ' +
        text_y +
        '%;">' +
        text_text +
        "</h3>";
    return code;
};

Blockly.JavaScript["p_xy"] = function (block) {
    var text_text = block.getFieldValue("text");
    var text_id = block.getFieldValue("id");
    var text_x = block.getFieldValue("x");
    var text_y = block.getFieldValue("y");

    var code =
        '<p id="' +
        text_id +
        '" style="position: fixed; left: ' +
        text_x + '%; top: ' +
        text_y +
        '%;">' +
        text_text +
        "</p>\n";
    return code;
};

Blockly.JavaScript['link_xy'] = function (block) {
    var text_text = block.getFieldValue('text');
    var text_link = block.getFieldValue('link');
    var text_x = block.getFieldValue('x');
    var text_y = block.getFieldValue('y');
    var text_id = block.getFieldValue('id');

    var code = '<a href="' + text_link +
        '" style="position: fixed; left: ' +
        text_x + '%; top: ' +
        text_y +
        `%;" id="${text_id}">` + text_text + '</a>\n';
    return code;
};

Blockly.JavaScript['image_xy'] = function (block) {
    var text_img = block.getFieldValue('img');
    var text_height = block.getFieldValue('height');
    var text_width = block.getFieldValue('width');
    var text_x = block.getFieldValue('x');
    var text_y = block.getFieldValue('y');
    var text_id = block.getFieldValue('id');

    var code = '<img src="' + text_img + '" width="' + text_width + 'px" height="' + text_height + 'px" ' +
        ' style="position: fixed; left: ' +
        text_x + '%; top: ' +
        text_y +
        `%;" id="${text_id}" />\n`;
    return code;
};

Blockly.JavaScript['button_xy'] = function (block) {
    var text_text = block.getFieldValue('text');
    var text_link = block.getFieldValue('link');
    var text_x = block.getFieldValue('x');
    var text_y = block.getFieldValue('y');
    var text_id = block.getFieldValue('id');

    var code = "";

    if (text_link == '') {
        code = '<a' +
            ' style="position: fixed; left: ' +
            text_x + '%; top: ' +
            text_y +
            `%;" id="${text_id}">` + '\n<button>' + text_text + '</button>\n</a>\n';
    } else {
        code = '<a href="' + text_link + '"' +
            ' style="position: fixed; left: ' +
            text_x + '%; top: ' +
            text_y +
            `%;" id="${text_id}">` + '\n<button>' + text_text + '</button>\n</a>\n';
    }

    return code;
};

Blockly.JavaScript['input_xy'] = function (block) {
    var text_id = block.getFieldValue('id');
    var dropdown_type = block.getFieldValue('type');
    var text_x = block.getFieldValue('x');
    var text_y = block.getFieldValue('y');

    var code = '<input type="' + dropdown_type + '" id="' + text_id + '" ' +
        ' style="position: fixed; left: ' +
        text_x + '%; top: ' + text_y +
        '%;" />\n';

    return code;
};

Blockly.JavaScript['to_num'] = function (block) {
    var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);

    var code = `Number(${value_name})`;

    return [code, Blockly.JavaScript.ORDER_NONE];
};