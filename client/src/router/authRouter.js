const authRouter = [
    {
        path: "/loginAdmin",
        name: "loginAdmin",
        component:()=> import (/* webpackChunkName: "loginAdmin" */"@/views/auth/LoginAdmin.vue")
    },
    {
        path: "/login",
        name: "login",
        scrollBehavior() {
            return { top: 0 };
          },
        component:()=> import (/* webpackChunkName: "login" */"@/views/auth/Login.vue")
    },
    {
        path: "/register",
        name: "register",
        scrollBehavior(to,from) {
            return { top: 0 };
          },
        component:()=> import (/* webpackChunkName: "register" */"@/views/auth/Register.vue")
    },
]
export default authRouter;