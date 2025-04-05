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
      console.error("User ID not found");
      return;
    }
    fetch("https://devheat-hackathon-14ll.vercel.app/api/wheel/spin-result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, reward: Number(result) }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Submitted:", data))
      .catch((err) => console.error("Submit error:", err));
  }, [result]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    const tot = sectors.length;
    const rand = (m: number, M: number) => Math.random() * (M - m) + m;
    let ang = 0, angVel = 0, isSpinning = false, animationFrame: number;

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
      ctx.shadowColor = "#fff";
      ctx.shadowBlur = 15;
      ctx.font = "bold 26px 'Poppins', sans-serif";
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
      const index = Math.floor((360 - adjustedDeg) / (360 / tot)) % tot;
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
    <div className="w-full h-screen flex flex-col items-center justify-center bg-[#0d0d1a] relative overflow-hidden font-poppins">
      {/* Background Video */}
      <video
        width="100%" height="100%" autoPlay loop muted
        className="absolute top-0 left-0 object-cover z-0 opacity-40"
      >
        <source src="https://res.cloudinary.com/dll6vk0kp/video/upload/v1743856313/video_atwe3t.mp4" type="video/mp4" />
      </video>

      {/* Floating Sparkles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[6px] h-[6px] rounded-full bg-purple-400 blur-sm"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: [0.2, 0.6, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 10 + Math.random() * 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Title */}
      <motion.h1
        className="text-white text-3xl md:text-4xl font-bold mb-8 tracking-wider text-center drop-shadow-[0_0_15px_#ab47bc]"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        ✨ Spin the Magical Wheel & Win Credits! ✨
      </motion.h1>

      {/* Wheel */}
      <motion.div
        className="relative inline-block"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Arrow */}
        <div className="absolute z-20 left-[calc(100%-0.5rem)] top-1/2 -translate-y-1/2 ml-[-10.5rem]">
          <div className="w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-l-[20px] border-l-yellow-400 drop-shadow-[0_0_6px_#facc15]" />
        </div>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          width="500"
          height="500"
          className="block rounded-full bg-[#1b1b2f] shadow-[0_0_50px_#ab47bc]"
        />

        {/* Spin Button */}
        <motion.div
          id="spin"
          whileTap={{ scale: 0.92 }}
          className="absolute top-1/2 left-1/2 w-[30%] h-[30%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-white text-lg font-bold rounded-full cursor-pointer
          bg-gradient-to-br from-indigo-700 via-purple-600 to-purple-800
          border-4 border-purple-500 shadow-[0_0_25px_#ab47bc]
          animate-pulse transition duration-300 hover:scale-105"
        >
          SPIN
        </motion.div>
      </motion.div>

      {/* Result Message */}
      {result && (
        <motion.div
          className="mt-12 text-2xl font-semibold text-yellow-300 bg-purple-900 px-8 py-4 rounded-2xl shadow-xl border border-purple-400 backdrop-blur-md"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          🎉 You earned <span className="text-yellow-400 drop-shadow-[0_0_5px_#facc15]">{result}</span> credits!
        </motion.div>
      )}
    </div>
  );
};

export default SpinWheel;
