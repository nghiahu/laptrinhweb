import { createStore } from "vuex";
import userModule from "./modules/user.module";
import categoryModule from "./modules/category.module";
import productModule from "./modules/product.module";
import commentModule from "./modules/comment.module";
import orderModule from "./modules/order.module";

const store = createStore({
    modules:{
        userModule,
        categoryModule,
        productModule,
        commentModule,
        orderModule
    }
})
export default store;