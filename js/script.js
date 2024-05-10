document.addEventListener('DOMContentLoaded', function() {
  var buttons = document.querySelectorAll('.button');
  buttons.forEach(function(button) {
    button.addEventListener('click', hideBox);
  });

  var closeButton = document.querySelector('.button.close');
  if (closeButton) {
    closeButton.addEventListener('click', hideBox);
  }

  var storytellingBox = document.getElementById('storytelling');
  if (storytellingBox) {
    storytellingBox.addEventListener('click', redirectToStorytelling);
  }

  var boxes = document.querySelectorAll('.box');
  boxes.forEach(function(box) {
    box.addEventListener('mouseenter', showTextAndBlur);
    box.addEventListener('mouseleave', hideTextAndBlur);
  });
});

function hideBox() {
  var boxId = this.closest('.box').id;
  var box = document.getElementById(boxId);
  box.style.display = 'none';
}

function redirectToStorytelling() {
  window.location.href = 'storytelling.html';
}

function showTextAndBlur() {
  var h2 = this.querySelector('h2');
  h2.style.opacity = '1';
  this.querySelector('img').style.filter = 'brightness(70%) blur(3px)';
}

function hideTextAndBlur() {
  var h2 = this.querySelector('h2');
  h2.style.opacity = '0';
  this.querySelector('img').style.filter = 'brightness(100%) blur(0)';
}
