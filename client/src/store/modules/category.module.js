import { addCategory, categoryDetail, deleteCategory, editCategory, filterCategory, getCategory } from "@/api/categoryApi";
import { DELETE_CATEGORY, EDIT_CATEGORY, SET_CATEGORY, SET_CATEGORY_DETAIL, SET_FILTER_CATEGORY, SET_NEW_CATEGORY } from "@/constants/mutationTypes";

const categoryModule = {
    state:{
        categorys:[],
        filterCategory:[],
        categoryDetail:null
    },
    mutations:{
        [SET_CATEGORY](state,payload){
            state.categorys = payload;
        },
        [SET_NEW_CATEGORY](state,payload){
            state.categorys.push(payload);
        },
        [SET_FILTER_CATEGORY](state,payload){
            state.filterCategory = payload
        },
        [DELETE_CATEGORY](state,payload){
            const index = state.filterCategory.findIndex(category => category.id === payload)
            if(index !== -1){
                state.filterCategory.splice(index,1)
                state.categorys.splice(index,1)
            }
        },
        [EDIT_CATEGORY](state,payload){
            const index = state.categorys.findIndex(category=>category.id === payload.id)
            if (index !== -1) {
                state.categorys.splice(index, 1, payload); 
              }
        },
        [SET_CATEGORY_DETAIL](state,payload){            
            state.categoryDetail = payload
        }
    },
    actions:{
        async fetchCategory({commit}){
            try {
                const response = await getCategory();
                commit(SET_CATEGORY, response.data)
            } catch (error) {
                console.log(error);
            }
        },
        async fetchNewCategory({commit}, newCategory){
            try {
                const response = await addCategory(newCategory);
                commit(SET_NEW_CATEGORY, response.data)
            } catch (error) {
                console.log(error);
            }
        },
        async fetchFilterCategory({commit}, params){
            try {
                const response = await filterCategory(params.indexPage,params.condition,params.inDe,params.searchValue);
                commit(SET_FILTER_CATEGORY, response.data)
            } catch (error) {
                console.log(error);
            }
        },
        async deleteCategory({commit},category){
            try {
                const response = await deleteCategory(category)    
                if(response.status === 200){
                    commit(DELETE_CATEGORY, category.id)
                }
            } catch (error) {
                console.log(error);
            }
        },
        async updateCategory({commit}, params){
            try {
                const response = await editCategory(params.categoryData,params.idCategory)
                commit(EDIT_CATEGORY,response.data)
            } catch (error) {
                console.log(error);
                
            }
        },
        async fetchCategoryDetail({commit},idCategory){
            try {
                const response = await categoryDetail(idCategory);                
                commit(SET_CATEGORY_DETAIL,response.data)
            } catch (error) {
                console.log(error);
            }
        }
    }
}
export default categoryModule;