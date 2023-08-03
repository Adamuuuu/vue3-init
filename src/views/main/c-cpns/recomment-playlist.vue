<template>
  <van-grid :gutter="10" direction="horizontal">
    <van-grid-item v-for="item in playlists" :key="item.id" to="/playlist">
      <div class="playlist" @click="handlePlaylistId(item.id)">
        <img :src="item.picUrl" alt="" />
        <van-text-ellipsis :content="item.name" />
      </div>
    </van-grid-item>
  </van-grid>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import playlistInfoStore from "@/stores/main/playlist/playlist";
import { onMounted } from "vue";
import playlistDetailInfoStore from "@/stores/playlistInfo/playlistInfo";

const { getPlaylistInfoAction } = playlistInfoStore;
const { playlists } = storeToRefs(playlistInfoStore);

const { getPlaylistDetaileInfoAction } = playlistDetailInfoStore;
getPlaylistInfoAction();
function handlePlaylistId(id: number) {
  console.log("这是点击之歌单之后触发的条件", id);
  getPlaylistDetaileInfoAction(id);
}
</script>

<style scoped lang="less">
.playlist {
  width: 100px;
  margin-left: 10px;
  & img {
    width: 100%;
  }
}
</style>
