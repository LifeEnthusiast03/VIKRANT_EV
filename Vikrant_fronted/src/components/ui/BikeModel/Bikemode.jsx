// import React, { useRef, useEffect } from 'react';

// const BikeModel = () => {
//   const bikeRef = useRef();

//   // 3D Bike Animation
//   useEffect(() => {
//     const bike = bikeRef.current;
//     if (bike) {
//       let rotation = 0;
//       const animate = () => {
//         rotation += 0.01;
//         bike.style.transform = `rotateY(${rotation}rad) rotateX(0.1rad)`;
//         requestAnimationFrame(animate);
//       };
//       animate();
//     }
//   }, []);

//   return (
//     <div 
//       ref={bikeRef}
//       className="relative w-96 h-96 mx-auto"
//       style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
//     >
//       {/* Bike Frame */}
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-20 animate-pulse"></div>
      
//       {/* Main Frame */}
//       <svg viewBox="0 0 400 300" className="w-full h-full">
//         <defs>
//           <linearGradient id="bikeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//             <stop offset="0%" stopColor="#3b82f6" />
//             <stop offset="100%" stopColor="#8b5cf6" />
//           </linearGradient>
//         </defs>
        
//         {/* Wheels */}
//         <circle cx="80" cy="200" r="40" fill="none" stroke="url(#bikeGradient)" strokeWidth="6" className="animate-spin" style={{transformOrigin: '80px 200px'}} />
//         <circle cx="320" cy="200" r="40" fill="none" stroke="url(#bikeGradient)" strokeWidth="6" className="animate-spin" style={{transformOrigin: '320px 200px'}} />
        
//         {/* Frame */}
//         <path d="M80 200 L200 120 L320 200 M200 120 L200 80 M160 160 L240 160" 
//               stroke="url(#bikeGradient)" strokeWidth="8" fill="none" strokeLinecap="round" />
        
//         {/* Seat */}
//         <rect x="190" y="75" width="20" height="8" fill="url(#bikeGradient)" rx="4" />
        
//         {/* Handlebars */}
//         <path d="M190 130 L210 130" stroke="url(#bikeGradient)" strokeWidth="6" strokeLinecap="round" />
        
//         {/* Battery Pack */}
//         <rect x="170" y="140" width="60" height="20" fill="#fbbf24" rx="10" />
//         <text x="200" y="155" textAnchor="middle" className="text-xs font-bold fill-white">BATTERY</text>
//       </svg>
      
//       {/* Glow Effect */}
//       <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
//     </div>
//   );
// };

// export default BikeModel;







import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Zap, Battery, Shield, Cpu } from 'lucide-react';

