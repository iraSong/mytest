var count = 0

export const showLoading = () => {
  var dom = document.getElementById('loading-animation')
  if (!dom) {
    dom = document.createElement('div')
    dom.setAttribute('id', 'loading-animation')
    document.body.appendChild(dom)
  }
  count += 1
  dom.style.display = 'block'
}

export const hideLoading = () => {
  count -= 1
  if (count < 0) {
    count = 0
  }
  if (!count) {
    var dom = document.getElementById('loading-animation')
    if (dom) {
      setTimeout(() => {
        dom.style.display = 'none'
      }, 400)
    }
  }
}
