window.addEventListener('load', () => {
    const rangeSliders = document.querySelectorAll('div[role="range-slider-with-indicator"]')
    rangeSliders.forEach(initRangeSliderWithIndicator)
}) 
function initRangeSliderWithIndicator(rangeSliderWithIndicator) {
   const marksArray = JSON.parse(rangeSliderWithIndicator.getAttribute('data-indicator-marks'))
   setSldierControls(rangeSliderWithIndicator)
   setMarks(marksArray)
}   

function setSldierControls(rangeSliderWithIndicator) {
  
}

function setMarks(marksArray) {

}

