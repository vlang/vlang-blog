const toggleThemeButton = document.getElementById(
  "theme-toggle-button"
) as HTMLButtonElement;
const lightIcon = document.getElementById("light-icon") as HTMLElement;
const darkIcon = document.getElementById("dark-icon") as HTMLElement;
const html = document.documentElement;

const getCurrentTheme = (): string => {
  return localStorage.getItem("theme") || "light";
};

const animateTransition = () => {
  html.classList.add("transition");
  window.setTimeout(() => {
    html.classList.remove("transition");
  }, 300);
};

const setTheme = (theme: string) => {
  localStorage.setItem("theme", theme);
  html.setAttribute("data-theme", theme);
  if (theme === "dark") {
    lightIcon.classList.remove("hidden-icon");
    darkIcon.classList.add("hidden-icon");
  } else {
    lightIcon.classList.add("hidden-icon");
    darkIcon.classList.remove("hidden-icon");
  }
};

const flipTheme = (currentTheme: string): string => {
  return currentTheme === "light" ? "dark" : "light";
};

toggleThemeButton.addEventListener("click", () => {
  setTheme(flipTheme(getCurrentTheme()));
  animateTransition();
});

setTheme(getCurrentTheme());
