import hyRequest from "..";

//获取热搜
export function getHotSearch() {
  return hyRequest.get({
    url: "/search/hot",
  });
}
//获取搜索建议
export function getSearchSuggestion(keywords: string) {
  return hyRequest.get({
    url: "/search/suggest",
    params: {
      keywords: keywords,
      type: "mobile",
    },
  });
}
//获取搜索结果
export function getSearchResult(keywords: string) {
  return hyRequest.get({
    url: "/search",
    params: {
      keywords: keywords,
    },
  });
}
