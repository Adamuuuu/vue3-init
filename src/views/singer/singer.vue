<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Nav title="歌手信息"></Nav>
  <div class="container">
    <div class="albuminfo">
      <div class="cover">
        <img :src="artist.avatar" alt="" />
        <p>{{ artist.name }}</p>
      </div>
    </div>
    <div class="info">
      <!-- <p>别名：{{ artist.alias }}</p> -->
      <div class="info-buttom">
        <van-text-ellipsis
          rows="3"
          :content="artist.briefDesc"
          expand-text="展开"
          collapse-text="收起"
        />
      </div>
    </div>
    <div class="songslist">
      <h3>热门歌曲50首</h3>
      <div class="songs">
        <van-list>
          <van-cell
            v-for="item in songs"
            :key="item"
            :title="item.name"
            @click="handlePlaylistId(item.id)"
          >
            <div v-for="(singer, index) in item.ar" :key="index" class="singer">
              {{ singer.name }}
              <span v-if="index < item.ar.length - 1">/</span>
            </div>
            <!-- {{ item.ar[0].name }} -->
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
import artistInfoStore from "@/stores/singer/singer";
import { storeToRefs } from "pinia";
import songsInfoStore from "@/stores/player/player";
const { artist, songs } = storeToRefs(artistInfoStore);
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
  flex-direction: column;
  & .cover {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  & p {
    margin-top: 10px;
  }
  & img {
    width: 100px;
    height: 100px;
    margin-top: 10px;
    border-radius: 50px;
  }
  & .info p {
    margin-top: 10px;
  }
}
.info {
  width: 90%;
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
