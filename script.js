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

// alternatives to the above
// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————

class TextScramble {
  constructor(el) {
    this.el = el
    this.chars = '!<>-_\\/[]{}—=+*^?#________'
    this.update = this.update.bind(this)
  }
  setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }
  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}

// ——————————————————————————————————————————————————
// Example
// ——————————————————————————————————————————————————

const phrases = [
  'Anonymous Form:'
]

const el = document.querySelector('.text')
const fx = new TextScramble(el)

let counter = 0
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 800)
  })
  counter = (counter + 1) % phrases.length
}

next()


// tl.to(".pg-1")

// Add ScrollTrigger effect to the span tag
gsap.from(".pg-2 .txtboxs #imp2,.pg-2 .card", {
    x: -100,
    duration: 2,
    opacity: 0,
    scrollTrigger:{
        trigger:".pg-2 .txtboxs #imp2,.pg-2 .card",
        // markers:true,
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
    opacity:0,
    scrollTrigger:{
        target:".pg-3 .box-under-pg-3 .center .boxes",
        // markers:true,
        scroller:".main",
        start:"top top",
        scrub:2
    }
})

tl.from(".forms-content .head-f h1",{
  y:-100
})


// Mouse Follower
// gsap.set(".ball", {xPercent: -50, yPercent: -50});

// const ball = document.querySelector(".ball");
// const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
// const mouse = { x: pos.x, y: pos.y };
// const speed = 0.2;

// const xSet = gsap.quickSetter(ball, "x", "px");
// const ySet = gsap.quickSetter(ball, "y", "px");

// window.addEventListener("mousemove", e => {    
//   mouse.x = e.x;
//   mouse.y = e.y;  
// });

// gsap.ticker.add(() => {
  
//   // adjust speed for higher refresh monitors
//   const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio()); 
  
//   pos.x += (mouse.x - pos.x) * dt;
//   pos.y += (mouse.y - pos.y) * dt;
//   xSet(pos.x);
//   ySet(pos.y);
// });

// // special thanks to Blake Bowen for most of the code.

// // quickTo() version, new in version 3.10.0: https://codepen.io/GreenSock/pen/xxpbORN?editors=0010
