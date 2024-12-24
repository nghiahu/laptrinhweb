import { addProduct, deleteProduct, filterProduct, getAllProduct, getUseProduct, productDetail, updateProduct } from "@/api/productAPi";
import { DELETE_PRODUCT, EDIT_PRODUCT, SET_FILTER_PRODUCT, SET_NEW_PRODUCT, SET_PRODUCT_DETAIL, SET_PRODUCTS, SET_USE_PRODUCT } from "@/constants/mutationTypes";

const productModule = {
    state:{
        products:[],
        filterProduct:[],
        productDetail: null,
        useProduct: [],
    },
    mutations:{
        [SET_PRODUCTS](state,payload){
            state.products = payload
        },
        [SET_NEW_PRODUCT](state,payload){
            state.products.push(payload)
        },
        [SET_FILTER_PRODUCT](state,payload){
            state.filterProduct = payload
        },
        [DELETE_PRODUCT](state,payload){
            const index = state.filterProduct.findIndex(product => product.id === payload)
            if(index !== -1){
                state.filterProduct.splice(index,1)
                state.products.splice(index,1)
            }
        },
        [EDIT_PRODUCT](state,payload){
            const index = state.products.findIndex(product=>product.id === payload.id)
            if (index !== -1) {
                state.products.splice(index, 1, payload); 
              }
        },
        [SET_PRODUCT_DETAIL](state,payload){
            state.productDetail = payload
        },
        [SET_USE_PRODUCT](state,payload){
            state.useProduct = payload
        }
    },
    actions:{
        async fetchProduct({commit}){
            try {
                const response = await getAllProduct()
                commit(SET_PRODUCTS,response.data)
            } catch (error) {
                console.log(error);
            }
        },
        async fetchNewProduct({commit}, newProduct){
            try {
                const response = await addProduct(newProduct);
                commit(SET_NEW_PRODUCT,response.data)
            } catch (error) {
                console.log(error);
            }
        },
        async fetchFilterProduct({commit}, params){
            try {
                const response = await filterProduct(params.indexPage,params.condition,params.inDe,params.searchValue);
                commit(SET_FILTER_PRODUCT, response.data)
            } catch (error) {
                console.log(error);
            }
        },
        async deleteProduct({commit},product){
            try {
                const response = await deleteProduct(product)    
                if(response.status === 200){
                    commit(DELETE_PRODUCT, product.id)
                }
            } catch (error) {
                console.log(error);
            }
        },
        async updateProduct({commit},params){
            try {
                const response = await updateProduct(params.newProduct,params.idProduct)
                commit(EDIT_PRODUCT, response.data)
            } catch (error) {
                console.log(error);
            }
        },
        async fetchProductDetail({commit},idProduct){
            try {
                const response = await productDetail(idProduct);
                commit(SET_PRODUCT_DETAIL,response.data)
            } catch (error) {
                console.log(error);
            }
        },
        async fetchUseProduct({commit},params){
            try {
                const response = await getUseProduct(params.indexPage,params.condition,params.inDe,params.searchValue)
                commit(SET_USE_PRODUCT,response.data)
            } catch (error) {
                console.log(error);
            }
        }
    }
}
export default productModule;