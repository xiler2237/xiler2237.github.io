// 文章卡片背景图片配置
document.addEventListener('DOMContentLoaded', function() {
  // 文章背景图片映射表
  const postBackgrounds = {
    // 格式: '文章标题关键词': '图片路径'
    // 示例:
    // 'CVE漏洞复现': '/img/post-bg/cve-bg.jpg',
    // 'IDA-MCP': '/img/post-bg/ida-bg.jpg',
    // 'newstar week3': '/img/post-bg/ctf-bg.jpg',
    // 'pwn-awd': '/img/post-bg/pwn-bg.jpg',
    // 'Ubuntu': '/img/post-bg/ubuntu-bg.jpg',
    // '压缩壳脱壳': '/img/post-bg/reverse-bg.jpg',
  };

  // 默认背景图片（可选）
  const defaultBackground = ''; // 留空表示使用纯色背景

  // 为文章卡片添加背景图
  const postItems = document.querySelectorAll('.recent-post-item');
  
  postItems.forEach(item => {
    const titleElement = item.querySelector('.post-title, .article-title a');
    if (!titleElement) return;
    
    const title = titleElement.textContent.trim();
    let bgImage = defaultBackground;
    
    // 查找匹配的背景图
    for (const [keyword, imagePath] of Object.entries(postBackgrounds)) {
      if (title.includes(keyword)) {
        bgImage = imagePath;
        break;
      }
    }
    
    // 设置背景图片
    if (bgImage) {
      item.style.setProperty('--bg-image', `url('${bgImage}')`);
      item.setAttribute('data-bg-image', bgImage);
    }
  });
});


