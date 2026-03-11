<template>
  <view class="container">
    <!-- 顶部定位 + 搜索 -->
    <view class="top-bar">
      <view class="location">
        <image class="loc-icon" src="/static/icons/location.png" mode="widthFix"></image>
        <text class="loc-text">{{ locationText }}</text>
      </view>

      <view class="search-box" @click="goSearch">
        <image class="search-icon" src="/static/icons/find.png" mode="aspectFit"></image>
        <text class="search-text">搜索商品 / 店铺</text>
      </view>
    </view>

    <!-- Banner -->
    <view class="banner">
      <text class="banner-title">无人机极速配送</text>
      <text class="banner-sub">30分钟内送达 · 智慧物流城市服务</text>
    </view>

    <!-- 分类入口 -->
    <view class="section">
      <text class="section-title">分类</text>

      <view class="category-grid">
        <view class="cat-item" v-for="(item, index) in categories" :key="index" @click="goCategory(item)">
          <image class="cat-icon" :src="item.icon" mode="aspectFit"></image>
          <text class="cat-text">{{ item.name }}</text>
        </view>
      </view>
    </view>

    <!-- 推荐商品 -->
    <view class="section">
      <text class="section-title">推荐商品</text>

      <view class="goods-list">
        <view class="goods-card" v-for="(item, index) in goodsList" :key="index" @click="goGoodsDetail(item)">
          <image class="goods-img" :src="item.img" mode="aspectFill"></image>

          <view class="goods-info">
            <text class="goods-name">{{ item.name }}</text>
            <text class="goods-desc">{{ item.desc }}</text>

            <view class="goods-bottom">
              <text class="goods-price">￥{{ item.price }}</text>
              <button class="buy-btn" @click.stop="buyNow(item)">下单</button>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
  <!-- 浮动购物车 -->
  <view class="floating-cart" @click="goCart">
  
    <image src="/static/icons/cart.png" class="cart-icon"></image>
  
    <view v-if="cartCount>0" class="cart-badge">
      {{ cartCount }}
    </view>
  
  </view>
</template>

<script setup>
import { ref, computed } from "vue"
import { onShow } from "@dcloudio/uni-app"
import { cartStore, addToCart } from "@/store/cart.js"

const locationText = ref("正在定位...")

const cartCount = computed(()=>{
  let total = 0
  cartStore.list.forEach(i=>{
    total += i.count
  })
  return total>99 ? "99+" : total
})

function goCart(){
  if(cartStore.list.length===0){
    uni.showToast({
      title:"购物车还是空的",
      icon:"none"
    })
    return
  }

  uni.navigateTo({
    url:"/pages/cart/cart"
  })
}

const categories = ref([
  { name:"食品外卖", icon:"/static/category/food_new.png", type:"FOOD" },
  { name:"药品急送", icon:"/static/category/medicine_new.png", type:"MEDICINE" },
  { name:"生活用品", icon:"/static/category/daily_new.png", type:"DAILY" },
  { name:"工业用品", icon:"/static/category/industry_new.png", type:"INDUSTRY" }
])

const goodsList = ref([
  {id:1,name:"汉堡套餐",desc:"热销 · 30分钟送达",price:19.9,img:"/static/goods/burger.jpg"},
  {id:2,name:"百令胶囊感冒药",desc:"极速配送 · 保障安全",price:28,img:"/static/goods/medicine.jpg"},
  {id:3,name:"购物篮子",desc:"家庭必备 · 生活用品",price:9.9,img:"/static/goods/daily.jpg"},
  {id:4,name:"袋装复合硅酸盐",desc:"工业级 · 快速配送",price:99,img:"/static/goods/tool.jpg"}
])

const goGoodsDetail = (item)=>{

  uni.navigateTo({
    url:"/pages/goods/detail?id="+item.id
  })

}

function goSearch(){

  uni.showToast({
    title:"搜索功能开发中",
    icon:"none"
  })

}

const buyNow = (item)=>{

  addToCart({
    id:item.id,
    name:item.name,
    price:item.price,
    img:item.img,
    count:1
  })

  uni.showToast({
    title:"已加入购物车",
    icon:"success"
  })
}

