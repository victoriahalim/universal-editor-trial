import { replaceTextLevel } from "../../scripts/util.js";

export default function decorate(block) {
  [...block.children].forEach((data) => {
    const childlisting = [...data.children][0];
    const listingText = [...data.children][1];

    childlisting.querySelector("a").textContent = listingText.textContent;
    replaceTextLevel(block, "p", "h6");
    childlisting.className = "childlisting-wrapper";

    data.removeChild(listingText);
  });
}
