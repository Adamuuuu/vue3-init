<template>
  <Nav title="评论"></Nav>
  <div class="container">
    <div class="songInfo">
      <img :src="song.al.picUrl" alt="" />
      <span>{{ song.name }}</span>
      <span>{{ song.ar[0].name }}</span>
    </div>
    <p>评论区</p>
    <div class="comment">
      <van-cell-group inset v-for="item in hotComments" :key="item">
        <van-cell>
          <template #title>
            <div class="user">
              <div class="left">
                <img :src="item.user.avatarUrl" alt="" />
              </div>
              <div class="right">
                <p>{{ item.user.nickname }}</p>
                <p>{{ item.timeStr }}</p>
              </div>
            </div>
          </template>
          <template #value>
            <IconPark
              type="thumbs-up"
              theme="outline"
              size="20"
              fill="#333"
              @click="handlecommentlike()"
            />
            {{ item.likedCount }}
          </template>
        </van-cell>
        <p class="content">{{ item.content }}</p>
        <hr />
      </van-cell-group>
    </div>
  </div>
  <!-- <h1>评论区</h1>
  <van-cell-group inset v-for="item in hotComments" :key="item">
    <van-cell :value="item.likedCount">
      <template #title>
        <div class="container">
          <div class="left">
            <img :src="item.user.avatarUrl" alt="" />
          </div>
          <div class="right">
            <p>{{ item.user.nickname }}</p>
            <p>{{ item.timeStr }}</p>
          </div>
        </div>
      </template>
    </van-cell>
    <p class="content">{{ item.content }}</p>
    <hr />
  </van-cell-group> -->
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import Nav from "@/components/nav/nav.vue";
import songsInfoStore from "@/stores/player/player";
import { IconPark } from "@icon-park/vue-next/es/all";
const { hotComments, song } = storeToRefs(songsInfoStore);

function handlecommentlike() {}
</script>

<style scoped lang="less">
h1 {
  margin: 20px 20px;
}
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  // justify-content: start;
  // align-items: center;
  margin: 0 10px;
}
.songInfo {
  display: flex;
  align-items: center;
  justify-content: start;
  & img {
    width: 35px;
    height: 35px;
    margin-left: 10px;
    border-radius: 50%;
  }
  & span {
    margin-left: 10px;
  }
  margin-bottom: 20px;
}
.comment {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.user {
  display: flex;
  align-items: center;
  justify-content: start;
  width: 90%;
  & img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  & .right {
    margin-left: 10px;
  }
}
.content {
  margin-left: 10px;
  line-height: 1.5;
  letter-spacing: 1px;
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
