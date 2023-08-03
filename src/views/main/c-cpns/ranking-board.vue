<template>
  <Nav title="排行榜"></Nav>
  <van-grid :gutter="10" direction="horizontal">
    <van-grid-item v-for="item in playlists" :key="item.id" to="/playlist">
      <div class="playlist" @click="handlePlaylistId(item.id)">
        <img :src="item.coverImgUrl" alt="" />
        <van-text-ellipsis :content="item.name" />
      </div>
    </van-grid-item>
  </van-grid>
  <div class="bottom-player">
    <bottomPlayer />
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import playlistInfoStore from "@/stores/main/playlist/playlist";
import playlistDetailInfoStore from "@/stores/playlistInfo/playlistInfo";
import topPLaylistStore from "@/stores/main/ranking-board/ranking-board";
import Nav from "@/components/nav/nav.vue";
import bottomPlayer from "@/components/common/bottom-player.vue";

const { getTopPlaylistAction } = topPLaylistStore;
const { playlists } = storeToRefs(topPLaylistStore);

const { getPlaylistDetaileInfoAction } = playlistDetailInfoStore;
getTopPlaylistAction();
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
.bottom-player {
  width: 100%;
  position: fixed;
  bottom: 0px;
  z-index: 9999; /* 设置一个较高的 z-index 值确保组件显示在其他元素之上 */
}
</style>
