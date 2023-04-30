const header = document.getElementById("header");
const projectList = document.getElementById("project-list");
const container = projectList.querySelector("#project-list--projects");

setupActiveDetection();

function setupActiveDetection() {
  let activeEntry = null;

  const obs = new IntersectionObserver(entries => {
    let match = null;

    for (const entry of entries) {
      if (!match || entry.intersectionRatio > match.intersectionRatio) {
        match = entry;
      }
    }

    if (!match) return;

    if (activeEntry === match) return;

    if (match.intersectionRatio < activeEntry?.intersectionRatio ?? 0) return;

    activeEntry?.target.removeAttribute("data-active");

    activeEntry = match;
    activeEntry.target.setAttribute("data-active", "data-active");
  }, {
    rootMargin: `${header.getBoundingClientRect().height}px 0px 0px 0px`,
    threshold: new Array(101).fill(0).map((_, idx) => idx / 100),
  });

  for (const child of container.children) {
    obs.observe(child);
  }
}
