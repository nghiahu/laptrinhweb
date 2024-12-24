<template>
    <div>
      <Header></Header>
      <div v-if="userLogin" class="mt-[30px] ml-[10%]">
        <div class="font-bold text-2xl">Giỏ hàng của bạn</div>
        <div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Đơn giá</th>
                  <th>Số lượng</th>
                  <th>Số tiền</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody v-for="product in cartIndex" :key="product.id">
                <tr>
                  <td>
                    <img :src="product.image" alt="product image" style="width: 50px; height: auto; margin-right: 10px;">
                    <span>{{ product.name }}</span>
                  </td>
                  <td>{{ VND.format(product.price) }}</td>
                  <td>
                    <button @click="decreaseQuantity(product)">-</button>
                    <input type="text" v-model="product.quantity" style="width: 30px; text-align: center;">
                    <button @click="increaseQuantity(product)">+</button>
                  </td>
                  <td>{{ product.quantity * product.price }} ₫</td>
                  <td>
                    <button @click="removeProduct(product)">Xóa</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="cartIndex.length">
            <div class="flex justify-between mt-4">
                <div><button @click="clearCart" class="bg-red-500 text-white px-4 ">Xóa tất cả</button></div>
              
              <div class="text-right">
                <p><strong>Tổng sản phẩm:</strong> {{ totalItems }} sản phẩm</p>
                <p><strong>Tổng thanh toán:</strong> {{ VND.format(totalAmount) }}</p>
                <button @click="goToCheckout" class="bg-orange-500 text-white px-4 py-2 mt-2">Mua Hàng</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="text-xl text-gray-500 flex justify-center h-[400px] items-center">***Giỏ hàng của bạn chưa có gì***</div>
      </div>
      <FooterVue/>
  <Paypage v-if="byPay" @closeFrom="handleClose" @refetchData="handleRefetchData" :cart="userLogin.value"/>
    </div>
  </template>
  
  <script setup>
import FooterVue from '../layout/Footer.vue';
import Header from '../layout/Header.vue';
import { useStore } from 'vuex';
import { computed, onMounted, ref } from 'vue';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import { addToCart } from '@/api/userApi';  
import Paypage from './Paypage.vue';
const byPay = ref(false)
onMounted(() => {
  store.dispatch("fetchProduct");
  store.dispatch("fetchCategory");
  store.dispatch("fetchUser");
  store.dispatch("fetchUserLogin", isLogin);
});

const store = useStore();
const router = useRouter();
const userLogin = computed(() => store.state.userModule.userLogin || null);
const products = computed(() => store.state.productModule.products);
const cartIndex = computed(() => userLogin.value.cart);
const isLogin = JSON.parse(localStorage.getItem("isLoginUse"));

const VND = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

async function decreaseQuantity(product) {
  if (product.quantity > 1) {
    product.quantity--;
    store.dispatch("updateProduct",{newProduct: targetProduct, updateProduct: product.id})
  }
}

async function increaseQuantity(product) {
  const targetProduct = products.value.find(p => p.id === product.id);
  if (targetProduct && targetProduct.stock > 0) {
    product.quantity++;
    targetProduct.stock -= 1;
    targetProduct.sold += 1;

      store.dispatch("updateProduct",{newProduct: targetProduct, updateProduct: product.id})
      console.error('Lỗi khi cập nhật giỏ hàng:', error);
  } else {
    Swal.fire({
      title: 'Hết hàng',
      text: 'Sản phẩm này đã hết hàng trong kho',
      icon: 'warning',
      confirmButtonText: 'OK'
    });
  }
}

const removeProduct = async (product) => {
  Swal.fire({
  title: "Bạn có chắc không",
  text: "Bạn có chắc muốn xóa sản phẩm này không!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    const index = userLogin.value.cart.indexOf(product);
    if (index > -1) {
      userLogin.value.cart.splice(index, 1);
      addToCart(userLogin.value)
    }
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  }
});
}
const totalItems = computed(() => {
  return cartIndex.value.reduce((total, product) => total + product.quantity, 0);
});
const totalAmount = computed(() => {
  return cartIndex.value.reduce((total, product) => total + (product.quantity * product.price), 0);
});

const clearCart = () => {
  Swal.fire({
  title: "Bạn có chắc không",
  text: "Bạn có chắc muốn xóa tất cả sản phẩm kh!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
      userLogin.value.cart= []
      addToCart(userLogin.value)
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  }
});
}

const goToCheckout = () => {
  handleClose();
}
const handleClose = () => {
  byPay.value = !byPay.value
}
const handleRefetchData = () => {
  userLogin.value.cart= []
  addToCart(userLogin.value)
}
</script>


  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  button {
    padding: 5px 10px;
    margin: 0 2px;
  }
  
  input {
    border: 1px solid #ddd;
    padding: 5px;
  }
  
  .text-right {
    text-align: right;
  }
  
  .bg-orange-500 {
    background-color: #FF5733;
  }
  
  .bg-red-500 {
    background-color: #FF0000;
  }
  </style>
  