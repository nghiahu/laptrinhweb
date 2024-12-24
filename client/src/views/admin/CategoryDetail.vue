<template>
    <div>
      <v-breadcrumbs :items="['Admin', 'Danh mục','Thông tin chi tiết']"></v-breadcrumbs>
      <div class="containerUser">
        <div class="m-2 w-[7.5%]" @click="handleReturn">
          <button class="flex items-center gap-2 text-blue-600"><BsArrow90degLeft />Quay lại</button>
        </div>
        <div v-if="categoryDetail" class="flex h-[88%] gap-[3%] mt-[3%]">
          <div class="ml-[10%]">
            <img class="w-[250px]" :src="categoryDetail.image" alt="">
          </div>
          <div class="block_info">
            <div class="font-bold">Tên danh mục: <input type="text" disabled :value="categoryDetail.name" class="typeText ml-[3%]"></div>
            <div class="font-bold flex flex-col">Mô tả: <textarea type="text" disabled :value="categoryDetail.description" class="typeTextArea mt-2"></textarea></div>
            <div class="font-bold">Cập nhật: <label class="ml-2">{{ categoryDetail.updateAt }}</label></div>
            <div class="font-bold">Ngày tạo: <label class="ml-2">{{ categoryDetail.createAt }}</label></div>
            <div>
              <button class="bg-red-500 px-4 py-2 rounded-md text-white" @click="delCategory(categoryDetail)">Xóa</button> <br>
              <button class="bg-blue-500 px-4 py-2 rounded-md text-white mt-3" @click="editCategory">Cập nhật</button>
            </div>
          </div>
        </div>
        <div v-else class="flex items-center justify-center h-[70%]">
          <v-progress-circular indeterminate :size="73" :width="8"></v-progress-circular>
        </div>
      </div>
      <CreateCategoryForm
        v-if="showEditForm"
        :category="categoryDetail"
        :isEdit="true"
        @closeForm="closeForm"
        @refetchData="refetchData"
      />
    </div>
  </template>
  
  <script setup>
  import { computed, watch, ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  import CreateCategoryForm from '@/components/CreateCategoryForm.vue';
  import { BsArrow90degLeft } from '@kalimahapps/vue-icons';
  import Swal from 'sweetalert2';
  
  const store = useStore();
  const route = useRoute();
  const router = useRouter();
  const categorys = computed(()=> store.state.categoryModule.categorys);
  const categoryDetail = computed(() => store.state.categoryModule.categoryDetail);
  const { idCategory } = route.params;
  const showEditForm = ref(false);
  
  const editCategory = () => {
    showEditForm.value = true;
  };
  
  const closeForm = () => {
    showEditForm.value = false;
  };
  
  onMounted(() => {
    store.dispatch("fetchCategory")
    store.dispatch("fetchCategoryDetail",idCategory);
  });
  
  const handleReturn = () => {
    router.go(-1);
  };  
  const delCategory = (category) => {
    Swal.fire({
      title: "Bạn có chắc chắn không?",
      text: `Bạn có muốn xóa danh mục "${category.name}"!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có, xóa nó!"
    }).then((result) => {
      if (result.isConfirmed) {
        store.dispatch("deleteCategory", category).then(() => {
            handleReturn();
          store.dispatch("fetchFilterCategory");
          Swal.fire({
            title: "Đã xóa!",
            text: "Bạn đã xóa thành công",
            icon: "success"
          });
        });
      }
    });
  };
  
  const refetchData = () => {    
      store.dispatch("fetchCategoryDetail",idCategory)
      router.go();
  };
  </script>
  
  
  <style scoped>
  .containerUser {
    height: 75vh;
    border: 1px solid rgb(187, 182, 182);
    margin: 0px 3%;
    border-radius: 15px;
  }
  .block_info{
    border:1px solid rgb(179, 174, 174);
    height: 94%;
    width: 62%;
    border-radius: 5%;
    padding: 2%;
    display: flex;
    flex-direction: column;
    gap: 3%;
  }
  .typeText{
    font-weight: 400;
    border: 1px solid rgb(158, 154, 154);
    padding-left: 1%;
    width: 60%;
  }
  .typeTextArea{
    font-weight: 400;
    border: 1px solid rgb(158, 154, 154);
    padding-left: 1%;
    width: 80%;
    margin-bottom: 10px;
    height: 120px;
  }
  </style>
  