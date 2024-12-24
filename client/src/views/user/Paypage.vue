<template>
  <div>
    <div class="checkout-form-overlay">
      <div class="checkout-form">
        <h2 class="text-2xl font-bold mb-4">Thanh toán</h2>
        <form @submit.prevent="submitPayment">
          <div>
            <label>Họ và tên:</label>
            <input type="text" v-model="formData.fullName" required />
          </div>
          <div>
            <label>Số điện thoại:</label>
            <input type="text" v-model="formData.phoneNumber" required />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" v-model="formData.email" required />
          </div>
          <div>
            <label>Địa chỉ giao hàng:</label>
            <textarea v-model="formData.address" required></textarea>
          </div>
          <div>
            <label>Ghi chú:</label>
            <textarea v-model="formData.notes"></textarea>
          </div>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 mt-4">Đặt hàng</button>
          <button @click="closeFrom" class="bg-gray-500 text-white px-4 py-2 mt-4 ml-2">Hủy</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Header from '../layout/Header.vue';
import FooterVue from '../layout/Footer.vue';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import { addToCart } from '@/api/userApi'; 
const emit = defineEmits(["closeFrom","refetchData"])
const closeFrom = () => {
  emit("closeFrom")
}
const props = defineProps(["cart"])
const showCheckoutForm = ref(false);
const router = useRouter();
const formData = ref({
  fullName: '',
  phoneNumber: '',
  email: '',
  address: '',
  notes: ''
});


const submitPayment = () => {
  Swal.fire({
    title: 'Xác nhận thanh toán',
    text: 'Bạn có chắc muốn thanh toán và đặt hàng?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Thanh toán',
    cancelButtonText: 'Hủy'
  }).then((result) => {
    if (result.isConfirmed) {
      emit("refetchData")
      Swal.fire({
        title: 'Thanh toán thành công',
        text: 'Đơn hàng của bạn đã được đặt.',
        icon: 'success'
      }).then(() => {
        showCheckoutForm.value = false;
        router.push('/');
      });
    }
  });
};
</script>

<style scoped>
.checkout-form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.checkout-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

label {
  display: block;
  margin-bottom: 5px;
}

input, textarea {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  cursor: pointer;
}
</style>
