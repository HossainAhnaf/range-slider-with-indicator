window.addEventListener('load', () => {
    const rangeSliders = document.querySelectorAll('div[role="range-slider-with-indicator"]')
    rangeSliders.forEach(initRangeSliderWithIndicator)
}) 
function initRangeSliderWithIndicator(rangeSliderWithIndicator) {
    rangeSliderWithIndicator.innerHTML = `
      <div class="indicator"></div>
      <div class="slider">
      <div class="runnable-track">
       <div class="completed-track"></div> 
        <div class="thumb"></div>
        </div>
      </div>
    `
   const marksArray = JSON.parse(rangeSliderWithIndicator.getAttribute('data-indicator-marks'))
   setHandlers(rangeSliderWithIndicator)
   setSldierControls(rangeSliderWithIndicator)
   setMarks(marksArray)
}   
function setHandlers(rangeSliderWithIndicator) {
    const {oninput,onchange} = rangeSliderWithIndicator
    if (oninput) {
     rangeSliderWithIndicator.addEventListener('input', oninput)
    }
    if (onchange) {
     rangeSliderWithIndicator.addEventListener('change', onchange)
    }
}
function setSldierControls(rangeSliderWithIndicator) {
  const runnableTrack = rangeSliderWithIndicator.querySelector('.slider > .runnable-track')
  const completedTrack = runnableTrack.querySelector('.completed-track')
  const thumb = runnableTrack.querySelector('.thumb')
  const runnableTrackWidth = runnableTrack.getBoundingClientRect().width
  let startX = 0
  let currentX = 0
 const thumbPointerMoveHandler = (e) => {
    const percent = ((e.clientX - startX) / runnableTrackWidth) * 100
    const validPercent = Math.max(0, Math.min(percent, 100))
    currentX = e.clientX
    completedTrack.style.width = `${validPercent}%`
    Object.getPrototypeOf(rangeSliderWithIndicator).value = validPercent
    rangeSliderWithIndicator.dispatchEvent(new Event('input'))
}
 const thumbPointerUpHandler = (e) => {
    console.log("pointer up");
    rangeSliderWithIndicator.dispatchEvent(new Event('change'))

    document.removeEventListener('pointermove', thumbPointerMoveHandler)
    document.removeEventListener('pointerup', thumbPointerUpHandler)
 }

  thumb.addEventListener('pointerdown', (e) => {
    console.log(e);
    const {width} = completedTrack.getBoundingClientRect()
    startX =  e.clientX - width
    document.addEventListener('pointermove', thumbPointerMoveHandler)
    document.addEventListener('pointerup', thumbPointerUpHandler)
 })


 
}

function setMarks(marksArray) {

}

