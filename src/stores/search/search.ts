import {
  getHotSearch,
  getSearchSuggestion,
  getSearchResult,
} from "@/service/search/search";
import { defineStore } from "pinia";

const hotSearchStore = defineStore("hotsearch", {
  state: () => ({
    hots: <any[]>{},
    Match: <any[]>{},
    songs: <any[]>{},
  }),
  actions: {
    async getHotSearchAction() {
      const { result } = await getHotSearch();
      this.hots = result.hots;
      console.log("这是获取到的数据", this.hots);
    },
    async getSearchSuggestionAction(keywords: string) {
      const { result } = await getSearchSuggestion(keywords);
      this.Match = result.allMatch;
      console.log("这是获取到的数据", this.Match);
    },
    async getSearchResultAction(keywords: string) {
      const { result } = await getSearchResult(keywords);
      this.songs = result.songs;
      console.log("这是搜索结果", result);
    },
  },
});

export default hotSearchStore();
