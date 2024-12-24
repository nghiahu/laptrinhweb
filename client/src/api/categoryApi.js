import apiClient from "./instance";

export const getCategory = async () => {
    try {
        const response = await apiClient.get("category");
        return response; 
    } catch (error) {
        console.error( error);
    }
};
export const addCategory = async (newCategory) => {
    try {
        const response = await apiClient.post("category", newCategory);
        return response; 
    } catch (error) {
        console.error( error);
        throw error; 
    }
};
export const filterCategory = async (page, condition, inDe, searchValue) => {
    try {
        const response = await apiClient.get(`category?_page=${page}&_limit=4&name_like=${searchValue}&_sort=${condition}&_order=${inDe}`);
        return response; 
    } catch (error) {
        console.error( error);
    }
}
export const deleteCategory = async (category) => {
    try {
        const response = await apiClient.delete(`category/${category.id}`)
        return response; 
    } catch (error) {
        console.error( error);
    }
}
export const editCategory = async (category,idCategory) => {
    try {
        const response = await apiClient.put(`category/${idCategory}`,category)
        return response
    } catch (error) {
        console.error( error);
    }
}
export const categoryDetail = async (idCategory) => {
    try {
        const response = await apiClient.get(`category/${idCategory}`)
        return response
    } catch (error) {
        console.error( error);
    }
}