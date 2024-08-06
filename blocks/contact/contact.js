const contactFields = ["contact-icon", "contact-field-name", "contact-heading", "contact-details"];

export default function decorate(block){
    console.log(block);
    const allDivs= block.querySelectorAll(':scope > div');

    allDivs.forEach((div, index) => {
        div.className = `${contactFields[index]}-wrapper`;
        div.querySelector("div").className = contactFields[index];
    });
}

// contact icon, field name, heading, contact details