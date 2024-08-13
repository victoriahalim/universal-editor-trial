import { addClasses } from "../../scripts/util.js";

const contactFields = ["contact-icon", "contact-type", "contact-value", "contact-description"];

export default function decorate(block){
    const allDivs= block.querySelectorAll(':scope > div');

    allDivs.forEach((div, index) => {
        div.className = `${contactFields[index]}-wrapper`;
        div.querySelector("div").className = contactFields[index];
    });

    const contactType = block.querySelector(".contact-type");
    addClasses(contactType, "overline");
    contactType.textContent = contactType.textContent.toUpperCase();
}