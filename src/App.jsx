import React, { useState, useEffect } from "react";
import { AnimatedCursor } from './components/AnimatedCursor'
import { Hero } from "./components/Hero";
import { NavBar } from './components/NavBar'
import { NextSection } from "./components/NextSection";


const App = () => {
  const [cursorEnabled, setCursorEnabled] = useState(true);
  const [deviceType, setDeviceType] = useState("");

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
  return (
    <div className="w-full h-[100vh] min-h-screen bg-vintage">
      {cursorEnabled && deviceType === "desktop" && <AnimatedCursor />}
      <NavBar cursorEnabled={cursorEnabled} setCursorEnabled={setCursorEnabled} />
      <Hero />
      <NextSection />
    </div>
  )
}

export default App