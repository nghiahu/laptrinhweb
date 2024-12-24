<template>
    <div>
      <v-breadcrumbs :items="['Admin', 'Đơn hàng','Thông tin chi tiết']"></v-breadcrumbs>
      <div class="containerUser">
        <div class="m-2 w-[7.5%]" @click="handleReturn">
          <button class="flex items-center gap-2 text-blue-600"><BsArrow90degLeft />Quay lại</button>
        </div>
        <div v-if="orderDetail">
          <div class="text-2xl font-bold ml-[15%]">Thông tin đơn hàng</div>
          <div class="listInfo">
            <div class="listInfoItem">Mã đơn hàng: <div class="ml-[6%]">{{ orderDetail.code }}</div></div>
            <div class="listInfoItem">Tổng tiền:  <div class="ml-[9%]">{{ VND.format(orderDetail.totalPrice) }}</div></div>
            <div class="listInfoItem">Id Người đặt: <div class="ml-[7%]">{{ orderDetail.idUser }}</div></div>
            <div class="listInfoItem">Tên người đặt: <div class="ml-[6%]">{{ orderDetail.receiveName }}</div></div>
            <div class="listInfoItem">Địa chỉ giao hàng: <div class="ml-[3%]">{{ orderDetail.receiveAddress }}</div></div>
            <div class="listInfoItem">Trạng thái: <div class="ml-[9.5%]">{{ textStatus(orderDetail.status) }}</div></div>
            <div class="listInfoItem">Ghi chú: <div class="ml-[12%] w-[45%]">{{ orderDetail.note }}</div></div>
            <div class="listInfoItem">Thời gian đặt hàng: <div class="ml-[2%]">{{ orderDetail.createAt }}</div></div>
          </div>
          <div class=" ml-[60%]">
          <button class="bg-blue-500 text-white p-2 rounded-md mr-5" @click="showUpdateForm(orderDetail)">Cập nhật</button>
          <button class="bg-red-500 text-white p-2 rounded-md" @click="cancelOrder(orderDetail)">Hủy</button>
        </div>
        <div class="scol">
        <table class="table">
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Đơn giá</th>
                    <th>Tổng giá sản phẩm</th>
                </tr>
            </thead>
            <tbody v-for="(product,index) in orderDetail.order_details" :key="product" class="listOrderProduct">
                <tr>
                <td>{{ index + 1 }}</td>
                <td>{{ product.nameProduct }}</td>
                <td>{{ product.quantity }}</td>
                <td>{{ VND.format(product.price) }}</td>
                <td>{{ VND.format(product.quantity*product.price) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
        </div>
        <div v-else>
          <v-progress-circular class="ml-[45%]" indeterminate :size="73" :width="8"></v-progress-circular>
        </div>
      </div>
      <FormOrder v-if="isShowFromAdd" :selectedOrder="selectedOrder" @closeForm="isShowFromAdd = false"  @updateStatus="updateStatus"/>
    </div>
  </template>
  
  <script setup>
  import { computed, watch, ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  import { BsArrow90degLeft } from '@kalimahapps/vue-icons';
  import Swal from 'sweetalert2';
  import FormOrder from '@/components/FormOrder.vue';
  const store = useStore();
  const route = useRoute();
  const router = useRouter();
  const { idOrder } = route.params;
  const orderDetail = computed(() => store.state.orderModule.orderDetail)
  onMounted(() => {
    store.dispatch("fetchOrderDetai",idOrder)
  });
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  })
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
  const handleReturn = () => {
    router.go(-1);
  };
const selectedOrder = ref(null);
const isShowFromAdd = ref(false)

const showUpdateForm = (order) => {
  selectedOrder.value = order;
  isShowFromAdd.value = true;
};
const updateStatus = (newStatus) => {
  store.dispatch("fetchUpdateStatus",newStatus);
  isShowFromAdd.value = false
}
  const cancelOrder = (order) => {
  Swal.fire({
  title: "Bạn có chắc chắn không?",
  text: `Bạn có muốn hủy đơn hàng "${order.code}"!`,
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Có ,hủy !"
}).then((result) => {
  if (result.isConfirmed) {
    store.dispatch("cancelOrder", order.id)
    .then(() => {
        router.go(-1)
      store.dispatch("fetchUpdateStatus",newStatus);
    });
    Swal.fire({
      title: "Đã hủy!",
      text: "Bạn đã hủy thành công",
      icon: "success"
    });
  }
});
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
    width: 50%;
  }
  .typeTextx{
    font-weight: 400;
    border: 1px solid rgb(158, 154, 154);
    padding-left: 1%;
    width: 100%;
    margin-bottom: 10px;
  }
  .listInfo{
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 15px;
    margin-left: 26%;
  }
  .listInfoItem{
    display: flex;
    font-weight: bold;
  }
  .table{
    width: 90%;
    border-collapse: collapse;
    margin-left: 5%;
    margin-top: 2%;
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
  .scol{
    max-height: 160px;
    display: block;
    overflow-y: auto;
  }
  </style>
  