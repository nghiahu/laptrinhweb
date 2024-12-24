<template>
  <div>
    <Header class="fixed z-10 w-full"></Header>
    <Carousels class="pt-[200px]"/>
    <Traler />

    <div>
      <div class="font-bold text-3xl ml-[40%] mb-7">Danh mục sản phẩm</div>
      <div v-if="categorys" class="w-[100%] flex justify-center mb-10">
        <v-sheet class="mx-auto" max-width="90%" height="500px">
          <v-slide-group class="h-[100%]">
            <v-slide-group-item
              v-for="category in categorys"
              :key="category"
              class="h-[100%] flex items-center justify-center"
            >
              <div
                class="ma-2 p-0 relative"
                rounded
                @click="toggle"
                style="width: 300px; height: 100%; position: relative;"
              >
                <img
                  :src="category.image"
                  alt=""
                  class="imgcate"
                  style="width: 100%; height: 100%; object-fit: cover;"
                />
                <div @click="gotToCategory(category.id)"
                  class="absolute bottom-0 left-0 w-full text-white text-center bg-gray-500 bg-opacity-50 py-5 z-10"
                >
                  {{ category.name }}
                </div>
              </div>
            </v-slide-group-item>
          </v-slide-group>
        </v-sheet>
      </div>
      <div v-else>
        <v-progress-circular indeterminate :size="50" :width="7"></v-progress-circular>
      </div>
    </div>

    <div>
      <div class="selecDiv">
            <label for="">Sắp xếp:</label>
            <select class="selecSort" @change="handleChangeSort">
              <option value="createAt">Ngày tạo</option>
              <option value="name">Tên</option>
              <option value="price">Giá</option>
            </select>
            <AkArrowUp @click="handleChangeReverse" v-if="inDe == 'asc'"/>
            <AnOutlinedArrowDown @click="handleChangeReverse" v-else/>
          </div>
      <div class="font-bold text-3xl ml-[40%] mb-7">Danh sách sản phẩm</div>
      <div v-if="filterProduct">
        <div class="tableUser">
          <v-sheet :elevation="3" v-for="product in filterProduct" :key="product.id" class="userItem">
            <div class="product-card">
            <div class="product-image-wrapper">
              <img :src="product.image[0]" alt="Product Image" class="product-image" />
              <div class="product-actions">
                <button class="buy-now" @click="seeDetail(product.id)">Xem chi tiết</button>
                <button class="add-to-cart" @click="addToCart(product)">Thêm vào giỏ hàng</button>
              </div>
            </div>
            <div class="product-info">
              <div class="product-name">{{ product.name }}</div>
              <div class="product-price">{{ VND.format(product.price) }}</div>
              <div class="product-sold">
                <div> Đã bán: {{ formatLikes(product.sold) }}</div>
                <AkHeart class="text-xl text-red-500"/>
              </div>
              <div class="product-evaluate">
                <div class="flex items-center"><AnFilledStar /> {{ formatEvaluate(product.evaluate) }}</div>
                <div class="text-gray-500">Kho: {{ formatLikes(product.stock) }}</div>
              </div>
            </div>
          </div>
          </v-sheet>
        </div>
        <div class="pagination">
          <v-pagination v-model="indexPage" :length="countPage" :total-visible="7"></v-pagination>
        </div>
      </div>
      <div v-else>
        <v-progress-circular indeterminate :size="50" :width="7"></v-progress-circular>
      </div>
    </div>
    <PostPage/>
    <AhippingAdvertisingVue/>
    <FooterVue/>
  </div>
</template>

