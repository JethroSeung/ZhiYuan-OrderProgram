import { reactive } from "vue"

export const orderStore = reactive({
  list: [

    {
      id: 20260311001,
      status: "WAIT",
      time: "今天 14:22",

      goods: [
        {
          id:1,
          name:"汉堡套餐",
          price:19.9,
          img:"/static/goods/burger.jpg",
          count:1
        }
      ]
    },

    {
      id:20260310002,
      status:"DONE",
      time:"昨天 19:40",

      goods:[
        {
          id:2,
          name:"感冒药",
          price:28,
          img:"/static/goods/medicine.jpg",
          count:1
        }
      ]
    }

  ]
})


export const createOrder = (order)=>{

  orderStore.list.unshift(order)

}