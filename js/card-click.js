// 文章卡片点击跳转功能
document.addEventListener('DOMContentLoaded', function() {
  // 延迟执行，确保DOM完全加载
  setTimeout(function() {
    const postItems = document.querySelectorAll('.recent-post-item');
    
    postItems.forEach(item => {
      // 查找文章链接 - 多种选择器
      let titleLink = item.querySelector('.article-title a');
      if (!titleLink) {
        titleLink = item.querySelector('.post-title a');
      }
      if (!titleLink) {
        titleLink = item.querySelector('a.post_cover');
      }
      
      if (titleLink) {
        const articleUrl = titleLink.getAttribute('href');
        
        // 为整个卡片添加点击事件
        item.style.cursor = 'pointer';
        
        item.addEventListener('click', function(e) {
          // 防止重复触发
          e.stopPropagation();
          
          // 如果点击的是图片区域或空白区域
          if (!e.target.closest('.post-meta') && 
              !e.target.closest('.article-title') &&
              e.target.tagName !== 'A') {
            window.location.href = articleUrl;
          }
        });
        
        // 添加悬停效果提示
        const title = titleLink.textContent.trim() || titleLink.getAttribute('title') || '查看文章';
        item.setAttribute('title', '点击查看：' + title);
      }
    });
  }, 500);
});

