<template>
  <div>
    <v-breadcrumbs :items="['Admin', 'Người dùng','Thông tin chi tiết']"></v-breadcrumbs>
    <div class="containerUser">
      <div class="m-2 w-[7.5%]" @click="handleReturn">
        <button class="flex items-center gap-2 text-blue-600"><BsArrow90degLeft />Quay lại</button>
      </div>
      <div v-if="userDetail" class="flex h-[88%] gap-[3%] mt-[3%]">
        <div class="ml-[10%] ">
          <img class="w-[250px]" :src="userDetail.avata ? userDetail.avata : avata" alt="">
          <div class="text-center mt-2 font-bold text-[20px]">{{ userDetail.fullName }}</div>
          <div class="text-center">@{{ userDetail.userName }}</div>
        </div>
        <div class="block_info">
        <div class="font-bold">Email: <input type="text" disabled :value="userDetail.email" class="typeText ml-[10%]"></div>
          <div class="flex font-bold">Địa chỉ: 
          <div v-if="userDetail.address && userDetail.address.length > 0">
            <div class="max-h-[110px] overflow-y-auto ml-[33%] w-[180%]">
              <div v-for="(address, index) in userDetail.address" :key="index" class="flex gap-2 w-full">
                <input type="text" disabled :value="address.body" class="typeTextx w-full">
              </div>
            </div>
          </div>
          <div v-else class="ml-[10%]">
            <label>*Chưa có thông tin*</label>
          </div>
        </div>
        <div class="font-bold">Số điện thoại: 
          <input v-if="userDetail.phoneNumber" :value="userDetail.phoneNumber" disabled class="typeText ml-[1.5%]"/>
          <label v-else class="ml-[2.5%]">*Chưa có thông tin*</label>
        </div>
        <div class="font-bold">Chức vụ: <input type="text" disabled :value="userDetail.role? 'Quản lý' : 'Người dùng'" class="typeText ml-[7%]"></div>
        <div class="font-bold">Cập nhật: <label class="ml-[6%]">{{ userDetail.updateAt }}</label></div>
        <div class="font-bold">Ngày tạo: <label class="ml-[6%]">{{ userDetail.createAt }}</label></div>

        <div class="m-6">
        <button v-if="!userDetail.role" :class="userDetail.status? 'bg-green p-2 rounded-md mb-2' : 'bg-red p-2 rounded-md mb-2'" @click="handleChangeStatus(userDetail)">{{ userDetail.status? 'Khóa' : 'Mở khóa' }}</button> <br>
      </div>

      </div>
      </div>
      <div v-else>
        <v-progress-circular indeterminate :size="73" :width="8"></v-progress-circular>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { BsArrow90degLeft } from '@kalimahapps/vue-icons';
import Swal from 'sweetalert2';
const store = useStore();
const route = useRoute();
const router = useRouter();
const users = computed(() => store.state.userModule.data);
const { idUser } = route.params;
const userDetail = ref(null);
const avata = "../../avatar-trang-4.jpg"
onMounted(() => {
  store.dispatch('fetchUser');
});

watch(users, (newUsers) => {
  if (newUsers.length > 0) {
    const indexUser = newUsers.findIndex(user => user.id == idUser);
    console.log(indexUser);
    
    if (indexUser !== -1) {
      userDetail.value = newUsers[indexUser];
    }
  }
});

const handleReturn = () => {
  router.go(-1);
};
const handleChangeStatus = (user) => {
  Swal.fire({
    title: user.status ? `Bạn có chắc muốn chặn người dùng "${user.userName}" không?` : `Bạn có chắc muốn bỏ chặn người dùng "${user.userName}" không?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: user.status ? "Có, chặn người dùng" : "Có, bỏ chặn"
  }).then((result) => {
    if (result.isConfirmed) {
      store.dispatch("updateUserStatus", user).then(() => {
        userDetail.value.status = !userDetail.value.status;
        Swal.fire({
          title: userDetail.value.status ? "Đã mở khóa" : "Đã khóa",
          text: userDetail.value.status ? "Bạn đã mở khóa thành công" : "Bạn đã khóa thành công",
          icon: "success"
        });
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
</style>
