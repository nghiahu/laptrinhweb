<template>
  <div>
    <Header></Header>
    <div class="flex items-center text-2xl font-semibold justify-center mt-10">
      <router-link to="login" class="font-semibold">Đăng nhập</router-link>|
      <router-link to="register" class="text-gray-500">Đăng ký</router-link>
    </div>
    <v-form @submit.prevent="handleLogin" class="w-[40%] ml-[30%] mt-7 mb-[100px] flex flex-col gap-4">
      <label for="" class="bg-yellow-200 pl-4 text-red-500" v-if="!errorLogin.value">{{ errorLogin }}</label>
      <v-text-field 
        v-model="LoginUser.email" 
        label="Email" variant="outlined" type="email">
      </v-text-field>

      <v-text-field 
        v-model="LoginUser.password" 
        label="Mật khẩu" variant="outlined" 
        :type="showPassword ? 'text' : 'password'">
      </v-text-field>

      <div>
        <v-checkbox v-model="showPassword" label="Hiện mật khẩu"></v-checkbox>
      </div>

      <div class="flex items-center gap-4">
        <button class="bg-orange-500 text-white px-3 py-3 rounded-md">Đăng nhập</button>
        <div>
          <div class="flex items-center">
            <div>Bạn đã có tài khoản?</div>
            <router-link to="/register" class="text-blue-500">Đăng ký!</router-link>
          </div>
          <div>
            <div class="flex items-center">
            <div>Bạn quên mật khẩu?</div>
            <router-link to="login" class="text-blue-500">Quên mật khẩu</router-link>
          </div>
          </div>
        </div>
      </div>
    </v-form>
    <FooterVue/>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import Header from '../layout/Header.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import FooterVue from '../layout/Footer.vue';
import Swal from 'sweetalert2';
const LoginUser = reactive({
  email:"",
  password:"",
})
const router = useRouter();
const store = useStore()
const showPassword = ref(false);
const errorLogin = ref("")
const users = computed(() => store.state.userModule.data);
  onMounted(() => {
    store.dispatch("fetchUser");
  })
  const handleLogin = () => {
  if (!LoginUser.email || !LoginUser.password) {
    errorLogin.value = true;
    return;
  }
  const user = users.value.find(user => user.email === LoginUser.email);
  if (user) {
    if (user.password === LoginUser.password) {
      if(!user.status){
        errorLogin.value = "Tài khoản của bạn đã bị khóa!"; 
      }else{Swal.fire({
        position: "top",
        icon: "success",
        title: "Đăng nhập thành công",
        showConfirmButton: false,
        timer: 1500
      });
      localStorage.setItem('isLoginUse', JSON.stringify(user.id));
      router.push('/')}
    }else {
      errorLogin.value = "Tài khoản hoặc mật khẩu không đúng vui lòng thử lại!"; 
    }
  } else {
    errorLogin.value = "Tài khoản hoặc mật khẩu không đúng vui lòng thử lại!"; 
  }
};

</script>

<style>

</style>
