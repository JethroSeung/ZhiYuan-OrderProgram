<template>

<view class="container">

  <view v-if="cartList.length===0" class="empty">
    <image src="/static/icons/cart-empty.png" class="empty-img"></image>
    <text>购物车还是空的</text>
  </view>

  <view v-else>

    <view class="cart-card" v-for="item in cartList" :key="item.id">

      <!-- 这里改成 img -->
      <image :src="item.img" class="goods-img"></image>

      <view class="goods-info">

        <text class="goods-name">{{item.name}}</text>

        <view class="bottom">

          <text class="price">￥{{item.price}}</text>

          <view class="stepper">

            <view class="btn" @click="decrease(item)">-</view>
            <text class="count">{{item.count}}</text>
            <view class="btn" @click="increase(item)">+</view>

          </view>

          <view class="delete" @click="remove(item)">
            🗑
          </view>

        </view>

      </view>

    </view>

  </view>

</view>

<view v-if="cartList.length>0" class="cart-bar">

  <text class="total">合计 ￥{{totalPrice}}</text>

  <view class="submit" @click="submitOrder">
    去结算
  </view>

</view>

</template>


<script setup>

import { computed } from "vue"
import { cartStore, removeFromCart, clearCart } from "@/store/cart.js"
import { createOrder } from "@/store/order.js"

const cartList = cartStore.list

const totalPrice = computed(()=>{
  let total = 0
  cartList.forEach(i=>{
    total += i.price * i.count
  })
  return total.toFixed(2)
})

function increase(item){
  item.count++
}

function decrease(item){

  item.count--

  if(item.count<=0){
    removeFromCart(item.id)
  }

}

function remove(item){
  removeFromCart(item.id)
}


function submitOrder(){

  const newOrder = {

    id: Date.now(),

    status:"WAIT",

    time:"刚刚",

    goods: cartList.map(g=>({
      id:g.id,
      name:g.name,
      price:g.price,
      img:g.img,
      count:g.count
    }))

  }

  createOrder(newOrder)

  clearCart()

  uni.showToast({
    title:"下单成功",
    icon:"success"
  })

  setTimeout(()=>{
    uni.navigateTo({
      url:"/pages/order/order"
    })
  },600)

}

</script>


<style>

.container{
  padding:20rpx;
  background:#f8f9fb;
  min-height:100vh;
}

.empty{
  margin-top:200rpx;
  display:flex;
  flex-direction:column;
  align-items:center;
  color:#999;
}

.empty-img{
  width:200rpx;
  height:200rpx;
  margin-bottom:20rpx;
}

/* 商品卡片 */

.cart-card{
  background:#fff;
  border-radius:24rpx;
  display:flex;
  overflow:hidden;
  margin-bottom:20rpx;
  box-shadow:0 8rpx 18rpx rgba(0,0,0,0.06);
}

.goods-img{
  width:210rpx;
  height:210rpx;
}

.goods-info{
  flex:1;
  padding:20rpx;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
}

.goods-name{
  font-size:30rpx;
  font-weight:bold;
}

.bottom{
  display:flex;
  align-items:center;
  justify-content:space-between;
}

.price{
  font-size:32rpx;
  color:#ff4d4f;
  font-weight:bold;
}

/* 加减 */

.stepper{
  display:flex;
  align-items:center;
}

.btn{
  width:46rpx;
  height:46rpx;
  border-radius:50%;
  background:#fff4e6;
  color:#ff6b35;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:30rpx;
}

.count{
  margin:0 16rpx;
}

.delete{
  margin-left:20rpx;
  font-size:30rpx;
}

/* 结算栏 */

.cart-bar{
  position:fixed;
  bottom:0;
  left:0;
  right:0;
  height:110rpx;
  background:#fff;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:0 30rpx;
  box-shadow:0 -6rpx 20rpx rgba(0,0,0,0.06);
}

.total{
  font-size:32rpx;
  font-weight:bold;
}

.submit{
  background:#ff6b35;
  color:#fff;
  padding:18rpx 40rpx;
  border-radius:999rpx;
}

</style>