import apiClient from "./instance";

export const getAllUser = async () => {
    try {
        const response = await apiClient.get("user");
        return response; 
    } catch (error) {
        console.error(error);
    }
};

export const changeStatus = async (user) => {
    try {
        const response = await apiClient.patch(`user/${user.id}`, {
            ...user,
            status: !user.status
        });
        return response; 
    } catch (error) {
        console.error( error);
    }
};

export const getPaginationUser = async (page, condition, inDe, searchValue) => {
    try {
        const response = await apiClient.get(`user?_page=${page}&_limit=5&userName_like=${searchValue}&_sort=${condition}&_order=${inDe}`);
        return response; 
    } catch (error) {
        console.error(error);
    }
};
export const addNewUser = async (newUser) => {
    try {
        const response = await apiClient.post(`user`,newUser)
        return response
    } catch (error) {
        console.error(error);
    }
};
export const getUserLogin = async (idUser) => {
    try {
        const response = await apiClient.get(`user/${idUser}`)
        return response;
    } catch (error) {
        console.error(error);
    }
};
export const addToCart = async (user) => {
    try {
        const response = await apiClient.put(`user/${user.id}`,user)
        return response
    } catch (error) {
        console.error(error);
    }
}

