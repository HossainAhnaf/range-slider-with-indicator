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
   setSldierControls(rangeSliderWithIndicator)
   setMarks(marksArray)
}   

function setSldierControls(rangeSliderWithIndicator) {
    let startX = 0
 const thumbPointerMoveHandler = (e) => {
    console.clear();
    console.log(e.clientX - startX);
     
  }
  const thumb = rangeSliderWithIndicator.querySelector('.slider > .runnable-track > .thumb')
  thumb.addEventListener('pointerdown', (e) => {
    startX = e.clientX
  document.addEventListener('pointermove', thumbPointerMoveHandler)
  })

  document.addEventListener('pointerup', (e) => {
   document.removeEventListener('pointermove', thumbPointerMoveHandler)
 })
 
}

function setMarks(marksArray) {

}

