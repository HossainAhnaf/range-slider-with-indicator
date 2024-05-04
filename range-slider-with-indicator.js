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
     rangeSliderWithIndicator.addEventListener('r-s-w-i-input', oninput)
    }
    if (onchange) {
     rangeSliderWithIndicator.addEventListener('r-s-w-i-change', onchange)
    }
}
function setSldierControls(rangeSliderWithIndicator) {
  const runnableTrack = rangeSliderWithIndicator.querySelector('.slider > .runnable-track')
  const completedTrack = runnableTrack.querySelector('.completed-track')
  const thumb = runnableTrack.querySelector('.thumb')
  const runnableTrackWidth = runnableTrack.getBoundingClientRect().width
  const initialValue = parseInt(rangeSliderWithIndicator.getAttribute('data-value'))
  const minValue = parseInt(rangeSliderWithIndicator.getAttribute('data-min'))
  const maxValue = parseInt(rangeSliderWithIndicator.getAttribute('data-max'))
  let currentValue = initialValue
  let startX = 0
  completedTrack.style.width = `${getPercentValue(initialValue)}%`

 function getPercentValue(value) {
    // console.log((value / maxValue) * 100);
   return (value / maxValue) * 100
 }

 const thumbPointerMoveHandler = (e) => {
    console.log(e.clientX , startX);
    // currentValue = Math.max(minValue, Math.min(maxValue, e.clientX))
    // const percent =  getPercentValue(currentValue)
    // console.log(percent);
    // completedTrack.style.width = `${percent}%`
    // Object.getPrototypeOf(rangeSliderWithIndicator).value = currentValue
    // rangeSliderWithIndicator.dispatchEvent(new Event('r-s-w-i-input'))
}
 const thumbPointerUpHandler = (e) => {
    rangeSliderWithIndicator.dispatchEvent(new Event('r-s-w-i-change'))

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

