var request;

request = $.ajax({
    url: "https://coco.codemao.cn/http-widget-proxy/https@SEP@gitee.com/api/v5/repos/svipwing/woxy/commits?page=1&per_page=5",
    method: "GET",
    timeout: 2000,
    success: function (data) {
        var result = {};
        for (let item of data) {
            let message = item.commit.message;
            let author = item.commit.author.name;
            let date = item.commit.author.date;
            result[message] = {
                author: author,
                date: date
            };
        }

        let text = $("#history");
        for (let i in result) {
            let s = i.replace("\n", "").replace("[update]", "");
            if (s.includes("Signed-off-by:")) {
                s = s.split("Signed-off-by:")[0];
            }
            text.append(result[i].date.substring(0, 10) + " " + s + "<br><br>");
        }
    },
    error: function (jqXHR, textStatus, errorThrown) {
        if (textStatus === "timeout") {
            console.log("请求超时");
        } else {
            console.log("Error: " + textStatus + ", " + errorThrown);
        }
    }
});

setTimeout(function () {
    if (request) {
        request.abort();
        console.log("请求超时");
    }
}, 2000);

request = $.ajax({
    url: "https://coco.codemao.cn/http-widget-proxy/https@SEP@gitee.com/api/v5/repos/svipwing/woxy/tags?sort=updated&direction=asc&page=1&per_page=100",
    method: "GET",
    timeout: 2000,
    success: function (data) {
        let text = $("#version");
        text.text(data.reverse()[0]["name"]);
    },
    error: function (jqXHR, textStatus, errorThrown) {
        if (textStatus === "timeout") {
            console.log("请求超时");
        } else {
            console.log("Error: " + textStatus + ", " + errorThrown);
        }
    }
});

setTimeout(function () {
    if (request) {
        request.abort();
        console.log("请求超时");
    }
}, 2000);