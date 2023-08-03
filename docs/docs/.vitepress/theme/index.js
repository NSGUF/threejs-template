import DefaultTheme from 'vitepress/theme'
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'
import { useComponents } from './useComponents'
import './styles/index.css'
import Rack from '../../../components/Rack.vue'
import RackList from '../../../components/RackList.vue'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    useComponents(ctx.app)
    ctx.app.component(Rack.name, Rack)
    ctx.app.component(RackList.name, RackList)
  }
}
