import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const imgWrapRef = useRef(null);
  const imgRef = useRef(null);
  const textRef = useRef(null);
  const textDescriptionRef = useRef(null);
  const textDescriptionMobileRef = useRef(null);
  const arrowRef = useRef(null);
  const arrowIconRef = useRef(null);
  const descContainerRef = useRef(null);

  useEffect(() => {
    if (
      imgWrapRef.current &&
      imgRef.current &&
      textRef.current &&
      textDescriptionRef.current &&
      arrowRef.current &&
      arrowIconRef.current &&
      textDescriptionMobileRef.current &&
      descContainerRef.current
    ) {
      const letters = textRef.current.querySelectorAll("span");
      const descBlocks = textDescriptionRef.current.querySelectorAll(".desc-line");
      const descBlocksMobile = textDescriptionMobileRef.current.querySelectorAll(".desc-line");
      const arrowText = arrowRef.current.querySelector("p");
      const arrowIcon = arrowRef.current.querySelector("svg");

      const tl = gsap.timeline();

      // Initial load animations (image fade-in and scale)
      tl.fromTo(
        imgRef.current,
        { opacity: 0, scale: 1 },
        { opacity: 1, scale: 1.1, duration: 1.5, ease: "power2.out" }
      )
      .fromTo(
        letters,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 20,
          duration: 1,
          ease: "power2.out",
          stagger: 0.05,
        },
        "-=1"
      )
      .fromTo(
        descBlocks,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          stagger: 0.2,
        },
        "-=1"
      )
      
      .fromTo(
        descBlocksMobile,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          stagger: 0.2,
        },
        "-=1"
      )
      .fromTo(
        arrowText, // Staggering the arrow text separately
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          stagger: 0.3,
        },
        "-=1"
      )
      .fromTo(
        arrowIcon, // Staggering the arrow text separately
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          stagger: 0.3,
        },
        "-=1"
      );

      // gsap.set(imgRef.current, {
      //   clipPath: "polygon(85% 70%, 15% 70%, 15% 60%, 85% 60%)",
      // });
      
      const width = window.innerWidth;
      if (width > 1024) {
        gsap.set(imgRef.current, {
          clipPath: "polygon(85% 70%, 15% 70%, 15% 60%, 85% 60%)",
        });
      } else if (width > 768) {
        gsap.set(imgRef.current, {
          clipPath: "polygon(90% 80%, 10% 80%, 10% 70%, 90% 70%)",
        });
      } else {
        gsap.set(imgRef.current, {
          clipPath: "polygon(70% 60%, 40% 60%, 40% 10%, 70% 10%)",
        });
      }
      

      // Scroll-triggered animations for image reveal
      gsap.to(imgRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        scale: 1.2,
        ease: "none",
        scrollTrigger: {
          trigger: imgWrapRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
          toggleActions: "play none none none",
        },
      });

      gsap.to(arrowIconRef.current, {
        y: 5, // Move the arrow up by 15px
        repeat: -1, // Infinite loop
        yoyo: true, // Reverse the animation (bounce back)
        duration: 0.6, // Duration of one bounce
        ease: "power1.inOut", // Smooth ease for bouncing
        delay: 1, // Delay to make it start after some time
      });

      // Scroll-triggered animations for text and arrow
      gsap.to(textRef.current, {
        opacity: 0,
        y: -100,
        ease: "power2.out",
        scrollTrigger: {
          trigger: imgWrapRef.current,
          start: "top 0%",
          end: "bottom 80%",
          scrub: 1,
          toggleActions: "play reverse play reverse",
        },
      });

      gsap.to(arrowRef.current, {
        opacity: 0,
        y: 100,
        ease: "power2.out",
        scrollTrigger: {
          trigger: imgWrapRef.current,
          start: "top 0%",
          end: "bottom 80%",
          scrub: 1,
          toggleActions: "play reverse play reverse",
        },
      });

      gsap.to(textDescriptionRef.current, {
        opacity: 0,
        y: 100,
        ease: "power2.out",
        scrollTrigger: {
          trigger: imgWrapRef.current,
          start: "top 0%",
          end: "bottom 50%",
          scrub: 1,
          toggleActions: "play reverse play reverse",
        },
      });

      gsap.to(descContainerRef.current, {
        opacity: 0,
        y: 100,
        ease: "power2.out",
        scrollTrigger: {
          trigger: imgWrapRef.current,
          start: "top 0%",
          end: "bottom 80%",
          scrub: 1,
          toggleActions: "play reverse play reverse",
        },
      });

      ScrollTrigger.refresh();
    }
  }, []);

  const splitText = (text) => {
    return text.split("").map((char, index) => (
      <span key={index} className="inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  const splitDescriptionText = (text) => {
    const lines = text.split("\n");
    return lines.map((line, index) => (
      <div key={index} className="desc-line">
        {line.split("").map((char, i) => (
          <span key={i} className="inline-block text-justify">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
    ));
  };

  return (
    <div className="relative w-full h-screen flex justify-center items-center overflow-hidden" ref={imgWrapRef}>
      <div className="relative w-full h-full overflow-hidden">
        <img
          ref={imgRef}
          src="/bg.jpg"
          alt="Hero Image"
          className="absolute inset-0 w-full h-full object-cover z-20"
        />
        <div className="w-full h-screen relative flex justify-center items-center">
          <div className="relative w-[1366px] h-screen pt-10 px-8">

            {/* MY NAME */}
            <h1
              ref={textRef}
              className="text-aesthetic-brown text-6xl lg:text-[160px] leading-16 lg:leading-36 text-left font-secondary whitespace-nowrap font-bold uppercase relative z-10"
            >
              {/* Main text */}
              <span className="relative z-20">
                {splitText("Mike Gerard")}
                <br />
                {splitText("Suico")}
              </span>
               {/* Shadow text */}
              <span
                className="absolute inset-0 text-6xl lg:text-[160px] leading-16 lg:leading-36 text-left font-secondary whitespace-nowrap font-bold uppercase -mt-4 lg:-mt-3"
                style={{ color: "#1a4323", transform: "translate(5px, 5px)" }} // Shadow color and offset
              >
                {splitText("Mike Gerard")}
                <br />
                {splitText("Suico")}
              </span>
            </h1>

            {/* DESCRIPTION */}
            <div className="absolute bottom-10 right-10 w-[340px] h-auto hidden lg:block" ref={descContainerRef}>
              {/* Shadow div */}
              <div
                className="absolute -inset-5 w-full h-[448px] bg-aesthetic-brown"
                style={{ transform: "translate(-10px, 20px)", clipPath: "polygon(100% 42%, 100% 100%, 0 100%, 0 0)" }} // Adjust shadow position and blur
              ></div>
              <div
                className="absolute inset-10 w-[415px] h-full bg-vintage-brown"
                style={{ transform: "translate(-85px, -10px)", clipPath: "polygon(100% 60%, 100% 100%, 3.5% 100%, 45% 60%)" }} // Adjust shadow position and blur
              ></div>
              {/* Main div */}
              <div className="bg-vintage-cream p-[20px] z-20" ref={textDescriptionRef}>
                <p className="font-agrandir-regular text-aesthetic-brown text-justify text-[18px]">
                  {splitDescriptionText(
                    "I’m a passionate web and mobile app developer specializing in building\nintuitive and high-performance solutions. With expertise in modern web technologies and React Native, I\ncreate seamless user experiences\nacross platforms. \n \nWhether it’s crafting responsive\nwebsites or scalable mobile apps. I thrive on turning ideas into\nimpactful digital products.\n \nAlways learning, always innovating."
                  )}
                </p>
              </div>
            </div>


            <div className="absolute right-0 top-28 lg:bottom-10 lg:right-10 w-[200px] h-auto block lg:hidden" ref={textDescriptionMobileRef}>
              <p className="font-agrandir-regular text-aesthetic-brown text-justify text-[12px]">
                {splitDescriptionText("I’m a passionate web and mobile app developer specializing in building \nintuitive and high-performance solutions.With expertise in modern web technologies and React Native,\nI create seamless user experiences across platforms.\nWhether it’s crafting responsive websites or scalable mobile apps,\nI thrive on turning ideas into impactful digital products.\nAlways learning, always innovating.")}
              </p>
            </div>

            {/* ARROW */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center flex-col gap-5 w-full" ref={arrowRef}>
              <p className="font-agrandir-regular text-aesthetic-brown">Discover the past, explore the present.</p>
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#bd5b2a" height="20px" width="20px" version="1.1" id="Layer_1" viewBox="0 0 330 330" xml:space="preserve" ref={arrowIconRef}>
                <path id="XMLID_337_" d="M253.858,234.26c-2.322-5.605-7.792-9.26-13.858-9.26h-60V15c0-8.284-6.716-15-15-15  c-8.284,0-15,6.716-15,15v210H90c-6.067,0-11.537,3.655-13.858,9.26c-2.321,5.605-1.038,12.057,3.252,16.347l75,75  C157.322,328.536,161.161,330,165,330s7.678-1.464,10.607-4.394l75-75C254.896,246.316,256.18,239.865,253.858,234.26z M165,293.787  L126.213,255h77.573L165,293.787z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
