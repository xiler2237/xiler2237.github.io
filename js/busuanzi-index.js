// 在首页文章卡片上添加浏览量显示
document.addEventListener('DOMContentLoaded', function() {
  // 只在首页执行
  if (window.location.pathname !== '/' && !window.location.pathname.includes('/page/')) {
    return;
  }
  
  // 延迟执行，确保DOM和busuanzi加载完成
  setTimeout(function() {
    // 加载busuanzi脚本
    if (typeof window.busuanzi === 'undefined') {
      const script = document.createElement('script');
      script.async = true;
      script.src = '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js';
      document.head.appendChild(script);
      
      // 等待busuanzi加载完成
      script.onload = function() {
        setTimeout(addPageViews, 1000);
      };
    } else {
      addPageViews();
    }
  }, 500);
  
  function addPageViews() {
    // 获取所有文章卡片
    const postItems = document.querySelectorAll('.recent-post-item');
    
    postItems.forEach(function(item) {
      // 获取文章链接
      const link = item.querySelector('.article-title');
      if (!link) return;
      
      const href = link.getAttribute('href');
      if (!href) return;
      
      // 查找分类/标签容器
      const metaWrap = item.querySelector('.article-meta-wrap');
      if (!metaWrap) return;
      
      // 检查是否已经添加过浏览量
      if (metaWrap.querySelector('.post-meta-pv')) return;
      
      // 创建浏览量元素
      const pvSpan = document.createElement('span');
      pvSpan.className = 'article-meta post-meta-pv';
      pvSpan.innerHTML = `
        <span class="article-meta-separator">|</span>
        <i class="far fa-eye"></i>
        <span class="busuanzi_value_page_pv" data-url="${href}">
          <i class="fa-solid fa-spinner fa-spin"></i>
        </span>
      `;
      
      // 插入到元信息末尾
      metaWrap.appendChild(pvSpan);
    });
    
    // 触发busuanzi更新
    if (window.busuanzi && window.busuanzi.fetch) {
      window.busuanzi.fetch();
    }
  }
});

