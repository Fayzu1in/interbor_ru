import Vue from 'vue'

import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from '../layouts/error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'

/* Plugins */

import nuxt_plugin_plugin_68f9480c from 'nuxt_plugin_plugin_68f9480c' // Source: ./components/plugin.js (mode: 'all')
import nuxt_plugin_gtm_1f6c6710 from 'nuxt_plugin_gtm_1f6c6710' // Source: ./gtm.js (mode: 'all')
import nuxt_plugin_pluginutils_3e76f159 from 'nuxt_plugin_pluginutils_3e76f159' // Source: ./nuxt-i18n/plugin.utils.js (mode: 'all')
import nuxt_plugin_pluginrouting_32808c64 from 'nuxt_plugin_pluginrouting_32808c64' // Source: ./nuxt-i18n/plugin.routing.js (mode: 'all')
import nuxt_plugin_pluginmain_7c76598b from 'nuxt_plugin_pluginmain_7c76598b' // Source: ./nuxt-i18n/plugin.main.js (mode: 'all')
import nuxt_plugin_axios_661e2522 from 'nuxt_plugin_axios_661e2522' // Source: ./axios.js (mode: 'all')
import nuxt_plugin_workbox_4e0c4c84 from 'nuxt_plugin_workbox_4e0c4c84' // Source: ./workbox.js (mode: 'client')
import nuxt_plugin_metaplugin_c396fa5e from 'nuxt_plugin_metaplugin_c396fa5e' // Source: ./pwa/meta.plugin.js (mode: 'all')
import nuxt_plugin_iconplugin_ba47af76 from 'nuxt_plugin_iconplugin_ba47af76' // Source: ./pwa/icon.plugin.js (mode: 'all')
import nuxt_plugin_ymapPlugin_4bb7856d from 'nuxt_plugin_ymapPlugin_4bb7856d' // Source: ../plugins/ymapPlugin.js (mode: 'client')
import nuxt_plugin_glideclient_805635e6 from 'nuxt_plugin_glideclient_805635e6' // Source: ../plugins/glide.client.js (mode: 'client')
import nuxt_plugin_preloaderclient_1780059d from 'nuxt_plugin_preloaderclient_1780059d' // Source: ../plugins/preloader.client.js (mode: 'client')
import nuxt_plugin_maska_0381c858 from 'nuxt_plugin_maska_0381c858' // Source: ../plugins/maska.js (mode: 'all')
import nuxt_plugin_i18n_1fba523a from 'nuxt_plugin_i18n_1fba523a' // Source: ../plugins/i18n.js (mode: 'all')
import nuxt_plugin_api_785206da from 'nuxt_plugin_api_785206da' // Source: ../plugins/api.js (mode: 'all')
import nuxt_plugin_facebookPixel_7535da0d from 'nuxt_plugin_facebookPixel_7535da0d' // Source: ../plugins/facebookPixel.js (mode: 'all')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    const globalNuxt = this.$root ? this.$root.$options.$nuxt : null
    if (process.client && !globalNuxt && typeof window !== 'undefined') {
      return window.$nuxt
    }
    return globalNuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":true,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

async function createApp(ssrContext, config = {}) {
  const store = null
  const router = await createRouter(ssrContext, config, { store })

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"title":"InternetBor","meta":[{"name":"google-site-verification","content":"0a76CzZjBr7v3xmjGOLGOs8Jo33YILh6k_BzV6FhUwU"},{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":""},{"name":"format-detection","content":"telephone=no"},{"name":"facebook-domain-verification","content":"bs9wgi0jk16c0fwcpv4oornl557m9e"}],"link":[{"rel":"stylesheet","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fcss2?family=Raleway:wght@400;700&display=swap"},{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"},{"rel":"preload","as":"font","crossorigin":"anonymous","type":"font\u002Fttf","href":"\u002Ffonts\u002FLitteraTextLight.ttf"},{"rel":"preload","as":"font","crossorigin":"anonymous","type":"font\u002Fttf","href":"\u002Ffonts\u002FLilitaOne-Regular.ttf"}],"__dangerouslyDisableSanitizers":["script"],"script":[{"hid":"call-tracking","src":"https:\u002F\u002Fcc.calltracking.ru\u002Fphone.e15e1.14025.async.js","async":true,"defer":true,"type":"text\u002Fjavascript","body":true}],"style":[]},

    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    beforeSerializeFns: ssrContext ? ssrContext.beforeSerializeFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_plugin_68f9480c === 'function') {
    await nuxt_plugin_plugin_68f9480c(app.context, inject)
  }

  if (typeof nuxt_plugin_gtm_1f6c6710 === 'function') {
    await nuxt_plugin_gtm_1f6c6710(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginutils_3e76f159 === 'function') {
    await nuxt_plugin_pluginutils_3e76f159(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginrouting_32808c64 === 'function') {
    await nuxt_plugin_pluginrouting_32808c64(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginmain_7c76598b === 'function') {
    await nuxt_plugin_pluginmain_7c76598b(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_661e2522 === 'function') {
    await nuxt_plugin_axios_661e2522(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_workbox_4e0c4c84 === 'function') {
    await nuxt_plugin_workbox_4e0c4c84(app.context, inject)
  }

  if (typeof nuxt_plugin_metaplugin_c396fa5e === 'function') {
    await nuxt_plugin_metaplugin_c396fa5e(app.context, inject)
  }

  if (typeof nuxt_plugin_iconplugin_ba47af76 === 'function') {
    await nuxt_plugin_iconplugin_ba47af76(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_ymapPlugin_4bb7856d === 'function') {
    await nuxt_plugin_ymapPlugin_4bb7856d(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_glideclient_805635e6 === 'function') {
    await nuxt_plugin_glideclient_805635e6(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_preloaderclient_1780059d === 'function') {
    await nuxt_plugin_preloaderclient_1780059d(app.context, inject)
  }

  if (typeof nuxt_plugin_maska_0381c858 === 'function') {
    await nuxt_plugin_maska_0381c858(app.context, inject)
  }

  if (typeof nuxt_plugin_i18n_1fba523a === 'function') {
    await nuxt_plugin_i18n_1fba523a(app.context, inject)
  }

  if (typeof nuxt_plugin_api_785206da === 'function') {
    await nuxt_plugin_api_785206da(app.context, inject)
  }

  if (typeof nuxt_plugin_facebookPixel_7535da0d === 'function') {
    await nuxt_plugin_facebookPixel_7535da0d(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // Wait for async component to be resolved first
  await new Promise((resolve, reject) => {
    // Ignore 404s rather than blindly replacing URL in browser
    if (process.client) {
      const { route } = router.resolve(app.context.route.fullPath)
      if (!route.matched.length) {
        return resolve()
      }
    }
    router.replace(app.context.route.fullPath, resolve, (err) => {
      // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
      if (!err._isRouter) return reject(err)
      if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

      // navigated to a different route in router guard
      const unregister = router.afterEach(async (to, from) => {
        if (process.server && ssrContext && ssrContext.url) {
          ssrContext.url = to.fullPath
        }
        app.context.route = await getRouteData(to)
        app.context.params = to.params || {}
        app.context.query = to.query || {}
        unregister()
        resolve()
      })
    })
  })

  return {
    app,
    router
  }
}

export { createApp, NuxtError }
