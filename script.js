document.addEventListener("DOMContentLoaded", function() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initialize LocomotiveScroll
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });

    // Each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // Tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // Cursor effect
    function cursorEffect() {
        var page1Content = document.querySelector("#page1-content");
        var cursor = document.querySelector("#cursor");

        page1Content.addEventListener("mousemove", function(dets) {
            gsap.to(cursor, {
                x: dets.clientX,
                y: dets.clientY,
                duration: 0.2
            });
        });

        page1Content.addEventListener("mouseenter", function() {
            gsap.to(cursor, {
                scale: 1,
                opacity: 1,
                duration: 0.2
            });
        });

        page1Content.addEventListener("mouseleave", function() {
            gsap.to(cursor, {
                scale: 0,
                opacity: 0,
                duration: 0.2
            });
        });
    }

    cursorEffect();

    // Page 2 animation
    function page2Animation() {
        gsap.from(".elem h1", {
            y: 120,
            stagger: 0.2,
            duration: 1,
            scrollTrigger: {
                trigger: "#page2",
                scroller: "#main",
                start: "top 50%",
                end: "top 45%",
                markers: false,
                scrub: 2
            }
        });
    }

    page2Animation();

    // Refresh ScrollTrigger after setup
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
});
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
