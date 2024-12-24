import apiClient from "./instance";

export const getCommentOfProduct = async(idProduct,indexPage,filterStar) => {
    try {
        const response = await apiClient.get(`comments?idProduct_like=${idProduct}&_page=${indexPage.value}&_limit=6&_sort=createAt&_order=desc`)             
        return response
    } catch (error) {
        console.log(error);
    }
}
export const getAllCommentOfProduct = async(idProduct) => {
    try {
        const response = await apiClient.get(`comments?idProduct_like=${idProduct}`)
        return response
    } catch (error) {
        console.log(error);
    }
}
export const delComment = async(idComment) => {
    try {
        const response = await apiClient.delete(`comments/${idComment}`)
        return response
    } catch (error) {
        console.log(error);
    }
}
export const addNewComment = async(comment) => {
    try {
        const response = await apiClient.post("comments",comment)
        return response
    } catch (error) {
        console.log(error);
    }
}