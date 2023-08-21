let tl=gsap.timeline();
tl.from(".img,a",{
    duaration:2,
    y:-100,
    delay:.5,
    opacity:0,
    stagger:.5
})

tl.from(".txt1box",{
    x:-100,
    duration:2,
    opacity:0
})