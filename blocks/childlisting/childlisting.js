import { replaceTextLevel } from "../../scripts/util.js";

export default function decorate(block) {
  const blockData = block.querySelectorAll(":scope > div");
  const childListing = blockData[0];

  const displayText = blockData[1].textContent;
  childListing.querySelector("a").textContent = displayText;

  block.removeChild(blockData[1]);
  replaceTextLevel(block, "p", "h6");
}
