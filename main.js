function getSliceIndex(mousePosition, centerPosition) {
  const relativeDistance = {
    x: mousePosition.x - centerPosition.x,
    y: mousePosition.y - centerPosition.y,
  };

  const numberOfPizzaSlices = 8;
  const sliceWidth = (Math.PI * 2) / numberOfPizzaSlices;

  const theta = Math.atan2(relativeDistance.y, relativeDistance.x);
  return Math.floor(theta / sliceWidth) + 8 / 2;
}

function getTotalDistance(mousePosition, centerPosition) {
  const absoluteDistance = {
    x: Math.abs(mousePosition.x - centerPosition.x),
    y: Math.abs(mousePosition.y - centerPosition.y),
  };
  return Math.sqrt(absoluteDistance.x ** 2 + absoluteDistance.y ** 2);
}

function onMouseMove(event) {
  const mousePosition = {
    x: event.clientX,
    y: event.clientY,
  };
  const centerPosition = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };

  const totalDistance = getTotalDistance(mousePosition, centerPosition);
  if (totalDistance < 400) {
    const sliceIndex = getSliceIndex(mousePosition, centerPosition);
    console.log({ sliceIndex });
  }
}

window.onload = function () {
  window.addEventListener("mousemove", onMouseMove);
};
