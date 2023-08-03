import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboadr",
      component: () => import("@/components/Tabbar/tabbar.vue"),
      children: [
        {
          path: "/",
          redirect: "/home",
        },
        {
          path: "home",
          name: "home",
          component: () => import("@/views/main/main-page.vue"),
          meta: {
            active: 0,
          },
        },
        {
          path: "player",
          name: "player",
          component: () => import("@/views/player/player-page.vue"),
          meta: {
            active: 1,
          },
        },

        {
          path: "account",
          name: "account",
          component: () => import("@/views/account/account-page.vue"),
          meta: {
            active: 2,
          },
        },
      ],
    },
    {
      path: "/playlist",
      name: "playlist",
      component: () => import("@/components/common/playlist.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/login.vue"),
    },
    {
      path: "/ranking-board",
      name: "ranking-board",
      component: () => import("@/views/main/c-cpns/ranking-board.vue"),
    },
    {
      path: "/fm",
      name: "fm",
      component: () => import("@/views/main/c-cpns/fm.vue"),
    },
    {
      path: "/search",
      name: "search",
      component: () => import("@/components/common/search.vue"),
    },
    {
      path: "/search/suggestion",
      name: "search-suggestion",
      component: () =>
        import("@/components/common/c-cpns/search-suggestion.vue"),
    },
    {
      path: "/songs/comment",
      name: "songs-comment",
      component: () => import("@/views/player/c-cpns/song-comment.vue"),
    },
    {
      path: "/songs/album",
      name: "songs-album",
      component: () => import("@/views/album/album.vue"),
    },
    {
      path: "/songs/singer",
      name: "songs-singer",
      component: () => import("@/views/singer/singer.vue"),
    },
  ],
});

export default router;
