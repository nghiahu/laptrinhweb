const userRouter = [
    {
        path: "/user/product-detail/:idProduct",
        name: "product-detail-user",
        component:()=> import(/* webpackChunkName: product-detail-user */"@/views/user/ProductDetail.vue")
    },
    {
        path: "/user/cart",
        name: "cart",
        component:()=> import(/* webpackChunkName: cart */"@/views/user/Cart.vue")
    },
    {
        path: "/user/pay-page",
        name: "pay-page",
        component:()=> import(/* webpackChunkName: pay-page */"@/views/user/Paypage.vue")
    },
    {
        path: "/user/catrgory-product/:idCategory",
        name: "catrgory-product",
        component:()=> import(/* webpackChunkName: catrgory-product */"@/views/user/CategoryProduct.vue")
    },
    {
        path: "/user/contact",
        name: "contact",
        component:()=> import(/* webpackChunkName: contact */"@/views/user/Contact.vue")
    }
]
export default userRouter;