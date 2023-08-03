import { getAlbumInfo } from "@/service/album/album";
import { defineStore } from "pinia";

const albumInfoStore = defineStore("albuminfo", {
  state: () => ({
    album: <any>{},
    songs: <any[]>{},
  }),
  actions: {
    async getAlbumInfoAction(id: number) {
      const result = await getAlbumInfo(id);
      this.album = result.album;
      this.songs = result.songs;
      console.log("这是获取到的结果", this.songs);
    },
  },
});

export default albumInfoStore();
