var type = new Object();
var project = new Array();
initData(); //初始化数据

/** 界面加载完成后执行查询 */
window.onload = function () {
  query();
};

/** 获取参数的方法 **/
function GetRequest() {
  var url = location.search; //获取url中"?"符后的字串
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}

/** 获取项目名称 */
function getProject(index) {
  var i = parseInt(index);
  return project[i];
}

/** 获得类型明恒 */
function getType(name) {
  var n = String(name).toUpperCase();
  return type[n];
}

/** 获得整数 */
function getNumber(num) {
  return parseInt(num);
}

/** 获取当前时间 */
function getDateTime() {
  var date = new Date();

  return (
    date.getFullYear() +
    "年" +
    (date.getMonth()+1) +
    "月" +
    date.getDate() +
    "日 " +
    date.getHours() +
    "时" +
    date.getMinutes() +
    "分" +
    date.getSeconds() +
    "秒"
  );
}

/** 格式化数字 */
function prefixInteger(num, length) {
  return (Array(length).join("0") + num).slice(-length);
}

/** 显示警告信息 */
function showWarnning(text) {
  document.getElementById("main").innerHTML = [
    '<section class="ui-notice">',
    "	<i></i>",
    "	<h1>",
    String(text),
    "	</h1>",
    '	<div class="ui-notice-btn">',
    '		<button class="ui-btn-primary ui-btn-lg" onclick="window.history.back();">确定</button>',
    "	</div>",
    "</section>",
  ].join("");
}

/** 执行查询 */
function query() {
  var request = GetRequest();
  var c = request["c"];

  if (c != undefined && c.length == 7) {
    var t = c.substr(0, 2).toUpperCase();
    var p = c.substr(2, 2);
    var n = c.substr(4, 3);
  } else {
    var t =
      request["t"] == undefined ? "XH" : String(request["t"]).toUpperCase(); //省略时默认为循环卡
    var p = request["p"];
    var n = request["n"];
  }

  if (p == undefined || n == undefined) {
    return showWarnning("查询数据无效!");
  }

  var project = getProject(p);
  var type = getType(t);
  var code = t + "-" + prefixInteger(parseInt(p), 2) + prefixInteger(n, 3);
  if (project == undefined || type == undefined) {
    return showWarnning(
      "未能查到车辆通行证<br><br>编号：" + code + "<br><br>请联系制证人员核对"
    );
  }

  document.getElementById("type").innerText = type;
  document.getElementById("project").innerText = project;
  document.getElementById("num").innerText = code;
  document.getElementById("time").innerText = getDateTime().toString();
}

/** 初始化数据 */
function initData() {
	type["XH"] = "车辆循环卡";
	project[1] = "动力事业部";
	project[2] = "热轧事业部";
	project[3] = "特钢事业部";
	project[4] = "炼铁事业部";
	project[5] = project[3];
  }
