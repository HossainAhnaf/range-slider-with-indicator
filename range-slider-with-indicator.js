window.addEventListener('load', () => {
  const rangeSliders = document.querySelectorAll('div[role="range-slider-with-indicator"]')
  rangeSliders.forEach(initRangeSliderWithIndicator)
}) 
function initRangeSliderWithIndicator(rangeSliderWithIndicator) {
  const minValue = parseInt(rangeSliderWithIndicator.getAttribute('data-min')) || 0
  const maxValue = parseInt(rangeSliderWithIndicator.getAttribute('data-max')) || 100
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
 setMarks(rangeSliderWithIndicator,minValue,maxValue)
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
let runnableTrackWidth = runnableTrack.getBoundingClientRect().width
const initialValueStr = rangeSliderWithIndicator.getAttribute('data-value') 
const initialValue = initialValueStr === null ? minValue :  parseInt(initialValueStr)

let rangeCurrentValue = initialValue
const valueRange = maxValue - minValue
let division = runnableTrackWidth / valueRange
let multiply = initialValue - minValue
let pxToNext = division * multiply
let pxToPrev = pxToNext - division
let startX = 0
completedTrack.style.width = `${division * multiply}px`

window.addEventListener("resize",()=>{
   runnableTrackWidth = runnableTrack.getBoundingClientRect().width
    division = runnableTrackWidth / valueRange
    pxToNext = division * multiply
    pxToPrev = pxToNext - division
   completedTrack.style.width = `${division * multiply}px`

})

const dispatchInputHandler = ()=>{
  Object.getPrototypeOf(rangeSliderWithIndicator).value = rangeCurrentValue
  rangeSliderWithIndicator.dispatchEvent(new Event('r-s-w-i-input'))
}
const canMoveNext = (movePx)=>{
 return  (rangeCurrentValue < maxValue && movePx >= pxToNext)
}
const canMovePrev = (movePx)=> {
 return  (rangeCurrentValue > minValue && movePx <= pxToPrev)
}
const thumbPointerMoveHandler = (e) => {
  const movePx = (e.clientX - startX)
  const _canMoveNext = canMoveNext(movePx)
  const _canMovePrev = canMovePrev(movePx)
 while (canMoveNext(movePx) || canMovePrev(movePx)) {
  if (_canMoveNext){
  completedTrack.style.width = `${pxToNext}px`
  pxToNext = division * ++multiply
  pxToPrev =  pxToNext - division
  rangeCurrentValue++
  dispatchInputHandler()
 }else if (_canMovePrev) {
  completedTrack.style.width = `${pxToPrev}px`
  pxToNext = division * --multiply
  pxToPrev =  pxToNext - division
  rangeCurrentValue--
  dispatchInputHandler()
 }
 }


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

function setMarks(rangeSliderWithIndicator,minValue,maxValue) { 

//    console.log(marksArray);

//    const indicator = document.querySelector('.indicator')
//    indicator.innerHTML = marksArray.map(i => `<div class="mark">${i}</div>`).join('')
 const rangeSliderWithIndicatorWidth =rangeSliderWithIndicator.getBoundingClientRect().width
 const totalMarks = Math.round(rangeSliderWithIndicatorWidth / 50)
 const marksArray = []

 for (let i = 0; i < totalMarks; i++) {
   console.log((90 / totalMarks) + (marksArray[i - 1] || 0))
  marksArray.push((90 / totalMarks) + (marksArray[i - 1] || 0) )
 }

 console.log(marksArray,totalMarks) 
}
