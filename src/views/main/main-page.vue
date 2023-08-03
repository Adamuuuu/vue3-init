<template>
  <div class="container">
    <form action="/">
      <van-search
        v-model="value"
        show-action
        input-align="center"
        placeholder="请输入搜索关键词"
        @click="handleToSearch()"
      />
    </form>

    <banner></banner>

    <van-cell-group title="音乐品味">
      <van-grid clickable>
        <van-grid-item
          text="每日推荐"
          @click="handleSuggestSongs()"
          to="/playlist"
        >
          <IconPark type="calendar-dot" theme="outline" size="24" fill="#333" />
        </van-grid-item>

        <van-grid-item
          icon="https://s2.loli.net/2023/03/11/zTvBel1gdPy8NOo.png"
          text="电台"
          to="/fm"
          v-if="badge_numbers.wait_pay == 0"
          ><IconPark type="fm" theme="outline" size="24" fill="#333"
        /></van-grid-item>
        <van-grid-item
          icon="https://s2.loli.net/2023/03/11/3EcbUwsAqaJIkvf.png"
          text="随机播放"
          to="/test"
          ><IconPark type="shuffle-one" theme="outline" size="24" fill="#333"
        /></van-grid-item>
        <van-grid-item
          icon="https://s2.loli.net/2023/03/11/KQtU9hEInFcrRul.png"
          text="排行榜"
          to="/ranking-board"
          ><IconPark type="ranking" theme="outline" size="24" fill="#333"
        /></van-grid-item>
      </van-grid>
    </van-cell-group>

    <van-cell-group title="推荐歌单">
      <recommentPlaylist></recommentPlaylist>
    </van-cell-group>

    <!-- <van-sticky :offset-bottom="200" position="bottom">
      
    </van-sticky> -->
    <div class="bottom-player">
      <bottomPlayer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import banner from "./c-cpns/banner.vue";
import { IconPark } from "@icon-park/vue-next/es/all";
import recommentPlaylist from "./c-cpns/recomment-playlist.vue";
import playlistDetailInfoStore from "@/stores/playlistInfo/playlistInfo";
import router from "@/router";
import bottomPlayer from "@/components/common/bottom-player.vue";
const { getDailysongsAction } = playlistDetailInfoStore;
const badge_numbers = reactive({
  wait_pay: 0,
  wait_send: 4,
  wait_receive: 5,
});

const value = ref("");
function handleToSearch() {
  console.log("这是搜索执行的函数");
  router.push("/search");
}
function handleSuggestSongs() {
  console.log("这是个人推荐歌单");
  getDailysongsAction();
}
</script>

<style lang="less" scoped>
.bottom-player {
  width: 100%;
  position: fixed;
  bottom: 45px;
  z-index: 9999; /* 设置一个较高的 z-index 值确保组件显示在其他元素之上 */
}
</style>
