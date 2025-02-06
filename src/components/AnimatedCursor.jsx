import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const AnimatedCursor = () => {
  const cursor = useRef(null);
  const follower = useRef(null);

  useEffect(() => {
    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;

    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    document.addEventListener("mousemove", moveCursor);

    gsap.to({}, {
      duration: 0.016,
      repeat: -1,
      onRepeat: () => {
        posX += (mouseX - posX) / 9;
        posY += (mouseY - posY) / 9;

        gsap.set(follower.current, { x: posX - 16, y: posY - 16 });
        gsap.set(cursor.current, { x: mouseX - 5, y: mouseY - 5 });
      }
    });

    const hoverElements = document.querySelectorAll(".hover-target");

    const onMouseEnter = () => {
      gsap.to(cursor.current, { scale: 0.5, duration: 0.3, ease: "power2.out" });
      gsap.to(follower.current, { scale: 2, duration: 0.3, ease: "power2.out" });
    };

    const onMouseLeave = () => {
      gsap.to(cursor.current, { scale: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(follower.current, { scale: 1, duration: 0.3, ease: "power2.out" });
    };

    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
    });

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      hoverElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursor}
        className="fixed w-2.5 h-2.5 bg-black rounded-full pointer-events-none z-[10000] transition-transform duration-200 ease-out"
      ></div>

      <div
        ref={follower}
        className="fixed w-8 h-8 border border-black rounded-full pointer-events-none z-[9999] transition-transform duration-500 ease-out"
      ></div>
    </>
  );
};
