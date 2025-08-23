import React, { useEffect, useState } from "react";

const Ultimatrix: React.FC = () => {
  const ALIENS = [
    "echoecho", "alienX", "bigchill", "brainstorm", "chromastone", "diamondhead_af",
    "goop", "humungousaur", "jetray", "rath", "spidermonkey", "swampfire", "waybig"
  ];

  const imagesUrl = "./images/";
  const soundsUrl = "./sounds/";

  const ALIEN_IMAGES: Record<string, string> = {
    echoecho: `${imagesUrl}echoecho.webp`,
    alienX: `${imagesUrl}alienX.webp`,
    bigchill: `${imagesUrl}bigchill.webp`,
    brainstorm: `${imagesUrl}brainstorm.webp`,
    chromastone: `${imagesUrl}chromastone.webp`,
    diamondhead_af: `${imagesUrl}diamondhead_af.webp`,
    goop: `${imagesUrl}goop.webp`,
    humungousaur: `${imagesUrl}humungousaur.webp`,
    jetray: `${imagesUrl}jetray.webp`,
    rath: `${imagesUrl}rath.webp`,
    spidermonkey: `${imagesUrl}spidermonkey.webp`,
    swampfire: `${imagesUrl}swampfire.webp`,
    waybig: `${imagesUrl}waybig.webp`,
  };

  const ALIEN_STYLES: Record<string, { width: string; height: string }> = {
    echoecho: { width: "100px", height: "140px" },
    alienX: { width: "120px", height: "180px" },
    bigchill: { width: "120px", height: "200px" },
    brainstorm: { width: "200px", height: "160px" },
    chromastone: { width: "120px", height: "220px" },
    diamondhead_af: { width: "140px", height: "200px" },
    goop: { width: "100px", height: "200px" },
    humungousaur: { width: "160px", height: "200px" },
    jetray: { width: "160px", height: "180px" },
    rath: { width: "120px", height: "180px" },
    spidermonkey: { width: "140px", height: "140px" },
    swampfire: { width: "120px", height: "210px" },
    waybig: { width: "120px", height: "220px" },
  };

  const twistSounds = [
    new Audio(`${soundsUrl}ultimatrix_twist_normalized.mp3`),
  ];

  const ultimateTransformSound = new Audio(`${soundsUrl}ultimatrix_transformation_ultimate.mp3`);
  const transformationSound = new Audio(`${soundsUrl}ultimatrix_transformation_normalized.mp3`);
  const timeoutSound = new Audio(`${soundsUrl}ultimatrix_timeout_normalized.mp3`);

  const [currentAlien, setCurrentAlien] = useState(0);
  const [rotationDeg, setRotationDeg] = useState(0);
  const [innerCircleColor, setInnerCircleColor] = useState<"#baff13" | "red">("#baff13");
  const [overlayColor, setOverlayColor] = useState<"" | "#baff13" | "red">("");
  const [isLocked, setIsLocked] = useState(false);
  const [activationStage, setActivationStage] = useState<0 | 1 | 2>(0);
  // 0 = not activated, 1 = normal activated, 2 = ultimate activated

  const playRandomTwistSound = () => {
    const index = Math.floor(Math.random() * twistSounds.length);
    twistSounds[index].currentTime = 0;
    twistSounds[index].play();
  };

  const nextAlien = () => {
    if (!isLocked) {
      setCurrentAlien((prev) => (prev + 1) % ALIENS.length);
      setRotationDeg((prev) => prev + 36);
      playRandomTwistSound();
    }
  };

  const prevAlien = () => {
    if (!isLocked) {
      setCurrentAlien((prev) => (prev - 1 + ALIENS.length) % ALIENS.length);
      setRotationDeg((prev) => prev - 36);
      playRandomTwistSound();
    }
  };

  const activateOmnitrix = () => {
    if (activationStage === 0) {
      // First activation
      transformationSound.currentTime = 0;
      transformationSound.play();
      setOverlayColor("#baff13");
      setInnerCircleColor("#baff13");
      setIsLocked(true);
      setActivationStage(1);
      setTimeout(() => setOverlayColor(""), 1000);
    } 
    else if (activationStage === 1) {
      // Second activation -> ultimate mode
      ultimateTransformSound.currentTime = 0;
      ultimateTransformSound.play();
      setOverlayColor("#baff13"); // maybe a different overlay for ultimate
      setInnerCircleColor("#baff13");
      setActivationStage(2);
      setTimeout(() => setOverlayColor(""), 1000);
    } 
    else {
      // Third activation -> timeout / revert
      timeoutSound.currentTime = 0;
      timeoutSound.play();
      setOverlayColor("red");
      setInnerCircleColor("red");

      setTimeout(() => {
        setOverlayColor("");
        setTimeout(() => {
          setInnerCircleColor("#baff13");
          setIsLocked(false);
          setActivationStage(0);
        }, 2000);
      }, 2000);
    }
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextAlien();
      else if (e.key === "ArrowLeft") prevAlien();
      else if (e.key === "Enter" || e.key === " ") activateOmnitrix();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activationStage]);

  const current = ALIENS[currentAlien];

  return (
    <div className="center-container">
      <div className="outer-circle" style={{ transform: `rotate(${rotationDeg}deg)` }}>
        {/* Default 4 lines */}
        <div className="side-line top" />
        <div className="side-line right" />
        <div className="side-line bottom" />
        <div className="side-line left" />

        {/* Extra 4 diagonal lines when ultimate is activated */}
        {activationStage === 2 && (
          <>
            <div className="ultimate-side-line u-top-left"></div>
            <div className="ultimate-side-line u-top-right"></div>
            <div className="ultimate-side-line u-bottom-left"></div>
            <div className="ultimate-side-line u-bottom-right"></div>
          </>
        )}


        <div
          className="inner-circle"
          style={{
            transform: `rotate(${-rotationDeg}deg)`,
            backgroundColor: innerCircleColor,
          }}
        >
          <img
            src={ALIEN_IMAGES[current]}
            alt={current}
            style={ALIEN_STYLES[current]}
          />
        </div>
      </div>


      {overlayColor && (
        <div
          className="overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: overlayColor,
            animation: "fadeInOut 2s forwards",
            zIndex: 9999,
          }}
        />
      )}
    </div>
  );
};

export default Ultimatrix;
