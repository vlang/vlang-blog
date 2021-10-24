const toggleButton = document.getElementById(
  "mobile-menu-toggle-button"
) as HTMLButtonElement;
const mobileMenu = document.getElementById("mobile-navlinks") as HTMLDivElement;
const bars = [1, 2, 3].map(
  (item) => document.getElementById("bar" + item) as HTMLDivElement
);
const allElements = [toggleButton, mobileMenu, ...bars];
let scrollActive = true;
toggleButton.addEventListener("click", () => {
  allElements.forEach((element) => element.classList.toggle("is-active"));
  scrollActive = !scrollActive;
  if (scrollActive) {
    window.onscroll = () => {};
  } else {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;
    window.onscroll = () => {
      window.scrollTo(scrollLeft, scrollTop);
    };
  }
});
