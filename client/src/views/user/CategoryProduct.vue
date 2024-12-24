<template>
    <div>
  <Header></Header>
  <div v-if="categoryDetail" class="mb-10">
    <div class="text-3xl font-bold m-6 ml-[10%]">Danh mục: {{ categoryDetail.name }}</div>
    <div>
        <div class="tableUser">
        <v-sheet :elevation="3" v-for="product in filteredProducts" :key="product.id" class="userItem">
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
    </div>
  </div>
  <FooterVue/>
</div>
</template>

<script setup>
import { useStore } from 'vuex';
import FooterVue from '../layout/Footer.vue';
import Header from '../layout/Header.vue';
import { computed, onMounted } from 'vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const store = useStore()
const indexPage = ref(1)
const condition = ref("createAt");
const inDe = ref("asc");
const searchValue = ref("")
const products = computed(() => store.state.productModule.products)
const filterProduct = computed(() => store.state.productModule.useProduct);
const route = useRoute()
const router = useRouter()
const {idCategory} = route.params
const categoryDetail = computed(() => store.state.categoryModule.categoryDetail);
const filteredProducts = computed(() => {
  return products.value.filter(product => product.categoryId == idCategory);
});
console.log(filteredProducts);
const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  })
  const formatEvaluate = (evaluate) => {
return parseFloat(evaluate).toFixed(1);
};
const formatLikes = (likes) => {
  if (likes >= 1000) {
    return (likes / 1000).toFixed(1) + 'k';
  }
  return likes;
};
onMounted(() =>{
    store.dispatch("fetchCategory")
    store.dispatch("fetchProduct")
    store.dispatch("fetchUseProduct", { indexPage: indexPage.value, condition: condition.value, inDe: inDe.value,});
    store.dispatch("fetchCategoryDetail",idCategory);
})
const seeDetail = (idProduct) => {
  router.push(`/user/product-detail/${idProduct}`)
}
</script>

<style scoped>
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
.userItem {
  background-color: white;
  text-align: center;
  width: 90%;
  border-radius: 5px;
  margin-top: 15px;
}
</style>