<template>
    <div class="container">
      <div class="latest-posts">
        <h2>Bài viết mới nhất</h2>
        <div class="underline"></div>
      </div>
      <div class="posts-grid">
        <div class="post-card" v-for="post in posts" :key="post.id">
          <img :src="post.image" alt="Post Image" />
          <div class="post-content">
            <h3>{{ post.title }}</h3>
            <p>{{ post.excerpt }}</p>
            <div class="date">{{ post.date }}</div>
            <router-link to="" class="read-more">Xem thêm</router-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
      const posts = [
          {
            id: 1,
            image: 'https://file.hstatic.net/200000417685/article/pre_tet_2024_post_banner_3048beed727645bfacc8157d56088cb6_large.jpg',
            title: 'Nhân Đôi Ưu Đãi - Mừng Xuân Giáp Thìn',
            excerpt: 'Gấp đôi ưu đãi tặng Chậu Hoa Nhỏ, Thiên Ngữ Hạc...',
            date: '20 Tháng 01, 2024',
          },
          {
            id: 2,
            image: 'https://file.hstatic.net/200000417685/article/deal_soc_2024_post_banner_b4d320b2ab8c43e0b8119e36c876778f_large.jpg',
            title: 'MUA KÈM DEAL SỐC - GIẢM ĐẾN 70%',
            excerpt: 'Mua kèm deal sốc hơn 130 sản phẩm HOT giảm giá...',
            date: '06 Tháng 01, 2024',
          },
          {
            id: 3,
            image: 'https://file.hstatic.net/200000417685/article/black_friday_web_post_2477567ff0924d4db1c9a0d9608dbe2a_large.jpg',
            title: '[BLACK FRIDAY] GIẢM ĐẾN 70% - NGẬP TRÀN ƯU ĐÃI',
            excerpt: 'Giảm giá đến 70% toàn bộ mô hình lắp ráp...',
            date: '22 Tháng 11, 2023',
          },
        ]
  </script>
  
  <style scoped>
 .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  margin-top: 40px;
}

.latest-posts {
  text-align: center;
  margin-bottom: 40px;
}

.latest-posts h2 {
  font-size: 32px;
  font-weight: bold;
  color: #444;
}

.latest-posts .underline {
  width: 50px;
  height: 4px;
  background-color: #f8b400;
  margin: 10px auto;
}

.posts-grid {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.post-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.post-card:hover {
  transform: translateY(-10px);
}

.post-card img {
  width: 100%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.post-content {
  padding: 15px;
}

.post-content h3 {
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
}

.post-content p {
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
}

.post-content .date {
  font-size: 12px;
  color: #aaa;
}

.post-content .read-more {
  font-size: 14px;
  color: #f8b400;
  text-decoration: none;
}

.post-content .read-more:hover {
  text-decoration: underline;
}

  </style>
  