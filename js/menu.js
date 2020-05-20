(function () {
  "use strict";

  const mainNavContainer = document.getElementById("main-nav-container");
  const mainMenu = document.getElementById("main-menu");

  /**
   * Set the aria-label to either show or close based on current state
   * @param {Object} toggle - Button on which to set the appropriate accessible name
   */
  function setAccessibleName(toggle) {
    let accessibleName = toggle.getAttribute("aria-label");

    accessibleName =
      accessibleName === "Show Menu" ? "Close Menu" : "Show Menu";

    toggle.setAttribute("aria-label", accessibleName);
  }

  function hideSubMenuItems(subnavList) {
    Array.from(subnavList).forEach((element) => {
      element.classList.add("hidden");
      element.setAttribute("aria-expanded", false);
    });
  }

  if (mainNavContainer) {
    const mainMenuToggle = document.getElementById("main-menu-toggle");
    const subnavList = mainNavContainer.querySelectorAll(".subnav");

    hideSubMenuItems(subnavList);

    document.addEventListener("keyup", (event) => {
      if (event.key === "Escape") {
        hideSubMenuItems(subnavList);
      }
    });

    document.addEventListener("click", (event) => {
      if (
        event.target &&
        event.target instanceof HTMLElement &&
        !event.target.classList.contains("top-level-entry")
      ) {
        hideSubMenuItems(subnavList);
      }
    });

    mainNavContainer.addEventListener("click", (event) => {
      let target = event.target;

      if (target.classList.contains("main-menu-toggle")) {
        setAccessibleName(mainMenuToggle);

        mainMenu.classList.toggle("show");
        mainMenuToggle.classList.toggle("expanded");
      } else if (target.classList.contains("top-level-entry")) {
        const subnav = target.nextElementSibling;
        if (subnav) {
          const ariaExpandedState = subnav.getAttribute("aria-expanded");
          subnav.classList.toggle("hidden");
          subnav.setAttribute(
            "aria-expanded",
            ariaExpandedState === "true" ? false : true
          );
        }
      }
    });
  }
})();
