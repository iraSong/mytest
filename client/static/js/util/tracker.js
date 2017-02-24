var trackerInstance = null
const getTracker = () => {
  if (trackerInstance) {
    return Promise.resolve(trackerInstance)
  } else if ('Piwik' in window) {
    var tracker = Piwik.getTracker(piwikPath + '/piwik.php', siteId)
    tracker.setDomains(['*.127.0.0.1', '*.10.31.74.103', '*.hdbeta.exp.igoldenbeta.com', '*.hdbeta.igoldenbeta.com'])
    trackerInstance = tracker
    return Promise.resolve(tracker)
  } else {
    return Promise.reject()
  }
}

export const trackPageView = () => {
  getTracker()
    .then((tracker) => {
      tracker.setCustomUrl(document.URL)
      tracker.trackPageView(document.title)
    })
    .catch(() => {
      setTimeout(() => {
        trackPageView()
      }, 1000)
    })
}

export const trackEvent = (category = 'button', action = 'click', name, value) => {
  getTracker()
    .then((tracker) => {
      var params = [category, action]
      if (name) {
        params.push(name)
      }
      if (value) {
        params.push(value)
      }
      tracker.trackEvent.apply(tracker, params)
    })
}
