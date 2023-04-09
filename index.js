class EyeController {
    constructor(elements = {}, eyeSize = '33.33vmin') {
        this._eyeSize = eyeSize;
        this._blinkTimeoutID = null;

        this.setElements(elements);
    }

    get leftEye() {
        return this._leftEye;
    }

    get rightEye() {
        return this._rightEye;
    }

    setElements({
                    leftEye,
                    rightEye,
                    upperLeftEyelid,
                    upperRightEyelid,
                    lowerLeftEyelid,
                    lowerRightEyelid,
                    mouthLeft,
                    mouthRight,
                } = {}) {
        this._leftEye = leftEye;
        this._rightEye = rightEye;
        this._upperLeftEyelid = upperLeftEyelid;
        this._upperRightEyelid = upperRightEyelid;
        this._lowerLeftEyelid = lowerLeftEyelid;
        this._lowerRightEyelid = lowerRightEyelid;
        this.mouthleft = mouthLeft;
        this.mouthright = mouthRight;
        return this;
    }

    _createKeyframes({
                         tgtTranYVal = 0,
                         fromRotVal =0,
                         toRotVal = 0,
                         enteredOffset = 1 / 3,
                         exitingOffset = 2 / 3,
                         tgtTranXVal=0,
                     } = {}) {
        return [
            {transform: `translateY(0px) rotate(0deg)`, offset: 0.0},
            {transform: `translateX(0px) rotate(0deg)`, offset: 0.0},
            {transform: `translateY(${tgtTranYVal}) rotate(${toRotVal})`, offset: enteredOffset},
            {transform: `translateY(${tgtTranYVal}) rotate(${toRotVal})`, offset: exitingOffset},
            {transform: `translateY(0px) rotate(0deg)`, offset: 1.0},
            {transform: `translateX(0px) rotate(0deg)`, offset: 1.0},
        ];
    }

    express({
                type = '',
                // level = 3,  // 1: min, 5: max
                duration = 1000,
                enterDuration = 75,
                exitDuration = 75,
            }) {
        if (!this._leftEye) {  // assumes all elements are always set together
            console.warn('Eye elements are not set; return;');
            return;
        }

        const options = {
            duration: duration,
        };

        switch (type) {
            case 'happy':
                return {
                    lowerLeftEyelid: this._lowerLeftEyelid.animate(this._createKeyframes({
                        tgtTranYVal: `calc(${this._eyeSize} * -2 / 5)`,
                        toRotVal: `25deg`,
                        enteredOffset: enterDuration / duration,
                        exitingOffset: 1 - (exitDuration / duration),
                    }), options),
                    lowerRightEyelid: this._lowerRightEyelid.animate(this._createKeyframes({
                        tgtTranYVal: `calc(${this._eyeSize} * -2 / 5)`,
                        toRotVal: `-25deg`,
                        enteredOffset: enterDuration / duration,
                        exitingOffset: 1 - (exitDuration / duration),
                    }), options),
                    mouthLeft: this.mouthleft.animate(this._createKeyframes({
                        tgtTranYVal: '-35.8px',
                        toRotVal: '20deg',
                    }), options),
                    mouthRight: this.mouthright.animate(this._createKeyframes({
                        tgtTranYVal: '-35.8px',
                        toRotVal: '-20deg',
                    }), options),
                    upperLeftEyelid: this._upperLeftEyelid.animate(this._createKeyframes({
                        tgtTranYVal: `calc(${this._eyeSize} * -0.15)`,
                        enteredOffset: enterDuration / duration,
                        exitingOffset: 1 - (exitDuration / duration),
                    }), options),
                    upperRightEyelid: this._upperRightEyelid.animate(this._createKeyframes({
                        tgtTranYVal: `calc(${this._eyeSize} * -0.15)`,
                        enteredOffset: enterDuration / duration,
                        exitingOffset: 1 - (exitDuration / duration),
                    }), options),
                };

            case 'sad':
                return {
                    upperLeftEyelid: this._upperLeftEyelid.animate(this._createKeyframes({
                        tgtTranYVal: `calc(${this._eyeSize} * 1 / 3)`,
                        toRotVal: `-20deg`,
                        enteredOffset: enterDuration / duration,
                        exitingOffset: 1 - (exitDuration / duration),
                    }), options),
                    upperRightEyelid: this._upperRightEyelid.animate(this._createKeyframes({
                        tgtTranYVal: `calc(${this._eyeSize} * 1 / 3)`,
                        toRotVal: `20deg`,
                        enteredOffset: enterDuration / duration,
                        exitingOffset: 1 - (exitDuration / duration),
                    }), options),
                    mouthLeft: this.mouthleft.animate(this._createKeyframes({
                        tgtTranYVal: '35.8px',
                        toRotVal: '-20deg',
                    }), options),
                    mouthRight: this.mouthright.animate(this._createKeyframes({
                        tgtTranYVal: '35.8px',
                        toRotVal: '20deg',
                    }), options),
                };

            case 'angry':
                return {
                    upperLeftEyelid: this._upperLeftEyelid.animate(this._createKeyframes({
                        tgtTranYVal: `calc(${this._eyeSize} * 1 / 4)`,
                        toRotVal: `30deg`,
                        enteredOffset: enterDuration / duration,
                        exitingOffset: 1 - (exitDuration / duration),
                    }), options),
                    upperRightEyelid: this._upperRightEyelid.animate(this._createKeyframes({
                        tgtTranYVal: `calc(${this._eyeSize} * 1 / 4)`,
                        toRotVal: `-30deg`,
                        enteredOffset: enterDuration / duration,
                        exitingOffset: 1 - (exitDuration / duration),
                    }), options),
                };

            case 'focused':
                return {
                    upperLeftEyelid: this._upperLeftEyelid.animate(this._createKeyframes({
                        tgtTranYVal: `calc(${this._eyeSize} * 1 / 3)`,
                        enteredOffset: enterDuration / duration,
                        exitingOffset: 1 - (exitDuration / duration),
                    }), options),
                    upperRightEyelid: this._upperRightEyelid.animate(this._createKeyframes({
                        tgtTranYVal: `calc(${this._eyeSize} * 1 / 3)`,
                        enteredOffset: enterDuration / duration,
                        exitingOffset: 1 - (exitDuration / duration),
                    }), options),
                    lowerLeftEyelid: this._lowerLeftEyelid.animate(this._createKeyframes({
                        tgtTranYVal: `calc(${this._eyeSize} * -1 / 3)`,
                        enteredOffset: enterDuration / duration,
                        exitingOffset: 1 - (exitDuration / duration),
                    }), options),
                    lowerRightEyelid: this._lowerRightEyelid.animate(this._createKeyframes({
                        tgtTranYVal: `calc(${this._eyeSize} * -1 / 3)`,
                        enteredOffset: enterDuration / duration,
                        exitingOffset: 1 - (exitDuration / duration),
                    }), options),
                }
            case 'surprised':
                return {
                    upperLeftEyelid: this._upperLeftEyelid.animate(this._createKeyframes({
                        tgtTranYVal: `calc(${this._eyeSize} * -0.2)`,
                        enteredOffset: enterDuration / duration,
                        exitingOffset: 1 - (exitDuration / duration),
                    }), options),
                    upperRightEyelid: this._upperRightEyelid.animate(this._createKeyframes({
                        tgtTranYVal: `calc(${this._eyeSize} * -0.2)`,
                        enteredOffset: enterDuration / duration,
                        exitingOffset: 1 - (exitDuration / duration),
                    }), options),
                   mouthLeft: this.mouthleft.animate(this._createKeyframes({
                        tgtTranXVal: '100.8px',
                    }), options),
                    mouthRight: this.mouthright.animate(this._createKeyframes({
                        tgtTranXVal: '35.8px',
                    }), options),
                }
            case 'confused':
                return {
                    upperRightEyelid: this._upperRightEyelid.animate(this._createKeyframes({
                        tgtTranYVal: `calc(${this._eyeSize} * 1 / 3)`,
                        toRotVal: `-10deg`,
                        enteredOffset: enterDuration / duration,
                        exitingOffset: 1 - (exitDuration / duration),
                    }), options),
                }

            default:
                console.warn(`Invalid input type=${type}`);
        }
    }

    blink({
              duration = 150,  // in ms
          } = {}) {
        if (!this._leftEye) {  // assumes all elements are always set together
            console.warn('Eye elements are not set; return;');
            return;
        }

        [this._leftEye, this._rightEye].map((eye) => {
            eye.animate([
                {transform: 'rotateX(0deg)'},
                {transform: 'rotateX(90deg)'},
                {transform: 'rotateX(0deg)'},
            ], {
                duration,
                iterations: 1,
            });
        });
    }

    startBlinking({
                      maxInterval = 5000
                  } = {}) {
        if (this._blinkTimeoutID) {
            console.warn(`Already blinking with timeoutID=${this._blinkTimeoutID}; return;`);
            return;
        }
        const blinkRandomly = (timeout) => {
            this._blinkTimeoutID = setTimeout(() => {
                this.blink();
                blinkRandomly(Math.random() * maxInterval);
            }, timeout);
        }
        blinkRandomly(Math.random() * maxInterval);
    }

    stopBlinking() {
        clearTimeout(this._blinkTimeoutID);
        this._blinkTimeoutID = null;
    }

    setEyePosition(eyeElem, x, y, isRight = false) {
        if (!eyeElem) {  // assumes all elements are always set together
            console.warn('Invalid inputs ', eyeElem, x, y, '; retuning');
            return;
        }

        if (!!x) {
            if (!isRight) {
                eyeElem.style.left = `calc(${this._eyeSize} / 3 * 2 * ${x})`;
            } else {
                eyeElem.style.right = `calc(${this._eyeSize} / 3 * 2 * ${1 - x})`;
            }
        }
        if (!!y) {
            eyeElem.style.bottom = `calc(${this._eyeSize} / 3 * 2 * ${1 - y})`;
        }
    }
}

const eyes = new EyeController({
    leftEye: document.querySelector('.left.eye'),
    rightEye: document.querySelector('.right.eye'),
    upperLeftEyelid: document.querySelector('.left .eyelid.upper'),
    upperRightEyelid: document.querySelector('.right .eyelid.upper'),
    lowerLeftEyelid: document.querySelector('.left .eyelid.lower'),
    lowerRightEyelid: document.querySelector('.right .eyelid.lower'),
    mouthLeft: document.querySelector('.mouthleft'),
    mouthRight: document.querySelector('.mouthright'),
});
