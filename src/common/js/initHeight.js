export function initHeight() {
  var app = document.getElementById('app')
  var appHeight = document.getElementById('app').clientHeight
  var height = document.documentElement.clientHeight
  var bodyHeight = document.body.clientHeight
  if (appHeight < height) {
    app.style.height = height - 100 + 'px'
  } else {
    app.style.height = bodyHeight - 100 + 'px'
  }
}
