<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="content">
    <div class="top">
      <van-image
        width="100%"
        height="100%"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      />
      <div class="card">
        <div class="image">
          <img
            src="http://p2.music.126.net/1OatqQ_uC_OlWNt7jLn9JQ==/109951165561263340.jpg"
            alt=""
          />
          <p>{{ nickname }}</p>
        </div>
      </div>
    </div>
    <div class="mid">
      <van-cell-group title="音乐品味">
        <van-grid clickable :column-num="2">
          <van-grid-item text="我的喜欢" @click="tolikeplaylist()"
            ><IconPark type="like" theme="outline" size="24" fill="#333"
          /></van-grid-item>

          <van-grid-item text="最近播放" to="/playlist" @click="handleRecord()"
            ><IconPark type="play" theme="outline" size="24" fill="#333"
          /></van-grid-item>
        </van-grid>
      </van-cell-group>
    </div>

    <div class="buttom">
      <p>我的歌单</p>
      <van-tabs v-model:active="active">
        <van-tab title="创建歌单"
          ><accountPlaylist @like-playlist="getlikeplaylist"></accountPlaylist
        ></van-tab>
        <van-tab title="收藏歌单"><accountSubPlaylist /></van-tab>
      </van-tabs>
    </div>
  </div>
  <div class="bottom-player">
    <bottomPlayer />
  </div>
</template>
<script setup lang="ts">
import { localCache } from "@/utils/cache";
import { reactive, onMounted, ref } from "vue";
import { IconPark } from "@icon-park/vue-next/es/all";
import accountPlaylist from "./c-cpns/account-playlist.vue";
import accountSubPlaylist from "./c-cpns/account-subplaylist.vue";
import router from "@/router";
import bottomPlayer from "@/components/common/bottom-player.vue";

import playlistDetailInfoStore from "@/stores/playlistInfo/playlistInfo";
const { getPlaylistDetaileInfoAction, getAccountHistorySongsAction } =
  playlistDetailInfoStore;
const nickname = localCache.getCache("nickname");
const avatar = localCache.getCache("avatarUrl");
const likeplaylistid = ref();
const active = ref(0);
function handleRecord() {
  console.log("执行函数");
  getAccountHistorySongsAction();
}
function getlikeplaylist(playlistid: number) {
  likeplaylistid.value = playlistid;
}
function tolikeplaylist() {
  router.push("/playlist");
  getPlaylistDetaileInfoAction(likeplaylistid.value);
}
</script>

<style scoped lang="less">
p {
  color: black;
  text-align: center;
  line-height: 20px;
}

.content {
  background-color: #f7f8fa;
  width: 100%;
  height: 100%;
  flex-direction: column;
  padding: 15px 10px;
}
.top {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.mid {
  margin-top: 20px;
}
.buttom {
  margin-top: 20px;
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  & p {
    margin-bottom: 10px;
  }
}

.member-detail {
  font-size: 14px;
}
.card {
  margin-top: 20px;
  width: 90%;
  height: 80px;
  //   padding: 20px;
  margin-top: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
}
.image {
  position: absolute;
  top: -50%;
  left: 50%;
  transform: translateX(-50%);

  overflow: hidden;
  z-index: 1;
}

.image img {
  //   display: block;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  //   height: auto;
}
.bottom-player {
  width: 100%;
  position: fixed;
  bottom: 40px;
  z-index: 9999; /* 设置一个较高的 z-index 值确保组件显示在其他元素之上 */
}
</style>
