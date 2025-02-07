import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { FaMousePointer, FaCircle } from "react-icons/fa";

export const NavBar = ({ cursorEnabled, setCursorEnabled }) => {

  const [deviceType, setDeviceType] = useState('');
  const iconRef = useRef(null);
  const circleRef = useRef(null);
  const mousePointerRef = useRef(null);

  useEffect(() => {
    const determineDevice = () => {
      const width = window.innerWidth;

      if (width <= 768) {
        setDeviceType("mobile");
      } else if (width <= 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };
    determineDevice();
    window.addEventListener("resize", determineDevice);
    return () => {
      window.removeEventListener("resize", determineDevice);
    };
  }, []); 

  useEffect(() => {
    if (deviceType !== "desktop") {
        return;
    }

    if (iconRef.current) {
      gsap.to(iconRef.current, {
        x: cursorEnabled ? 22 : 0,
        duration: 0.1,
        ease: "power2.out",
      });
    }

    if (cursorEnabled && circleRef.current) {
      gsap.fromTo(
        circleRef.current,
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          delay: 0.3,
          ease: "power2.out",
        }
      );
    } else if (circleRef.current) {
      gsap.to(circleRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (mousePointerRef.current) {
      gsap.fromTo(
        mousePointerRef.current,
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          delay: 0.2,
          ease: "power2.out",
        }
      );
    }
  }, [cursorEnabled, deviceType]);

  return (
    <header className='bg-vintage-cream w-full h-[50px] px-6 fixed z-50'>
        <nav className='w-full h-full flex items-center justify-between'>
            <ul className='flex gap-10 justify-center items-center'>
                <li className='h-full flex justify-center items-center'>
                    <a href="#" className='uppercase font-primary text-vintage-brown hover-target'>
                        <img src="/logo.png" alt="logo" className='w-[20px] h-[20px] object-contain'/>
                    </a>
                </li>
                <li className='h-full'>
                    <a href="#" className='uppercase font-agrandir-regular text-vintage-brown text-xs hover-target font-semibold hover:text-aesthetic-brown'>work</a>
                </li>
                <li className='h-full'>
                    <a href="#" className='uppercase font-agrandir-regular text-vintage-brown text-xs hover-target font-semibold hover:text-aesthetic-brown'>about</a>
                </li>
                <li>
                    <a href="#" className='uppercase font-agrandir-regular text-vintage-brown text-xs hover-target font-semibold hover:text-aesthetic-brown'>contact</a>
                </li>
            </ul>
            {
                deviceType !== "desktop" ? (
                    <></>
                ) : (
                <label className="relative inline-flex items-center cursor-pointer hover-target">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={cursorEnabled}
                        onChange={() => setCursorEnabled(!cursorEnabled)}
                    />
                    <div className="w-10 h-5 bg-vintage-cream border-[1px] rounded-full peer-checked:bg-vintage-cream transition-all relative flex justify-center items-center">
                        <div
                            ref={iconRef}
                            className={`absolute transition-all duration-300 ease-out ${cursorEnabled ? '-left-0.5' : 'left-0.5'} w-4 h-4 bg-bold-black rounded-full`}
                        >
                        {cursorEnabled ? (
                            <div ref={circleRef} className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50">
                                <div className="relative w-[10px] h-[10px] border border-vintage-cream rounded-full">
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[3px] h-[3px] bg-vintage-cream rounded-full"></div>
                                </div>
                            </div>
                        ) : (
                            <div ref={mousePointerRef} className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50">
                                <FaMousePointer className="text-vintage-cream text-[14px]" size={10}/>
                            </div>
                        )}
                        </div>
                    </div>  
                </label>
                )
            }
        </nav>
    </header>
  )
}
