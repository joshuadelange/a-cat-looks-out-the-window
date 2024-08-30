function getSliceIndex(mousePosition, centerPosition) {
  const relativeDistance = {
    x: mousePosition.x - centerPosition.x,
    y: mousePosition.y - centerPosition.y,
  };

  const numberOfPizzaSlices = 8;
  const sliceWidth = (Math.PI * 2) / numberOfPizzaSlices;

  const theta = Math.atan2(relativeDistance.y, relativeDistance.x);
  return Math.floor(theta / sliceWidth) + numberOfPizzaSlices / 2;
}

function getTotalDistance(mousePosition, centerPosition) {
  const absoluteDistance = {
    x: Math.abs(mousePosition.x - centerPosition.x),
    y: Math.abs(mousePosition.y - centerPosition.y),
  };
  return Math.sqrt(absoluteDistance.x ** 2 + absoluteDistance.y ** 2);
}

function setCatImage(imageToSet) {
  // global var to prevent spamming the dom if we dont need to
  if (imageToSet === window.currentPizzaSlice) return;
  window.currentPizzaSlice = imageToSet;

  // idle state is 0
  // then it's 1-8 for the pizza slices
  const spriteIndex = imageToSet === null ? 0 : imageToSet + 1;
  const catImage = document.getElementById("cat");
  catImage.style.setProperty("--active-cat-sprite", spriteIndex);
}

function checkIfWeShouldChangeCatImage(event) {
  const mousePosition = {
    x: event.clientX,
    y: event.clientY,
  };
  const centerPosition = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };

  const totalDistance = getTotalDistance(mousePosition, centerPosition);
  if (totalDistance > 400) {
    setCatImage(null);
    return;
  }

  const sliceIndex = getSliceIndex(mousePosition, centerPosition);
  setCatImage(sliceIndex);
}

window.onload = function () {
  window.currentPizzaSlice = null;
  window.addEventListener("mousemove", checkIfWeShouldChangeCatImage);
};
