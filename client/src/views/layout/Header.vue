<template>
    <header class="header">
      <div class="header-top">
        <div class="header-info">
          <span>
            Hotline: <strong>0908427608</strong> (9h - 12h, 13h30 - 20h)
          </span>
          <div @click="contact" class="contact-link">Liên hệ</div>
        </div>
        <div class="header-notifications">
          <div class="notification-icon">
            <BsBellFill class="text-xl" />
            <span class="notification-count">5</span>
            <span>Thông báo</span>
          </div>
        </div>
      </div>
      <div class="header-bottom">
        <router-link to="/" class="Logo">
          <img :src="urlLogo" alt="" />
        </router-link>
        <div class="inpSearchBlock">
          <input type="text" class="inpSearch" placeholder="Tìm kiếm ..."  v-model="searchValue"/>
          <AkSearch class="ml-2" />
        </div>
        <div class="flex text-2xl gap-[20px]">
          <div class="user-menu-wrapper">
            <BxUser />
            <div class="user-dropdown">
              <ul v-if="isLogin !== null">
                <li><router-link to="">Tài Khoản Của Tôi</router-link></li>
                <li><router-link to="">Đơn Mua</router-link></li>
                <li><button @click="logout">Đăng Xuất</button></li>
              </ul>
              <ul v-else>
                <li><router-link to="/login">Đăng nhập</router-link></li>
              </ul>
            </div>
          </div>
          <div @click="toCart" class="flex relative">
            <AkCart />
          </div>
          <AkHeart/>
        </div>
      </div>
      <nav class="menu-container" v-if="route.name != 'login' && route.name != 'register'">
        <ul class="menu">
          <li class="menu-item" v-for="item in menuItems" :key="item.label">
            <router-link to="">{{ item.label }}</router-link>
            <div v-if="item.hasDropdown"><AkChevronDown /></div>
            <ul v-if="item.hasDropdown" class="dropdown-menu">
              <li><router-link to="#">Submenu 1</router-link></li>
              <li><router-link to="#">Submenu 2</router-link></li>
              <li><router-link to="#">Submenu 3</router-link></li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  </template>
  
  <script setup>
  import { BsBellFill } from '@kalimahapps/vue-icons';
  import { AkSearch } from '@kalimahapps/vue-icons';
  import { BxUser } from '@kalimahapps/vue-icons';
  import { AkCart } from '@kalimahapps/vue-icons';
  import { AkChevronDown } from '@kalimahapps/vue-icons';
  import { AkHeart } from '@kalimahapps/vue-icons';
  import { computed, onMounted, ref, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  import Swal from 'sweetalert2';
  
  const indexPage = ref(1);  
  const condition = ref('createAt'); 
  const inDe = ref('asc');
  const urlLogo = "../../logo02-removebg-preview.png";
  const route = useRoute()
  const router = useRouter()
  const store = useStore()
  const isLogin = JSON.parse(localStorage.getItem("isLoginUse") || null)
  const menuItems = [
    { label: "MÔ HÌNH", hasDropdown: true },
    { label: "DANH MỤC", hasDropdown: true },
    { label: "HÃNG SẢN XUẤT", hasDropdown: true },
    { label: "ƯU ĐÃI", hasDropdown: true },
    { label: "TIN TỨC", hasDropdown: false },
    { label: "TRỢ GIÚP", hasDropdown: true }
  ];
  const logout = () => {
    localStorage.removeItem("isLoginUse")
    router.push("/login")
  }
  onMounted(() => {
  
  })
  const toCart = () => {
    if(isLogin){
      router.push("/user/cart")
    }else{
      Swal.fire({
      title: "Chưa đăng nhập",
      text: "Bạn cần đăng nhập để mua hàng",
      icon: "warning"
    }).then(() =>{
      router.push("/login")
    })
    }
  }
  const contact = () => {
    router.push("/user/contact")
  }
  const searchValue = ref("")
  watch(route, () => {
    searchValue.value = ''; 
});
watch(searchValue, (newValue) => {
  store.dispatch("fetchUseProduct", { indexPage: indexPage.value, condition: condition.value, inDe: inDe.value,searchValue:searchValue.value});
});
  </script>
  
  <style scoped>
  .header {
    background-color: #fff;
  }
  
  .header-top {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    background-color: #333;
    color: #fff;
  }
  
  .header-info {
    display: flex;
    align-items: center;
  }
  
  .header-info .contact-link {
    margin-left: 20px;
    color: #fff;
    text-decoration: none;
  }
  
  .contact-link {
    border-left: 1px solid white;
    padding-left: 15px;
  }
  
  .header-notifications {
    display: flex;
    align-items: center;
  }
  
  .notification-icon {
    position: relative;
    margin-right: 20px;
    display: flex;
    align-items: center;
    gap: 9px;
  }
  
  .notification-count {
    position: absolute;
    top: -8px;
    right: 75px;
    background-color: red;
    color: white;
    border-radius: 50%;
    padding: 2% 6px;
    font-size: 12px;
  }
  
  .header-bottom {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid #ccc;
  }
  
  .logo {
    font-size: 24px;
    font-weight: bold;
    text-decoration: none;
    color: #5a3e36;
  }
  
  .Logo {
    width: 16%;
  }
  
  .inpSearch {
    width: 95%;
    height: 45px;
    outline: none;
  }
  
  .inpSearchBlock {
    border: 1px solid gray;
    display: flex;
    align-items: center;
    width: 50%;
    border-radius: 50px;
    padding-left: 3%;
  }
  
  .menu-container {
    display: flex;
    justify-content: center;
    background-color: white;
    margin-bottom: 20px;
  }
  
  .menu {
    list-style-type: none;
    padding: 0;
    display: flex;
    gap: 2rem;
    width: 100%;
    justify-content: center;
    gap: 5%;
  }
  
  .menu-item {
    position: relative;
    display: flex;
    align-items: center;
  }
  
  .menu-item a {
    text-decoration: none;
    font-size: 1rem;
    font-weight: 600;
    font-size: 14px;
  }
  
  .menu-item span {
    margin-left: 5px;
    font-size: 0.8rem;
  }
  
  .menu-item:hover a {
    color: black;
  }
  
  .dropdown-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: white;
    padding: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    list-style: none;
    width: max-content;
    z-index: 100;
  }
  
  .menu-item:hover .dropdown-menu {
    display: block;
  }
  
  .dropdown-menu li {
    margin: 5px 0;
  }
  
  .dropdown-menu li a {
    text-decoration: none;
    color: black;
    font-size: 14px;
  }
  
  .dropdown-menu li a:hover {
    color: #5a3e36;
  }
  .user-menu-wrapper {
  position: relative;
}

.user-dropdown {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 5px;
  z-index: 100;
  width: 150px;
}

.user-menu-wrapper:hover .user-dropdown {
  display: block;
}

.user-dropdown ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.user-dropdown li {
  margin: 5px 0;
}

.user-dropdown li a, .user-dropdown li button {
  text-decoration: none;
  color: black;
  font-size: 14px;
  width: 100%;
  display: block;
  background: none;
  border: none;
  text-align: left;
  padding: 5px 0;
  cursor: pointer;
}

.user-dropdown li a:hover, .user-dropdown li button:hover {
  color: #5a3e36;
}

  </style>
  