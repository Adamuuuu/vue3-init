<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <Nav title="歌单"></Nav>

  <div class="container">
    <div class="top">
      <div class="top-top">
        <div class="top-left">
          <img :src="playlist.coverImgUrl" alt="" />
        </div>
        <div class="top-right">
          <p>{{ playlist.name }}</p>
          <!-- <div class="creator">
            <img :src="playlist.creator.avatarUrl" alt="" />
            <p>{{ playlist.creator.nickname }}</p>
          </div> -->
        </div>
      </div>
      <div class="top-buttom">
        <!-- <p>{{ playlist.description }}</p> -->

        <van-text-ellipsis
          rows="3"
          :content="playlist.description"
          expand-text="展开"
          collapse-text="收起"
        />

        <!-- <p>{{ playlist.description }}</p> -->
      </div>
    </div>
    <div class="main">
      <h3>歌曲列表</h3>
      <van-list v-model:loading="loading">
        <van-cell
          v-for="item in songs"
          :key="item"
          :title="item.name"
          @click="handlePlaylistId(item.id)"
        >
          {{ item.ar[0].name }}
        </van-cell>
      </van-list>
    </div>
  </div>
  <div class="bottom-player">
    <bottomPlayer />
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

import Nav from "../nav/nav.vue";
import songsInfoStore from "@/stores/player/player";
import playlistDetailInfoStore from "@/stores/playlistInfo/playlistInfo";
import bottomPlayer from "@/components/common/bottom-player.vue";

const { getSongInfoAction, getSongsLyricAction, getSongsComment } =
  songsInfoStore;
const loading = ref(true);
const { playlist } = storeToRefs(playlistDetailInfoStore);
const { songs } = storeToRefs(playlistDetailInfoStore);

function handlePlaylistId(id: number) {
  // getPlaylist(id);
  console.log("点击了歌曲并获取了id", id);
  getSongInfoAction(id);
  getSongsLyricAction(id);
  getSongsComment(id);
}

onMounted(() => {
  loading.value = false;
});
</script>

<style scoped lang="less">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.top {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.top-top {
  margin-top: 10px;
  margin-right: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
}
.top-right {
  margin-left: 20px;
}
.top-left img {
  margin-left: 20px;
  width: 100px;
  height: 100px;
}
.top-buttom {
  margin-left: 20px;
  width: 100%;
}
.main {
  margin-top: 20px;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  & h3 {
    margin-left: 15px;
  }
}
.bottom-player {
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 9999; /* 设置一个较高的 z-index 值确保组件显示在其他元素之上 */
}
</style>
