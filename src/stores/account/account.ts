import {
  getAccountHistorySongs,
  getAccountPlaylist,
  getAccountPlaylistCount,
} from "@/service/account/account";
import { defineStore } from "pinia";

const accountPlaylistStore = defineStore("accountplaylist", {
  state: () => ({
    playlist: <any[]>{},
    collectplaylist: <any[]>{},
    list: <any[]>{},
    historyplaylist: <any>{},
  }),
  actions: {
    async getAccountPlaylistAction(id: number) {
      const { playlist } = await getAccountPlaylist(id);
      const { createdPlaylistCount } = await getAccountPlaylistCount();
      this.playlist = playlist.slice(0, createdPlaylistCount);
      this.collectplaylist = playlist.slice(createdPlaylistCount);
      console.log("这是获取到的歌单的数据", this.playlist);
      console.log("这是获取到的数量", createdPlaylistCount);
    },
    // async getAccountHistorySongsAction() {
    //   const { data } = await getAccountHistorySongs();
    //   this.list = data.list;
    //   console.log("这是获取到的历史播放数据", this.list);
    //   this.historyplaylist = {
    //     coverImgUrl: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
    //     name: "最近播放",
    //     description: "最近播放的100首歌曲",
    //   };
    // },
  },
});

export default accountPlaylistStore();
