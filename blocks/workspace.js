const theme1 = Blockly.Theme.defineTheme('dark', {
    base: Blockly.Themes.Zelos,
    componentStyles: {
        workspaceBackgroundColour: "#1f1f1f",
        toolboxBackgroundColour: "#c2c2c2"
    },
    name: "dark"
});

if($.cookie("theme")=="#494949"){
    themename = "dark";
}else{
    themename = "zelos";
}

var options = {
    toolbox: document.getElementById("toolbox"),
    collapse: true,
    comments: true,
    disable: false,
    maxBlocks: Infinity,
    trashcan: true,
    horizontalLayout: false,
    toolboxPosition: "start",
    css: true,
    media: "./media/",
    rtl: false,
    scrollbars: true,
    sounds: true,
    oneBasedIndex: true,
    zoom: {
        controls: true, wheel: true,
    },
    theme: themename,
    renderer: "codemao",
};
var blocklyDiv = document.getElementById("blocklyDiv");
var workspace = Blockly.inject(blocklyDiv, options);
var workspaceBlocks = document.getElementById("workspaceBlocks");
Blockly.Xml.domToWorkspace(workspaceBlocks, workspace);

y = true;

var lastcode=" ";

async function myUpdateFunction(_event) {
    var code = Blockly.JavaScript.workspaceToCode(workspace);

    if (code.split('\n')[0].indexOf("var") !== -1) {
        if (code.indexOf("</title>") !== -1) {
            lines = code.split('\n');
            lines[0] = "\n<script>\n" + lines[0] + "\n</script>\n";
            lines.splice(lines.indexOf("</head>") - 1, 0, lines.shift());
            lines.splice(0, 2);
            code = lines.join('\n');
        } else {
            lines = code.split('\n');
            lines[0] = "<script>\n" + lines[0] + "\n</script>";
            code = lines.join('\n');
        }
    }

    if (code.indexOf("MC不灭") !== -1 && y) {
        y = false;
        if (confirm("恭喜你找到了彩蛋！")) {
            window.open("mc.html");
        }
    }

    code = await prettier.format(code, {
        parser: "html",
        plugins: prettierPlugins,
    })

    document.getElementById("code").textContent = code;

    if(lastcode != code.replace("\n","").replace(/(\n|\r|\r\n|↵)/g, '')){
        document.getElementById("look_html").srcdoc = code;
        lastcode = code.replace("\n","").replace(/(\n|\r|\r\n|↵)/g, '');
    }

    Prism.highlightAll();
}

workspace.addChangeListener(myUpdateFunction);

document.addEventListener("resize", function () {
    Blockly.svgResize(workspace);
})