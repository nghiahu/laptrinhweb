<template>
  <div>
    <v-breadcrumbs :items="['Admin', 'Sản phẩm','Thông tin chi tiết']"></v-breadcrumbs>
    <div class="containerUser">
      <div class="m-2 w-[7.5%]" @click="handleReturn">
        <button class="flex items-center gap-2 text-blue-600">
          <BsArrow90degLeft /> Quay lại
        </button>
      </div>
      <div v-if="productDetail">
        <div class="infoProduct">
          <div class="imgProduct">
            <div v-if="selectedMediaIsVideo" class="blockVideo">
              <video controls class="blockVideo" :src="selectedImage"></video>
            </div>
            <div v-else>
              <img class="blockImage" :src="selectedImage" alt="Product Image" />
            </div>
            <div class="thumbnail-row">
              <video v-if="productDetail.video" @click="selectVideo" class="selecImg" :src="productDetail.video" alt="Video Thumbnail"></video>
              <img v-for="(image,index) in productDetail.image" :key="index" class="selecImg" :src="image" alt="Thumbnail"  @click="selectImage(image)"
              />
            </div>
          </div>
          <div class="TextInfoProduct">
            <div class="textBlock">Tên sản phẩm: <div class="ml-[5%] font-bold text-black text-xl">{{ productDetail.name }}</div></div>
            <div class="textBlock">Đánh giá: <div class="ml-[10%] text-gray-700 text-lg">{{ formatEvaluate(productDetail.evaluate) }}</div>
            <v-rating readonly :length="5" :size="28" :model-value="productDetail.evaluate" color="warning" active-color="warning"/>
          </div>
          <div class="textBlock">Đã thích: <div class="ml-[11%] text-gray-700 text-lg">{{ formatLikes(productDetail.likes) }}</div></div>
          <div class="textBlock">Đơn giá: <div class="ml-[11%] font-bold text-red-500 text-3xl">{{ VND.format(productDetail.price) }}</div></div>
          <div class="textBlock">Đã bán: <div class="ml-[13%] text-gray-700 text-lg">{{ formatLikes(productDetail.sold)}}</div></div>
          <div class="textBlock">Danh mục: <div class="ml-[10%] text-gray-700 text-lg">{{ getCategoryName(productDetail.categoryId) }}</div></div>
          <div class="textBlock">Kho: <div class="ml-[16%] text-gray-700 text-lg">{{ formatLikes(productDetail.stock) }}</div></div>
          <div class="textAreaBlock">Mô tả sản phẩm: 
            <v-textarea class="text-black" variant="outlined" disabled="" :model-value="productDetail.description"></v-textarea>
          </div>
          <div class="textBlock">Ngày tạo: <div class="ml-[14%] text-gray-700 text-sm">{{ productDetail.createAt }}</div></div>
          <div class="textBlock">Ngày cập nhật: <div class="ml-[9%] text-gray-700 text-sm">{{ productDetail.updateAt }}</div></div>
        
          <div class="mt-2">
            <button class="px-3 bg-blue-500 text-white py-1 rounded-md mr-5" @click="closeForm">Cập nhật</button>
            <button class="px-3 bg-red-500 text-white py-1 rounded-md" @click="delProuct(productDetail)">Xóa</button>
          </div>
        </div>
        </div>

        <div class="commentBloclk">
          <div class="font-bold text-3xl mx-[9%] pt-10">Đánh giá sản phẩm</div>
          <div class="filterTable">
            <div class="relative w-[30%]">
             <div class="w-[150px] absolute top-[50%] left-[5%]"><v-rating readonly :length="5" :size="28" :model-value="productDetail.evaluate" color="warning" active-color="warning"/></div> 
            <div class="text-orange-500 flex items-end gap-1 m-[10%] text-xl"><div class="text-3xl">{{ formatEvaluate(productDetail.evaluate) }}</div> trên 5</div>
          </div>

          <div class="flex gap-[15%] w-[70%] mt-5 flex-col">
            <div class="flex gap-[3%]">
            <button :class="isImage? 'selecItemActive' : 'selecItem'" @click="setNullStar">Tất cả</button>
            <button 
            @click="setStar(6-n)" 
            :class="filterStar === 6-n ? 'selectItemActive' : 'selecItem'" 
            v-for="n in 5" 
            :key="n">
            {{ 6 - n }} sao
          </button>          
          </div>
            <div>
              <button class="selectItem">Có video/hình ảnh</button>
            </div>
          </div>
          </div>

          <div v-for="comment in commentFilter" :key="comment.id" class="comment-item">
            <div class="blockComment">
              <div class="flex min-h-[100px] gap-3 mx-3 mt-3">
                <v-avatar :image="getAvataName(comment)" size="55"></v-avatar>
                <div class="relative w-[50%]">
                  <label for="">{{ getUserName(comment) }}</label>
                  <label class="absolute top-6 left-0">
                    <v-rating readonly :length="5" :size="23" :model-value="comment.evaluate" color="warning" active-color="warning" />
                  </label>
                  <div class="ml-[1%] mt-6">{{ comment.createAt }}</div>
                </div>
              </div>
              <div class="ml-[7%] mb-[20px]">{{ comment.body }}</div>
              <div v-if="comment.video" class="media-content mb-[10px]">
                <video controls class="comment-video" :src="comment.video"></video>
              </div>
              <div v-if="comment.image.length" class="media-content thumbnail-row">
                <img 
                  v-for="(img, index) in comment.image"
                  :key="index"
                  class="comment-image"
                  :src="img"
                  alt="Comment Image"
                  @click="showImg(img)"
                />
              </div>
              <div class="delete-comment ml-[90%] mb-[20px]">
                <button @click="deleteComment(comment)" class="px-3 bg-red-500 text-white py-1 rounded-md">
                  Xóa
                </button>
              </div>
            </div>
          </div>
          <div class="pagination">
        <v-pagination
          v-model="indexPage"
          :length="countPage"
          :total-visible="7"
        ></v-pagination>
      </div>
        </div>

      </div>
      <div v-else class="flex items-center justify-center">
        <v-progress-circular indeterminate :size="58" :width="5"></v-progress-circular>
      </div>
    </div>
    <FormProduct v-if="isShowFrom" :product="productDetail" :isEdit="true" @closeForm="closeForm" @refetchData="refetchData"/>
  </div>
