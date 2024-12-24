import apiClient from "./instance";

export const getAllProduct = async() => {
    try {
        const response = await apiClient.get("products")
        return response
    } catch (error) {
        console.log(error);
    }
}
export const addProduct = async(newProduct) => {
    try {
        const response = await apiClient.post("products",newProduct)
        return response
    } catch (error) {
        console.log(error);
    }
}
export const filterProduct = async(page, condition, inDe, searchValue) => {
    try{
        const response = await apiClient.get(`products?_page=${page}&_limit=4&name_like=${searchValue}&_sort=${condition}&_order=${inDe}`)
        return response 
    }catch (error){
        console.log(error);
        
    }
}
export const deleteProduct = async (product) => {
    try {
        const response = await apiClient.delete(`products/${product.id}`)
        return response; 
    } catch (error) {
        console.error( error);
    }
}
export const updateProduct = async (product,idProduct) => {
    try {
        const response = await apiClient.put(`products/${idProduct}`,product)
        return response; 
    } catch (error) {
        console.error( error);
    }
}
export const productDetail = async (idProduct) => {
    try {
        const response = await apiClient.get(`products/${idProduct}`)
        return response
    } catch (error) {
        console.error( error);
    }
}
export const getUseProduct = async(page, condition, inDe,searchValue)=>{
    try {
        const response = await apiClient.get(`products?_page=${page}&name_like=${searchValue}&_limit=5&_sort=${condition}&_order=${inDe}`)
        return response
    } catch (error) {
        console.error( error);
    }
}
