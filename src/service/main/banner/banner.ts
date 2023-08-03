import hyRequest from "@/service";

export function getBannerInfo() {
  return hyRequest.get({
    url: "/banner",
    params: {
      type: 2,
    },
  });
}
