import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const SpinWheel = () => {
  const [result, setResult] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectors = [
    { color: "#4b0082", label: "50" },
    { color: "#6a0dad", label: "100" },
    { color: "#7b1fa2", label: "150" },
    { color: "#8e24aa", label: "200" },
    { color: "#9c27b0", label: "250" },
    { color: "#ab47bc", label: "300" },
  ];

  useEffect(() => {
    if (!result) return;
  
    const userId = localStorage.getItem("userID");
    if (!userId) {
      console.error("User ID not found in local storage");
      return;
    }
  
    fetch("https://devheat-hackathon-14ll.vercel.app/api/wheel/spin-result", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, reward: Number(result),}),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to send spin result");
        return res.json();
      })
      .then((data) => {
        console.log("Spin result submitted successfully:", data);
      })
      .catch((err) => {
        console.error("Error submitting spin result:", err);
      });
  }, [result]);

  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    const tot = sectors.length;
    const rand = (m: number, M: number) => Math.random() * (M - m) + m;

    let ang = 0;
    let angVel = 0;
    let isSpinning = false;
    let animationFrame: number;

    const drawSector = (sector: any, i: number) => {
      const angStart = (2 * Math.PI * i) / tot;
      const angEnd = (2 * Math.PI * (i + 1)) / tot;
      ctx.beginPath();
      ctx.fillStyle = sector.color;
      ctx.moveTo(250, 250);
      ctx.arc(250, 250, 250, angStart, angEnd);
      ctx.lineTo(250, 250);
      ctx.fill();

      ctx.save();
      ctx.translate(250, 250);
      ctx.rotate((angStart + angEnd) / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "#fff";
      ctx.shadowColor = "#9b59b6";
      ctx.shadowBlur = 15;
      ctx.font = "600 28px 'Poppins', sans-serif";
      ctx.fillText(sector.label, 215, 10);
      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, 500, 500);
      ctx.save();
      ctx.translate(250, 250);
      ctx.rotate(ang);
      ctx.translate(-250, -250);
      sectors.forEach(drawSector);
      ctx.restore();
    };

    const getCurrentSector = () => {
      const deg = (ang * 180) / Math.PI;
      const adjustedDeg = (deg + 360) % 360;
      const sectorAngle = 360 / tot;
      const index = Math.floor((360 - adjustedDeg) / sectorAngle) % tot;
      return sectors[index];
    };

    const rotate = () => {
      ang += angVel;
      ang %= 2 * Math.PI;
      angVel *= 0.985;

      draw();

      if (angVel < 0.002 && isSpinning) {
        isSpinning = false;
        const current = getCurrentSector();
        setResult(current.label);
        cancelAnimationFrame(animationFrame);
      } else {
        animationFrame = requestAnimationFrame(rotate);
      }
    };

    draw();

    const spinBtn = document.getElementById("spin");
    const handleClick = () => {
      if (!isSpinning) {
        angVel = rand(0.3, 0.4);
        isSpinning = true;
        setResult(null);
        rotate();
      }
    };

    spinBtn?.addEventListener("click", handleClick);
    return () => {
      spinBtn?.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-[#0d0d1a] relative overflow-hidden">
      {/* Glowing Dots */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-purple-500 opacity-30 blur-sm"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: [0.1, 0.3, 0.6, 0.2],
            scale: [0.5, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Title */}
      <motion.h1
        className="text-white text-2xl md:text-3xl font-semibold mb-8 tracking-wide"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Spin the Wheel to Earn Credit
      </motion.h1>

      {/* Wheel */}
      <motion.div
        className="relative inline-block"
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Arrow */}
        <div className="absolute z-20 left-[calc(100%-0.5rem)] top-1/2 -translate-y-1/2 ml-[-10.5rem]">
            <div
                className="w-0 h-0 
                border-t-[12px] border-t-transparent
                border-b-[12px] border-b-transparent
                border-l-[20px] border-l-yellow-400 drop-shadow-[0_0_6px_#facc15]"
            ></div>
            </div>


        {/* Canvas */}
        <canvas
          ref={canvasRef}
          width="500"
          height="500"
          className="block rounded-full bg-[#1b1b2f] shadow-[0_0_50px_#9b59b6]"
        ></canvas>

        {/* Spin Button */}
        <motion.div
          id="spin"
          whileTap={{ scale: 0.95 }}
          className="absolute top-1/2 left-1/2 w-[30%] h-[30%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-semibold text-white text-lg rounded-full cursor-pointer transition duration-700
          bg-gradient-to-br from-indigo-700 via-purple-600 to-purple-800
          shadow-[0_0_15px_#ab47bc,0_0_25px_#8e24aa]
          border-4 border-[#ab47bc]"
        >
          SPIN
        </motion.div>
      </motion.div>

      {/* Result */}
      {result && (
        <motion.div
          className="mt-10 text-xl font-semibold text-white bg-purple-800 px-6 py-3 rounded-xl shadow-lg border border-purple-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          🎉 You got <span className="text-yellow-300">{result}</span> credits!
        </motion.div>
      )}
    </div>
  );
};

export default SpinWheel;
