import { reactive } from "vue"

export const cartStore = reactive({
  list: []
})

export function addToCart(goods){

  const exist = cartStore.list.find(
    item => item.id === goods.id
  )

  if(exist){
    exist.count++
  }else{

    cartStore.list.push({
      id: goods.id,
      name: goods.name,
      price: goods.price,
      img: goods.img,
      count: goods.count || 1
    })

  }

}

export function removeFromCart(id){

  const index = cartStore.list.findIndex(
    item => item.id === id
  )

  if(index !== -1){
    cartStore.list.splice(index,1)
  }

}

export function clearCart(){

  cartStore.list.length = 0

}