export function replaceTextLevel(block, oldLevel, newLevel) {
    const oldElement = block.querySelector(oldLevel)
    const newElement = document.createElement(newLevel);
    newLevel.innerHTML = initialLevel.innerHTML;
    initial.parentNode.replaceChild(newElement, oldElement);
};

/* Adds classes to a target element */
export function addClasses(targetElement, newClasses) {
    targetElement.classList.add(newClasses);
}
    