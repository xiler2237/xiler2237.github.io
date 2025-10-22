// 网站运行时间显示插件 - 精简版
var zykj = {
  runningTime: function(startTime, text, id, position) {
    var start = new Date(startTime.replace(/-/g, '/'));
    
    function updateRuntime() {
      var now = new Date();
      var diff = now - start;
      
      var days = Math.floor(diff / (1000 * 60 * 60 * 24));
      var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      var runtimeText = text + ' <span class="runtime-days">' + days + '</span> 天 ' +
                       '<span class="runtime-hours">' + ('0' + hours).slice(-2) + '</span> 小时 ' +
                       '<span class="runtime-minutes">' + ('0' + minutes).slice(-2) + '</span> 分 ' +
                       '<span class="runtime-seconds">' + ('0' + seconds).slice(-2) + '</span> 秒';
      
      var element = document.getElementById(id);
      if (!element) {
        element = document.createElement('div');
        element.id = id;
        element.className = 'runtime-box';
        var footer = document.querySelector('#footer-wrap') || document.querySelector('footer');
        if (footer && footer.children[position]) {
          footer.insertBefore(element, footer.children[position]);
        } else if (footer) {
          footer.appendChild(element);
        }
      }
      if (element) element.innerHTML = runtimeText;
    }
    
    updateRuntime();
    setInterval(updateRuntime, 1000);
  }
};

// 初始化
document.addEventListener('DOMContentLoaded', function() {
  zykj.runningTime(
    "2025-10-21 00:00:00",  // 修改为您的网站开始时间
    "小破站已经安全运行",
    "runtime",
    2
  );
});

