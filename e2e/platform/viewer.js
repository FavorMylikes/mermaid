import { Base64 } from 'js-base64'
import mermaid2 from '../../src/mermaid'

/**
 * ##contentLoaded
 * Callback function that is called when page is loaded. This functions fetches configuration for mermaid rendering and
 * calls init for rendering the mermaid diagrams on the page.
 */
const contentLoaded = function () {
  let pos = document.location.href.indexOf('?graph=')
  if (pos > 0) {
    pos = pos + 7
    const graphBase64 = document.location.href.substr(pos)
    const graphObj = JSON.parse(Base64.decode(graphBase64))
    // const graph = 'hello'
    console.log(graphObj)
    const div = document.createElement('div')
    div.id = 'block'
    div.className = 'mermaid'
    div.innerHTML = graphObj.code
    document.getElementsByTagName('body')[0].appendChild(div)
    global.mermaid.initialize(graphObj.mermaid)
    // console.log('graphObj.mermaid', graphObj.mermaid)
    global.mermaid.init()
  }
}
const contentLoadedApi = function () {
  let pos = document.location.href.indexOf('?graph=')
  if (pos > 0) {
    pos = pos + 7
    const graphBase64 = document.location.href.substr(pos)
    const graphObj = JSON.parse(Base64.decode(graphBase64))
    // const graph = 'hello'
    const div = document.createElement('div')
    div.id = 'block'
    div.className = 'mermaid'
    // div.innerHTML = graphObj.code
    document.getElementsByTagName('body')[0].appendChild(div)
    global.mermaid.initialize(graphObj.mermaid)

    mermaid2.render('newid', graphObj.code, (svgCode, bindFunctions) => {
      div.innerHTML = svgCode

      bindFunctions(div)
    }, div)
  }
}

if (typeof document !== 'undefined') {
  /*!
   * Wait for document loaded before starting the execution
   */
  window.addEventListener(
    'load',
    function () {
      if (this.location.href.match('xss.html')) {
        this.console.log('Using api')
        contentLoadedApi()
      } else {
        this.console.log('Not using api')
        contentLoaded()
      }
    },
    false
  )
}
