// makes this button tick / untick
// has an optional override
export const toggleTick = (e: HTMLButtonElement, forceUntick?: boolean) => {
  if (forceUntick) {
    if (e.classList.contains("tick")) {
      e.classList.remove("tick");
    }
  } else {
    e.classList.toggle("tick");
  }
};

// make this button grey / not grey
// has an optional override
export const toggleGrey = (e: HTMLButtonElement, forceGrey?: boolean) => {
  // if ticked, make grey. else make purple
  if ((e.classList.contains("tick") && forceGrey !== false) || forceGrey) {
    e.style.backgroundColor = "#DDDDDD";
    e.style.color = "black";
  } else {
    e.style.backgroundColor = "rgb(155,0,155)";
    e.style.color = "white";
  }
};

// removes ticks of all but the supplied element
export const removeTicks = (e: HTMLButtonElement) => {
  const allButtons = document.getElementsByClassName("collegeFilter");
  for (let i = 0; i < allButtons.length; i++) {
    if (allButtons[i] !== e) {
      toggleTick(allButtons[i] as HTMLButtonElement, true);
      toggleGrey(allButtons[i] as HTMLButtonElement, false);
    }
  }
};

// sets this buttons filter based on whether it was ticked / unticked
export const updateFilter = (e: HTMLButtonElement) => {
  if (e.classList.contains("tick")) {
    (window as any).setFilter("college", e.value.toLowerCase());
  } else {
    (window as any).setFilter("college", "none");
  }
};
