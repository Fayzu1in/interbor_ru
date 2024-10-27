import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _57c50efc = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _216cb213 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _edfc55ce = () => interopDefault(import('../pages/news.vue' /* webpackChunkName: "pages/news" */))
const _9524c468 = () => interopDefault(import('../pages/providers.vue' /* webpackChunkName: "pages/providers" */))
const _02437b03 = () => interopDefault(import('../pages/speedtest.vue' /* webpackChunkName: "pages/speedtest" */))
const _3ab72f3b = () => interopDefault(import('../pages/thankyou.vue' /* webpackChunkName: "pages/thankyou" */))
const _735dd965 = () => interopDefault(import('../pages/provider/_id/index.vue' /* webpackChunkName: "pages/provider/_id/index" */))
const _e05b2b32 = () => interopDefault(import('../pages/request/_id/index.vue' /* webpackChunkName: "pages/request/_id/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/en",
    component: _57c50efc,
    name: "index___en"
  }, {
    path: "/login",
    component: _216cb213,
    name: "login___ru"
  }, {
    path: "/news",
    component: _edfc55ce,
    name: "news___ru"
  }, {
    path: "/providers",
    component: _9524c468,
    name: "providers___ru"
  }, {
    path: "/speedtest",
    component: _02437b03,
    name: "speedtest___ru"
  }, {
    path: "/thankyou",
    component: _3ab72f3b,
    name: "thankyou___ru"
  }, {
    path: "/uz",
    component: _57c50efc,
    name: "index___uz"
  }, {
    path: "/en/login",
    component: _216cb213,
    name: "login___en"
  }, {
    path: "/en/news",
    component: _edfc55ce,
    name: "news___en"
  }, {
    path: "/en/providers",
    component: _9524c468,
    name: "providers___en"
  }, {
    path: "/en/speedtest",
    component: _02437b03,
    name: "speedtest___en"
  }, {
    path: "/en/thankyou",
    component: _3ab72f3b,
    name: "thankyou___en"
  }, {
    path: "/uz/login",
    component: _216cb213,
    name: "login___uz"
  }, {
    path: "/uz/news",
    component: _edfc55ce,
    name: "news___uz"
  }, {
    path: "/uz/providers",
    component: _9524c468,
    name: "providers___uz"
  }, {
    path: "/uz/speedtest",
    component: _02437b03,
    name: "speedtest___uz"
  }, {
    path: "/uz/thankyou",
    component: _3ab72f3b,
    name: "thankyou___uz"
  }, {
    path: "/en/provider/:id",
    component: _735dd965,
    name: "provider-id___en"
  }, {
    path: "/en/request/:id",
    component: _e05b2b32,
    name: "request-id___en"
  }, {
    path: "/uz/provider/:id",
    component: _735dd965,
    name: "provider-id___uz"
  }, {
    path: "/uz/request/:id",
    component: _e05b2b32,
    name: "request-id___uz"
  }, {
    path: "/provider/:id",
    component: _735dd965,
    name: "provider-id___ru"
  }, {
    path: "/request/:id",
    component: _e05b2b32,
    name: "request-id___ru"
  }, {
    path: "/",
    component: _57c50efc,
    name: "index___ru"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
