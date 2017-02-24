import 'es6-promise/auto'
import { hideLoading } from './util/loading'
import { trackPageView } from './util/tracker'
import { setSharePanel } from './util'

hideLoading()
trackPageView()
setSharePanel()
