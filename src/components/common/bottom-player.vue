<template>
  <div class="container-play">
    <div class="songInfo">
      <img :src="currsong.al.picUrl" alt="" />
      <span>{{ currsong.name }}</span>
      <span>{{ currsong.ar[0].name }}</span>
    </div>
    <div class="control">
      <iconParkVue
        :icon="isPause ? PauseOne : Play"
        size="40"
        @click="handleplay"
      ></iconParkVue>
      <IconPark
        type="music-list"
        theme="outline"
        size="40"
        fill="#333"
        @click="handlesongslist"
        class="music-list"
      />
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

<script setup lang="ts">
import { IconPark } from "@icon-park/vue-next/es/all";
import songsInfoStore from "@/stores/player/player";
import { ref, computed, watch } from "vue";
import { storeToRefs } from "pinia";
import iconParkVue from "@/components/common/iconpark.vue";
import { PauseOne, Play } from "@icon-park/vue-next";
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
const show = ref(false);
const isClick = ref(true);
function handleplay() {
  // isPause.value = !isPause.value;
  console.log("执行了函数", isPause.value);
  togglePlay();
}

const currsong = computed<any>({
  get() {
    return song.value;
  },
  set() {},
});
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
</script>

<style lang="less" scoped>
.container-play {
  display: flex;
  align-items: center;
  // justify-content: center;
  width: 100%;
  height: 50px;
  margin: 10px;
  background-color: #fff;
  justify-content: space-between;
}
.songInfo {
  display: flex;
  align-items: center;
  justify-content: start;
  & img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  & span {
    margin-left: 10px;
  }
}
.control {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .music-list {
    margin-left: 10px;
    margin-right: 20px;
  }
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
</style>
