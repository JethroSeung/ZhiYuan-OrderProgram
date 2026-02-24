<template>
  <view class="container">
    <!-- 搜索框 -->
    <view class="search-box" @click="searchOrder">
      <image class="search-icon" src="/static/icons/find.png" mode="aspectFit"></image>
      <text class="search-text">搜索订单号 / 商品名称</text>
    </view>

    <!-- 顶部分类 Tab -->
    <view class="filter-bar">
      <view
        class="filter-item"
        :class="{ active: activeTab === 'ALL' }"
        @click="activeTab = 'ALL'"
      >
        全部
      </view>

      <view
        class="filter-item"
        :class="{ active: activeTab === 'WAIT' }"
        @click="activeTab = 'WAIT'"
      >
        待送达
      </view>

      <view
        class="filter-item"
        :class="{ active: activeTab === 'DONE' }"
        @click="activeTab = 'DONE'"
      >
        已完成
      </view>
    </view>

    <!-- 订单列表 -->
    <view class="order-list">
      <view
        class="order-card"
        v-for="(item, index) in filteredOrders"
        :key="index"
        @click="goOrderDetail(item)"
      >
        <view class="order-top">
          <text class="order-id">订单号：{{ item.orderNo }}</text>
          <text class="order-status" :class="item.status">
            {{ getStatusText(item.status) }}
          </text>
        </view>

        <view class="order-body">
          <image class="order-img" :src="item.img" mode="aspectFill"></image>

          <view class="order-info">
            <text class="order-name">{{ item.goodsName }}</text>
            <text class="order-desc">{{ item.desc }}</text>

            <view class="order-bottom">
              <text class="order-price">￥{{ item.price }}</text>
              <text class="order-time">{{ item.time }}</text>
            </view>
          </view>
        </view>

        <view class="order-footer">
          <text class="order-address">配送地址：{{ item.address }}</text>
          <view class="footer-actions">
            <text class="more-btn" @click.stop="showMore(item)">更多</text>
        
            <view class="btn-group">
              <!-- 待送达：只有一个按钮 -->
              <button
                v-if="item.status === 'WAIT'"
                class="btn warn"
                @click.stop="checkDelivery(item)"
              >
                查看配送
              </button>
        
              <!-- 已完成：两个按钮 -->
              <template v-if="item.status === 'DONE'">
                <button class="btn light" @click.stop="commentOrder(item)">评价</button>
                <button class="btn light" @click.stop="buyAgain(item)">再来一单</button>
              </template>
            </view>
          </view>
        </view>
		
      </view>
    </view>

    <!-- 客服悬浮按钮 -->
    <view class="service-btn" @click="contactService">
      <image class="service-icon" src="/static/icons/service.png" mode="aspectFit"></image>
    </view>
	
  </view>
</template>

<script setup>
import { ref, computed } from "vue";
import { onShow } from "@dcloudio/uni-app";

const activeTab = ref("ALL");

const orderList = ref([
  {
    orderNo: "202602101001",
    goodsName: "汉堡套餐",
    desc: "热销 · 无人机极速配送",
    price: 19.9,
    img: "/static/goods/burger.jpg",
    status: "WAIT",
    address: "南京邮电大学仙林校区",
    time: "今天 13:21"
  },
  {
    orderNo: "202602091223",
    goodsName: "百令胶囊感冒药",
    desc: "药品急送 · 极速安全",
    price: 28.0,
    img: "/static/goods/medicine.jpg",
    status: "DONE",
    address: "南京市栖霞区文苑路",
    time: "昨天 19:40"
  },
  {
    orderNo: "202602081010",
    goodsName: "购物篮子",
    desc: "家庭必备 · 无人机配送",
    price: 9.9,
    img: "/static/goods/daily.jpg",
    status: "DONE",
    address: "南京市鼓楼区中央路",
    time: "2天前 15:06"
  }
]);

const filteredOrders = computed(() => {
  if (activeTab.value === "ALL") return orderList.value;
  return orderList.value.filter((item) => item.status === activeTab.value);
});

const getStatusText = (status) => {
  if (status === "WAIT") return "待送达";
  if (status === "DONE") return "已完成";
  return "未知";
};


const showMore = (item) => {
  uni.showActionSheet({
    itemList: ["查看详情", "删除订单", "联系客服"],
    success: (res) => {
      if (res.tapIndex === 0) {
        goOrderDetail(item);
      } else if (res.tapIndex === 1) {
        uni.showToast({
          title: "删除功能后续接入",
          icon: "none"
        });
      } else if (res.tapIndex === 2) {
        contactService();
      }
    }
  });
};

const commentOrder = (item) => {
  uni.showToast({
    title: "评价功能后续接入",
    icon: "none"
  });

  // 预留接口：
  // POST /api/order/comment
};


