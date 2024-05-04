window.addEventListener('load', () => {
    const rangeSliders = document.querySelectorAll('div[role="range-slider-with-indicator"]')
    rangeSliders.forEach(initRangeSliderWithIndicator)
}) 
function initRangeSliderWithIndicator(rangeSliderWithIndicator) {
    const minValue = parseInt(rangeSliderWithIndicator.getAttribute('data-min'))
    const maxValue = parseInt(rangeSliderWithIndicator.getAttribute('data-max'))
    rangeSliderWithIndicator.innerHTML = `
      <div class="indicator"></div>
      <div class="slider">
      <div class="runnable-track">
       <div class="completed-track"></div> 
        <div  class="thumb"></div>
        </div>
      </div>
    `
   setHandlers(rangeSliderWithIndicator)
   setSldierControls(rangeSliderWithIndicator,minValue,maxValue)
   setMarks(minValue,maxValue)
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
function setSldierControls(rangeSliderWithIndicator,minValue,maxValue) {
  const runnableTrack = rangeSliderWithIndicator.querySelector('.slider > .runnable-track')
  const completedTrack = runnableTrack.querySelector('.completed-track')
  const thumb = runnableTrack.querySelector('.thumb')
  const runnableTrackWidth = runnableTrack.getBoundingClientRect().width
  const initialValue = parseInt(rangeSliderWithIndicator.getAttribute('data-value'))

  let currentValue = initialValue
  let startX = 0
  completedTrack.style.width = `${ ((initialValue - minValue) / (maxValue - minValue)) * 100}%`

 function getPercentValue(value) {
   return  (value / maxValue) * 100
 }
 const thumbPointerMoveHandler = (e) => {
    console.log( (e.clientX - startX) / runnableTrackWidth)

    // const value = (e.clientX - startX) / runnableTrackWidth * maxValue
    // currentValue = Math.max(minValue, Math.min(maxValue, value))
    // const percent =  getPercentValue(currentValue)
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
 thumb.ondragstart = (e) => e.preventDefault()


 
}

function setMarks(minValue,maxValue) {
   const marksArray = []
   for (let i = minValue; i <= maxValue; i+= maxValue / 3) {
    marksArray.push(i)
   }

   console.log(marksArray);

//    const indicator = document.querySelector('.indicator')
//    indicator.innerHTML = marksArray.map(i => `<div class="mark">${i}</div>`).join('')
}

