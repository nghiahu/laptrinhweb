<template>
    <footer class="footer">
      <div class="container">
        <div class="footer-column">
          <h3>Về Sogun Amor</h3>
          <p>
            Chúng tôi chuyên các mô hình kim loại 3D, mô hình gỗ 3D, mô hình nhựa 3D
            chính hãng Piececool, Metal Earth, Robotime, Lego, CaDA, MOULDKING, CubicFun
          </p>
          <div class="social-icons">
            <i class="fab fa-facebook"></i>
            <i class="fab fa-instagram"></i>
            <i class="fab fa-tiktok"></i>
            <i class="fab fa-youtube"></i>
          </div>
          <img src="https://theme.hstatic.net/200000417685/1001040197/14/footer_logobct_img.png?v=723" alt="Bộ công thương">
          <h4>Phương thức thanh toán</h4>
          <div class="payment-methods">
            <img src="https://theme.hstatic.net/200000417685/1001040197/14/payment_1_img.png?v=723" alt="Momo">
            <img src="https://theme.hstatic.net/200000417685/1001040197/14/payment_2_img.png?v=723" alt="COD">
            <img src="https://theme.hstatic.net/200000417685/1001040197/14/payment_4_img.png?v=723" alt="Credit Card">
          </div>
        </div>
  
        <div class="footer-column">
          <h3>Thông tin liên hệ</h3>
          <p>Địa chỉ: 5 Mộ Lao , Hà Đông , Hà Nội</p>
          <p>Điện thoại: 0345473042 (Mr. Nghĩa)</p>
          <p>Email: sogunamor@gmail.com</p>
          <h4>Phương thức vận chuyển</h4>
          <div class="shipping-methods">
            <img src="https://theme.hstatic.net/200000417685/1001040197/14/shipment_1_img.png?v=723" alt="GHN Express">
            <img src="https://theme.hstatic.net/200000417685/1001040197/14/shipment_3_img.png?v=723" alt="Ahome">
            <img src="https://theme.hstatic.net/200000417685/1001040197/14/shipment_4_img.png?v=723" alt="Grab">
          </div>
          <h4>Sàn Sale tại</h4>
          <div class="sale-platforms">
            <img src="https://theme.hstatic.net/200000417685/1001040197/14/shopee_logo.jpg?v=723" alt="Shopee">
            <img src="https://theme.hstatic.net/200000417685/1001040197/14/tiktok_logo.jpg?v=723" alt="Tiktok">
            <img src="https://theme.hstatic.net/200000417685/1001040197/14/lazada_logo.jpg?v=723" alt="Lazada">
          </div>
        </div>
  
        <div class="footer-column">
          <h3>Mô Hình</h3>
          <ul>
            <li>Tất cả mô hình</li>
            <li>Mô hình kim loại 3D</li>
            <li>Mô hình gỗ 3D</li>
            <li>Mô hình nhựa 3D</li>
            <li>Mô hình ốc vít 3D</li>
            <li>Mô hình giấy 3D</li>
          </ul>
        </div>
  
        <div class="footer-column">
          <h3>Thông Tin</h3>
          <ul>
            <li>Giới thiệu</li>
            <li>Liên hệ</li>
            <li>Hình thức thanh toán</li>
            <li>Chính sách đổi trả</li>
            <li>Chính sách bảo mật</li>
            <li>Chính sách giao hàng</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <router-link to="/">&copy; 2023 - 2024 SogunAmor.vn</router-link>
      </div>
    </footer>
  </template>
  

<script>

</script>

<style scoped>
.footer {
  background-color: #f9f8f4;
  padding: 40px 0;
  color: #5b4636;
  font-family: Arial, sans-serif;
}

.container {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-column {
  width: 23%;
}

.footer-column h3 {
  font-size: 18px;
  margin-bottom: 15px;
  color: #8b4f1e;
}

.footer-column p, .footer-column ul, .footer-column li {
  font-size: 14px;
  line-height: 24px;
}

.social-icons i {
  font-size: 20px;
  margin-right: 10px;
}

.payment-methods img, .shipping-methods img, .sale-platforms img {
  width: 40px;
  margin-right: 10px;
}

.footer-bottom {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #8b4f1e;
}

</style>