<template>
  <van-nav-bar title="">
    <template #title>
      <p>{{ currsong.name }}</p>
      <p>{{ currsong.ar[0].name }}</p>
    </template>
  </van-nav-bar>
  <div class="container">
    <div class="imgage">
      <van-image width="100%" height="100%" :src="currsong.al.picUrl" />
    </div>
    <div class="lyrics">
      <p>{{ lastlyric }}</p>
      <p class="active">{{ currentlyric }}</p>
      <p>{{ nextlyric }}</p>
    </div>
    <div class="comment">
      <IconPark
        type="like"
        theme="outline"
        size="24"
        fill="#333"
        v-show="isClick"
        @click="changefill()"
      /><IconPark
        type="like"
        theme="outline"
        size="24"
        fill="#a82f2e"
        v-show="!isClick"
        @click="changefill()"
      />
      <IconPark
        type="comment"
        theme="outline"
        size="24"
        fill="#333"
        @click="handlecomment()"
      />
      <IconPark
        type="more-one"
        theme="outline"
        size="24"
        fill="#333"
        @click="handlemoreone()"
      />
      <van-popup
        v-model:show="showMore"
        position="bottom"
        :style="{ height: '60%' }"
      >
        <div class="list">
          <h3>{{ currsong.name }}</h3>
          <div class="more">
            <van-list>
              <van-cell @click="handleSinger(currsong.ar[0].id)">
                <template #title>
                  <div class="more-one">
                    <IconPark
                      type="people"
                      theme="outline"
                      size="20"
                      fill="#333"
                    />
                    <p>歌手：{{ currsong.ar[0].name }}</p>
                  </div>
                </template>
              </van-cell>
              <van-cell @click="handleAlbum(currsong.al.id)">
                <template #title>
                  <div class="more-one">
                    <IconPark
                      type="peoples"
                      theme="outline"
                      size="20"
                      fill="#333"
                    />
                    <p>专辑：{{ currsong.al.name }}</p>
                  </div>
                </template>
              </van-cell>
            </van-list>
          </div>
        </div>
      </van-popup>
    </div>
    <div class="progress">
      <van-progress
        :percentage="progress"
        :show-pivot="false"
        color="#ee0a24"
      />
    </div>
    <div class="player">
      <div class="left">
        <IconPark type="loop-once" theme="outline" size="40" fill="#333" />
      </div>
      <div class="main">
        <IconPark
          type="go-start"
          theme="outline"
          size="40"
          fill="#333"
          @click="toPrev()"
        />
        <iconParkVue
          :icon="isPause ? PauseOne : Play"
          size="40"
          @click="handleplay"
        ></iconParkVue>
        <IconPark
          type="go-end"
          theme="outline"
          size="40"
          fill="#333"
          @click="toNext()"
        />
      </div>

      <div class="right">
        <IconPark
          type="music-list"
          theme="outline"
          size="40"
          fill="#333"
          @click="handlesongslist"
        />
      </div>
      <van-popup
        v-model:show="show"
        position="bottom"
        :style="{ height: '60%' }"
      >
        <div class="list">
          <h3>当前播放</h3>
          <div class="songs">
            <van-list>
              <van-cell
                v-for="item in list"
                :key="item"
                :title="item.songsname"
                @click="handlePlaylistId(item.song_id)"
              >
                {{ item.player }}
              </van-cell>
            </van-list>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IconPark } from "@icon-park/vue-next/es/all";
import songsInfoStore from "@/stores/player/player";
import { ref, computed, watch } from "vue";
import { storeToRefs } from "pinia";
import iconParkVue from "@/components/common/iconpark.vue";
import { PauseOne, Play } from "@icon-park/vue-next";
import router from "@/router";
import albumInfoStore from "@/stores/album/album";
import artistInfoStore from "@/stores/singer/singer";
// const isPause = ref(true);
const {
  getSongInfoAction,
  togglePlay,
  next,
  prev,
  getSongsLyricAction,
  getSongsComment,
} = songsInfoStore;
const { song, list, isPause, currentlyric, lastlyric, nextlyric, progress } =
  storeToRefs(songsInfoStore);
const { getSingerInfoAction } = artistInfoStore;
const { getAlbumInfoAction } = albumInfoStore;
const show = ref(false);
const isClick = ref(true);
function handleplay() {
  console.log("执行了函数", isPause.value);
  togglePlay();
}
const showMore = ref(false);
const currsong = computed<any>({
  get() {
    return song.value;
  },
  set() {},
});

watch(song.value, (newsong) => {
  console.log("这是newisPause的值", newsong);
});
function changefill() {
  isClick.value = !isClick.value;
  console.log("发生了点击", isClick);
}
function toNext() {
  next();
  isPause.value = true;
}
function toPrev() {
  prev();
  isPause.value = true;
}

function handlesongslist() {
  show.value = true;
}

function handlePlaylistId(id: number) {
  // getPlaylist(id);
  console.log("点击了歌曲并获取了id", id);

  getSongInfoAction(id);
  getSongsComment(id);
  getSongsLyricAction(id);
}
function handlecomment() {
  router.push("/songs/comment");
}
function handlemoreone() {
  console.log("执行了more-one");
  showMore.value = true;
}

function handleSinger(id: number) {
  console.log("这是id", id);
  getSingerInfoAction(id);
  router.push("/songs/singer");
}
function handleAlbum(id: number) {
  console.log("这是id", id);
  getAlbumInfoAction(id);
  router.push("/songs/album");
}
</script>

<style scoped lang="less">
.container {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}
p {
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
}
.image {
  // margin-top: 20px;
  width: 100%;
  height: 100%;
}
.lyrics {
  margin-top: 20px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  & p {
    margin-top: 10px;
  }
}
.comment {
  margin-top: 20px;
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: space-between;
}
.progress {
  margin-top: 20px;
  width: 100%;
}
.player {
  margin-top: 40px;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.list {
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
.more {
  width: 100%;
}
.more-one {
  display: flex;
  width: 100%;
  & p {
    margin-left: 10px;
  }
}
.active {
  font-weight: bold;
  color: red;
}
</style>
