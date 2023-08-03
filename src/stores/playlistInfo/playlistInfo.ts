import {
  getPlaylistDetail,
  getPlaylistTrack,
  getRecommenSongs,
} from "@/service/playlistInfo/playlistInfo";
import { getAccountHistorySongs } from "@/service/account/account";
import { defineStore } from "pinia";

const playlistDetailInfoStore = defineStore("playlistDetail", {
  state: () => ({
    playlist: <any>{},
    songs: <any[]>{},
  }),
  actions: {
    async getPlaylistDetaileInfoAction(id: number) {
      console.log("执行了这个函数");
      const detail = await getPlaylistDetail(id);
      this.playlist = detail.playlist;
      const { songs } = await getPlaylistTrack(id);
      this.songs = songs;
      console.log("这是输出结果", this.playlist, this.songs);
    },
    async getDailysongsAction() {
      const result = await getRecommenSongs();
      this.songs = result.data.dailySongs;
      console.log("这是获取到的结果", this.songs);
      this.playlist = {
        coverImgUrl: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
        name: "每日推荐歌单",
        description: "根据你的音乐口味生成，每天六点更新",
      };
    },
    //获取历史歌单
    async getAccountHistorySongsAction() {
      const { data } = await getAccountHistorySongs();
      this.songs = data.list.map((item: { data: any }) => {
        return item.data;
      });
      console.log("这是获取到的历史播放数据", this.songs);
      this.playlist = {
        coverImgUrl: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
        name: "最近播放",
        description: "最近播放的100首歌曲",
      };
    },
  },
});

export default playlistDetailInfoStore();
