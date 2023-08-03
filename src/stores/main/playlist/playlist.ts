import { getPlaylistInfo } from "@/service/main/playlist/playlist";
import { defineStore } from "pinia";

const playlistInfoStore = defineStore("playlist", {
  state: () => ({
    playlists: <any[]>{},
  }),
  actions: {
    async getPlaylistInfoAction() {
      const { result } = await getPlaylistInfo();
      console.log("这是获取到的数据", result);
      this.playlists = result;
    },
  },
});

export default playlistInfoStore();
