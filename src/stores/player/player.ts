import {
  getSongsInfo,
  getSongsURL,
  getSongsLyric,
  getSongsComment,
} from "@/service/player/player";
import { number } from "echarts";
import { defineStore } from "pinia";

const songsInfoStore = defineStore("songsInfo", {
  state: () => ({
    song: <any>{
      name: "歌曲名",
      ar: [{ name: "歌手名" }],
      al: {
        picUrl:
          "http://p1.music.126.net/cwi82gitJJ0DfMO4cXbP8A==/109951166515550955.jpg",
      },
    },
    songurl: <string>"",
    audio: new Audio(),
    isPause: false,
    list:
      [
        {
          player: "歌手名",
          songsname: "歌曲名",
          list_url: "",
          pic_url:
            "http://p1.music.126.net/cwi82gitJJ0DfMO4cXbP8A==/109951166515550955.jpg",
          song_id: 0,
          dt: 0,
        },
      ] || undefined,
    index: 0,
    lyric: <any>{},
    // lyric: "",         // 歌词内容
    lyricIndex: -1, // 当前播放时间对应的歌词行索引
    currentlyric: "网易云音乐，听见好音乐",
    lastlyric: "",
    nextlyric: "",
    progress: 0,
    hotComments: <any[]>{},
  }),

  actions: {
    //点击歌曲后获取歌曲详情并开始播放
    async getSongInfoAction(id: number) {
      const { songs } = await getSongsInfo(id);
      const { data } = await getSongsURL(id);
      this.song = songs[0];
      this.songurl = data[0].url;
      console.log("这是歌曲信息", songs);
      this.index++;
      //播放歌曲
      this.audio.src = this.songurl;
      this.audio.play();

      console.log("这是列表信息", this.list);
      //更新播放列表  歌曲已经存在就不再添加
      if (!this.list.some((item) => item.list_url === this.songurl)) {
        console.log("添加函数执行了");
        this.list.push({
          player: this.song.ar[0].name,
          songsname: this.song.name,
          list_url: this.songurl,
          pic_url: this.song.al.picUrl,
          song_id: id,
          dt: this.song.dt,
        });
        //更新index序列
        if (this.index === this.list.length - 2) {
          this.index++;
        } else {
          this.index = this.list.length - 1;
        }
      }

      this.isPause = true;
      this.getSongsLyricAction(id);

      this.audio.addEventListener("loadedmetadata", this.audioLoaded);
    },
    //防抖函数

    audioLoaded() {
      this.audio.removeEventListener("loadedmetadata", this.audioLoaded);

      // 添加 ended 和 timeupdate 事件的监听器
      this.audio.addEventListener("ended", this.handleAudioEnded);
      this.audio.addEventListener("timeupdate", this.handleAudioTimeUpdate);
    },

    handleAudioEnded() {
      // 当歌曲播放完毕时的逻辑
      // ...
      console.log("歌曲播放完成");
      this.next();
    },

    handleAudioTimeUpdate() {
      // 当前播放时间更新时的逻辑
      // ...
      const currentTime = this.audio.currentTime;
      console.log("这是歌曲现在的时间", currentTime);
      this.lyricIndex = this.getLyricIndexByTime(currentTime);
      // console.log("这是歌词索引", this.lyricIndex);
      const lines = this.getLyricsArray(this.lyric.lyric);
      // console.log("歌词", lines[this.lyricIndex]);
      if (this.lyricIndex > 1) {
        this.lastlyric = lines[this.lyricIndex - 1];
      }
      this.currentlyric = lines[this.lyricIndex];
      if (this.lyricIndex < lines.length) {
        this.nextlyric = lines[this.lyricIndex + 1];
      }
      //进度条
      const dt = this.song.dt / 1000; // 将 dt 从毫秒转换为秒
      this.progress = (currentTime / dt) * 100; // 计算进度百分比
      console.log("这是进度", this.progress);
      console.log("这是歌曲总时长", dt);
    },
    getLyricsArray(lyrics: any) {
      return lyrics.split("\n").map((line: any) => {
        const startIndex = line.indexOf("]");
        if (startIndex !== -1) {
          return line.slice(startIndex + 1);
        }
        return line;
      });
    },
    getLyricIndexByTime(currentTime: number) {
      const lines = this.lyric.lyric.split("\n");
      const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;
      for (let i = 0; i < lines.length; i++) {
        const match = lines[i].match(timeRegex);
        if (match) {
          const minutes = parseInt(match[1]);
          const seconds = parseInt(match[2]);
          const milliseconds = parseInt(match[3]);
          const time = minutes * 60 + seconds + milliseconds / 1000;
          if (currentTime < time) {
            return i > 0 ? i - 1 : 0;
          }
        }
      }
      return lines.length - 1;
    },
    //下一首
    next() {
      this.index++;
      if (this.index >= this.list.length) {
        this.index = 1;
      }
      //   (this.songurl = this.list[this.index].list_url),
      console.log("下一首正常");
      this.audio.src = this.list[this.index].list_url;
      this.audio.play();
      console.log("这是歌曲信息", this.song);
      this.song = {
        name: this.list[this.index].songsname,
        ar: [{ name: this.list[this.index].player }],
        al: { picUrl: this.list[this.index].pic_url },
        dt: this.list[this.index].dt,
      };
      //   this.isPause = true;
    },
    //上一首
    prev() {
      this.index--;
      if (this.index < 1) {
        this.index = this.list.length - 1;
      }
      //   (this.songurl = this.list[this.index].list_url),
      console.log("上一首正常");
      this.audio.src = this.list[this.index].list_url;
      this.audio.play();
      this.song = {
        name: this.list[this.index].songsname,
        ar: [{ name: this.list[this.index].player }],
        al: { picUrl: this.list[this.index].pic_url },
        dt: this.list[this.index].dt,
      };
      //   this.isPause = true;
    },

    //判断歌曲目前是否暂停
    togglePlay() {
      this.isPause = !this.isPause;
      if (this.isPause) {
        this.audio.play();
      } else {
        this.audio.pause();
      }
    },
    //   handleLyric() {},
    async getSongsLyricAction(id: number) {
      const { lrc } = await getSongsLyric(id);
      this.lyric = lrc;
      console.log("这是获取到的歌词数据", this.lyric);
    },
    async getSongsComment(id: number) {
      const { hotComments } = await getSongsComment(id);
      this.hotComments = hotComments;
    },
  },
});

export default songsInfoStore();
