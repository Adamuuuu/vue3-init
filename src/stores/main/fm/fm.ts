import { getFMInfo } from "@/service/main/fm/fm";
import { defineStore } from "pinia";

const fmInfoStore = defineStore("fm", {
  state: () => ({
    fms: <any[]>{},
  }),
  actions: {
    async getFMInfoAction() {
      const { result } = await getFMInfo();
      console.log("这是获取到的电台数据", result);
      this.fms = result;
    },
  },
});

export default fmInfoStore();
