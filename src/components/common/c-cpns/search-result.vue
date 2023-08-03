<template>
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-cell
      v-for="item in props.title"
      :key="item"
      :title="item.name"
      @click="onClick(item.id)"
    >
      {{ item.artists[0].name }}
    </van-cell>
  </van-list>
</template>

<script setup lang="ts">
import { ref } from "vue";
import songsInfoStore from "@/stores/player/player";
const { getSongInfoAction, getSongsLyricAction, getSongsComment } =
  songsInfoStore;
const loading = ref(false);
const finished = ref(false);
const onLoad = () => {
  loading.value = false;
  console.log("执行成功了");
  // 数据全部加载完成
  if (props.title.length >= 30) {
    finished.value = true;
  }
};
const props = defineProps<{
  title: any[];
}>();
function onClick(id: number) {
  console.log("获取的歌曲信息为", id);
  getSongInfoAction(id);
  getSongsLyricAction(id);
  getSongsComment(id);
}
</script>
