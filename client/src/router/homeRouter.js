const homeRouter = [
    {
        path: "/",
        name: "home",
        scrollBehavior() {
            return { top: 0 };
          },
        component:()=> import(/* webpackChunkName: home */"@/views/Home.vue")
    },
    {
        path: "/:pathMatch(.*)",
        name: "not found",
        component:()=> import(/* webpackChunkName: not found */"@/views/NotFoundPage.vue")
    },
    
]
export default homeRouter;