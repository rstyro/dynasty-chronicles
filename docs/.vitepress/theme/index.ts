import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import RandomButton from './components/RandomButton.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(RandomButton),
    })
  },
}
