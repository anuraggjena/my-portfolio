"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { Terminal, Database, Cpu, BrainCircuit, ShieldAlert, Crosshair, ChevronRight, Github, ExternalLink, Send, FileCode2, Code, Swords, Linkedin, Mail, Menu, X } from 'lucide-react';

interface BatCardProps {
  children: React.ReactNode;
  className?: string;
}

interface CRTBootUpProps {
  onComplete: () => void;
}

interface TypewriterTextProps {
  text: string;
  delay?: number;
}

interface CipherTextProps {
  text: string;
  delay?: number;
}

// --- STYLES & KEYFRAMES (Injected) ---
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700;800&family=Oswald:wght@700&display=swap');

  :root {
    --vengeance-red: #D91424;
    --pitch-black: #030303;
    --ash-grey: #E5E7EB;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: var(--pitch-black);
    color: var(--ash-grey);
    font-family: 'Inter', sans-serif;
    overflow-x: hidden;
    cursor: crosshair;
  }

  .font-mono {
    font-family: 'JetBrains Mono', monospace;
  }

  h1, h2, h3, .brutalist-text {
    font-family: 'JetBrains Mono', monospace; 
  }

  .brutalist-text {
    text-transform: uppercase;
  }

  /* Gritty Film Grain */
  .grain {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-image: url('data:image/svg+xml;utf8,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E');
    opacity: 0.08;
    z-index: 49;
    pointer-events: none;
    animation: grain-anim 0.5s steps(1) infinite;
  }

  @keyframes grain-anim {
    0%, 100% { transform: translate(0, 0); }
    10% { transform: translate(-1%, -1%); }
    20% { transform: translate(1%, 1%); }
    30% { transform: translate(-2%, -2%); }
    40% { transform: translate(2%, 2%); }
    50% { transform: translate(-1%, 1%); }
    60% { transform: translate(1%, -1%); }
    70% { transform: translate(2%, -2%); }
    80% { transform: translate(-2%, 2%); }
    90% { transform: translate(1%, 2%); }
  }

  /* Terminal Glitch Hover Effect */
  .glitch-hover:hover .glitch-layer-1 {
    opacity: 1;
    transform: translate(-3px, 2px);
    clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%);
    animation: glitch-anim 0.2s infinite;
  }
  .glitch-hover:hover .glitch-layer-2 {
    opacity: 1;
    transform: translate(3px, -2px);
    clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%);
    animation: glitch-anim 0.3s infinite reverse;
  }

  @keyframes glitch-anim {
    0% { clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%); }
    20% { clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%); }
    40% { clip-path: polygon(0 10%, 100% 10%, 100% 30%, 0 30%); }
    60% { clip-path: polygon(0 80%, 100% 80%, 100% 100%, 0 100%); }
    80% { clip-path: polygon(0 30%, 100% 30%, 100% 50%, 0 50%); }
    100% { clip-path: polygon(0 50%, 100% 50%, 100% 70%, 0 70%); }
  }

  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #030303;
  }
  ::-webkit-scrollbar-thumb {
    background: #330000;
    border: 1px solid #D91424;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #D91424;
  }
`;

// --- 3D ENVIRONMENT (Minimal Space Drift) ---
const GothamEmbers = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = null; 
    scene.fog = new THREE.FogExp2('#030303', 0.05); 

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); 
    mountRef.current.appendChild(renderer.domElement);

    // Minimal particle count
    const count = window.innerWidth < 768 ? 300 : 700; 
    const particles = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Widen the spread for a space-like expanse
      particles[i * 3] = (Math.random() - 0.5) * 30; 
      particles[i * 3 + 1] = (Math.random() - 0.5) * 30; 
      particles[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5; 

      const isRed = Math.random() > 0.4;
      colors[i * 3] = isRed ? 0.85 : 0.3;     
      colors[i * 3 + 1] = isRed ? 0.08 : 0.3; 
      colors[i * 3 + 2] = isRed ? 0.14 : 0.3; 

      // Give each particle a very slow base drift
      velocities[i * 3] = (Math.random() - 0.5) * 0.002; 
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.002; 
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002; 
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(particles, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smoother, significantly slowed down parallax
      const targetX = mouseX * 0.5;
      const targetY = mouseY * 0.5;
      
      points.position.x += (targetX - points.position.x) * 0.02;
      points.position.y += (targetY - points.position.y) * 0.02;
      points.rotation.y = time * 0.005; // Very slow global rotation

      const positions = points.geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        // Apply slow drift + organic sine wave floating
        positions[i * 3] += velocities[i * 3] + Math.sin(time * 0.2 + i) * 0.001;
        positions[i * 3 + 1] += velocities[i * 3 + 1] + Math.cos(time * 0.15 + i) * 0.001;
        positions[i * 3 + 2] += velocities[i * 3 + 2] + Math.sin(time * 0.25 + i) * 0.001;

        // Wrap around gracefully if they drift too far
        if (positions[i * 3] > 15) positions[i * 3] = -15;
        if (positions[i * 3] < -15) positions[i * 3] = 15;
        if (positions[i * 3 + 1] > 15) positions[i * 3 + 1] = -15;
        if (positions[i * 3 + 1] < -15) positions[i * 3 + 1] = 15;
        if (positions[i * 3 + 2] > 10) positions[i * 3 + 2] = -15;
        if (positions[i * 3 + 2] < -15) positions[i * 3 + 2] = 10;
      }
      points.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
};

// --- FRAMER MOTION & UI COMPONENTS ---

const CRTBootUp: React.FC<CRTBootUpProps> = ({ onComplete }) => {
  return (
    <motion.div
      className="fixed inset-0 z-100 flex items-center justify-center bg-[#030303]"
      initial={{ opacity: 1, scaleY: 1 }}
      animate={{ 
        scaleY: [1, 0.01, 0.01, 0],
        opacity: [1, 1, 0, 0]
      }}
      transition={{ 
        duration: 1.5, 
        times: [0, 0.4, 0.8, 1],
        ease: "easeInOut"
      }}
      onAnimationComplete={onComplete}
    >
      <motion.div 
        className="w-full h-px bg-red-600 shadow-[0_0_20px_10px_rgba(255,0,0,0.8)]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: [0, 1, 1, 0] }}
        transition={{ duration: 1.5, times: [0, 0.3, 0.7, 1] }}
      />
    </motion.div>
  );
};

const BatCard: React.FC<BatCardProps> = ({ children, className = "" }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disable 3D hover on mobile for better touch performance
    if (window.innerWidth < 768) return; 
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative bg-[#050505]/60 backdrop-blur-xl border border-white/5 rounded-2xl p-5 sm:p-6 lg:p-8 overflow-hidden group hover:border-red-900/50 hover:shadow-[0_0_40px_-10px_rgba(217,20,36,0.15)] transition-all duration-500 ${className}`}
    >
      <motion.div
        className="hidden md:block absolute inset-0 z-10 pointer-events-none mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(217, 20, 36, 0.1) 0%, transparent 60%)`,
        }}
      />
      <div style={{ transform: "translateZ(20px)" }} className="relative z-20 h-full">
        {children}
      </div>
    </motion.div>
  );
};

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, delay]);

  return <span>{displayedText}</span>;
};

