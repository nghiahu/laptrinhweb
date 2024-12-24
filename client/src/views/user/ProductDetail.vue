<template>
    <div>
        <div class="containerUser">
        <Header></Header>
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
            <div class="font-bold text-black text-2xl">{{ productDetail.name }}</div>
              <div class="textBlock"><div class=" text-gray-700 text-lg">{{ formatEvaluate(productDetail.evaluate) }}</div>
              <v-rating readonly :length="5" :size="28" :model-value="productDetail.evaluate" color="warning" active-color="warning"/>
            </div>
            <div class="textBlock">Đã thích: <div class="ml-[2%] text-gray-700 text-lg">{{ formatLikes(productDetail.likes) }}</div></div>
            <div class="font-bold text-red-500 text-4xl">{{ VND.format(productDetail.price) }}</div>
            <div class="textBlock">Đã bán: <div class="ml-[3%] text-gray-700 text-lg">{{ formatLikes(productDetail.sold)}}</div></div>            
            <div class="textBlock">Kho: <div class="ml-[3%] text-gray-700 text-lg">{{ formatLikes(productDetail.stock) }}</div></div>
            <div class="textAreaBlock">Mô tả sản phẩm: 
              <v-textarea class="text-black" variant="outlined" disabled="" :model-value="productDetail.description"></v-textarea>
            </div>
          
            <div class="mt-2">
                <div class="product-controls">
                    <div class="action-buttons">
                    <button class="add-to-cart" @click="addToCart(productDetail)">Thêm Vào Giỏ Hàng</button>
                    </div>
                </div>
            </div>
          </div>
          </div>
          <div v-if="relatedProducts.length" class="related-products-section">
            <div class="font-bold text-3xl mx-[9%] pt-[30px] pb-5">Sản phẩm liên quan</div>
            <div class="related-products-list">
                <div>
                    <div class="tableUser">
                    <v-sheet :elevation="3" v-for="product in relatedProducts" :key="product.id" class="related-product-item">
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
            </div>

          <div class="commentBloclk">
            <div class="font-bold text-3xl mx-[9%] pt-10">Đánh giá sản phẩm</div>
            <div class="w-[82%] ml-[9%] flex flex-col">
              <button @click="handleComment" class="text-white w-[10%] bg-orange-400 px-2 py-2 rounded-md mb-2 mt-4">Viết đánh giá</button>
              <v-rating v-if="!isComment" hover :length="5" :size="32" v-model="newComment.evaluate" color="warning" active-color="warning"/>
              <div class="border">
              <v-textarea label="Viết đánh giá" :disabled="isComment"
              :rules="[value => !!value || 'Vui lòng thêm đánh giá']"
               v-model="newComment.body"></v-textarea>
                  <div class="flex flex-col w-[40%]" v-if="!isComment">
                <div class="w-[100%]">
              <label for="" class="text-gray-500">Hình ảnh</label>
              <div class="image-preview-container" style="max-width: 100%; overflow-x: auto; white-space: nowrap;">
                <div v-for="(img, index) in newComment.image" :key="index" class="image-preview" style="display: inline-block;">
                  <img :src="img" alt="" class="preview-img">
                  <button @click="removeImage(index)" class="remove-btn">x</button>
                </div>
              </div>
              <input @change="handleGetFile" type="file" class="btnChooseimg" /> <br>
            </div>
            <div class="w-[100%] mt-5">
            <label for="" class="text-gray-500">Video sản phẩm</label>
            <div v-if="newComment.video" class="video-preview-container">
              <video controls :src="newComment.video" class="preview-video"></video>
              <button @click="removeVideo" class="remove-btn">x</button>
            </div>
            <input @change="handleGetVideoFile" type="file" class="btnChooseVideo" accept="video/*" />
          </div>
        </div>
            </div>
            <button v-if="!isComment" @click="submitComment" class="bg-blue-400 py-2 w-[5%] rounded-md ml-[95%] mt-5">Gửi</button>
            </div>
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
        <FooterVue/>
      </div>
      <FormProduct v-if="isShowFrom" :product="productDetail" :isEdit="true" @closeForm="closeForm" @refetchData="refetchData"/>
    </div>
  </template>
  
  <script setup>
  import { BsArrow90degLeft } from '@kalimahapps/vue-icons';
  import { computed, onMounted, reactive, ref, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  import Swal from 'sweetalert2'
  import FormProduct from '@/components/FormProduct.vue';
  import Header from '../layout/Header.vue';
  import FooterVue from '../layout/Footer.vue';
  import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
  import { storage } from '@/firebase';
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
  const isComment = ref(true)
  const imageUrl = ref('');
  const isLogin = JSON.parse(localStorage.getItem("isLoginUse") || null)
  const VND = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
    const userLogin = computed(() => store.state.userModule.userLogin || null)
  onMounted(() => {
    store.dispatch("fetchProduct")
    store.dispatch("fetchCategory")
    store.dispatch("fetchUser");
    store.dispatch("fetchProductDetail",idProduct)
    store.dispatch("fetchComment",{idProduct:idProduct,indexPage:indexPage,filterStar:filterStar})
    store.dispatch("fetchAllComment",idProduct)
    store.dispatch("fetchUserLogin",isLogin)
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
  const relatedProducts = computed(() => {
  if (productDetail.value && products.value.length > 0) {
    return products.value.filter(product => 
      product.categoryId === productDetail.value.categoryId && product.id !== productDetail.value.id
    );
  }
  return [];
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
    const seeDetail = (idProduct) => {
    router.go(`user/product-detail/${idProduct}`)
    }
    const handleComment = () => {
      if(newComment.idUser == null){
        Swal.fire({
      title: "Chưa đăng nhập",
      text: "Bạn cần đăng nhập để đánh giá",
      icon: "warning",
    }).then(() => {
      router.push("/login");
    });
      }else{
        isComment.value = false
      }
      
    }
    const newComment = reactive({
      idProduct: idProduct,
      idUser: JSON.parse(localStorage.getItem("isLoginUse") || null),
      evaluate:5,
      body: "",
      image:[],
      video:"",
      createAt: new Date().toLocaleString('vi-VN', { hour12: false })
    })
    const handleGetVideoFile = async (e) => {
  const file = e.target.files[0];
  if (file) {
    try {
      const storageReference = storageRef(storage, `videos/${file.name}`);
      await uploadBytes(storageReference, file);
      newComment.video = await getDownloadURL(storageReference);
    } catch (error) {
      console.error( error);
    }
  }
};

const handleGetFile = async (e) => {
  const file = e.target.files[0];
  imageUrl.value = URL.createObjectURL(file);
  try {
    const storageReference = storageRef(storage, `images/${file.name}`);
    await uploadBytes(storageReference, file);
    newComment.image.push(await getDownloadURL(storageReference));
  } catch (error) {
    console.error(error);
  }
};
const removeImage = (index) => {
  newComment.image.splice(index, 1);
};
const submitComment = () => {
  if(newComment.body){
    Swal.fire({
    position: "top",
    icon: "success",
    title: "Your work has been saved",
    showConfirmButton: false,
    timer: 1500
  });
    store.dispatch("fetchNewComment",newComment).then(() => {
      store.dispatch("fetchComment",{idProduct:idProduct,indexPage:indexPage,filterStar:filterStar})
    })
    isComment.value = true
  }
}
  </script>
  
  <style scoped>
  .containerUser {
    background-color: rgb(245, 241, 241);
    max-height: 100vh;
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
  .product-controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
}

.quantity-selector {
  display: flex;
  align-items: center;
}

.quantity-selector button {
  width: 30px;
  height: 30px;
  font-size: 18px;
}

.quantity-selector input {
  width: 50px;
  text-align: center;
  margin: 0 5px;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.add-to-cart, .buy-now {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.add-to-cart {
  background-color: #fff;
  border: 1px solid #ff4500;
  color: #ff4500;
}

.buy-now {
  background-color: #ff4500;
  color: #fff;
}
.related-products-section {
  background-color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.related-products-list {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.related-product-item {
  width: 200px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
}

.related-product-img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
}

.related-product-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.related-product-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.related-product-price {
  font-size: 14px;
  color: #e74c3c;
}
.imgcate {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tableUser {
display: flex;
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
  .modal {
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
  
  .modal-content {
    background-color: white;
    padding: 20px;
    width: 70%;
    border-radius: 5px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
  
  .close-btn {
    padding: 8px 15px;
    border: 1px solid black;
    border-radius: 5px;
    background-color: white;
    margin-right: 1%;
    margin-left: 1%;
  }
  
  .submit-btn {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .btnChooseimg {
    border-radius: 5px;
    margin-top: 15px;
  }
  .form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.form-label {
  font-size: 14px;
  color: #9e9e9e; 
  margin-bottom: 5px;
}

.form-control {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #858181; 
  border-radius: 4px; 
  box-shadow: none;
  transition: border-color 0.3s ease-in-out;
}

.form-control:focus {
  border-color: #007bff; 
  outline: none;
}
.image-preview-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 10px;
  max-width: 400px;
  overflow-y: auto; 
  max-height: 210px; 
}

.image-preview {
  position: relative;
  width: 100px;
  height: 100px;
}

.preview-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
}

.remove-btn {
  position: absolute;
  top: 0;
  right: 0;
  background-color: red;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 14px;
  cursor: pointer;
  display: grid;
  place-content: center;
}
.preview-video {
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 5px;
}
.video-preview-container {
  position: relative;
  display: inline-block;
}

.remove-btn {
  position: absolute;
  top: 0;
  right: 0;
  background-color: red;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 14px;
  cursor: pointer;
  display: grid;
  place-content: center;
}
  </style>
  