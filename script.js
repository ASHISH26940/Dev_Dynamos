gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();




let tl = gsap.timeline();

tl.from(".img,a", {
    duration: 2,
    y: -100,
    delay: 0.5,
    opacity: 0,
    stagger: 0.5
});
gsap.from(".pg-1 .txt1box h1,.pg-1 .txt1box h2", {
    x: -100,
    duration: 1,
    delay:2,
    opacity: 0,
    stagger:.5,
});
gsap

// tl.to(".pg-1")

// Add ScrollTrigger effect to the span tag
gsap.from(".pg-2 .txtboxs #imp2,.pg-2 .card", {
    x: -100,
    duration: 2,
    opacity: 0,
    scrollTrigger:{
        trigger:".pg-2 .txtboxs #imp2,.pg-2 .card",
        markers:true,
        start:"top 60%",
        scroller:".main",
        scrub:3
    }
});

// gsap.from(".pg-2 .card",{
//     x:100,
//     duration:2,
//     opacity:0,
//     scrollTrigger:{
//         markers:true,
//         start:"top 40%",
//         scroller:"body",
//         scrub:2
//     }
// })

tl.from(".pg-3 .box-under-pg-3 .center .boxes",{
    scale:.5,
    duration:2,
    opacity:2,
    scrollTrigger:{
        target:".pg-3 .box-under-pg-3 .center .boxes",
        // markers:true,
        scroller:".main",
        start:"top top",
        scrub:2
    }
})