gsap.registerPlugin(ScrollTrigger);

// Animate each section when it enters viewport
gsap.utils.toArray("section").forEach(section => {
    ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",

        onEnter: () => animateSection(section),
        onEnterBack: () => animateSection(section)
    });
});

function animateSection(section) {
    gsap.killTweensOf(section.querySelectorAll("*"));

    if (section.classList.contains("animated-once")) {
        return;

    }
    if (section.id === "home") {
        // Hero heading
        gsap.fromTo(".hero-heading span",
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power2.out" }
        );

        // Welcome underline
        gsap.fromTo(".hero-block",
            { width: 0 },
            { width: "6rem", duration: 0.8, ease: "power2.out" }
        );

        // Photo block animation (Example of an added animation)
        gsap.fromTo(".hero-photo",
            { x: 50, opacity: 0, rotation: 5 },
            { x: 0, opacity: 1, rotation: 0, duration: 1, ease: "power3.out", delay: 0.5 }
        );
    }

    if (section.id === "about") {
        // Animate left column (intro text)
        gsap.fromTo(
            "#about > .max-w-6xl > div:first-child > *", 
            { y: 150, opacity: 0 }, 
            {
                y: 0,
                opacity: 1,
                duration: 1, 
                stagger: 0.3,
                ease: "power3.out" 
            }
        );

        gsap.fromTo(
            "#about > .max-w-6xl > div:last-child > div",
            { y: 150, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.25,
                ease: "power3.out",
                delay: 0.5 
            }
        );
    }


    if (section.id === "skills") {
        const cards = section.querySelectorAll(".grid > div");

        cards.forEach(card => {
            gsap.fromTo(card,
                { y: 30, opacity: 0, scale: 0.9 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.1, 
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 80%", 
                        end: "top 60%",
                        toggleActions: "play none none reverse",
                    }
                }
            );
        });
    }

    if (section.id === "projects") {
        const projects = section.querySelectorAll(".flex[id^='project']");
        projects.forEach((proj, index) => {
            const img = proj.querySelector("img");
            const text = proj.querySelector("div.space-y-4");

            const imgX = (index % 2 === 0) ? -120 : 120;
            const textX = -imgX;

            gsap.fromTo(img,
                { x: imgX, opacity: 0, scale: 0.95 },
                {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.9,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: proj,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    }
                }
            );

            gsap.fromTo(text,
                { x: textX, opacity: 0, scale: 0.95 },
                {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.9,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: proj,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    }
                }
            );
        });
    }

    if (section.id === "contact") {
        gsap.fromTo(
            section.querySelectorAll(".max-w-6xl > div"),
            { y: 50, opacity: 0, scale: 0.95 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                }
            }
        );
    }

}

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const dotLinks = document.querySelectorAll("#dot-hud a"); 

    window.addEventListener("scroll", () => {
        let scrollY = window.scrollY + window.innerHeight / 2;
        sections.forEach((section, index) => {
            if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
                dotLinks.forEach(link => link.classList.remove("active"));
                dotLinks[index].classList.add("active");
            }
        });
    });

    const hudItems = gsap.utils.toArray("#dot-hud .dot-item");

    gsap.from(hudItems, {
        y: (i, target) => {
            return 1000 - i * 50; 
        },
        opacity: 0,
        scale: 0.5,
        stagger: 0.15, 
        duration: 0.8,
        ease: "back.out(1.2)", 
        
        onComplete: () => {
            hudItems[0].classList.add('active'); 
        }
    });

});






