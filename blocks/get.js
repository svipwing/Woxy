function fieldText(name, text, width) {
  return new Blockly.FieldTextInput(text || '', null, { spellcheck: false, width: width || 120 });
}
function fieldNumber(name, def, min, max, precision) {
  return new Blockly.FieldNumber(def != null ? def : 0, min, max, precision);
}
function fieldDropdown(options, def) {
  return new Blockly.FieldDropdown(options, undefined, def);
}

Blockly.Blocks['go'] = {
  init: function () {
    this.setColour('#28A370');
    this.appendDummyInput()
      .appendField("页面开始")
      .appendField("标题")
      .appendField(new Blockly.FieldTextInput("hello"), "title")
      .appendField("编码")
      .appendField(new Blockly.FieldDropdown([
        ["utf-8", "utf-8"],
        ["gbk", "gbk"],
        ["iso-8859-1", "iso-8859-1"]
      ]), "unicode");
    this.setTooltip("生成 <html><head> 等页面起始结构");
    this.setHelpUrl("");
    this.setPreviousStatement(false);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['end'] = {
  init: function () {
    this.setColour('#28A370');
    this.appendDummyInput()
      .appendField("页面结束");
    this.setTooltip("生成 </body></html> 结束标签");
    this.setPreviousStatement(true);
    this.setNextStatement(false);
  }
};

function defineHeading(type, label) {
  Blockly.Blocks[type] = {
    init: function () {
      this.setColour('#28A370');
      this.appendDummyInput()
        .appendField(label)
        .appendField("文本")
        .appendField(new Blockly.FieldTextInput("text"), "text")
        .appendField("id")
        .appendField(new Blockly.FieldTextInput("id"), "id");
      this.setTooltip(label + "（可设置 id）");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
    }
  };
}
defineHeading("h1", "一级标题");
defineHeading("h2", "二级标题");
defineHeading("h3", "三级标题");

Blockly.Blocks['p'] = {
  init: function () {
    this.setColour('#28A370');
    this.appendDummyInput()
      .appendField("段落")
      .appendField("文本")
      .appendField(new Blockly.FieldTextInput("text"), "text")
      .appendField("id")
      .appendField(new Blockly.FieldTextInput("id"), "id");
    this.setTooltip("普通段落文本");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['p_xy'] = {
  init: function () {
    this.setColour('#28A370');
    this.appendDummyInput()
      .appendField("段落(定位)")
      .appendField("文本")
      .appendField(new Blockly.FieldTextInput("text"), "text")
      .appendField("id")
      .appendField(new Blockly.FieldTextInput("id"), "id");
    this.appendDummyInput()
      .appendField("left(%)").appendField(new Blockly.FieldNumber(10, 0, 100, 1), "x")
      .appendField("top(%)").appendField(new Blockly.FieldNumber(10, 0, 100, 1), "y");
    this.setTooltip("固定定位段落（按百分比定位）");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['div'] = {
  init: function () {
    this.setColour('#28A370');
    this.appendDummyInput()
      .appendField("容器")
      .appendField("id")
      .appendField(new Blockly.FieldTextInput("id"), "id")
      .appendField("背景色")
      .appendField(new Blockly.FieldTextInput("white"), "color");
    this.appendStatementInput("html")
      .setCheck(null)
      .appendField("子内容");
    this.setTooltip("DIV 容器，可嵌套内容");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['div_xy'] = {
  init: function () {
    this.setColour('#28A370');
    this.appendDummyInput()
      .appendField("容器(定位)")
      .appendField("id")
      .appendField(new Blockly.FieldTextInput("id"), "id")
      .appendField("背景色")
      .appendField(new Blockly.FieldTextInput("white"), "color");
    this.appendDummyInput()
      .appendField("left(%)").appendField(new Blockly.FieldNumber(10, 0, 100, 1), "x")
      .appendField("top(%)").appendField(new Blockly.FieldNumber(10, 0, 100, 1), "y");
    this.appendStatementInput("html")
      .setCheck(null)
      .appendField("子内容");
    this.setTooltip("固定定位 DIV 容器（按百分比定位）");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

function defineInlineTag(type, label, tag) {
  Blockly.Blocks[type] = {
    init: function () {
        this.setColour('#5C69C7');
      this.appendDummyInput()
        .appendField(label)
        .appendField("文本")
        .appendField(new Blockly.FieldTextInput("text"), "text")
        .appendField("id")
        .appendField(new Blockly.FieldTextInput("id"), "id");
      this.setTooltip(label + "（行内标签 " + tag + "）");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
    }
  };
  Blockly.Blocks[type + "_xy"] = {
    init: function () {
      this.setColour('#28A370');
      this.appendDummyInput()
        .appendField(label + "(定位)")
        .appendField("文本")
        .appendField(new Blockly.FieldTextInput("text"), "text")
        .appendField("id")
        .appendField(new Blockly.FieldTextInput("id"), "id");
      this.appendDummyInput()
        .appendField("left(%)").appendField(new Blockly.FieldNumber(10, 0, 100, 1), "x")
        .appendField("top(%)").appendField(new Blockly.FieldNumber(10, 0, 100, 1), "y");
      this.setTooltip("固定定位 " + label + "（按百分比定位）");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
    }
  };
}
defineInlineTag("i", "斜体", "i");
defineInlineTag("u", "下划线", "u");
defineInlineTag("s", "删除线", "s");

Blockly.Blocks['table'] = {
  init: function () {
    this.setColour('#28A370');
    this.appendDummyInput()
      .appendField("表格")
      .appendField("id")
      .appendField(new Blockly.FieldTextInput("id"), "id");
    this.appendStatementInput("table")
      .setCheck(null)
      .appendField("内容");
    this.setTooltip("自定义标签 s-table");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['table_xy'] = {
  init: function () {
    this.setColour('#28A370');
    this.appendDummyInput()
      .appendField("表格(定位)")
      .appendField("id")
      .appendField(new Blockly.FieldTextInput("id"), "id");
    this.appendDummyInput()
      .appendField("left(%)").appendField(new Blockly.FieldNumber(10, 0, 100, 1), "x")
      .appendField("top(%)").appendField(new Blockly.FieldNumber(10, 0, 100, 1), "y");
    this.appendStatementInput("table")
      .setCheck(null)
      .appendField("内容 (thead/tbody)");
    this.setTooltip("固定定位 s-table");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['tr_head'] = {
  init: function () {
    this.setColour('#28A370');
    this.appendDummyInput()
      .appendField("表头行")
      .appendField("id")
      .appendField(new Blockly.FieldTextInput("id"), "id");
    this.appendStatementInput("tr")
      .setCheck(null)
      .appendField("单元格");
    this.setTooltip("表头行，内含 th");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['tr'] = {
  init: function () {
    this.setColour('#28A370');
    this.appendDummyInput()
      .appendField("表体行")
      .appendField("id")
      .appendField(new Blockly.FieldTextInput("id"), "id");
    this.appendStatementInput("tr")
      .setCheck(null)
      .appendField("单元格");
    this.setTooltip("表体行，内含 td");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['th'] = {
  init: function () {
    this.setColour('#28A370');
    this.appendDummyInput()
      .appendField("表头")
      .appendField("文本")
      .appendField(new Blockly.FieldTextInput("text"), "text")
      .appendField("id")
      .appendField(new Blockly.FieldTextInput("id"), "id");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['td'] = {
  init: function () {
    this.setColour('#28A370');
    this.appendDummyInput()
      .appendField("单元格")
      .appendField("文本")
      .appendField(new Blockly.FieldTextInput("text"), "text")
      .appendField("id")
      .appendField(new Blockly.FieldTextInput("id"), "id");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['ul'] = {
  init: function () {
    this.setColour('#28A370');
    this.appendDummyInput()
      .appendField("无序列表")
      .appendField("id")
      .appendField(new Blockly.FieldTextInput("id"), "id");
    this.appendStatementInput("li")
      .setCheck(null)
      .appendField("列表项");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['ul_xy'] = {
  init: function () {
    this.setColour('#28A370');
    this.appendDummyInput()
      .appendField("无序列表(定位)")
      .appendField("id")
      .appendField(new Blockly.FieldTextInput("id"), "id");
    this.appendDummyInput()
      .appendField("left(%)").appendField(new Blockly.FieldNumber(10, 0, 100, 1), "x")
      .appendField("top(%)").appendField(new Blockly.FieldNumber(10, 0, 100, 1), "y");
    this.appendStatementInput("li")
      .setCheck(null)
      .appendField("列表项");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['ol'] = {
  init: function () {
    this.setColour('#28A370');
    this.appendDummyInput()
      .appendField("有序列表")
      .appendField("id")
      .appendField(new Blockly.FieldTextInput("id"), "id");
    this.appendStatementInput("li")
      .setCheck(null)
      .appendField("列表项");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['ol_xy'] = {
  init: function () {
    this.setColour('#28A370');
    this.appendDummyInput()
      .appendField("有序列表(定位)")
      .appendField("id")
      .appendField(new Blockly.FieldTextInput("id"), "id");
    this.appendDummyInput()
      .appendField("left(%)").appendField(new Blockly.FieldNumber(10, 0, 100, 1), "x")
      .appendField("top(%)").appendField(new Blockly.FieldNumber(10, 0, 100, 1), "y");
    this.appendStatementInput("li")
      .setCheck(null)
      .appendField("列表项");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['li'] = {
  init: function () {
    this.setColour('#28A370');
    this.appendDummyInput()
      .appendField("列表项")
      .appendField("文本")
      .appendField(new Blockly.FieldTextInput("text"), "text")
      .appendField("id")
      .appendField(new Blockly.FieldTextInput("id"), "id");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['link'] = {
  init: function () {
    this.setColour('#28A370');
    this.appendDummyInput()
      .appendField("超链接")
      .appendField("文本")
      .appendField(new Blockly.FieldTextInput("百度"), "text")
      .appendField("连接")
      .appendField(new Blockly.FieldTextInput("https://baidu.com"), "link")
      .appendField("id")
      .appendField(new Blockly.FieldTextInput("id"), "id");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['link_xy'] = {
  init: function () {
    this.setColour('#28A370');
    this.appendDummyInput()
      .appendField("超链接(定位)")
      .appendField("文本")
      .appendField(new Blockly.FieldTextInput("百度"), "text")
      .appendField("href")
      .appendField(new Blockly.FieldTextInput("https://baidu.com"), "link")
      .appendField("id")
      .appendField(new Blockly.FieldTextInput("id"), "id");
    this.appendDummyInput()
      .appendField("left(%)").appendField(new Blockly.FieldNumber(10, 0, 100, 1), "x")
      .appendField("top(%)").appendField(new Blockly.FieldNumber(10, 0, 100, 1), "y");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['image'] = {
  init: function () {
    this.setColour('#e67e22');
    this.appendDummyInput()
      .appendField("图片")
      .appendField("链接")
      .appendField(new Blockly.FieldTextInput("a.png"), "img")
      .appendField("宽(px)")
      .appendField(new Blockly.FieldNumber(10, 0, 10000, 1), "width")
      .appendField("高(px)")
      .appendField(new Blockly.FieldNumber(10, 0, 10000, 1), "height")
      .appendField("id")
      .appendField(new Blockly.FieldTextInput("id"), "id");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['image_xy'] = {
  init: function () {
    this.setColour(15);
    this.appendDummyInput()
      .appendField("图片(定位)")
      .appendField("src")
      .appendField(new Blockly.FieldTextInput("a.png"), "img")
      .appendField("宽(px)")
      .appendField(new Blockly.FieldNumber(10, 0, 10000, 1), "width")
      .appendField("高(px)")
      .appendField(new Blockly.FieldNumber(10, 0, 10000, 1), "height")
      .appendField("id")
      .appendField(new Blockly.FieldTextInput("id"), "id");
    this.appendDummyInput()
      .appendField("left(%)").appendField(new Blockly.FieldNumber(10, 0, 100, 1), "x")
      .appendField("top(%)").appendField(new Blockly.FieldNumber(10, 0, 100, 1), "y");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['button'] = {
  init: function () {
    this.setColour('#e74c3c');
    this.appendDummyInput()
      .appendField("按钮")
      .appendField("文本")
      .appendField(new Blockly.FieldTextInput("按钮文本"), "text")
      .appendField("链接(可空)")
      .appendField(new Blockly.FieldTextInput(""), "link")
      .appendField("id")
      .appendField(new Blockly.FieldTextInput("id"), "id");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['button_xy'] = {
  init: function () {
    this.setColour(300);
    this.appendDummyInput()
      .appendField("按钮(定位)")
      .appendField("文本")
      .appendField(new Blockly.FieldTextInput("按钮文本"), "text")
      .appendField("链接(可空)")
      .appendField(new Blockly.FieldTextInput(""), "link")
      .appendField("id")
      .appendField(new Blockly.FieldTextInput("id"), "id");
    this.appendDummyInput()
      .appendField("left(%)").appendField(new Blockly.FieldNumber(10, 0, 100, 1), "x")
      .appendField("top(%)").appendField(new Blockly.FieldNumber(10, 0, 100, 1), "y");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['input'] = {
  init: function () {
    this.setColour(300);
    this.appendDummyInput()
      .appendField("输入框")
      .appendField("id").appendField(new Blockly.FieldTextInput("a"), "id")
      .appendField("类型")
      .appendField(new Blockly.FieldDropdown([
        ["文字", "text"], ["数字", "number"], ["密码", "password"], ["邮箱", "email"]
      ]), "type");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['input_xy'] = {
  init: function () {
    this.setColour(300);
    this.appendDummyInput()
      .appendField("输入框(定位)")
      .appendField("id").appendField(new Blockly.FieldTextInput("a"), "id")
      .appendField("类型")
      .appendField(new Blockly.FieldDropdown([
        ["text", "text"], ["number", "number"], ["password", "password"], ["email", "email"]
      ]), "type");
    this.appendDummyInput()
      .appendField("left(%)").appendField(new Blockly.FieldNumber(10, 0, 100, 1), "x")
      .appendField("top(%)").appendField(new Blockly.FieldNumber(10, 0, 100, 1), "y");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['line'] = {
  init: function () {
    this.setColour(10);
    this.appendDummyInput().appendField("水平线");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks['br'] = {
  init: function () {
    this.setColour(10);
    this.appendDummyInput().appendField("换行");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks['center_go'] = {
  init: function () {
    this.setColour(10);
    this.appendDummyInput().appendField("居中开始");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks['center_end'] = {
  init: function () {
    this.setColour(10);
    this.appendDummyInput().appendField("居中结束");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['menu'] = {
  init: function () {
    this.setColour(280);
    this.appendDummyInput()
      .appendField("弹出菜单")
      .appendField("id")
      .appendField(new Blockly.FieldTextInput("id"), "id");
    this.appendStatementInput("op").setCheck(null).appendField("内容");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks['menu_xy'] = {
  init: function () {
    this.setColour(280);
    this.appendDummyInput()
      .appendField("弹出菜单(定位)")
      .appendField("id")
      .appendField(new Blockly.FieldTextInput("id"), "id");
    this.appendDummyInput()
      .appendField("left(%)").appendField(new Blockly.FieldNumber(10, 0, 100, 1), "x")
      .appendField("top(%)").appendField(new Blockly.FieldNumber(10, 0, 100, 1), "y");
    this.appendStatementInput("op").setCheck(null).appendField("内容");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks['menu_button_main'] = {
  init: function () {
    this.setColour(280);
    this.appendDummyInput()
      .appendField("菜单主按钮")
      .appendField("文本")
      .appendField(new Blockly.FieldTextInput("text"), "text")
      .appendField("id")
      .appendField(new Blockly.FieldTextInput("id"), "id");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks['menu_button_minor'] = {
  init: function () {
    this.setColour(280);
    this.appendDummyInput()
      .appendField("菜单子按钮")
      .appendField("文本")
      .appendField(new Blockly.FieldTextInput("text"), "text")
      .appendField("id")
      .appendField(new Blockly.FieldTextInput("id"), "id");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks['menu_item'] = {
  init: function () {
    this.setColour(280);
    this.appendDummyInput()
      .appendField("菜单项")
      .appendField("文本")
      .appendField(new Blockly.FieldTextInput("text"), "text")
      .appendField("id")
      .appendField(new Blockly.FieldTextInput("id"), "id");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['style'] = {
  init: function () {
    this.setColour('#8e44ad');
    this.appendDummyInput()
      .appendField("样式 #id")
      .appendField(new Blockly.FieldTextInput("a"), "who");
    this.appendStatementInput("css").setCheck(null).appendField("属性");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks['style_hover'] = {
  init: function () {
    this.setColour(330);
    this.appendDummyInput()
      .appendField("样式(悬停) #id:hover")
      .appendField(new Blockly.FieldTextInput("a"), "who");
    this.appendStatementInput("css").setCheck(null).appendField("属性");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['display'] = {
  init: function () {
    this.setColour(330);
    this.appendDummyInput()
      .appendField("显示方式")
      .appendField(new Blockly.FieldDropdown([
        ["独占一行", "block"],
        ["可并排/灵活宽高", "inline-block"],
        ["可并排/无宽高", "inline"],
        ["弹性盒子", "flex"],
        ["网格布局", "grid"],
        ["消失隐藏", "none"]
      ]), "type");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks['flex_direction'] = {
  init: function () {
    this.setColour(330);
    this.appendDummyInput()
      .appendField("弹性盒排列方向")
      .appendField(new Blockly.FieldDropdown([
        ["从左到右", "row"], ["从右到左", "row-reverse"],
        ["从上到下", "column"], ["从下到上", "column-reverse"]
      ]), "zhuzou");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks['flex_justify_content'] = {
  init: function () {
    this.setColour(330);
    this.appendDummyInput()
      .appendField("弹性盒主轴对齐")
      .appendField(new Blockly.FieldDropdown([
        ["头对齐", "flex-start"], ["居中对齐", "center"], ["尾对齐", "flex-end"],
        ["两端分布", "space-between"], ["环绕分布", "space-around"], ["均匀分布", "space-evenly"]
      ]), "type");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks['flex_align_items'] = {
  init: function () {
    this.setColour(330);
    this.appendDummyInput()
      .appendField("弹性盒交叉轴对齐")
      .appendField(new Blockly.FieldDropdown([
        ["拉伸对齐", "stretch"], ["顶对齐", "flex-start"], ["居中对齐", "center"], ["底对齐", "flex-end"], ["基线对齐", "baseline"]
      ]), "type");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['text_color'] = {
  init: function () {
    this.setColour(330);
    this.appendDummyInput()
      .appendField("颜色")
      .appendField(new Blockly.FieldTextInput("red"), "color");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks['text_size'] = {
  init: function () {
    this.setColour(330);
    this.appendDummyInput()
      .appendField("字体大小(px)")
      .appendField(new Blockly.FieldNumber(14, 1, 300, 1), "size");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks['font_family'] = {
  init: function () {
    this.setColour(330);
    this.appendDummyInput()
      .appendField("字体列表")
      .appendField(new Blockly.FieldTextInput("Arial, Helvetica, sans-serif"), "family");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks['overflow'] = {
  init: function () {
    this.setColour(330);
    this.appendDummyInput()
      .appendField("溢出处理")
      .appendField(new Blockly.FieldDropdown([
        ["显示溢出部分", "visible"], ["隐藏溢出部分", "hidden"], ["强制滚动查看", "scroll"], ["溢出时用滚动条", "auto"]
      ]), "type");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks['radius'] = {
  init: function () {
    this.setColour(330);
    this.appendDummyInput()
      .appendField("圆角(px)")
      .appendField(new Blockly.FieldNumber(10, 0, 300, 1), "r");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks['shadow'] = {
  init: function () {
    this.setColour(330);
    this.appendDummyInput()
      .appendField("盒子阴影 x偏移").appendField(new Blockly.FieldNumber(0, -1000, 1000, 1), "x")
      .appendField("y 偏移").appendField(new Blockly.FieldNumber(0, -1000, 1000, 1), "y")
      .appendField("模糊程度").appendField(new Blockly.FieldNumber(10, 0, 1000, 1), "m")
      .appendField("阴影颜色").appendField(new Blockly.FieldTextInput("rgba(0,0,0,.2)"), "c");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks['bg_color'] = {
  init: function () {
    this.setColour(330);
    this.appendDummyInput()
      .appendField("背景颜色")
      .appendField(new Blockly.FieldTextInput("red"), "color");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks['css_width'] = {
  init: function () {
    this.setColour(330);
    this.appendDummyInput()
      .appendField("宽度(px)")
      .appendField(new Blockly.FieldNumber(100, 0, 100000, 1), "width");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks['css_height'] = {
  init: function () {
    this.setColour(330);
    this.appendDummyInput()
      .appendField("高度(px)")
      .appendField(new Blockly.FieldNumber(30, 0, 100000, 1), "height");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks['z-index'] = {
  init: function () {
    this.setColour(330);
    this.appendDummyInput()
      .appendField("显示优先级")
      .appendField(new Blockly.FieldNumber(10, -9999, 9999, 1), "c");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks['margin'] = {
  init: function () {
    this.setColour(330);
    this.appendDummyInput()
      .appendField("外部边缘距离")
      .appendField(new Blockly.FieldTextInput("8px"), "value");
    this.setTooltip("支持类似：8px / 8px 16px / 8px 16px 8px 16px");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks['padding'] = {
  init: function () {
    this.setColour(330);
    this.appendDummyInput()
      .appendField("内部边缘距离")
      .appendField(new Blockly.FieldTextInput("8px"), "value");
    this.setTooltip("支持类似：8px / 8px 16px / 8px 16px 8px 16px");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks['border'] = {
  init: function () {
    this.setColour(330);
    this.appendDummyInput()
      .appendField("边缘")
      .appendField(new Blockly.FieldTextInput("1px solid #ccc"), "value");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks['position'] = {
  init: function () {
    this.setColour(330);
    this.appendDummyInput()
      .appendField("定位方式")
      .appendField(new Blockly.FieldDropdown([
        ["静态", "static"],
        ["相对", "relative"],
        ["绝对", "absolute"],
        ["固定/浮动", "fixed"],
        ["粘性", "sticky"]
      ]), "mode");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['js'] = {
  init: function () {
    this.setColour('#2ecc71');
    this.appendDummyInput().appendField("脚本");
    this.appendStatementInput("js").setCheck(null).appendField("代码");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks['alert'] = {
  init: function () {
    this.setColour('#28A370');
    this.appendValueInput("text").setCheck(null).appendField("弹窗");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks['console_log'] = {
  init: function () {
    this.setColour(120);
    this.appendValueInput("text").setCheck(null).appendField("控制台输出");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks['changestyle'] = {
  init: function () {
    this.setColour(120);
    this.appendDummyInput()
      .appendField("修改元素样式/内容")
      .appendField("id").appendField(new Blockly.FieldTextInput("a"), "id")
      .appendField("属性")
      .appendField(new Blockly.FieldDropdown([
        ["颜色", "color"], ["背景颜色", "backgroundColor"], ["宽度", "width"],
        ["高度", "height"], ["显示方式", "display"], ["内容", "innerHTML"]
      ]), "type")
      .appendField("值")
      .appendField(new Blockly.FieldTextInput("10"), "value");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks['change_div_html'] = {
  init: function () {
    this.setColour(120);
    this.appendDummyInput()
      .appendField("设置元素内容")
      .appendField("id").appendField(new Blockly.FieldTextInput("a"), "id");
    this.appendStatementInput("html").setCheck(null).appendField("内容");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks['click'] = {
  init: function () {
    this.setColour(120);
    this.appendDummyInput()
      .appendField("监听事件")
      .appendField("id").appendField(new Blockly.FieldTextInput("a"), "id")
      .appendField("类型")
      .appendField(new Blockly.FieldDropdown([
        ["点击", "click"],
        ["双击", "dblclick"],
        ["鼠标移入", "mouseenter"],
        ["鼠标移出", "mouseleave"]
      ]), "type");
    this.appendStatementInput("js").setCheck(null).appendField("回调");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks['dom_get_value'] = {
  init: function () {
    this.setColour(120);
    this.appendDummyInput()
      .appendField("获取输入框值")
      .appendField("id")
      .appendField(new Blockly.FieldTextInput("a"), "id");
    this.setOutput(true, null);
  }
};
Blockly.Blocks['button_onclick'] = {
  init: function () {
    this.setColour(120);
    this.appendDummyInput()
      .appendField("按钮被点击")
      .appendField("id").appendField(new Blockly.FieldTextInput("a"), "id");
    this.appendStatementInput("onclick").setCheck(null).appendField("回调");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks['to_num'] = {
  init: function () {
    this.setColour(120);
    this.appendValueInput("NAME").setCheck(null).appendField("转数字(");
    this.appendDummyInput().appendField(")");
    this.setOutput(true, null);
  }
};

Blockly.Blocks['on_input'] = {
  init: function () {
    this.setColour(120);
    this.appendDummyInput()
      .appendField("输入框事件")
      .appendField("id").appendField(new Blockly.FieldTextInput("a"), "id")
      .appendField("类型")
      .appendField(new Blockly.FieldDropdown([["输入", "input"], ["修改", "change"]]), "etype");
    this.appendStatementInput("cb").setCheck(null).appendField("回调");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks['on_key'] = {
  init: function () {
    this.setColour(120);
    this.appendDummyInput()
      .appendField("键盘事件")
      .appendField("id").appendField(new Blockly.FieldTextInput("a"), "id")
      .appendField("类型")
      .appendField(new Blockly.FieldDropdown([["键盘按下", "keydown"], ["键盘松开", "keyup"]]), "etype");
    this.appendStatementInput("cb").setCheck(null).appendField("回调");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks['on_focus'] = {
  init: function () {
    this.setColour(120);
    this.appendDummyInput()
      .appendField("焦点事件")
      .appendField("id").appendField(new Blockly.FieldTextInput("a"), "id")
      .appendField("类型")
      .appendField(new Blockly.FieldDropdown([["获得焦点", "focus"], ["失去焦点", "blur"]]), "etype");
    this.appendStatementInput("cb").setCheck(null).appendField("回调");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['set_interval'] = {
  init: function () {
    this.setColour(120);
    this.appendDummyInput()
      .appendField("循环执行")
      .appendField("间隔(ms)")
      .appendField(new Blockly.FieldNumber(1000, 1, 1e8, 1), "ms");
    this.appendStatementInput("cb").setCheck(null).appendField("回调");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks['set_timeout'] = {
  init: function () {
    this.setColour(120);
    this.appendDummyInput()
      .appendField("延时执行")
      .appendField("延时(ms)")
      .appendField(new Blockly.FieldNumber(1000, 1, 1e8, 1), "ms");
    this.appendStatementInput("cb").setCheck(null).appendField("回调");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};