<template>
  <div>
      <v-breadcrumbs :items="['Admin', 'Đơn hàng']"></v-breadcrumbs>
      <div class="containerUser">
        <div class="topCategory">
          <div class="selecDiv">
            <label for="" >Lọc: </label>
            <select class="selecSort" v-model="statusOrder">
              <option :value=0>Tất cả</option>
              <option :value=1>Đơn hàng mới</option>
              <option :value=2>Đã xác nhận</option>
              <option :value=3>Đóng hàng</option>
              <option :value=4>Đang giao hàng</option>
              <option :value=5>Giao hàng thành công</option>
              <option :value=6>Hoàn tất</option>
            </select>
          </div>
          <!-- Select -->
          <div class="selecDiv">
            <label for="">Sắp xếp:</label>
            <select class="selecSort" @change="handleChangeSort">
              <option value="createAt">Ngày tạo</option>
              <option value="totalPrice">Giá</option>
            </select>
            <AkArrowUp @click="handleChangeReverse" v-if="inDe == 'asc'"/>
            <AnOutlinedArrowDown @click="handleChangeReverse" v-else/>
          </div>
        </div>
        <div v-if="filterOrder">
        <table class="tableProduct">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã đơn hàng</th>
              <th>ID người dùng</th>
              <th>Trạng thái</th>
              <th>Tổng tiền</th>
              <th>Thời gian đặt hàng</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody v-for="(order,index) in filterOrder" :key="order.id">
            <td>{{ index + 1 + (indexPage - 1) * 6 }}</td>
            <td>{{ order.code }}</td>
            <td>{{ order.idUser }}</td>
            <td>{{ textStatus(order.status) }}</td>
            <td>{{ VND.format(order.totalPrice) }}</td>
            <td>{{ order.createAt }}</td>
            <td class="w-[20%]">
            <button class="bg-blue-600 mr-5" @click="handleSeeDetail(order.id)">Thông tin</button>
            <button class="bg-green-600" @click="showUpdateForm(order)">Cập nhật</button>
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
      <div v-else class="flex items-center justify-center">
        <v-progress-circular indeterminate :size="58" :width="5"></v-progress-circular>
      </div>
      </div>
      <FormOrder v-if="isShowFromAdd" :selectedOrder="selectedOrder" @closeForm="isShowFromAdd = false"  @updateStatus="updateStatus"/>
    </div>
  </template>
  
  <script setup>
  import FormProduct from '@/components/FormProduct.vue';
  import { computed, onMounted, ref, watch } from 'vue';
  import { useStore } from 'vuex';
  import { AkArrowUp } from '@kalimahapps/vue-icons';
  import { AnOutlinedArrowDown } from '@kalimahapps/vue-icons';
  import { useRouter } from 'vue-router';
  import Swal from 'sweetalert2'
  import 'sweetalert2/src/sweetalert2.scss'
  import FormOrder from '@/components/FormOrder.vue';
  const store = useStore();
  const isShowFromAdd = ref(false)
  const router = useRouter()
  const statusOrder = ref(0)
  const order = computed(() => store.state.orderModule.orders)
  const countPage = computed(() => Math.ceil(order.value.length / 6));
  const filterOrder = computed(() => store.state.orderModule.filterOrder)
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  const indexPage = ref(1)
  const condition = ref("createAt");
  const inDe = ref("asc");
  const searchValue = ref("")
  onMounted(()=>{
    store.dispatch("fetchOrder")
    store.dispatch("fetchFilterOrder",{ indexPage: indexPage.value, condition: condition.value, inDe: inDe.value, searchValue: searchValue.value, status: statusOrder.value })
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
  };
  watch([indexPage, condition, inDe ,statusOrder], () => {
    store.dispatch("fetchFilterOrder",{ indexPage: indexPage.value, condition: condition.value, inDe: inDe.value, searchValue: searchValue.value, status: statusOrder.value })
  });
const handleSeeDetail = (idOrder) =>{
  router.push(`order-detail/${idOrder}`)
}
const textStatus = (status) =>{
  if(status === 1){
    return "Đơn hàng mới"
  }else if(status === 2){
    return "Đã xác nhận"
  }else if(status === 3){
    return "Đóng hàng"
  }else if(status === 4){
    return "Đang giao hàng"
  }else if(status === 5){
    return "Giao hàng thành công"
  }else if(status === 6){
    return "Hoàn tất"
  }
}
const selectedOrder = ref(null);

const showUpdateForm = (order) => {
  selectedOrder.value = order;
  isShowFromAdd.value = true;
};
const updateStatus = (newStatus) => {
  store.dispatch("fetchUpdateStatus",newStatus);
  isShowFromAdd.value = false
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
    padding: 10px 15px;
    text-align: center;
    font-size: 14px;
  }
  
  th {
    font-weight: bold;
    padding-top: 12px;
    padding-bottom: 12px;
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
    border-top: 1px solid #ccc;
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
  </style>