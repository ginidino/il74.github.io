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
});

function hideBox() {
  var boxId = this.closest('.box').id;
  var box = document.getElementById(boxId);
  box.style.display = 'none';
}

function redirectToStorytelling() {
  window.location.href = 'storytelling.html';
}
