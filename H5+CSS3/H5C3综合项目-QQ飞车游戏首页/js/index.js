window.addEventListener("load", function () {
  //轮播图
  //    1、获取元素
  var leftbtn = document.querySelector(".banner_bootom_leftbtn");
  var rightbtn = document.querySelector(".banner_bootom_rightbtn");
  var banner = document.querySelector(".banner_list");
  var bannerWidth = banner.offsetWidth;

  //2鼠标经过显示左右按钮
  banner.addEventListener("mouseenter", function () {
    leftbtn.style.display = "block";
    rightbtn.style.display = "block";
    //鼠标放上时停止自动
    clearInterval(timer);
    timer=null;
  });
  banner.addEventListener("mouseleave", function () {
    leftbtn.style.display = "none";
    rightbtn.style.display = "none";
    //鼠标离开启动自动
    timer=setInterval(function(){
      rightbtn.click();
    },2000)
  });
  //3动态生成小圆圈 有几张图片生成几个圆圈
  var ul = banner.querySelector(".banner_list_ul");
  var ol = banner.querySelector(".banner_bottomzhezhao_ul");
  for (var i = 0; i < ul.children.length; i++) {
    //创建一个小li
    var li = document.createElement("li");
    //记录当前小圆圈索引号
    li.setAttribute("index", i);
    //插入到ul中
    ol.appendChild(li);
    //小圆圈事件，鼠标是经过小圆圈 排他思想
    li.addEventListener("mouseenter", function () {
      for (var i = 0; i < ol.children.length; i++) {
        //循环每个类名设为空
        ol.children[i].className = "";
      }
      //鼠标经过当前设类名样式
      this.className = "active";
      //获取当前鼠标下的小圆圈索引
      var index = this.getAttribute("index");
      //将索引号赋给num
      num = index;
      circle = index;
      animate(ul, -index * bannerWidth);
    });
  }
  //网页打开将第一个小圆圈的类名设置
  ol.children[0].className = "active";
  //克隆第一张图片放在第一个
  var first = ul.children[0].cloneNode(true);
  ul.appendChild(first);
  // 右侧按钮滚动
  // 定义图片控制
  var num = 0;
  //定义小圆圈控制
  var circle = 0;
  //节流阀
  var flag = true;
  rightbtn.addEventListener("click", function () {
    if (flag) {
      flag = false; //关闭节流阀
      //走到最后复制一张图片，然后快速将left改为0
      if (num == ul.children.length - 1) {
        ul.style.left = 0;
        num = 0;
      }
      num++;
      animate(ul, -num * bannerWidth, function () {
        flag = true;
      });
      //点击右侧按钮小圆圈跟随一起变化
      circle++;
      //小圆圈走到最后一个则变回第一个
      if (circle == ol.children.length) {
        circle = 0;
      }
      circleChange();
    }
  });
  //左侧按钮
  leftbtn.addEventListener("click", function () {
    if (flag) {
      flag = false;
      if (num == 0) {
        num = ul.children.length - 1;
        ul.style.left = -num * bannerWidth + "px";
      }
      num--;
      animate(ul, -num * bannerWidth, function () {
        flag = true;
      });
      circle--;
      circle=circle<0?ol.children.length-1:circle;
      circleChange();
    }
  });
  function circleChange() {
    for (var i = 0; i < ol.children.length; i++) {
      ol.children[i].className = '';
    }
    ol.children[circle].className = "active";
  }

  var timer=setInterval(function(){
    rightbtn.click();
  },2000);
});
