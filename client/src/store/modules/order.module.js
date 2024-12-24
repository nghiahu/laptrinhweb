import { cancelOrder, filterOrder, getAllOrder, getOrderDetail, updateStatus } from "@/api/orderApi";
import { CANCEL_ORDER, SET_FILTER_ORDER, SET_ORDER_DETAIL, SET_ORDERS, UPDATE_STATUS_ORDER } from "@/constants/mutationTypes";
import OrderDetail from "@/views/admin/OrderDetail.vue";

const orderModule = {
    state:{
        orders:[],
        filterOrder:[],
        orderDetail:null
    },
    mutations:{
        [SET_ORDERS](state,payload){
            state.orders = payload
        },
        [SET_FILTER_ORDER](state,payload){
            state.filterOrder = payload
        },
        [CANCEL_ORDER](state,payload){
            const index = state.filterOrder.findIndex(order => order.id === payload)
            if(index !== -1){
                state.filterOrder.splice(index,1)
                state.orders.splice(index,1)
            }
        },
        [UPDATE_STATUS_ORDER](state,payload){
            const index = state.orders.findIndex(order=>order.id === payload.id)
            if (index !== -1) {
                state.order.splice(index, 1, payload); 
              }
        },
        [SET_ORDER_DETAIL](state,payload){
            state.orderDetail = payload
        }
    },
    actions:{
        async fetchOrder({commit}){
            try {
                const response = await getAllOrder()
                commit(SET_ORDERS,response.data)
            } catch (error) {
                console.log(error);
            }
        },
        async fetchFilterOrder({commit},params){
            try {
                const response = await filterOrder(params.indexPage,params.condition,params.inDe,params.searchValue,params.status)
                commit(SET_FILTER_ORDER,response.data)
            } catch (error) {
                console.log(error);
            }
        },
        async cancelOrder({commit},idOrder){
            try {
                const response = await cancelOrder(idOrder);
                if(response.status === 200){
                    commit(CANCEL_ORDER, idOrder)
                }
            } catch (error) {
                console.log(error);
            }
        },
        async fetchUpdateStatus({commit},order){
            try {
                const response = await updateStatus(order);
                commit(UPDATE_STATUS_ORDER,response.data)
            } catch (error) {
                console.log(error);
            }
        },
        async fetchOrderDetai({commit},idOrder){
            try {
                const response = await getOrderDetail(idOrder);
                commit(SET_ORDER_DETAIL,response.data)
            } catch (error) {
                console.log(error);
            }
        }
    }
}
export default orderModule;