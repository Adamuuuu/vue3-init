import hyRequest from "..";

export function getAlbumInfo(id: number) {
  return hyRequest.get({
    url: `/album?id=${id}`,
  });
}
