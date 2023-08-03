import hyRequest from "..";

export function getAccountPlaylist(id: number) {
  return hyRequest.get({
    url: "/user/playlist",
    params: { uid: id },
  });
}
//获取用户收藏和创建的歌单的数量
export function getAccountPlaylistCount() {
  return hyRequest.get({
    url: "/user/subcount",
  });
}
//获取用户最近播放的歌曲
export function getAccountHistorySongs() {
  return hyRequest.get({
    url: "/record/recent/song",
  });
}