// Enhanced Futuristic Bike Model Component
const FuturisticBikeModel = () => {
  const [rotation, setRotation] = useState(0);
  const [glowIntensity, setGlowIntensity] = useState(0.5);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);

    const glowInterval = setInterval(() => {
      setGlowIntensity(prev => 0.3 + Math.sin(Date.now() * 0.003) * 0.4);
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(glowInterval);
    };
  }, []);

  return (
    <div 
      className="relative w-[500px] h-[350px] cursor-pointer transition-transform duration-300"
      style={{ 
        transformStyle: 'preserve-3d', 
        perspective: '1200px',
        transform: `rotateY(${rotation * 0.2 + (isHovered ? 15 : 0)}deg) rotateX(${Math.sin(rotation * 0.02) * 5}deg) scale(${isHovered ? 1.05 : 1})`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Enhanced Ambient Glow */}
      <div 
        className="absolute inset-0 rounded-full blur-3xl opacity-40"
        style={{
          background: `radial-gradient(ellipse at center, 
            rgba(59, 130, 246, ${glowIntensity * (isHovered ? 1.5 : 1)}) 0%, 
            rgba(139, 92, 246, ${glowIntensity * 0.7}) 30%, 
            rgba(16, 185, 129, ${glowIntensity * 0.5}) 60%, 
            transparent 100%)`
        }}
      />

      {/* Main Bike SVG */}
      <svg viewBox="0 0 500 350" className="w-full h-full relative z-10">
        <defs>
          <linearGradient id="frameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="30%" stopColor="#334155" />
            <stop offset="60%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          
          <linearGradient id="wheelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          
          <linearGradient id="batteryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#06d6a0" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>

          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="innerShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2"/>
            <feOffset dx="2" dy="2" result="offset"/>
          </filter>
        </defs>
        
        {/* Ground Shadow */}
        <ellipse cx="250" cy="330" rx="150" ry="10" fill="rgba(0,0,0,0.3)" />
        
        {/* Rear Wheel */}
        <g>
          <circle cx="100" cy="240" r="45" fill="none" stroke="#1f2937" strokeWidth="10" />
          <circle cx="100" cy="240" r="38" fill="none" stroke="url(#wheelGradient)" strokeWidth="3" filter="url(#glow)" 
                  transform={`rotate(${rotation * 2} 100 240)`} />
          
          <g transform={`rotate(${rotation * 2} 100 240)`}>
            {[0, 60, 120, 180, 240, 300].map(angle => (
              <line key={angle} x1="100" y1="240" 
                    x2={100 + 28 * Math.cos(angle * Math.PI / 180)} 
                    y2={240 + 28 * Math.sin(angle * Math.PI / 180)} 
                    stroke="url(#wheelGradient)" strokeWidth="2" opacity="0.8" />
            ))}
          </g>
          
          <circle cx="100" cy="240" r="10" fill="url(#frameGradient)" filter="url(#innerShadow)" />
          <circle cx="100" cy="240" r="6" fill="url(#wheelGradient)" opacity="0.8" />
        </g>
        
        {/* Front Wheel */}
        <g>
          <circle cx="400" cy="240" r="45" fill="none" stroke="#1f2937" strokeWidth="10" />
          <circle cx="400" cy="240" r="38" fill="none" stroke="url(#wheelGradient)" strokeWidth="3" filter="url(#glow)"
                  transform={`rotate(${rotation * 2} 400 240)`} />
          
          <g transform={`rotate(${rotation * 2} 400 240)`}>
            {[0, 60, 120, 180, 240, 300].map(angle => (
              <line key={angle} x1="400" y1="240" 
                    x2={400 + 28 * Math.cos(angle * Math.PI / 180)} 
                    y2={240 + 28 * Math.sin(angle * Math.PI / 180)} 
                    stroke="url(#wheelGradient)" strokeWidth="2" opacity="0.8" />
            ))}
          </g>
          
          <circle cx="400" cy="240" r="10" fill="url(#frameGradient)" filter="url(#innerShadow)" />
          <circle cx="400" cy="240" r="6" fill="url(#wheelGradient)" opacity="0.8" />
        </g>
        
        {/* Main Frame Structure */}
        <g stroke="url(#frameGradient)" strokeWidth="10" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M100 240 L250 170 L400 240" filter="url(#glow)" />
          <path d="M250 170 L250 120" />
          <path d="M250 170 L230 100" />
          <path d="M250 170 L270 140" />
          <path d="M100 240 L170 220 L250 170" strokeWidth="7" />
          <path d="M230 100 L170 170 L100 240" strokeWidth="7" />
        </g>
        
        {/* Advanced Battery Pack */}
        <g>
          <rect x="200" y="155" width="100" height="25" rx="12" fill="url(#batteryGradient)" filter="url(#glow)" />
          <rect x="205" y="160" width="90" height="15" rx="8" fill="rgba(16, 185, 129, 0.3)" />
          
          {[0, 1, 2, 3, 4].map(i => (
            <rect key={i} x={210 + i * 16} y="163" width="8" height="9" rx="2" 
                  fill={i < 4 ? "#10b981" : "#ef4444"} 
                  opacity={Math.sin(Date.now() * 0.01 + i) * 0.3 + 0.7} />
          ))}
          
          <text x="250" y="172" textAnchor="middle" className="text-xs font-bold fill-white opacity-80">
            POWER
          </text>
        </g>
        
        {/* Futuristic Components */}
        <path d="M220 95 Q250 90 280 95 L275 105 Q250 100 225 105 Z" 
              fill="url(#frameGradient)" filter="url(#innerShadow)" />
        <path d="M225 95 Q250 92 275 95" stroke="url(#wheelGradient)" strokeWidth="2" />
        
        <path d="M260 130 Q280 120 300 130" stroke="url(#frameGradient)" strokeWidth="8" strokeLinecap="round" />
        <circle cx="270" cy="125" r="3" fill="url(#wheelGradient)" />
        <circle cx="290" cy="125" r="3" fill="url(#wheelGradient)" />
        
        <rect x="265" y="115" width="25" height="12" rx="2" fill="#000" stroke="url(#wheelGradient)" strokeWidth="1" />
        <rect x="268" y="118" width="19" height="6" rx="1" fill="url(#batteryGradient)" opacity="0.8" />
        
        {/* LED Effects */}
        <g>
          <path d="M100 240 L250 170 L400 240" stroke="url(#wheelGradient)" strokeWidth="2" 
                opacity={glowIntensity * (isHovered ? 1.5 : 1)} filter="url(#glow)" />
          
          <circle cx="100" cy="240" r="48" fill="none" stroke="url(#batteryGradient)" 
                  strokeWidth="1" opacity={glowIntensity * 0.5} />
          <circle cx="400" cy="240" r="48" fill="none" stroke="url(#batteryGradient)" 
                  strokeWidth="1" opacity={glowIntensity * 0.5} />
        </g>
      </svg>
      
      {/* Enhanced Particle Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full opacity-70 transition-all duration-300 ${
              isHovered ? 'bg-purple-400' : 'bg-blue-400'
            }`}
            style={{
              left: `${30 + (i * 40)}px`,
              top: `${150 + Math.sin(rotation * 0.05 + i) * 30}px`,
              transform: `translateY(${Math.sin(rotation * 0.03 + i * 0.5) * 15}px) scale(${isHovered ? 1.5 : 1})`,
              boxShadow: `0 0 ${isHovered ? '8px' : '6px'} ${isHovered ? '#a855f7' : '#3b82f6'}`
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Main Homepage Component


export default FuturisticBikeModel;