<script setup>
import Header from './layout/Header.vue';
import Carousels from './layout/Carousels.vue';
import Traler from './layout/Traler.vue';
import { useStore } from 'vuex';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { AnFilledStar } from '@kalimahapps/vue-icons';
import { AkHeart } from '@kalimahapps/vue-icons';
import PostPage from './layout/PostPage.vue';
import AhippingAdvertisingVue from './layout/AhippingAdvertising.vue';
import FooterVue from './layout/Footer.vue';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import { AkArrowUp } from '@kalimahapps/vue-icons';
import { AnOutlinedArrowDown } from '@kalimahapps/vue-icons';
const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
const formatEvaluate = (evaluate) => {
return parseFloat(evaluate).toFixed(1);
};
const formatLikes = (likes) => {
  if (likes >= 1000) {
    return (likes / 1000).toFixed(1) + 'k';
  }
  return likes;
};
const randomBoolean = () => Math.random() > 0.5;
const randomDiscount = () => Math.floor(Math.random() * 10) + 1;
const router = useRouter()
const store = useStore();
const categorys = computed(() => store.state.categoryModule.categorys);
const users = computed(() => store.state.userModule.data);
const filterProduct = computed(() => store.state.productModule.useProduct);
const products = computed(() => store.state.productModule.products)
const countPage = computed(() => Math.ceil(products.value.length / 5));
const userLogin = computed(() => store.state.userModule.userLogin || null)
const indexPage = ref(1);
const condition = ref("createAt");
const inDe = ref("asc");
const isLogin = JSON.parse(localStorage.getItem("isLoginUse") || null)
const searchValue = ref("");
onMounted(() => {
  store.dispatch("fetchProduct")
  store.dispatch("fetchCategory");
  store.dispatch("fetchUser");
  store.dispatch("fetchUseProduct", { indexPage: indexPage.value, condition: condition.value, inDe: inDe.value,searchValue:searchValue.value});
  store.dispatch("fetchUserLogin",isLogin)
});
watch([indexPage, condition, inDe], () => {
  store.dispatch("fetchUseProduct", { indexPage: indexPage.value, condition: condition.value, inDe: inDe.value,searchValue:searchValue.value});
  });
  const addToCart = (product) => {
  if (isLogin) {
    const existingProduct = userLogin.value.cart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      const cartProduct = reactive({
        id: product.id,
        image: product.image,
        price: product.price,
        quantity: 1,
        name: product.name,
      });
      userLogin.value.cart.push(cartProduct);
    }
    store.dispatch("fetchToCart", userLogin.value);

    Swal.fire({
      position: "top",
      icon: "success",
      title: "Đã thêm sản phẩm vào giỏ hàng",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    Swal.fire({
      title: "Chưa đăng nhập",
      text: "Bạn cần đăng nhập để mua hàng",
      icon: "warning",
    }).then(() => {
      router.push("/login");
    });
  }
};

const seeDetail = (idProduct) => {
  router.push(`user/product-detail/${idProduct}`)
}
const gotToCategory = (idCategory) =>{
  router.push(`/user/catrgory-product/${idCategory}`)
}
const handleChangeReverse = () => {
    if(inDe.value === 'asc'){
      inDe.value = 'desc'
    }else{
      inDe.value = 'asc'
    }
  }
  const handleChangeSort = (event) => {
    condition.value = event.target.value;
    store.dispatch("fetchFilterProduct",  {indexPage: indexPage.value, condition: condition.value, inDe: inDe.value, searchValue: searchValue.value});
  };
</script>

<style >
.imgcate {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tableUser {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: 90%;
  place-items: center;
  place-content: center;
  margin-left: 5%;
}

.userItem {
  background-color: white;
  text-align: center;
  width: 90%;
  border-radius: 5px;
  margin-top: 15px;
}

.userItem img {
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.userItem .text-center {
  display: block;
  white-space: nowrap;
  overflow: hidden; 
  text-overflow: ellipsis; 
  max-width: 300px; 
}
.product-card {
  width: 100%;
  max-width: 300px;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  transition: transform 0.3s ease-in-out;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image-wrapper {
  position: relative;
}

.product-actions {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  flex-direction: column;
}

.product-card:hover .product-actions {
  opacity: 1;
}

.buy-now, .add-to-cart {
  padding: 8px 15px;
  background-color: #ff424e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.buy-now:hover, .add-to-cart:hover {
  background-color: #e63b44;
}

.product-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.product-info {
  padding: 10px;
}

.product-name {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 5px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-price {
  color: #ff424e;
  font-size: 18px;
  font-weight: bold;
}

.product-sold {
  font-size: 14px;
  color: #757575;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.product-evaluate {
  display: flex;
  align-items: center;
  color: rgb(255, 149, 0);
  justify-content: space-between;
}
.pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    top: 91%;
    left: 50%;
    margin-top: 30px;
  }
  .selecDiv {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    padding: 5px 15px;
    border-radius: 50px;
    border: 1px solid #333;
    background-color: white;
    width: 15%;
    margin-left: 5%;
  }
  
  .selecSort {
    outline: none;
    padding: 5px;
    border: none;
    background-color: transparent;
  }
</style>
