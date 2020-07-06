let lastAnimationFrameTime = 0;
let lastFpsUpdateTime = 0;
const fpsElement = document.getElementById('fps');

export const calculateFps = (now: number): number => {
  const fps = 1000 / (now - lastAnimationFrameTime);
  lastAnimationFrameTime = now;

  if (now - lastFpsUpdateTime > 1000) {
    lastFpsUpdateTime = now;
    fpsElement.innerHTML = fps.toFixed(0) + ' fps';
  }

  return fps;
}

export const requestNextAnimationFrame = (function () {
  let originalWebkitMethod: any
  let wrapper: (time: any) => void
  let geckoVersion: string
  let userAgent: string = navigator.userAgent
  let index: number = 0
  let self: Window = this

  if (window.webkitRequestAnimationFrame) {
    wrapper = (time: number) => {
      if (time === undefined) {
        time = +new Date()
      }
      ; (self as any).callback(time)
    }
    originalWebkitMethod = window.webkitRequestAnimationFrame
      ; (window as any).webkitRequestAnimationFrame = function (
        callback: Function,
        element: HTMLElement
      ): void {
        ; (self as any).callback = callback
        originalWebkitMethod.call(null, wrapper, element)
      }
  }
  if ((window as any).mozRequestAnimationFrame) {
    index = userAgent.indexOf('rv:')
    if (userAgent.indexOf('Gecko') !== -1) {
      geckoVersion = userAgent.substr(index + 3, 3)
      if (geckoVersion === '2.0') {
        ; (window as any).mozRequestAnimationFrame = undefined
      }
    }
  }
  return (
    window.requestAnimationFrame ||
    (window as any).webkitRequestAnimationFrame ||
    (window as any).mozRequestAnimationFrame ||
    (window as any).oRequestAnimationFrame ||
    (window as any).msRequestAnimationFrame ||
    function (callback: Function): void {
      let start: number = 0
      let finish: number = 0
      window.setTimeout(function () {
        start = +new Date()
        callback(start)
        finish = +new Date()
          ; (self as any).timeout = 1000 / 60 - (finish - start)
      }, (self as any).timeout)
    }
  )
})()
