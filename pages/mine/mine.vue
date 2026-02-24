<template>
  <view class="container">
    <!-- 顶部用户信息卡片 -->
    <view class="user-card">
      <view class="user-left">
        <image class="avatar" src="/static/icons/user.png" mode="aspectFill"></image>

        <view class="user-info">
          <text class="username">{{ user.username }}</text>
          <text class="phone">{{ user.phone }}</text>
          <text class="level">普通用户</text>
        </view>
      </view>

      <view class="user-right" @click="goSetting">
        <text class="setting-text">设置</text>
        <text class="arrow">></text>
      </view>
    </view>

    <!-- 我的订单 -->
    <view class="card">
      <view class="card-title-row">
        <text class="card-title">我的订单</text>
        <view class="card-more" @click="goAllOrders">
          <text class="more-text">查看全部</text>
          <text class="arrow">></text>
        </view>
      </view>

      <view class="order-grid">
        <view class="order-item" @click="goOrderTab('WAIT')">
          <image class="order-icon" src="/static/icons/wait.png" mode="aspectFit"></image>
          <text class="order-text">待送达</text>
        </view>

        <view class="order-item" @click="goOrderTab('DONE')">
          <image class="order-icon" src="/static/icons/done.png" mode="aspectFit"></image>
          <text class="order-text">已完成</text>
        </view>

        <view class="order-item" @click="goRefund">
          <image class="order-icon" src="/static/icons/refund.png" mode="aspectFit"></image>
          <text class="order-text">售后</text>
        </view>

        <view class="order-item" @click="goService">
          <image class="order-icon" src="/static/icons/service.png" mode="aspectFit"></image>
          <text class="order-text">客服</text>
        </view>
      </view>
    </view>

    <!-- 常用服务 -->
    <view class="card">
      <text class="card-title">常用服务</text>

      <view class="menu-list">
        <view class="menu-item" @click="goAddress">
          <view class="menu-left">
            <image class="menu-icon" src="/static/icons/address.png" mode="aspectFit"></image>
            <text class="menu-text">收货地址</text>
          </view>
          <text class="arrow">></text>
        </view>

        <view class="menu-item" @click="goFavorite">
          <view class="menu-left">
            <image class="menu-icon" src="/static/icons/favorite.png" mode="aspectFit"></image>
            <text class="menu-text">我的收藏</text>
          </view>
          <text class="arrow">></text>
        </view>

        <view class="menu-item" @click="goWallet">
          <view class="menu-left">
            <image class="menu-icon" src="/static/icons/wallet.png" mode="aspectFit"></image>
            <text class="menu-text">我的钱包</text>
          </view>
          <text class="arrow">></text>
        </view>

        <view class="menu-item" @click="goCoupon">
          <view class="menu-left">
            <image class="menu-icon" src="/static/icons/coupon.png" mode="aspectFit"></image>
            <text class="menu-text">优惠券</text>
          </view>
          <text class="arrow">></text>
        </view>
      </view>
    </view>

    <!-- 支持与帮助 -->
    <view class="card">
      <text class="card-title">支持与帮助</text>

      <view class="menu-list">
        <view class="menu-item" @click="goFeedback">
          <view class="menu-left">
            <image class="menu-icon" src="/static/icons/feedback.png" mode="aspectFit"></image>
            <text class="menu-text">意见反馈</text>
          </view>
          <text class="arrow">></text>
        </view>

        <view class="menu-item" @click="goAbout">
          <view class="menu-left">
            <image class="menu-icon" src="/static/icons/about.png" mode="aspectFit"></image>
            <text class="menu-text">关于我们</text>
          </view>
          <text class="arrow">></text>
        </view>
      </view>
    </view>

    <!-- 退出登录 -->
    <view class="logout-area">
      <button class="logout-btn" @click="logout">退出登录</button>
    </view>

  </view>
</template>

<script setup>
import { ref } from "vue";
import { onShow } from "@dcloudio/uni-app";

const user = ref({
  username: "蔡徐坤",
  phone: "188****1234"
});

const goSetting = () => {
  uni.showToast({
    title: "设置功能后续接入",
    icon: "none"
  });
};

const goAllOrders = () => {
  uni.switchTab({
    url: "/pages/order/order"
  });
};

