<template>
  <view class="container">
    <!-- 顶部状态卡片 -->
    <view class="status-card">
      <view class="status-left">
        <text class="status-title">{{ statusTitle }}</text>
        <text class="status-sub">{{ statusSub }}</text>
      </view>

      <view class="status-right" v-if="order.status === 'WAIT'">
        <text class="time-num">{{ remainMinutes }}</text>
        <text class="time-text">分钟</text>
      </view>

      <view class="status-right done" v-if="order.status === 'DONE'">
        <text class="done-text">已送达</text>
      </view>
    </view>

    <!-- 地图配送窗口（待送达才显示） -->
    <view class="card" v-if="order.status === 'WAIT'">
      <view class="card-title">实时配送</view>

      <view class="map-box">
        <image class="map-img" src="/static/map/map-demo.png" mode="aspectFill"></image>

        <!-- 无人机图标叠加 -->
        <image class="drone-icon" src="/static/icons/drone.png" mode="aspectFit"></image>

        <!-- 地图底部信息条 -->
        <view class="map-info">
          <text class="map-info-text">无人机正在飞往目的地</text>
        </view>
      </view>
    </view>

    <!-- 配送进度（待送达才显示） -->
    <view class="card" v-if="order.status === 'WAIT'">
      <view class="card-title">配送进度</view>

      <view class="progress-wrap">
        <view class="progress-line">
          <view class="progress-inner" :style="{ width: progressPercent + '%' }"></view>
        </view>

        <view class="progress-text">
          <text>{{ progressText }}</text>
          <text class="progress-percent">{{ progressPercent }}%</text>
        </view>
      </view>

      <view class="delivery-info">
        <view class="info-row">
          <text class="label">无人机编号</text>
          <text class="value">{{ order.droneNo }}</text>
        </view>
        <view class="info-row">
          <text class="label">预计送达</text>
          <text class="value">{{ order.eta }}</text>
        </view>
        <view class="info-row">
          <text class="label">当前位置</text>
          <text class="value">{{ order.currentPos }}</text>
        </view>
      </view>
    </view>

    <!-- 商品信息 -->
    <view class="card">
      <view class="card-title">商品信息</view>

      <view class="goods-box">
        <image class="goods-img" :src="order.img" mode="aspectFill"></image>

        <view class="goods-info">
          <text class="goods-name">{{ order.goodsName }}</text>
          <text class="goods-desc">{{ order.desc }}</text>

          <view class="goods-bottom">
            <text class="goods-price">￥{{ order.price }}</text>
            <text class="goods-count">x{{ order.count }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 订单信息 -->
    <view class="card">
      <view class="card-title">订单信息</view>

      <view class="info-row">
        <text class="label">订单号</text>
        <text class="value">{{ order.orderNo }}</text>
      </view>

      <view class="info-row">
        <text class="label">下单时间</text>
        <text class="value">{{ order.createTime }}</text>
      </view>

      <view class="info-row" v-if="order.status === 'DONE'">
        <text class="label">送达时间</text>
        <text class="value">{{ order.finishTime }}</text>
      </view>

      <view class="info-row">
        <text class="label">配送地址</text>
        <text class="value">{{ order.address }}</text>
      </view>

      <view class="info-row">
        <text class="label">配送方式</text>
        <text class="value">无人机配送</text>
      </view>
    </view>

    <!-- 底部按钮栏 -->
    <view class="bottom-bar">
      <button class="btn ghost" @click="contactService">联系客服</button>

      <button
        v-if="order.status === 'WAIT'"
        class="btn main"
        @click="refreshDelivery"
      >
        刷新配送状态
      </button>

      <button
        v-if="order.status === 'DONE'"
        class="btn main"
        @click="commentOrder"
      >
        评价订单
      </button>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from "vue";
import { onLoad } from "@dcloudio/uni-app";

const order = ref({
  orderNo: "",
  goodsName: "",
  desc: "",
  price: 0,
  img: "",
  count: 1,
  status: "WAIT",
  address: "",
  createTime: "",
  finishTime: "",

  droneNo: "DRN-2026-08",
  eta: "今天 14:05",
  currentPos: "学海路上空",
  remainMinutes: 12,
  progress: 72
});

const remainMinutes = computed(() => order.value.remainMinutes);
const progressPercent = computed(() => order.value.progress);

const progressText = computed(() => {
  if (order.value.progress < 30) return "无人机已起飞";
  if (order.value.progress < 70) return "正在飞往目的地";
  return "即将送达";
});

const statusTitle = computed(() => {
  return order.value.status === "WAIT" ? "配送中" : "订单已完成";
});

const statusSub = computed(() => {
  if (order.value.status === "WAIT") {
    return "预计 " + order.value.eta + " 送达";
  }
  return "感谢使用无人机配送服务";
});

const contactService = () => {
  uni.showModal({
    title: "联系客服",
    content: "是否拨打客服热线 400-xxxx-xxx？",
    success: (res) => {
      if (res.confirm) {
        uni.showToast({
          title: "客服功能后续接入",
          icon: "none"
        });
      }
    }
  });
};

const refreshDelivery = () => {
  uni.showToast({
    title: "配送信息已更新（模拟）",
    icon: "none"
  });

  if (order.value.progress < 95) {
    order.value.progress += 8;
    order.value.remainMinutes = Math.max(order.value.remainMinutes - 2, 1);
  } else {
    order.value.progress = 100;
    order.value.status = "DONE";
    order.value.finishTime = "今天 14:03";
  }
};

const commentOrder = () => {
  uni.showToast({
    title: "评价功能后续接入",
    icon: "none"
  });
};

onLoad((options) => {
  const orderNo = options.orderNo;

  const mockOrders = [
    {
      orderNo: "202602101001",
      goodsName: "汉堡套餐",
      desc: "热销 · 无人机极速配送",
      price: 19.9,
      img: "/static/goods/burger.jpg",
      count: 1,
      status: "WAIT",
      address: "南京邮电大学仙林校区",
      createTime: "今天 13:21",
      finishTime: "",
      droneNo: "DRN-2026-08",
      eta: "今天 14:05",
      currentPos: "文苑路上空",
      remainMinutes: 12,
      progress: 72
    },
    {
      orderNo: "202602091223",
      goodsName: "百令胶囊感冒药",
      desc: "药品急送 · 极速安全",
      price: 28.0,
      img: "/static/goods/medicine.jpg",
      count: 1,
      status: "DONE",
      address: "南京市栖霞区文苑路",
      createTime: "昨天 19:40",
      finishTime: "昨天 20:01"
    },
    {
      orderNo: "202602081010",
      goodsName: "购物篮子",
      desc: "家庭必备 · 无人机配送",
      price: 9.9,
      img: "/static/goods/daily.jpg",
      count: 1,
      status: "DONE",
      address: "南京市鼓楼区中央路",
      createTime: "2天前 15:06",
      finishTime: "2天前 15:33"
    }
  ];

  const found = mockOrders.find((x) => x.orderNo === orderNo);

  if (found) {
    order.value = found;
  } else {
    uni.showToast({
      title: "订单不存在",
      icon: "none"
    });
  }
});
</script>

<style>
.container {
  padding: 20rpx 18rpx 160rpx;
  background: #f8f9fb;
  min-height: 100vh;
}

/* 顶部状态卡 */
.status-card {
  background: #fff;
  border-radius: 26rpx;
  padding: 28rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 10rpx 22rpx rgba(0, 0, 0, 0.06);
}

.status-left {
  display: flex;
  flex-direction: column;
  gap: 10rpx;
}

.status-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #222;
}

