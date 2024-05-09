
class RangeSliderWithIndicator {
    constructor(element) {
        this.element = element;
        this.handlers = {
            input: this.element.oninput,
            change: this.element.onchange,
        };
        this.value = parseInt(this.element.getAttribute('data-value')) || 0;
        this.minValue = parseInt(this.element.getAttribute('data-min')) || 0;
        this.maxValue = parseInt(this.element.getAttribute('data-max')) || 100;
        this.valueRange = this.maxValue - this.minValue;
        this.initUI();
        this.initHandlers();

    }

    initUI() {
        this.element.innerHTML = `
      <div class="indicator"></div>
      <div class="slider">
        <div class="runnable-track">
          <div class="completed-track"></div>
          <div class="thumb"></div>
        </div>
      </div>
    `;
        this.runnableTrack = this.element.querySelector('.slider > .runnable-track');
        this.runnableTrackRect = this.runnableTrack.getBoundingClientRect()
       setInterval(() => {
        const {width,left} = this.runnableTrack.getBoundingClientRect()
          if (this.runnableTrackRect.width  !==  width || this.runnableTrackRect.left !== left) {
            this.initUI()
          }
       },1000)
       this.setSliderControls();
       this.setMarks();
    }

    initHandlers() {
        for (const key in this.handlers) {
            const handler = this.handlers[key];
            if (handler)
                this.element.addEventListener(`r-s-w-i-${key}`, handler);
        }
    }
    setSliderControls() {

        const completedTrack = this.runnableTrack.querySelector('.completed-track');
        const thumb = this.runnableTrack.querySelector('.thumb');

        const thumbHalfWidth = thumb.getBoundingClientRect().width / 2;
        const initialValueStr = this.element.getAttribute('data-value');
        const initialValue = initialValueStr === null ? this.minValue : parseInt(initialValueStr);
        this.element.value = initialValue;
        let valueDivision = this.runnableTrackRect.width / this.valueRange;
        let startX = 0;
        const initialCompletedWidth = valueDivision * (initialValue - this.minValue);
        thumb.style.left = `${initialCompletedWidth - thumbHalfWidth}px`;
        completedTrack.style.width = `${initialCompletedWidth}px`;

        const thumbPointerMoveHandler = (e) => {
            const movePx = e.clientX - startX;
            const completedWidth = Math.max(0, Math.min(movePx, this.runnableTrackRect.width));
            const newValue = Math.max(this.minValue, Math.min(this.maxValue, Math.round(this.minValue + (movePx / valueDivision))));
            if (newValue !== this.element.value) {
                this.element.value = newValue;
                this.element.dispatchEvent(new Event('r-s-w-i-input'));
            }
            thumb.style.left = `${completedWidth - thumbHalfWidth}px`;
            completedTrack.style.width = `${completedWidth}px`;
        };

        const thumbPointerUpHandler = (e) => {
            this.element.dispatchEvent(new Event('r-s-w-i-change'));
            document.removeEventListener('pointermove', thumbPointerMoveHandler);
            document.removeEventListener('pointerup', thumbPointerUpHandler);
        };

        thumb.addEventListener('pointerdown', (e) => {
            const { width } = completedTrack.getBoundingClientRect();
            startX = e.clientX - width;
            document.addEventListener('pointermove', thumbPointerMoveHandler);
            document.addEventListener('pointerup', thumbPointerUpHandler);
        });

        this.runnableTrack.addEventListener('click', (e) => {
            const completedWidth = e.clientX - this.runnableTrackRect.left;
            thumb.style.left = `${completedWidth - thumbHalfWidth}px`;
            completedTrack.style.width = `${completedWidth}px`;
            const newValue = Math.max(this.minValue, Math.min(this.maxValue, Math.round(this.minValue + (completedWidth / valueDivision))));

            if (newValue !== this.element.value) {
                this.element.value = newValue;
                this.element.dispatchEvent(new Event('r-s-w-i-input'));
                this.element.dispatchEvent(new Event('r-s-w-i-change'));
            }
        });

        thumb.ondragstart = (e) => e.preventDefault();
    }

    setMarks() {

        const indicator = this.element.querySelector('.indicator');
        const marksTextArray = this.getMarksText();

        for (let i = 0; i < marksTextArray.length; i++) {
            const marksText = document.createElement('div');
            const marksStop = document.createElement('div');
            marksText.classList.add('marks-text');
            marksText.innerText = marksTextArray[i]
            marksStop.classList.add('marks-stop');
            indicator.append(marksText, marksStop);
            const leftPx = (marksTextArray[i] - this.minValue) * (this.runnableTrackRect.width / this.valueRange)
            const { width } = marksText.getBoundingClientRect()
            marksText.style.left = `${leftPx - width / 2}px`;
            marksStop.style.left = `${leftPx}px`;
        }
    }

    getMarksText() {
        const marksTextArray = [];
          const increace = this.getIncreace();
          console.log(increace);
        for (let i = this.minValue; i <= this.maxValue; i+=increace) {
            marksTextArray.push(i);
        }
        return marksTextArray;
        // const totalMarks = Math.round(this.runnableTrackRect.width / 70);

                // const increace = this.valueRange / totalMarks;
        // let multiply = 1;
        // for (let i = 1; i <= totalMarks; i++, multiply++) {
        //     const marksText = this.minValue + increace * multiply;
        //     marksTextArray.push(Math.round(marksText));
        // }
        // console.log(marksTextArray);
    }
    getIncreace() {
        let multiply = 1;
        const {width} = this.runnableTrackRect
         if (width >= 150 && width < 500)
          multiply =  2
        else if (width >= 50 && width < 150)
         multiply =  5
        return Math.round(this.maxValue / 10) * multiply
    }
  
}



window.addEventListener('load', () => {
    const rangeSliders = document.querySelectorAll(
        'div[role="range-slider-with-indicator"]'
    );
    rangeSliders.forEach(elm => new RangeSliderWithIndicator(elm));
});
