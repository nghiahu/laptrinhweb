<template>
  <div>
    <v-breadcrumbs :items="['Admin', 'Người dùng']"></v-breadcrumbs>
    <div class="containerUser">
      <div class="blockSort flex items-center gap-2">
    
        <div class="spanSort">Sắp xếp:</div>
        <select name="" id="" class="selecSort" @change="handleChangeSort">
          <option value="createAt">Ngày tạo</option>
          <option value="userName">Tên</option>
          <option value="role">Vai trò</option>
        </select>
    
        <AkArrowUpDown @click="handleChangeReverse" class="reverse"/>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên đăng nhập</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Ngày tạo</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody
          v-for="(user, index) in userPaination"
          :key="user.id"
          class="tableborder"
        >
          <td>{{ index + 1 + (indexPage - 1) * 5 }}</td>
          <td>{{ user.userName }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role ? "Quản lý" : "Người dùng" }}</td>
          <td>{{ user.createAt }}</td>
          <td>
            <div v-if="user.role">
              <button
                className="bg-black text-white p-1 rounded-lg"
                @click="handleDetail(user.id)"
              >
                Chi tiết
              </button>
            </div>
            <div v-else className="flex gap-5 justify-center">
              <button
                className="bg-black text-white p-1 rounded-lg"
                @click="handleDetail(user.id)"
              >
                Chi tiết
              </button>
              <div
                @click="handleChangeStatus(user)"
                :class="`flex items-center ${
                  user.status
                    ? 'bg-green-500 justify-start'
                    : 'bg-red-500 justify-end'
                } w-16 h-8 rounded-3xl`"
              >
                <div class="h-8 w-8 bg-white rounded-full"></div>
              </div>
            </div>
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
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import { BxSolidLeftArrow } from "@kalimahapps/vue-icons";
import { BxSolidRightArrow } from "@kalimahapps/vue-icons";
import { useRouter } from "vue-router";
import { AkArrowUpDown } from '@kalimahapps/vue-icons';
const store = useStore();
const router = useRouter();
const users = computed(() => store.state.userModule.data);
const userPaination = computed(() => store.state.userModule.dataPagination);
const countPage = computed(() => Math.ceil(users.value.length / 5));
const indexPage = ref(1);
const condition = ref("createAt");
const inDe = ref("asc");
const searchValue = ref("")
const handleChangeReverse = () => {
  if(inDe.value === 'asc'){
    inDe.value = 'desc'
  }else{
    inDe.value = 'asc'
  }
}
const handleChangeSort = (event) => {
  condition.value = event.target.value;
  store.dispatch("fetchUserPagination",  {indexPage: indexPage.value, condition: condition.value, inDe: inDe.value,searchValue: searchValue.value});
};

onMounted(() => {
  store.dispatch("fetchUser");
  store.dispatch("fetchUserPagination",  {indexPage: indexPage.value, condition: condition.value, inDe: inDe.value,searchValue: searchValue.value});
});
const handleChangeStatus = (user) => {
  Swal.fire({
    title: user.status
      ? `Bạn có chắc muốn chặn người dùng "${user.userName}" không`
      : `Bạn có chắc muốn bỏ chặn người dùng "${user.userName}" không`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#FFFFFF",
    cancelButtonColor: "#d33",
    confirmButtonText: user.status ? "Có, chặn người dùng" : "Có, bỏ chặn",
  }).then((result) => {
    if (result.isConfirmed) {
      store.dispatch("updateUserStatus", user);
      store.dispatch("fetchUserPagination",  {indexPage: indexPage.value, condition: condition.value, inDe: inDe.value, searchValue: searchValue.value});
      Swal.fire({
        title: user.status ? "Đã chặn" : "Đã mở",
        text: user.status
          ? "Bạn đã chặn thành công"
          : "Bạn đã bỏ chặn thành công",
        icon: "success",
      });
    }
  });
};
watch([indexPage, condition, inDe], () => {
  store.dispatch("fetchUserPagination",  {indexPage: indexPage.value, condition: condition.value, inDe: inDe.value, searchValue: searchValue.value});
});
const handleDetail = (idUer) => {
  router.push(`/admin/user-detail/${idUer}`);
};
</script>

<style scoped>
.containerUser {
  height: 75vh;
  border: 1px solid rgb(187, 182, 182);
  margin: 0px 3%;
  border-radius: 15px;
}
.selecSort {
  border: 1px solid black;
  width: 14%;
  margin-left: 83%;
  height: 30px;
  border-radius: 15px;
  padding-left: 6.5%;
  outline: none;
}
.spanSort {
  position: absolute;
  left: 84%;
  top: 10%;
}
.blockSort {
  position: relative;
  margin-top: 2%;
}
.table {
  width: 95%;
  margin-left: 2.5%;
  margin-top: 30px;
}

th,
td {
  text-align: center;
}
th {
  padding-bottom: 20px;
  font-weight: 700;
  font-size: 16px;
  width: auto;
  border-bottom: 1px solid gray;
}
td {
  padding-top: 20px;
  border-top: 1px solid black;
  padding-bottom: 20px;
}
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 89%;
  left: 47%;
}
.reverse:active{
  background-color: rgb(189, 192, 189);
}
</style>
