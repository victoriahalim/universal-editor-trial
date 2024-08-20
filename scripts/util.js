export function replaceTextLevel(block, oldLevel, newLevel) {
  const oldElement = block.querySelector(oldLevel);
  const newElement = document.createElement(newLevel);
  newElement.innerHTML = oldElement.innerHTML;
  oldElement.parentNode.replaceChild(newElement, oldElement);
}

/* Adds classes to a target element */
export function addClasses(targetElement, newClasses) {
  targetElement.classList.add(newClasses);
}
