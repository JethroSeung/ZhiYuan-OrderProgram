<template>
  <view class="container">

    <view class="img-box">
      <image class="goods-img" :src="goods.img" mode="aspectFill"></image>
    </view>

    <view class="info-card">
      <text class="goods-name">{{ goods.name }}</text>
      <text class="goods-desc">{{ goods.desc }}</text>

      <view class="price-row">
        <text class="price">￥{{ goods.price }}</text>
        <text class="tag">无人机极速配送</text>
      </view>
    </view>

    <view class="section-card">
      <text class="section-title">配送信息</text>

      <view class="row">
        <text class="label">配送方式</text>
        <text class="value">无人机配送</text>
      </view>

      <view class="row">
        <text class="label">预计送达</text>
        <text class="value">约 25 分钟</text>
      </view>

      <view class="row">
        <text class="label">配送范围</text>
        <text class="value">南京市主城区</text>
      </view>
    </view>

    <view class="section-card">
      <text class="section-title">商品规格</text>

      <view class="spec-list">
        <view
          class="spec-item"
          v-for="(item, index) in specList"
          :key="index"
          :class="{ active: selectedSpec === item }"
          @click="selectedSpec = item"
        >
          {{ item }}
        </view>
      </view>
    </view>

    <view class="section-card">
      <text class="section-title">购买数量</text>

      <view class="count-row">
        <view class="count-btn" @click="minusCount">-</view>
        <text class="count-num">{{ count }}</text>
        <view class="count-btn" @click="plusCount">+</view>
      </view>
    </view>

    <view class="tip-card">
      <text class="tip-title">温馨提示</text>
      <text class="tip-text">
        本商品支持无人机配送，配送过程中可在订单页面查看无人机位置（演示模式）。
      </text>
    </view>

    <view class="bottom-bar">
      <view class="bottom-price">
        <text class="total-label">合计：</text>
        <text class="total-price">￥{{ totalPrice }}</text>
      </view>

      <view class="btn-area">
        <button class="btn cart" @click="handleAddCart">加入购物车</button>
        <button class="btn buy" @click="buyNow">立即下单</button>
      </view>
    </view>

  </view>
</template>

<script setup>
import { ref, computed } from "vue"
import { onLoad } from "@dcloudio/uni-app"
import { addToCart } from "@/store/cart.js"

const goods = ref({
  id: 0,
  name: "加载中...",
  desc: "请稍候",
  price: 0,
  img: "/static/goods/burger.jpg"
})

const goodsList = [
  {
    id:1,
    name:"汉堡套餐",
    desc:"热销 · 30分钟送达",
    price:19.9,
    img:"/static/goods/burger.jpg"
  },
  {
    id:2,
    name:"百令胶囊感冒药",
    desc:"极速配送 · 保障安全",
    price:28,
    img:"/static/goods/medicine.jpg"
  },
  {
    id:3,
    name:"购物篮子",
    desc:"家庭必备 · 生活用品",
    price:9.9,
    img:"/static/goods/daily.jpg"
  },
  {
    id:4,
    name:"袋装复合硅酸盐",
    desc:"工业级 · 快速配送",
    price:99,
    img:"/static/goods/tool.jpg"
  }
]

const count = ref(1)

const specList = ref(["标准规格","加大份","超值套餐"])
const selectedSpec = ref("标准规格")

const totalPrice = computed(()=>{
  return (goods.value.price * count.value).toFixed(2)
})

const plusCount = ()=>{
  count.value++
}

const minusCount = ()=>{
  if(count.value>1){
    count.value--
  }
}

const handleAddCart = ()=>{

  addToCart({
    id: goods.value.id,
    name: goods.value.name + "（" + selectedSpec.value + "）",
    price: goods.value.price,
    img: goods.value.img,
    count: count.value
  })

  uni.showToast({
    title:"已加入购物车",
    icon:"success"
  })

}

const buyNow = ()=>{

  uni.showModal({
    title:"确认下单",
    content:
      "商品："+goods.value.name+
      "\n规格："+selectedSpec.value+
      "\n数量："+count.value+
      "\n合计：￥"+totalPrice.value,
    success:(res)=>{

      if(res.confirm){

        uni.showToast({
          title:"下单成功（模拟）",
          icon:"success"
        })

      }

    }
  })

}

onLoad((options)=>{

  const id = Number(options.id)

  const found = goodsList.find(item=>item.id===id)

  if(found){
    goods.value = found
  }else{
    goods.value = goodsList[0]
  }

})
</script>

<style>
/* 你的原样式完全保留 */
.container {
  background: #f8f9fb;
  min-height: 100vh;
  padding-bottom: 160rpx;
}

.img-box {
  width: 100%;
  height: 320rpx;
  overflow: hidden;
  border-bottom-left-radius: 30rpx;
  border-bottom-right-radius: 30rpx;
}

.goods-img {
  width: 100%;
  height: 280rpx;
}

.info-card {
  background: #fff;
  border-radius: 28rpx;
  padding: 28rpx;
  margin: -40rpx 18rpx 18rpx;
  box-shadow: 0 10rpx 24rpx rgba(0,0,0,0.06);
}

.goods-name {
  font-size: 36rpx;
  font-weight: bold;
}

.goods-desc {
  margin-top: 14rpx;
  font-size: 26rpx;
  color: #888;
}

.price-row {
  margin-top: 22rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 40rpx;
  font-weight: bold;
  color: #ff4d4f;
}

.tag {
  font-size: 22rpx;
  padding: 10rpx 18rpx;
  border-radius: 999rpx;
  background: #fff4e6;
  color: #ff6b35;
}

.section-card {
  background: #fff;
  margin: 18rpx;
  border-radius: 24rpx;
  padding: 26rpx;
}

.section-title {
  font-size: 30rpx;
  font-weight: bold;
  margin-bottom: 18rpx;
}

.row {
  display: flex;
  justify-content: space-between;
  padding: 14rpx 0;
}

.spec-list {
  display: flex;
  gap: 18rpx;
  flex-wrap: wrap;
}

.spec-item {
  padding: 16rpx 26rpx;
  border-radius: 999rpx;
  background: #f5f6f8;
  font-size: 24rpx;
}

.spec-item.active {
  background: #fff4e6;
  color: #ff6b35;
}

.count-row {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20rpx;
}

.count-btn {
  width: 70rpx;
  height: 70rpx;
  border-radius: 18rpx;
  background: #f5f6f8;
  text-align: center;
  line-height: 70rpx;
  font-size: 34rpx;
}

.count-num {
  font-size: 30rpx;
  font-weight: bold;
}

.tip-card {
  margin: 18rpx;
  border-radius: 24rpx;
  padding: 26rpx;
  background: linear-gradient(135deg,#fff4e6,#ffe2d6);
}

.bottom-bar {
  position: fixed;
  left:0;
  right:0;
  bottom:0;
  background:#fff;
  padding:18rpx;
  display:flex;
  justify-content:space-between;
  align-items:center;
}

.total-price{
  font-size:34rpx;
  font-weight:bold;
  color:#ff4d4f;
}

.btn-area{
  display:flex;
  gap:16rpx;
}

.btn{
  height:76rpx;
  line-height:76rpx;
  border-radius:999rpx;
  padding:0 32rpx;
}

.btn.cart{
  background:#fff4e6;
  color:#ff6b35;
}

.btn.buy{
  background:linear-gradient(135deg,#ff9f1a,#ff6b35);
  color:#fff;
}
</style>