const searchOrder = () => {
  uni.showToast({
    title: "搜索功能后续接入",
    icon: "none"
  });

  // 预留接口：
  // GET /api/order/search?keyword=xxx
};

const goOrderDetail = (item) => {
  uni.navigateTo({
    url: "/pages/order/detail?orderNo=" + item.orderNo
  });
};


const checkDelivery = (item) => {
  uni.showToast({
    title: "查看配送中：" + item.orderNo,
    icon: "none"
  });

  // 预留接口：
  // GET /api/order/tracking?orderNo=xxx
};

const buyAgain = (item) => {
  uni.showModal({
    title: "再来一单",
    content: "是否重新下单：" + item.goodsName + " ?",
    success: (res) => {
      if (res.confirm) {
        uni.showToast({
          title: "已加入购物流程（模拟）",
          icon: "none"
        });

        // 预留接口：
        // POST /api/order/repeat
      }
    }
  });
};

const contactService = () => {
  uni.showModal({
    title: "联系客服",
    content: "是否拨打客服热线 400-xxxx-xxx ?",
    success: (res) => {
      if (res.confirm) {
        uni.showToast({
          title: "客服功能后续接入",
          icon: "none"
        });

        // 小程序可用：
        // uni.makePhoneCall({ phoneNumber: "400xxxxxxx" })
      }
    }
  });
};

onShow(() => {
  uni.$emit("updateTabBar");
});
</script>

<style>
.container {
  padding: 20rpx 18rpx;
  background: #f8f9fb;
  min-height: 100vh;
}

/* 搜索框 */
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

/* 分类栏 */
.filter-bar {
  margin-top: 22rpx;
  display: flex;
  background: #fff;
  border-radius: 20rpx;
  padding: 12rpx;
  box-shadow: 0 6rpx 14rpx rgba(0, 0, 0, 0.05);
}

.filter-item {
  flex: 1;
  text-align: center;
  font-size: 28rpx;
  font-weight: 500;
  color: #666;
  padding: 18rpx 0;
  border-radius: 16rpx;
}

.filter-item.active {
  background: linear-gradient(135deg, #ff9f1a, #ff6b35);
  color: #fff;
  font-weight: bold;
}

/* 订单列表 */
.order-list {
  margin-top: 22rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.order-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 22rpx;
  box-shadow: 0 8rpx 18rpx rgba(0, 0, 0, 0.06);
}

/* 顶部 */
.order-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}

.order-id {
  font-size: 24rpx;
  color: #666;
}

.order-status {
  font-size: 24rpx;
  font-weight: bold;
}

.order-status.WAIT {
  color: #ff6b35;
}

.order-status.DONE {
  color: #27ae60;
}

/* 中间 */
.order-body {
  display: flex;
  gap: 18rpx;
}

.order-img {
  width: 170rpx;
  height: 170rpx;
  border-radius: 18rpx;
  flex-shrink: 0;
}

.order-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.order-name {
  font-size: 30rpx;
  font-weight: bold;
  color: #222;
}

.order-desc {
  font-size: 24rpx;
  color: #888;
  margin-top: 8rpx;
}

.order-bottom {
  margin-top: 14rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order-price {
  font-size: 30rpx;
  font-weight: bold;
  color: #ff4d4f;
}

.order-time {
  font-size: 22rpx;
  color: #999;
}

/* 底部 */
.order-footer {
  margin-top: 18rpx;
  padding-top: 18rpx;
  border-top: 1rpx solid #f2f2f2;
}

.order-address {
  font-size: 24rpx;
  color: #666;
  display: block;
}

.btn-area {
  margin-top: 16rpx;
  display: flex;
  justify-content: flex-end;
}

.btn {
  height: 64rpx;
  line-height: 64rpx;
  padding: 0 28rpx;
  border-radius: 999rpx;
  font-size: 24rpx;
  font-weight: bold;
}

.warn {
  background: #ff6b35;
  color: white;
}

.gray {
  background: #f2f2f2;
  color: #666;
}

/* 客服按钮 */
.service-btn {
  position: fixed;
  right: 30rpx;
  bottom: 220rpx;
  width: 110rpx;
  height: 110rpx;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 12rpx 26rpx rgba(0, 0, 0, 0.16);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.service-icon {
  width: 58rpx;
  height: 58rpx;
}

.footer-actions {
  margin-top: 18rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.more-btn {
  font-size: 26rpx;
  color: #666;
  font-weight: 500;
}

.btn-group {
  display: flex;
  gap: 16rpx;
}

.btn.light {
  background: #fff4e6;
  color: #ff6b35;
  border: 2rpx solid rgba(255, 107, 53, 0.25);
}


</style>