// Cryptographic text scramble animation for the Hero
const CipherText: React.FC<CipherTextProps> = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState(text.replace(/./g, '0'));
  const chars = "!<>-_\\\\/[]{}—=+*^?#_0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  useEffect(() => {
    let iteration = 0;
    let interval: number | undefined;

    const startAnimation = () => {
      interval = window.setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        iteration += 1 / 4; 
      }, 30);
    };

    const timeout = setTimeout(startAnimation, delay);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay]);

  return <>{displayText}</>;
};

// --- MAIN APPLICATION COMPONENT ---
export default function App() {
  const [booted, setBooted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = globalStyles;
    document.head.appendChild(styleSheet);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.head.removeChild(styleSheet);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // USE TO CONTACT

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error)

      setStatus("Message sent successfully.")
      setForm({ name: "", email: "", subject: "", message: "" })
    } catch (err: any) {
      setStatus(err.message || "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-[#030303] text-gray-300 selection:bg-red-900 selection:text-white font-sans overflow-x-hidden">
      <AnimatePresence>
        {!booted && <CRTBootUp onComplete={() => setBooted(true)} />}
      </AnimatePresence>

      <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.4)_50%)] bg-size-[100%_4px] opacity-10" />
      <div className="grain" />

      <div className="fixed inset-0 z-0 pointer-events-none">
        <GothamEmbers />
      </div>

      {/* Background Watermark */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] md:text-[25vw] leading-none font-black font-mono text-red-900/5 pointer-events-none select-none z-0 tracking-tighter w-full text-center mix-blend-color-dodge">
        VENGEANCE
      </div>

      {booted && (
        <>
          {/* GLOBAL HEADER */}
          <header className={`fixed top-0 w-full z-50 px-5 md:px-8 flex justify-between items-center transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'bg-[#030303]/80 backdrop-blur-md border-b border-red-900/30 py-4' : 'bg-transparent border-transparent py-5 md:py-6'}`}>
            <div className="flex items-center gap-3 relative z-50">
              <a href="#hero" className="text-red-900 hover:text-red-600 transition-colors">
                  <svg
                    viewBox="0 0 2000 679"
                    className="w-15 h-6 md:h-8 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0 C223.08 0 446.16 0 676 0 C678.475 12.375 678.475 12.375 681 25 C682.30735272 29.95290214 683.62353836 34.76588314 685.1875 39.625 C685.56986816 40.82809814 685.95223633 42.03119629 686.34619141 43.27075195 C693.78022238 66.06854739 703.70686141 88.106132 720 106 C720.75539063 106.84820312 721.51078125 107.69640625 722.2890625 108.5703125 C736.87262171 124.10394072 754.92691103 130.11609569 775.1875 134.625 C777.06528141 135.05016194 778.94288161 135.47612492 780.8203125 135.90283203 C784.80261091 136.8061641 788.78634958 137.70278948 792.77099609 138.59570312 C798.03960361 139.77912781 803.30147662 140.99004222 808.56182861 142.20957947 C862.35399523 157.68774359 862.35399523 157.68774359 915.4375 149.875 C921.61935369 145.48870547 923.84740742 139.72835167 925.12527466 132.40116882 C925.29722855 131.3537426 925.29722855 131.3537426 925.47265625 130.28515625 C925.66273758 129.16878532 925.66273758 129.16878532 925.85665894 128.02986145 C926.98272965 121.32435065 927.96368014 114.59842579 928.94018555 107.86987305 C931.36706646 91.20414553 934.30186245 74.6854275 937.6875 58.1875 C937.87959045 57.24538666 938.07168091 56.30327332 938.26959229 55.33261108 C940.16003153 46.10148161 942.04991331 36.96264433 945 28 C945.66 28 946.32 28 947 28 C948.47747198 34.0052587 949.95233714 40.01115025 951.42504883 46.01757812 C951.92372568 48.04996972 952.42304824 50.08220301 952.9230957 52.11425781 C955.64106283 63.16130244 958.3164236 74.21678724 960.86328125 85.3046875 C961.18730171 86.70232834 961.18730171 86.70232834 961.51786804 88.12820435 C961.81126823 89.41801712 961.81126823 89.41801712 962.1105957 90.73388672 C962.28307327 91.48789764 962.45555084 92.24190857 962.633255 93.01876831 C963 95 963 95 963 98 C964.175625 97.54625 965.35125 97.0925 966.5625 96.625 C987.07282716 89.96703226 1016.90377322 89.6065517 1037 98 C1037.10952499 97.28570328 1037.21904999 96.57140656 1037.33189392 95.83546448 C1038.56343061 88.10093208 1040.18114536 80.51711973 1042.00390625 72.90234375 C1042.28725327 71.70565567 1042.57060028 70.50896759 1042.86253357 69.27601624 C1043.45653933 66.77056332 1044.0524335 64.26555742 1044.65014648 61.76098633 C1045.56719681 57.91781665 1046.47841902 54.07330037 1047.38867188 50.22851562 C1047.96841473 47.78637872 1048.54848119 45.3443186 1049.12890625 42.90234375 C1049.40182999 41.7524144 1049.67475372 40.60248505 1049.95594788 39.41770935 C1050.33655617 37.82443565 1050.33655617 37.82443565 1050.72485352 36.19897461 C1050.9475441 35.26476181 1051.17023468 34.33054901 1051.39967346 33.36802673 C1051.85851 31.55811644 1052.40955049 29.77134853 1053 28 C1053.66 28 1054.32 28 1055 28 C1058.41408976 40.01249512 1061.00743374 52.13044005 1063.4375 64.375 C1063.63353821 65.35545288 1063.82957642 66.33590576 1064.03155518 67.34606934 C1066.60883106 80.2730998 1068.96325027 93.20754569 1070.875 106.25 C1070.97416718 106.92552917 1071.07333435 107.60105835 1071.17550659 108.29705811 C1071.79401326 112.52990874 1072.39838365 116.7647218 1073 121 C1074.66597274 136.13535547 1074.66597274 136.13535547 1082.6796875 148.5390625 C1099.181144 160.24756483 1125.39127317 155.67315768 1143.9765625 152.5234375 C1161.76600815 149.26349515 1179.38487976 145.08004827 1197 141 C1197.85505127 140.80241089 1198.71010254 140.60482178 1199.59106445 140.40124512 C1208.81837891 138.26850403 1218.04341687 136.12505415 1227.25 133.90429688 C1229.89913802 133.26546828 1232.54958959 132.6374153 1235.203125 132.01757812 C1242.21852129 130.35521548 1248.98325269 128.68768108 1255.375 125.25 C1256.03580566 124.90565918 1256.69661133 124.56131836 1257.37744141 124.20654297 C1263.14839595 121.10453147 1268.17369988 117.4385461 1273 113 C1274.20849609 111.92878906 1274.20849609 111.92878906 1275.44140625 110.8359375 C1297.13162939 90.53741882 1308.77836159 60.38563335 1316.75 32.4375 C1317.01973633 31.49422852 1317.28947266 30.55095703 1317.56738281 29.57910156 C1320.24778092 19.77961898 1321.99287551 10.03562246 1324 0 C1547.08 0 1770.16 0 2000 0 C2000 0.66 2000 1.32 2000 2 C1999.29955566 2.22961426 1998.59911133 2.45922852 1997.87744141 2.69580078 C1970.27950275 11.81198288 1943.29850809 22.6116043 1917 35 C1915.91444824 35.50998535 1914.82889648 36.0199707 1913.71044922 36.54541016 C1868.78576088 57.73353347 1825.03230898 82.81000355 1787 115 C1785.96926194 115.85738666 1784.9379844 116.71412505 1783.90625 117.5703125 C1767.00744469 131.65180498 1750.59506937 146.659083 1737 164 C1735.56340689 165.70909604 1734.1258785 167.41740628 1732.6875 169.125 C1721.55574356 182.80778396 1712.31524771 197.46143678 1704 213 C1703.61859863 213.7105957 1703.23719727 214.42119141 1702.84423828 215.15332031 C1676.08011702 265.96689861 1675.13750886 323.97983123 1691.078125 378.10546875 C1692.31966418 382.00369134 1693.75480798 385.81681579 1695.24804688 389.625 C1696 392 1696 392 1696 396 C1694.84741699 395.86424561 1693.69483398 395.72849121 1692.50732422 395.58862305 C1670.28660775 392.99063257 1648.07995863 390.6713933 1625.75 389.25 C1624.84231873 389.19137787 1623.93463745 389.13275574 1622.99945068 389.07235718 C1616.66848584 388.66897043 1610.33583446 388.31740992 1604 388 C1602.57083252 387.9274147 1602.57083252 387.9274147 1601.11279297 387.85336304 C1581.24475484 386.87879475 1561.38661147 386.79968003 1541.5 386.8125 C1540.67599072 386.81261959 1539.85198143 386.81273918 1539.00300217 386.8128624 C1513.69654423 386.8175006 1488.45545611 387.0510327 1463.20141602 388.84503174 C1460.98948681 389.00074007 1458.77711181 389.14753878 1456.56445312 389.29248047 C1371.58377448 394.93992878 1285.40314697 411.36052584 1099.52734375 514.62109375 C1097.37580212 516.64626972 1095.18679187 518.58561275 1092.9375 520.5 C1084.90964931 527.49522259 1077.72169105 535.08046169 1071.09765625 543.41015625 C1069.2254165 545.72169248 1067.2789073 547.88957841 1065.25 550.0625 C1035.36909446 583.49361214 1016.73154994 626.5690785 1004 669 C1003.70867188 669.9679248 1003.41734375 670.93584961 1003.1171875 671.93310547 C1002.40947526 674.28815023 1001.70368537 676.64374949 1001 679 C1000.34 679 999.68 679 999 679 C998.76925781 678.23147705 998.53851562 677.4629541 998.30078125 676.67114258 C982.83753368 625.40329533 961.21445725 578.42611084 924.43359375 538.77734375 C923 537 923 537 923 535 C922.34 535 921.68 535 921 535 C919.58984375 533.56640625 919.58984375 533.56640625 917.9375 531.5625 C863.53082929 467.67416883 775.26960806 433.15253907 696 413 C694.86127441 412.70818848 693.72254883 412.41637695 692.54931641 412.11572266 C643.09863566 399.60158756 592.08313225 392.47917302 541.21704102 389.14715576 C539.00683637 389.00045376 536.79738832 388.8449468 534.58789062 388.68798828 C482.41740807 385.05400012 429.16223835 385.53491924 377 389 C376.1825531 389.05327454 375.3651062 389.10654907 374.52288818 389.16143799 C350.93047982 390.70828209 327.46539419 393.12664163 304 396 C304.59615238 392.0035711 305.44419091 388.26950329 306.671875 384.421875 C323.39814908 330.8418545 324.36625767 278.11964066 302 226 C301.67692871 225.24541504 301.35385742 224.49083008 301.02099609 223.71337891 C284.44488678 185.62922645 255.66533034 150.77624882 224 124 C223.04480469 123.15566406 222.08960938 122.31132813 221.10546875 121.44140625 C158.18216612 66.0406198 78.74383677 28.68553709 0 2 C0 1.34 0 0.68 0 0 Z " transform="translate(0,0)"/>
                  </svg>
              </a>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-8 font-mono text-sm font-bold tracking-widest text-gray-400">
              <a href="#experience" className="hover:text-red-600 transition-colors">EXPERIENCE</a>
              <a href="#skills" className="hover:text-red-600 transition-colors">SKILLS</a>
              <a href="#projects" className="hover:text-red-600 transition-colors">PROJECTS</a>
              <a href="#contact" className="hover:text-red-600 transition-colors">CONTACT</a>
            </nav>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-white relative z-50 p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </header>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed inset-0 z-40 bg-[#030303]/95 backdrop-blur-xl flex flex-col items-center justify-center border-b border-red-900/30 md:hidden"
              >
                <nav className="flex flex-col gap-8 font-mono text-lg font-bold tracking-widest text-gray-300 text-center">
                  {['EXPERIENCE', 'SKILLS', 'PROJECTS', 'CONTACT'].map((item) => (
                    <a 
                      key={item} 
                      href={`#${item.toLowerCase()}`} 
                      className="hover:text-red-600 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item}
                    </a>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>

          <main className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 py-6 md:py-10 space-y-24 md:space-y-40">
            
            {/* 1. HERO SECTION */}
            <section id="hero" className="p-8 pt-22 flex flex-col justify-center items-center relative">
              {/* Responsive Cinematic Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-red-900/15 blur-[100px] md:blur-[150px] -z-10 rounded-full pointer-events-none" />
              
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="space-y-6 flex flex-col items-center w-full mt-10 md:mt-0"
              >
                <div className="flex items-center gap-2 md:gap-3 font-mono text-red-500 text-[10px] sm:text-xxs md:text-xxs font-bold tracking-widest mb-2 border border-red-900/30 px-3 md:px-3 py-1.5 md:py-1.5 rounded bg-red-900/10 shadow-[0_0_15px_rgba(217,20,36,0.1)] text-center">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(217,20,36,0.8)] shrink-0" />
                  [ SYS_INIT // IDENTITY VERIFIED ]
                </div>

                {/* THE NAME - Hacker / Coder Font styling restored */}
                <div className="relative inline-block glitch-hover cursor-crosshair text-center w-full">
                  <h1 className="text-[3.2rem] pt-7 leading-[1.2] sm:text-5xl md:text-6xl lg:text-7xl font-mono font-bold text-white drop-shadow-[0_0_20px_rgba(217,20,36,0.5)] mb-2 relative z-10 tracking-tight">
                    <CipherText text="Anurag Jena" delay={1200} />
                  </h1>
                  <h1 className="glitch-layer-1 absolute inset-0 pt-7 text-[3.2rem] leading-[1.2] sm:text-5xl md:text-6xl lg:text-7xl font-mono font-bold text-red-600 opacity-0 z-0 pointer-events-none mix-blend-screen text-center tracking-tight">
                    Anurag Jena
                  </h1>
                  <h1 className="glitch-layer-2 absolute inset-0 pt-7 text-[3.2rem] leading-[1.2] sm:text-5xl md:text-6xl lg:text-7xl font-mono font-bold text-blue-600 opacity-0 z-0 pointer-events-none mix-blend-screen text-center tracking-tight">
                    Anurag Jena
                  </h1>
                </div>
                
                <h2 className="text-sm sm:text-lg md:text-xl lg:text-2xl text-red-500 font-bold h-8 md:h-10 tracking-wider font-mono mb-6 opacity-90 flex items-center justify-center normal-case text-center">
                  <span className="hidden sm:inline-block text-gray-500 mr-3">{'>'}</span>
                  <TypewriterText text="FULL-STACK-DEV // AI-SaaS-BUILDER" delay={2500} />
                  <motion.span 
                    animate={{ opacity: [1, 0] }} 
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-2 md:w-3 h-5 md:h-8 lg:h-10 bg-red-600 ml-1 md:ml-2 align-middle shadow-[0_0_10px_rgba(217,20,36,0.8)]"
                  />
                </h2>

                <div className="w-full max-w-3xl text-center bg-[#050505]/40 border border-white/5 p-5 md:p-8 rounded-lg shadow-2xl backdrop-blur-md relative mt-4">
                  {/* Tactical Corners */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-red-500/50" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-red-500/50" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-red-500/50" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-red-500/50" />
                  
                  <p className="text-xs sm:text-xs md:text-sm text-gray-400 leading-relaxed font-mono">
                    Full-Stack Engineer building production-ready web applications and AI-powered systems. Strong in backend architecture, data structures, and clean, scalable code.
                  </p>
                </div>

                {/* Social Icons */}
                <div className="flex items-center gap-4 md:gap-6 pt-4 md:pt-6">
                  <a href="https://github.com/anuraggjena" target="_blank" rel="noopener noreferrer" className="p-2.5 md:p-3 bg-white/5 border border-white/10 rounded text-gray-400 hover:text-white hover:border-red-500 hover:bg-red-900/20 hover:shadow-[0_0_15px_rgba(217,20,36,0.3)] transition-all duration-300">
                    <Github size={20} className="w-5 h-5 md:w-6 md:h-6" />
                  </a>
                  <a href="https://www.linkedin.com/in/anuraggjena/" target="_blank" rel="noopener noreferrer" className="p-2.5 md:p-3 bg-white/5 border border-white/10 rounded text-gray-400 hover:text-white hover:border-red-500 hover:bg-red-900/20 hover:shadow-[0_0_15px_rgba(217,20,36,0.3)] transition-all duration-300">
                    <Linkedin size={20} className="w-5 h-5 md:w-6 md:h-6" />
                  </a>
                  <a href="mailto:anuragjena14@gmail.com" target="_blank" rel="noopener noreferrer" className="p-2.5 md:p-3 bg-white/5 border border-white/10 rounded text-gray-400 hover:text-white hover:border-red-500 hover:bg-red-900/20 hover:shadow-[0_0_15px_rgba(217,20,36,0.3)] transition-all duration-300">
                    <Mail size={20} className="w-5 h-5 md:w-6 md:h-6" />
                  </a>
                </div>

                {/* Call To Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 md:gap-6 pt-6 w-full sm:w-auto justify-center">
                  <a href="#projects" className="group w-full sm:w-auto relative px-6 md:px-8 py-3.5 md:py-4 bg-red-700 text-white rounded font-bold uppercase tracking-widest overflow-hidden font-mono text-xs md:text-sm border border-red-600 shadow-lg shadow-red-900/20">
                    <span className="relative z-10 flex items-center gap-2 justify-center">Access Archives <ChevronRight size={16} className="md:w-[18px] md:h-[18px]" /></span>
                    <div className="absolute inset-0 bg-red-500 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out z-0" />
                  </a>
                  <a href="https://drive.google.com/file/d/1jNcp6LQ_vZj5b4-dLFsscogw44SeNMuW/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="group w-full sm:w-auto relative px-6 md:px-8 py-3.5 md:py-4 border border-white/10 rounded text-gray-300 font-bold uppercase tracking-widest hover:border-red-500 hover:text-red-500 transition-all duration-300 bg-white/5 backdrop-blur-sm font-mono text-xs md:text-sm text-center">
                    <span className="flex items-center gap-2 justify-center">Extract Resume <ExternalLink size={16} className="md:w-[18px] md:h-[18px]" /></span>
                  </a>
                </div>
              </motion.div>
            </section>

            {/* 2. EXPERIENCE & ORIGIN */}
            <section id="experience" className="relative pt-16 md:pt-24">
              <div className="absolute top-1/2 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-red-900/10 blur-[80px] md:blur-[100px] -z-10 rounded-full pointer-events-none" />
              
              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-12">
                <Crosshair className="text-red-600 w-6 h-6 md:w-8 md:h-8" />
                <h2 className="text-xl sm:text-2xl md:text-4xl font-mono font-bold tracking-wider text-white uppercase whitespace-nowrap">Detective Files</h2>
                <div className="grow h-px bg-linear-to-r from-red-900/50 to-transparent ml-2 md:ml-8" />
              </div>

              <motion.div 
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { staggerChildren: 0.2 } }
                }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                className="relative pl-6 md:pl-12"
              >
                {/* Glowing Vertical Line */}
                <div className="absolute left-[7px] md:left-[11px] top-4 bottom-0 w-0.5 bg-linear-to-b from-red-600 via-red-900/30 to-transparent shadow-[0_0_10px_rgba(217,20,36,0.8)]" />

                {/* Case File 1: DRDO */}
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
                  }}
                  className="relative mb-8 md:mb-12 group cursor-crosshair"
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[22px] md:-left-[42px] top-6 md:top-8 w-3 h-3 bg-red-600 rounded-full shadow-[0_0_10px_red] border-2 border-[#030303]" />
                  
                  <BatCard>
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-4 md:mb-6 pb-4 border-b border-white/5 gap-3 sm:gap-0">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold font-mono text-white uppercase tracking-wider flex items-center gap-2 md:gap-3">
                          <Terminal className="text-red-500 w-5 h-5 md:w-6 md:h-6" />
                          Defence Research & Development Organisation
                        </h3>
                        <p className="text-gray-400 font-mono text-xs md:text-sm mt-1">Chandipur, India</p>
                      </div>
                      <span className="font-mono text-[10px] md:text-xs tracking-widest bg-red-950/40 rounded text-red-500 px-2 py-1 border border-red-900/30 shadow-[0_0_10px_rgba(217,20,36,0.2)] inline-block">2025</span>
                    </div>
                    <div className="space-y-3 md:space-y-4">
                      <p className="font-bold text-gray-200 uppercase font-mono text-sm md:text-lg">{'>'} Software Engineer Intern</p>
                      <p className="text-gray-300 leading-relaxed font-sans text-sm md:text-base">
                        Developed a <span className="text-white font-semibold">Real-Time Object Tracking System</span> in C++ & OpenCV with <span className="text-red-400 font-semibold">92% accuracy</span>, optimizing ROI selection to reduce false positives by 30%. <span className="text-green-500 font-semibold">Improved reliability</span> through rigorous testing and performance tuning.
                      </p>
                      <div className="mt-4 md:mt-6 flex font-mono text-xs md:text-xs opacity-90 pt-3 md:pt-4">
                        <span className="px-2 md:px-3 py-1 bg-white/5 border border-white/10 rounded text-red-500 font-bold tracking-widest shadow-[inset_0_0_10px_rgba(217,20,36,0.1)] inline-block">
                          [ STATUS: MISSION ACCOMPLISHED ]
                        </span>
                      </div>
                    </div>
                  </BatCard>
                </motion.div>

                {/* Case File 2: Education 1 */}
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
                  }}
                  className="relative mb-8 md:mb-12 group cursor-crosshair"
                >
                  <div className="absolute -left-[22px] md:-left-[42px] top-6 md:top-8 w-3 h-3 bg-red-900 rounded-full border-2 border-[#030303] group-hover:bg-red-500 group-hover:shadow-[0_0_10px_red] transition-colors" />
                  
                  <BatCard>
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-4 md:mb-6 pb-4 border-b border-white/5 gap-2 sm:gap-0">
                      <div>
                        <h3 className="text-lg md:text-2xl font-bold font-mono text-white uppercase tracking-wider flex items-center gap-2 md:gap-3">
                          <Database className="text-red-500 w-4 h-4 md:w-5 md:h-5" />
                          B.Tech - Computer Science
                        </h3>
                        <p className="text-gray-400 font-mono text-xs md:text-sm mt-1">Balasore College of Engineering & Technology</p>
                      </div>
                      <span className="font-mono text-xs text-gray-500 mt-1 md:mt-2">// 2022 - 2026</span>
                    </div>
                    <div className="space-y-2 font-sans text-gray-300 text-sm md:text-base">
                      <p>Focused undergraduate studies prioritizing core computer science fundamentals, scalable systems, and modern software engineering practices.</p>
                      <p className="font-mono text-red-400 font-semibold pt-2">{'>'} CGPA: 7.9</p>
                    </div>
                  </BatCard>
                </motion.div>

                {/* Case File 3: Education 2 */}
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
                  }}
                  className="relative group cursor-crosshair"
                >
                  <div className="absolute -left-[22px] md:-left-[42px] top-6 md:top-8 w-3 h-3 bg-neutral-800 rounded-full border-2 border-[#030303] group-hover:bg-red-500 group-hover:shadow-[0_0_10px_red] transition-colors" />
                  
                  <BatCard>
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-4 md:mb-6 pb-4 border-b border-white/5 gap-2 sm:gap-0">
                      <div>
                        <h3 className="text-lg md:text-xl font-bold font-mono text-white uppercase tracking-wider flex items-center gap-2 md:gap-3">
                          <Terminal className="text-gray-500 w-4 h-4 md:w-5 md:h-5" />
                          Higher Secondary
                        </h3>
                        <p className="text-gray-400 font-sans text-xs md:text-sm mt-1">St. Vincent's Convent School</p>
                      </div>
                      <span className="font-mono text-xs text-gray-500 mt-1 md:mt-2">// 2020 - 2022</span>
                    </div>
                    <div className="font-sans text-gray-300 text-sm md:text-base">
                      <p>Foundational analytical studies completing the standard core science curriculum.</p>
                      <p className="font-mono text-gray-400 text-xs md:text-sm pt-3 md:pt-4"><span className="font-mono text-red-400 font-semibold pt-2">{'>'} SUBJECT:</span> Physics, Chemistry, Maths & Computer</p>
                    </div>
                  </BatCard>
                </motion.div>
              </motion.div>
            </section>

            {/* 3. TECH ARSENAL (Wayne Ent R&D) */}
            <section id="skills" className="relative pt-16 md:pt-24">
               <div className="absolute top-1/2 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-red-900/10 blur-[80px] md:blur-[100px] -z-10 rounded-full pointer-events-none" />
               
               <div className="flex items-center justify-end gap-3 md:gap-4 mb-6 md:mb-12">
                <div className="grow h-px bg-linear-to-l from-red-900/50 to-transparent mr-2 md:mr-8" />
                <h2 className="text-xl sm:text-2xl md:text-4xl font-mono font-bold tracking-wider text-right text-white uppercase whitespace-nowrap">Wayne Ent. R&D</h2>
                <Cpu className="text-red-600 w-6 h-6 md:w-8 md:h-8" />
              </div>

              {/* Asymmetric Dashboard HUD Grid */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
                }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6"
              >
                {/* Languages Module */}
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                  }}
                  className="md:col-span-7 bg-[#050505]/60 backdrop-blur-2xl border border-white/5 rounded-2xl p-5 md:p-8 hover:border-red-900/50 transition-all duration-500 flex flex-col group cursor-crosshair"
                >
                  <div className="flex items-center gap-3 mb-6 md:mb-8 text-white border-b border-white/5 pb-3 md:pb-4">
                    <Code className="text-red-500 w-5 h-5 drop-shadow-[0_0_8px_rgba(217,20,36,0.8)]" />
                    <h3 className="font-bold font-mono uppercase tracking-widest text-xs md:text-sm">Languages</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 md:gap-3 mt-auto">
                    {["C++", "Python", "HTML", "CSS", "JavaScript", "TypeScript", "SQL"].map((item, i) => (
                      <span key={i} className="bg-[#0A0A0A] border border-red-500/20 text-gray-300 px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-mono tracking-wide shadow-[inset_0_0_15px_rgba(220,38,38,0.05)] hover:bg-red-950/40 hover:text-white hover:border-red-500/60 transition-all duration-300">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* AI / ML Module */}
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                  }}
                  className="md:col-span-5 bg-[#050505]/60 backdrop-blur-2xl border border-white/5 rounded-2xl p-5 md:p-8 hover:border-red-900/50 transition-all duration-500 flex flex-col group cursor-crosshair"
                >
                  <div className="flex items-center gap-3 mb-6 md:mb-8 text-white border-b border-white/5 pb-3 md:pb-4">
                    <BrainCircuit className="text-red-500 w-5 h-5 drop-shadow-[0_0_8px_rgba(217,20,36,0.8)]" />
                    <h3 className="font-bold font-mono uppercase tracking-widest text-xs md:text-sm">AI & ML Ops</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 md:gap-3 mt-auto">
                    {["Gen AI", "LangChain", "RAG", "OpenCV", "Vector Embeddings"].map((item, i) => (
                      <span key={i} className="bg-[#0A0A0A] border border-red-500/20 text-gray-300 px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-mono tracking-wide shadow-[inset_0_0_15px_rgba(220,38,38,0.05)] hover:bg-red-950/40 hover:text-white hover:border-red-500/60 transition-all duration-300">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Databases Module */}
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                  }}
                  className="md:col-span-5 bg-[#050505]/60 backdrop-blur-2xl border border-white/5 rounded-2xl p-5 md:p-8 hover:border-red-900/50 transition-all duration-500 flex flex-col group cursor-crosshair"
                >
                  <div className="flex items-center gap-3 mb-6 md:mb-8 text-white border-b border-white/5 pb-3 md:pb-4">
                    <Database className="text-red-500 w-5 h-5 drop-shadow-[0_0_8px_rgba(217,20,36,0.8)]" />
                    <h3 className="font-bold font-mono uppercase tracking-widest text-xs md:text-sm">Data & Cloud</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 md:gap-3 mt-auto">
                    {["PostgreSQL", "SQLite", "MySQL", "MongoDB", "Redis", "AWS"].map((item, i) => (
                      <span key={i} className="bg-[#0A0A0A] border border-red-500/20 text-gray-300 px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-mono tracking-wide shadow-[inset_0_0_15px_rgba(220,38,38,0.05)] hover:bg-red-950/40 hover:text-white hover:border-red-500/60 transition-all duration-300">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Frameworks Module */}
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                  }}
                  className="md:col-span-7 bg-[#050505]/60 backdrop-blur-2xl border border-white/5 rounded-2xl p-5 md:p-8 hover:border-red-900/50 transition-all duration-500 flex flex-col group cursor-crosshair"
                >
                  <div className="flex items-center gap-3 mb-6 md:mb-8 text-white border-b border-white/5 pb-3 md:pb-4">
                    <FileCode2 className="text-red-500 w-5 h-5 drop-shadow-[0_0_8px_rgba(217,20,36,0.8)]" />
                    <h3 className="font-bold font-mono uppercase tracking-widest text-xs md:text-sm">Frameworks & Backend</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 md:gap-3 mt-auto">
                    {["React.js", "Next.js", "Node.js", "Express.js", "FastAPI", "NextAuth"].map((item, i) => (
                      <span key={i} className="bg-[#0A0A0A] border border-red-500/20 text-gray-300 px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-mono tracking-wide shadow-[inset_0_0_15px_rgba(220,38,38,0.05)] hover:bg-red-950/40 hover:text-white hover:border-red-500/60 transition-all duration-300">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>

              </motion.div>
            </section>

            {/* 4. FEATURED PROJECTS */}
            <section id="projects" className="relative pt-16 md:pt-24">
              <div className="absolute top-1/2 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-red-900/10 blur-[100px] md:blur-[150px] -z-10 rounded-full pointer-events-none" />

              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-12">
                <ShieldAlert className="text-red-600 w-6 h-6 md:w-8 md:h-8" />
                <h2 className="text-xl sm:text-2xl md:text-4xl font-mono font-bold tracking-wider text-white uppercase whitespace-nowrap">Riddler's Cyphers</h2>
                <div className="grow h-px bg-linear-to-r from-red-900/50 to-transparent ml-2 md:ml-8" />
              </div>

              <div className="space-y-10 md:space-y-16">
                {[
                  {
                    title: "SkillForge.dev",
                    desc: "RAG-based personalized project ideas generator. Analyzes user proficiency matrices and outputs targeted, actionable development schematics.",
                    stack: ["Next.js", "Node.js", "Drizzle ORM", "OpenAI"],
                    id: "01",
                    image: "/skillforge.png",
                    live: "https://skillforge-dev.vercel.app",
                    source: "https://github.com/anuraggjena/skillforge-ai"
                  },
                  {
                    title: "Clariox AI",
                    desc: "Notion-style block editor featuring intelligent auto-save and a highly embedded AI writing assistant. Tactical data management system engineered for seamless ideation.",
                    stack: ["React.js", "Lexical", "Zustand", "FastAPI"],
                    id: "02",
                    image: "/clariox.png",
                    live: "https://clariox-snowy.vercel.app",
                    source: "https://github.com/anuraggjena/clariox"
                  },
                  {
                    title: "ProBid-AI",
                    desc: "Automated AI job proposal creator outfitted with a Semantic Matching engine to guarantee maximum hit rate on competitive freelance contracts.",
                    stack: ["Next.js", "PostgreSQL", "NLP","Xenova Transformers"],
                    id: "03",
                    image: "/probid.png",
                    live: "https://probid-ai.vercel.app",
                    source: "github.com/anuraggjena/probid-ai"
                  }
                ].map((project, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    className="group grid grid-cols-1 lg:grid-cols-2 gap-0 border border-white/5 rounded-2xl bg-[#050505]/60 backdrop-blur-xl overflow-hidden hover:border-red-900/50 hover:shadow-[0_0_40px_-10px_rgba(217,20,36,0.15)] transition-all duration-700"
                  >
                    <div className="relative h-48 sm:h-64 lg:h-full w-full bg-black overflow-hidden border-b lg:border-b-0 lg:border-r border-white/5">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover grayscale mix-blend-luminosity opacity-60 group-hover:grayscale-0 group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-700 ease-in-out scale-105 group-hover:scale-100"
                      />
                      
                      <div className="absolute top-3 md:top-4 left-3 md:left-4 font-mono text-[10px] md:text-xs font-bold tracking-widest text-red-500 bg-black/60 backdrop-blur-md px-2 md:px-3 py-1 md:py-1.5 rounded shadow-[0_0_10px_rgba(217,20,36,0.2)]">
                        [ FILE_REF: {project.id} ]
                      </div>
                    </div>

                    <div className="p-6 md:p-8 lg:p-12 flex flex-col justify-center relative">
                      <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-red-900/10 blur-[50px] pointer-events-none" />

                      <h3 className="text-2xl md:text-3xl font-mono font-bold text-white mb-3 md:mb-4 group-hover:text-red-500 transition-colors duration-500 uppercase">{project.title}</h3>
                      <p className="text-gray-300 mb-6 md:mb-8 leading-relaxed font-sans text-sm md:text-base">
                        {project.desc}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-8 md:mb-10">
                        {project.stack.map(s => (
                          <span key={s} className="font-mono text-[10px] md:text-xs font-semibold rounded bg-white/5 border border-white/5 px-2 md:px-3 py-1 md:py-1.5 text-red-400 group-hover:border-red-500/30 group-hover:bg-red-500/10 transition-colors">
                            {s}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 mt-auto">
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 text-[10px] md:text-sm font-bold uppercase tracking-widest text-white bg-red-700 rounded hover:bg-red-600 px-4 md:px-6 py-2.5 md:py-3 transition-colors shadow-lg shadow-red-900/20 font-mono">
                          Live Feed <ExternalLink size={14} className="md:w-4 md:h-4" />
                        </a>
                        <a href={project.source} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 text-[10px] md:text-sm font-bold uppercase tracking-widest text-gray-300 hover:text-white rounded border border-white/10 hover:border-red-500 px-4 md:px-6 py-2.5 md:py-3 transition-colors bg-white/5 font-mono">
                          Source <Github size={14} className="md:w-4 md:h-4" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* 5. CONTACT SECTION */}
            <section id="contact" className="relative pt-16 md:pt-24">
              <BatCard className="max-w-3xl mx-auto">
                <div className="text-center mb-8 md:mb-10">
                  <Send className="mx-auto text-red-600 mb-3 md:mb-4 w-8 h-8 md:w-10 md:h-10" />
                  <h2 className="text-3xl md:text-4xl font-mono font-bold tracking-wider text-white uppercase">The Bat-Signal</h2>
                  <p className="text-xs md:text-sm text-gray-400 mt-3 md:mt-4 font-sans">Availability: Open to internships and junior-mid roles.<br/><span className="font-mono text-red-500 mt-1.5 md:mt-2 inline-block">// Response time ~2 business days</span></p>
                </div>

                <form className="space-y-6 md:space-y-8" onSubmit={handleSubmit}>
                  <div className="relative group">
                    <input 
                      type="text" 
                      id="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/20 pb-2 text-white font-mono text-sm md:text-base outline-none focus:border-red-500 transition-colors peer placeholder-transparent"
                      placeholder="Identifier (Name)"
                    />
                    <label htmlFor="identifier" className="absolute left-0 -top-4 md:-top-5 text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-widest peer-placeholder-shown:text-sm md:peer-placeholder-shown:text-base peer-placeholder-shown:top-0 peer-placeholder-shown:text-gray-500 peer-focus:-top-4 md:peer-focus:-top-5 peer-focus:text-[10px] md:peer-focus:text-xs peer-focus:text-red-500 transition-all font-mono">
                      Identifier (Name)
                    </label>
                  </div>

                  <div className="relative group">
                    <input 
                      type="email" 
                      id="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/20 pb-2 text-white font-mono text-sm md:text-base outline-none focus:border-red-500 transition-colors peer placeholder-transparent"
                      placeholder="Return Ping (Email)"
                    />
                    <label htmlFor="ping" className="absolute left-0 -top-4 md:-top-5 text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-widest peer-placeholder-shown:text-sm md:peer-placeholder-shown:text-base peer-placeholder-shown:top-0 peer-placeholder-shown:text-gray-500 peer-focus:-top-4 md:peer-focus:-top-5 peer-focus:text-[10px] md:peer-focus:text-xs peer-focus:text-red-500 transition-all font-mono">
                      Return Ping (Email)
                    </label>
                  </div>

                  <div className="relative group">
                    <textarea 
                      id="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/20 pb-2 text-white font-mono text-sm md:text-base outline-none focus:border-red-500 transition-colors peer placeholder-transparent resize-none mt-2"
                      placeholder="Encrypted Message"
                    />
                    <label htmlFor="message" className="absolute left-0 -top-4 md:-top-5 text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-widest peer-placeholder-shown:text-sm md:peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-500 peer-focus:-top-4 md:peer-focus:-top-5 peer-focus:text-[10px] md:peer-focus:text-xs peer-focus:text-red-500 transition-all font-mono">
                      Encrypted Message
                    </label>
                  </div>

                  <button type="submit" disabled={loading} className="w-full py-3 md:py-4 bg-red-700/10 text-red-500 rounded border border-red-900/50 hover:bg-red-600 hover:text-white font-bold tracking-widest uppercase transition-all duration-300 flex justify-center items-center gap-2 md:gap-3 font-mono mt-2 md:mt-4 text-sm md:text-base">
                    {loading ? 'Transmitting...' : 'Transmit'}
                    <Send size={16} className="md:w-[18px] md:h-[18px]" />
                  </button>
                </form>
              </BatCard>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/10 pt-6 md:pt-8 text-center text-[10px] md:text-xs text-gray-500 uppercase tracking-widest font-mono">
              [ SYS_TERMINAL_LOG ] // {new Date().getFullYear()} // <span className="text-red-900">GOTHAM ARCHIVES</span>
            </footer>
          </main>
        </>
      )}
    </div>
  );
}