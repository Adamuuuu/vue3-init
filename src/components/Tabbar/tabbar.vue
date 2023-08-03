<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="top"><router-view /></div>

  <van-tabbar v-model="active">
    <van-tabbar-item to="home" exact>
      <span>首页</span>
      <template #icon>
        <IconPark type="home" theme="outline" size="24" fill="#333" />
        <!-- <img :src="props.active ? icon.active : icon.inactive" /> -->
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="player" exact>
      <span>音乐</span>
      <template #icon>
        <IconPark type="music" theme="outline" size="24" fill="#333" />
        <!-- <img :src="props.active ? icon.active : icon.inactive" /> -->
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="account" exact>
      <span>个人</span>
      <template #icon>
        <IconPark type="user" theme="outline" size="24" fill="#333" />
        <!-- <img :src="props.active ? icon.active : icon.inactive" /> -->
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { IconPark } from "@icon-park/vue-next/es/all";
import { useRoute } from "vue-router";
const route = useRoute();
const active = ref(route.meta.active);
</script>

<style scoped lang="less">
.top {
  width: 100%;
  height: 90%;
}
</style>
