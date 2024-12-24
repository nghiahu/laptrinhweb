<template>
  <div>
    <Header></Header>
    <div class="flex justify-center">
        <img :src="mapContact" alt="" class="w-[90%] h-[500px]">
    </div>
    <div class="contact-container">
    <div class="form-section">
      <h2>Gửi thắc mắc cho chúng tôi</h2>
      <p>Nếu bạn có thắc mắc gì, có thể gửi yêu cầu cho chúng tôi, và chúng tôi sẽ liên lạc lại với bạn sớm nhất có thể.</p>
      <form >
        <input type="text" placeholder="Tên của bạn" required />
        <input type="email" placeholder="Email của bạn" required />
        <input type="tel" placeholder="Số điện thoại của bạn" />
        <textarea placeholder="Nội dung" required></textarea>
        <button type="submit">Gửi cho chúng tôi</button>
      </form>
      <p class="recaptcha-note">This site is protected by reCAPTCHA and the Google <a href="#">Privacy Policy</a> and <a href="#">Terms of Service</a> apply.</p>
    </div>
    <div class="info-section">
      <h3>Thông tin liên hệ</h3>
      <p><strong>Địa chỉ:</strong> Số 5 ngõ 1 Mộ Lao Hà Đông HÀ Nội</p>
      <p><strong>Điện thoại:</strong> 0908427608 (Mr. Khanh)</p>
      <p><strong>Thời gian làm việc:</strong> Thứ 2 đến Thứ 6: từ 9h đến 20h;<br>Thứ 7 và Chủ nhật: từ 9h đến 17h00</p>
      <p><strong>Email:</strong> artpuzzlevn@gmail.com</p>
    </div>
  </div>
    <FooterVue></FooterVue>
  </div>
</template>

<script setup>
import FooterVue from '../layout/Footer.vue';
import Header from '../layout/Header.vue';
const mapContact = "../map.png"
</script>

<style scoped>
.contact-container {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}
.form-section {
  width: 50%;
}
.form-section form {
  display: flex;
  flex-direction: column;
}
.form-section input,
.form-section textarea {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
button {
  background-color: #ffa726;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
}
button:hover {
  background-color: #fb8c00;
}
.info-section {
  width: 40%;
  padding-left: 20px;
}
.info-section p {
  margin-bottom: 10px;
}
.recaptcha-note {
  font-size: 12px;
  color: #777;
}
</style>