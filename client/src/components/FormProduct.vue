<template>
    <div class="modal">
      <div class="modal-content">
        <div class="font-bold text-[23px] mb-3">{{ isEdit ? 'Cập nhật sản phẩm' : 'Tạo sản phẩm mới' }}</div>
        <v-form @submit.prevent="submitProduct">
          <div class="flex gap-10 mb-5">
            <div class="w-[60%] flex flex-col gap-3">
              <v-text-field 
                v-model="newProduct.name" 
                :rules="[value => !!value || 'Tên sản phẩm không được để trống']" 
                label="Tên sản phẩm" 
                variant="outlined">
              </v-text-field>
  
              <v-text-field 
                v-model="newProduct.price" 
                type="number" 
                :rules="[
                    value => !!value || 'Đơn giá không được để trống', 
                    value => value >= 1000 || 'Giá bán phải lớn hơn hoặc bằng 1000'
                    ]"
                label="Giá bán" 
                variant="outlined">
              </v-text-field>
  
              <v-text-field 
                v-model="newProduct.stock" 
                type="number" 
                :rules="[value => value >= 1 || 'Số lượng phải lớn hơn hoặc bằng 1',
                        value => !!value || 'Số lượng không được để trống', 
                ]" 
                label="Số lượng" 
                variant="outlined">
              </v-text-field>
  
              <div class="form-group">
                <label for="category" class="form-label">Danh mục sản phẩm</label>
                <select @change="handleError" v-model="newProduct.categoryId" id="category" class="form-control">
                  <option v-for="category in categorys" :key="category.id" :value="category.id">
                    {{ category.name }}
                  </option>
                </select>
                <label v-if="errorSelect != null" class="text-red-500 text-xs">{{ errorSelect }}</label>
              </div>
  
              <v-textarea v-model="newProduct.description" 
              :rules="[value => !!value || 'Mô tả không được để trống']"
              label="Mô tả sản phẩm" variant="outlined"></v-textarea>
            </div>
  
           <div class="flex flex-col w-[40%]">
            <div class="w-[100%]">
          <label for="" class="text-gray-500">Hình ảnh</label>
          <div class="image-preview-container" style="max-width: 100%; overflow-x: auto; white-space: nowrap;">
            <div v-for="(img, index) in newProduct.image" :key="index" class="image-preview" style="display: inline-block;">
              <img :src="img" alt="" class="preview-img">
              <button @click="removeImage(index)" class="remove-btn">x</button>
            </div>
          </div>
          <input @change="handleGetFile" type="file" class="btnChooseimg" /> <br>
          <label v-if="errorImgInp != null" class="text-red-500 text-xs">{{ errorImgInp }}</label>
        </div>
        <div class="w-[100%] mt-5">
        <label for="" class="text-gray-500">Video sản phẩm</label>
        <div v-if="newProduct.video" class="video-preview-container">
          <video controls :src="newProduct.video" class="preview-video"></video>
          <button @click="removeVideo" class="remove-btn">x</button>
        </div>
        <input @change="handleGetVideoFile" type="file" class="btnChooseVideo" accept="video/*" />
        <label v-if="errorVideoInp != null" class="text-red-500 text-xs">{{ errorVideoInp }}</label>
      </div>
    </div>
        </div>
  
          <div>
            <button class="close-btn" @click="handleClose">Hủy</button>
            <v-btn type="submit" class="submit-btn">{{ isEdit ? 'Cập nhật' : 'Tạo sản phẩm' }}</v-btn>
          </div>
        </v-form>
      </div>
    </div>
  </template>
  
<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useStore } from 'vuex';
import Swal from 'sweetalert2';
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
import { storage } from '@/firebase';
import { useRoute } from 'vue-router';

const store = useStore();
const imgProduct = "https://lh6.googleusercontent.com/proxy/oHohk2TSOo4g-FDjMV1aK83Wn7nC1YQls3fhygsUgcK9xKVg9EsXRCCHYzf9UwNupkrAMKup2No0pdM951rL2Af0_SI6KY1W8fL42J0vMpujmV_BRT8yDw";

