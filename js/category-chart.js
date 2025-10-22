// 分类统计图表
document.addEventListener('DOMContentLoaded', function() {
  // 只在分类页面执行
  if (!window.location.pathname.includes('/categories/')) {
    return;
  }
  
  // 延迟执行，确保DOM加载完成
  setTimeout(function() {
    // 获取所有分类链接（修正选择器）
    const categoryLinks = document.querySelectorAll('.card-category-list-link');
    
    if (categoryLinks.length === 0) {
      console.log('未找到分类链接');
      return;
    }
    
    // 统计分类数据
    const categoryData = [];
    const categoryLabels = [];
    const categoryColors = [
      'rgba(102, 126, 234, 0.8)',
      'rgba(240, 147, 251, 0.8)',
      'rgba(79, 172, 254, 0.8)',
      'rgba(67, 233, 123, 0.8)',
      'rgba(250, 112, 154, 0.8)',
      'rgba(48, 207, 208, 0.8)',
      'rgba(168, 237, 234, 0.8)',
      'rgba(255, 154, 158, 0.8)',
    ];
    
    categoryLinks.forEach((link, index) => {
      // 从 span.card-category-list-name 中获取分类名
      const nameEl = link.querySelector('.card-category-list-name');
      const countEl = link.querySelector('.card-category-list-count');
      
      if (nameEl && countEl) {
        const categoryName = nameEl.textContent.trim();
        const count = parseInt(countEl.textContent.trim()) || 1;
        
        categoryLabels.push(categoryName);
        categoryData.push(count);
        
        // 为分类添加数量属性（用于CSS显示）
        link.setAttribute('data-count', count);
      }
    });
    
    // 创建图表容器
    const chartContainer = document.createElement('div');
    chartContainer.id = 'category-chart-container';
    chartContainer.innerHTML = `
      <h3 id="category-chart-title">📊 分类文章占比统计</h3>
      <canvas id="categoryChart"></canvas>
    `;
    
    // 插入到分类列表之前
    const categoryList = document.querySelector('.category-list, #category-cloud, .card-category-list');
    if (categoryList && categoryList.parentNode) {
      categoryList.parentNode.insertBefore(chartContainer, categoryList);
    } else {
      // 如果找不到分类列表，插入到主内容区的开头
      const mainContent = document.querySelector('#content-inner, #page');
      if (mainContent) {
        const firstChild = mainContent.querySelector('.category-list, .card-category-list') || mainContent.firstChild;
        if (firstChild && firstChild.parentNode) {
          firstChild.parentNode.insertBefore(chartContainer, firstChild);
        }
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
      const ctx = document.getElementById('categoryChart');
      if (!ctx) return;
      
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: categoryLabels,
          datasets: [{
            data: categoryData,
            backgroundColor: categoryColors,
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

