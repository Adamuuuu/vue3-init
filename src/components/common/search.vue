<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <van-nav-bar
    left-text=""
    right-text="搜索"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  >
    <template #title
      ><van-search
        v-model="keyword"
        placeholder="请输入搜索关键词"
        @click="handleToSearch()"
      />
    </template>
  </van-nav-bar>
  <div v-show="isSuggest">
    <searchSuggestion :title="allMatch" @on-click="getkeyword" />
  </div>
  <div v-show="isHotSearch">
    <searchhotranking
      @on-click-search="getkeyword"
      ref="searchhotRef"
    ></searchhotranking>
  </div>
  <div v-show="isResult">
    <searchresult :title="searchSongs"></searchresult>
  </div>
  <div class="bottom-player">
    <bottomPlayer />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import searchhotranking from "./c-cpns/search-hotranking.vue";
import searchSuggestion from "./c-cpns/search-suggestion.vue";
import { getSearchSuggestion } from "@/service/search/search";
import hotSearchStore from "@/stores/search/search";
import { storeToRefs } from "pinia";
import searchresult from "./c-cpns/search-result.vue";
const keyword = ref();
const isHotSearch = ref(true);
const isSuggest = ref(false);
const isResult = ref(false);
const onClickLeft = () => history.back();
const searchhotRef = ref<InstanceType<typeof searchhotranking>>();
const { getSearchResultAction } = hotSearchStore;
const searchSongs = ref<any[]>([]);
function onClickRight() {
  console.log("这是keyword", keyword.value);
  // console.log(searchhotRef.value?.addHistory());
  searchhotRef.value?.addHistory(keyword.value);

  getSearchResultAction(keyword.value).then(() => {
    const { songs } = storeToRefs(hotSearchStore);
    searchSongs.value = songs.value;
    console.log("这是songs的值", songs.value);
    isResult.value = true;
    isSuggest.value = false;
  });
}

//点击搜索按钮在搜索框填充内容
const getkeyword = (item: string) => {
  console.log("执行了给父组件传值的方法");
  keyword.value = item;
  onClickRight();
};
//监听关键词的变化更新搜索建议
const allMatch = ref<any[]>([]);
watch(keyword, async (newKeyword) => {
  console.log("值发生了变化", newKeyword);
  if (keyword.value) {
    isSuggest.value = true;
    isHotSearch.value = false;
    isResult.value = false;
  } else {
    isHotSearch.value = true;
    isResult.value = false;
  }
  if (newKeyword !== "") {
    const { result } = await getSearchSuggestion(newKeyword);
    allMatch.value = result.allMatch; // 只将 Match 属性赋值给 allMatch.value
    console.log("这是最新的值", allMatch.value);
  } else {
    allMatch.value = [];
  }
});
function handleToSearch() {
  console.log("这是搜索执行的函数");

  // router.push("/search/suggestion");
}
</script>

<style scoped lang="less">
.container {
  display: flex;
  width: 100%;
  height: 100%;
  margin: 20px;
  flex-direction: column;
}
.left {
  width: 85%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.history {
  width: 100%;
}
.list .van-button {
  margin-top: 10px;
  margin-right: 10px;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 200px;
  height: 100px;
  background-color: #fff;
  display: flex;
  flex-direction: column;

  & p {
    margin-left: 10px;
    margin-top: 10px;
    display: flex;
    justify-content: start;
  }
}
.buttom {
  display: flex;
  justify-content: end;
  & .van-button {
    margin-right: 10px;
    margin-top: 10px;
  }
}
.hot-search {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}
.bottom-player {
  width: 100%;
  position: fixed;
  bottom: 40px;
  z-index: 9999; /* 设置一个较高的 z-index 值确保组件显示在其他元素之上 */
}
</style>