const categorys = computed(() => store.state.categoryModule.categorys);
const indexPage = ref(1);
const condition = ref("createAt");
const inDe = ref("asc");
const searchValue = ref("") 
const errorImgInp = ref('');
const errorSelect = ref('');
const imageUrl = ref('');
const file = ref(null);
const route = useRoute()
const { idProduct } = route.params;
const props = defineProps(['product', 'isEdit']); 
const emit = defineEmits(['closeForm', 'refetchData']);
const newProduct = reactive({
  name: props.product? props.product.name : "",
  categoryId: props.product? props.product.categoryId : null,  
  description: props.product? props.product.description : "",
  price: props.product? props.product.price : 0,
  stock: props.product? props.product.stock : 0,
  quantity: props.product? props.product.quantity : 0,
  likes: props.product? props.product.likes : 0,
  sold: props.product? props.product.sold :0,
  evaluate: props.product? props.product.evaluate : 5,
  video: props.product? props.product.video : "",
  image: props.product? props.product.image : [],
  createAt: props.product ? props.product.createAt : new Date().toLocaleDateString('vi-VN'),
  updateAt: new Date().toLocaleDateString('vi-VN'),
});
onMounted(() => {
  store.dispatch("fetchCategory");
});
const handleError = () =>{
    if(newProduct.categoryId){
        errorSelect.value = ''
    }
}
const removeVideo = () => {
  newProduct.video = "";
};

const errorVideoInp = ref('');
const handleGetVideoFile = async (e) => {
  const file = e.target.files[0];
  if (file) {
    try {
      const storageReference = storageRef(storage, `videos/${file.name}`);
      await uploadBytes(storageReference, file);
      newProduct.video = await getDownloadURL(storageReference);
      errorVideoInp.value = '';
    } catch (error) {
      console.error( error);
      errorVideoInp.value = 'Lỗi up video';
    }
  }
};

const handleGetFile = async (e) => {
  const file = e.target.files[0];
  imageUrl.value = URL.createObjectURL(file);
  try {
    const storageReference = storageRef(storage, `images/${file.name}`);
    await uploadBytes(storageReference, file);
    newProduct.image.push(await getDownloadURL(storageReference));
    errorImgInp.value = '';
  } catch (error) {
    console.error(error);
  }
};

const removeImage = (index) => {
  newProduct.image.splice(index, 1);
};
const handleClose = () => {
  emit('closeForm');
};

const submitProduct = async () => {
  if (newProduct.image.length === 0) {
    errorImgInp.value = 'Vui lòng chọn hình ảnh';
    return;
  }
  if(!newProduct.categoryId){
    errorSelect.value = 'Danh mục không được để trống';
    return;
  }
  if (!newProduct.name || 
    !newProduct.description || 
    newProduct.price < 1000 || 
    newProduct.stock < 1 || 
    !newProduct.categoryId) {
    return;
  }
  if (props.isEdit){
      store.dispatch("updateProduct",{ newProduct: newProduct, idProduct: idProduct }).then(() =>{
      store.dispatch("fetchFilterProduct", {indexPage: indexPage.value, condition: condition.value, inDe: inDe.value,searchValue: searchValue.value});
    })
    Swal.fire({
        title: 'Cập nhật thành công',
        text: 'Bạn đã cập nhật thành công',
        icon: 'success',
      });
  handleClose();
  emit("refetchData")
  }else{
  store.dispatch("fetchNewProduct",newProduct).then(() =>{
    store.dispatch("fetchFilterProduct", {indexPage: indexPage.value, condition: condition.value, inDe: inDe.value,searchValue: searchValue.value});
  })
  Swal.fire({
      title: 'Tạo thành công',
      text: 'Bạn đã tạo danh mục mới',
      icon: 'success',
    });
  handleClose();  
  }
};
</script>

  <style scoped>
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
  