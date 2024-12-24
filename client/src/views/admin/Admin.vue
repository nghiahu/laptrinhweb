<template>
  <div class="contaner">
    <div class="nav">
        <img :src="urlLogo" alt="logo" class="logoImg">
        <div class="listNav">
          <router-link exact-active-class="active" class="listNavItem" to="/admin/dashboard"><MdRoundSpaceDashboard/>Quản lý</router-link>
          <router-link active-class="active" :class="route.name === 'category-detail'? 'listNavItem active' : 'listNavItem'" to="/admin/category"><AnFilledDatabase/>Danh mục</router-link>
          <router-link active-class="active" :class="route.name === 'product-detail'? 'listNavItem active' : 'listNavItem'" to="/admin/product"><AnOutlinedShopping/>Sản phẩm</router-link>
          <router-link active-class="active" :class="route.name === 'user-detail'? 'listNavItem active' : 'listNavItem'" to="/admin/user"><AkPerson/>Người dùng</router-link>
          <router-link active-class="active" :class="route.name === 'order-detail'? 'listNavItem active' : 'listNavItem'" to="/admin/order"><FaCartFlatbed/>Đơn hàng</router-link>
        </div>
        <router-link active-class="active" class="setting" to="/admin/setting"><AnFilledSetting/>Cài đặt</router-link>
        <hr class="hr">
        <div class="logout" @click="handleLogout"><AkSignOut/>Đăng xuất</div>
    </div>
<div class="mainContainer">
    <div class="header">
      <div class="titleHeaderList">
      <div v-if="route.name === 'dashboard'" class="titleHeader">Welcome back</div>
      <div v-if="route.name === 'category'" class="titleHeader">Danh mục</div>
      <div v-if="route.name === 'product'" class="titleHeader">Sản phẩm</div>
      <div v-if="route.name === 'user'" class="titleHeader">Người dùng</div>
      <div v-if="route.name === 'order'" class="titleHeader">Đơn hàng</div>
      <div v-if="route.name === 'setting'" class="titleHeader">Cài đặt</div>
      <div v-if="route.name === 'user-detail'" class="titleHeader">Thông tin người dùng</div>
    </div>
      <div class="blockInput">
        <BxSearchAlt class="iconInp"/>
        <input type="text" class="inp" placeholder="Tìm kiếm" v-model="searchValue">
      </div>
      <div class="notification">
        <BsBellFill class="bell"/>
        <div class="numBenoti">0</div>
      </div>
      <div class="avata">
        <img :src="avataUrl" alt="avata" class="avateImg">
      </div>
      <div class="loginName">
        Ngô Hữu Nghĩa
      </div>
    </div>
    <div class="main">
          <router-view></router-view>
    </div>
  </div>
  </div>
</template>

<script setup>
import { MdRoundSpaceDashboard } from '@kalimahapps/vue-icons';
import { AnFilledDatabase } from '@kalimahapps/vue-icons';
import { AnOutlinedShopping } from '@kalimahapps/vue-icons';
import { AkPerson } from '@kalimahapps/vue-icons';
import { FaCartFlatbed } from '@kalimahapps/vue-icons';
import { AnFilledSetting } from '@kalimahapps/vue-icons';
import { AkSignOut } from '@kalimahapps/vue-icons';
import { BxSearchAlt } from '@kalimahapps/vue-icons';
import { BsBellFill } from '@kalimahapps/vue-icons';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
const indexPage = ref(1);  
const condition = ref('createAt'); 
const inDe = ref('asc');
    const urlLogo = "../../logo01.png"
    const avataUrl = "../../avatar-trang-4.jpg"
    const store = useStore();
    const route = useRoute();
    const router = useRouter()
    const handleLogout = () => {
      localStorage.removeItem("isLogin")
      router.push("/loginAdmin")
    }
    let isNavigation = false;
    const statusOrder = (0)
  onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload);
  router.beforeEach((to, from, next) => {
    isNavigation = true;
    next();
    });
  });
  onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  });
  function handleBeforeUnload(event) {
    const isRefresh = performance.navigation.type === performance.navigation.TYPE_RELOAD;
    if (!isNavigation && !isRefresh) {
      localStorage.clear();
    }
  }
  const searchValue = ref("")
  watch(route, () => {
    searchValue.value = ''; 
});
watch(searchValue, (newValue) => {
  store.dispatch("fetchUserPagination", {
    indexPage: indexPage.value,
    condition: condition.value,
    inDe: inDe.value,
    searchValue: newValue  
  });
  store.dispatch("fetchFilterCategory", {
    indexPage: indexPage.value, 
    condition: condition.value, 
    inDe: inDe.value, 
    searchValue: searchValue.value
  });
    store.dispatch("fetchFilterProduct", {
    indexPage: indexPage.value, 
    condition: condition.value, 
    inDe: inDe.value, 
    searchValue: searchValue.value});
    store.dispatch("fetchFilterOrder",{ 
      indexPage: indexPage.value, 
      condition: condition.value, 
      inDe: inDe.value, searchValue: 
      searchValue.value, 
      status: statusOrder })

});
</script>

<style scoped>
.contaner{
  display: flex;
}
.nav{
  background-color: black;
  width: 20%;
  height: 100vh;
}
.logoImg{
  width: 100%;
  height: 160px;
}
.listNav{
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.listNavItem{
  font-size: 21px;
  display: flex;
  align-items: center;
  gap: 2%;
  padding-left: 15%;
  color: #5c5c5c;
}
.listNavItem:hover{
  color: white;
  
}
.setting{
  font-size: 21px;
  display: flex;
  align-items: center;
  gap: 2%;
  padding-left: 15%;
  color: #706f6f;
  margin-top: 60%;
}
.logout{
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 2%;
  padding-left: 15%;
  color: #706f6f;
}
.hr{
  color: white;
  width: 100%;
  margin: 5% 0%; 
}
.active{
  color: white;
  border-left: 5px solid white;
  padding-left: 20%;
}
.mainContainer{
width: 80%;
}
.header{
  width: 100%;
  height: 110px;
  border-left: none;
  display: flex;
  align-items: center;
  background-color: rgb(231, 231, 231);
}
.titleHeaderList{
  padding-left: 5%;
  width: 40%;
}
.titleHeader{
  font-size: 28px;
  font-weight: 700;
}
.blockInput{
  position: relative;
  height: 40%;
  width: 30%;
  margin-left: 8%;
}
.iconInp{
  position: absolute;
  top: 25%;
  left: 2%;
  font-size: 21px;
}
.inp{
  border:1px solid rgb(200, 193, 193);
  width: 100%;
  outline: none;
  height: 100%;
  border-radius: 50px;
  padding-left: 9%;
}
.notification{
  margin-left: 2%;
  position: relative;
}
.bell{
font-size: 24px;
}
.numBenoti{
  position: absolute;
  bottom: 10px;
  left: 50%;
  background-color: red;
  color: white;
  padding: 1px 6px;
  border-radius: 50%;
}
.avata{
  width: 4%;
  margin-left: 2%;

}
.avateImg{
  border-radius: 50%;
}
.loginName{
  margin-left: 1%;
  font-size: 14px;
  font-weight: 600;
}
.main{
  height: 85vh;
}
</style>