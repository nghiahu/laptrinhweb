<template>
  <div>
      <v-breadcrumbs :items="['Admin', 'Sản phẩm']"></v-breadcrumbs>
      <div class="containerUser">
        <div class="topCategory">
          <button class="btnAppCategory" @click="togleForm"><AkShippingBox01/>Thêm sản phẩm</button>
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
        </div>
  
        <table class="tableProduct">
          <thead>
            <tr>
              <th>STT</th>
              <th>Hình ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Đơn giá</th>
              <th>Ngày tạo</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody v-for="(product,index) in filterProduct" :key="product.id">
            <td>{{ index + 1 + (indexPage - 1) * 4 }}</td>
            <td class="flex justify-center"><img class="w-[10%]" :src="product.image[0]" alt=""></td>
            <td class="product-name">{{ product.name }}</td>
            <td>{{ VND.format(product.price) }}</td>
            <td>{{ product.createAt }}</td>
            <td class="w-[20%]">
            <button class="bg-blue-600 mr-5" @click="handleSeeDetail(product.id)">Thông tin</button>
            <button class="bg-red-600" @click="delProuct(product)">Xóa</button>
          </td>
          </tbody>
        </table>
        <div class="pagination">
          <v-pagination
            v-model="indexPage"
            :length="countPage"
            :total-visible="7"
          ></v-pagination>
        </div>
      </div>
      <FormProduct v-if="isShowFromAdd" @closeForm="togleForm" />
    </div>
  </template>
  
  <script setup>
  import FormProduct from '@/components/FormProduct.vue';
  import { computed, onMounted, ref, watch } from 'vue';
  import { useStore } from 'vuex';
  import { BxSolidLeftArrow } from "@kalimahapps/vue-icons";
  import { BxSolidRightArrow } from "@kalimahapps/vue-icons";
  import { AkArrowUp } from '@kalimahapps/vue-icons';
  import { AnOutlinedArrowDown } from '@kalimahapps/vue-icons';
  import { AkShippingBox01 } from '@kalimahapps/vue-icons';
  import { useRouter } from 'vue-router';
  import Swal from 'sweetalert2'
  import 'sweetalert2/src/sweetalert2.scss'
  const store = useStore();
  const isShowFromAdd = ref(false)
  const products = computed(() => store.state.productModule.products)
  const countPage = computed(() => Math.ceil(products.value.length / 4));
  const filterProduct = computed(() => store.state.productModule.filterProduct);
  const router = useRouter()
  
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  const togleForm = () => {
    isShowFromAdd.value = !isShowFromAdd.value
  }
  
  const indexPage = ref(1)
  const condition = ref("createAt");
  const inDe = ref("asc");
  const searchValue = ref("")
  onMounted(()=>{
    store.dispatch("fetchProduct")
    store.dispatch("fetchFilterProduct",  {indexPage: indexPage.value, condition: condition.value, inDe: inDe.value, searchValue: searchValue.value});
  })
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
  watch([indexPage, condition, inDe], () => {
    store.dispatch("fetchFilterProduct",  {indexPage: indexPage.value, condition: condition.value, inDe: inDe.value, searchValue: searchValue.value});
  });
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
      if (filterProduct.value.length === 0 && indexPage.value > 1) {
        indexPage.value--; 
      }
      store.dispatch("fetchFilterProduct", { indexPage: indexPage.value, condition: condition.value, inDe: inDe.value, searchValue: searchValue.value });
    });
    Swal.fire({
      title: "Đã xóa!",
      text: "Bạn đã xóa thành công",
      icon: "success"
    });
  }
});
};
const handleSeeDetail = (idProduct) =>{
  router.push(`product-detail/${idProduct}`)
}
   </script>
  
  <style scoped>
  .containerUser {
    height: 74vh;
    border: 1px solid #bbb;
    margin: 20px 3%;
    border-radius: 15px;
    padding: 20px;
    background-color: #f9f9f9;
  }
  
  .btnAppCategory {
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: #1b6de9;
    color: white;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btnAppCategory:hover {
    background-color: #145bb2;
  }
  
  .topCategory {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
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
  }
  
  .selecSort {
    outline: none;
    padding: 5px;
    border: none;
    background-color: transparent;
  }
  
  .tableProduct {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    max-height:200px;
  }
  
  th,td {
    border: 1px solid #ccc;
    padding: 10px 15px;
    text-align: center;
    font-size: 14px;
  }
  
  th {
    background-color: #363739;
    color: white;
    font-weight: bold;
  }
  
  td img {
    width: 50px;
    height: 55px;
    object-fit: cover;
    border-radius: 5px;
  }
  
  td {
    background-color: white;
    color: #333;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  th {
    padding-top: 12px;
    padding-bottom: 12px;
    color: white;
  }
  
  button {
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
  }
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 91%;
    left: 50%;
  }
  .product-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
}
  </style>