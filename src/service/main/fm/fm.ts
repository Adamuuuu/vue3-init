import hyRequest from "@/service";

export function getFMInfo() {
  return hyRequest.get({
    url: "/personalized/djprogram",
    params: {
      limit: 6,
    },
  });
}
