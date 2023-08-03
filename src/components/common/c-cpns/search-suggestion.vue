<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <van-cell
    v-for="item in props.title"
    :key="item"
    size="large"
    :title="item.keyword"
    class="suggestion"
    @click="onClick(item.keyword)"
  />
</template>

<script setup lang="ts">
//接收父组件的关键词
const props = defineProps<{
  title: any[];
}>();
//定义函数，当点击搜索建议时填充数据
const emit = defineEmits<{
  (e: "on-click", newkeyword: string): void;
}>();
//点击搜索建议，填充到搜索框中
function onClick(newkeyword: string) {
  emit("on-click", newkeyword);
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
</style>
