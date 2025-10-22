// 随机跳转文章功能
function toRandomPost() {
  // 从数据库中随机选择一篇文章
  fetch('/search.xml')
    .then(res => res.text())
    .then(str => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(str, 'text/xml');
      const entries = xml.querySelectorAll('entry');
      
      if (entries.length === 0) {
        pbtw.snackbarShow('暂无文章');
        return;
      }
      
      const randomEntry = entries[Math.floor(Math.random() * entries.length)];
      const url = randomEntry.querySelector('url').textContent;
      
      // 跳转到随机文章
      window.location.href = url;
    })
    .catch(err => {
      console.error('随机文章功能失败:', err);
      // 降级方案：使用本地存储的文章列表
      const posts = document.querySelectorAll('.recent-post-item');
      if (posts.length > 0) {
        const randomPost = posts[Math.floor(Math.random() * posts.length)];
        const link = randomPost.querySelector('a.post-title');
        if (link) {
          window.location.href = link.href;
        }
      }
    });
}

