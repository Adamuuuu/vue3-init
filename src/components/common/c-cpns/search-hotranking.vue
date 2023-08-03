<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <div class="history">
      <div class="left">
        <p>搜索历史</p>
        <IconPark
          type="delete"
          theme="outline"
          size="24"
          fill="#333"
          @click="deletehistory()"
        />
        <van-overlay :show="show" @click="show = false">
          <div class="wrapper" @click.stop>
            <div class="block">
              <div class="top"><p>确定要清空历史记录么</p></div>
              <div class="buttom">
                <van-button size="small" type="primary" @click="cancledelete"
                  >取消
                </van-button>
                <van-button size="small" type="primary" @click="submitdelete"
                  >确定
                </van-button>
              </div>
            </div>
          </div>
        </van-overlay>
      </div>

      <div class="list">
        <van-button
          v-for="item in historylist"
          :key="item"
          round
          size="small"
          type="primary"
          @click="onClickHistory(item)"
        >
          {{ item }}
        </van-button>
        <!-- <van-button plain type="success">朴素按钮</van-button> -->
      </div>
    </div>
    <div class="hot-search">
      <div class="text">
        <p>热门搜索</p>
        <div class="list">
          <van-button
            v-for="item in hots"
            :key="item"
            round
            size="small"
            type="primary"
            @click="onClickHistory(item.first)"
          >
            {{ item.first }}
          </van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { localCache } from "@/utils/cache";
import { IconPark } from "@icon-park/vue-next/es/all";
import hotSearchStore from "@/stores/search/search";
import { storeToRefs } from "pinia";
import router from "@/router";
const show = ref(false);
const keyword = ref();
const historylist = ref<string[]>([]);

const { getHotSearchAction } = hotSearchStore;
const { hots } = storeToRefs(hotSearchStore);

const emit = defineEmits<{
  (e: "on-click-search", keyword: string): void;
}>();

// 点击历史记录填充内容
function onClickHistory(item: string) {
  console.log("点击了搜索历史");
  emit("on-click-search", item);
}

// 从 Local Storage 中加载历史记录
function loadHistory() {
  historylist.value = localCache.getCache("history");
}

// 保存历史记录到 Local Storage
function saveHistory() {
  localCache.setCache("history", historylist.value);
}

// 添加历史记录
function addHistory(keyword: string) {
  if (!historylist.value) {
    historylist.value = [];
  }
  if (keyword.trim() !== "") {
    // 添加新的历史记录

    historylist.value.unshift(keyword);
    // 限制历史记录数量为10条
    historylist.value = historylist.value.slice(0, 10);
    // 保存历史记录到 Local Storage
    saveHistory();
    // 清空输入框
    console.log("执行了添加历史记录的函数");
    keyword = "";
  }
}
function test() {
  console.log(1);
}
defineExpose({ addHistory, test });
//清空搜索历史的功能
function deletehistory() {
  show.value = true;
}
function cancledelete() {
  show.value = false;
  console.log("这是遮罩层");
}
function submitdelete() {
  localCache.removeCache("history");
  historylist.value = [];
  show.value = false;
}
onMounted(() => {
  // 页面加载后加载历史记录
  loadHistory();
  //加载热搜
  getHotSearchAction();
});
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
</style>
