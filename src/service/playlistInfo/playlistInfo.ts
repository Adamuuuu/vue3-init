import hyRequest from "..";

//获取歌单中的所有歌曲
export function getPlaylistTrack(id: number) {
  return hyRequest.get({
    url: "/playlist/track/all",
    params: {
      id: id,
    },
  });
}
//获取歌单中的详细信息
export function getPlaylistDetail(id: number) {
  return hyRequest.get({
    url: "/playlist/detail",
    params: {
      id: id,
    },
  });
}

//获取每日推荐歌单的所有歌曲
export function getRecommenSongs() {
  return hyRequest.get({
    url: "/recommend/songs",
  });
}
