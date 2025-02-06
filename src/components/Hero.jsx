import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const imgWrapRef = useRef(null);
  const imgRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (imgWrapRef.current && imgRef.current && textRef.current) {
      // Set initial clipPath for the image
      gsap.set(imgRef.current, {
        clipPath: "polygon(90% 70%, 20% 70%, 20% 60%, 90% 60%)",
      });
  
      // Animate the image with scaling and clipPath on scroll
      gsap.to(imgRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Fully reveal the image
        scale: 1.2, // Apply scaling to the image during scroll
        ease: "none",
        scrollTrigger: {
          trigger: imgWrapRef.current,
          start: "top center",
          end: "bottom center",
          pin: false,
          scrub: 1,
          anticipatePin: 1,
          toggleActions: "play none none none",
        },
      });
  
      // Animate the text (fade out and move up)
      gsap.fromTo(
        textRef.current,
        {
          opacity: 1,
          y: 200,
        },
        {
          opacity: 0,  // Fade the text out
          y: -200,     // Move the text upwards (not too far)
          ease: "power2.out",
          scrollTrigger: {
            trigger: imgWrapRef.current,
            start: "top center",
            end: "bottom top",
            scrub: 1,
            toggleActions: "play reverse play reverse",
          },
        }
      );
  
      ScrollTrigger.refresh();
    }
  }, []);

  return (
    <div className="relative w-full h-screen flex justify-center items-center" ref={imgWrapRef}>
      <div className="relative w-[100vw] h-[100vh] overflow-hidden">
        <img
          ref={imgRef}
          src="/bg.jpg"
          alt="Hero Image"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover"
        />
        <h1
          ref={textRef}
          className="absolute top-[130px] left-1/2 transform -translate-x-1/2 text-black text-9xl font-secondary whitespace-nowrap font-bold uppercase"
        >
          Mike Gerard Suico
        </h1>
      </div>
    </div>
  );
};
