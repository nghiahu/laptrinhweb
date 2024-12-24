import { addNewUser, addToCart, changeStatus, getAllUser, getPaginationUser, getUserLogin } from "@/api/userApi";
import {APP_TO_CART, SET_CHANGE_STATUS, SET_DATA, SET_DATA_PAGINATION, SET_NEW_USER, SET_USER_LOGIN } from "@/constants/mutationTypes";
const userModule = {
    state: {
        data: [],
        dataPagination: [],
        userLogin:null,
    },
    mutations: {
      [SET_DATA](state, payload) {
        state.data = payload;
      },
      [SET_CHANGE_STATUS](state, payload) {
        const userIndex = state.dataPagination.findIndex(user => user.id === payload.id);
        if (userIndex !== -1) {
          state.dataPagination[userIndex].status = !state.dataPagination[userIndex].status;
        }        
      },
      [SET_DATA_PAGINATION](state,payload){
        state.dataPagination = payload;
      },
      [SET_NEW_USER](state,payload){
        state.data.push(payload);
      },
      [SET_USER_LOGIN](state,payload){
        state.userLogin = payload
      },
      [APP_TO_CART](state,payload){
        console.log(payload);
      }
    },

    actions: {
      async fetchUser({commit}){
        try {
          const response = await getAllUser();
          commit(SET_DATA, response.data); 
        } catch (error) {
          console.log(error);
        }
      },
      async updateUserStatus({ commit }, user) {
        try {
          const response = await changeStatus(user)
          commit(SET_CHANGE_STATUS, response.data);
        } catch (error) {
          console.log(error);
        }
      },
      async fetchUserPagination({commit}, params){
        try {
          const response = await getPaginationUser(params.indexPage,params.condition,params.inDe,params.searchValue);
          commit(SET_DATA_PAGINATION, response.data)        
        } catch (error) {
          console.log(error);
        }
      },
      async fetchNewUser({commit}, newUser){
        try {
          const response = await addNewUser(newUser)
          commit(SET_NEW_USER,response.data)
        } catch (error) {
          console.log(error);
        }
      },
      async fetchUserLogin({commit},idUser){
        try {
          const response = await getUserLogin(idUser);
          commit(SET_USER_LOGIN,response.data)
        } catch (error) {
          console.log(error);
        }
      },
      async fetchToCart({commit},user){
        try {
          const response = await addToCart(user)
          commit(APP_TO_CART,response.data)
        } catch (error) {
          console.log(error);
        }
      }
    },
};
export default userModule;