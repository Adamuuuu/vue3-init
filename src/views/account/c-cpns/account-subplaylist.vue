<template>
  <van-cell-group inset v-for="item in accountPlaylist" :key="item.id">
    <van-cell to="/playlist" @click="handlePlaylistId(item.id)">
      <template #title>
        <div class="title">
          <img :src="item.coverImgUrl" alt="" class="coverimg" />
          <div class="right">
            <p>{{ item.name }}</p>
            <p>{{ item.trackCount }}首</p>
          </div>
        </div>
      </template>
    </van-cell>
  </van-cell-group>
</template>

<script setup lang="ts">
import { ref } from "vue";
import accountPlaylistStore from "@/stores/account/account";
import { localCache } from "@/utils/cache";
import { storeToRefs } from "pinia";
import playlistDetailInfoStore from "@/stores/playlistInfo/playlistInfo";
const { getPlaylistDetaileInfoAction } = playlistDetailInfoStore;
const { getAccountPlaylistAction } = accountPlaylistStore;
const id = localCache.getCache("userid");
const accountPlaylist = ref<any[]>([]);

getAccountPlaylistAction(id).then(() => {
  const { collectplaylist } = storeToRefs(accountPlaylistStore);

  accountPlaylist.value = collectplaylist.value;
});

function handlePlaylistId(id: number) {
  console.log("执行了函数", id);
  getPlaylistDetaileInfoAction(id);
}
</script>

<style lang="less" scoped>
.playlist {
  width: 100px;
  margin-left: 10px;
  & img {
    width: 100%;
  }
}
.coverimg {
  width: 60px;
  height: 60px;
}
.title {
  display: flex;
  align-items: center;
  justify-content: start;
}
.right {
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  & p {
    margin-left: 5px;
  }
}
</style>
