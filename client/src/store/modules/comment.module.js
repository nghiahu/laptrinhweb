import { addNewComment, delComment, getAllCommentOfProduct, getCommentOfProduct } from "@/api/commentApi";
import { DELETE_COMMENT, SET_COMMENT, SET_FIlTER_COMMENT, SET_NEW_COMMENT } from "@/constants/mutationTypes";

const commentModule = {
    state:{
        comments:[],
        filterComment:[]
    },
    mutations:{
        [SET_FIlTER_COMMENT](state,payload){
            state.filterComment = payload
        },
        [SET_COMMENT](state,payload){
            state.comments = payload
        },
        [DELETE_COMMENT](state,payload){
            const index = state.filterComment.findIndex(comment => comment.id === payload)
            if(index !== -1){
                state.filterComment.splice(index,1)
                state.comments.splice(index,1)
            }
        },
        [SET_NEW_COMMENT](state,payload){
            state.comments.push(payload)
        }
    },
    actions:{
        async fetchComment({commit},params){
            try {
                const response = await getCommentOfProduct(params.idProduct,params.indexPage,params.filterStar);      
                commit(SET_FIlTER_COMMENT,response.data)
            } catch (error) {
                console.log(error);
            }
        },
        async fetchAllComment({commit},idProduct){
            try {
                const response = await getAllCommentOfProduct(idProduct); 
                commit(SET_COMMENT,response.data)
            } catch (error) {
                console.log(error);
            }
        },
        async deleteComment({commit},idComment){
            try {
                const response = await delComment(idComment)
                commit(DELETE_COMMENT,response.data)
            } catch (error) {
                console.log(error);
            }
        },
        async fetchNewComment({commit},comment){
            try {
                const response = await addNewComment(comment)
                commit(SET_NEW_COMMENT,comment)
            } catch (error) {
                console.log(error);
            }
        }
    }
}
export default commentModule;