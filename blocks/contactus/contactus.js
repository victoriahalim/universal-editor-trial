import { addClasses } from '../../scripts/scripts.js';

export default function decorate(block){
    const allDivs= block.querySelectorAll('div');

    // add classes for styling
    const contactus = document.querySelector("body");
    addClasses(contactus, 'h5', 'overline');

    allDivs.forEach(function(div){
        div.classList.add('contactus-details');
    });
}