<template>
    <div>
    <!-- Phần Mô Hình Kim Loại 3D -->
    <section class="product-section">
      <div class="product-info">
        <h1 class="product-title">Mô Hình Kim Loại 3D</h1>
        <p class="product-description">
          Mô hình kim loại 3D lắp ráp được quốc tế công nhận là đồ chơi sáng tạo hấp dẫn nhất năm 2020. Được lắp ráp từ những mảnh thép không gỉ với chi tiết sắc sảo, màu sắc trung thực, tinh tế, mô hình thép 3D có độ bền cao còn giúp bạn rèn luyện tính kiên trì, tỉ mỉ và bình tĩnh.
        </p>
        <div class="product-actions">
          <button class="buy-now-btn">Mua Ngay</button>
          <button class="contact-btn">Liên Hệ</button>
        </div>
      </div>
      <div class="product-image">
        <img :src="urlImg[0]" alt="Mô hình 3D kim loại" />
      </div>
    </section>
  
    <!-- Phần Mô Hình Gỗ 3D -->
    <section class="product-section">
        <div class="product-image">
        <img :src="urlImg[1]" alt="Mô hình Gỗ 3D" />
      </div>
      <div class="product-info">
        <h1 class="product-title">Mô Hình Gỗ 3D</h1>
        <p class="product-description">
          Được chế tác từ gỗ ép chất lượng và chi tiết khắc họa cực cao bằng máy cắt lazer. Mô hình gỗ 3D Robotime phù hợp với nhiều lứa tuổi (5+). Nếu bạn cần một món quà tặng hấp dẫn, độc đáo, dễ lắp ráp và đặc biệt chơi được sau khi hoàn thành, thì đây chính là sản phẩm bạn tìm đấy.
        </p>
        <ul>
          <li>Hàng chính hãng Robotime</li>
          <li>Hướng dẫn bằng tiếng Anh</li>
          <li>Dụng cụ đã bao gồm trong bộ sản phẩm</li>
        </ul>
        <div class="product-actions">
          <button class="buy-now-btn">Mua Ngay</button>
        </div>
      </div>

    </section>
  
    <!-- Phần Mô Hình Nhựa 3D -->
    <section class="product-section">
      <div class="product-info">
        <h1 class="product-title">Mô Hình Nhựa 3D</h1>
        <p class="product-description">
          Những miếng "gạch" nhựa ABS an toàn cho trẻ (3+) đầy màu sắc chắc chắn sẽ luôn cuốn hút chúng ta. Nay mô hình nhựa 3D non Lego đã có các phiên bản điều khiển, chuyển động được bằng motor và pin sạc.
        </p>
        <ul>
          <li>Chất lượng gạch sáng bóng 9/10 so với chính hãng Lego</li>
          <li>Dễ lắp ráp, nhiều sản phẩm chuyển động được bằng motor và điều khiển</li>
          <li>Hướng dẫn dễ hiểu, hỗ trợ khi bạn gặp khó khăn</li>
        </ul>
        <div class="product-actions">
          <button class="buy-now-btn">Mua Ngay</button>
        </div>
      </div>
      <div class="product-image">
        <img :src="urlImg[2]" alt="Mô hình Nhựa 3D" />
      </div>
    </section>
</div>
  </template>
  
  <script setup>
    const urlImg = [
        "https://theme.hstatic.net/200000417685/1001040197/14/home_introduce_img.jpg?v=723",
        "https://theme.hstatic.net/200000417685/1001040197/14/home_banner_1_img.jpg?v=723",
        "https://theme.hstatic.net/200000417685/1001040197/14/home_banner_2_img.jpg?v=723"
    ]
  </script>
  
  <style scoped>
  .product-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 50px;
    background-color: #f9f9f9;
    margin-bottom: 50px;
  }
  
  .product-info {
    max-width: 50%;
  }
  
  .product-title {
    font-size: 2.5rem;
    font-weight: bold;
    color: #5a3e36;
    margin-bottom: 20px;
  }
  
  .product-description {
    font-size: 1.125rem;
    line-height: 1.8;
    color: #555;
    margin-bottom: 20px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
    margin-bottom: 20px;
  }
  
  ul li {
    font-size: 1.125rem;
    color: #333;
    margin-bottom: 10px;
  }
  
  .product-actions {
    display: flex;
    gap: 20px;
  }
  
  .buy-now-btn {
    padding: 15px 30px;
    font-size: 1rem;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    background-color: #f39c12;
    color: white;
  }
  
  .buy-now-btn:hover {
    opacity: 0.8;
  }
  
  .product-image img {
    max-width: 500px;
    height: auto;
  }
  </style>
  