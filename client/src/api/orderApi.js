import apiClient from "./instance";

export const getAllOrder = async() => {
    try {
        const response = await apiClient.get("orders")
        return response
    } catch (error) {
        console.log(error);
    }
}
export const filterOrder = async (page, condition, inDe, searchValue, status) => {    
    console.log(status);
    let url = `orders?_page=${page}&_limit=6&code_like=${searchValue}&_sort=${condition}&_order=${inDe}`;
    
    if (status !== 0) {
        url += `&status=${status}`; 
    }

    try {
        const response = await apiClient.get(url); 
        console.log(response.data);
        
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const cancelOrder = async(idOrder) => {
    try {
        const response = await apiClient.delete(`orders/${idOrder}`)
        return response
    } catch (error) {
        console.log(error);
    }
}
export const updateStatus = async(order) => {
    try {
        const response = await apiClient.put(`orders/${order.id}`,order)
        return response
    } catch (error) {
        console.log(error);
    }
}
export const getOrderDetail = async(idOrder) => {
    try {
        const response = await apiClient.get(`orders/${idOrder}`)
        return response
    } catch (error) {
        console.log(error);
    }
}