const getLocation=()=>{
  uni.getLocation({
    type:"gcj02",
    success:(res)=>{
      locationText.value="已定位 ("+res.latitude.toFixed(2)+","+res.longitude.toFixed(2)+")"
    },
    fail:()=>{
      locationText.value="南京邮电大学仙林校区东门"
    }
  })
}

onShow(()=>{
  getLocation()
})
</script>

<style>
.container {
  padding: 20rpx 18rpx;
  background: #f8f9fb;
  min-height: 100vh;
}

/* 顶部栏 */
.top-bar {
  margin-bottom: 20rpx;
}

.location {
  display: flex;
  align-items: center;
  gap: 10rpx;
  margin-bottom: 20rpx;
  padding-left: 10rpx;
}

.loc-icon {
  width: 34rpx;
  height: 34rpx;
}

.loc-text {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
}

.search-box {
  height: 80rpx;
  background: #ffffff;
  border-radius: 999rpx;
  display: flex;
  align-items: center;
  padding: 0 26rpx;
  box-shadow: 0 6rpx 14rpx rgba(0, 0, 0, 0.06);
}

.search-icon {
  width: 34rpx;
  height: 34rpx;
  margin-right: 12rpx;
}

.search-text {
  font-size: 26rpx;
  color: #999;
}

/* Banner */
.banner {
  height: 100rpx;
  border-radius: 24rpx;
  padding: 30rpx;
  margin-bottom: 26rpx;
  background: linear-gradient(135deg, #ff9f1a, #ff6b35);
  box-shadow: 0 12rpx 24rpx rgba(0, 0, 0, 0.12);
}

.banner-title {
  font-size: 40rpx;
  font-weight: bold;
  color: #fff;
}

.banner-sub {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.85);
  margin-top: 14rpx;
  display: block;
}

/* section */
.section {
  margin-top: 30rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 18rpx;
  margin-left: 12rpx;
  display: block;
}

/* 分类 */
.category-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18rpx;
}

.cat-item {
  background: #fff;
  border-radius: 20rpx;
  padding: 22rpx 10rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 6rpx 14rpx rgba(0, 0, 0, 0.05);
}

.cat-icon {
  width: 58rpx;
  height: 58rpx;
}

.cat-text {
  margin-top: 12rpx;
  font-size: 24rpx;
  color: #333;
  font-weight: 500;
}

/* 商品列表 */
.goods-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.goods-card {
  background: #fff;
  border-radius: 24rpx;
  overflow: hidden;
  display: flex;
  box-shadow: 0 8rpx 18rpx rgba(0, 0, 0, 0.06);
}

.goods-img {
  width: 210rpx;
  height: 210rpx;
  flex-shrink: 0;
}

.goods-info {
  flex: 1;
  padding: 20rpx 22rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.goods-name {
  font-size: 30rpx;
  font-weight: bold;
  color: #222;
}

.goods-desc {
  font-size: 24rpx;
  color: #888;
  margin-top: 10rpx;
}

.goods-bottom {
  margin-top: auto; /* 确保底部区域始终在卡片最下方 */
  display: flex;
  justify-content: space-between; /* 核心修改：让价格和按钮分居左右两头 */
  align-items: center;
  width: 100%;
}

.goods-price {
  font-size: 32rpx;
  font-weight: bold;
  color: #ff4d4f;
}

.buy-btn {
  margin: 0; /* 核心修改：消除按钮默认的 margin 干扰 */
  height: 64rpx;
  line-height: 64rpx;
  padding: 0 30rpx;
  border-radius: 999rpx;
  background: #fff4e6;
  color: #ff6b35;
  font-size: 26rpx;
  font-weight: bold;
  border: 2rpx solid rgba(255, 107, 53, 0.25);
}
.floating-cart{
  position: fixed;
  right: 30rpx;
  bottom: 120rpx;

  width: 100rpx;
  height: 100rpx;

  background: #ffffff;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: 0 8rpx 20rpx rgba(0,0,0,0.15);

  z-index: 999;
}

.cart-icon{
  width: 50rpx;
  height: 50rpx;
}

.cart-badge{
  position: absolute;
  top: -10rpx;
  right: -10rpx;

  background: #ff4d4f;
  color: white;

  font-size: 22rpx;

  padding: 4rpx 10rpx;
  border-radius: 20rpx;
}
</style>