<template>
  <div class="modal-overlay">
    <div class="modal-container">
      <div class="font-bold text-xl mb-5">Cập nhật trạng thái đơn hàng</div>
      <label for="status">Trạng thái đơn hàng:</label>
      <select class="select" v-model="selectedStatus.status">
        <option :value=1>Đơn hàng mới</option>
        <option :value=2>Đã xác nhận</option>
        <option :value=3>Đóng hàng</option>
        <option :value=4>Đang giao hàng</option>
        <option :value=5>Giao hàng thành công</option>
        <option :value=6>Hoàn tất</option>
      </select>
      <div class="modal-actions">
        <button class="bg-blue-500 rounded-md" @click="updateOrderStatus">Cập nhật</button>
        <button class="bg-red-500 rounded-md" @click="closeForm">Đóng</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(['selectedOrder']);
const emit = defineEmits(['closeForm', 'updateStatus']);
const selectedStatus = ref(props.selectedOrder); 

const updateOrderStatus = () => {
  emit('updateStatus', selectedStatus.value); 
};

const closeForm = () => {
  emit('closeForm');
};
</script>

  
  <style scoped>
  .modal-overlay {
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

.modal-container {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
}

.modal-actions {
  margin-top: 20px;
}

button {
  margin: 5px;
  padding: 10px;
  cursor: pointer;
}
.select{
  border:1px solid gray;
  border-radius: 50px;
  padding-left: 3%;
}
  </style>
  