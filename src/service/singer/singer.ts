import hyRequest from "..";

export function getSingerInfo(id: number) {
  return hyRequest.get({
    url: `/artist/detail?id=${id}`,
  });
}

export function getSingerHotsongs(id: number) {
  return hyRequest.get({
    url: `/artist/songs?id=${id}`,
  });
}