const goOrderTab = (type) => {
  uni.showToast({
    title: "跳转订单筛选：" + type,
    icon: "none"
  });

  uni.switchTab({
    url: "/pages/order/order"
  });

  // 预留：后续可以用全局状态存筛选条件
};

const goRefund = () => {
  uni.showToast({
    title: "售后功能后续接入",
    icon: "none"
  });
};

const goService = () => {
  uni.showModal({
    title: "联系客服",
    content: "是否拨打客服热线 400-xxxx-xxx ?",
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

const goAddress = () => {
  uni.showToast({
    title: "地址管理后续接入",
    icon: "none"
  });
};

const goFavorite = () => {
  uni.showToast({
    title: "收藏功能后续接入",
    icon: "none"
  });
};

const goWallet = () => {
  uni.showToast({
    title: "钱包功能后续接入",
    icon: "none"
  });
};

const goCoupon = () => {
  uni.showToast({
    title: "优惠券功能后续接入",
    icon: "none"
  });
};

const goFeedback = () => {
  uni.showToast({
    title: "反馈功能后续接入",
    icon: "none"
  });
};

const goAbout = () => {
  uni.showModal({
    title: "关于我们",
    content: "无人机城市配送平台（大学生项目演示版）",
    showCancel: false
  });
};

const logout = () => {
  uni.showModal({
    title: "退出登录",
    content: "确定要退出当前账号吗？",
    success: (res) => {
      if (res.confirm) {
        uni.showToast({
          title: "已退出（模拟）",
          icon: "none"
        });

        // 后续接后端：
        // uni.removeStorageSync("token");
        // uni.reLaunch({ url: "/pages/login/login" });
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

/* 用户信息卡片 */
.user-card {
  background: #fff;
  border-radius: 26rpx;
  padding: 26rpx;
  box-shadow: 0 10rpx 20rpx rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-left {
  display: flex;
  align-items: center;
  gap: 18rpx;
}

.avatar {
  width: 110rpx;
  height: 110rpx;
  border-radius: 50%;
  background: #f2f2f2;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 6rpx;
}

.username {
  font-size: 32rpx;
  font-weight: bold;
  color: #222;
}

.phone {
  font-size: 24rpx;
  color: #888;
}

.level {
  font-size: 22rpx;
  color: #666;
  background: #f2f2f2;
  padding: 6rpx 14rpx;
  border-radius: 999rpx;
  width: fit-content;
}

.user-right {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.setting-text {
  font-size: 26rpx;
  color: #666;
}

.arrow {
  font-size: 26rpx;
  color: #bbb;
}

/* 通用卡片 */
.card {
  margin-top: 22rpx;
  background: #fff;
  border-radius: 26rpx;
  padding: 26rpx;
  box-shadow: 0 8rpx 18rpx rgba(0, 0, 0, 0.05);
}

.card-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #222;
  display: block;
}

.card-more {
  display: flex;
  align-items: center;
  gap: 6rpx;
}

.more-text {
  font-size: 24rpx;
  color: #888;
}

/* 订单快捷入口 */
.order-grid {
  margin-top: 22rpx;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10rpx;
}

.order-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 18rpx 0;
}

.order-icon {
  width: 54rpx;
  height: 54rpx;
}

.order-text {
  margin-top: 10rpx;
  font-size: 24rpx;
  color: #333;
  font-weight: 500;
}

/* 菜单列表 */
.menu-list {
  margin-top: 18rpx;
}

.menu-item {
  height: 96rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1rpx solid #f2f2f2;
}

.menu-item:first-child {
  border-top: none;
}

.menu-left {
  display: flex;
  align-items: center;
  gap: 14rpx;
}

.menu-icon {
  width: 42rpx;
  height: 42rpx;
}

.menu-text {
  font-size: 28rpx;
  color: #333;
}

/* 退出登录 */
.logout-area {
  margin-top: 26rpx;
}

.logout-btn {
  height: 90rpx;
  line-height: 90rpx;
  border-radius: 999rpx;
  background: #ffffff;
  color: #ff4d4f;
  font-size: 28rpx;
  font-weight: bold;
  border: 2rpx solid rgba(255, 77, 79, 0.25);
}
</style>
