export function addClass(el, clsName) {
  if (hasClass(el, clsName)) {
    return
  }
  let clsArr = el.className.split(' ')
  clsArr.push(clsName)
  el.className = clsArr.join(' ')
}

export function delClass(el, clsName) {
  if (!hasClass(el, clsName)) {
    return
  }
  let clsArr = el.className.split(' ')
  clsArr.splice(clsArr.indexOf(clsName), 1)
  el.className = clsArr.join(' ')
}

function hasClass(el, clsName) {
  let reg = new RegExp('(^|\\s)' + clsName + '(\\s|$)')
  return reg.test(el.className)
}
