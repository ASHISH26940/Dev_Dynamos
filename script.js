let tl=gsap.timeline();
tl.from(".img,a",{
    duaration:2,
    y:-100,
    delay:.5,
    opacity:0,
    stagger:.5
})

tl.from(".txt1box h1",{
    x:-100,
    duration:1,
    opacity:0, 
})
tl.from(".txt1box h2",{
    opacity:0,
    duration:1
})

tl.from(".imp ",{
    x:-100,
    duration:1,
    opacity:0,
    delay:1,
    markers:true,
    scrollTrigger:".imp"
})

let boxes=document.querySelectorAll(".boxes");

