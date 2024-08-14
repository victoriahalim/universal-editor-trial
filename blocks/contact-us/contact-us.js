import { moveInstrumentation } from "../../scripts/scripts.js";
import { addClasses } from "../../scripts/util.js";

const contactFields = [
  "contact-icon",
  "contact-type",
  "contact-value",
  "contact-description",
];

export default function decorate(block) {
  // Adding content to block
  [...block.children].forEach((contact) => {
    const contactWrapper = document.createElement("div");
    moveInstrumentation(contact, contactWrapper); // move content from block contact to HTML contactWrapper element

    while (contact.firstElementChild) {
      contactWrapper.append(contact.firstElementChild);
    }

    [...contactWrapper.children].forEach((div, index) => {
      div.className = contactFields[index];
    });

    contactWrapper.className = "contact-wrapper";
    block.append(contactWrapper);
  });

  // Additional styling
  const contactTypes = block.querySelectorAll(".contact-type");
  contactTypes.forEach((instance) => {
    addClasses(instance, "overline");
    instance.textContent = instance.textContent.toUpperCase();
  });
}
