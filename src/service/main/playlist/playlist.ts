import hyRequest from "@/service";

export function getPlaylistInfo() {
  return hyRequest.get({
    url: "/personalized",
    params: {
      limit: 6,
    },
  });
}
