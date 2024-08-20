import { addClasses, replaceTextLevel } from "../../scripts/util.js";

const contactFields = [
  "contact-icon",
  "contact-type",
  "contact-value",
  "contact-description",
];

export default function decorate(block) {
  console.log(block);
  [...block.children].forEach((contactWrapper) => {
    [...contactWrapper.children].forEach((div, index) => {
      div.className = contactFields[index];
    });

    contactWrapper.className = "contact-wrapper";
  });

  // Additional styling
  const contactTypes = block.querySelectorAll(".contact-type");
  contactTypes.forEach((instance) => {
    addClasses(instance, "overline");
    instance.textContent = instance.textContent.toUpperCase();
  });

  const contactValues = block.querySelectorAll(".contact-value");
  contactValues.forEach((instance) => {
    replaceTextLevel(instance, "p", "h4");
  });
}
