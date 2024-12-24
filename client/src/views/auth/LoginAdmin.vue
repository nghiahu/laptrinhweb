<template>
  <div class='backgroudLoginAdmin'>
            <div class='titleLogin'>
              <img class="iconTitleLogin" :src="urlLogo" alt="logo">
              Đăng nhập quản lý</div>
            <form class='formLoginn' @submit.prevent="handleSubmit">
                <div v-if="errorLogin !== ''" class='errorLogin'>{{ errorLogin }}</div>
                <div class='deginInp'>
                    <MdSharpEmail class="iconInp"/>
                    <input class='inpLogin' type="email" placeholder='Email' v-model="emailLogin"/>
      
                </div>
                <div class='deginInp'>
                    <CaPassword class="iconInp"/>
                    <AkEyeClosed class="eyeInp" v-if="!seePass" @click="handleseePassWord"/>
                    <AnFilledEye class="eyeInp" v-else @click="handleseePassWord"/>
                    <input class='inpLogin' :type="seePass ? 'text' : 'password'" placeholder='Mật khẩu' v-model="passwordLogin"/>
                </div>
                <div class="forgotPass">Quên mật khẩu?</div>
                <div class='divBtnLogin'>
                    <button class='btnLogin'>Đăng nhập</button>
                </div>
            </form>
        </div>
</template>

<script setup>
 import { MdSharpEmail } from '@kalimahapps/vue-icons';
 import { CaPassword } from '@kalimahapps/vue-icons';
 import { AkEyeClosed } from '@kalimahapps/vue-icons';
 import { AnFilledEye } from '@kalimahapps/vue-icons';
 import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Swal from 'sweetalert2'
const store = useStore();

 const urlLogo = "../favicon.ico"
 const seePass = ref(false)
 const router = useRouter()
 const handleseePassWord=()=>{
  seePass.value = !seePass.value
}
const users = computed(() => store.state.userModule.data);
const errorLogin = ref('');
onMounted(()=>{
    store.dispatch("fetchUser")
})
const emailLogin = ref("")
const passwordLogin = ref("")

const handleSubmit = () => {
    const indexLogin = users.value.findIndex(user => user.email === emailLogin.value);
    if(indexLogin !== -1){
        if(users.value[indexLogin].role && users.value[indexLogin].password === passwordLogin.value){
        Swal.fire({
        position: "center",
        icon: "success",
        title: "Bạn đã đăng nhập thành công",
        showConfirmButton: false,
        timer: 1500
        });
        localStorage.setItem("isLogin",JSON.stringify(users.value[indexLogin].id))
        router.push("/admin")
        }else{
            errorLogin.value = 'Tài khoản hoặc mật khẩu không đúng vui lòng thử lại'
        }
    }else{
        errorLogin.value = 'Tài khoản hoặc mật khẩu không đúng vui lòng thử lại'
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.backgroudLoginAdmin {
    display: flex;
    justify-content: center;
    height: 100vh;
    padding-left: 10%;
    flex-direction: column;
    gap: 30px;
    background-image: url('https://cellphones.com.vn/sforum/wp-content/uploads/2024/03/hinh-nen-ngau-74.jpg');  
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
}

.forgotPass{
  margin-left: 70%;
  padding-top: 10px;
  font-size: 14px;
  color: rgb(44, 114, 220);
}
.titleLogin {
    color: rgb(230, 223, 223);
    font-weight: 700;
    font-size: 40px;
    display: flex;
    padding-left: 1%;
    gap: 1%;
    width: 100%;
}
.iconTitleLogin {
    width: 50px; 
    height: auto; 
}

.formLoginn {
    border: 1px solid rgb(128, 126, 126);
    border-radius: 5px;
    width: 39%;
    background-color: white;
}

.errorLogin {
    margin-left: 7%;
    margin-top: 5%;
    width: 80%;
    font-size: 16px;
    padding: 5px;
    text-decoration: underline;
    color: red;
    background-color: rgb(235, 235, 187);
}

.errorLoginBlock {
    margin-left: 7%;
    margin-top: 5%;
    width: 80%;
    font-size: 16px;
    padding: 5px;
    text-decoration: underline;
    color: red;
    background-color: rgb(235, 235, 187);
    display: none;
}

.deginInp {
    margin-left: 5%;
    position: relative;
}
.error {
    margin-left: 2%;
    margin-top: 10px;
    font-size: 13px;
    text-decoration: underline;
    color: red;
    position: absolute;
    display: none;
}
.errorBlock {
    margin-left: 2%;
    margin-top: 10px;
    font-size: 13px;
    text-decoration: underline;
    color: red;
    position: absolute;
    display: block;
}

.iconInp {
    position: absolute;
    top: 40px;
    color: rgb(60, 59, 58);
    left: 0%;
}
.eyeInp{
  position: absolute;
    top: 40px;
    color: rgb(60, 59, 58);
    left: 85%;
    font-size: 18px;
}
.inpLogin {
    width: 90%;
    margin-top: 30px;
    height: 35px;
    border: none;
    border-bottom: 1px solid rgb(70, 68, 68);
    padding-left: 6%;
    outline: none;
}
.remember {
    margin-top: 30px;
    margin-left: 5%;
    font-size: 14px;
    display: flex;
    gap: 5px;
}
.navigation {
    margin-top: 20px;
    margin-left: 30%;
    font-size: 15px;
}
.link {
    text-decoration: none;
}
.nav {
    margin-top: 20px;
    margin-left: 25%;
    font-size: 15px;
}
.hr {
    width: 60%;
    margin-left: 20%;
    margin-top: 20px;
}
.divBtnLogin {
    display: flex;
    justify-content: center;
    margin-top: 30px;
}
.btnLogin {
    padding: 10px 8%;
    border: none;
    background: linear-gradient(to left, rgb(52, 53, 55) 50%, white 50%);
    background-size: 200% 100%;
    color: white;
    font-weight: 600;
    margin-bottom: 30px;
    border: 1px solid white;
    background-position: right bottom;
    transition: background-position 0.5s;
}
.btnLogin:hover {
    background-color: white;
    color: rgb(52, 53, 55);
    font-weight: 600;
    border: 1px solid rgb(52, 53, 55);
    background-position: left bottom;
}

</style>