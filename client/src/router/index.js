import { createRouter, createWebHistory } from 'vue-router'
import adminRouter from './adminRouter'
import authRouter from './authRouter'
import homeRouter from './homeRouter'
import userRouter from './userRouter'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...adminRouter,...authRouter,...homeRouter,...userRouter],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
}
  
})

export default router
