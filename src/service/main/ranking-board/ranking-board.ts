import hyRequest from "@/service";

export function getTopPlaylist() {
  return hyRequest.get({
    url: "/toplist/detail",
  });
}
