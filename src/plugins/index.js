import { setupGlobalComponents } from './global-components'
import { setupElIcons } from './icons'

export default {
  install(app) {
    setupElIcons(app)
    setupGlobalComponents(app)
  }
}
