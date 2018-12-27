export function addCookie(objName, objValue, objHours) { //添加cookie
  var str = objName + "=" + escape(objValue);
  if (objHours > 0) { //为0时不设定过期时间，浏览器关闭时cookie自动消失
    var date = new Date();
    var ms = objHours * 3600 * 1000;
    date.setTime(date.getTime() + ms);
    str += "; expires=" + date.toGMTString();
  }
  document.cookie = str;
}

export function getCookie(objName) { //获取指定名称的cookie的值
  var arrStr = document.cookie.split("; ");
  for (var i = 0; i < arrStr.length; i++) {
    var temp = arrStr[i].split("=");
    if (temp[0] == objName)
      return unescape(temp[1]);
  }
}

export function delCookie(name) { //为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间
  var date = new Date();
  date.setTime(date.getTime() - 10000);
  document.cookie = name + "=a; expires=" + date.toGMTString();
}



