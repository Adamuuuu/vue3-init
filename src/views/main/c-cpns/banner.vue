<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div class="banner">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in banners" :key="index">
        <img :src="item.pic" alt="" @click="handlePlay(item.song.id)" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
//   import bannerInfoStore from "@/stores/main/banner/banner";
//   import playInfoStore from "@/stores/play/play";
import { storeToRefs } from "pinia";
import bannerInfoStore from "@/stores/main/banner/banner";
const value = ref("");
const { getBannerInfoAction } = bannerInfoStore;
const { banners } = storeToRefs(bannerInfoStore);
getBannerInfoAction();
//   const playStore = playInfoStore;
//   const { getPlayInfo } = playStore();

function handlePlay(id: number) {
  console.log("点击banner触发事件", id);
}
//   onMounted(() => {
//     getBannerInfo();
//   });
</script>

<style scoped lang="less">
.banner {
  margin-top: 20px;
}
.my-swipe .van-swipe-item {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  height: 188px;
  color: #fff;
  font-size: 20px;
  text-align: center;
  background-color: #39a9ed;
}
.banner img {
  display: inline-block;
  width: 100%;
  height: 188px;
}
</style>
