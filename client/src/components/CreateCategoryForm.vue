<template>
  <div class="modal">
    <div class="modal-content">
      <div class="font-bold text-[23px] mb-3">{{ isEdit ? 'Cập nhật danh mục' : 'Tạo danh mục' }}</div>
      <v-form @submit.prevent="submitCategory">
        <div class="flex gap-10 mb-10">
          <div class="w-[60%] flex flex-col gap-6">
            <v-text-field
              label="Tên danh mục"
              v-model="categoryData.name"
              :rules="[value => !!value || 'Tên danh mục không được để trống']"
              variant="outlined"
              class="w-[70%]"
            ></v-text-field>
            <v-textarea
              label="Mô tả danh mục"
              v-model="categoryData.description"
              variant="outlined"
              :rules="[value => !!value || 'Mô tả không được để trống']"
              class="w-[100%]"
            ></v-textarea>
          </div>
          <div class="w-[20%]">
            <img class="w-[100%]" :src="imageUrl ? imageUrl : (isEdit? categoryData.image : imgCategory)" alt="">
            <input @change="handleGetFile" type="file" class="btnChooseimg" />
            <label v-if="errorImgInp != null" class="text-red-500 text-xs">
              {{ errorImgInp }}
            </label>
          </div>
        </div>
        <div>
          <button class="close-btn" @click="handleClose">Hủy</button>
          <v-btn type="submit" class="submit-btn">{{ isEdit ? 'Cập nhật danh mục' : 'Tạo danh mục' }}</v-btn>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
import { storage } from '@/firebase';
import { useStore } from 'vuex';
import Swal from 'sweetalert2';
import { useRoute } from 'vue-router';

const imgCategory = "https://lh6.googleusercontent.com/proxy/oHohk2TSOo4g-FDjMV1aK83Wn7nC1YQls3fhygsUgcK9xKVg9EsXRCCHYzf9UwNupkrAMKup2No0pdM951rL2Af0_SI6KY1W8fL42J0vMpujmV_BRT8yDw";
const emit = defineEmits(['closeForm','refetchData']);
const props = defineProps(['category', 'isEdit']); 
const route = useRoute()
const categoryData = reactive({
  name: props.category ? props.category.name : '',
  description: props.category ? props.category.description : '',
  image: props.category ? props.category.image : '',
  status: true,
  createAt: props.category ? props.category.createAt : new Date().toLocaleDateString('vi-VN'),
  updateAt: new Date().toLocaleDateString('vi-VN'),
});
const indexPage = ref(1);
const condition = ref("createAt");
const inDe = ref("asc");
const searchValue = ref("") 
const errorImgInp = ref('');
const imageUrl = ref('');
const file = ref(null);
const store = useStore();
const { idCategory } = route.params;
const handleClose = () => {
  emit('closeForm');
};

const handleGetFile = (e) => {
  imageUrl.value = URL.createObjectURL(e.target.files[0]);
  file.value = e.target.files[0];
  errorImgInp.value = '';
};

const submitCategory = async () => {
  if (!file.value && !categoryData.image) {
    errorImgInp.value = 'Vui lòng chọn hình ảnh';
    return;
  } else if (file.value) {
    try {
      const storageReference = storageRef(storage, `images/${file.value.name}`);
      await uploadBytes(storageReference, file.value);
      categoryData.image = await getDownloadURL(storageReference);
    } catch (error) {
      console.log(error);
      return;
    }
  }

  if (!categoryData.name || !categoryData.description) {
    return;
  }

  if (props.isEdit) {
    Swal.fire({
      title: 'Cập nhật thành công',
      text: 'Danh mục đã được cập nhật',
      icon: 'success',
    });
    store.dispatch('updateCategory', {categoryData: categoryData,idCategory: idCategory}); 
    emit("refetchData");
  } else {
    store.dispatch('fetchNewCategory', categoryData); 
    Swal.fire({
      title: 'Tạo thành công',
      text: 'Bạn đã tạo danh mục mới',
      icon: 'success',
    });
  }
  store.dispatch("fetchFilterCategory",  {indexPage: indexPage.value, condition: condition.value, inDe: inDe.value,searchValue: searchValue.value});
  handleClose();
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
</style>
