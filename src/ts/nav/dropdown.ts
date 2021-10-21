const dropdownItems = document.querySelectorAll(".dropdown-item");
const allSubMenus = document.querySelectorAll(".dropdown-menu");
const navbar = document.querySelector("body > nav") as HTMLElement;

// Clicking on the dropdown items triggers the menus
for (const item of dropdownItems) {
  item.addEventListener("click", () => {
    const subMenu = item.querySelector(".dropdown-menu") as HTMLDivElement;
    subMenu.classList.toggle("active");
    for (const menu of allSubMenus) {
      if (menu !== subMenu) {
        menu.classList.remove("active");
      }
    }
  });
}

// Clicking anywhere outside the nav hides all the menus
document.addEventListener("click", (event) => {
  if (!navbar.contains(event.target as Node)) {
    for (const menu of allSubMenus) {
      menu.classList.remove("active");
    }
  }
});
