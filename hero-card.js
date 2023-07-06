    document.querySelector('.faction-image').addEventListener('click', function() {
      const prevImage = window.getComputedStyle(this).getPropertyValue('background-image');
      const factions = ['alliance', 'horde', 'argent', 'hs'];
      let faction = prevImage.slice(prevImage.indexOf('-') + 1, prevImage.lastIndexOf('.'));
      let nextIndex = (factions.indexOf(faction) + 1) % factions.length;
      const nextImage = prevImage.slice(0, prevImage.indexOf('-') + 1) + factions[nextIndex] + '.png")';
      this.style.backgroundImage = nextImage;
    });

    document.querySelector('.hero-card-bottom').addEventListener('click', function() {
      const prevImage = window.getComputedStyle(this).getPropertyValue('background-image');
      let health = parseInt(prevImage.charAt(prevImage.length - 7));
      if (health == 8)
        health = 6;
      else
        health += 1;
      const nextImage = prevImage.slice(0, -7) + health + '.png")';
      this.style.backgroundImage = nextImage;
    });

    document.querySelector('.starting-location-image').addEventListener('click', function() {
      const prevImage = window.getComputedStyle(this).getPropertyValue('background-image');
      const locations = ['green', 'purple', 'red'];
      let location = prevImage.slice(prevImage.indexOf('-') + 1, prevImage.lastIndexOf('.'));
      let nextIndex = (locations.indexOf(location) + 1) % locations.length;
      const nextImage = prevImage.slice(0, prevImage.indexOf('-') + 1) + locations[nextIndex] + '.png")';
      this.style.backgroundImage = nextImage;
    });

    document.querySelector("textPath").addEventListener("click", function(event) {
      // Show the popup container and input element
      let popupInput = document.querySelector(".starting-location-input")
      popupInput.style.display = "block";
      // Set focus to the input element
      popupInput.focus();
      popupInput.select();
      // Prevent the event from propagating to outer div
      event.stopPropagation();
    });

    let updateLocationTextAndHideInput = function() {
      let popupInput = document.querySelector(".starting-location-input");
      var text = popupInput.value || 'Enter starting location';
      if (text.length < 13)
        text = '\xa0'.repeat(13 - text.length) + text;
      document.querySelector("textPath").textContent = text.toUpperCase();
      popupInput.style.display = 'none';
    }

    document.querySelector(".starting-location-input").addEventListener("blur", function() {
      updateLocationTextAndHideInput();
    });

    document.querySelector(".starting-location-input").addEventListener('keypress', function() {
      if (event.keyCode === 13) {
        updateLocationTextAndHideInput();
      }
    });

    var heroImageDiv = document.querySelector('.hero-image');
    var isMouseDown = false;
    var isDragging = false;
    var startPosX;
    var startPosY;
    var imageStartX;
    var imageStartY;

    heroImageDiv.addEventListener('mousedown', function(event) {
      isMouseDown = true;
      mouseDownStartX = event.clientX;
      mouseDownStartY = event.clientY;
      imageStartX = parseInt(window.getComputedStyle(heroImageDiv).backgroundPositionX, 10);
      imageStartY = parseInt(window.getComputedStyle(heroImageDiv).backgroundPositionY, 10);
      event.stopPropagation();
    });

    heroImageDiv.addEventListener('mousemove', function(event) {
      if (isMouseDown) {
        // Handle dragging event
        var offsetX = event.clientX - mouseDownStartX;
        var offsetY = event.clientY - mouseDownStartY;
        heroImageDiv.style.backgroundPositionX = imageStartX + offsetX + 'px';
        heroImageDiv.style.backgroundPositionY = imageStartY + offsetY + 'px';
        isDragging = true;
      }
      event.stopPropagation();
    });

    heroImageDiv.addEventListener('mouseup', function() {
      if (!isDragging) {
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
            document.querySelector(".hero-image").style.backgroundImage = `url(${event.target.result})`;
          };

          // Read the selected file as a data URL
          reader.readAsDataURL(selectedFile);

          // imageDiv
          heroImageDiv.style.backgroundPositionX = '0px';
          heroImageDiv.style.backgroundPositionY = '0px';
          heroImageDiv.style.backgroundSize = 'cover';
          scale = 1;
        });
      }
      isMouseDown = false;
      isDragging = false;
      event.stopPropagation();
    });

    heroImageDiv.addEventListener('mouseleave', function() {
      isMouseDown = false;
      isDragging = false;
      event.stopPropagation();
    });


    var scale = 1;
    heroImageDiv.addEventListener('wheel', function(event) {
      event.preventDefault();
      var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
      if (delta > 0) {
        // Zoom in
        scale += 0.04;
      } else {
        // Zoom out
        scale -= 0.04;
      }
      heroImageDiv.style.backgroundSize = `${scale * 100}% auto`;
      event.stopPropagation();
    });

    var heroImageParent = document.querySelector('.hero-card-top-left');
    heroImageParent.addEventListener('mousedown', bubbleToHeroImage);
    heroImageParent.addEventListener('mousemove', bubbleToHeroImage);
    heroImageParent.addEventListener('mouseup', bubbleToHeroImage);
    heroImageParent.addEventListener('mouseleave', bubbleToHeroImage);
    heroImageParent.addEventListener('wheel', bubbleToHeroImage);

    function bubbleToHeroImage(event) {
        if (isEventInsideElement(event, heroImageDiv)) {
            heroImageDiv.dispatchEvent(new event.constructor(event.type, event));
            event.stopPropagation();
        }
    }

    function isEventInsideElement (event, divElement) {
        const rect = divElement.getBoundingClientRect();
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        return mouseX >= rect.left && mouseX <= rect.right
            && mouseY >= rect.top && mouseY <= rect.bottom;
    }

    document.querySelector('.hero-name').addEventListener('input', function() {
        document.title = 'Unofficial WoW Pandemic Hero - ' + this.textContent;
    });

//    window.addEventListener('beforeprint', function() {
//        //TODO: print to see how health bar looks
//        document.querySelector('.hero-card-top').style.backgroundImage = "url('hero-card-template-wip.png')";
//        var heroCard = document.querySelector('.hero-card');
//        heroCardBgImage = window.getComputedStyle(heroCard).getPropertyValue('background-image');
//        heroCard.style.backgroundImage = '';
//    });
//
//    window.addEventListener('afterprint', function() {
//        document.querySelector('.hero-card').style.backgroundImage = heroCardBgImage;
//        document.querySelector('.hero-card-top').style.backgroundImage = '';
//    });