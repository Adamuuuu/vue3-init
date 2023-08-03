import hyRequest from "..";

export function getSongsInfo(id: number) {
  return hyRequest.get({
    url: `/song/detail?ids=${id}`,
  });
}

export function getSongsURL(id: number) {
  return hyRequest.get({
    url: `/song/url/v1?id=${id}&level=exhigh`,
  });
}

//获取歌词信息

export function getSongsLyric(id: number) {
  return hyRequest.get({
    url: "/lyric",
    params: {
      id: id,
    },
  });
}
//获取歌曲评论
export function getSongsComment(id: number) {
  return hyRequest.get({
    url: "/comment/music",
    params: {
      id: id,
      limit: 1,
    },
  });
}
//获取评论信息
