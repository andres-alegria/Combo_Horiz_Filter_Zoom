gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const smoother = ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 2,
  normalizeScroll: true,
  ignoreMobileResize: true,
  preventDefault: true
});

//Horizontal Scroll Galleries
if (document.getElementById("portfolio")) {
  const horizontalSections = gsap.utils.toArray(".horiz-gallery-wrapper");

  horizontalSections.forEach(function (sec, i) {
    const pinWrap = sec.querySelector(".horiz-gallery-strip");

    let pinWrapWidth;
    let horizontalScrollLength;

    function refresh() {
      pinWrapWidth = pinWrap.scrollWidth;
      horizontalScrollLength = pinWrapWidth - window.innerWidth;
    }

    refresh();
    // Pinning and horizontal scrolling
    gsap.to(pinWrap, {
      scrollTrigger: {
        scrub: true,
        trigger: sec,
        pin: sec,
        start: "top 30%",
        end: () => `+=${pinWrapWidth}`,
        invalidateOnRefresh: true
      },
      x: () => -horizontalScrollLength,
      ease: "none"
    });

    ScrollTrigger.addEventListener("refreshInit", refresh);
  });
}


//Filter Gallery
"use strict";
const allCheckbox = document.querySelector('#all'), filters = gsap.utils.toArray('.filter'), items = gsap.utils.toArray('.item');
function updateFilters() {
    const state = Flip.getState(items), // get the current state
    classes = filters.filter(checkbox => checkbox.checked).map(checkbox => "." + checkbox.id), matches = classes.length ? gsap.utils.toArray(classes.join(",")) : classes;
    // adjust the display property of each item ("none" for filtered ones, "inline-flex" for matching ones)
    items.forEach(item => item.style.display = matches.indexOf(item) === -1 ? "none" : "inline-flex");
    // animate from the previous state
    Flip.from(state, {
        duration: 0.7,
        scale: true,
        ease: "power1.inOut",
        stagger: 0.08,
        absolute: false, // when true, the checkboxes move downwards during transition
        onEnter: elements => gsap.fromTo(elements, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 1 }),
        onLeave: elements => gsap.to(elements, { opacity: 0, scale: 0, duration: 1 })
    });
    // Update the all checkbox:
    allCheckbox.checked = matches.length === items.length;
}
filters.forEach(btn => btn.addEventListener('click', updateFilters));
allCheckbox.addEventListener('click', () => {
    filters.forEach(checkbox => checkbox.checked = allCheckbox.checked);
    updateFilters();
});

//zoom gallery

console.clear();

gsap.registerPlugin(Flip);

const modal = document.querySelector(".modal");
const modalContent = modal.querySelector(".content");
const modalOverlay = modal.querySelector(".overlay");
const boxes = gsap.utils.toArray(".boxes-container .box");
const boxesContent = gsap.utils.toArray(".box-content");
let boxIndex = undefined;

boxesContent.forEach((box, i) => {
  box.addEventListener("click", () => {
    if (boxIndex !== undefined) {
      const state = Flip.getState(box);
      boxes[boxIndex].appendChild(box);
      boxIndex = undefined;
      gsap.to([modal, modalOverlay], {
        autoAlpha: 0,
        ease: "power1.inOut",
        duration: 0.35 });

      Flip.from(state, {
        duration: 0.7,
        ease: "power1.inOut",
        absolute: true,
        onComplete: () => gsap.set(box, { zIndex: "auto" }) });

      gsap.set(box, { zIndex: 1002 });
    } else {
      const state = Flip.getState(box);
      modalContent.appendChild(box);
      boxIndex = i;
      gsap.set(modal, { autoAlpha: 1 });
      Flip.from(state, {
        duration: 0.7,
        ease: "power1.inOut" });

      gsap.to(modalOverlay, { autoAlpha: 0.65, duration: 0.35 });
    }
  });
});