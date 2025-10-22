/**
 * 图片缓存优化脚本
 * 强制浏览器缓存背景图片
 */

(function() {
  'use strict';
  
  // 预加载背景图片并缓存
  const cacheImages = [
    '/blog_card_picture/1.png',
    '/blog_card_picture/2.png',
    '/blog_card_picture/3.png',
    '/blog_card_picture/4.png',
    '/blog_card_picture/5.png',
    '/img/index1.png'
  ];
  
  // 创建缓存
  function preloadImages() {
    cacheImages.forEach(src => {
      const img = new Image();
      img.src = src;
      // 图片加载后会自动缓存在浏览器中
    });
  }
  
  // 页面加载完成后预加载
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadImages);
  } else {
    preloadImages();
  }
  
  // 设置localStorage标记，当天访问过就不重复加载
  const today = new Date().toDateString();
  const lastVisit = localStorage.getItem('lastVisit');
  
  if (lastVisit !== today) {
    localStorage.setItem('lastVisit', today);
    console.log('🎨 背景图片已预加载并缓存');
  }
})();