.status-sub {
  font-size: 24rpx;
  color: #888;
}

.status-right {
  background: #fff4e6;
  border-radius: 22rpx;
  padding: 14rpx 20rpx;
  display: flex;
  align-items: baseline;
  gap: 6rpx;
}

.time-num {
  font-size: 40rpx;
  font-weight: bold;
  color: #ff6b35;
}

.time-text {
  font-size: 22rpx;
  color: #ff6b35;
}

.status-right.done {
  background: #eafaf0;
}

.done-text {
  font-size: 28rpx;
  font-weight: bold;
  color: #27ae60;
}

/* 通用卡片 */
.card {
  margin-top: 22rpx;
  background: #fff;
  border-radius: 24rpx;
  padding: 22rpx;
  box-shadow: 0 8rpx 18rpx rgba(0, 0, 0, 0.05);
}

.card-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #222;
  margin-bottom: 18rpx;
}

/* 地图窗口 */
.map-box {
  position: relative;
  width: 100%;
  height: 320rpx;
  border-radius: 22rpx;
  overflow: hidden;
  background: #f2f2f2;
}

.map-img {
  width: 100%;
  height: 100%;
}

.drone-icon {
  position: absolute;
  top: 90rpx;
  left: 260rpx;
  width: 70rpx;
  height: 70rpx;
}

.map-info {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 14rpx 18rpx;
  background: rgba(0, 0, 0, 0.45);
}

.map-info-text {
  font-size: 24rpx;
  color: #fff;
}

/* 配送进度 */
.progress-wrap {
  margin-top: 10rpx;
}

.progress-line {
  width: 100%;
  height: 16rpx;
  border-radius: 999rpx;
  background: #f2f2f2;
  overflow: hidden;
}

.progress-inner {
  height: 100%;
  border-radius: 999rpx;
  background: linear-gradient(135deg, #ff9f1a, #ff6b35);
}

.progress-text {
  margin-top: 14rpx;
  display: flex;
  justify-content: space-between;
  font-size: 24rpx;
  color: #666;
}

.progress-percent {
  font-weight: bold;
  color: #ff6b35;
}

/* 商品 */
.goods-box {
  display: flex;
  gap: 18rpx;
}

.goods-img {
  width: 170rpx;
  height: 170rpx;
  border-radius: 18rpx;
  flex-shrink: 0;
}

.goods-info {
  flex: 1;
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
  margin-top: 18rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.goods-price {
  font-size: 32rpx;
  font-weight: bold;
  color: #ff4d4f;
}

.goods-count {
  font-size: 24rpx;
  color: #999;
}

/* 订单信息行 */
.info-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 14rpx 0;
  border-bottom: 1rpx solid #f2f2f2;
}

.info-row:last-child {
  border-bottom: none;
}

.label {
  font-size: 26rpx;
  color: #666;
  flex-shrink: 0;
}

.value {
  font-size: 26rpx;
  color: #222;
  text-align: right;
  max-width: 420rpx;
}

/* 底部按钮 */
.bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  padding: 18rpx 18rpx 30rpx;
  display: flex;
  gap: 18rpx;
  box-shadow: 0 -8rpx 18rpx rgba(0, 0, 0, 0.06);
}

.btn {
  flex: 1;
  height: 80rpx;
  line-height: 80rpx;
  border-radius: 999rpx;
  font-size: 28rpx;
  font-weight: bold;
}

.btn.main {
  background: linear-gradient(135deg, #ff9f1a, #ff6b35);
  color: #fff;
}

.btn.ghost {
  background: #fff;
  color: #ff6b35;
  border: 2rpx solid rgba(255, 107, 53, 0.3);
}
</style>
