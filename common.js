
class RotatableImage {
    constructor(element, rotation, tokenIndex = -1) {
        this.element = element;
        this.rotation = rotation;
        this.tokenIndex = tokenIndex;
        let that = this;
        this.element.addEventListener('click', function(event) {
            that.changeToNextImage(that.element, that.rotation);
            event.stopPropagation();
        });
    }

    changeToNextImage() {
        const prevImage = window.getComputedStyle(this.element).getPropertyValue('background-image');
        let prevVal = prevImage.slice(prevImage.indexOf('-') + 1, prevImage.lastIndexOf('.'));
        let nextIndex = (this.rotation.indexOf(prevVal) + 1) % this.rotation.length;
        let nextImage = prevImage.slice(0, prevImage.indexOf('-') + 1) + this.rotation[nextIndex] + '.png")';
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
        let that = this;
        this.element.addEventListener('mousedown', function(event) {
            that.isMouseDown = true;
            this.mouseDownStartX = event.clientX;
            this.mouseDownStartY = event.clientY;
            that.imageStartX = parseInt(window.getComputedStyle(that.element).backgroundPositionX, 10);
            that.imageStartY = parseInt(window.getComputedStyle(that.element).backgroundPositionY, 10);
            event.stopPropagation();
        });

        this.element.addEventListener('mousemove', function(event) {
            if (that.isMouseDown) {
                // Handle dragging event
                var offsetX = event.clientX - this.mouseDownStartX;
                var offsetY = event.clientY - this.mouseDownStartY;
                that.element.style.backgroundPositionX = that.imageStartX + offsetX + 'px';
                that.element.style.backgroundPositionY = that.imageStartY + offsetY + 'px';
                that.isDragging = true;
            }
            event.stopPropagation();
        });

        this.element.addEventListener('mouseup', function() {
            if (!that.isDragging) {
                // Handle click event
                // Create a file input element
                var fileInput = document.createElement('input');
                fileInput.type = 'file';

                // Trigger the file selection dialog when the input is clicked
                fileInput.click();

                // Listen for the file input change event
                fileInput.addEventListener('change', function() {
                    // Get the selected file from the input
                    var selectedFile = fileInput.files[0];

                    // Create a FileReader to read the file
                    var reader = new FileReader();

                    // Define the onload event handler
                    reader.onload = function(event) {
                        // Set the background image of the div using the selected file
                        that.element.style.backgroundImage = `url(${event.target.result})`;
                    };

                    // Read the selected file as a data URL
                    reader.readAsDataURL(selectedFile);

                    // imageDiv
                    that.element.style.backgroundPositionX = '0px';
                    that.element.style.backgroundPositionY = '0px';
                    that.element.style.backgroundSize = 'cover';
                    that.scale = 1;
                });
            }
            that.isMouseDown = false;
            that.isDragging = false;
            event.stopPropagation();
        });

        this.element.addEventListener('mouseleave', function() {
            that.isMouseDown = false;
            that.isDragging = false;
            event.stopPropagation();
        });

        this.element.addEventListener('wheel', function(event) {
            event.preventDefault();
            var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
            if (delta > 0) {
                // Zoom in
                that.scale += 0.04;
            } else {
                // Zoom out
                that.scale -= 0.04;
            }
            that.element.style.backgroundSize = `${that.scale * 100}% auto`;
            event.stopPropagation();
        });
    }

    static bubbleToTargetElement(event, targetElement) {
        if (isEventInsideElement(event, targetElement)) {
            targetElement.dispatchEvent(new event.constructor(event.type, event));
            event.stopPropagation();
        }
    }

    configureBubbling() {
        var eventSourceElement = this.element.parentElement.querySelector('.uploadable-image-event-source');
        uploadableImageEventNames.forEach((eventName) => {
            eventSourceElement.addEventListener(eventName, event => UploadableImage.bubbleToTargetElement(event, this.element));
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
