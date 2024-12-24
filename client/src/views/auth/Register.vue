<template>
    <div>
      <Header></Header>
      <div class="flex items-center text-2xl font-semibold justify-center mt-10">
        <router-link to="login" class="text-gray-500">Đăng nhập</router-link>|
        <router-link to="register" class="font-semibold">Đăng ký</router-link>
      </div>
      <v-form @submit.prevent="handleRegester" class="w-[40%] ml-[30%] mt-7 mb-[100px] flex flex-col gap-4">
        <v-text-field 
          v-model="newUser.fullName" 
          :rules="[value => !!value || 'Họ tên không được để trống']"
          label="Họ và tên" variant="outlined">
        </v-text-field>
  
        <v-text-field 
          v-model="newUser.userName" 
          :rules="[value => !!value || 'Tên đăng nhập không được để trống']"
          label="Tên đăng nhập" variant="outlined">
        </v-text-field>
  
        <v-text-field 
          v-model="newUser.email" 
          :rules="[value => !!value || 'Email không được để trống', 
                  value => /.+@.+\..+/.test(value) || 'Email không đúng định dạng']"
          label="Email" variant="outlined" type="email">
        </v-text-field>
  
        <v-text-field 
          v-model="newUser.password" 
          :rules="[value => !!value || 'Mật khẩu không được để trống']"
          label="Mật khẩu" variant="outlined" 
          :type="showPassword ? 'text' : 'password'">
        </v-text-field>
  
        <v-text-field 
         v-model="confirmPass" 
          :rules="[value => value === newUser.password || 'Mật khẩu không trùng khớp']"
          label="Nhập lại mật khẩu" variant="outlined" 
          :type="showPassword ? 'text' : 'password'">
        </v-text-field>
  
        <div>
          <v-checkbox v-model="showPassword" label="Hiện mật khẩu"></v-checkbox>
        </div>
  
        <div class="flex items-start gap-4">
          <button class="bg-orange-500 text-white px-3 py-3 rounded-md">Đăng ký</button>
          <div>
            <div>Bạn đã có tài khoản?</div>
            <router-link to="login" class="text-blue-500">Đăng nhập tại đây!</router-link>
          </div>
        </div>
      </v-form>
      <FooterVue/>
    </div>
  </template>
  
  <script setup>
  import { computed, onMounted, reactive, ref } from 'vue';
  import Header from '../layout/Header.vue';
  import Swal from 'sweetalert2'
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import FooterVue from '../layout/Footer.vue';
  const newUser = reactive({
    userName: "",
    fullName: "",
    email: "",
    address: [],
    phoneNumber: "",
    password: "",
    status: true,
    role: false,
    avatar: "",
    lovelyId: [],
    cart: [],
    createAt: new Date().toLocaleDateString('vi-VN'),
    updateAt: new Date().toLocaleDateString('vi-VN')
  });
  const router = useRouter();
  const store = useStore()
  const confirmPass = ref("");
  const showPassword = ref(false);
  const users = computed(() => store.state.userModule.data);
  onMounted(() => {
    store.dispatch("fetchUser");
  })
  const handleRegester = () => {
    if(!newUser.userName || !newUser.fullName || !newUser.email || !newUser.password || newUser.password != confirmPass.value){
      return
    }
    const emailExists = users.value.some(user => user.email === newUser.email);
    if (emailExists) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Email đã được đăng ký",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    if(/.+@.+\..+/.test(newUser.email)){
      Swal.fire({
      position: "top",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500
    });
    store.dispatch("fetchNewUser",newUser)
    router.push("/login")
    }
  }
  </script>
  
  <style>

  </style>
  