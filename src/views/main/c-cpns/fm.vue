<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Nav title="电台"></Nav>
  <van-grid :column-num="1">
    <van-grid-item v-for="item in fms" :key="item">
      <div class="fm">
        <div class="left">
          <img :src="item.picUrl" alt="" />
        </div>
        <div class="right">
          <p>{{ item.name }}</p>
          <p>{{ item.copywriter }}</p>
          <!-- <p>{{item.}}</p> -->
        </div>
      </div>
    </van-grid-item>
  </van-grid>
  <div class="bottom-player">
    <bottomPlayer />
  </div>
</template>
<script lang="ts" setup>
import Nav from "@/components/nav/nav.vue";
import fmInfoStore from "@/stores/main/fm/fm";
import { storeToRefs } from "pinia";
import bottomPlayer from "@/components/common/bottom-player.vue";

const { getFMInfoAction } = fmInfoStore;
const { fms } = storeToRefs(fmInfoStore);
getFMInfoAction();
</script>

<style lang="less" scoped>
.fm {
  display: flex;
  align-items: center;
  justify-content: start;
  margin: 20px;
  width: 100%;
  & img {
    width: 80px;
    height: 80px;
  }
}
.right {
  margin-left: 20px;
  //   margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & p {
    margin-bottom: 10px;
  }
}
.bottom-player {
  width: 100%;
  position: fixed;
  bottom: 45px;
  z-index: 9999; /* 设置一个较高的 z-index 值确保组件显示在其他元素之上 */
}
</style>
