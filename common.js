class RotatableImage {
    constructor(element, rotation, tokenIndex = -1) {
        this.element = element;
        this.rotation = rotation;
        this.tokenIndex = tokenIndex;

        this.element.addEventListener('click', (event) => {
            this.changeToNextImage(this.element, this.rotation);
            event.stopPropagation();
        });
    }

    changeToNextImage() {
        const prevImage = window.getComputedStyle(this.element).getPropertyValue('background-image');
        const prevVal = prevImage.slice(prevImage.indexOf('-') + 1, prevImage.lastIndexOf('.'));
        const nextIndex = (this.rotation.indexOf(prevVal) + 1) % this.rotation.length;
        const nextImage = prevImage.slice(0, prevImage.indexOf('-') + 1) + this.rotation[nextIndex] + '.png")';
        this.element.style.backgroundImage = nextImage;
    }
}

const uploadableImageEventNames = ['mousedown', 'mousemove', 'mouseup', 'mouseleave', 'wheel'];

class UploadableImage {
    constructor(element) {
        this.element = element;
        this.initState();
        this.addEventListeners();
        this.configureBubbling();
    }

    initState() {
        this.isMouseDown = false;
        this.isDragging = false;
        this.imageStartX;
        this.imageStartY;
        this.scale = ['cover', ''].includes(this.element.style.backgroundSize) ? 1 : parseInt(this.element.style.backgroundSize) / 100;
    }

    addEventListeners() {
        this.element.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.element.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.element.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.element.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        this.element.addEventListener('wheel', this.handleMouseWheel.bind(this));
    }

    handleMouseDown(event) {
        this.isMouseDown = true;
        this.mouseDownStartX = event.clientX;
        this.mouseDownStartY = event.clientY;
        this.imageStartX = parseInt(window.getComputedStyle(this.element).backgroundPositionX, 10);
        this.imageStartY = parseInt(window.getComputedStyle(this.element).backgroundPositionY, 10);
        event.stopPropagation();
    }

    handleMouseMove(event) {
        if (this.isMouseDown) {
            const offsetX = event.clientX - this.mouseDownStartX;
            const offsetY = event.clientY - this.mouseDownStartY;
            this.element.style.backgroundPositionX = this.imageStartX + offsetX + 'px';
            this.element.style.backgroundPositionY = this.imageStartY + offsetY + 'px';
            this.isDragging = true;
        }
        event.stopPropagation();
    }

    handleMouseUp(event) {
        if (!this.isDragging) {
            this.uploadFile();
        }
        this.isMouseDown = false;
        this.isDragging = false;
        event.stopPropagation();
    }

    handleMouseLeave(event) {
        this.isMouseDown = false;
        this.isDragging = false;
        event.stopPropagation();
    }

    handleMouseWheel(event) {
        event.preventDefault();
        const delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
        this.scale += (delta > 0 ? 0.04 : -0.04);
        this.element.style.backgroundSize = `${this.scale * 100}% auto`;
        event.stopPropagation();
    }

    uploadFile() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';

        fileInput.click();

        fileInput.addEventListener('change', () => {
            const selectedFile = fileInput.files[0];

            const reader = new FileReader();
            reader.onload = (event) => {
                this.element.style.backgroundImage = `url(${event.target.result})`;
            };

            reader.readAsDataURL(selectedFile);

            this.element.style.backgroundPositionX = '0px';
            this.element.style.backgroundPositionY = '0px';
            this.element.style.backgroundSize = 'cover';
            this.scale = 1;
        });
    }

    static bubbleToTargetElement(event, targetElement) {
        if (isEventInsideElement(event, targetElement)) {
            targetElement.dispatchEvent(new event.constructor(event.type, event));
            event.stopPropagation();
        }
    }

    configureBubbling() {
        const eventSourceElement = this.element.parentElement.querySelector('.uploadable-image-event-source');
        uploadableImageEventNames.forEach((eventName) => {
            eventSourceElement.addEventListener(eventName, (event) => UploadableImage.bubbleToTargetElement(event, this.element));
        });
    }
}

function isEventInsideElement(event, divElement) {
    const rect = divElement.getBoundingClientRect();
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    return mouseX >= rect.left && mouseX <= rect.right
        && mouseY >= rect.top && mouseY <= rect.bottom;
}

/**
 * LocalDefaults class that automatically saves its properties to localStorage
 * whenever a property is set. It loads stored data from localStorage when
 * instantiated, and saves the entire instance on any update.
 *
 * @class LocalDefaults
 * @example
 * const settings = new LocalDefaults();
 * settings.someSetting = 'value';  // Saved to localStorage
 * console.log(settings.someSetting);  // Loaded from localStorage
 */
class LocalDefaults {
  constructor() {
    const storedData = JSON.parse(localStorage.getItem('LocalDefaults')) || {};
    Object.assign(this, storedData);

    return new Proxy(this, {
      set: (target, property, value) => {
        target[property] = value;
        localStorage.setItem('LocalDefaults', JSON.stringify(target));
        return true;
      },
      get: (target, property) => target[property] !== undefined ? target[property] : undefined
    });
  }
}

const localDefaults = new LocalDefaults();
