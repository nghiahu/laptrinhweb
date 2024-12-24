
const adminRouter = [
    {
        path: "/admin",
        name: "admin",
        beforeEnter: (to, from, next) =>{
          const isLogin = JSON.parse(localStorage.getItem("isLogin") || null)
          if(isLogin){
            next();
          }else{
            next("/loginAdmin")
          }
        },
        redirect: "/admin/dashboard",
        component:()=> import(/* webpackChunkName: admin */"@/views/admin/Admin.vue"),
        children: [
          {
            path: "dashboard",
            name: "dashboard",
            component:() => import(/* webpackChunkName: dashboard*/"@/views/admin/Dashboard.vue")
          },
          {
            path: "category",
            name: "category",
            component:() => import(/* webpackChunkName: category*/"@/views/admin/CategoryAd.vue")
          },
          {
            path: "product",
            name: "product",
            component:() => import(/* webpackChunkName: product*/"@/views/admin/ProductAd.vue")
          },
          {
            path: "user",
            name: "user",
            component:() => import(/* webpackChunkName: user*/"@/views/admin/UserAd.vue")
          },
          {
            path: "order",
            name: "order",
            component:() => import(/* webpackChunkName: order*/"@/views/admin/OrderAd.vue")
          },
          {
            path: "setting",
            name: "setting",
            component:() => import(/* webpackChunkName: setting*/"@/views/admin/SettingAd.vue")
          },
          {
            path: "user-detail/:idUser",
            name: "user-detail",
            component:() => import(/* webpackChunkName: user-detail */"@/views/admin/UserDetail.vue")
          },
          {
            path: "category-detail/:idCategory",
            name: "category-detail",
            component:() => import(/* webpackChunkName: category-detail */"@/views/admin/CategoryDetail.vue")
          },
          {
            path: "product-detail/:idProduct",
            name: "product-detail",
            component:() => import(/* webpackChunkName: product-detail */"@/views/admin/ProductDetail.vue")
          },
          {
            path: "order-detail/:idOrder",
            name: "order-detail",
            component:() => import(/* webpackChunkName: order-detail */"@/views/admin/OrderDetail.vue")
          },
        ]
      }
]
export default adminRouter;