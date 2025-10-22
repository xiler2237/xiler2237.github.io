// 标签统计图表
document.addEventListener('DOMContentLoaded', function() {
  // 只在标签页面执行
  if (!window.location.pathname.includes('/tags/')) {
    return;
  }
  
  // 延迟执行，确保DOM加载完成
  setTimeout(function() {
    // 获取所有标签链接
    const tagLinks = document.querySelectorAll('.tag-cloud-tags a, .tag-cloud a');
    
    if (tagLinks.length === 0) {
      return;
    }
    
    // 统计标签数据
    const tagData = [];
    const tagLabels = [];
    const tagColors = [
      'rgba(102, 126, 234, 0.8)',
      'rgba(240, 147, 251, 0.8)',
      'rgba(79, 172, 254, 0.8)',
      'rgba(67, 233, 123, 0.8)',
      'rgba(250, 112, 154, 0.8)',
      'rgba(48, 207, 208, 0.8)',
      'rgba(168, 237, 234, 0.8)',
      'rgba(255, 154, 158, 0.8)',
    ];
    
    tagLinks.forEach((link, index) => {
      const tagName = link.textContent.trim();
      // 尝试从链接文本或属性中获取文章数量
      const countMatch = tagName.match(/\((\d+)\)/);
      let count = 1;
      
      if (countMatch) {
        count = parseInt(countMatch[1]);
        tagLabels.push(tagName.replace(/\s*\(\d+\)/, ''));
      } else {
        // 从href中尝试获取
        const href = link.getAttribute('href');
        if (href) {
          // 可以在这里添加其他逻辑来获取数量
          tagLabels.push(tagName);
        } else {
          tagLabels.push(tagName);
        }
      }
      
      tagData.push(count);
      
      // 为标签添加数量属性（用于CSS显示）
      link.setAttribute('data-count', count);
    });
    
    // 如果所有标签都是1，说明需要从页面中获取实际数量
    if (tagData.every(count => count === 1)) {
      // 从标签页面的实际结构中获取
      const tagItems = document.querySelectorAll('.tag-cloud-list-item');
      if (tagItems.length > 0) {
        tagData.length = 0;
        tagLabels.length = 0;
        
        tagItems.forEach((item, index) => {
          const nameEl = item.querySelector('.tag-cloud-list-name');
          const countEl = item.querySelector('.tag-cloud-list-count');
          
          if (nameEl && countEl) {
            tagLabels.push(nameEl.textContent.trim());
            tagData.push(parseInt(countEl.textContent.trim()) || 1);
          }
        });
      }
    }
    
    // 创建图表容器
    const chartContainer = document.createElement('div');
    chartContainer.id = 'tag-chart-container';
    chartContainer.innerHTML = `
      <h3 id="tag-chart-title">📊 标签文章占比统计</h3>
      <canvas id="tagChart"></canvas>
    `;
    
    // 插入到标签云之前
    const tagCloud = document.querySelector('.tag-cloud, #tag-cloud');
    if (tagCloud && tagCloud.parentNode) {
      tagCloud.parentNode.insertBefore(chartContainer, tagCloud);
    } else {
      // 如果找不到标签云，插入到主内容区
      const mainContent = document.querySelector('#content-inner, .content');
      if (mainContent) {
        mainContent.insertBefore(chartContainer, mainContent.firstChild);
      }
    }
    
    // 加载Chart.js库（如果未加载）
    if (typeof Chart === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js';
      script.onload = function() {
        createChart();
      };
      document.head.appendChild(script);
    } else {
      createChart();
    }
    
    function createChart() {
      const ctx = document.getElementById('tagChart');
      if (!ctx) return;
      
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: tagLabels.slice(0, 10), // 只显示前10个标签
          datasets: [{
            data: tagData.slice(0, 10),
            backgroundColor: tagColors,
            borderColor: '#fff',
            borderWidth: 3,
            hoverOffset: 20,
            hoverBorderWidth: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              position: 'right',
              labels: {
                padding: 20,
                font: {
                  size: 14,
                  family: "'Microsoft YaHei', sans-serif"
                },
                color: getComputedStyle(document.documentElement)
                  .getPropertyValue('--font-color') || '#333',
                boxWidth: 15,
                boxHeight: 15,
                usePointStyle: true,
                pointStyle: 'circle'
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              padding: 15,
              titleFont: {
                size: 15,
                weight: 'bold'
              },
              bodyFont: {
                size: 14
              },
              borderColor: 'rgba(102, 126, 234, 0.5)',
              borderWidth: 2,
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = context.parsed || 0;
                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = ((value / total) * 100).toFixed(1);
                  return ` ${label}: ${value}篇 (${percentage}%)`;
                }
              }
            }
          },
          animation: {
            animateRotate: true,
            animateScale: true,
            duration: 1800,
            easing: 'easeInOutQuart'
          }
        }
      });
    }
  }, 800);
});

