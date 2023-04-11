import Kiwi from "../img/kiwi.jpg";
import altText from "./altText.txt";

const addImg = () => {
  const img = document.createElement("img");
  img.classList.add("kiwi_img");
  img.alt = altText;
  img.width = "300";
  img.src = Kiwi;
  const body = document.querySelector("body");
  body.appendChild(img);
};

export default addImg;
