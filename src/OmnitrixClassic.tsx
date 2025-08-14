import React, { useEffect, useState } from "react";

const OmnitrixClassic: React.FC = () => {
  const ALIENS = [
    "diamondhead", "fourarms", "ghostfreak", "greymatter", "heatblast",
    "ripjaws", "stinkfly", "upgrade", "wildmutt", "xlr8",
  ];

  const imagesUrl = "./images/";
  const soundsUrl = "./sounds/";

  const ALIEN_IMAGES: Record<string, string> = {
    diamondhead: `${imagesUrl}diamondhead.svg`,
    fourarms: `${imagesUrl}fourarms.svg`,
    ghostfreak: `${imagesUrl}ghostfreak.svg`,
    greymatter: `${imagesUrl}greymatter.svg`,
    heatblast: `${imagesUrl}heatblast.svg`,
    ripjaws: `${imagesUrl}ripjaws.svg`,
    stinkfly: `${imagesUrl}stinkfly.svg`,
    upgrade: `${imagesUrl}upgrade.svg`,
    wildmutt: `${imagesUrl}wildmutt.svg`,
    xlr8: `${imagesUrl}xlr8.svg`,
  };

  const twistSounds = [
    new Audio(`${soundsUrl}twist-1.mp3`),
    new Audio(`${soundsUrl}twist-2.mp3`),
    new Audio(`${soundsUrl}twist-3.mp3`),
    new Audio(`${soundsUrl}twist-4.mp3`),
    new Audio(`${soundsUrl}twist-5.mp3`),
    new Audio(`${soundsUrl}twist-6.mp3`),
  ];

  const transformationSound = new Audio(`${soundsUrl}transformation.mp3`);

  const [currentAlien, setCurrentAlien] = useState(0);
  const [rotationDeg, setRotationDeg] = useState(0);
  const [innerCircleColor, setInnerCircleColor] = useState<"#baff13" | "white" | "red">("#baff13");
  const [overlayColor, setOverlayColor] = useState<"" | "#baff13" | "red">("");
  const [isLocked, setIsLocked] = useState(false);

  const playRandomTwistSound = () => {
    const index = Math.floor(Math.random() * twistSounds.length);
    twistSounds[index].currentTime = 0;
    twistSounds[index].play();
  };

  const playTransformationSound = () => {
    transformationSound.currentTime = 0;
    transformationSound.play();
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
    playTransformationSound();

    if (innerCircleColor === "#baff13") {
      setInnerCircleColor("white");
      setOverlayColor("#baff13");
      setIsLocked(true);

      setTimeout(() => {
        setOverlayColor("");
      }, 2000);

    } else if (innerCircleColor === "white") {
      setInnerCircleColor("red");
      setOverlayColor("red");

      setTimeout(() => {
        setOverlayColor("");
        setTimeout(() => {
          setInnerCircleColor("#baff13");
          setIsLocked(false);
        }, 3000);
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
  }, [innerCircleColor, isLocked]);

  return (
    <div className="center-container">
      <div
        className="outer-circle"
        style={{ transform: `rotate(${rotationDeg}deg)` }}
      >
        <div className="classic-side-dot c-top" />
        <div className="classic-side-dot c-right" />
        <div className="classic-side-dot c-bottom" />
        <div className="classic-side-dot c-left" />

        <div
          className="inner-circle"
          style={{
            transform: `rotate(${-rotationDeg}deg)`,
            backgroundColor: innerCircleColor,
          }}
        >
          <img
            src={ALIEN_IMAGES[ALIENS[currentAlien]]}
            alt={ALIENS[currentAlien]}
            style={{ width: "100px", height: "100px" }}
          />
        </div>
      </div>

      {overlayColor && (
        <div
          className="overlay"
          style={{
            backgroundColor: overlayColor,
            animation: "fadeInOut 2s forwards",
          }}
        />
      )}
    </div>
  );
};

export default OmnitrixClassic;
