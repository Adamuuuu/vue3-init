import { getTopPlaylist } from "@/service/main/ranking-board/ranking-board";
import { defineStore } from "pinia";

const topPLaylistStore = defineStore("topplaylist", {
  state: () => ({
    playlists: <any[]>{},
  }),
  actions: {
    async getTopPlaylistAction() {
      const result = await getTopPlaylist();
      this.playlists = result.list;
      console.log("这是结果", result);
    },
  },
});

export default topPLaylistStore();
