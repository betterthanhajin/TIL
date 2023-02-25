const tag = '[View]'

export default {
  init(el) {
    if (!el) throw el
    this.el = el
    return this
  },

  on(event, handler) {
    this.el.addEventListener(event, handler)
    return this
  },

  emit(event, data) {
    const evt = new CustomEvent(event, { detail: data })
    this.el.dispatchEvent(evt)
    return this
  },
  hide() {
    this.el.style.dispay = 'none'
    return this
  },

  show() {
    this.el.style.display = ''
    return this
  },

  allCheck(status) {
    let allChk = document.getElementsByName('chk');
    Array.from(allChk)
    for (let i = 0; i < allChk.length; i++) {
      allChk[i].checked = status
    }
  }
}