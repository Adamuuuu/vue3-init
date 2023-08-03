import { getSingerInfo, getSingerHotsongs } from "@/service/singer/singer";
import { defineStore } from "pinia";

const artistInfoStore = defineStore("artistinfo", {
  state: () => ({
    artist: <any>{},
    songs: <any[]>{},
  }),
  actions: {
    async getSingerInfoAction(id: number) {
      const { data } = await getSingerInfo(id);
      const { songs } = await getSingerHotsongs(id);
      this.artist = data.artist;
      this.songs = songs;
      console.log("这是获取到的结果", this.songs);
    },
  },
});

export default artistInfoStore();
