import extend from 'extend'

const NOT_SUPPORT = '不支持此功能，请更新金贝塔APP后再试'

const failCallback = (msg) => {
  alert(msg || NOT_SUPPORT)
}

var goldbetaInWindow = false
const waitGoldbetajs = () => {
  if (goldbetaInWindow) {
    return Promise.resolve()
  } else {
    return new Promise((resolve, reject) => {
      let timer = setInterval(() => {
        if ('goldbeta' in window) {
          goldbetaInWindow = true
          clearInterval(timer)
          resolve()
        }
      }, 500)
    })
  }
}

export const jumpOpenUrl = () => {
  waitGoldbetajs()
    .then(() => {
      window.goldbeta.openUrlInSystemBrowser({
        url: brokerAddress,
        failCallback
      })
    })
}

export const popupLogin = (ctx, cb) => {
  waitGoldbetajs()
    .then(() => {
      window.goldbeta.showLoginView({
        callback(info) {
          if (typeof cb === 'function') {
            cb.apply(ctx, JSON.parse(info))
          }
        },
        failCallback
      })
    })
}

const mergeShareParams = (params = {}) => {
  var url = client.htmlPath + '/share.html'
  var shareParams = extend(true, {}, {
    title: '分享的 title',
    content: '分享的 content',
    url: url
  }, params)
  return {
    title: shareParams.title,
    content: shareParams.content,
    url: shareParams.url
  }
}

export const setSharePanel = (params = {}) => {
  waitGoldbetajs()
    .then(() => {
      setTimeout(() => {
        var shareParams = mergeShareParams(params)
        window.goldbeta.setShareView(shareParams)
      }, 1000)
    })
}

export const openSharePanel = (params = {}) => {
  waitGoldbetajs()
    .then(() => {
      var shareParams = mergeShareParams(params)
      window.goldbeta.showShareView(shareParams)
    })
}

export const jumpAppPage = () => {
  waitGoldbetajs()
    .then(() => {
      var url = client.htmlPath + '/index.html?_=' + version
      window.goldbeta.webShowLoginView({
        url: url
      })
    })
}

export const popupRegister = (ctx, cb) => {
  waitGoldbetajs()
    .then(() => {
      window.goldbeta.showRegisterView({
        callback(info) {
          if (typeof cb === 'function') {
            cb.call(ctx, JSON.parse(info))
          }
        },
        failCallback
      })
    })
}
