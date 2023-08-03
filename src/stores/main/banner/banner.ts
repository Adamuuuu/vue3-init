import { getBannerInfo } from "@/service/main/banner/banner";
import { defineStore } from "pinia";

const bannerInfoStore = defineStore("banner", {
  state: () => ({
    banners: <any[]>{},
  }),
  actions: {
    async getBannerInfoAction() {
      const result = await getBannerInfo();
      console.log("这是获取到的数据", result);
      this.banners = result.banners;
    },
  },
});

export default bannerInfoStore();
