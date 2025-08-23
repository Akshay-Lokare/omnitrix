import { useState } from "react";

// Omnitrix UI with interactive dial rotation
export default function OmnitrixUI() {
  const [rotation, setRotation] = useState(0);

  const handleTurn = () => {
    setRotation((prev) => prev + 45); // rotate 45° each click
  };

  return (
    <div className="wrap">
      <style>{`
        body { margin:0; padding:0; }
        .wrap {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #0b0f14;
        }
        .omni {
          position: relative;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: #111822;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 0 25px rgba(0,0,0,0.6);
          cursor: pointer;
          user-select: none;
        }
        .ring {
          position: absolute;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          background: linear-gradient(145deg, #9aa6b2, #6e7a86);
          display: flex;
          justify-content: center;
          align-items: center;
          transition: transform 0.6s ease;
        }
        .core {
          position: absolute;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: #0f1216;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .hourglass {
          position: relative;
          width: 120px;
          height: 120px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .triangle {
          width: 0;
          height: 0;
          border-left: 60px solid transparent;
          border-right: 60px solid transparent;
        }
        .triangle.top {
          border-bottom: 60px solid #6dfc4a;
          position: absolute;
          top: 0;
        }
        .triangle.bottom {
          border-top: 60px solid #6dfc4a;
          position: absolute;
          bottom: 0;
        }
        .coreGlow {
          position: absolute;
          width: 160px;
          height: 160px;
          border-radius: 50%;
          border: 3px solid #6dfc4a;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 10px #6dfc4a, 0 0 20px rgba(109,252,74,0.4); }
          50% { box-shadow: 0 0 20px #6dfc4a, 0 0 40px rgba(109,252,74,0.6); }
        }
      `}</style>

      <div className="omni" onClick={handleTurn}>
        <div className="ring" style={{ transform: `rotate(${rotation}deg)` }}>
          <div className="core">
            <div className="coreGlow"></div>
            <div className="hourglass">
              <div className="triangle top"></div>
              <div className="triangle bottom"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