</template>

<script setup>
import { BsArrow90degLeft } from '@kalimahapps/vue-icons';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Swal from 'sweetalert2'
import FormProduct from '@/components/FormProduct.vue';
const store = useStore();
const route = useRoute();
const router = useRouter();
const { idProduct } = route.params;
const products = computed(() => store.state.productModule.products)
const users = computed(() => store.state.userModule.data);
const productDetail = computed(() => store.state.productModule.productDetail)
const categorys = computed(()=> store.state.categoryModule.categorys);
const comments = computed(() => store.state.commentModule.comments)
const commentFilter = computed(() => store.state.commentModule.filterComment)
const countPage = computed(() => Math.ceil(comments.value.length / 6));
const selectedImage = ref(null); 
const selectedMediaIsVideo = ref(false); 
const isShowFrom = ref(false) 
const indexPage = ref(null);
const filterStar = ref(null);
const isImage = ref(true)
const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
onMounted(() => {
  store.dispatch("fetchProduct")
  store.dispatch("fetchCategory")
  store.dispatch("fetchUser");
  store.dispatch("fetchProductDetail",idProduct)
  store.dispatch("fetchComment",{idProduct:idProduct,indexPage:indexPage,filterStar:filterStar})
  store.dispatch("fetchAllComment",idProduct)
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
const getCategoryName = (categoryId) => {
  const category = categorys.value.find(cat => cat.id === categoryId);
  return category ? category.name : 'Không rõ';
};
watch(productDetail, () => {
  if (productDetail) {
      selectedImage.value = productDetail.value.image[0];
      selectedMediaIsVideo.value = false;  
  }
});
watch(indexPage, () => {
  store.dispatch("fetchComment",{idProduct:idProduct,indexPage:indexPage,filterStar:filterStar})
});
const closeForm = () => {
  isShowFrom.value = !isShowFrom.value;
  };
const selectImage = (image) => {
  selectedImage.value = image;
  selectedMediaIsVideo.value = false;  
};

const selectVideo = () => {
  selectedImage.value = productDetail.value.video;
  selectedMediaIsVideo.value = true;  
};

const handleReturn = () => {
  router.go(-1);
};
const delProuct = (product) => {
  Swal.fire({
  title: "Bạn có chắc chắn không?",
  text: `Bạn có muốn xóa sản phẩm "${product.name}"!`,
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Có ,xóa nó!"
}).then((result) => {
  if (result.isConfirmed) {
    store.dispatch("deleteProduct", product)
    .then(() => {
      router.push("/admin/product");
      store.dispatch("fetchFilterProduct", { indexPage: indexPage.value, condition: condition.value, inDe: inDe.value, searchValue: searchValue.value });
    });
    Swal.fire({
      title: "Đã xóa!",
      text: "Bạn đã xóa thành công",
      icon: "success"
    });
  }
});
}
const refetchData = () =>{  
  store.dispatch("fetchProductDetail",idProduct)
}
const getUserName = (comment) => {
  const user = users.value.find(user => user.id == comment.idUser);
  return user ? user.userName : "Không rõ";
};

const getAvataName = (comment) => {
  const user = users.value.find(user => user.id == comment.idUser);  
  return user.avata ? user.avata : "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg";
};

const deleteComment = (comment) => {
  Swal.fire({
    title: "Bạn có chắc chắn không?",
    text: "Bạn có muốn xóa đánh giá này?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Có, xóa nó!"
  }).then((result) => {
    if (result.isConfirmed) {
      store.dispatch("deleteComment", comment.id)
      .then(() => {
        if (commentFilter.value.length === 0 && indexPage.value > 1) {
        indexPage.value--; 
      }
      store.dispatch("fetchComment",{idProduct:idProduct,indexPage:indexPage,filterStar:filterStar})
      Swal.fire({
          title: "Đã xóa!",
          text: "Bình luận đã được xóa thành công.",
          icon: "success"
        });
      });
    }
  });
};
const showImg = (url) => {
  Swal.fire({
  imageUrl: url,
  imageHeight: 500,
  imageAlt: "A tall image"
});
}
const setStar = (star) => {
  filterStar.value = star;
  indexPage.value = 1;  
  isImage.value = false
  store.dispatch("fetchComment", { idProduct: idProduct, indexPage: indexPage.value, filterStar: filterStar.value });
};
const setNullStar = () =>{
  filterStar.value = null
  isImage.value = true
  store.dispatch("fetchComment", { idProduct: idProduct, indexPage: indexPage.value, filterStar: filterStar.value });
}
</script>

<style scoped>
.containerUser {
  background-color: rgb(245, 241, 241);
  max-height: 77vh;
  overflow-y: auto;
}
.infoProduct {
  height: auto;
  display: flex;
  justify-content: center;
  padding: 0px 3%;
  background-color: white;
  padding-top: 20px;
  padding-bottom: 10px;
}
.imgProduct {
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.TextInfoProduct {
  width: 60%;
}
.blockImage, .blockVideo {
  object-fit: cover;
  width: 100%;
  max-height: 420px;
  height: 380px; 
}
.thumbnail-row {
  display: flex;
  justify-content: start;
  gap: 10px; 
  padding: 10px 14px;
  width: 415px;
  max-width: 100%; 
  overflow-x: auto;
  white-space: nowrap; 
}
.selecImg {
  width: 100px;
  height: 100px;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.2s;
}
.selecImg:hover {
  transform: scale(1.1);
}
.textBlock{
  display: flex;
  align-items: center;
}
.TextInfoProduct{
  display: flex;
  gap: 5px;
  flex-direction: column;
  margin-left: 40px;
  color: gray;
}
.commentBloclk{
  background-color: white;
  margin-top: 20px;
}
.filterTable{
  border:1px solid rgb(232, 225, 225);
  height: 130px;
  margin: 10px 9%;
  background-color: rgb(253, 250, 244);
  display: flex;
}
.selecItem{
  border:1px solid rgb(210, 210, 209);
  height: 40px;
  width: 70px;
}
.selectItem{
  border:1px solid rgb(210, 210, 209);
  height: 40px;
  width: 140px;
}
.selecItemActive{
  border:1px solid  rgb(221, 93, 34);
  height: 40px;
  width: 70px;
}
.selectItemActive{
  border:1px solid rgb(221, 93, 34);
  height: 40px;
  width: 70px;
}
.blockComment{
  border-top:1px solid rgb(196, 194, 194);
  border-bottom:1px solid rgb(196, 194, 194);
  margin: 0px 9%;
}
.media-content {
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  overflow-x: auto;
  max-width:500px;
  padding-bottom: 10px;
  padding-left: 40px;
}

.comment-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  flex: 0 0 auto;
}


</style>
