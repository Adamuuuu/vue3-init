<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Nav title="专辑"></Nav>
  <div class="container">
    <div class="albuminfo">
      <div class="cover">
        <img :src="album.blurPicUrl" alt="" />
      </div>
      <div class="info">
        <p>{{ album.name }}</p>
        <p>歌手：{{ album.artist.name }}</p>
        <div class="info-buttom">
          <van-text-ellipsis
            rows="3"
            :content="album.description"
            expand-text="展开"
            collapse-text="收起"
          />
        </div>
      </div>
    </div>
    <div class="songslist">
      <h3>播放全部</h3>
      <div class="songs">
        <van-list>
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
  </div>
</template>
<script setup lang="ts">
import Nav from "@/components/nav/nav.vue";
import albumInfoStore from "@/stores/album/album";
import { storeToRefs } from "pinia";
import songsInfoStore from "@/stores/player/player";
const { album, songs } = storeToRefs(albumInfoStore);
const { getSongInfoAction, getSongsLyricAction, getSongsComment } =
  songsInfoStore;
function handlePlaylistId(id: number) {
  console.log("获取到了歌曲id");
  getSongInfoAction(id);
  getSongsLyricAction(id);
  getSongsComment(id);
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.albuminfo {
  display: flex;
  align-items: center;
  & img {
    width: 80px;
    height: 80px;
    margin-right: 10px;
  }
  & .info p {
    margin-top: 10px;
  }
}
.songslist {
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 100%;
  margin: 20px;
  align-items: center;
  & h3 {
    width: 100%;
  }
  & .songs {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
.bottom-player {
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 9999; /* 设置一个较高的 z-index 值确保组件显示在其他元素之上 */
}
</style>
